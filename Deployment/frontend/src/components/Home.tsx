import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileType, Brain, Database, Shield, ArrowRight, BookOpen, Activity } from 'lucide-react';

interface HomeProps {
  onGetStarted: () => void;
  darkMode: boolean;
  onNavigate: (page: 'tutorial') => void;
}

const Home: React.FC<HomeProps> = ({ onGetStarted, darkMode, onNavigate }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={`max-w-5xl mx-auto px-4 py-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 rounded-3xl shadow-xl p-8 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={onGetStarted}
              className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-xl hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {t('home.getStarted')}
              <ArrowRight className="rtl:rotate-180 ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('tutorial')}
              className="inline-flex items-center px-8 py-4 bg-blue-700/50 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700/70 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <BookOpen className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
              <span>
                {i18n.language === 'ar' ? 'البرنامج التعليمي' : 'Tutorial'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className={`bg-gradient-to-br ${darkMode ? 'from-gray-800 to-gray-900' : 'from-white to-blue-50'} rounded-2xl shadow-xl overflow-hidden p-8 border ${darkMode ? 'border-blue-900/30' : 'border-blue-100/60'} transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group`}>
          <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            {t('home.features.mlModel.title')}
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('home.features.mlModel.description')}
          </p>
        </div>
        
        {/* Other feature cards with similar darkMode conditional styles */}
        <div className={`bg-gradient-to-br ${darkMode ? 'from-gray-800 to-gray-900' : 'from-white to-green-50'} rounded-2xl shadow-xl overflow-hidden p-8 border ${darkMode ? 'border-green-900/30' : 'border-green-100/60'} transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group`}>
          <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileType className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
            {t('home.features.flexibleInput.title')}
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('home.features.flexibleInput.description')}
          </p>
        </div>

        <div className={`bg-gradient-to-br ${darkMode ? 'from-gray-800 to-gray-900' : 'from-white to-purple-50'} rounded-2xl shadow-xl overflow-hidden p-8 border ${darkMode ? 'border-purple-900/30' : 'border-purple-100/60'} transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group`}>
          <div className="p-4 bg-purple-100 dark:bg-purple-900/50 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Database className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
            {t('home.features.batchProcessing.title')}
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('home.features.batchProcessing.description')}
          </p>
        </div>

        <div className={`bg-gradient-to-br ${darkMode ? 'from-gray-800 to-gray-900' : 'from-white to-red-50'} rounded-2xl shadow-xl overflow-hidden p-8 border ${darkMode ? 'border-red-900/30' : 'border-red-100/60'} transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group`}>
          <div className="p-4 bg-red-100 dark:bg-red-900/50 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>
            {t('home.features.dataSecurity.title')}
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('home.features.dataSecurity.description')}
          </p>
        </div>
      </div>

      {/* Cancer Types Section */}
      <div className={`bg-gradient-to-br ${darkMode ? 'from-gray-900 to-indigo-900/20' : 'from-blue-50 to-indigo-50'} rounded-2xl shadow-xl overflow-hidden p-8 mb-16 backdrop-blur-sm border ${darkMode ? 'border-blue-900/30' : 'border-blue-200/60'}`}>
        <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-blue-300' : 'text-blue-800'} text-center`}>
          {t('home.supportedTypes.title')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {[
            'breast',
            'colorectal',
            'esophageal',
            'liver',
            'lung',
            'ovarian',
            'pancreatic',
            'stomach',
            'normal'
          ].map((type) => (
            <div key={type} className={`${darkMode ? 'bg-gray-800/50 border-blue-900/30 hover:bg-gray-800/80' : 'bg-white/70 border-blue-100 hover:bg-white'} p-5 rounded-xl border shadow-md backdrop-blur-sm transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
              <p className={`text-lg font-medium ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                {t(`home.supportedTypes.types.${type}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <button
          onClick={onGetStarted}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {t('home.getStarted')}
          <ArrowRight className="rtl:rotate-180 ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Home;