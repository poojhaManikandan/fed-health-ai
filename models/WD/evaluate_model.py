import xgboost as xgb
import numpy as np
from sklearn.metrics import accuracy_score
from preprocessing import preprocess
from config import MODEL_PATH

X, y = preprocess("data/liver_3.csv")

dtest = xgb.DMatrix(X)

model = xgb.Booster()
model.load_model(MODEL_PATH)

pred_probs = model.predict(dtest)
predictions = (pred_probs > 0.5).astype(int)

accuracy = accuracy_score(y, predictions) * 100

print(f"Current Global Model Accuracy: {accuracy:.2f}%")
