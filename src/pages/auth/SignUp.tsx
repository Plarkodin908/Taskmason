import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, GraduationCap, BookOpen } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/components/ui/loading";

interface SignUpFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  error: string;
  isCreating: boolean;
  showRoleSelection: boolean;
  selectedRole: "student" | "creator" | null;
}

const useSignUpValidation = () => {
  const validateForm = (data: {
    name: string;
    password: string;
    confirmPassword: string;
    selectedRole: string | null;
  }): string | null => {
    if (data.name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    
    if (data.password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    
    if (data.password !== data.confirmPassword) {
      return "Passwords do not match";
    }
    
    if (!data.selectedRole) {
      return "Please select a role";
    }
    
    return null;
  };

  return { validateForm };
};

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();
  const { validateForm } = useSignUpValidation();
  
  const [formState, setFormState] = useState<SignUpFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    error: "",
    isCreating: false,
    showRoleSelection: false,
    selectedRole: null
  });

  const updateFormState = (updates: Partial<SignUpFormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateFormState({ error: "" });
    
    const validationError = validateForm({
      name: formState.name,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      selectedRole: formState.selectedRole
    });

    if (validationError) {
      updateFormState({ error: validationError });
      return;
    }
    
    try {
      updateFormState({ isCreating: true });
      
      if (formState.selectedRole) {
        await signUp(formState.email, formState.password, formState.name, formState.selectedRole);
        toast.success("Account created successfully!");
        navigate(formState.selectedRole === 'student' ? '/dashboard' : '/creator-dashboard');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(errorMessage);
      updateFormState({ error: errorMessage });
    } finally {
      updateFormState({ isCreating: false });
    }
  };

  const toggleShowPassword = () => updateFormState({ showPassword: !formState.showPassword });
  const toggleShowConfirmPassword = () => updateFormState({ showConfirmPassword: !formState.showConfirmPassword });

  if (formState.isCreating || isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Loading variant="earth" text="Creating your account..." />
      </div>
    );
  }

  if (formState.showRoleSelection) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-forest-light border-mint/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Choose Your Role</CardTitle>
              <CardDescription className="text-white/70">
                Select how you want to use Taskmason
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white">Welcome {formState.name}! Please select your role:</p>
              
              <div className="space-y-4">
                <button
                  onClick={() => updateFormState({ selectedRole: "student" })}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    formState.selectedRole === "student"
                      ? "border-mint bg-mint/10"
                      : "border-mint/20 hover:border-mint/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-8 w-8 text-mint" />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">I'm a Student</h3>
                      <p className="text-white/70 text-sm">
                        Learn new skills and take courses from expert creators
                      </p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => updateFormState({ selectedRole: "creator" })}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    formState.selectedRole === "creator"
                      ? "border-mint bg-mint/10"
                      : "border-mint/20 hover:border-mint/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-8 w-8 text-mint" />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">I'm a Creator</h3>
                      <p className="text-white/70 text-sm">
                        Create and sell courses to share your knowledge
                      </p>
                    </div>
                  </div>
                </button>
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!formState.selectedRole || isLoading}
                className="w-full bg-mint hover:bg-mint/90 text-forest font-medium"
              >
                {isLoading ? "Creating Account..." : "Continue"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-slate-900 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-mint mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <Card className="bg-forest-light border-mint/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
              <CardDescription className="text-white/70">
                Join Taskmason to connect with experts and showcase your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                updateFormState({ showRoleSelection: true });
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={formState.name} 
                      onChange={e => updateFormState({ name: e.target.value })}
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
                      value={formState.email} 
                      onChange={e => updateFormState({ email: e.target.value })}
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
                      type={formState.showPassword ? "text" : "password"}
                      placeholder="########" 
                      value={formState.password} 
                      onChange={e => updateFormState({ password: e.target.value })}
                      required 
                      className="bg-slate-950 border-mint/20 text-white pl-10 pr-10" 
                    />
                    <button 
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                    >
                      {formState.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                      id="confirm-password" 
                      type={formState.showConfirmPassword ? "text" : "password"}
                      placeholder="########" 
                      value={formState.confirmPassword} 
                      onChange={e => updateFormState({ confirmPassword: e.target.value })}
                      required 
                      className="bg-slate-950 border-mint/20 text-white pl-10 pr-10" 
                    />
                    <button 
                      type="button"
                      onClick={toggleShowConfirmPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                    >
                      {formState.showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                {formState.error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm">
                    {formState.error}
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
      
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-950 to-slate-900 p-8 items-center justify-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white mb-6">Join Taskmason Today</h1>
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
