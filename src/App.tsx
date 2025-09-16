import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Legal from '@/pages/Legal';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import PasswordRecovery from '@/pages/auth/PasswordRecovery';
import PasswordReset from '@/pages/auth/PasswordReset';
import GitHubAuth from '@/pages/auth/GitHubAuth';
import Profile from '@/pages/Profile';
import ProfileEdit from '@/pages/ProfileEdit';
import CourseDetail from '@/pages/CourseDetail';
import EbookDetail from '@/pages/EbookDetail';
import PaymentPage from '@/pages/PaymentPage';
import CreatorDashboard from '@/pages/CreatorDashboard';
import CourseCreation from '@/pages/CourseCreation';
import EbookCreation from '@/pages/EbookCreation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/password-recovery" element={<PasswordRecovery />} />
          <Route path="/auth/password-reset" element={<PasswordReset />} />
          <Route path="/auth/github" element={<GitHubAuth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/ebook/:id" element={<EbookDetail />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/course-creation" element={<CourseCreation />} />
          <Route path="/ebook-creation" element={<EbookCreation />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;