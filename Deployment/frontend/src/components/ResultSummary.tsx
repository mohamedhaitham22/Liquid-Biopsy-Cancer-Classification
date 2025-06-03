import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Layers, FilesIcon, Target } from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultSummaryProps {
  results: PredictionResult[];
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ results }) => {
  const { t } = useTranslation();

  const getCancerTypeName = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'colorectum':
        return 'Colorectum';
      case 'ovary':
        return 'Ovary';
      case 'pancreas':
        return 'Pancreas';
      case 'esophagus':
        return 'Esophagus';
      case 'breast':
        return 'Breast Cancer';
      case 'lung':
        return 'Lung Cancer';
      case 'liver':
        return 'Liver Cancer';
      case 'stomach':
        return 'Stomach Cancer';
      case 'normal':
      case 'normal tissue':
        return 'Normal Tissue';
      default:
        return type;
    }
  };
  
  const summary = useMemo(() => {
    const typeCounts: Record<string, number> = {};
    let totalConfidence = 0;
    let highConfidencePredictions = 0;
    
    results.forEach(result => {
      const type = result.Class as string;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
      
      const confidence = result.Confidence as number;
      totalConfidence += confidence;
      if (confidence >= 0.9) {
        highConfidencePredictions++;
      }
    });
    
    const sortedCounts = Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1]);
    
    const total = results.length;
    const countsWithPercentage = sortedCounts.map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / total) * 100)
    }));
    
    return {
      total,
      countsWithPercentage,
      mostCommon: countsWithPercentage[0]?.type || 'N/A',
      averageConfidence: totalConfidence / total,
      highConfidencePercentage: (highConfidencePredictions / total) * 100
    };
  }, [results]);
  
  const colorMap: Record<string, string> = {
    'Breast': 'bg-pink-500',
    'Colorectum': 'bg-purple-500',
    'Esophagus': 'bg-red-500',
    'Liver': 'bg-amber-500',
    'Lung': 'bg-blue-500',
    'Normal': 'bg-green-500',
    'Ovary': 'bg-indigo-500',
    'Pancreas': 'bg-orange-500',
    'Stomach': 'bg-yellow-500'
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('results.summary.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-blue-50 rounded-lg p-5">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-md p-2">
                <FilesIcon className="h-7 w-7 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-500">{t('results.summary.totalSamples')}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{summary.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-teal-50 rounded-lg p-5">
            <div className="flex items-start">
              <div className="bg-teal-100 rounded-md p-2">
                <PieChart className="h-7 w-7 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-500">{t('results.summary.cancerTypes')}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{summary.countsWithPercentage.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-5">
            <div className="flex items-start">
              <div className="bg-purple-100 rounded-md p-2">
                <Layers className="h-7 w-7 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-500">{t('results.summary.mostCommon')}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{getCancerTypeName(summary.mostCommon)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-5">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-md p-2">
                <Target className="h-7 w-7 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-500">{t('results.summary.avgConfidence')}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {(summary.averageConfidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">{t('results.summary.distribution')}</h3>
          <div className="space-y-4">
            {summary.countsWithPercentage.map(({ type, count, percentage }) => (
              <div key={type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{getCancerTypeName(type)}</span>
                  <span className="text-sm font-medium text-gray-500">{count} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${colorMap[type] || 'bg-gray-500'}`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;