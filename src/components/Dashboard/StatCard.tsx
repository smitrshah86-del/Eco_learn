import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: string;
  animate?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  change,
  animate = false
}) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700
      transform transition-all duration-300 hover:scale-105 hover:shadow-xl
      ${animate ? 'animate-pulse' : ''}
    `}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
          {change && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text', 'bg').replace('600', '100')} dark:bg-opacity-20`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );
};