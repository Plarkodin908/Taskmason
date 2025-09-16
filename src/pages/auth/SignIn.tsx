import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { validateRedirectUrl } from "@/utils/url-validator";
import DemoLoginNotice from "@/components/auth/DemoLoginNotice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn(email, password);
      
      if (result.shouldRedirect) {
        const safeRedirectUrl = validateRedirectUrl(result.redirectTo);
        navigate(safeRedirectUrl);
      }
      
      // Show demo notice if using demo account
      if (email === "demo@taskmaso-n.web.app" && password === "password123") {
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
        <div className="max-w-md text-center text-white">
          <img 
            src="/lovable-uploads/taskmason-logo.png" 
            alt="Taskmason Logo" 
            className="h-24 w-auto mb-8 mx-auto"
          />
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-slate-300">Sign in to continue your learning journey</p>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Welcome back! Please sign in to continue.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleDemoLogin}
                >
                  Try Demo Account
                </Button>
                
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link to="/auth/sign-up" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
                
                <div className="text-center">
                  <Link to="/auth/password-recovery" className="text-sm text-muted-foreground hover:text-primary">
                    Forgot password?
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
          
          {showDemoNotice && (
            <DemoLoginNotice 
              onClose={() => {
                setShowDemoNotice(false);
                localStorage.removeItem("showDemoNotice");
              }} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;