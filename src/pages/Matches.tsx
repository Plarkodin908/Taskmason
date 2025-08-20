
import React from 'react';
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Search, Heart, MessageSquare } from "lucide-react";

const Matches = () => {
  return (
    <div className="min-h-screen bg-background">
      <RefinedPageLayout title="Learning Matches" backUrl="/dashboard">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Find Your Learning Partners</h2>
            <p className="text-muted-foreground">Connect with people who share your interests and goals</p>
          </div>

          <div className="text-center py-24">
            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              No Matches Yet
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Complete your profile and add your skills to start finding learning partners 
              who complement your interests and goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg">
                <Search className="h-5 w-5 mr-2" />
                Find Matches
              </Button>
              <Button variant="outline" size="lg">
                <Users className="h-5 w-5 mr-2" />
                Browse Profiles
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="p-6 bg-card border-border">
                <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold text-card-foreground mb-2">Smart Matching</h4>
                <p className="text-muted-foreground">AI-powered partner suggestions</p>
              </Card>
              
              <Card className="p-6 bg-card border-border">
                <MessageSquare className="h-12 w-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold text-card-foreground mb-2">Direct Chat</h4>
                <p className="text-muted-foreground">Connect instantly with matches</p>
              </Card>
              
              <Card className="p-6 bg-card border-border">
                <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                <h4 className="text-lg font-semibold text-card-foreground mb-2">Groups</h4>
                <p className="text-muted-foreground">Join learning communities</p>
              </Card>
            </div>
          </div>
        </div>
      </RefinedPageLayout>
    </div>
  );
};

export default Matches;
