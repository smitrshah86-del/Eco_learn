import React from 'react';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Target, 
  Award, 
  Users, 
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'quizzes', label: 'SDG Quizzes', icon: BookOpen },
  { id: 'quests', label: 'Side Quests', icon: Target },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'badges', label: 'Badges', icon: Award },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  currentView, 
  onViewChange 
}) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 
        shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg
                    transition-colors duration-200
                    ${isActive
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};