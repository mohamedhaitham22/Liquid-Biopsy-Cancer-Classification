# 📊 Cancer Classification Notebooks

This directory contains Jupyter notebooks that document the machine learning pipeline and data analysis for the cancer classification using liquid biopsy project.

## 📋 Table of Contents

- [Overview](#overview)
- [Notebooks Description](#notebooks-description)
- [Data Pipeline](#data-pipeline)
- [Model Development](#model-development)
- [Getting Started](#getting-started)
- [Requirements](#requirements)
- [Usage Instructions](#usage-instructions)
- [Results Summary](#results-summary)

## 🎯 Overview

These notebooks demonstrate the complete machine learning workflow for cancer type classification using biomarker data from liquid biopsy samples. The analysis covers data preprocessing, feature engineering, model training, and evaluation for predicting nine different cancer types.

### Supported Cancer Classifications
- **Breast Cancer**
- **Colorectal Cancer** 
- **Esophageal Cancer**
- **Liver Cancer**
- **Lung Cancer**
- **Ovarian Cancer**
- **Pancreatic Cancer**
- **Stomach Cancer**
- **Normal Tissue**

## 📓 Notebooks Description

### 1. `data_before&after_oversamling.ipynb`
**Purpose**: Data preprocessing and class imbalance handling

**Key Components**:
- **Data Exploration**: Initial dataset analysis and visualization
- **Class Distribution Analysis**: Examination of cancer type frequencies
- **Data Quality Assessment**: Missing values, outliers, and data integrity checks
- **Oversampling Techniques**: Implementation of SMOTE or similar techniques
- **Before/After Comparison**: Visual comparison of class distributions
- **Feature Statistics**: Descriptive statistics for biomarker features

**Outputs**:
- Balanced dataset for model training
- Data quality reports
- Visualization of class distributions
- Feature correlation analysis

### 2. `2_model_with_xgboost.ipynb`
**Purpose**: Model development and comparison using XGBoost

**Key Components**:
- **Feature Engineering**: Biomarker feature selection and transformation
- **Model Training**: XGBoost classifier implementation
- **Hyperparameter Tuning**: Grid search and cross-validation
- **Model Evaluation**: Performance metrics and validation
- **Feature Importance**: Analysis of most predictive biomarkers
- **Model Comparison**: Performance comparison with other algorithms

**Outputs**:
- Trained XGBoost model
- Performance metrics (accuracy, precision, recall, F1-score)
- Feature importance rankings
- Confusion matrices and classification reports

## 🔄 Data Pipeline

```mermaid
graph TD
    A[Raw Biomarker Data] --> B[Data Quality Check]
    B --> C[Exploratory Data Analysis]
    C --> D[Class Imbalance Analysis]
    D --> E[Oversampling (SMOTE)]
    E --> F[Feature Engineering]
    F --> G[Train/Test Split]
    G --> H[Model Training]
    H --> I[Model Evaluation]
    I --> J[Final Model Selection]
```

## 🧠 Model Development

### Machine Learning Approach
1. **Data Preprocessing**
   - Missing value imputation
   - Outlier detection and handling
   - Feature scaling and normalization

2. **Class Imbalance Handling**
   - SMOTE (Synthetic Minority Oversampling Technique)
   - Stratified sampling
   - Class weight adjustments

3. **Feature Engineering**
   - Biomarker feature selection
   - Mutual information analysis
   - Correlation-based feature filtering

4. **Model Training**
   - XGBoost gradient boosting
   - Cross-validation strategies
   - Hyperparameter optimization

5. **Model Evaluation**
   - Multi-class classification metrics
   - Confusion matrix analysis
   - ROC-AUC curves for each class

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- Jupyter Notebook or JupyterLab
- Required Python packages (see Requirements section)

### Installation
1. **Navigate to the Notebooks directory**:
   ```powershell
   cd "Notebooks"
   ```

2. **Create virtual environment** (recommended):
   ```powershell
   python -m venv venv
   venv\Scripts\Activate.ps1
   ```

3. **Install required packages**:
   ```powershell
   pip install -r requirements.txt
   ```

4. **Start Jupyter Notebook**:
   ```powershell
   jupyter notebook
   ```

## 📦 Requirements

Create a `requirements.txt` file with the following dependencies:

```txt
# Data Science Core
pandas>=2.0.0
numpy>=1.24.0
scipy>=1.10.0

# Machine Learning
scikit-learn>=1.3.0
xgboost>=1.7.0
lightgbm>=4.0.0
imbalanced-learn>=0.10.0

# Data Visualization
matplotlib>=3.7.0
seaborn>=0.12.0
plotly>=5.14.0

# Jupyter Environment
jupyter>=1.0.0
ipykernel>=6.22.0

# Utilities
tqdm>=4.65.0
joblib>=1.2.0
```

## 📖 Usage Instructions

### Running the Notebooks

1. **Start with Data Preprocessing**:
   ```powershell
   # Open the data preprocessing notebook
   jupyter notebook "data_before&after_oversamling.ipynb"
   ```
   - Execute cells sequentially
   - Review data quality reports
   - Analyze class distribution changes

2. **Proceed to Model Development**:
   ```powershell
   # Open the XGBoost model notebook
   jupyter notebook "2_model_with_xgboost.ipynb"
   ```
   - Run feature engineering pipeline
   - Train and evaluate models
   - Compare performance metrics

### Best Practices
- **Sequential Execution**: Run notebooks in the recommended order
- **Cell Dependencies**: Execute cells in sequence to maintain variable states
- **Data Validation**: Verify data integrity at each preprocessing step
- **Model Checkpoints**: Save intermediate models for comparison
- **Documentation**: Add markdown cells to document findings and insights

## 📊 Results Summary

### Data Analysis Insights
- **Dataset Size**: [Number of samples and features]
- **Class Imbalance**: Significant imbalance addressed through oversampling
- **Feature Quality**: [Key findings about biomarker features]
- **Data Distribution**: [Insights about feature distributions]

### Model Performance
- **XGBoost Accuracy**: [Performance metrics]
- **Cross-validation Score**: [CV results]
- **Feature Importance**: [Top predictive biomarkers]
- **Generalization**: [Model robustness assessment]

### Key Findings
- Most predictive biomarkers for cancer classification
- Effectiveness of oversampling techniques
- Model performance across different cancer types
- Feature engineering impact on classification accuracy

## 🔬 Technical Notes

### Data Preprocessing Considerations
- **Missing Values**: Handled using [specific imputation strategy]
- **Outliers**: Detected and treated using [specific method]
- **Feature Scaling**: Applied [specific scaling technique]
- **Class Balance**: Achieved using SMOTE with [specific parameters]

### Model Training Details
- **Algorithm**: XGBoost with [specific hyperparameters]
- **Validation**: [Cross-validation strategy]
- **Feature Selection**: [Selection methodology]
- **Performance Optimization**: [Specific optimization techniques]

## 🤝 Contributing

When adding new notebooks or modifying existing ones:

1. **Follow Naming Convention**: Use descriptive names with version numbers
2. **Document Thoroughly**: Include markdown cells explaining methodology
3. **Code Quality**: Follow PEP 8 guidelines and include comments
4. **Reproducibility**: Set random seeds for consistent results
5. **Version Control**: Save notebooks with cleared outputs for clean commits

## 📄 File Structure

```
Notebooks/
├── README.md                                    # This documentation
├── requirements.txt                             # Python dependencies
├── data_before&after_oversamling.ipynb        # Data preprocessing
├── 2_model_with_xgboost.ipynb                 # XGBoost model development
└── outputs/                                    # Generated outputs
    ├── figures/                                # Visualization outputs
    ├── models/                                 # Saved model files
    └── reports/                                # Analysis reports
```

## 🆘 Troubleshooting

### Common Issues

**Kernel Connection Issues**:
```powershell
# Restart Jupyter kernel
# Kernel -> Restart & Clear Output
```

**Package Import Errors**:
```powershell
# Reinstall packages
pip install --upgrade [package-name]
```

**Memory Issues**:
- Reduce dataset size for testing
- Use data chunks for large datasets
- Clear variables using `del variable_name`

### Support
For technical issues or questions about the analysis:
1. Check error messages and stack traces
2. Verify all dependencies are installed
3. Ensure data files are in correct locations
4. Review notebook execution order

---

<div align="center">

**🔬 Cancer Research Through Data Science**

*Advancing precision medicine with machine learning*

</div>
