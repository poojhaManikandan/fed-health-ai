PARAMS = {
    "objective": "multi:softprob",
    "num_class": 4,
    "max_depth": 6,
    "eta": 0.05,
    "eval_metric": "mlogloss"
}

NUM_ROUNDS_INIT = 100
NUM_ROUNDS_UPDATE = 50

MODEL_PATH = "models/huntington_model.json"
METADATA_PATH = "models/huntington_metadata.json"
 