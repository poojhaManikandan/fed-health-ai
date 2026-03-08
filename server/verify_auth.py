import requests
import sys

BASE_URL = "http://localhost:8000/api/auth"

def test_signup():
    print("Testing Signup...")
    data = {
        "name": "Test User",
        "hospital": "Test Hospital",
        "email": "test@example.com",
        "password": "testpassword123"
    }
    try:
        response = requests.post(f"{BASE_URL}/signup", json=data)
        if response.status_code == 200:
            print("Signup Success!")
            return True
        elif response.status_code == 400 and "Email already registered" in response.text:
            print("Signup Success (already registered)!")
            return True
        else:
            print(f"Signup Failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"Signup Error: {e}")
        return False

def test_login():
    print("Testing Login...")
    data = {
        "email": "test@example.com",
        "password": "testpassword123"
    }
    try:
        response = requests.post(f"{BASE_URL}/login", json=data)
        if response.status_code == 200:
            print("Login Success!")
            print(f"User: {response.json()['user']['name']}")
            return True
        else:
            print(f"Login Failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"Login Error: {e}")
        return False

if __name__ == "__main__":
    s = test_signup()
    l = test_login()
    if s and l:
        print("\nAll auth tests passed!")
    else:
        print("\nSome tests failed.")
        sys.exit(1)
