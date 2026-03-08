import xgboost as xgb
import json
import sys
from preprocessing import preprocess
from config import PARAMS, NUM_ROUNDS_UPDATE, MODEL_PATH, METADATA_PATH

if len(sys.argv) != 2:
    print("Usage: python continue_training.py hospital_file.csv")
    sys.exit(1)

hospital_file = f"data/{sys.argv[1]}"

X, y = preprocess(hospital_file)

dtrain = xgb.DMatrix(X, label=y)

model = xgb.train(
    PARAMS,
    dtrain,
    num_boost_round=NUM_ROUNDS_UPDATE,
    xgb_model=MODEL_PATH
)

model.save_model(MODEL_PATH)

with open(METADATA_PATH, "r") as f:
    metadata = json.load(f)

metadata["version"] += 1
metadata["trained_on"] = sys.argv[1]

with open(METADATA_PATH, "w") as f:
    json.dump(metadata, f, indent=4)

print(f"Model updated. New Version: {metadata['version']}")
