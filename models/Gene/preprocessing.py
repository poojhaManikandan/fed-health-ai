import pandas as pd
from sklearn.preprocessing import LabelEncoder


def preprocess(file_path):
    df = pd.read_csv(file_path)
    df.columns = df.columns.str.strip()

    if "ClaimNb" not in df.columns:
        raise ValueError("Target column 'ClaimNb' not found")

    df["ClaimNb"] = df["ClaimNb"].apply(lambda x: 1 if x > 0 else 0)

    df = df.drop("IDpol", axis=1)

    df = df.fillna(df.median(numeric_only=True))

    for col in df.select_dtypes(include="object").columns:
        df[col] = LabelEncoder().fit_transform(df[col].astype(str))

    y = df["ClaimNb"]
    X = df.drop("ClaimNb", axis=1)

    return X, y
