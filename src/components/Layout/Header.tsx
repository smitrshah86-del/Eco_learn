import React from 'react';
import { Bell, Menu, Moon, Sun, User } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';

interface HeaderProps {
  onMenuClick: () => void;
  notifications: number;
  userName: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, notifications, userName }) => {
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="ml-4 md:ml-0">
              <h1 className="text-xl font-bold text-green-600 dark:text-green-400">
                EcoLearn Punjab
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Environmental Education Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {userName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};