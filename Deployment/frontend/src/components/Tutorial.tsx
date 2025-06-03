import React from 'react';
import { BookOpen, Download, Upload, BarChart, Lightbulb, HelpCircle, CheckCircle, FileQuestion } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TutorialProps {
  darkMode: boolean;
}

const Tutorial: React.FC<TutorialProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  // Data preparation steps
  const dataPreparationSteps = [
    'downloadTemplate',
    'fillData',
    'requiredFields',
    'saveFormat'
  ];

  // Upload process steps
  const uploadProcessSteps = [
    'navigate',
    'clickUpload',
    'selectFile',
    'waitProcess'
  ];

  // Results interpretation steps
  const resultsInterpretationSteps = [
    'summary',
    'detailedResults',
    'visualRepresentations',
    'downloadOptions'
  ];

  // Tips
  const tipsSteps = [
    'checkData',
    'followTemplate',
    'saveResults',
    'useFeedback'
  ];

  // Support steps
  const supportSteps = [
    'checkFAQ',
    'useFeedback',
    'referAbout'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Header Section */}
      <div className="relative text-center mb-12">
        <div className="absolute inset-0 bg-blue-600/20 dark:bg-blue-600/10 filter blur-3xl rounded-full opacity-70"></div>
        <div className="relative z-10">
          <div className="inline-flex justify-center items-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <FileQuestion className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {t('tutorial.title')}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t('tutorial.subtitle')}
          </p>
        </div>
      </div>
      
      <div className="space-y-8">
        {/* Getting Started Section */}
        <section className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-blue-100/60 dark:border-blue-900/30 transform transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full shadow-md">
                <BookOpen className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                {t('tutorial.gettingStarted.title')}
              </h2>
            </div>
            <div className="space-y-4 pl-4 text-gray-700 dark:text-gray-300">
              <p className="text-lg">{t('tutorial.gettingStarted.welcome')}</p>
              <p className="text-lg">{t('tutorial.gettingStarted.begin')}</p>
            </div>
          </div>
        </section>

        {/* Data Preparation Section */}
        <section className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-indigo-100/60 dark:border-indigo-900/30 transform transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full shadow-md">
                <Download className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">
                {t('tutorial.dataPreparation.title')}
              </h2>
            </div>
            <div className="space-y-4 pl-4">
              {dataPreparationSteps.map((key) => (
                <div key={key} className="flex items-start group">
                  <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{t(`tutorial.dataPreparation.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upload Process Section */}
        <section className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-purple-100/60 dark:border-purple-900/30 transform transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full shadow-md">
                <Upload className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300">
                {t('tutorial.uploadProcess.title')}
              </h2>
            </div>
            <div className="space-y-4 pl-4">
              {uploadProcessSteps.map((key) => (
                <div key={key} className="flex items-start group">
                  <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{t(`tutorial.uploadProcess.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Interpretation Section */}
        <section className="bg-gradient-to-br from-white to-cyan-50 dark:from-gray-800 dark:to-cyan-900/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-cyan-100/60 dark:border-cyan-900/30 transform transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-full shadow-md">
                <BarChart className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-300">
                {t('tutorial.resultsInterpretation.title')}
              </h2>
            </div>
            <div className="space-y-4 pl-4">
              <p className="text-gray-700 dark:text-gray-300">{t('tutorial.resultsInterpretation.afterUpload')}</p>
              <div className="space-y-4 mt-4">
                {resultsInterpretationSteps.map((key) => (
                  <div key={key} className="flex items-start group">
                    <div className="p-1.5 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mr-4 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800/50 transition-colors duration-300">
                      <CheckCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{t(`tutorial.resultsInterpretation.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tips and Best Practices */}
        <section className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-amber-900/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-amber-100/60 dark:border-amber-900/30 transform transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full shadow-md">
                <Lightbulb className="h-7 w-7 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300">
                {t('tutorial.tips.title')}
              </h2>
            </div>
            <div className="space-y-4 pl-4">
              {tipsSteps.map((key) => (
                <div key={key} className="flex items-start group">
                  <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{t(`tutorial.tips.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-emerald-900/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-emerald-100/60 dark:border-emerald-900/30 transform transition-all duration-300 hover:shadow-2xl">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full shadow-md">
                <HelpCircle className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">
                {t('tutorial.support.title')}
              </h2>
            </div>
            <div className="space-y-4 pl-4">
              <p className="text-gray-700 dark:text-gray-300">{t('tutorial.support.ifIssues')}</p>
              <div className="space-y-4 mt-4">
                {supportSteps.map((key) => (
                  <div key={key} className="flex items-start group">
                    <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mr-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors duration-300">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{t(`tutorial.support.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tutorial;