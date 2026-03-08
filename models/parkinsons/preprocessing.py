import pandas as pd

def preprocess(file_path):
    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    df = df.dropna()

    if "status" not in df.columns:
        raise ValueError("status column not found")

    y = df["status"]

    X = df.drop(["status", "name"], axis=1)

    return X, y
