import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FileUpload from './FileUpload';
import ResultsTable from './ResultsTable';
import ResultSummary from './ResultSummary';
import { uploadFileForPrediction } from '../utils/api';
import { FileStatus, PredictionResult, ApiError } from '../types';
import { FileDown, Activity, BarChart3, Database } from 'lucide-react';

const PredictionDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [fileStatus, setFileStatus] = useState<FileStatus>('idle');
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  
  const handleFileSelect = async (file: File) => {
    try {
      setFileStatus('uploading');
      setError(null);
      
      // Short delay to show uploading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFileStatus('processing');
      
      const predictionResults = await uploadFileForPrediction(file);
      
      setResults(predictionResults);
      setFileStatus('success');
    } catch (err) {
      setError(err as ApiError);
      setFileStatus('error');
    }
  };
  
  const resetDashboard = () => {
    setFileStatus('idle');
    setResults([]);
    setError(null);
  };

  const downloadTemplate = async () => {
    try {
      const response = await fetch('/api/template');
      if (!response.ok) {
        throw new Error('Failed to download template');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cancer_prediction_template.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading template:', error);
      alert(t('dashboard.template.downloadError'));
    }
  };
  
  return (
    <div className="space-y-10 p-4">
      <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-blue-100 dark:border-blue-900/30 transform transition-all duration-300">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <Activity className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{t('dashboard.title')}</h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('dashboard.description')}
              </p>
            </div>
          </div>

          <div className="mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-6 shadow-md transform transition-all hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-800/50 rounded-full">
                <FileDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">{t('dashboard.template.title')}</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-4">
                  {t('dashboard.template.description')}
                </p>
                <button
                  onClick={downloadTemplate}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
                >
                  <Database className="h-5 w-5" />
                  {t('dashboard.template.download')}
                </button>
              </div>
            </div>
          </div>
          
          <FileUpload 
            onFileSelect={handleFileSelect} 
            status={fileStatus}
            error={error}
          />
        </div>
      </div>
      
      {fileStatus === 'success' && results.length > 0 && (
        <div className="animate-fade-in">
          <ResultSummary results={results} />
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('dashboard.results')}</h2>
            </div>
            <ResultsTable results={results} onReset={resetDashboard} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionDashboard;