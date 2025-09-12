export interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  class: string;
  ecoPoints: number;
  streak: number;
  level: number;
  badges: Badge[];
  completedQuizzes: string[];
  completedQuests: string[];
  joinedDate: Date;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  sdg: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  points: number;
  timeLimit: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface SideQuest {
  id: string;
  title: string;
  description: string;
  type: 'photo' | 'checklist' | 'survey' | 'action';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeRequired: string;
  completed: boolean;
  instructions: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'quiz' | 'streak' | 'points' | 'quest' | 'special';
  requirement: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'streak' | 'achievement' | 'reminder' | 'challenge';
  read: boolean;
  createdAt: Date;
}