from fastapi import APIRouter
from bson import ObjectId
from app.models.job_model import JobCreate
from app.db.jobs import jobs_collection
from app.utils.matcher import add_job_to_faiss

router = APIRouter()

@router.post("/post-job")
async def post_job(job: JobCreate):
    try:
        job_data = job.dict()
        # insert in MongoDB
        res = await jobs_collection.insert_one(job_data)
        job_id = str(res.inserted_id)

        # metadata dict
        metadata = {
        "job_id": job_id,
        "title": job_data["title"],
        "company": job_data["company"]
    }

        # add to FAISS (text + metadata)
        # use combined text to create better embedding
        combined_text = f"{job.title}\n\n{job.description}\n\nSkills: {' '.join(job.skills)}"
        add_job_to_faiss(combined_text, metadata)

        return {
        "message": "Job stored successfully",
        "job_id": job_id,
        "job_title": job.title,
        "company": job.company,
        "location": job.location,
    }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))