from app.utils.faiss_handler import load_faiss

vs = load_faiss()
query = "full stack developer with react node skills"
results = vs.similarity_search(query, k=5)
print(results)
