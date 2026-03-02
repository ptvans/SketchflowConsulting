export interface UserProfile {
  name: string;
  skills: string[];
  incomeGoal: number; // annual $
  workStyles: string[];
  interests: string[];
  dealbreakers: string[];
  exploredCareers: string[]; // career ids already explored
  createdAt: string;
}

export interface TacticStep {
  id: string;
  action: string;
  detail: string;
  timeEstimate: string;
  category: 'research' | 'setup' | 'outreach' | 'learn' | 'build' | 'money';
}

export type DifficultyLevel = 'starter' | 'medium' | 'committed' | 'beast-mode';
export type StartupCost = 'minimal' | 'low' | 'medium' | 'high';
export type WorkStyle = 'remote' | 'in-person' | 'hybrid' | 'outdoors' | 'flexible';

export interface Career {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  pitch: string;
  incomeRange: {
    min: number;
    max: number;
    note?: string;
  };
  timeToFirstIncome: string;
  difficulty: DifficultyLevel;
  workStyles: WorkStyle[];
  skillsRequired: string[];
  skillsHelpful: string[];
  categories: string[];
  startupCost: StartupCost;
  tactics: TacticStep[];
  questions: string[];
  funFact: string;
  snarkyComment: string;
}

export interface DailyPicks {
  date: string; // YYYY-MM-DD
  topPicks: string[]; // career ids
  wildCard: string; // career id
}

export interface ProgressItem {
  id: string;
  careerId: string;
  tacticId: string;
  actionLabel: string;
  completedAt: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'app' | 'user';
  content: string;
  timestamp: string;
  type?: 'intro' | 'tactic' | 'question' | 'encouragement' | 'user-action';
}

export type OnboardingStep = 'welcome' | 'skills' | 'income' | 'workstyle' | 'interests' | 'dealbreakers' | 'done';
