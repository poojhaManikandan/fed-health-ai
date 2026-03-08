PARAMS = {
    "objective": "multi:softprob",
    "num_class": 3,
    "max_depth": 6,
    "eta": 0.05,
    "eval_metric": "mlogloss",
    "subsample": 0.8,
    "colsample_bytree": 0.8
}

NUM_ROUNDS_INIT = 300
NUM_ROUNDS_UPDATE = 150

MODEL_PATH = "models/genetic_model.json"
METADATA_PATH = "models/genetic_metadata.json"
