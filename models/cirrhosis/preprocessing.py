import pandas as pd
from sklearn.preprocessing import LabelEncoder


def preprocess(file_path):
    df = pd.read_csv(file_path)
    df.columns = df.columns.str.strip()

    df = df.dropna(subset=["Status"])

    df["Status"] = df["Status"].map({"C": 0, "CL": 1, "D": 2})

    df = df.fillna(df.median(numeric_only=True))

    for col in df.select_dtypes(include="object").columns:
        if col != "Status":
            df[col] = LabelEncoder().fit_transform(df[col].astype(str))

    df = df.drop(["ID", "Stage"], axis=1, errors="ignore")

    y = df["Status"]
    X = df.drop("Status", axis=1)

    return X, y
