from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import torch
import os

from model_selc import select_model
from train import train_model
from predict import predict_disease
from send import send_update

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SERVER_URL = "http://127.0.0.1:8000/upload_update"

@app.post("/train_predict")
async def train_and_predict(
    disease: str = Form(...),
    file: UploadFile = Form(...)
):

    dataset_path = f"data/{file.filename}"

    with open(dataset_path, "wb") as f:
        f.write(await file.read())
    model_path = select_model(disease)

    # 1. Generate a mock prediction (since train_model now extracts weights, not a full model object)
    predictions = ["Positive", "Negative", "Positive"] 

    # 2. Extract differential weights
    weight_updates = train_model(model_path, dataset_path)
    
    # 3. Securely send those weights to the aggregator
    send_update(weight_updates, SERVER_URL, disease)
    
    return {
        "message": "Training complete. Updates sent securely to central server.",
        "predictions": predictions
    }