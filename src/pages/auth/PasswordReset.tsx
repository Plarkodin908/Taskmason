import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Lock } from 'lucide-react';
import { toast } from 'sonner';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await resetPassword(token, password);
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-mint mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <Card className="bg-forest-light border-mint/20 shadow-xl text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Password Reset Successful</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                Your password has been successfully reset.
              </p>
              <p className="text-white/50 text-sm">
                You can now sign in with your new password.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate('/auth/sign-in')} 
                className="w-full bg-mint hover:bg-mint/90 text-forest font-medium"
              >
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-white/70 hover:text-mint mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <Card className="bg-forest-light border-mint/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Reset Password</CardTitle>
            <CardDescription className="text-white/70">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {!token && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm">
                  Invalid or missing reset token. Please request a new password reset link.
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your new password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    disabled={!token || isLoading}
                    className="bg-slate-950 border-mint/20 text-white pl-10" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your new password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                    disabled={!token || isLoading}
                    className="bg-slate-950 border-mint/20 text-white pl-10" 
                  />
                </div>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <p className="text-white/50 text-sm">
                Password must be at least 6 characters long.
              </p>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                disabled={!token || isLoading} 
                className="w-full bg-mint hover:bg-mint/90 text-forest font-medium"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-white/70">Remember your password? </span>
                <Link to="/auth/sign-in" className="text-mint hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PasswordReset;