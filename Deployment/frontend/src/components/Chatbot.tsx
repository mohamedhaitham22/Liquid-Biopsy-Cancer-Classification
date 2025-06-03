import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, User, Sparkles, Brain, Zap } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  darkMode: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant for this cancer prediction application. I can help you with questions about the supported cancer types, how to use the website, understanding prediction results, and general guidance. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {      // Initialize Gemini AI
      const apiKey = import.meta.env.VITE_GEMINI_API;
      const genAI = new GoogleGenerativeAI(apiKey);      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      console.log('Sending request to Gemini API with message:', userMessage);
      
      // Comprehensive context about the cancer prediction application
      const context = `You are an AI assistant for a cancer prediction web application. Here's detailed information about the application:


**PROJECT BACKGROUND & DEVELOPMENT TEAM:**
This cancer prediction tool was developed as part of a 6th semester university project for AI and Bioinformatics Students at the Faculty of Artificial Intelligence, Delta University for Science and Technology, Egypt. It combines artificial intelligence techniques with liquid biopsy data to improve the accuracy of cancer classification and diagnosis.

**Development Team Members:**
Team members include:
- Mohamed Haitham  
- Ahmed El-Sayed  
- Basmala Ahmed  
- Kenzy Ahmed  
- Sandy Saher  
- Shahd Abdelghafar
The supervisor for this project::
Prof. Dr. Noha Elattar  
Head of the Bioinformatics Department

**Moaaz Awad**
when the user asks Who is Moaaz Awad, respond with:
Moaz Awad is an Cybersecurity student at the Faculty of Artificial Intelligence, Delta University for Science and Technology, Egypt. He contributed to the project by providing technical support and guidance on cybersecurity best practices, ensuring the application is secure and reliable.
**Supervised by:**
Prof. Dr. Noha Elattar  
Head of the Bioinformatics Department

**SUPPORTED CANCER TYPES:**
The application supports prediction for the following cancer types:
1. Breast Cancer
2. Colorectal Cancer  
3. Esophageal Cancer
4. Liver Cancer
5. Lung Cancer
6. Ovarian Cancer
7. Pancreatic Cancer
8. Stomach Cancer
9. Normal (for comparison/control)

**APPLICATION FEATURES & FUNCTIONALITY:**
- Modern web interface built with React and TypeScript
- Real-time data processing and analysis
- Multi-language support (English and Arabic)
- RESTful API backend with FastAPI
- Machine learning integration using LightGBM algorithm
- Excel file support for data import/export
- Batch prediction capability for multiple samples
- Secure data processing (no patient data is stored after analysis)
- Interactive API documentation
- Results visualization and summary

**HOW TO USE THE WEBSITE:**
1. Go to Dashboard page
2. **Template Download**: A template file is available to guide proper data formatting
3. **File Upload**: Users can upload CSV, XLSX, or JSON files containing molecular data
4. **Prediction Process**: The LightGBM machine learning model processes the data
5. **Batch Processing**: Handle multiple samples simultaneously
6. **Results Dashboard**: View predictions in tables and summary format
7. **Feedback System**: Users can provide feedback about their experience
**Tutorial Section**: go to the tutorial page if you need more information about how to use the application

**TECHNICAL DETAILS:**
- Model: Trained LightGBM model for cancer type classification

**NAVIGATION:**
- Home page: Overview and getting started
- Dashboard: Main prediction interface
- Tutorial: Step-by-step instructions
- Team: Information about developers
- Feedback: User feedback form

Please provide helpful, accurate responses about:
- Supported cancer types and their characteristics
- How to use the application features
- File format requirements and data preparation
- Understanding prediction results
- Troubleshooting common issues
- General bioinformatics and machine learning concepts
- Navigation and website functionality

**INFORMATION ABOUT SUPPORTED CANCER TYPES:**
Breast Cancer:
What it is:
Breast cancer happens when cells in the breast grow in an uncontrolled way. It is the most common cancer in women but can also affect men.
Common symptoms:
- A lump in the breast
- Change in breast shape or size
- Nipple discharge or pain
Risk factors:
- Family history
- Hormonal changes
- Age and gender (more common in women over 40)
Why early detection matters:
Finding breast cancer early makes treatment easier and more successful.
Colorectal Cancer:
What it is:
Colorectal cancer starts in the colon (large intestine) or the rectum. It often begins as small growths called polyps that can become cancer over time.
Common symptoms:
- Blood in the stool
- Stomach pain or cramps
- Changes in bowel habits
- Unexplained weight loss
Risk factors:
- Age over 50
- Low-fiber, high-fat diet
- Family history
Why early detection matters:
Removing polyps early can prevent colorectal cancer and improve survival.
Esophageal Cancer:
What it is:
Esophageal cancer begins in the esophagus, the tube that connects the mouth to the stomach. It can grow quickly and is hard to detect early.
Common symptoms:
- Trouble swallowing
- Chest pain or discomfort
- Unexplained weight loss
Risk factors:
- Smoking and alcohol
- Acid reflux (GERD)
- Older age, especially in men
Why early detection matters:
This cancer spreads fast, so early diagnosis gives a better chance of successful treatment.
Liver Cancer:
What it is:
Liver cancer starts in the liver cells. The most common type is hepatocellular carcinoma (HCC). The liver is a key organ for digestion and filtering toxins.
Common symptoms:
- Pain in the upper right side of the abdomen
- Yellowing of the skin or eyes (jaundice)
- Feeling tired or weak
Risk factors:
- Hepatitis B or C infection
- Liver cirrhosis (often from alcohol or fatty liver disease)
Why early detection matters:
The liver is essential for life. Early detection helps provide more treatment options.
Lung Cancer:
What it is:
Lung cancer begins in the lungs and is one of the most serious and deadly cancers. It is strongly linked to smoking but can also happen in non-smokers.
Common symptoms:
- Long-lasting cough
- Chest pain
- Shortness of breath
- Coughing up blood
Risk factors:
- Smoking
- Exposure to air pollution or harmful chemicals
- Family history
Why early detection matters:
Lung cancer is often found late, so detecting it early can improve treatment success and survival.
Ovarian Cancer:
What it is:
Ovarian cancer affects the ovaries, which are part of the female reproductive system. It is often not noticed in the early stages.
Common symptoms:
- Bloating or swelling in the belly
- Feeling full quickly when eating
- Pelvic or back pain
Risk factors:
- Family history of ovarian or breast cancer
- Age over 50
- Endometriosis or hormone therapy
Why early detection matters:
Ovarian cancer is easier to treat when it is found before it spreads to other organs.
Pancreatic Cancer:
What it is:
Pancreatic cancer starts in the pancreas, an organ that helps control blood sugar and digestion. It is often called a “silent cancer” because symptoms come late.
Common symptoms:
- Belly or back pain
- Yellow skin and eyes (jaundice)
- Sudden weight loss
Risk factors:
- Smoking
- Chronic pancreatitis
- Family history or diabetes
Why early detection matters:
This cancer grows quickly and spreads early, so early detection is key for better treatment.
Stomach (Gastric) Cancer:
What it is:
Stomach cancer begins in the lining of the stomach. It can grow slowly and may not cause symptoms until it is advanced.
Common symptoms:
- Indigestion or heartburn
- Feeling full after small meals
- Stomach pain or discomfort
Risk factors:
- Infection with Helicobacter pylori
- Smoking
- Diet high in salty or smoked foods
Why early detection matters:
Finding stomach cancer early improves treatment options and survival rates.

**LIQUID BIOPSY EXPLAINED:**
What is Liquid Biopsy?
Liquid biopsy is a modern, non-invasive method to detect and monitor cancer using a simple blood sample. It analyzes small fragments of cancer-related materials such as:
- Circulating tumor DNA (ctDNA)
- Circulating tumor cells (CTCs)
- Other biomarkers like RNA, proteins, and exosomes
This technique provides information about the genetic makeup of cancer without needing a surgical tissue biopsy.

Why Use It?
- Less invasive (just a blood draw)
- Fast results, usually within 1–2 days
- Can detect genetic mutations to guide treatment
- Ideal for continuous monitoring of cancer patients

User question: "${userMessage}"

Provide a comprehensive, user-friendly response that directly addresses their question. If they ask about cancer types, list the specific ones supported. If they ask about functionality, explain the relevant features clearly, Answer ONLY what is asked. Be brief and direct..`;

      const result = await model.generateContent(context);
      const response = await result.response;
      
      // Handle blocked content
      if (response.candidates && response.candidates[0].finishReason === 'SAFETY') {
        return 'I cannot provide a response to that query due to safety policies. Please try rephrasing your question about the cancer prediction application.';
      }
      
      const text = response.text();
      console.log('Received response from Gemini API:', text);
      return text;
      
    } catch (error: any) {
      console.error('Error generating AI response:', error);
      
      // Handle specific error cases
      if (error.status === 400) {
        return 'The request was invalid. Please try rephrasing your question.';
      }
      if (error.status === 403) {
        return 'API access denied. There may be an issue with the API configuration.';
      }
      if (error.status === 429) {
        return 'Too many requests. Please wait a moment and try again.';
      }
      if (error.message?.includes('fetch')) {
        return 'Network error. Please check your internet connection and try again.';
      }
      
      return `I'm experiencing technical difficulties. Error: ${error.message || 'Unknown error'}. Please try again or contact support.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiResponse = await generateResponse(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error while processing your message. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Floating Action Button with Glow Effect */}
        <button
          onClick={() => setIsOpen(true)}
          className={`group relative p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-500 hover:via-purple-500 hover:to-blue-600' 
              : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-400 hover:via-indigo-400 hover:to-purple-500'
          }`}
          aria-label="Open AI Assistant"
        >
          {/* Glow Ring */}
          <div className={`absolute inset-0 rounded-full animate-pulse ${
            darkMode ? 'bg-blue-400/30' : 'bg-blue-300/40'
          } blur-lg`}></div>
          
          {/* Icon with Floating Animation */}
          <div className="relative z-10 flex items-center justify-center">
            <MessageCircle size={24} className="text-white drop-shadow-lg animate-bounce" />
            <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300 animate-ping" />
          </div>
          
          {/* Tooltip */}
          <div className={`absolute bottom-full right-0 mb-2 px-3 py-1 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
          }`}>
            Chat with AI Assistant
            <div className={`absolute top-full right-4 w-2 h-2 transform rotate-45 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-900'
            }`}></div>
          </div>
        </button>
      </div>
    );
  }
  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Main Chat Container with Glass Effect */}
      <div className={`h-full rounded-2xl shadow-2xl backdrop-blur-xl border flex flex-col overflow-hidden ${
        darkMode 
          ? 'bg-gray-900/95 border-gray-700/50 shadow-blue-500/20' 
          : 'bg-white/95 border-gray-200/50 shadow-indigo-500/20'
      }`}>
        {/* Modern Header with Gradient */}
        <div className={`flex items-center justify-between p-4 border-b backdrop-blur-sm ${
          darkMode 
            ? 'bg-gradient-to-r from-gray-800/80 via-blue-900/50 to-purple-900/50 border-gray-700/50 text-white' 
            : 'bg-gradient-to-r from-blue-500/90 via-indigo-500/90 to-purple-600/90 border-blue-600/30 text-white'
        }`}>
          <div className="flex items-center space-x-3">
            {/* Animated Bot Icon */}
            <div className="relative">
              <div className={`absolute inset-0 rounded-full animate-pulse ${
                darkMode ? 'bg-blue-400/30' : 'bg-white/30'
              }`}></div>
              <Brain size={24} className="relative z-10 text-white drop-shadow-lg" />
              <Zap size={10} className="absolute -top-1 -right-1 text-yellow-300 animate-ping" />
            </div>            <div>
              <h3 className="font-bold text-lg">AI Cancer Assistant</h3>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
              aria-label={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>        </div>

        {!isMinimized && (
          <>
            {/* Messages Container with Modern Scrollbar */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar ${
              darkMode 
                ? 'bg-gradient-to-b from-gray-900/50 to-gray-800/80' 
                : 'bg-gradient-to-b from-gray-50/80 to-white/90'
            }`} style={{
              scrollbarWidth: 'thin',
              scrollbarColor: darkMode ? '#4B5563 transparent' : '#D1D5DB transparent'
            }}>              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} group`}
                >
                  <div className={`flex items-start space-x-3 max-w-[85%] ${
                    message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* Modern Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                      message.isUser 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white ring-2 ring-blue-300/50' 
                        : darkMode 
                          ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-gray-300 ring-2 ring-gray-500/30' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 ring-2 ring-gray-300/50'
                    }`}>
                      {message.isUser ? <User size={18} /> : <Brain size={18} />}
                    </div>
                    
                    {/* Modern Message Bubble */}
                    <div className={`rounded-2xl p-4 shadow-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-xl ${
                      message.isUser
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-400/30 shadow-blue-500/20'
                        : darkMode
                          ? 'bg-gradient-to-br from-gray-800/90 to-gray-700/90 text-gray-100 border-gray-600/30 shadow-gray-800/50'
                          : 'bg-gradient-to-br from-white/95 to-gray-50/95 text-gray-800 border-gray-200/50 shadow-gray-500/10'
                    }`}>
                      {message.isUser ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      ) : (
                        <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              // Custom styling for markdown elements
                              h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                              h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                              h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                              p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                              li: ({children}) => <li className="text-sm">{children}</li>,
                              strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                              em: ({children}) => <em className="italic">{children}</em>,
                              code: ({children}) => (
                                <code className={`px-1 py-0.5 rounded text-xs font-mono ${
                                  darkMode 
                                    ? 'bg-gray-700/50 text-blue-300' 
                                    : 'bg-gray-100 text-blue-700'
                                }`}>
                                  {children}
                                </code>
                              ),
                              pre: ({children}) => (
                                <pre className={`p-3 rounded-lg overflow-x-auto text-xs font-mono mb-2 ${
                                  darkMode 
                                    ? 'bg-gray-700/50 text-gray-100' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {children}
                                </pre>
                              ),
                              blockquote: ({children}) => (
                                <blockquote className={`border-l-4 pl-3 py-1 mb-2 italic ${
                                  darkMode 
                                    ? 'border-blue-400 text-gray-300' 
                                    : 'border-blue-500 text-gray-600'
                                }`}>
                                  {children}
                                </blockquote>
                              ),
                              a: ({children, href}) => (
                                <a 
                                  href={href} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className={`underline hover:no-underline ${
                                    darkMode 
                                      ? 'text-blue-300 hover:text-blue-200' 
                                      : 'text-blue-600 hover:text-blue-800'
                                  }`}
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {message.text}
                          </ReactMarkdown>
                        </div>
                      )}
                      <p className={`text-xs mt-2 opacity-70 flex items-center ${
                        message.isUser ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{formatTime(message.timestamp)}</span>
                        {message.isUser && (
                          <Sparkles size={10} className="ml-1 text-yellow-300" />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}              {isLoading && (
                <div className="flex justify-start group">
                  <div className={`flex items-start space-x-3 max-w-[85%]`}>
                    {/* Loading Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                      darkMode 
                        ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-gray-300 ring-2 ring-gray-500/30' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 ring-2 ring-gray-300/50'
                    }`}>
                      <Brain size={18} className="animate-pulse" />
                    </div>
                    
                    {/* Modern Loading Bubble */}
                    <div className={`rounded-2xl p-4 shadow-lg backdrop-blur-sm border ${
                      darkMode
                        ? 'bg-gradient-to-br from-gray-800/90 to-gray-700/90 text-gray-100 border-gray-600/30'
                        : 'bg-gradient-to-br from-white/95 to-gray-50/95 text-gray-800 border-gray-200/50'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className={`w-2 h-2 rounded-full animate-bounce ${
                            darkMode ? 'bg-blue-400' : 'bg-blue-500'
                          }`} style={{animationDelay: '0s'}}></div>
                          <div className={`w-2 h-2 rounded-full animate-bounce ${
                            darkMode ? 'bg-blue-400' : 'bg-blue-500'
                          }`} style={{animationDelay: '0.2s'}}></div>
                          <div className={`w-2 h-2 rounded-full animate-bounce ${
                            darkMode ? 'bg-blue-400' : 'bg-blue-500'
                          }`} style={{animationDelay: '0.4s'}}></div>
                        </div>
                        <span className="text-sm opacity-70">AI is thinking...</span>
                        <Zap size={12} className="text-yellow-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>            {/* Modern Quick Action Buttons */}
            <div className={`px-4 py-3 border-t backdrop-blur-sm ${
              darkMode 
                ? 'border-gray-700/50 bg-gray-800/80' 
                : 'border-gray-200/50 bg-white/80'
            }`}>
              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  onClick={() => setInputText('What cancer types are supported?')}
                  disabled={isLoading}
                  className={`text-xs px-3 py-2 rounded-full border transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    darkMode 
                      ? 'border-blue-500/50 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 bg-blue-500/10' 
                      : 'border-blue-500/50 text-blue-600 hover:bg-blue-50 hover:border-blue-500 bg-blue-50/50'
                  }`}
                >
                  <Brain size={12} className="inline mr-1" />
                  Cancer Types
                </button>
                <button
                  onClick={() => setInputText('How do I use this website?')}
                  disabled={isLoading}
                  className={`text-xs px-3 py-2 rounded-full border transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    darkMode 
                      ? 'border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 bg-purple-500/10' 
                      : 'border-purple-500/50 text-purple-600 hover:bg-purple-50 hover:border-purple-500 bg-purple-50/50'
                  }`}
                >
                  <Sparkles size={12} className="inline mr-1" />
                  How to Use
                </button>
                <button
                  onClick={() => setInputText('What file format is required?')}
                  disabled={isLoading}
                  className={`text-xs px-3 py-2 rounded-full border transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    darkMode 
                      ? 'border-green-500/50 text-green-300 hover:bg-green-500/20 hover:border-green-400 bg-green-500/10' 
                      : 'border-green-500/50 text-green-600 hover:bg-green-50 hover:border-green-500 bg-green-50/50'
                  }`}
                >
                  <Zap size={12} className="inline mr-1" />
                  File Format
                </button>
              </div>
            </div>            {/* Modern Input Section */}
            <div className={`p-4 border-t backdrop-blur-sm ${
              darkMode 
                ? 'border-gray-700/50 bg-gray-800/80' 
                : 'border-gray-200/50 bg-white/80'
            }`}>
              <div className="flex space-x-3">
                {/* Enhanced Textarea */}
                <div className="flex-1 relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="How can I assist you...?"
                    rows={1}
                    className={`w-full resize-none rounded-xl px-4 py-3 pr-12 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 backdrop-blur-sm ${
                      darkMode 
                        ? 'bg-gray-700/80 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:bg-gray-700 focus:border-blue-500/50' 
                        : 'bg-white/90 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500/50'
                    }`}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                  {/* Character count or typing indicator */}
                  {inputText.length > 0 && (
                    <div className={`absolute bottom-2 right-3 text-xs opacity-50 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <Sparkles size={10} className="inline animate-pulse" />
                    </div>
                  )}
                </div>
                
                {/* Enhanced Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className={`px-4 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${
                    !inputText.trim() || isLoading
                      ? darkMode 
                        ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-gray-300/50 text-gray-500 cursor-not-allowed shadow-none'
                      : darkMode
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-500/30'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-500/30'
                  }`}
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <div className="animate-spin">
                      <Zap size={20} />
                    </div>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
