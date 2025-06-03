import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PredictionDashboard from './components/PredictionDashboard';
import FeedbackForm from './components/FeedbackForm';
import Disclaimer from './components/Disclaimer';
import Team from './components/Team';
import Tutorial from './components/Tutorial';
import Chatbot from './components/Chatbot';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'home' | 'dashboard' | 'feedback' | 'team' | 'tutorial'>('home');
  const [darkMode, setDarkMode] = React.useState(false);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      // Always return to home page when back button is clicked
      setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL and history when page changes
  useEffect(() => {
    const page = currentPage === 'home' ? '' : currentPage;
    const url = page ? `/${page}` : '/';
    window.history.pushState({ page: currentPage }, '', url);
  }, [currentPage]);

  const handleNavigate = (page: 'home' | 'dashboard' | 'feedback' | 'team' | 'tutorial') => {
    setCurrentPage(page);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <Disclaimer />
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentPage === 'home' ? (
          <Home 
            onGetStarted={() => handleNavigate('dashboard')} 
            darkMode={darkMode} 
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'dashboard' ? (
          <PredictionDashboard />
        ) : currentPage === 'team' ? (
          <Team darkMode={darkMode} />
        ) : currentPage === 'tutorial' ? (
          <Tutorial darkMode={darkMode} />
        ) : (
          <FeedbackForm darkMode={darkMode} />
        )}
      </main>
      <Footer darkMode={darkMode} />
      <Chatbot darkMode={darkMode} />
    </div>
  );
}

export default App;