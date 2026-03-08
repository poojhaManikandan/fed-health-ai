PARAMS = {
    "objective": "binary:logistic",
    "max_depth": 5,
    "eta": 0.05,
    "eval_metric": "logloss"
}

NUM_ROUNDS_INIT = 100
NUM_ROUNDS_UPDATE = 75
MODEL_PATH = "models/wilson's_disease_xgb.model.json"
METADATA_PATH = "models/wilson's_metadata.json"