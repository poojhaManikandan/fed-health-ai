PARAMS = {
    "objective": "binary:logistic",
    "max_depth": 6,
    "eta": 0.05,
    "eval_metric": "logloss",
    "subsample": 0.8,
    "colsample_bytree": 0.8
}

NUM_ROUNDS_INIT = 200
NUM_ROUNDS_UPDATE = 100

MODEL_PATH = "models/parkinsons_model.json"
METADATA_PATH = "models/parkinsons_metadata.json"
