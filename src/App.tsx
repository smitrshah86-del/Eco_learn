import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Views/Dashboard';
import { QuizzesView } from './components/Views/QuizzesView';
import { SideQuestsView } from './components/Views/SideQuestsView';
import { LeaderboardView } from './components/Views/LeaderboardView';
import { BadgesView } from './components/Views/BadgesView';
import { 
  mockUser, 
  mockQuizzes, 
  mockSideQuests, 
  mockBadges, 
  mockNotifications 
} from './data/mockData';
import { User, Quiz, SideQuest, Badge, Notification } from './types';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User>(mockUser);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [quizzes] = useState<Quiz[]>(mockQuizzes);
  const [sideQuests] = useState<SideQuest[]>(mockSideQuests);
  const [badges] = useState<Badge[]>([...mockBadges, ...Array(15).fill(null).map((_, i) => ({
    id: `badge${i + 3}`,
    name: `Achievement ${i + 3}`,
    description: `Complete specific challenge ${i + 3}`,
    icon: ['🌱', '🌍', '💧', '⚡', '🔥', '❄️', '🌊', '🌪️'][i % 8],
    category: ['quiz', 'streak', 'points', 'quest', 'special'][i % 5] as any,
    requirement: `Complete requirement ${i + 3}`,
    earned: false
  }))]);

  const handleQuizComplete = (quizId: string, score: number, totalQuestions: number) => {
    const points = Math.round((score / totalQuestions) * 100 * 2); // 2 points per % score
    
    setUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + points,
      completedQuizzes: [...prev.completedQuizzes, quizId],
      streak: prev.streak + 1
    }));
  };

  const handleStartQuest = (questId: string) => {
    console.log('Starting quest:', questId);
    // In a real app, this would navigate to quest details or start the quest flow
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} notifications={notifications} />;
      case 'quizzes':
        return (
          <QuizzesView 
            quizzes={quizzes} 
            user={user}
            onQuizComplete={handleQuizComplete}
          />
        );
      case 'quests':
        return <SideQuestsView quests={sideQuests} onStartQuest={handleStartQuest} />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'badges':
        return <BadgesView badges={badges} />;
      case 'community':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Community Features Coming Soon!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with other students, share your achievements, and collaborate on environmental projects.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your learning experience, notifications, and privacy settings.
            </p>
          </div>
        );
      default:
        return <Dashboard user={user} notifications={notifications} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        notifications={notifications.filter(n => !n.read).length}
        userName={user.name}
      />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        
        <main className="flex-1 p-6 md:ml-64">
          <div className="max-w-7xl mx-auto">
            {renderCurrentView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;