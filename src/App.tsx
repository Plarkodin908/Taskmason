
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import PlanDetails from './pages/PlanDetails';
import PaymentPage from './pages/PaymentPage';
import ImportContent from './pages/ImportContent';
import CalendarPage from './pages/CalendarPage';
import Achievements from './pages/Achievements';
import Activity from './pages/Activity';
import Matches from './pages/Matches';
import Skills from "@/pages/Skills";
import Wishlist from "@/pages/Wishlist";
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile/:username?" element={<Profile />} />
            <Route path="/plan/:planId" element={<PlanDetails />} />
            <Route path="/payment/:planId" element={<PaymentPage />} />
            <Route path="/import" element={<ImportContent />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/matches/:action" element={<Matches />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
