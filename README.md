# AI Resume Analyzer & Job Matcher

Monorepo with:
- backend: FastAPI + FAISS + sentence-transformers
- frontend: React (Vite)

## Quickstart (backend)
1. Create Python 3.11 venv and activate
2. `pip install -r backend/requirements.txt`
3. `python backend/scripts/build_faiss.py` (optional)
4. `uvicorn app.main:app --reload --port 8000`

## Do not commit:
- backend/.env (secrets)
- embeddings/faiss_index (heavy binary)
