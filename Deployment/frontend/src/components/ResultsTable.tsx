import React, { useState, useEffect } from 'react';
import { FileDown, ArrowUpDown, RefreshCw } from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultsTableProps {
  results: PredictionResult[];
  onReset: () => void;
}

const CancerTypeColors: Record<string, string> = {
  'Breast': 'bg-pink-100 text-pink-800',
  'Colorectum': 'bg-purple-100 text-purple-800',
  'Esophagus': 'bg-red-100 text-red-800',
  'Liver': 'bg-amber-100 text-amber-800',
  'Lung': 'bg-blue-100 text-blue-800',
  'Normal': 'bg-green-100 text-green-800',
  'Ovary': 'bg-indigo-100 text-indigo-800',
  'Pancreas': 'bg-orange-100 text-orange-800',
  'Stomach': 'bg-yellow-100 text-yellow-800'
};

const ResultsTable: React.FC<ResultsTableProps> = ({ results, onReset }) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filteredResults, setFilteredResults] = useState<PredictionResult[]>(results);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extract column headers from first result, ensuring Confidence comes after Class
  const columnHeaders = results.length > 0 
    ? Object.keys(results[0])
        .filter(key => key !== 'Class' && key !== 'Confidence')
    : [];
  
  // Extract all unique cancer types
  const uniqueCancerTypes = ['All', ...new Set(results.map(result => result.Class))];
  
  useEffect(() => {
    let filtered = [...results];
    
    // Filter by cancer type
    if (selectedType !== 'All') {
      filtered = filtered.filter(result => result.Class === selectedType);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(result => 
        Object.values(result).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Sort results
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        
        return sortDirection === 'asc'
          ? aString.localeCompare(bString)
          : bString.localeCompare(aString);
      });
    }
    
    setFilteredResults(filtered);
  }, [results, sortField, sortDirection, selectedType, searchQuery]);
  
  const handleSort = (field: string) => {
    setSortDirection(
      field === sortField && sortDirection === 'asc' ? 'desc' : 'asc'
    );
    setSortField(field);
  };
  
  const exportToCSV = () => {
    const headers = ['Class', 'Confidence', ...columnHeaders];
    const csvRows = [
      headers.join(','),
      ...filteredResults.map(row => 
        headers.map(header => JSON.stringify(row[header] || '')).join(',')
      )
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'cancer_predictions.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Prediction Results</h2>
          
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FileDown className="h-4 w-4 mr-1" />
              Export CSV
            </button>
            
            <button
              onClick={onReset}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              New Upload
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-64">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Type
            </label>
            <select
              id="filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {uniqueCancerTypes.map(type => (
                <option key={type} value={type}>
                  {type} {type !== 'All' && `(${results.filter(r => r.Class === type).length})`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-full">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in results..."
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('Class')}
              >
                <div className="flex items-center">
                  Class
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('Confidence')}
              >
                <div className="flex items-center">
                  Confidence
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              
              {columnHeaders.map(header => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(header)}
                >
                  <div className="flex items-center">
                    {header}
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResults.map((result, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CancerTypeColors[result.Class as string] || 'bg-gray-100 text-gray-800'}`}>
                    {result.Class}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(result.Confidence as number) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {((result.Confidence as number) * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
                
                {columnHeaders.map(header => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {typeof result[header] === 'number' ? 
                      parseFloat(result[header] as string).toFixed(4) : 
                      result[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredResults.length}</span> of{' '}
          <span className="font-medium">{results.length}</span> results
        </p>
      </div>
    </div>
  );
};

export default ResultsTable;