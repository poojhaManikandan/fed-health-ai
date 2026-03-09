

Tutorial Video:

https://github.com/user-attachments/assets/6de82296-2424-45cb-b8b9-19b59e1e94cf

# FedHealthAI 🏥

FedHealthAI is a secure federated learning platform designed for collaborative medical AI research. It allows hospitals to train global disease models on local patient data without ever sharing sensitive information.

## 🚀 Features

- **Privacy-First**: Raw patient data never leaves the hospital node.
- **Secure Aggregation**: Only encrypted model weights are sent to the central aggregator.
- **Disease Libraries**: Pre-trained models for Huntington's, CKD, Breast Cancer, ALS, and more.
- **Verification Reports**: Automated PDF generation for clinical diagnosis and training verification.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Framer Motion, TailwindCSS
- **Central Aggregator**: FastAPI, PyTorch (Deep Learning Core)
- **Hospital Node**: Python Standalone Node (HTTPServer), PyTorch, Pandas

## 📥 Installation

### 1. Central Aggregator & Models
Ensure you have Python 3.9+ installed.
```bash
pip install -r requirements.txt
```

### 2. Frontend Dashboard
```bash
cd health-ai-frontend
npm install
```

## 🏃 Running the Project

### Start the Aggregator (Global Model Server)
```bash
python -m uvicorn server.aggregator:app --host 0.0.0.0 --port 8000
```

### Start the Frontend
```bash
npm run dev
```

### Start the Hospital Node (Local Training & Prediction)
See the local training guide below.

## 🎓 Steps to Use Local Training

1. **Download Global Model**: Visit the [FedHealthAI Website] and download the `.pt` model for your target disease.
2. **Download Hospital Node**: Download the `FedHealthAI_Node.exe` from the latest releases.
3. **Launch Node**: Double-click `FedHealthAI_Node.exe`. This starts the local portal and automatically opens `http://localhost:7474` in your browser.
4. **Select Target**: Choose the corresponding disease in the Dashboard.
5. **Upload Model**: Provide the `.pt` file you downloaded.
6. **Upload Dataset**: Upload your local patient records in `.csv` format.
7. **Train**: Click "Start Local Training". Once finished, a secure update is sent to the central server, and a verification report is generated.

## 🔄 Model Conversion (XGBoost to PyTorch)
If you have legacy XGBoost models, use the conversion tool:
```bash
python convert_models.py
```

