# Cancer Prediction Backend API

A FastAPI-based backend service for cancer prediction using machine learning models.

## 🎯 Overview

This backend service provides a RESTful API for cancer prediction using machine learning models. It processes medical data and returns predictions using trained models built with scikit-learn and LightGBM.

## 🛠️ Technology Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **scikit-learn** - Machine learning library for model training and prediction
- **LightGBM** - Gradient boosting framework for high-performance machine learning
- **pandas** - Data manipulation and analysis
- **joblib** - Model persistence and loading
- **Python-multipart** - File upload handling
- **openpyxl** - Excel file processing

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## 🚀 Installation

1. Make sure you have Python installed:
   - Download Python 3.8 or higher from [python.org](https://www.python.org/downloads/)
   - During installation, check "Add Python to PATH"
   - Verify installation by opening Command Prompt and running:
     ```bash
     python --version
     pip --version
     ```

2. Create a virtual environment:
   - Open Command Prompt in the Back-end directory
   - Create the virtual environment:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     ```bash
     venv\Scripts\activate
     ```
   - You should see `(venv)` at the beginning of your command prompt

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Verify the installation:
   ```bash
   python -c "import fastapi; import pandas; import joblib; import lightgbm; print('All dependencies installed successfully!')"
   ```

Note: If you encounter any issues with installing LightGBM, you might need to install Visual C++ Build Tools. You can download them from [Microsoft's website](https://visualstudio.microsoft.com/visual-cpp-build-tools/).

## 🔧 Running the Application

### Development Mode
```bash
uvicorn app:app --reload
```

### Production Mode
```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

Once the server is running, you can access:
- Interactive API documentation: `http://localhost:8000/docs`
- Alternative API documentation: `http://localhost:8000/redoc`

### Main Endpoints

- `POST /predict` - Submit data for cancer prediction
- `GET /health` - Check API health status
- `POST /upload` - Upload Excel files for batch processing

## 🗃️ Project Structure

```
Back-end/
├── app.py              # Main FastAPI application
├── Models/            # Machine learning models directory
│   ├── model.joblib   # Trained model file
│   └── scaler.joblib  # Data scaler for preprocessing
├── requirements.txt   # Python dependencies
└── README.md         # This file
```

## 🔍 Model Information

The backend uses a trained machine learning model for cancer prediction. The model:
- Is trained on medical data
- Uses LightGBM algorithm
- Includes data preprocessing steps
- Provides probability scores for predictions

## ⚙️ Configuration

The API can be configured through environment variables:
- `MODEL_PATH` - Path to the trained model file
- `PORT` - Server port (default: 8000)
- `HOST` - Server host (default: 0.0.0.0)

## 🔒 Security Considerations

- Input validation for all endpoints
- File size limits for uploads
- Secure file handling
- Error handling and logging

## 🧪 Testing

To run tests:
```bash
pytest
```

## 📦 Deployment

For production deployment:
1. Use a production-grade ASGI server like Gunicorn
2. Set up proper environment variables
3. Configure SSL/TLS
4. Set up proper logging
5. Configure rate limiting if needed

Example Gunicorn deployment:
```bash
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors
- Mohamed Haitham
- Ahmed Elsayed 
- Basmala Ahmed 
- Kenzy Ahmed
- Sandy Saher 
- Shahd Abdelghafar 

<div align="center">
*AI & Bioinformatics students at Delta University for Science and Technology*
</div>
