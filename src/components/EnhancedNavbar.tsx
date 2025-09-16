import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, MessageSquare, HelpCircle, Settings, Search, Bell, Menu, X, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const EnhancedNavbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('profile')) return 'profile';
    if (path.includes('messages')) return 'messages';
    if (path.includes('tutorials')) return 'help';
    if (path.includes('settings')) return 'settings';
    return '';
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav bg-dark-purple/80 backdrop-blur-lg border-b border-primary-purple/30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img 
            alt="Taskmason Logo" 
            className="h-12 w-auto animate-fade-in" 
            src="/lovable-uploads/taskmason-logo.png" 
          />
          <span className="text-2xl font-bold text-white">Taskmason</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4 transition-all duration-300">
          <div className="relative max-w-md w-64 mr-4">
            <Input 
              type="text" 
              placeholder="Search courses..." 
              className="pl-10 bg-dark-purple/40 border-primary-purple/30 text-white" 
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          </div>

          <Link 
            to="/dashboard" 
            onClick={() => setActiveTab('dashboard')} 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/profile" 
            onClick={() => setActiveTab('profile')} 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'profile' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>

          <Link 
            to="/messages" 
            onClick={() => setActiveTab('messages')} 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'messages' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </Link>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-4 py-2 rounded-lg flex items-center gap-2 text-white/50 cursor-not-allowed">
                  <Gamepad2 className="h-5 w-5" />
                  <span>Games</span>
                  <span className="ml-2 bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full">Coming Soon</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Games section is coming soon!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Link 
            to="/help" 
            onClick={() => setActiveTab('help')} 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'help' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </Link>

          <Link 
            to="/settings" 
            onClick={() => setActiveTab('settings')} 
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'settings' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>

          <Button variant="ghost" size="icon" className="text-white hover:bg-primary-purple/20">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-primary-purple/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-dark-purple/90 backdrop-blur-lg border-t border-primary-purple/30">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search courses..." 
                className="pl-10 bg-dark-purple/40 border-primary-purple/30 text-white" 
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
            
            <Link 
              to="/dashboard" 
              onClick={() => {
                setActiveTab('dashboard');
                setIsMenuOpen(false);
              }} 
              className={`block px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/profile" 
              onClick={() => {
                setActiveTab('profile');
                setIsMenuOpen(false);
              }} 
              className={`block px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'profile' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>

            <Link 
              to="/messages" 
              onClick={() => {
                setActiveTab('messages');
                setIsMenuOpen(false);
              }} 
              className={`block px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'messages' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>

            <div className="block px-4 py-2 rounded-lg flex items-center gap-2 text-white/50">
              <Gamepad2 className="h-5 w-5" />
              <span>Games</span>
              <span className="ml-2 bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full">Coming Soon</span>
            </div>

            <Link 
              to="/help" 
              onClick={() => {
                setActiveTab('help');
                setIsMenuOpen(false);
              }} 
              className={`block px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'help' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help</span>
            </Link>

            <Link 
              to="/settings" 
              onClick={() => {
                setActiveTab('settings');
                setIsMenuOpen(false);
              }} 
              className={`block px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'settings' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EnhancedNavbar;