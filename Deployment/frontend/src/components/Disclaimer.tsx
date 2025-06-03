import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Disclaimer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 backdrop-blur-md border border-yellow-200 dark:border-yellow-700/50 rounded-xl shadow-md p-5 mb-4">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 bg-yellow-100 dark:bg-yellow-700/50 rounded-full shadow-sm">
          <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div>
            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-1">
              {t('disclaimer.title')}
            </h3>
            <p className="text-base text-yellow-700 dark:text-yellow-200">
              {t('disclaimer.message')}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="self-start md:self-center p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-800/50 transition-colors duration-200 flex-shrink-0"
            aria-label={t('disclaimer.close')}
          >
            <X className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;