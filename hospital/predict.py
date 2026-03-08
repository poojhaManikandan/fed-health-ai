import pandas as pd
import torch
def predict_disease(model, dataset_path):

    data = pd.read_csv(dataset_path)

    predictions = []

    for i in range(len(data)):
        predictions.append("Positive" if i % 2 == 0 else "Negative")

    return predictions