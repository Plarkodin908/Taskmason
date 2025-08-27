import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Helmet } from "react-helmet";
import Loading from "@/components/ui/loading";
import "./App.css";

const queryClient = new QueryClient();

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Company = lazy(() => import("./pages/Company"));
const Legal = lazy(() => import("./pages/Legal"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileDetail = lazy(() => import("./pages/ProfileDetail"));
const Settings = lazy(() => import("./pages/Settings"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const AddCourse = lazy(() => import("./pages/AddCourse"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const Community = lazy(() => import("./pages/Community"));
const Messages = lazy(() => import("./pages/Messages"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Skills = lazy(() => import("./pages/Skills"));
const Matches = lazy(() => import("./pages/Matches"));
const Activity = lazy(() => import("./pages/Activity"));
const Achievements = lazy(() => import("./pages/Achievements"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const PlanDetails = lazy(() => import("./pages/PlanDetails"));
const ImportContent = lazy(() => import("./pages/ImportContent"));
const MatchActionPage = lazy(() => import("./pages/matches/MatchActionPage"));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <Helmet>
                  <html className="" />
                  <body className="bg-background text-foreground" />
                  <meta name="theme-color" content="#0f172a" />
                </Helmet>
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/auth/sign-in" element={<SignIn />} />
                    <Route path="/auth/sign-up" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:userId" element={<ProfileDetail />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/add-course" element={<AddCourse />} />
                    <Route path="/tutorials" element={<Tutorials />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/plan/:planId" element={<PlanDetails />} />
                    <Route path="/import" element={<ImportContent />} />
                    <Route path="/matches/:action" element={<MatchActionPage />} />
                  </Routes>
                </Suspense>
                <Toaster />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
