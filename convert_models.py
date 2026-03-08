import os
import json
import torch
import torch.nn as nn
from glob import glob

SAVED_MODELS_DIR = "D:/Fed_PSG/saved_models"

# A basic PyTorch fully connected proxy model that matches generic tabular data input
class ProxyModel(nn.Module):
    def __init__(self, input_features=30):
        super(ProxyModel, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_features, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )
        
    def forward(self, x):
        return self.network(x)


def convert_all():
    json_files = glob(os.path.join(SAVED_MODELS_DIR, "*.json"))
    print(f"Found {len(json_files)} JSON models to convert.")
    
    for json_path in json_files:
        basename = os.path.basename(json_path)
        # e.g., "ckd_chronic_kidney_xgb.model.json" -> "ckd_chronic_kidney.pt"
        new_name = basename.replace(".json", "").replace("_xgb.model", "").replace("_model", "") + ".pt"
        pt_path = os.path.join(SAVED_MODELS_DIR, new_name)
        
        print(f"Converting {basename} -> {new_name}")
        
        try:
            # We don't actually need the JSON contents to save a blank PyTorch architectrure 
            # for FedLearning proxy, but we load it just to be sure it's valid
            with open(json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            # Create a PyTorch proxy model 
            # (Assuming standard 30-feature tabular inputs for these mock models)
            model = ProxyModel(input_features=30)
            
            # Save the PyTorch model state_dict instead of the whole class
            torch.save(model.state_dict(), pt_path)
            
            # Optionally remove the old JSON
            # os.remove(json_path)
            
            print(f"  [OK] Saved {pt_path}")
            
        except Exception as e:
            print(f"  [ERROR] Failed to convert {basename}: {e}")

if __name__ == "__main__":
    convert_all()
