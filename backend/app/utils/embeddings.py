import os
import faiss
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.docstore.in_memory import InMemoryDocstore
import uuid

HF_MODEL = os.getenv("HF_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
FAISS_DIR = os.getenv("FAISS_INDEX_PATH", "embeddings/faiss_index")

embeddings = HuggingFaceEmbeddings(model_name=HF_MODEL, model_kwargs={"device": "cpu"})
INDEX_FILE = os.path.join(FAISS_DIR, "index.faiss")


# ------------------------------------------------------
# Load or create FAISS
# ------------------------------------------------------
def load_or_create_faiss():
    os.makedirs(FAISS_DIR, exist_ok=True)

    # Case 1: If FAISS exists → load it
    if os.path.exists(INDEX_FILE):
        print("✅ Loaded existing FAISS index")
        return FAISS.load_local(
            FAISS_DIR,
            embeddings,
            allow_dangerous_deserialization=True
        )

    # Case 2: Create new FAISS
    print("⚠ Creating new FAISS index")

    dummy = embeddings.embed_query("hello world")
    dim = len(dummy)

    index = faiss.IndexFlatL2(dim)

    vectorstore = FAISS(
        embedding_function=embeddings,
        index=index,
        docstore=InMemoryDocstore({}),
        index_to_docstore_id={}
    )

    vectorstore.save_local(FAISS_DIR)
    return vectorstore


# ------------------------------------------------------
# Add job
# ------------------------------------------------------
def add_job_to_faiss(job_text: str, metadata: dict):
    vectorstore = load_or_create_faiss()

    vectorstore.add_texts(
        texts=[job_text],
        metadatas=[metadata],
    )

    vectorstore.save_local(FAISS_DIR)

    print("Job added to FAISS:", metadata)

def debug_faiss():
    vectorstore = load_or_create_faiss()
    
    print("\n===== FAISS DEBUG INFO =====")
    print("Total vectors stored:", len(vectorstore.index_to_docstore_id))

    # Print metadata
    for idx, doc_id in vectorstore.index_to_docstore_id.items():
        print(f"Index {idx}: Metadata ->", vectorstore.docstore.search(doc_id))
