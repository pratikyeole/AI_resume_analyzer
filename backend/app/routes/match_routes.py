from fastapi import APIRouter
from bson import ObjectId
import faiss
import pickle
import numpy as np

from app.utils.matcher import generate_embedding
from app.db.jobs import jobs_collection

router = APIRouter()

@router.post("/match-jobs")
async def match_jobs(resume_text: str):
    embedding = generate_embedding(resume_text)
    vector = np.array([embedding])

    # Load FAISS index
    index = faiss.read_index("faiss_store/index.faiss")

    # Load mapping
    mapping = pickle.load(open("faiss_store/mapping.pkl", "rb"))

    # Search top 5 similar jobs
    scores, ids = index.search(vector, 5)

    results = []
    for idx, score in zip(ids[0], scores[0]):
        job_id = mapping[idx]
        job = await jobs_collection.find_one({"_id": ObjectId(job_id)})

        job["_id"] = str(job["_id"])
        results.append({
            **job,
            "score": float(score)
        })

    return {"matches": results}
