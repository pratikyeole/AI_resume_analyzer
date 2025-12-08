import os
import pickle
import numpy as np
import faiss

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.docstore.in_memory import InMemoryDocstore
import uuid

HF_MODEL = os.getenv("HF_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
FAISS_DIR = os.getenv("FAISS_INDEX_PATH", "embeddings/faiss_index")

os.makedirs(FAISS_DIR, exist_ok=True)

embeddings = HuggingFaceEmbeddings(model_name=HF_MODEL, model_kwargs={"device": "cpu"})

MAPPING_PATH = os.path.join(FAISS_DIR, "mapping.pkl")
INDEX_PATH = os.path.join(FAISS_DIR, "index.faiss")


# ----------------------------------------------------
# SAFE load/create index without errors
# ----------------------------------------------------
def load_or_create_faiss():

    # Case 1 → load existing
    if os.path.exists(INDEX_PATH):
        print("✅ Loading FAISS index...")
        return FAISS.load_local(
            FAISS_DIR,
            embeddings,
            allow_dangerous_deserialization=True
        )

    # Case 2 → create new empty FAISS
    print("⚠ Creating new empty FAISS index...")

    # get embedding dimension
    dummy_embedding = embeddings.embed_query("hello world")
    dim = len(dummy_embedding)

    # create raw FAISS index
    index = faiss.IndexFlatL2(dim)

    # Proper docstore + mapping
    docstore = InMemoryDocstore({})
    index_to_docstore_id = {}

    # Create vectorstore correctly
    vectorstore = FAISS(
        embedding_function=embeddings,
        index=index,
        docstore=docstore,
        index_to_docstore_id=index_to_docstore_id
    )

    # save empty index
    vectorstore.save_local(FAISS_DIR)

    return vectorstore


# Load index safely
vectorstore = load_or_create_faiss()


# ----------------------------------------------------
# Ensure mapping file exists
# ----------------------------------------------------
if not os.path.exists(MAPPING_PATH):
    pickle.dump({}, open(MAPPING_PATH, "wb"))

id_mapping = pickle.load(open(MAPPING_PATH, "rb"))


# ----------------------------------------------------
# Generate embedding for job posting
# ----------------------------------------------------
def generate_job_embedding(text: str):
    return embeddings.embed_query(text)


# ----------------------------------------------------
# Add job posting to FAISS
# ----------------------------------------------------
def add_job_to_faiss(job_text: str, job_id: str):
    global vectorstore, id_mapping

    # Generate single embedding
    embedding = generate_job_embedding(job_text)

    # Add to FAISS vectorstore
    vectorstore.add_texts(
        texts=[job_text],
        metadatas=[{"job_id": job_id}],
        embeddings=[embedding]
    )

    # Save updated index
    vectorstore.save_local(FAISS_DIR)

    # Update mapping
    next_index = len(id_mapping)
    id_mapping[next_index] = job_id
    pickle.dump(id_mapping, open(MAPPING_PATH, "wb"))

    print(f"✔ Job {job_id} added to FAISS")
    return True


# ----------------------------------------------------
# Match resume with jobs
# ----------------------------------------------------
def match_resume_with_jobs(resume_text: str, k: int = 5):
    results = vectorstore.similarity_search_with_score(resume_text, k=k)

    out = []
    for doc, score in results:
        out.append({
            "job_description": doc.page_content,
            "metadata": doc.metadata,
            "similarity": float(score),
        })
    return out
