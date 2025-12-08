# backend/app/main.py
import os
from fastapi import FastAPI, Query, HTTPException , File , UploadFile
from pydantic import BaseModel
from typing import List, Dict
from dotenv import load_dotenv
from pathlib import Path

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from app.utils.extractor import extract_resume_text
from app.utils.analyzer import analyze_resume_text
from app.utils.matcher import match_resume_with_jobs
from app.utils.db import jobs_collection
from app.utils.embeddings import add_job_to_faiss
from bson import ObjectId


load_dotenv()

BASE_DIR = Path(__file__).resolve().parents[1]

FAISS_DIR = Path(
    BASE_DIR / "embeddings" / "faiss_index")


HF_MODEL = os.getenv("HF_MODEL", "sentence-transformers/all-MiniLM-L6-v2")

app = FastAPI(title="FAISS Retriever API")

vectorstore = None


@app.on_event("startup")
def load_vectorstore():
    global vectorstore

    print("➡ Loading embeddings model:", HF_MODEL)
    embeddings = HuggingFaceEmbeddings(
        model_name=HF_MODEL,
        model_kwargs={"device": "cpu"}
    )

    print("➡ Checking FAISS folder:", FAISS_DIR)

    # Validate FAISS dir
    if not FAISS_DIR.exists():
        raise FileNotFoundError(f"FAISS folder not found: {FAISS_DIR}")

    # Validate required files
    index_file = FAISS_DIR / "index.faiss"
    meta_file = FAISS_DIR / "index.pkl"

    if not index_file.exists() or not meta_file.exists():
        raise FileNotFoundError(
            f"FAISS index files missing in: {FAISS_DIR}\n"
            f"Expected: index.faiss and index.pkl"
        )

    print("➡ Loading FAISS index...")

    try:
        vectorstore = FAISS.load_local(
            str(FAISS_DIR), 
            embeddings, 
            allow_dangerous_deserialization=True
        )
    except Exception as e:
        raise RuntimeError(f"Failed to load FAISS index: {e}")

    print("✔ FAISS index loaded successfully.")


class Match(BaseModel):
    text: str
    metadata: Dict
    score: float


@app.get("/retrieve", response_model=List[Match])
def retrieve(q: str = Query(..., min_length=1), k: int = Query(5, ge=1, le=50)):

    if vectorstore is None:
        raise HTTPException(500, "FAISS index not loaded")

    results = vectorstore.similarity_search_with_score(q, k=k)
    output = []

    for doc, score in results:
        output.append(
            Match(
                text=doc.page_content,
                metadata=doc.metadata or {},
                score=float(score),
            )
        )

    return output


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        text = extract_resume_text(file)
        # print(text)
        return {"status": "success", "text": text}
    except Exception as e:
        return {"status": "error", "message": str(e)}

class AnalyzeRequest(BaseModel):
    resume_text: str

@app.post("/analyze-resume")
async def analyze_resume(payload: AnalyzeRequest):
    analysis = analyze_resume_text(payload.resume_text)
    return {"analysis": analysis}

class MatchRequest(BaseModel):
    resume_text: str
    k: int = 5

@app.post("/match-jobs")
async def match_jobs_api(payload: MatchRequest):
    matches = match_resume_with_jobs(payload.resume_text, payload.k)
    return {"matches": matches}


@app.get("/health")
def health():
    return {"status": "running"}



class JobPost(BaseModel):
    title: str
    company: str
    location: str | None = None
    description: str

@app.post("/post-job")
async def post_job(payload: JobPost):

    job_data = payload.dict()

    result = jobs_collection.insert_one(job_data)
    print("Result JobCOllection" ,job_data)
    job_id = str(result.inserted_id)

    # build metadata as a dict (required)
    metadata = {
        "job_id": job_id,
        "title": job_data["title"],
        "company": job_data["company"]
    }

    # pass the job description + metadata dict to FAISS
    add_job_to_faiss(job_data["description"], metadata)

    return {
        "status": "success",
        "job_id": job_id,
        "message": "Job posted and added to FAISS index."
    }


@app.get("/debug/faiss")
def check_faiss():
    from app.utils.embeddings import debug_faiss
    debug_faiss()
    return {"status": "ok"}
