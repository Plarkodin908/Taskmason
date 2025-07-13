
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
import Marketplace from './pages/Marketplace';
import Company from './pages/Company';
import Legal from './pages/Legal';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('Error caught by boundary:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error boundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-4">Error: {this.state.error?.message}</p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  console.log('App component rendering...');
  
  // Create QueryClient inside the component to ensure React context is available
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/company" element={<Company />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
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
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
