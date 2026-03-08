import pandas as pd
from sklearn.preprocessing import LabelEncoder


def preprocess(file_path):
    df = pd.read_csv(file_path)
    df.columns = df.columns.str.strip()

    if "Diagnosis (ALS)" not in df.columns:
        raise ValueError("Target column 'Diagnosis (ALS)' not found")

    if "ID" in df.columns:
        df = df.drop("ID", axis=1)

    if "Sex" in df.columns:
        df["Sex"] = LabelEncoder().fit_transform(df["Sex"])

    df["Diagnosis (ALS)"] = LabelEncoder().fit_transform(
        df["Diagnosis (ALS)"]
    )

    df = df.fillna(df.median(numeric_only=True))

    y = df["Diagnosis (ALS)"]
    X = df.drop("Diagnosis (ALS)", axis=1)

    return X, y
