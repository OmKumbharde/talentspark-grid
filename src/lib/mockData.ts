import { Skill, Project, Badge, LeaderboardEntry, Task } from "./types";

export const SKILLS: Skill[] = [
  { id: "1", name: "React", area: "Frontend", icon: "⚛️" },
  { id: "2", name: "TypeScript", area: "Frontend", icon: "🔷" },
  { id: "3", name: "Next.js", area: "Full-Stack", icon: "▲" },
  { id: "4", name: "Node.js", area: "Backend", icon: "🟢" },
  { id: "5", name: "Express", area: "Backend", icon: "🚂" },
  { id: "6", name: "PostgreSQL", area: "Backend", icon: "🐘" },
  { id: "7", name: "MongoDB", area: "Backend", icon: "🍃" },
  { id: "8", name: "Python", area: "Backend", icon: "🐍" },
  { id: "9", name: "Docker", area: "DevOps", icon: "🐳" },
  { id: "10", name: "AWS", area: "DevOps", icon: "☁️" },
  { id: "11", name: "React Native", area: "Mobile", icon: "📱" },
  { id: "12", name: "TensorFlow", area: "Data", icon: "🤖" }
];

export const BADGES: Badge[] = [
  {
    id: "1",
    code: "FIRST_PR",
    name: "First Pull Request",
    icon: "🚀",
    criteria: "Submit your first project",
    xp: 50
  },
  {
    id: "2",
    code: "BUG_SMASHER",
    name: "Bug Smasher",
    icon: "🐛",
    criteria: "Fix 5 bugs in projects",
    xp: 100
  },
  {
    id: "3",
    code: "UI_POLISHER",
    name: "UI Polisher",
    icon: "✨",
    criteria: "Complete UI/UX focused tasks",
    xp: 75
  },
  {
    id: "4",
    code: "DATA_WRANGLER",
    name: "Data Wrangler",
    icon: "📊",
    criteria: "Complete data analysis project",
    xp: 125
  },
  {
    id: "5",
    code: "DEVOPS_ROOKIE",
    name: "DevOps Rookie",
    icon: "⚙️",
    criteria: "Deploy your first application",
    xp: 100
  },
  {
    id: "6",
    code: "SPRINT_FINISHER",
    name: "Sprint Finisher",
    icon: "🏁",
    criteria: "Complete all tasks in a sprint",
    xp: 150
  }
];

export const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    projectId: "1",
    title: "Setup Project Structure",
    description: "Initialize the React project with proper folder structure and configuration",
    status: "DONE",
    order: 1,
    acceptance: "- Create src/components folder\n- Setup Tailwind CSS\n- Configure TypeScript",
    points: 10
  },
  {
    id: "2",
    projectId: "1",
    title: "Build Authentication Flow",
    description: "Implement user login and registration with form validation",
    status: "IN_PROGRESS",
    order: 2,
    acceptance: "- Login form with validation\n- Registration form\n- Error handling",
    points: 25
  },
  {
    id: "3",
    projectId: "1",
    title: "Create Dashboard Layout",
    description: "Design and implement the main dashboard with navigation",
    status: "BACKLOG",
    order: 3,
    acceptance: "- Responsive sidebar\n- Header with user menu\n- Main content area",
    points: 20
  },
  {
    id: "4",
    projectId: "1",
    title: "Add Data Visualization",
    description: "Implement charts and graphs for data display",
    status: "BACKLOG",
    order: 4,
    acceptance: "- Chart.js integration\n- 3 different chart types\n- Real-time updates",
    points: 30
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description: "Build a modern dashboard for managing an online store with real-time analytics, inventory management, and customer insights.",
    difficulty: "Intermediate",
    tags: ["React", "TypeScript", "Charts", "API"],
    estimatedWeeks: 3,
    status: "Active",
    tasks: SAMPLE_TASKS
  },
  {
    id: "2",
    title: "Social Media App",
    description: "Create a full-stack social media application with posts, comments, real-time chat, and user profiles.",
    difficulty: "Advanced",
    tags: ["Next.js", "Socket.io", "Database", "Authentication"],
    estimatedWeeks: 4,
    status: "Active",
    tasks: []
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "Design and develop a professional portfolio website with animations, contact forms, and project showcases.",
    difficulty: "Starter",
    tags: ["React", "CSS", "Responsive", "Forms"],
    estimatedWeeks: 2,
    status: "Active",
    tasks: []
  },
  {
    id: "4",
    title: "Task Management API",
    description: "Build a RESTful API for task management with authentication, CRUD operations, and database integration.",
    difficulty: "Intermediate",
    tags: ["Node.js", "Express", "Database", "API"],
    estimatedWeeks: 3,
    status: "Active",
    tasks: []
  },
  {
    id: "5",
    title: "AI Chat Bot",
    description: "Develop an intelligent chatbot using machine learning for customer service automation.",
    difficulty: "Advanced",
    tags: ["Python", "AI/ML", "NLP", "API"],
    estimatedWeeks: 5,
    status: "Active",
    tasks: []
  },
  {
    id: "6",
    title: "Mobile Weather App",
    description: "Create a cross-platform mobile app that displays weather information with beautiful UI and location services.",
    difficulty: "Starter",
    tags: ["React Native", "API", "Mobile", "UI/UX"],
    estimatedWeeks: 2,
    status: "Active",
    tasks: []
  }
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { studentId: "1", name: "Alex Chen", xp: 2450, rank: 1, avatar: "AC" },
  { studentId: "2", name: "Sarah Johnson", xp: 2380, rank: 2, avatar: "SJ" },
  { studentId: "3", name: "Marcus Rodriguez", xp: 2150, rank: 3, avatar: "MR" },
  { studentId: "4", name: "Emily Zhang", xp: 1950, rank: 4, avatar: "EZ" },
  { studentId: "5", name: "David Kumar", xp: 1875, rank: 5, avatar: "DK" },
  { studentId: "6", name: "Lisa Thompson", xp: 1720, rank: 6, avatar: "LT" },
  { studentId: "7", name: "James Wilson", xp: 1650, rank: 7, avatar: "JW" },
  { studentId: "8", name: "Maria Garcia", xp: 1580, rank: 8, avatar: "MG" },
  { studentId: "9", name: "Ryan Park", xp: 1490, rank: 9, avatar: "RP" },
  { studentId: "10", name: "Sophie Lee", xp: 1420, rank: 10, avatar: "SL" }
];

// AI Mock Responses
export const AI_MENTOR_RESPONSES = [
  {
    trigger: ["help", "stuck", "error"],
    response: {
      message: "I see you're facing a challenge! Here are some tips to help you move forward:",
      tips: [
        "Break down the problem into smaller, manageable steps",
        "Check the documentation for the technology you're using",
        "Look for similar examples in the codebase or online resources"
      ],
      codeSnippet: `// Example debugging approach
console.log('Current state:', variable);
// Add breakpoints to trace execution flow`,
      nextSteps: [
        "Identify the specific error message",
        "Research the error in documentation",
        "Try implementing a minimal test case"
      ]
    }
  },
  {
    trigger: ["review", "feedback", "check"],
    response: {
      message: "Great work on your progress! Here's my feedback on your current implementation:",
      tips: [
        "Your code structure looks clean and well-organized",
        "Consider adding error handling for edge cases",
        "The UI components are responsive and user-friendly"
      ],
      codeSnippet: `// Suggested improvement
try {
  // Your existing code
  const result = await apiCall();
} catch (error) {
  console.error('Error:', error);
  // Handle error gracefully
}`,
      nextSteps: [
        "Add unit tests for your components",
        "Implement error boundaries",
        "Optimize performance with React.memo"
      ]
    }
  }
];

export const SAMPLE_REVIEW_ITEMS = [
  {
    file: "src/components/Dashboard.tsx",
    line: 45,
    type: "suggestion" as const,
    message: "Consider using useMemo to optimize this expensive calculation",
    fixSuggestion: "const expensiveValue = useMemo(() => calculateValue(data), [data]);"
  },
  {
    file: "src/utils/api.ts",
    line: 12,
    type: "issue" as const,
    message: "Missing error handling for network failures",
    fixSuggestion: "Add try-catch block and proper error messaging"
  },
  {
    file: "src/components/UserCard.tsx",
    line: 8,
    type: "praise" as const,
    message: "Excellent use of TypeScript interfaces for type safety!",
    fixSuggestion: undefined
  }
];