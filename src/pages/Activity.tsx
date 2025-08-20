
import React from 'react';
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Activity as ActivityIcon, Clock, User, BookOpen } from "lucide-react";

const Activity = () => {
  return (
    <div className="min-h-screen bg-background">
      <RefinedPageLayout title="Activity Feed" backUrl="/dashboard">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Recent Activity</h2>
            <p className="text-muted-foreground">Track your learning progress and interactions</p>
          </div>

          <div className="text-center py-24">
            <ActivityIcon className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              No Activity Yet
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your activity feed will show your learning progress, course completions, 
              and interactions with other learners.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="p-6 bg-card border-border">
                <Clock className="h-12 w-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold text-card-foreground mb-2">Learning Time</h4>
                <p className="text-muted-foreground">Track your study sessions</p>
              </Card>
              
              <Card className="p-6 bg-card border-border">
                <User className="h-12 w-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold text-card-foreground mb-2">Connections</h4>
                <p className="text-muted-foreground">New learning partners</p>
              </Card>
              
              <Card className="p-6 bg-card border-border">
                <BookOpen className="h-12 w-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold text-card-foreground mb-2">Courses</h4>
                <p className="text-muted-foreground">Progress updates</p>
              </Card>
            </div>
          </div>
        </div>
      </RefinedPageLayout>
    </div>
  );
};

export default Activity;
