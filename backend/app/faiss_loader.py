from app.utils.embeddings import load_faiss

def get_vectorstore():
    return load_faiss()
