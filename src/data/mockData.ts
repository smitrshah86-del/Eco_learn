import { User, Quiz, SideQuest, Badge, Notification } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Arjun Singh',
  email: 'arjun.singh@example.com',
  school: 'Government Senior Secondary School, Chandigarh',
  class: '12th Science',
  ecoPoints: 2450,
  streak: 7,
  level: 12,
  badges: [],
  completedQuizzes: ['quiz1', 'quiz2'],
  completedQuests: ['quest1'],
  joinedDate: new Date('2024-01-15')
};

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz1',
    title: 'Climate Action Basics',
    description: 'Learn about climate change and mitigation strategies',
    sdg: 13,
    difficulty: 'easy',
    points: 100,
    timeLimit: 300,
    questions: [
      {
        id: 'q1',
        question: 'What is the main cause of climate change?',
        options: [
          'Natural weather patterns',
          'Greenhouse gas emissions from human activities',
          'Solar radiation changes',
          'Ocean currents'
        ],
        correctAnswer: 1,
        explanation: 'Human activities, particularly burning fossil fuels, release greenhouse gases that trap heat in the atmosphere.',
        points: 20
      },
      {
        id: 'q2',
        question: 'Which gas contributes most to global warming?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'],
        correctAnswer: 2,
        explanation: 'Carbon dioxide (CO₂) is the most abundant greenhouse gas produced by human activities.',
        points: 20
      }
    ]
  },
  {
    id: 'quiz2',
    title: 'Clean Water & Sanitation',
    description: 'Understanding water conservation and management',
    sdg: 6,
    difficulty: 'medium',
    points: 150,
    timeLimit: 400,
    questions: [
      {
        id: 'q3',
        question: 'What percentage of Earth\'s water is freshwater?',
        options: ['10%', '5%', '2.5%', '1%'],
        correctAnswer: 2,
        explanation: 'Only about 2.5% of Earth\'s water is freshwater, and most of it is frozen in glaciers.',
        points: 30
      }
    ]
  }
];

export const mockSideQuests: SideQuest[] = [
  {
    id: 'quest1',
    title: 'Plant a Tree',
    description: 'Plant a sapling and document its growth',
    type: 'photo',
    difficulty: 'easy',
    points: 50,
    timeRequired: '30 minutes',
    completed: true,
    instructions: [
      'Choose a suitable location for planting',
      'Dig a hole twice the width of the root ball',
      'Place the sapling and cover with soil',
      'Water thoroughly and take a photo'
    ]
  },
  {
    id: 'quest2',
    title: 'Waste Segregation Challenge',
    description: 'Separate waste in your home for one week',
    type: 'checklist',
    difficulty: 'easy',
    points: 75,
    timeRequired: '1 week',
    completed: false,
    instructions: [
      'Set up separate bins for wet and dry waste',
      'Educate family members about segregation',
      'Track daily segregation for 7 days',
      'Submit completion checklist'
    ]
  }
];

export const mockBadges: Badge[] = [
  {
    id: 'badge1',
    name: 'Quiz Master',
    description: 'Complete 5 quizzes with 80%+ score',
    icon: '🎓',
    category: 'quiz',
    requirement: 'Complete 5 quizzes with 80%+ score',
    earned: true,
    earnedDate: new Date('2024-12-01')
  },
  {
    id: 'badge2',
    name: 'Streak Champion',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'streak',
    requirement: 'Maintain 7+ day streak',
    earned: true,
    earnedDate: new Date('2024-12-10')
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    title: 'Streak Alert!',
    message: 'You\'re on a 7-day streak! Keep it going!',
    type: 'streak',
    read: false,
    createdAt: new Date()
  },
  {
    id: 'notif2',
    title: 'New Badge Earned!',
    message: 'Congratulations! You earned the Streak Champion badge.',
    type: 'achievement',
    read: false,
    createdAt: new Date(Date.now() - 3600000)
  }
];