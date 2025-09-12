import React from 'react';
import { TrendingUp } from 'lucide-react';

interface ProgressData {
  day: string;
  points: number;
}

const mockProgressData: ProgressData[] = [
  { day: 'Mon', points: 120 },
  { day: 'Tue', points: 150 },
  { day: 'Wed', points: 180 },
  { day: 'Thu', points: 140 },
  { day: 'Fri', points: 200 },
  { day: 'Sat', points: 160 },
  { day: 'Sun', points: 190 }
];

export const ProgressChart: React.FC = () => {
  const maxPoints = Math.max(...mockProgressData.map(d => d.points));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Progress</h3>
        <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
      </div>
      
      <div className="space-y-4">
        {mockProgressData.map((data, index) => (
          <div key={data.day} className="flex items-center space-x-3">
            <div className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">
              {data.day}
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${(data.points / maxPoints) * 100}%`,
                  animationDelay: `${index * 100}ms`
                }}
              />
            </div>
            <div className="w-12 text-sm font-medium text-gray-900 dark:text-white text-right">
              {data.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};