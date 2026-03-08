import os
import subprocess

models_dir = r"d:\Fed_PSG\models"

# 1. Run the XGBoost models
xgboost_models = ["ALS", "Gene", "Huntington", "WD", "WDBC", "cirrhosis", "ckd", "parkinsons", "pbc"]
for model in xgboost_models:
    script_path = os.path.join(models_dir, model, "init_model.py")
    if os.path.exists(script_path):
        print(f"Training and saving {model}...")
        subprocess.run(["python", script_path], cwd=os.path.join(models_dir, model), check=True)
    else:
        print(f"Warning: Script not found for {model} at {script_path}")

# 2. Run the Skin Cancer PyTorch model
skin_cancer_script = os.path.join(models_dir, "skin_cancer", "model.py")
if os.path.exists(skin_cancer_script):
    print("Training and saving skin_cancer...")
    try:
        subprocess.run(["python", skin_cancer_script], cwd=os.path.join(models_dir, "skin_cancer"), check=True)
    except subprocess.CalledProcessError:
        print("Warning: skin_cancer dataset not found or training failed. Skipping retraining for skin_cancer.")
else:
    print(f"Warning: Script not found for skin_cancer at {skin_cancer_script}")

print("All 10 models have been saved!")
