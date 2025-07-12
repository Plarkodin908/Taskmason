import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import AuthRoutes from './components/AuthRoutes';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import PlanDetails from './pages/PlanDetails';
import PaymentPage from './pages/PaymentPage';
import ImportContent from './pages/ImportContent';
import CalendarPage from './pages/CalendarPage';
import AchievementPage from './pages/AchievementPage';
import ActivityPage from './pages/ActivityPage';
import MatchesPage from './pages/MatchesPage';
import Skills from "@/pages/Skills";
import Wishlist from "@/pages/Wishlist";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <AuthRoutes path="/auth" />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile/:username?" element={<Profile />} />
            <Route path="/plan/:planId" element={<PlanDetails />} />
            <Route path="/payment/:planId" element={<PaymentPage />} />
            <Route path="/import" element={<ImportContent />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/achievements" element={<AchievementPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/matches/:action" element={<MatchesPage />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
