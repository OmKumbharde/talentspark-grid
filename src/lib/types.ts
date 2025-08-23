// Core types for SkillSync application

export type UserRole = 'STUDENT';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  imageUrl?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile {
  id: string;
  userId: string;
  timezone: string;
  location?: string;
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  weeklyHours: number;
  goals?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  area: 'Frontend' | 'Backend' | 'Full-Stack' | 'Data' | 'DevOps' | 'Mobile';
  icon?: string;
}

export interface StudentSkill {
  id: string;
  studentId: string;
  skillId: string;
  level: number; // 1-5
  skill: Skill;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Starter' | 'Intermediate' | 'Advanced';
  tags: string[];
  repoTemplate?: string;
  estimatedWeeks: number;
  status: 'Active' | 'Archived';
  tasks: Task[];
}

export type TaskStatus = 'BACKLOG' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  order: number;
  acceptance?: string;
  points: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  projectId: string;
  startedAt: Date;
  completedAt?: Date;
  project: Project;
}

export interface Submission {
  id: string;
  studentId: string;
  taskId?: string;
  projectId?: string;
  type: 'TASK' | 'PROJECT';
  notes?: string;
  repoUrl?: string;
  zipUrl?: string;
  status: 'PENDING_REVIEW' | 'CHANGES_REQUESTED' | 'APPROVED';
  createdAt: Date;
  reviews: ReviewThread[];
}

export interface ReviewThread {
  id: string;
  submissionId: string;
  summary: string;
  severity: 'info' | 'warn' | 'blocker';
  items: ReviewItem[];
  messages: Message[];
  createdAt: Date;
}

export interface ReviewItem {
  file: string;
  line?: number;
  type: 'suggestion' | 'issue' | 'praise';
  message: string;
  fixSuggestion?: string;
}

export interface Message {
  id: string;
  threadId?: string;
  channel: 'MENTOR_CHAT' | 'SYSTEM' | 'REVIEW';
  from: 'AI_MENTOR' | 'SYSTEM' | 'STUDENT';
  body: string;
  metadata?: any;
  createdAt: Date;
}

export interface Badge {
  id: string;
  code: string;
  name: string;
  icon: string;
  criteria: string;
  xp: number;
}

export interface StudentBadge {
  id: string;
  studentId: string;
  badgeId: string;
  awardedAt: Date;
  reason?: string;
  badge: Badge;
}

export interface LeaderboardEntry {
  studentId: string;
  name: string;
  xp: number;
  rank: number;
  avatar?: string;
}

// UI State types
export interface OnboardingData {
  profile: Partial<StudentProfile>;
  skills: Array<{ skillId: string; level: number }>;
  preferences: {
    projectTypes: string[];
    stackFocus: string[];
    availableDays: string[];
  };
}