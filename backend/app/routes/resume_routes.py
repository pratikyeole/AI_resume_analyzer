from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List

from app.utils.extractor import extract_resume_text
from app.utils.analyzer import analyze_resume_text
from app.utils.matcher import match_resume_with_jobs

router = APIRouter()


# -----------------------------
#  1. Upload Resume Route
# -----------------------------
@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        # Validate file format
        allowed_extensions = (".pdf", ".docx", ".txt")
        if not file.filename.lower().endswith(allowed_extensions):
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Allowed formats: PDF, DOCX, TXT"
            )

        # Extract text (utility handles internal parsing)
        resume_text = extract_resume_text(file)

        return {
            "message": "Resume uploaded successfully",
            "filename": file.filename,
            "extracted_text": resume_text,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error extracting resume: {str(e)}"
        )

# -----------------------------
#  2. Analyze Resume Route
# -----------------------------
class AnalyzeRequest(BaseModel):
    resume_text: str


@router.post("/analyze-resume")
async def analyze_resume(request: AnalyzeRequest):
    try:
        analysis = analyze_resume_text(request.resume_text)
        return {"analysis": analysis}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Resume analysis failed: {str(e)}"
        )
