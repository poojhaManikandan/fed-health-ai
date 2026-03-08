def aggregate():
    print("Aggregation logic goes here.")
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import torch
from fastapi.responses import FileResponse
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"]
)
GLOBAL_MODELS = {
    "ckd": "D:/Fed_PSG/saved_models/ckd_chronic_kidney.pt",
    "skin_cancer": "D:/Fed_PSG/saved_models/model.pt",
    "als": "D:/Fed_PSG/saved_models/ALS_als.pt",
    "cirrhosis": "D:/Fed_PSG/saved_models/cirrhosis.pt",
    "gene": "D:/Fed_PSG/saved_models/Gene_genetic.pt",
    "huntington": "D:/Fed_PSG/saved_models/Huntington_huntington.pt",
    "parkinsons": "D:/Fed_PSG/saved_models/parkinsons.pt",
    "pbc": "D:/Fed_PSG/saved_models/pbc.pt",
    "wilson": "D:/Fed_PSG/saved_models/WD_wilson's_disease.pt",
    "breast_cancer": "D:/Fed_PSG/saved_models/WDBC_breast_cancer.pt"
}

# Mapping numeric frontend IDs to disease slugs
ID_TO_SLUG = {
    "1": "huntington",
    "2": "ckd",
    "3": "breast_cancer",
    "4": "parkinsons",
    "5": "als",
    "6": "cirrhosis"
}

# Live metadata for the website
MODEL_METADATA = {
    "huntington": {"accuracy": 91.8, "hospitalsUsing": 10, "version": "1.3.0"},
    "ckd":        {"accuracy": 91.5, "hospitalsUsing": 18, "version": "2.1.0"},
    "breast_cancer":{"accuracy": 95.8, "hospitalsUsing": 25, "version": "3.0.1"},
    "parkinsons": {"accuracy": 88.4, "hospitalsUsing": 14, "version": "1.4.0"},
    "als":        {"accuracy": 86.7, "hospitalsUsing": 9,  "version": "1.1.0"},
    "cirrhosis":  {"accuracy": 89.3, "hospitalsUsing": 22, "version": "1.8.5"}
}

disease_updates = {}

@app.get("/models/latest")
async def get_latest_model():
    model_path = GLOBAL_MODELS.get("ckd")
    if os.path.exists(model_path):
        return FileResponse(model_path, filename="ckd_chronic_kidney_xgb.model.json")
    return {"error": "Model not found"}

@app.get("/models/{model_id}")
async def download_model_direct(model_id: str):
    # Support both slugs and numeric IDs
    slug = ID_TO_SLUG.get(model_id, model_id)
    model_path = GLOBAL_MODELS.get(slug)
    
    if model_path and os.path.exists(model_path):
        return FileResponse(
            model_path, 
            filename=f"{slug}_model.pt",
            media_type="application/octet-stream"
        )
    return {"error": f"Model '{model_id}' not found"}

@app.get("/api/models/{model_id}/download")
async def download_model_api(model_id: str):
    return await download_model_direct(model_id)

@app.get("/api/models")
async def get_all_models_metadata():
    return MODEL_METADATA

@app.post("/upload_update")
async def receive_update(
    disease: str = Form(...), 
    file: UploadFile = Form(...),
    accuracy: float = Form(0.0)
):
    print(f"Received secure update for: {disease}")
    
    # Translate numeric ID to slug if needed
    disease = ID_TO_SLUG.get(disease, disease)
    
    received_file_path = f"received_{file.filename}"
    with open(received_file_path, "wb") as f:
        f.write(await file.read())

    weight_updates = torch.load(received_file_path, weights_only=False)
    global_model_path = GLOBAL_MODELS.get(disease)
    if not global_model_path or not os.path.exists(global_model_path):
        os.remove(received_file_path)
        return {"error": "Global model not found for this disease."}
        
    if disease not in disease_updates:
        disease_updates[disease] = []
        
    disease_updates[disease].append(weight_updates)
    os.remove(received_file_path)
    
    # IMMEDIATE AGGREGATION (Threshold = 1)
    if len(disease_updates[disease]) >= 1:
        print(f"Applying update for {disease} immediately to global model...")
        global_model = torch.load(global_model_path, weights_only=False)
        
        # Since we are aggregating immediately, the "average" is just the latest update
        latest_update = disease_updates[disease][-1]
        
        for key in latest_update.keys():
            if key in global_model:
                # Apply the weight difference to the global model
                global_model[key] = global_model[key] + latest_update[key]

        torch.save(global_model, global_model_path)
        print(f"Global model for {disease} securely updated and replaced!")
        
        # Update metadata for the website
        if disease in MODEL_METADATA:
            MODEL_METADATA[disease]["hospitalsUsing"] += 1
            if accuracy > 0:
                # Simple moving average for demonstration
                old_acc = MODEL_METADATA[disease]["accuracy"]
                MODEL_METADATA[disease]["accuracy"] = round((old_acc * 0.9) + (accuracy * 0.1), 2)
            
            # Increment version minor
            v_parts = MODEL_METADATA[disease]["version"].split('.')
            v_parts[-1] = str(int(v_parts[-1]) + 1)
            MODEL_METADATA[disease]["version"] = ".".join(v_parts)

        # Clear the queue
        disease_updates[disease] = []
        
        return {"status": "success", "message": "Global model updated immediately!"}

    return {"status": "success", "message": "Update received."}

def aggregate():
    print("Aggregation logic goes here.")
