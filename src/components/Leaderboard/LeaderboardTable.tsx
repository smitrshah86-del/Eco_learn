import React from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  school: string;
  points: number;
  badges: number;
  streak: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Arjun Singh', school: 'Govt. Sr. Sec. School, Chandigarh', points: 2450, badges: 8, streak: 7 },
  { rank: 2, name: 'Priya Sharma', school: 'DAV College, Chandigarh', points: 2380, badges: 7, streak: 12 },
  { rank: 3, name: 'Ravi Kumar', school: 'Govt. College, Ludhiana', points: 2290, badges: 6, streak: 5 },
  { rank: 4, name: 'Simran Kaur', school: 'Khalsa College, Amritsar', points: 2150, badges: 5, streak: 3 },
  { rank: 5, name: 'Manpreet Singh', school: 'GNDU, Amritsar', points: 2050, badges: 4, streak: 8 }
];

export const LeaderboardTable: React.FC = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-600 dark:text-gray-400">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 border-yellow-200 dark:border-yellow-700';
      case 2: return 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 border-gray-200 dark:border-gray-600';
      case 3: return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-900 border-amber-200 dark:border-amber-700';
      default: return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {mockLeaderboard.map((entry, index) => (
        <div
          key={entry.rank}
          className={`p-4 rounded-xl border ${getRankBackground(entry.rank)} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12">
                {getRankIcon(entry.rank)}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {entry.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {entry.school}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {entry.points.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Badges</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {entry.badges}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Streak</p>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {entry.streak}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};