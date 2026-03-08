import pandas as pd

def preprocess(file_path):
    df = pd.read_csv(file_path)

    df.columns = df.columns.str.strip()

    df = df.dropna()

    df["Gender"] = df["Gender"].map({
        "Male": 1,
        "Female": 0
    })

    df["Dataset"] = df["Dataset"].map({
        1: 1,
        2: 0
    })

    y = df["Dataset"]
    X = df.drop("Dataset", axis=1)

    return X, y
