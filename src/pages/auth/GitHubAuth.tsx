import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// GitHub OAuth configuration from environment variables
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'your_github_client_id_here';
const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI || 'http://localhost:5173/auth/github';

// Mock GitHub OAuth implementation
// In a real app, this would use the GitHub OAuth API
const GitHubAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signUp } = useAuth();
  const code = searchParams.get('code');

  useEffect(() => {
    const handleGitHubAuth = async () => {
      // If no code, redirect to GitHub OAuth
      if (!code) {
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email`;
        window.location.href = githubAuthUrl;
        return;
      }

      try {
        // In a real implementation, you would exchange the code for an access token
        // and then get user data from GitHub API
        // For now, we'll simulate this process
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate successful authentication
        toast.success('Successfully authenticated with GitHub!');
        
        // Register the user (in a real app, you would check if they already exist)
        const result = await signUp(
          `githubuser${Date.now()}@example.com`, 
          'oauthpassword123', 
          'GitHub User', 
          'student'
        );
        
        if (result.shouldRedirect) {
          navigate(result.redirectTo);
        }
      } catch (error) {
        toast.error('GitHub authentication failed');
        navigate('/auth/sign-in');
      }
    };

    handleGitHubAuth();
  }, [code, navigate, signUp]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Authenticating with GitHub</h2>
        <p className="text-white/70">Please wait while we complete the authentication process...</p>
      </div>
    </div>
  );
};

export default GitHubAuth;