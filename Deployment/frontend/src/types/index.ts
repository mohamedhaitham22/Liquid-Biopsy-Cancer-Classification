export interface PredictionResult {
  [key: string]: string | number;
  Class: string;
  Confidence: number;
}

export type FileStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export interface ApiError {
  detail: string;
  status: number;
}