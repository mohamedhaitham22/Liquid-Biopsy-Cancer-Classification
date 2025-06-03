import { ApiError, PredictionResult } from '../types';

// Use relative URL to automatically match the protocol (HTTP/HTTPS) of the page
const API_URL = '/api';

export async function uploadFileForPrediction(file: File): Promise<PredictionResult[]> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw {
        detail: errorData.detail || 'An unknown error occurred',
        status: response.status,
      } as ApiError;
    }

    return await response.json();
  } catch (error) {
    if ((error as ApiError).detail) {
      throw error;
    }
    throw {
      detail: 'Network error or server unavailable',
      status: 500,
    } as ApiError;
  }
}

export async function downloadTemplate(): Promise<Blob> {
  const response = await fetch(`${API_URL}/template`);
  if (!response.ok) {
    throw new Error('Failed to download template');
  }
  return response.blob();
}