import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Star, MessageSquare, User, Mail, Stethoscope, Clock, Check, AlertCircle } from 'lucide-react';

interface FeedbackFormProps {
  darkMode: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ darkMode }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    experience: '',
    rating: 5,
    feedback: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd128e0a4-6d54-4247-9e8c-15060436a31f',
          name: formData.name,
          email: formData.email,
          specialty: formData.specialty,
          experience: formData.experience,
          rating: formData.rating,
          feedback: formData.feedback,
          subject: "Doctor's Feedback - Cancer Type Prediction Tool"
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          specialty: '',
          experience: '',
          rating: 5,
          feedback: ''
        });
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={`max-w-3xl mx-auto p-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className={`bg-gradient-to-br ${darkMode ? 'from-gray-800 to-purple-900/20' : 'from-white to-purple-50'} rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border ${darkMode ? 'border-purple-900/30' : 'border-purple-100/60'}`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-3 ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'} rounded-full`}>
              <MessageSquare className={`h-7 w-7 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                {t('feedback.title')}
              </h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('feedback.description')}
              </p>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className={`mb-8 bg-gradient-to-r ${darkMode ? 'from-green-900/30 to-emerald-900/30' : 'from-green-50 to-emerald-50'} backdrop-blur-sm border ${darkMode ? 'border-green-800/50' : 'border-green-200'} rounded-xl p-4 flex items-center gap-3 animate-fade-in shadow-md`}>
              <div className={`p-2 ${darkMode ? 'bg-green-800/50' : 'bg-green-100'} rounded-full`}>
                <Check className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <p className={`${darkMode ? 'text-green-300' : 'text-green-700'} font-medium`}>
                {t('feedback.form.success')}
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className={`mb-8 bg-gradient-to-r ${darkMode ? 'from-red-900/30 to-rose-900/30' : 'from-red-50 to-rose-50'} backdrop-blur-sm border ${darkMode ? 'border-red-800/50' : 'border-red-200'} rounded-xl p-4 flex items-center gap-3 animate-fade-in shadow-md`}>
              <div className={`p-2 ${darkMode ? 'bg-red-800/50' : 'bg-red-100'} rounded-full`}>
                <AlertCircle className={`h-5 w-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              <p className={`${darkMode ? 'text-red-300' : 'text-red-700'} font-medium`}>
                {t('feedback.form.error')}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="relative">
                <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 ml-1`}>
                  {t('feedback.form.name')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-xl ${darkMode ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500' : 'border-gray-200 bg-white/50'} shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 ${darkMode ? 'focus:ring-purple-900' : ''} focus:ring-opacity-50 backdrop-blur-sm py-3`}
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 ml-1`}>
                  {t('feedback.form.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-xl ${darkMode ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500' : 'border-gray-200 bg-white/50'} shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 ${darkMode ? 'focus:ring-purple-900' : ''} focus:ring-opacity-50 backdrop-blur-sm py-3`}
                    placeholder="doctor@example.com"
                  />
                </div>
              </div>
              
              {/* Specialty Field */}
              <div className="relative">
                <label htmlFor="specialty" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 ml-1`}>
                  {t('feedback.form.specialty')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Stethoscope className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    required
                    value={formData.specialty}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-xl ${darkMode ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500' : 'border-gray-200 bg-white/50'} shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 ${darkMode ? 'focus:ring-purple-900' : ''} focus:ring-opacity-50 backdrop-blur-sm py-3`}
                    placeholder="Oncology"
                  />
                </div>
              </div>

              {/* Experience Field */}
              <div className="relative">
                <label htmlFor="experience" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 ml-1`}>
                  {t('feedback.form.experience')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <select
                    id="experience"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    style={darkMode ? { backgroundColor: '#1f2937', color: 'white' } : {}}
                    className={`pl-10 block w-full rounded-xl ${darkMode ? 'border-gray-700 bg-gray-800/50 text-white' : 'border-gray-200 bg-white/50'} shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 ${darkMode ? 'focus:ring-purple-900' : ''} focus:ring-opacity-50 backdrop-blur-sm py-3`}
                  >
                    <option value="" style={darkMode ? { backgroundColor: '#1f2937', color: 'white' } : {}}>Select years of experience</option>
                    <option value="0-5" style={darkMode ? { backgroundColor: '#1f2937', color: 'white' } : {}}>0-5 years</option>
                    <option value="6-10" style={darkMode ? { backgroundColor: '#1f2937', color: 'white' } : {}}>6-10 years</option>
                    <option value="11-15" style={darkMode ? { backgroundColor: '#1f2937', color: 'white' } : {}}>11-15 years</option>
                    <option value="16+" style={darkMode ? { backgroundColor: '#1f2937', color: 'white' } : {}}>16+ years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rating Field */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 ml-1`}>
                {t('feedback.form.rating')}
              </label>
              <div className={`${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white/60 border-gray-200'} border rounded-xl p-4 flex items-center justify-center space-x-2`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className={`p-2 transition-all duration-300 rounded-full ${
                      darkMode ? 'hover:bg-yellow-900/30' : 'hover:bg-yellow-100'
                    } ${
                      formData.rating >= star 
                        ? 'text-yellow-400 scale-110' 
                        : `${darkMode ? 'text-gray-400' : 'text-gray-300'}`
                    }`}
                  >
                    <Star className={`h-8 w-8 ${formData.rating >= star ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Field */}
            <div>
              <label htmlFor="feedback" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 ml-1`}>
                {t('feedback.form.feedback')}
              </label>
              <textarea
                id="feedback"
                name="feedback"
                required
                value={formData.feedback}
                onChange={handleChange}
                rows={4}
                className={`block w-full rounded-xl ${darkMode ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-500' : 'border-gray-200 bg-white/50'} shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 ${darkMode ? 'focus:ring-purple-900' : ''} focus:ring-opacity-50 backdrop-blur-sm`}
                placeholder="Your professional feedback is valuable to us..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-offset-gray-800' : ''} focus:ring-purple-500 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-1`}
            >
              {status === 'submitting' ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  {t('feedback.form.submit')}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;