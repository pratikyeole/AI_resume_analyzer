# scripts/build_faiss.py
import os
import faiss
from langchain_community.vectorstores.faiss import FAISS
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings

FAISS_DIR = "embeddings/faiss_index"
HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

os.makedirs(FAISS_DIR, exist_ok=True)

# 1. Load embeddings model
embedder = HuggingFaceEmbeddings(model_name=HF_MODEL, model_kwargs={"device": "cpu"})

# 2. Create a dummy embedding just to get dimension
sample_vector = embedder.embed_query("test text")
dim = len(sample_vector)

# 3. Create empty FAISS index with correct dimension
index = faiss.IndexFlatL2(dim)

# 4. Create empty docstore
docstore = InMemoryDocstore({})

# 5. Create empty mapping (FAISS internal id → doc_id)
index_to_docstore_id = {}

# 6. Create LangChain FAISS store
store = FAISS(
    embedding_function=embedder,
    index=index,
    docstore=docstore,
    index_to_docstore_id=index_to_docstore_id
)

# 7. Save empty FAISS store
store.save_local(FAISS_DIR)

print("✅ Empty FAISS index created successfully!")
