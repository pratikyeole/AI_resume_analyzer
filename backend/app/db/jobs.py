from .connection import db

jobs_collection = db["jobs"]  # this will auto-create if not exist
