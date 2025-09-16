import React, { useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { AuthContext, AuthContextType, User, MembershipType, VerificationStatus, AuthError } from './auth-context';

const isAuthError = (error: unknown): error is AuthError => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on component mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('taskmasonUser');
      if (savedUser) {
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
      const response = await new Promise<{user: User, token: string}>(resolve => {
        setTimeout(() => {
          resolve({
            user: {
              id: '1',
              email,
              name: 'Demo User',
              membership: 'Free',
              completedProfile: true,
              verificationStatus: 'unverified',
              role: 'student'
            },
            token: 'demo-token'
          });
        }, 1000);
      });
      
      setUser(response.user);
      localStorage.setItem('taskmasonUser', JSON.stringify(response.user));
      localStorage.setItem('taskmasonToken', response.token);
      
      toast.success('Successfully signed in!');
      
      return {
        shouldRedirect: true,
        redirectTo: response.user.role === 'creator' ? '/creator-dashboard' : '/dashboard'
      };
    } catch (error: unknown) {
      const errorMessage = isAuthError(error) ? error.message : 'Failed to sign in';
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
      const response = await new Promise<{user: User, token: string}>(resolve => {
        setTimeout(() => {
          resolve({
            user: {
              id: '1',
              email,
              name,
              membership: 'Free',
              completedProfile: false,
              verificationStatus: 'unverified',
              role
            },
            token: 'demo-token'
          });
        }, 1000);
      });
      
      setUser(response.user);
      localStorage.setItem('taskmasonUser', JSON.stringify(response.user));
      localStorage.setItem('taskmasonToken', response.token);
      
      toast.success('Account created successfully!');
      return { shouldRedirect: true, redirectTo: '/profile' };
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
  const updateUserProfile = (profileData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('taskmasonUser', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully!');
  };

  // Submit verification function
  const submitVerification = async (idImageUrl: string) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
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
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
  export type { AuthContextType, User, MembershipType, VerificationStatus };

