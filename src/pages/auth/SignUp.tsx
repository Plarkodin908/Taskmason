import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, GraduationCap, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { validateRedirectUrl } from "@/utils/url-validator";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"student" | "creator">("student");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signUp(email, password, name, role);
      
      if (result.shouldRedirect) {
        const safeRedirectUrl = validateRedirectUrl(result.redirectTo);
        navigate(safeRedirectUrl);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

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
          <h1 className="text-4xl font-bold mb-4">Join TaskMason</h1>
          <p className="text-lg text-slate-300">Start your learning journey or share your knowledge with the world</p>
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
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-muted-foreground">Join our community of learners and creators</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create your account to get started</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
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
                      placeholder="Create a password"
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
                
                <div className="space-y-2">
                  <Label>How will you use TaskMason?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("student")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        role === "student"
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <GraduationCap className="h-6 w-6 mx-auto mb-2" />
                      <span className="block font-medium">Learn</span>
                      <span className="block text-xs text-muted-foreground mt-1">
                        Access courses and resources
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("creator")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        role === "creator"
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <BookOpen className="h-6 w-6 mx-auto mb-2" />
                      <span className="block font-medium">Teach</span>
                      <span className="block text-xs text-muted-foreground mt-1">
                        Create and sell content
                      </span>
                    </button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link to="/auth/sign-in" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;