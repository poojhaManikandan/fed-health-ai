import json
import xgboost as xgb
import numpy as np
import sys
from sklearn.metrics import accuracy_score
from preprocessing import preprocess
from config import PARAMS, NUM_ROUNDS_UPDATE, MODEL_PATH, METADATA_PATH

if len(sys.argv) != 2:
    print("Usage: python continue_training.py hospital_file.csv")
    exit()

hospital_file = sys.argv[1]

X, y = preprocess(f"data/{hospital_file}")

dtrain = xgb.DMatrix(X, label=y)

model = xgb.train(
    PARAMS,
    dtrain,
    num_boost_round=NUM_ROUNDS_UPDATE,
    xgb_model=MODEL_PATH
)

model.save_model(MODEL_PATH)

# Evaluate on current dataset
pred_probs = model.predict(dtrain)
predictions = (pred_probs > 0.5).astype(int)

accuracy = accuracy_score(y, predictions) * 100

with open(METADATA_PATH, "r") as f:
    metadata = json.load(f)

metadata["version"] += 1
metadata["trained_on"] = hospital_file
metadata["accuracy"] = round(accuracy, 2)

with open(METADATA_PATH, "w") as f:
    json.dump(metadata, f, indent=4)

print(f"Wilson's Disease model updated.")
print(f"Version: {metadata['version']}")
print(f"Accuracy after update: {accuracy:.2f}%")
