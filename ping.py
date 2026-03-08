import requests

url = "http://127.0.0.1:9001/train_predict"

try:
    with open("d:/Fed_PSG/hospital/api.py", "rb") as f:
        files = {"file": f}
        data = {"disease": "gene"}
        
        print("Pinging:", url)
        response = requests.post(url, files=files, data=data)
        
        print("Status Code:", response.status_code)
        print("Response Text:", response.text)
except requests.exceptions.ConnectionError as e:
    print("ConnectionError: Is the uvicorn server definitely running? Details:", str(e))
except Exception as e:
    print("Other Error:", str(e))
