import xgboost as xgb
from sklearn.metrics import accuracy_score
from preprocessing import preprocess
from config import MODEL_PATH

X, y = preprocess("data/cir_3.csv")

dtest = xgb.DMatrix(X)

model = xgb.Booster()
model.load_model(MODEL_PATH)

pred_probs = model.predict(dtest)
predictions = pred_probs.argmax(axis=1)

accuracy = accuracy_score(y, predictions) * 100

print(f"Cirrhosis Global Model Accuracy: {accuracy:.2f}%")
