// Mock API Layer for SkillSync
// This provides a complete mock backend that can be easily swapped for real APIs

import { authService } from '../auth';
import type { 
  User, 
  StudentProfile, 
  Project, 
  Task, 
  Submission, 
  ReviewThread, 
  Message, 
  Badge, 
  LeaderboardEntry,
  OnboardingData 
} from '../types';

// Mock Data Storage (in production, this would be your database)
class MockDataStore {
  private data = {
    projects: [] as Project[],
    tasks: [] as Task[],
    messages: [] as Message[],
    submissions: [] as Submission[],
    reviewThreads: [] as ReviewThread[],
    badges: [] as Badge[],
    leaderboard: [] as LeaderboardEntry[],
    profiles: new Map<string, StudentProfile>(),
    enrollments: new Map<string, string[]>() // userId -> projectIds
  };

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed projects
    this.data.projects = [
      {
        id: 'project-1',
        title: 'React Task Manager',
        description: 'Build a full-featured task management app with React, TypeScript, and Tailwind CSS',
        difficulty: 'Intermediate',
        tags: ['React', 'TypeScript', 'Tailwind', 'State Management'],
        estimatedWeeks: 3,
        status: 'Active',
        tasks: []
      },
      {
        id: 'project-2', 
        title: 'E-commerce API',
        description: 'Create a RESTful API for an e-commerce platform with authentication and payment processing',
        difficulty: 'Advanced',
        tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe'],
        estimatedWeeks: 4,
        status: 'Active',
        tasks: []
      },
      {
        id: 'project-3',
        title: 'Landing Page Portfolio',
        description: 'Design and develop a responsive portfolio website with modern animations',
        difficulty: 'Starter',
        tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
        estimatedWeeks: 2,
        status: 'Active',
        tasks: []
      }
    ];

    // Seed tasks for project-1
    this.data.tasks = [
      {
        id: 'task-1',
        projectId: 'project-1',
        title: 'Set up project structure',
        description: 'Initialize React app with TypeScript and Tailwind CSS',
        status: 'DONE',
        order: 1,
        points: 10,
        acceptance: 'Project structure is set up with proper TypeScript configuration'
      },
      {
        id: 'task-2',
        projectId: 'project-1', 
        title: 'Create task list component',
        description: 'Build reusable task list component with add/edit/delete functionality',
        status: 'IN_PROGRESS',
        order: 2,
        points: 20,
        acceptance: 'Task list displays tasks and allows CRUD operations'
      },
      {
        id: 'task-3',
        projectId: 'project-1',
        title: 'Implement drag and drop',
        description: 'Add drag and drop functionality for task reordering',
        status: 'BACKLOG',
        order: 3,
        points: 15,
        acceptance: 'Tasks can be reordered via drag and drop'
      }
    ];

    // Update projects with tasks
    this.data.projects[0].tasks = this.data.tasks.filter(t => t.projectId === 'project-1');

    // Seed badges
    this.data.badges = [
      {
        id: 'badge-1',
        code: 'FIRST_SUBMISSION',
        name: 'First Steps',
        icon: '🌟',
        criteria: 'Submit your first task',
        xp: 50
      },
      {
        id: 'badge-2',
        code: 'TASK_MASTER',
        name: 'Task Master',
        icon: '🎯',
        criteria: 'Complete 10 tasks',
        xp: 200
      },
      {
        id: 'badge-3',
        code: 'CODE_REVIEWER',
        name: 'Code Reviewer',
        icon: '👨‍💻',
        criteria: 'Receive positive code review',
        xp: 100
      }
    ];

    // Seed leaderboard
    this.data.leaderboard = [
      {
        studentId: 'student-1',
        name: 'Alex Chen',
        xp: 1250,
        rank: 1,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex'
      },
      {
        studentId: 'student-2',
        name: 'Sarah Johnson',
        xp: 1100,
        rank: 2,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
      },
      {
        studentId: 'student-3',
        name: 'Michael Brown',
        xp: 950,
        rank: 3,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael'
      }
    ];

    // Seed some messages
    this.data.messages = [
      {
        id: 'msg-1',
        channel: 'SYSTEM',
        from: 'SYSTEM',
        body: 'Welcome to SkillSync! Complete your onboarding to get started.',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        id: 'msg-2',
        channel: 'MENTOR_CHAT',
        from: 'AI_MENTOR',
        body: 'Great job on completing your first task! Keep up the momentum.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      }
    ];
  }

  // Public methods for data access
  getProjects() { return [...this.data.projects]; }
  getProject(id: string) { return this.data.projects.find(p => p.id === id); }
  
  getTasks(projectId?: string) { 
    return projectId 
      ? this.data.tasks.filter(t => t.projectId === projectId)
      : [...this.data.tasks]; 
  }
  
  getTask(id: string) { return this.data.tasks.find(t => t.id === id); }
  
  updateTask(id: string, updates: Partial<Task>) {
    const index = this.data.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.data.tasks[index] = { ...this.data.tasks[index], ...updates };
      return this.data.tasks[index];
    }
    return null;
  }

  getMessages() { return [...this.data.messages]; }
  
  addMessage(message: Omit<Message, 'id' | 'createdAt'>) {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      createdAt: new Date()
    };
    this.data.messages.push(newMessage);
    return newMessage;
  }

  getBadges() { return [...this.data.badges]; }
  getLeaderboard() { return [...this.data.leaderboard]; }

  getProfile(userId: string) { 
    return this.data.profiles.get(userId); 
  }
  
  updateProfile(userId: string, profile: StudentProfile) {
    this.data.profiles.set(userId, profile);
    return profile;
  }

  getUserEnrollments(userId: string) {
    return this.data.enrollments.get(userId) || [];
  }

  enrollUser(userId: string, projectId: string) {
    const enrollments = this.data.enrollments.get(userId) || [];
    if (!enrollments.includes(projectId)) {
      enrollments.push(projectId);
      this.data.enrollments.set(userId, enrollments);
    }
    return enrollments;
  }

  createSubmission(submission: Omit<Submission, 'id' | 'createdAt' | 'reviews'>) {
    const newSubmission: Submission = {
      ...submission,
      id: `submission-${Date.now()}`,
      createdAt: new Date(),
      reviews: []
    };
    this.data.submissions.push(newSubmission);
    return newSubmission;
  }

  getSubmission(id: string) {
    return this.data.submissions.find(s => s.id === id);
  }
}

const mockStore = new MockDataStore();

// Mock API functions
export const mockApi = {
  // Auth endpoints
  auth: {
    status: async () => {
      const user = authService.getCurrentUser();
      return { user, authenticated: !!user };
    },

    login: async (email: string, password: string) => {
      return authService.signIn(email, password);
    },

    signup: async (email: string, password: string, name?: string) => {
      return authService.signUp(email, password, name);
    },

    logout: async () => {
      return authService.signOut();
    }
  },

  // Project endpoints
  projects: {
    list: async () => {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      return mockStore.getProjects();
    },

    get: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockStore.getProject(id);
    },

    enroll: async (projectId: string) => {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockStore.enrollUser(user.id, projectId);
    }
  },

  // Task endpoints
  tasks: {
    list: async (projectId?: string) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockStore.getTasks(projectId);
    },

    update: async (id: string, updates: Partial<Task>) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockStore.updateTask(id, updates);
    }
  },

  // Message endpoints
  messages: {
    list: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockStore.getMessages();
    },

    send: async (body: string, channel: 'MENTOR_CHAT' | 'SYSTEM' = 'MENTOR_CHAT') => {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      await new Promise(resolve => setTimeout(resolve, 300));
      
      const message = mockStore.addMessage({
        channel,
        from: 'STUDENT',
        body
      });

      // Auto-reply from AI mentor for mentor chat
      if (channel === 'MENTOR_CHAT') {
        setTimeout(() => {
          mockStore.addMessage({
            channel: 'MENTOR_CHAT',
            from: 'AI_MENTOR',
            body: generateAiResponse(body)
          });
        }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
      }

      return message;
    }
  },

  // AI Mentor endpoints
  mentor: {
    chat: async (message: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      return {
        message: generateAiResponse(message),
        tips: generateTips(message),
        nextSteps: generateNextSteps(message)
      };
    }
  },

  // Profile endpoints
  profile: {
    get: async () => {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockStore.getProfile(user.id);
    },

    update: async (updates: Partial<StudentProfile>) => {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      await new Promise(resolve => setTimeout(resolve, 400));
      
      const existingProfile = mockStore.getProfile(user.id);
      const updatedProfile: StudentProfile = {
        id: existingProfile?.id || `profile-${user.id}`,
        userId: user.id,
        timezone: 'UTC',
        experience: 'Beginner',
        weeklyHours: 10,
        createdAt: existingProfile?.createdAt || new Date(),
        updatedAt: new Date(),
        ...existingProfile,
        ...updates
      };

      return mockStore.updateProfile(user.id, updatedProfile);
    }
  },

  // Submission endpoints
  submissions: {
    create: async (submission: { taskId?: string; projectId?: string; type: 'TASK' | 'PROJECT'; notes?: string; repoUrl?: string }) => {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      await new Promise(resolve => setTimeout(resolve, 600));
      
      return mockStore.createSubmission({
        ...submission,
        studentId: user.id,
        status: 'PENDING_REVIEW'
      });
    },

    get: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockStore.getSubmission(id);
    }
  },

  // Badge and leaderboard endpoints
  badges: {
    list: async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
      return mockStore.getBadges();
    }
  },

  leaderboard: {
    get: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockStore.getLeaderboard();
    }
  },

  // Contact endpoint
  contact: {
    send: async (data: { name: string; email: string; message: string }) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Message sent successfully!' };
    }
  }
};

// Helper functions for AI responses
function generateAiResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('error') || message.includes('bug') || message.includes('issue')) {
    return "I can help you debug that! Can you share the specific error message and your code? Common issues include missing imports, syntax errors, or incorrect prop types.";
  }
  
  if (message.includes('react') || message.includes('component')) {
    return "Great question about React! Remember to use functional components with hooks, keep components small and focused, and don't forget to add proper TypeScript types for your props.";
  }
  
  if (message.includes('css') || message.includes('style') || message.includes('tailwind')) {
    return "For styling, I recommend using Tailwind's utility classes for consistency. Use semantic color tokens from your design system rather than hardcoded colors. Need help with a specific layout?";
  }
  
  if (message.includes('api') || message.includes('fetch') || message.includes('data')) {
    return "For API calls, use React Query for caching and error handling. Always handle loading and error states in your UI. Consider using TypeScript interfaces for your API responses.";
  }
  
  if (message.includes('help') || message.includes('stuck')) {
    return "I'm here to help! Break down the problem into smaller steps. Check the console for errors, review the acceptance criteria, and don't hesitate to ask specific questions.";
  }
  
  return "That's a great question! I'm here to help you learn and grow. Can you provide more context about what you're working on? The more specific you are, the better I can assist you.";
}

function generateTips(userMessage: string): string[] {
  const message = userMessage.toLowerCase();
  
  if (message.includes('react')) {
    return [
      "Use TypeScript for better type safety",
      "Keep components small and focused",
      "Use React.memo() for performance optimization"
    ];
  }
  
  if (message.includes('css') || message.includes('style')) {
    return [
      "Use Tailwind's design tokens for consistency",
      "Mobile-first responsive design",
      "Test your UI in both light and dark modes"
    ];
  }
  
  return [
    "Break complex problems into smaller steps",
    "Read error messages carefully for clues", 
    "Use console.log() to debug data flow"
  ];
}

function generateNextSteps(userMessage: string): string[] {
  return [
    "Test your implementation thoroughly",
    "Check your code meets the acceptance criteria",
    "Consider edge cases and error handling",
    "Submit when you're confident it works"
  ];
}