
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Compass } from 'lucide-react';
import { toast } from 'sonner';

const TutorialFeed = () => {
  const handleCreateTutorial = () => {
    toast.info("Create Tutorial feature coming soon!");
  };

  const handleExploreContent = () => {
    toast.info("Explore Content feature coming soon!");
  };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <Compass className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Start Your Learning Journey
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Create engaging tutorials or explore content from our community
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleCreateTutorial}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <Plus className="w-6 h-6 mr-3" />
            Create Tutorial
          </Button>
          
          <Button 
            onClick={handleExploreContent}
            variant="outline"
            className="w-full border-2 border-slate-300 dark:border-slate-600 bg-white/95 dark:bg-slate-800/80 text-slate-900 dark:text-slate-200 font-semibold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <Compass className="w-6 h-6 mr-3" />
            Explore Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorialFeed;
