
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";

// Define user types and membership levels
export type MembershipType = "Free" | "Lite" | "Pro Learner" | "Educator";

export type VerificationStatus = "unverified" | "pending" | "verified";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  membership: MembershipType;
  completedProfile: boolean;
  verificationStatus: VerificationStatus;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  upgradeSubscription: (plan: MembershipType) => void;
  submitVerification: (idImageUrl: string) => Promise<void>;
  updateUserAvatar: (avatarUrl: string) => void;
  updateUserCover: (coverUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123',
    name: 'Demo User',
    membership: 'Free' as MembershipType,
    completedProfile: false,
    verificationStatus: 'unverified' as VerificationStatus
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('skillNexusUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        membership: foundUser.membership,
        completedProfile: foundUser.completedProfile,
        verificationStatus: foundUser.verificationStatus
      };
      
      setUser(userData);
      localStorage.setItem('skillNexusUser', JSON.stringify(userData));
      
      toast.success('Successfully signed in!');
      
      // Redirect based on profile completion
      if (!foundUser.completedProfile) {
        navigate('/profile');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const exists = mockUsers.some((u) => u.email === email);
      
      if (exists) {
        throw new Error('User already exists');
      }
      
      const newUser: User = {
        id: String(mockUsers.length + 1),
        email,
        name,
        membership: 'Free',
        completedProfile: false,
        verificationStatus: 'unverified'
      };
      
      // In a real app, we would add this user to the database
      mockUsers.push({ ...newUser, password, completedProfile: false });
      
      setUser(newUser);
      localStorage.setItem('skillNexusUser', JSON.stringify(newUser));
      
      toast.success('Account created successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('skillNexusUser');
    toast.info('You have been signed out');
    navigate('/');
  };

  // Upgrade subscription function
  const upgradeSubscription = (plan: MembershipType) => {
    if (!user) return;
    
    const updatedUser = { ...user, membership: plan };
    setUser(updatedUser);
    localStorage.setItem('skillNexusUser', JSON.stringify(updatedUser));
    
    toast.success(`Subscription upgraded to ${plan} successfully!`);
  };

  // Update user avatar
  const updateUserAvatar = (avatarUrl: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, avatar: avatarUrl };
    setUser(updatedUser);
    localStorage.setItem('skillNexusUser', JSON.stringify(updatedUser));
  };
  
  // Update user cover image
  const updateUserCover = (coverUrl: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, coverImage: coverUrl };
    setUser(updatedUser);
    localStorage.setItem('skillNexusUser', JSON.stringify(updatedUser));
  };

  // Submit verification function
  const submitVerification = async (idImageUrl: string) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      // In a real app, this would be an API call to submit the verification request
      
      // Update the user's verification status to pending
      const updatedUser = { ...user, verificationStatus: 'pending' as VerificationStatus };
      setUser(updatedUser);
      localStorage.setItem('skillNexusUser', JSON.stringify(updatedUser));
      
      // Update mock user data
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex].verificationStatus = 'pending';
      }
      
      toast.success('Verification request submitted successfully! We will review your submission.');
    } catch (error) {
      toast.error('Failed to submit verification request');
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
      updateUserCover
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
