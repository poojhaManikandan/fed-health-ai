import pandas as pd

def preprocess(file_path):
    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    for col in df.columns:
        if df[col].dtype == "object":
            df[col] = df[col].astype(str).str.strip()

    df = df.replace("?", pd.NA)

    if "class" not in df.columns:
        raise ValueError("classification column not found")

    df = df.dropna(subset=["class"])

    df["classification"] = df["class"].map({
        "ckd": 1,
        "ckd\t": 1,
        "notckd": 0,
        "notckd\t": 0
    })

    y = df["classification"]
    X = df.drop("classification", axis=1)

    for col in X.columns:
        X[col] = pd.to_numeric(X[col], errors="coerce")

    X = X.fillna(X.median())

    return X, y
