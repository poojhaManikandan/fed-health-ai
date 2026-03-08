import pandas as pd

def preprocess(file_path):
    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    df = df.dropna(subset=["stage"])

    df = df.fillna(df.median(numeric_only=True))

    df["sex"] = df["sex"].map({"f": 0, "m": 1})

    y = df["stage"] - 1

    X = df.drop(["stage", "status", "id", "rownames"], axis=1, errors="ignore")

    return X, y
