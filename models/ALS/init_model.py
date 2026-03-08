import os
import json
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.metrics import accuracy_score
from preprocessing import preprocess

os.makedirs("models", exist_ok=True)
os.makedirs("../../saved_models", exist_ok=True)
MODEL_PATH = "../../saved_models/als_model.pt"
METADATA_PATH = "models/metadata.json"

X, y = preprocess("data/als_1.csv")

# Convert to PyTorch tensors
X_tensor = torch.tensor(X.values, dtype=torch.float32)
y_tensor = torch.tensor(y.values, dtype=torch.float32).unsqueeze(1)

# Define PyTorch Model Architecture
class FederatedModel(nn.Module):
    def __init__(self, input_dim):
        super(FederatedModel, self).__init__()
        self.fc1 = nn.Linear(input_dim, 64)
        self.relu1 = nn.ReLU()
        self.fc2 = nn.Linear(64, 32)
        self.relu2 = nn.ReLU()
        self.fc3 = nn.Linear(32, 1)
        self.sigmoid = nn.Sigmoid()
        
    def forward(self, x):
        out = self.fc1(x)
        out = self.relu1(out)
        out = self.fc2(out)
        out = self.relu2(out)
        out = self.fc3(out)
        return self.sigmoid(out)

model = FederatedModel(X_tensor.shape[1])
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=0.005)

# Train the model
epochs = 50
for epoch in range(epochs):
    optimizer.zero_grad()
    predictions = model(X_tensor)
    loss = criterion(predictions, y_tensor)
    loss.backward()
    optimizer.step()

# Validate and Save
model.eval()
with torch.no_grad():
    final_preds = model(X_tensor)
    binary_preds = (final_preds > 0.5).int().numpy()
    accuracy = accuracy_score(y.values, binary_preds) * 100

torch.save(model.state_dict(), MODEL_PATH)

metadata = {
    "version": 1,
    "trained_on": "als_1.csv",
    "accuracy": round(accuracy, 2),
    "architecture": "PyTorch DNN"
}

with open(METADATA_PATH, "w") as f:
    json.dump(metadata, f, indent=4)

print(f"ALS Global PyTorch model initialized.")
print(f"Version: 1")
print(f"Accuracy after init: {accuracy:.2f}%")

