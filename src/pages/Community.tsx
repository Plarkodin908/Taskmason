
import React from 'react';
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Heart, TrendingUp } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <RefinedPageLayout title="Community" backUrl="/dashboard">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-card-foreground">Active Members</h3>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">2,543</p>
              <p className="text-muted-foreground">Online now</p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-card-foreground">Discussions</h3>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">1,234</p>
              <p className="text-muted-foreground">Active topics</p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-card-foreground">Connections</h3>
              </div>
              <p className="text-3xl font-bold text-primary mb-2">5,678</p>
              <p className="text-muted-foreground">Made this month</p>
            </Card>
          </div>

          <div className="text-center py-24">
            <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Join the Conversation
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with learners and educators from around the world. Share knowledge, 
              ask questions, and build meaningful relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Discussion
              </Button>
              <Button variant="outline" size="lg">
                <TrendingUp className="h-5 w-5 mr-2" />
                Browse Topics
              </Button>
            </div>
          </div>
        </div>
      </RefinedPageLayout>
    </div>
  );
};

export default Community;
