
import React from 'react';
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload } from "lucide-react";

const AddCourse = () => {
  return (
    <div className="min-h-screen bg-background">
      <RefinedPageLayout title="Add New Course" backUrl="/dashboard">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card border-border">
            <form className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-card-foreground">Course Title</Label>
                <Input 
                  id="title"
                  placeholder="Enter course title"
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-card-foreground">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe your course"
                  rows={4}
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-card-foreground">Category</Label>
                <Input 
                  id="category"
                  placeholder="e.g., Programming, Design, Marketing"
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="duration" className="text-card-foreground">Duration (hours)</Label>
                <Input 
                  id="duration"
                  type="number"
                  placeholder="0"
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label className="text-card-foreground">Course Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">Drop your image here or click to browse</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Save Draft
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </RefinedPageLayout>
    </div>
  );
};

export default AddCourse;
