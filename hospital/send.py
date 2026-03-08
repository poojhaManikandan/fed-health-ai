import torch
import requests
import os

def send_update(weight_updates, server_url, disease_name):
    print(f"Preparing secure model update for {disease_name}...")
    update_file = f"update_{disease_name}.bin"
    torch.save(weight_updates, update_file)
    try:
        print(f"Uploading {update_file} in the background...")
        with open(update_file, "rb") as f:
            files = {"file": f}
            data = {"disease": disease_name} 
            
            response = requests.post(server_url, files=files, data=data)
            print("Server Response:", response.json())
            
        os.remove(update_file)
        
    except Exception as e:
        print(f"Failed to upload update: {e}")
