import os
import json
import xgboost as xgb
from sklearn.metrics import accuracy_score
from preprocessing import preprocess
from config import PARAMS, NUM_ROUNDS_INIT, MODEL_PATH, METADATA_PATH

os.makedirs("models", exist_ok=True)

X, y = preprocess("data/gd_1.csv")

dtrain = xgb.DMatrix(X, label=y)

model = xgb.train(PARAMS, dtrain, num_boost_round=NUM_ROUNDS_INIT)

model.save_model(MODEL_PATH)

pred_probs = model.predict(dtrain)
predictions = pred_probs.argmax(axis=1)

accuracy = accuracy_score(y, predictions) * 100

metadata = {
    "version": 1,
    "trained_on": "genetic_1.csv",
    "accuracy": round(accuracy, 2)
}

with open(METADATA_PATH, "w") as f:
    json.dump(metadata, f, indent=4)

print("Genetic Disorder model initialized.")
print(f"Accuracy after init: {accuracy:.2f}%")
