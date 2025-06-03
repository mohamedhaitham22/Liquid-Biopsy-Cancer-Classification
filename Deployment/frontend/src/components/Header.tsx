import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Languages, Home, BarChart, MessageSquare, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  currentPage: 'home' | 'dashboard' | 'feedback' | 'team' | 'tutorial';
  onNavigate: (page: 'home' | 'dashboard' | 'feedback' | 'team' | 'tutorial') => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, darkMode, onToggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const handleNavigate = (page: 'home' | 'dashboard' | 'feedback' | 'team' | 'tutorial') => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <header className={`sticky top-0 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 shadow-lg rounded-b-2xl transition-all duration-300 relative z-30`}> 
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => handleNavigate('home')}>
            <img 
              src={darkMode ? "/images/logo2.png" : "/images/logo.png"} 
              alt="Logo" 
              className="h-12 w-12 object-cover rounded-full shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" 
            />
            <div>
              <h1 className={`text-xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('header.title')}</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t('header.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2 shadow-md backdrop-blur-md">
              <button 
                onClick={() => handleNavigate('home')}
                className={`flex items-center gap-1 px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 ${currentPage === 'home' ? (darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100') : (darkMode ? 'text-white' : '')}`}
              >
                <Home className={`h-4 w-4 mr-1 ${darkMode && currentPage !== 'home' ? 'text-white' : ''}`} />{t('header.home')}
              </button>
              <button 
                onClick={() => handleNavigate('dashboard')}
                className={`flex items-center gap-1 px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 ${currentPage === 'dashboard' ? (darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100') : (darkMode ? 'text-white' : '')}`}
              >
                <BarChart className={`h-4 w-4 mr-1 ${darkMode && currentPage !== 'dashboard' ? 'text-white' : ''}`} />{t('header.dashboard')}
              </button>
              <button 
                onClick={() => handleNavigate('team')}
                className={`flex items-center gap-1 px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 ${currentPage === 'team' ? (darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100') : (darkMode ? 'text-white' : '')}`}
              >
                <Users className={`h-4 w-4 mr-1 ${darkMode && currentPage !== 'team' ? 'text-white' : ''}`} />{t('header.team')}
              </button>
              <button 
                onClick={() => handleNavigate('feedback')}
                className={`flex items-center gap-1 px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 ${currentPage === 'feedback' ? (darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100') : (darkMode ? 'text-white' : '')}`}
              >
                <MessageSquare className={`h-4 w-4 mr-1 ${darkMode && currentPage !== 'feedback' ? 'text-white' : ''}`} />{t('header.feedback')}
              </button>
            </nav>
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/40 ${darkMode ? 'text-white' : ''}`}
              title={i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Languages size={20} className={`${darkMode ? 'text-white' : ''}`} />
            </button>
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm transition-colors hover:bg-yellow-100 dark:hover:bg-yellow-900/40 ${darkMode ? 'text-white' : ''}`}
            >
              {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm bg-white/60 dark:bg-gray-800/60 backdrop-blur-md ${darkMode ? 'text-white' : ''}`}
            >
              {isMobileMenuOpen ? (
                <X className={`h-6 w-6 ${darkMode ? 'text-white' : ''}`} />
              ) : (
                <Menu className={`h-6 w-6 ${darkMode ? 'text-white' : ''}`} />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`transition-all duration-300 md:hidden absolute top-full left-0 right-0 overflow-hidden z-50 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} ${darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'} border-t shadow-lg rounded-b-2xl backdrop-blur-md`}> 
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => handleNavigate('home')}
                className={`flex items-center gap-1 py-2 px-4 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 ${currentPage === 'home' ? (darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100') : (darkMode ? 'text-white' : '')}`}
              >
                <Home className={`h-4 w-4 mr-1 ${darkMode && currentPage !== 'home' ? 'text-white' : ''}`} />{t('header.home')}
              </button>
              <button 
                onClick={() => handleNavigate('dashboard')}
                className={`flex items-center gap-1 py-2 px-4 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 ${currentPage === 'dashboard' ? (darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100') : (darkMode ? 'text-white' : '')}`}
              >
                <BarChart className={`h-4 w-4 mr-1 ${darkMode && currentPage !== 'dashboard' ? 'text-white' : ''}`} />{t('header.dashboard')}
              </button>
              <button 
                onClick={() => handleNavigate('team')}
                className={`flex items-center gap-1 py-2 px-4 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 ${currentPage === 'team' ? (darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100') : (darkMode ? 'text-white' : '')}`}
              >
                <Users className={`h-4 w-4 mr-1 ${darkMode && currentPage !== 'team' ? 'text-white' : ''}`} />{t('header.team')}
              </button>
              <button 
                onClick={() => handleNavigate('feedback')}
                className={`flex items-center gap-1 py-2 px-4 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 ${currentPage === 'feedback' ? (darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100') : (darkMode ? 'text-white' : '')}`}
              >
                <MessageSquare className={`h-4 w-4 mr-1 ${darkMode && currentPage !== 'feedback' ? 'text-white' : ''}`} />{t('header.feedback')}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;