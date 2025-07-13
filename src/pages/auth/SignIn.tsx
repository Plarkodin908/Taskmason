
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
      
      // Navigate to the appropriate page
      if (result.shouldRedirect) {
        navigate(result.redirectTo);
      }
      
      // Show demo notice if using demo account
      if (email === "demo@example.com" && password === "password123") {
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
    setEmail("demo@example.com");
    setPassword("password123");
    toast.info("Demo credentials filled. Click Sign In to continue.");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-900 to-indigo-950 p-8 items-center justify-center">
        <div className="max-w-md">
          <img 
            src="/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png" 
            alt="SKILL NEXUS Logo" 
            className="h-24 w-auto mb-8"
          />
          <h1 className="text-4xl font-bold text-white mb-6">Welcome Back to Skill Nexus</h1>
          <p className="text-lg text-white/80 mb-8">
            Connect with experts, showcase your skills, and accelerate your learning journey.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-mint text-3xl font-bold mb-1">25k+</div>
              <div className="text-white/70 text-sm">Active users</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-mint text-3xl font-bold mb-1">1.2k+</div>
              <div className="text-white/70 text-sm">Experts</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-mint text-3xl font-bold mb-1">95%</div>
              <div className="text-white/70 text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 bg-slate-900 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-6 flex md:hidden justify-center">
            <img 
              src="/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png" 
              alt="SKILL NEXUS Logo" 
              className="h-16 w-auto"
            />
          </div>
          
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-mint mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <Card className="bg-forest-light border-mint/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
              <CardDescription className="text-white/70">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-950 border-mint/20 text-white pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Link to="/auth/forgot-password" className="text-mint text-sm hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-950 border-mint/20 text-white pl-10 pr-10"
                    />
                    <button 
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-mint hover:bg-mint/90 text-forest font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-mint/10"></span>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-forest-light px-2 text-white/50">or</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border-mint/20 text-white hover:bg-mint/10"
                  onClick={handleDemoLogin}
                >
                  Continue with Demo Account
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-mint/10 pt-4">
              <p className="text-white/70">
                Don't have an account?{" "}
                <Link to="/auth/sign-up" className="text-mint hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <p className="mt-8 text-center text-white/50 text-sm">
            By signing in, you agree to our{" "}
            <Link to="/legal" className="text-mint hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/legal" className="text-mint hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
      
      {/* Demo Account Notice */}
      {showDemoNotice && <DemoLoginNotice onClose={() => setShowDemoNotice(false)} />}
    </div>
  );
};

export default SignIn;
