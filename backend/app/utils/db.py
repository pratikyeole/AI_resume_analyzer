from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI")  # set in .env
DB_NAME = os.getenv("MONGO_DB_NAME", "resume_analyzer")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

jobs_collection = db["jobs"]
