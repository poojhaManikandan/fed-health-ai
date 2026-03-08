import pandas as pd


def preprocess(file_path):
    df = pd.read_csv(file_path, header=None)

    df.columns = ["id", "diagnosis"] + [f"feature_{i}" for i in range(1, df.shape[1] - 1)]

    df["diagnosis"] = df["diagnosis"].map({"M": 1, "B": 0})

    df = df.drop("id", axis=1)

    y = df["diagnosis"]
    X = df.drop("diagnosis", axis=1)

    return X, y
