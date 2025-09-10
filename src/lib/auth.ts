// Mock Authentication System for SkillSync
// This provides a dev-friendly auth fallback that stores session in localStorage

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isOnboarded: boolean;
}

const AUTH_STORAGE_KEY = 'skillsync_auth_user';
const SESSION_STORAGE_KEY = 'skillsync_session';

class AuthService {
  private user: AuthUser | null = null;
  private listeners: Array<(user: AuthUser | null) => void> = [];

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        this.user = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error);
    }
  }

  private saveUserToStorage(user: AuthUser | null) {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(SESSION_STORAGE_KEY, Date.now().toString());
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Failed to save user to storage:', error);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.user));
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // Mock login - in real app, this would call your backend
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, any email/password combo works
    const user: AuthUser = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      isOnboarded: false // Will be updated after onboarding
    };

    this.user = user;
    this.saveUserToStorage(user);
    this.notifyListeners();

    return { success: true };
  }

  async signUp(email: string, password: string, name?: string): Promise<{ success: boolean; error?: string }> {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user: AuthUser = {
      id: `user_${Date.now()}`,
      email,
      name: name || email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      isOnboarded: false
    };

    this.user = user;
    this.saveUserToStorage(user);
    this.notifyListeners();

    return { success: true };
  }

  async signOut(): Promise<void> {
    this.user = null;
    this.saveUserToStorage(null);
    this.notifyListeners();
  }

  getCurrentUser(): AuthUser | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  updateUser(updates: Partial<AuthUser>): void {
    if (this.user) {
      this.user = { ...this.user, ...updates };
      this.saveUserToStorage(this.user);
      this.notifyListeners();
    }
  }

  onAuthChange(callback: (user: AuthUser | null) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

export const authService = new AuthService();

// React hook for using auth in components
export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(authService.getCurrentUser());

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(setUser);
    return unsubscribe;
  }, []);

  return {
    user,
    isAuthenticated: authService.isAuthenticated(),
    signIn: authService.signIn.bind(authService),
    signUp: authService.signUp.bind(authService),
    signOut: authService.signOut.bind(authService),
    updateUser: authService.updateUser.bind(authService)
  };
};

// React imports for the hook
import { useState, useEffect } from 'react';