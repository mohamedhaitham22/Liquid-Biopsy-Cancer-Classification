import React from 'react';
import { FileType, Brain, Database, Shield, ArrowRight } from 'lucide-react';

interface AboutProps {
  onGetStarted: () => void;
}

const About: React.FC<AboutProps> = ({ onGetStarted }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancer Type Prediction Tool</h1>
        <p className="text-xl text-gray-600 mb-8">
          Advanced machine learning for accurate cancer type classification using patient data
        </p>
        <button
          onClick={onGetStarted}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Advanced ML Model</h2>
          <p className="text-gray-600">
            Our model has been trained on extensive medical datasets to accurately classify nine different types of cancer, including breast, colorectal, and lung cancer.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <FileType className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Flexible Input</h2>
          <p className="text-gray-600">
            Upload your data in various formats including CSV, XLSX, or JSON. Our system processes the data and provides instant predictions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Database className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Batch Processing</h2>
          <p className="text-gray-600">
            Process multiple samples simultaneously with our efficient batch prediction system. Get results for hundreds of samples in seconds.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Security</h2>
          <p className="text-gray-600">
            Your data security is our priority. All uploads are processed securely and no patient data is stored after analysis.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Supported Cancer Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'Breast Cancer',
            'Colorectal Cancer',
            'Esophageal Cancer',
            'Liver Cancer',
            'Lung Cancer',
            'Ovarian Cancer',
            'Pancreatic Cancer',
            'Stomach Cancer',
            'Normal Tissue'
          ].map((type) => (
            <div key={type} className="bg-white p-3 rounded-md border border-gray-200">
              <p className="text-gray-700">{type}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onGetStarted}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try It Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default About;