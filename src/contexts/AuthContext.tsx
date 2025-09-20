import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import strapiApi from '@/services/strapiApi';

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

const isAuthError = (error: unknown): error is AuthError => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on component mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('taskmasonUser');
      const savedToken = localStorage.getItem('taskmasonToken');
      
      if (savedUser && savedToken) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
        }
      }
    } catch (error) {
      console.error('Error initializing AuthProvider:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Call Strapi API to authenticate user
      const response = await strapiApi.login(email, password) as unknown as AuthResponse;
      
      // Transform Strapi user data to our User interface
      const userData: User = {
        id: response.user?.id?.toString() || '',
        email: response.user?.email || '',
        name: response.user?.username || '',
        membership: 'Free',
        completedProfile: response.user?.confirmed || false,
        verificationStatus: response.user?.blocked ? 'unverified' : 'verified',
        role: response.user?.role?.name || 'student'
      };
      
      setUser(userData);
      localStorage.setItem('taskmasonUser', JSON.stringify(userData));
      localStorage.setItem('taskmasonToken', response.jwt || '');
      
      toast.success('Successfully signed in!');
      
      return {
        shouldRedirect: true,
        redirectTo: '/pricing' // Always redirect to pricing page after sign in
      };
    } catch (error: unknown) {
      const errorMessage = isAuthError(error) ? error.message : 'Failed to sign in. Please check your credentials.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string, role: "student" | "creator") => {
    setIsLoading(true);
    try {
      // Call Strapi API to register user
      const response = await strapiApi.register(name, email, password) as unknown as AuthResponse;
      
      // Transform Strapi user data to our User interface
      const userData: User = {
        id: response.user?.id?.toString() || '',
        email: response.user?.email || '',
        name: response.user?.username || '',
        membership: 'Free',
        completedProfile: response.user?.confirmed || false,
        verificationStatus: response.user?.blocked ? 'unverified' : 'verified',
        role: role
      };
      
      setUser(userData);
      localStorage.setItem('taskmasonUser', JSON.stringify(userData));
      localStorage.setItem('taskmasonToken', response.jwt || '');
      
      toast.success('Account created successfully!');
      return { shouldRedirect: true, redirectTo: '/pricing' }; // Redirect to pricing page after sign up
    } catch (error: unknown) {
      const errorMessage = isAuthError(error) ? error.message : 'Failed to create account';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('taskmasonUser');
    localStorage.removeItem('taskmasonToken');
    toast.info('You have been signed out');
  };

  // Upgrade subscription function
  const upgradeSubscription = (plan: MembershipType) => {
    if (!user) return;
    
    const updatedUser = { ...user, membership: plan };
    setUser(updatedUser);
    localStorage.setItem('taskmasonUser', JSON.stringify(updatedUser));
    
    toast.success(`Subscription upgraded to ${plan} successfully!`);
  };

  // Update user avatar
  const updateUserAvatar = (avatarUrl: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, avatar: avatarUrl };
    setUser(updatedUser);
    localStorage.setItem('taskmasonUser', JSON.stringify(updatedUser));
  };
  
  // Update user cover image
  const updateUserCover = (coverUrl: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, coverImage: coverUrl };
    setUser(updatedUser);
    localStorage.setItem('taskmasonUser', JSON.stringify(updatedUser));
  };

  // Update user profile
  const updateUserProfile = async (profileData: Partial<User>) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      // Call Strapi API to update user
      await strapiApi.updateUser(user.id, profileData);
      
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('taskmasonUser', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
    } catch (error: unknown) {
      const errorMessage = isAuthError(error) ? error.message : 'Failed to update profile';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit verification function
  const submitVerification = async (idImageUrl: string) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      // In a real app, this would call your backend to submit verification
      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
      
      const updatedUser = { ...user, verificationStatus: 'pending' as VerificationStatus };
      setUser(updatedUser);
      localStorage.setItem('taskmasonUser', JSON.stringify(updatedUser));
      
      toast.success('Verification request submitted successfully! We will review your submission.');
    } catch (error: unknown) {
      const errorMessage = isAuthError(error) ? error.message : 'Failed to submit verification request';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Password reset functions
  const sendPasswordResetEmail = async (email: string) => {
    try {
      // In a real app, this would call your backend to send reset email
      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
      
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error: unknown) {
      const errorMessage = isAuthError(error) ? error.message : 'Failed to send password reset email';
      toast.error(errorMessage);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      // In a real app, this would call your backend to reset password
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (newPassword.length >= 6) {
            resolve(true);
          } else {
            reject(new Error('Password must be at least 6 characters'));
          }
        }, 500);
      });
      
      toast.success('Password reset successfully! You can now sign in with your new password.');
    } catch (error: unknown) {
      const errorMessage = isAuthError(error) ? error.message : 'Failed to reset password';
      toast.error(errorMessage);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      signIn, 
      signUp, 
      signOut, 
      upgradeSubscription,
      submitVerification,
      updateUserAvatar,
      updateUserCover,
      updateUserProfile,
      sendPasswordResetEmail,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};