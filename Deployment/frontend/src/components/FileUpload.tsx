import React, { useState, useRef } from 'react';
import { Upload, File as FileIcon, X, AlertCircle } from 'lucide-react';
import { FileStatus, ApiError } from '../types';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  status: FileStatus;
  error: ApiError | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, status, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const validateFile = (file: File): boolean => {
    const validTypes = [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json'
    ];
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(file.type) && 
        !['csv', 'xlsx', 'json'].includes(fileExtension || '')) {
      return false;
    }
    
    return true;
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      } else {
        alert('Please upload a CSV, XLSX, or JSON file');
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      } else {
        alert('Please upload a CSV, XLSX, or JSON file');
      }
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="w-full">
      <div 
        className={`
          border-2 border-dashed rounded-lg p-8 
          transition-all duration-200 ease-in-out
          ${dragActive ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/70'} 
          ${status === 'error' ? 'border-red-500 dark:border-red-400' : ''}
          ${selectedFile && status !== 'error' ? 'border-green-500 dark:border-green-400' : ''}
          backdrop-blur-sm
        `}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {status === 'error' && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error uploading file</h3>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error?.detail || 'An unknown error occurred'}</p>
              </div>
            </div>
          </div>
        )}
        
        {!selectedFile ? (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-300" />
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Drag and drop your file here, or 
                <button
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus:underline ml-1"
                  onClick={handleButtonClick}
                >
                  browse
                </button>
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Supported file types: CSV, XLSX, JSON
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            
            <button 
              onClick={clearFile}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              disabled={status === 'uploading' || status === 'processing'}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".csv,.xlsx,.json,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
        onChange={handleChange}
      />
      
      {selectedFile && status === 'idle' && (
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            onClick={() => onFileSelect(selectedFile)}
          >
            Upload and Predict
          </button>
        </div>
      )}
      
      {status === 'uploading' && (
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Uploading</span>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-800">
              <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-400 w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      
      {status === 'processing' && (
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">Processing</span>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200 dark:bg-teal-800">
              <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 dark:bg-teal-400 w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;