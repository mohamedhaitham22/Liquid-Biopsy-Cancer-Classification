from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import pandas as pd
import joblib
import uvicorn
import io
import logging
import warnings
import os
from sklearn.exceptions import InconsistentVersionWarning

# Suppress scikit-learn version warnings
warnings.filterwarnings("ignore", category=InconsistentVersionWarning)

# === Setup ===
app = FastAPI(title="Cancer Type Prediction API - Bulk Row Version")

# Enable logging
logging.basicConfig(level=logging.INFO)

# CORS for frontend connection - more permissive for debugging
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Load model and scaler ===
try:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(BASE_DIR, "Models", "LGBM_model.pkl")
    scaler_path = os.path.join(BASE_DIR, "Models", "LGBM_scaler.pkl")
    
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
except Exception as e:
    logging.error(f"Model loading failed: {e}")
    raise RuntimeError("Failed to load model files.")

CLASS_LABELS = [
    'Breast', 'Colorectum', 'Esophagus', 'Liver',
    'Lung', 'Normal', 'Ovary', 'Pancreas', 'Stomach'
]

# === Helper: Read uploaded file ===
def read_file_to_dataframe(file: UploadFile) -> pd.DataFrame:
    try:
        content = file.file.read()
        if file.filename.endswith(".csv"):
            return pd.read_csv(io.StringIO(content.decode("utf-8")))
        elif file.filename.endswith(".xlsx"):
            return pd.read_excel(io.BytesIO(content))
        elif file.filename.endswith(".json"):
            return pd.read_json(io.BytesIO(content))
        else:
            raise ValueError("Unsupported file format. Please upload CSV, XLSX, or JSON.")
    except Exception as e:
        raise ValueError(f"Failed to read file: {e}")

@app.get("/template")
async def get_template():
    template_path = os.path.join(BASE_DIR, "Models", "template.xlsx")
    return FileResponse(template_path, filename="cancer_prediction_template.xlsx")

# === Predict Endpoint ===
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        logging.info(f"Received file upload: {file.filename}, content_type: {file.content_type}")
        
        # Read and check the uploaded data
        df = read_file_to_dataframe(file)
        logging.info(f"Successfully read file with {len(df)} rows and {len(df.columns)} columns")
        
        if df.empty:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        df.fillna(0, inplace=True)
        
        # Log column names for debugging
        logging.info(f"Columns in uploaded data: {', '.join(df.columns)}")

        try:
            # Preprocess the data
            X = scaler.transform(df)
            logging.info("Data transformation with scaler completed")
            
            # Get predicted probabilities
            pred_proba = model.predict_proba(X)
            logging.info("Model prediction completed")
            
            # Get predicted class indices and labels
            pred_indices = pred_proba.argmax(axis=1)
            pred_labels = [CLASS_LABELS[i] for i in pred_indices]
            
            # Get confidence scores (max probability for each row)
            confidences = pred_proba.max(axis=1)
            
            # Add new columns
            df["Class"] = pred_labels
            df["Confidence"] = confidences
            
            # Reorder so Confidence comes right after Class
            class_col_index = df.columns.get_loc("Class")
            cols = df.columns.tolist()
            cols.remove("Confidence")
            cols.insert(class_col_index + 1, "Confidence")
            df = df[cols]
            
            # Return updated DataFrame as JSON
            result = df.to_dict(orient="records")
            logging.info(f"Prediction successful, returning {len(result)} results")
            return result
        except Exception as model_error:
            logging.exception("Error during model prediction phase")
            raise HTTPException(status_code=500, detail=f"Model prediction error: {str(model_error)}")

    except ValueError as ve:
        logging.exception("Value error during prediction")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logging.exception("Unexpected error during prediction")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

# === Run locally or with HTTPS ===
if __name__ == "__main__":
    # Use environment variables or fallback to sensible defaults
    host = os.environ.get("HOST", "0.0.0.0")  # Default to all interfaces
    port = int(os.environ.get("PORT", "8000"))
    
    # Check if SSL certificates exist for HTTPS
    ssl_keyfile = os.environ.get("SSL_KEYFILE", None)
    ssl_certfile = os.environ.get("SSL_CERTFILE", None)
    
    logging.info(f"Starting server on {host}:{port}")
    
    # If both SSL key and cert are available, run with HTTPS
    if ssl_keyfile and ssl_certfile and os.path.exists(ssl_keyfile) and os.path.exists(ssl_certfile):
        logging.info("Starting server with HTTPS support")
        uvicorn.run(
            "app:app", 
            host=host, 
            port=port, 
            ssl_keyfile=ssl_keyfile,
            ssl_certfile=ssl_certfile
        )
    else:
        logging.info("Starting server without HTTPS support")
        uvicorn.run("app:app", host=host, port=port, reload=True)
