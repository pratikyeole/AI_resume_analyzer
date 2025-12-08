from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.1-8b-instant"      # Fast + cheap + very accurate
)

def analyze_resume_text(resume_text: str):

    prompt = f"""
You are an expert resume analyst. Analyze the following resume text:

RESUME:
{resume_text}

Return JSON with the following fields:
- skills
- strengths
- weaknesses
- improvement_suggestions
- predicted_job_titles
- summary
    """

    response = llm.invoke(prompt)
    return response.content
