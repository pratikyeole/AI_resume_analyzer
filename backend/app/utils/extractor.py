import docx2txt
import PyPDF2
import tempfile
from fastapi import UploadFile

def extract_pdf(file: UploadFile):
    reader = PyPDF2.PdfReader(file.file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text


def extract_docx(file: UploadFile):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
        tmp.write(file.file.read())
        tmp_path = tmp.name
    text = docx2txt.process(tmp_path)
    return text


def extract_resume_text(file: UploadFile):
    if file.filename.lower().endswith(".pdf"):
        return extract_pdf(file)
    if file.filename.lower().endswith(".docx"):
        return extract_docx(file)
    raise ValueError("Unsupported file format. Upload PDF or DOCX.")
