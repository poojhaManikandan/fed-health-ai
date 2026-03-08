import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader, random_split

DATA_DIR = r"D:\skin_cancer\binary_dataset"

BATCH_SIZE = 32
EPOCHS = 10  # Reduced to 10 for faster training while still sufficient
LR = 0.0001

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using device:", device)

transform = transforms.Compose([
    transforms.Resize((224, 224)),

    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.RandomRotation(180),  # Increased rotation
    transforms.RandomAffine(degrees=0, translate=(0.2, 0.2), scale=(0.8, 1.2), shear=15), # Affine transforms
    transforms.RandomPerspective(distortion_scale=0.4, p=0.5), # Perspective distortion

    transforms.ColorJitter(
        brightness=0.4,
        contrast=0.4,
        saturation=0.4,
        hue=0.1
    ),

    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

dataset = datasets.ImageFolder(DATA_DIR, transform=transform)
class_names = dataset.classes
print("Classes:", class_names)

train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False)

num_cancer = len(os.listdir(os.path.join(DATA_DIR, "Cancer")))
num_non_cancer = len(os.listdir(os.path.join(DATA_DIR, "Non_Cancer")))

total = num_cancer + num_non_cancer

weights = torch.tensor([
    total / (2 * num_cancer),
    total / (2 * num_non_cancer)
], dtype=torch.float32).to(device)

criterion = nn.CrossEntropyLoss(weight=weights)

print("Class weights:", weights)

from torchvision.models import resnet18, ResNet18_Weights

model = resnet18(weights=ResNet18_Weights.DEFAULT)

model.fc = nn.Linear(model.fc.in_features, 2)

model = model.to(device)

optimizer = optim.Adam(model.parameters(), lr=LR)

best_acc = 0.0
for epoch in range(EPOCHS):

    model.train()
    running_loss = 0

    for i, (images, labels) in enumerate(train_loader):

        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        outputs = model(images)
        loss = criterion(outputs, labels)

        loss.backward()
        optimizer.step()

        running_loss += loss.item()

        if i % 10 == 0:
            print(f"Epoch {epoch+1} | Batch {i} | Loss {loss.item():.4f}")

    print(f"\nEpoch {epoch+1}/{EPOCHS}")
    print("Training Loss:", running_loss)

    model.eval()
    correct = 0
    total_samples = 0

    with torch.no_grad():
        for images, labels in val_loader:
            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)
            _, predicted = torch.max(outputs, 1)

            total_samples += labels.size(0)
            correct += (predicted == labels).sum().item()

    acc = 100 * correct / total_samples
    print(f"Validation Accuracy: {acc:.2f}%")

    if acc > best_acc:
        best_acc = acc
        torch.save(model.state_dict(), "skin_cancer_model.pth")
        print("✅ Model saved!")

print("\nTraining Finished!")
print("Best Validation Accuracy:", best_acc)