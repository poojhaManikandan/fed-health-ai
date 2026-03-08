from fastapi import FastAPI, UploadFile, Form, Depends, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from pydantic import BaseModel
from sqlalchemy.orm import Session
from server.aggregator import aggregate
from server.auth import User, SessionLocal, get_password_hash, verify_password, create_access_token, get_current_user

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

UPDATE_FOLDER = "server/updates"
os.makedirs(UPDATE_FOLDER, exist_ok=True)

@app.get("/")
def root():
    return {"message": "FedHealthAI backend is running!"}

# --- AUTH ENDPOINTS ---

class SignupData(BaseModel):
    name: str
    hospital: str
    email: str
    password: str

class LoginData(BaseModel):
    email: str
    password: str

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/auth/signup")
async def signup(data: SignupData, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(User).filter(User.email == data.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        name=data.name,
        hospital=data.hospital,
        email=data.email,
        hashed_password=get_password_hash(data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = create_access_token(data={"sub": new_user.email})
    return {
        "token": token,
        "user": {
            "id": str(new_user.id),
            "name": new_user.name,
            "email": new_user.email,
            "hospital": new_user.hospital
        }
    }

@app.post("/api/auth/login")
async def login(data: LoginData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    token = create_access_token(data={"sub": user.email})
    return {
        "token": token,
        "user": {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "hospital": user.hospital
        }
    }

# --- MODEL & DATA ENDPOINTS ---

MODEL_MAPPING = {
    "1": {"path": "saved_models/Huntington_huntington.pt", "name": "Huntington_GeneNet.pt"},
    "2": {"path": "saved_models/ckd_chronic_kidney.pt", "name": "CKD-Risk-Sys.pt"},
    "3": {"path": "saved_models/WDBC_breast_cancer.pt", "name": "Breast-OncoScreen.pt"},
    "4": {"path": "saved_models/parkinsons.pt", "name": "Parkinson-GaitNet.pt"},
    "5": {"path": "saved_models/ALS_als.pt", "name": "ALS-Progression-AI.pt"},
    "6": {"path": "saved_models/cirrhosis.pt", "name": "Cirrhosis-Survive.pt"}
}

@app.get("/api/models/{model_id}/download")
def download_model_by_id(model_id: str, current_user: User = Depends(get_current_user)):
    if model_id not in MODEL_MAPPING:
        # Fallback for old endpoints or direct slugs
        slug_map = {
            "huntington": "1", "ckd": "2", "breast_cancer": "3",
            "parkinsons": "4", "als": "5", "cirrhosis": "6"
        }
        model_id = slug_map.get(model_id.lower(), model_id)
        if model_id not in MODEL_MAPPING:
            raise HTTPException(status_code=404, detail="Model not found")

    model_info = MODEL_MAPPING[model_id]
    if not os.path.exists(model_info["path"]):
        raise HTTPException(status_code=404, detail=f"Model file {model_info['path']} not found")
    
    return FileResponse(
        model_info["path"], 
        filename=model_info["name"], 
        media_type="application/octet-stream"
    )

@app.get("/api/models")
def list_models_metadata():
    # Return metadata matching frontend expectations if needed
    # For now, just return a success message or the mapping
    return {k: {"version": "1.0.0", "accuracy": 90.0, "hospitalsUsing": 10} for k in ["huntington", "ckd", "breast_cancer", "parkinsons", "als", "cirrhosis"]}

@app.get("/models/latest")
def download_latest_model():
    # Keep for compatibility but redirect to dynamic logic
    return download_model_by_id("2") # Default to CKD

@app.post("/local/upload-dataset")
async def upload_dataset(file: UploadFile = Form(...), disease: str = Form(...)):
    file_path = os.path.join(UPDATE_FOLDER, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"message": "Dataset uploaded successfully", "filename": file.filename, "disease": disease}

@app.post("/upload_update")
async def upload_update(file: UploadFile):
    file_path = os.path.join(UPDATE_FOLDER, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"message": "Update received"}

@app.get("/aggregate")
def run_aggregation():
    aggregate()
    return {"message": "Aggregation completed"}
