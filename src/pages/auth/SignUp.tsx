
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/components/ui/loading";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const {
    signUp,
    isLoading
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic form validation
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      setIsCreating(true);
      // Show earth loader for a bit longer to demonstrate the animation
      await new Promise(resolve => setTimeout(resolve, 2000));
      await signUp(email, password, name);
      toast.success("Account created successfully!");
    } catch (error: any) {
      setError(error.message || "Failed to create account");
    } finally {
      setIsCreating(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Show earth loader during account creation
  if (isCreating || isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Loading variant="earth" text="Creating your account..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
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
              <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
              <CardDescription className="text-white/70">
                Join Skill Nexus to connect with experts and showcase your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      required 
                      className="bg-slate-950 border-mint/20 text-white pl-10" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required 
                      className="bg-slate-950 border-mint/20 text-white pl-10" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
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
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                      id="confirm-password" 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={confirmPassword} 
                      onChange={e => setConfirmPassword(e.target.value)} 
                      required 
                      className="bg-slate-950 border-mint/20 text-white pl-10 pr-10" 
                    />
                    <button 
                      type="button"
                      onClick={toggleShowConfirmPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full bg-mint hover:bg-mint/90 text-forest font-medium mt-2"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-mint/10 pt-4">
              <p className="text-white/70">
                Already have an account?{" "}
                <Link to="/auth/sign-in" className="text-mint hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <p className="mt-8 text-center text-white/50 text-sm">
            By creating an account, you agree to our{" "}
            <Link to="/legal" className="text-mint hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/legal" className="text-mint hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-950 to-slate-900 p-8 items-center justify-center">
        <div className="max-w-md">
          <img 
            src="/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png" 
            alt="SKILL NEXUS Logo" 
            className="h-24 w-auto mb-8"
          />
          <h1 className="text-4xl font-bold text-white mb-6">Join Skill Nexus Today</h1>
          <p className="text-lg text-white/80 mb-6">
            Take your skills to the next level by joining our community of experts and learners.
          </p>
          
          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="bg-mint/20 p-2 rounded-full">
                <User className="h-5 w-5 text-mint" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Create Your Profile</h3>
                <p className="text-white/70">Showcase your skills and expertise to the community</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-mint/20 p-2 rounded-full">
                <Mail className="h-5 w-5 text-mint" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Connect with Experts</h3>
                <p className="text-white/70">Learn from industry professionals in your field</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-mint/20 p-2 rounded-full">
                <Lock className="h-5 w-5 text-mint" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Secure Platform</h3>
                <p className="text-white/70">Your data is always protected with enterprise-grade security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
