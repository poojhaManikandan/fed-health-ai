import xgboost as xgb
import json
import os
from preprocessing import preprocess
from config import PARAMS, NUM_ROUNDS_INIT, MODEL_PATH, METADATA_PATH

X, y = preprocess("data/cleaned_huntington3.csv")

dtrain = xgb.DMatrix(X, label=y)

model = xgb.train(PARAMS, dtrain, num_boost_round=NUM_ROUNDS_INIT)

model.save_model(MODEL_PATH)

metadata = {
    "version": 1,
    "trained_on": "hospital1.csv"
}

with open(METADATA_PATH, "w") as f:
    json.dump(metadata, f, indent=4)

print("Initial global model created. Version 1")
