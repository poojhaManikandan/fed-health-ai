PARAMS = {
    "objective": "binary:logistic",
    "max_depth": 5,
    "eta": 0.05,
    "eval_metric": "logloss"
}

NUM_ROUNDS_INIT = 100
NUM_ROUNDS_UPDATE = 50
MODEL_PATH = "models/chronic_kidney_xgb.model.json"
METADATA_PATH = "models/chronic_kidney_metadata.json"