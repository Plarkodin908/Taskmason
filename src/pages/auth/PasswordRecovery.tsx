import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { sendPasswordResetEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await sendPasswordResetEmail(email);
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send recovery email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-mint mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <Card className="bg-forest-light border-mint/20 shadow-xl text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Check Your Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                We've sent a password reset link to <span className="text-mint font-medium">{email}</span>
              </p>
              <p className="text-white/50 text-sm">
                If you don't see the email, check your spam folder.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate('/auth/sign-in')} 
                className="w-full bg-mint hover:bg-mint/90 text-forest font-medium"
              >
                Back to Sign In
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
            <CardTitle className="text-2xl font-bold text-white">Recover Password</CardTitle>
            <CardDescription className="text-white/70">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
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
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <p className="text-white/50 text-sm">
                We'll send you an email with instructions to reset your password.
              </p>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-mint hover:bg-mint/90 text-forest font-medium"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
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

export default PasswordRecovery;