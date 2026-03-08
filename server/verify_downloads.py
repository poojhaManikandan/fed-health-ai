import requests

BASE_URL = "http://localhost:8000/api/models"

def test_downloads():
    for model_id in ["1", "2", "3", "4", "5", "6"]:
        print(f"Testing download for ID {model_id}...")
        try:
            response = requests.get(f"{BASE_URL}/{model_id}/download")
            if response.status_code == 200:
                content_disposition = response.headers.get('Content-Disposition', '')
                print(f"  Success! File: {content_disposition}")
            else:
                print(f"  Failed: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"  Error: {e}")

if __name__ == "__main__":
    test_downloads()
