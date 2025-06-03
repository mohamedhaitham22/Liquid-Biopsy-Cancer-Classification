#  Liquid Biopsy Cancer Classification

<div align="center">

![Cancer Prediction](https://img.shields.io/badge/ML-Cancer%20Prediction-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

*Advanced machine learning system for accurate cancer type classification using patient biomarker data*

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Model Information](#model-information)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This Cancer Type Prediction System is a comprehensive web application that leverages advanced machine learning techniques to classify cancer types based on patient biomarker data. The system can predict nine different cancer types with high accuracy, providing healthcare professionals with a powerful tool for cancer diagnosis support.

### Supported Cancer Types
- **Breast Cancer**
- **Colorectal Cancer**
- **Esophageal Cancer**
- **Liver Cancer**
- **Lung Cancer**
- **Ovarian Cancer**
- **Pancreatic Cancer**
- **Stomach Cancer**
- **Normal Tissue**

## ✨ Features

### 🔬 Advanced Machine Learning
- **LightGBM Model**: High-performance gradient boosting algorithm
- **Feature Engineering**: Comprehensive data preprocessing and scaling
- **Cross-validation**: Robust model validation techniques
- **High Accuracy**: Trained on extensive medical datasets

### 🌐 Web Application
- **Modern UI**: Responsive React-based frontend with dark/light mode
- **Multilingual Support**: English and Arabic language support
- **File Upload**: Support for CSV, XLSX, and JSON formats
- **Real-time Predictions**: Instant cancer type classification
- **Interactive Dashboard**: Comprehensive results visualization
- **Template Download**: Pre-formatted data template for easy use

### 🛡️ Security & Reliability
- **Data Validation**: Comprehensive input validation and error handling
- **CORS Support**: Secure cross-origin resource sharing
- **SSL Support**: HTTPS-ready for production deployment
- **Professional Logging**: Detailed logging for monitoring and debugging

### 🎨 User Experience
- **Intuitive Interface**: User-friendly design with clear navigation
- **Educational Content**: Built-in tutorial and team information
- **Feedback System**: User feedback collection mechanism
- **AI Chatbot**: Integrated AI assistant for user support

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI 0.104.1
- **ML Libraries**: 
  - scikit-learn 1.3.1
  - LightGBM 4.1.0
  - pandas 2.1.1
- **Server**: Uvicorn 0.23.2
- **File Processing**: openpyxl 3.1.2, python-multipart 0.0.6

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, React Icons
- **Internationalization**: react-i18next
- **AI Integration**: Google Generative AI
- **Routing**: React Router DOM

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Package Management**: npm/pip

## 📁 Project Structure

```
Project/
├── Deployment/
│   ├── backend/
│   │   ├── app.py                 # FastAPI application
│   │   ├── requirements.txt       # Python dependencies
│   │   ├── README.md             # Backend documentation
│   │   └── Models/
│   │       ├── LGBM_model.pkl    # Trained LightGBM model
│   │       ├── LGBM_scaler.pkl   # Data scaler
│   │       └── template.xlsx      # Data template
│   │
│   └── frontend/
│       ├── src/
│       │   ├── components/       # React components
│       │   ├── i18n/             # Internationalization
│       │   ├── types/            # TypeScript types
│       │   └── utils/            # Utility functions
│       ├── public/               # Static assets
│       ├── package.json          # Frontend dependencies
│       └── vite.config.ts        # Vite configuration
│
├── Notebooks/
│   ├── data_before & after_oversampling.ipynb
│   ├── feature selection & model training.ipynb
│   ├── README.md 
│   ├── requirements.txt
```

## 🚀 Installation

### Prerequisites
- **Python**: 3.8 or higher
- **Node.js**: 16.0 or higher
- **npm**: 7.0 or higher

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd Deployment/backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**:
   - **Windows**: `venv\Scripts\activate`
   - **macOS/Linux**: `source venv/bin/activate`

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd Deployment/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🎮 Usage

### Starting the Application

1. **Start Backend Server**:
   ```bash
   cd Deployment/backend
   python app.py
   ```
   Backend will be available at: `http://localhost:8000`

2. **Start Frontend Development Server**:
   ```bash
   cd Deployment/frontend
   npm run dev
   ```
   Frontend will be available at: `http://localhost:5173`

### Making Predictions

1. **Access the Application**: Open your web browser and navigate to the frontend URL
2. **Navigate to Dashboard**: Click "Get Started" or use the navigation menu
3. **Upload Data**: 
   - Download the template file for the correct format
   - Prepare your data with the required biomarker columns
   - Upload CSV, XLSX, or JSON files
4. **View Results**: The system will display predictions with confidence scores
5. **Download Results**: Export predictions for further analysis

### Data Format Requirements

Your input data should contain biomarker measurements. Download the template file from the application for the exact format required.

## 📚 API Documentation

### Endpoints

#### GET `/template`
Download the data template file.

**Response**: Excel file with the required data format

#### POST `/predict`
Upload data file and get cancer type predictions.

**Request**: 
- **Content-Type**: `multipart/form-data`
- **Body**: File upload (CSV, XLSX, or JSON)

**Response**:
```json
[
  {
    "feature1": 0.123,
    "feature2": 0.456,
    "Class": "Breast",
    "Confidence": 0.892
  }
]
```

### Interactive API Documentation
When the backend is running, visit `http://localhost:8000/docs` for interactive Swagger documentation.

## 🧠 Model Information

### Algorithm: LightGBM (Light Gradient Boosting Machine)
- **Type**: Gradient boosting decision tree algorithm
- **Advantages**: High performance, memory efficiency, fast training speed
- **Features**: Handles categorical features, supports parallel learning

### Training Process
1. **Data Preprocessing**: Feature scaling using StandardScaler
2. **Feature Selection**: Mutual information-based feature selection
3. **Model Training**: LightGBM with optimized hyperparameters
4. **Validation**: Cross-validation for robust performance assessment
5. **Deployment**: Model serialization using joblib

### Performance Metrics
The model has been evaluated using standard classification metrics:
- **Accuracy**: High classification accuracy across all cancer types
- **Precision & Recall**: Balanced performance for each cancer class
- **F1-Score**: Optimal balance between precision and recall

## 🔧 Development

### Backend Development

```bash
# Install development dependencies
pip install -r requirements.txt

# Run with auto-reload
python app.py

# Run tests (if available)
pytest
```

### Frontend Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Variables

Create `.env` files for configuration:

**Backend (.env)**:
```env
HOST=0.0.0.0
PORT=8000
SSL_KEYFILE=path/to/keyfile.pem
SSL_CERTFILE=path/to/certfile.pem
```

**Frontend (.env)**:
```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_AI_API_KEY=your_api_key_here
```

## 🚀 Deployment

### Production Deployment

1. **Backend**: Deploy using Docker, Heroku, or cloud platforms
2. **Frontend**: Build and deploy to Netlify, Vercel, or cloud storage
3. **Configuration**: Set appropriate environment variables
4. **SSL**: Configure HTTPS for production security

### Docker Deployment (Optional)

Create `Dockerfile` for containerized deployment:

```dockerfile
# Backend Dockerfile example
FROM python:3.8-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Commit changes**: `git commit -am 'Add new feature'`
4. **Push to branch**: `git push origin feature/new-feature`
5. **Submit Pull Request**

### Development Guidelines
- Follow PEP 8 for Python code
- Use TypeScript for frontend development
- Write comprehensive tests
- Update documentation
- Follow conventional commit messages

## 📄 License

This project is part of a Work-based Professional Project in Bioinformatics. Please respect academic and research guidelines when using this code.

## 👥 Team

This project was developed as part of a Semester 6 Work-based Professional Project in Bioinformatics (II).

## 🆘 Support

For questions, issues, or contributions:
1. **Issues**: Open an issue on the repository
2. **Documentation**: Check the built-in tutorial and API docs
3. **AI Assistant**: Use the integrated chatbot in the application

## 🔄 Version History

- **v1.0.0**: Initial release with core prediction functionality
- **v1.1.0**: Added multilingual support and AI chatbot
- **v1.2.0**: Enhanced UI/UX and added dark mode

---

<div align="center">

**Built with ❤️ for advancing cancer research and diagnosis**

*Empowering healthcare professionals with AI-driven insights*

</div>
