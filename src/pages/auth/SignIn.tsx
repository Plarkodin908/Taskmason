import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import DemoLoginNotice from "@/components/auth/DemoLoginNotice";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      
      // Show demo notice if using demo account
      if (email === "demo@taskmaso-n.web.app" && password === "password123") {
        // Set localStorage flag to show demo notice after some time
        localStorage.setItem("showDemoNotice", "true");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Failed to sign in. Please check your credentials.");
    }
  };
  
  useEffect(() => {
    // Check if should show demo notice (in real app would be time-based)
    const shouldShowDemoNotice = localStorage.getItem("showDemoNotice") === "true";
    if (shouldShowDemoNotice) {
      const timer = setTimeout(() => {
        setShowDemoNotice(true);
      }, 30000); // Show after 30 seconds for demo purposes
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  
  const handleDemoLogin = () => {
    setEmail("demo@taskmaso-n.web.app");
    setPassword("password123");
    toast.info("Demo credentials filled. Click Sign In to continue.");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
  {/* Left side - Illustration */}
  <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-900 to-indigo-950 p-8 items-center justify-center">
    <div className="max-w-md">
      <img 
        src="/lovable-uploads/new-logo.png" 
        alt="Taskmason Logo" 
        className="h-24 w-auto mb-8"
      />
      <img 
        src="/lovable-uploads/new-logo.png" 
        alt="Taskmason Logo" 
        className="h-16 w-auto"
      />
    </div>
  </div>
  {/* Other content would go here */}
</div>
  ); // Add this closing parenthesis
};
