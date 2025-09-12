import React from 'react';
import { StatCard } from '../Dashboard/StatCard';
import { ProgressChart } from '../Dashboard/ProgressChart';
import { StreakCounter } from '../Dashboard/StreakCounter';
import { Zap, Trophy, Target, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import { User, Notification } from '../../types';

interface DashboardProps {
  user: User;
  notifications: Notification[];
}

export const Dashboard: React.FC<DashboardProps> = ({ user, notifications }) => {
  const unreadNotifications = notifications.filter(n => !n.read);
  
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 🌱</h1>
            <p className="text-green-100 mb-4">
              Continue your environmental learning journey
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Joined {user.joinedDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Level {user.level}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{user.ecoPoints.toLocaleString()}</p>
            <p className="text-green-100">Eco Points</p>
          </div>
        </div>
      </div>

      {/* Notifications Banner */}
      {unreadNotifications.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <Zap className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                You have {unreadNotifications.length} new notification{unreadNotifications.length > 1 ? 's' : ''}!
              </p>
              <div className="mt-2 space-y-1">
                {unreadNotifications.slice(0, 2).map(notification => (
                  <p key={notification.id} className="text-xs text-yellow-700 dark:text-yellow-300">
                    • {notification.message}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Eco Points"
          value={user.ecoPoints.toLocaleString()}
          icon={Zap}
          color="text-green-600 dark:text-green-400"
          change="+120 this week"
        />
        <StatCard
          title="Badges Earned"
          value={user.badges.filter(b => b.earned).length}
          icon={Trophy}
          color="text-yellow-600 dark:text-yellow-400"
          change="2 new badges"
        />
        <StatCard
          title="Quizzes Completed"
          value={user.completedQuizzes.length}
          icon={BookOpen}
          color="text-blue-600 dark:text-blue-400"
          change="3 this month"
        />
        <StatCard
          title="Side Quests"
          value={user.completedQuests.length}
          icon={Target}
          color="text-purple-600 dark:text-purple-400"
          change="1 in progress"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProgressChart />
        </div>
        <div>
          <StreakCounter streak={user.streak} bestStreak={15} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
            <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Take Quiz</span>
          </button>
          <button className="p-4 text-center bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
            <Target className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Start Quest</span>
          </button>
          <button className="p-4 text-center bg-yellow-50 dark:bg-yellow-900 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors">
            <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Leaderboard</span>
          </button>
          <button className="p-4 text-center bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
            <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">View Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};