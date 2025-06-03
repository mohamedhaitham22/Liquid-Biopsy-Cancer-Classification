import React from 'react';
import { Users, GraduationCap, Linkedin, Award, Book } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TeamProps {
  darkMode: boolean;
}

const Team: React.FC<TeamProps> = ({ darkMode }) => {
  const { t } = useTranslation();  
  
  interface TeamMember {
    name: string;
    linkedIn?: string;
  }

  const teamMembers: TeamMember[] = [
    { name: t('team.members.ahmed'), linkedIn: 'https://www.linkedin.com/in/ahmed-salem-9a7277275/' },
    { name: t('team.members.mohamed'), linkedIn: 'https://www.linkedin.com/in/mohamed-haitham-48353a255/' },
    { name: t('team.members.basmala'), linkedIn: 'https://www.linkedin.com/in/basmala-ahmed-53053333b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: t('team.members.kenzy'), linkedIn: 'https://www.linkedin.com/in/kenzy-el-saeed-255273357/' },
    { name: t('team.members.sandy'), linkedIn: 'https://www.linkedin.com/in/sandy-saher-30a84931b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: t('team.members.shahd'), linkedIn: 'https://www.linkedin.com/in/shahd-abdelghafar-212764307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-70 animate-pulse"></div>
              <img 
                src={darkMode ? "/images/logo2.png" : "/images/logo.png"} 
                alt="Logo" 
                className="relative h-40 w-40 object-cover rounded-full transition-transform duration-300 hover:scale-110 shadow-xl" 
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {t('team.title')}
          </h1>
          
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
            <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              {t('team.university')}
            </p>
          </div>
        </div>
      </div>

      {/* Project Description Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-indigo-100/60 dark:border-indigo-900/30 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
              <Book className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">
              {t('team.projectTitle')}
            </h2>
          </div>
          
          <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <p className="mb-4">
              {t('team.projectDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Supervisor Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-blue-100/60 dark:border-blue-900/30 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <Award className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
              {t('team.supervisedBy')}
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            <div className="relative mb-6 md:mb-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-70"></div>
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl">
                <img
                  src="/images/dr_noha.jpg"
                  alt={t('team.supervisorName')}
                  className="w-full h-full object-cover object-center transform transition duration-500 hover:scale-110"
                />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-2">
                {t('team.supervisorName')}
              </h3>
              
              <p className="text-lg text-blue-700 dark:text-blue-300 mb-4 whitespace-pre-line leading-relaxed">
                {t('team.supervisorRole')}
              </p>
              
              <a
                href="https://www.linkedin.com/in/dr-noha-el-attar-a28841281/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-purple-100/60 dark:border-purple-900/30 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
              <Users className="h-7 w-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300">
              {t('team.membersTitle')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700 shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >                <div className="flex justify-center items-center mb-6">                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-60"></div>                    <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl">                      <img
                        src={ 
                            "/images/blank.png"}
                        alt={member.name}
                        className="w-full h-full object-cover object-center transform transition duration-500 hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-4">
                  {t('team.studentRole')}
                </p>
                
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Footer Note */}
      <div className="flex justify-center w-full mt-8">
        <div className="text-center py-4 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            {t('team.footerNote')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;