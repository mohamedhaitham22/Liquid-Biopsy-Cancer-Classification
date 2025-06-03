import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t py-6`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} Cancer Type Prediction Tool
          </p>
          <a 
            href="https://github.com/mohamedhaitham22" 
            className={`${
              darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
            } transition-colors flex items-center space-x-1`}
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;