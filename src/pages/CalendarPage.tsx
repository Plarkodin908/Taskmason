
import React from 'react';
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Users } from "lucide-react";

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <RefinedPageLayout title="Calendar" backUrl="/dashboard">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Learning Schedule</h2>
              <p className="text-muted-foreground">Manage your learning sessions and meetings</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="p-6 bg-card border-border h-96">
                <div className="text-center h-full flex items-center justify-center">
                  <div>
                    <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">
                      Calendar View
                    </h3>
                    <p className="text-muted-foreground">
                      Interactive calendar coming soon
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Upcoming Sessions
                </h3>
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No upcoming sessions</p>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Week:</span>
                    <span className="font-semibold text-foreground">0 sessions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Month:</span>
                    <span className="font-semibold text-foreground">0 sessions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Hours:</span>
                    <span className="font-semibold text-foreground">0 hours</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </RefinedPageLayout>
    </div>
  );
};

export default CalendarPage;
