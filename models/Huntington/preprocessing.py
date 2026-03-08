import pandas as pd

DROP_COLUMNS = [
    "Patient_ID",
    "Random_Protein_Sequence",
    "Random_Gene_Sequence",
    "Gene_Mutation_Type",
    "Gene/Factor",
    "Chromosome_Location",
    "Function",
    "Effect",
    "Category"
]

def assign_stage(row):
    if row["HTT_CAG_Repeat_Length"] < 36 and row["Motor_Symptoms"] == 0 and row["Functional_Capacity"] > 80:
        return 0
    elif row["Motor_Symptoms"] <= 1 and 60 < row["Functional_Capacity"] <= 80:
        return 1
    elif row["Motor_Symptoms"] >= 1 and 30 < row["Functional_Capacity"] <= 60:
        return 2
    elif row["Motor_Symptoms"] == 2 and row["Functional_Capacity"] <= 30:
        return 3
    else:
        return 1

def preprocess(file_path):
    df = pd.read_csv(file_path)

    df = df.drop(columns=DROP_COLUMNS, errors="ignore")
    df = df.dropna()

    df["Motor_Symptoms"] = df["Motor_Symptoms"].map({
        "Mild": 0,
        "Moderate": 1,
        "Severe": 2
    })

    df["Cognitive_Decline"] = df["Cognitive_Decline"].map({
        "Mild": 0,
        "Moderate": 1,
        "Severe": 2
    })

    df["Family_History"] = df["Family_History"].map({"Yes": 1, "No": 0})
    df["Sex"] = df["Sex"].map({"Male": 1, "Female": 0})

    df["Disease_Stage"] = df.apply(assign_stage, axis=1)

    X = df.drop("Disease_Stage", axis=1)
    y = df["Disease_Stage"]

    return X, y
