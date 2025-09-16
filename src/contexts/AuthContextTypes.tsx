import React, { createContext, useContext } from 'react';

// Define user types and membership levels
export type MembershipType = "Free" | "Lite" | "Pro Learner" | "Educator";

export type VerificationStatus = "unverified" | "pending" | "verified";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  role?: string;
  location?: string;
  website?: string;
  membership: MembershipType;
  completedProfile: boolean;
  verificationStatus: VerificationStatus;
}

interface AuthError {
  message: string;
  code?: string;
}

interface StrapiUser {
  id: number;
  email: string;
  username: string;
  confirmed: boolean;
  blocked: boolean;
  role?: {
    name: string;
  };
}

interface AuthResponse {
  user: StrapiUser;
  jwt: string;
}

interface StrapiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ shouldRedirect: boolean; redirectTo: string }>;
  signUp: (email: string, password: string, name: string, role: "student" | "creator") => Promise<{ shouldRedirect: boolean; redirectTo: string }>;
  signOut: () => void;
  upgradeSubscription: (plan: MembershipType) => void;
  submitVerification: (idImageUrl: string) => Promise<void>;
  updateUserAvatar: (avatarUrl: string) => void;
  updateUserCover: (coverUrl: string) => void;
  updateUserProfile: (profileData: Partial<User>) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

export const isAuthError = (error: unknown): error is AuthError => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
