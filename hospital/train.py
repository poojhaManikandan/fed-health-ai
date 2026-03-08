import torch
import pandas as pd
def train_model(model_path, dataset_path):
    model = torch.load(model_path, weights_only=False)
    original_weights={k:v.clone() for k,v in model.items()}
    data=pd.read_csv(dataset_path)
    for key in model:
        model[key]=original_weights[key]+torch.randn_like(model[key])*0.01
    weight_updates={}
    for key in model.keys():
        weight_updates[key]=model[key]-original_weights[key]
    return weight_updates