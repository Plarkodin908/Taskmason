
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, BookOpen, Users } from "lucide-react";
import { useState } from "react";

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative min-h-screen bg-forest overflow-hidden">
      {/* Animated pattern background - same as homepage */}
      <div className="animated-pattern-container"></div>
      <div className="animated-pattern-overlay"></div>
      
      <RefinedPageLayout title="Skills Exchange" backUrl="/dashboard" className="relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-forest-light border-mint/20 text-white"
              />
            </div>
          </div>

          {/* Empty state */}
          <div className="text-center py-24">
            <div className="mb-8">
              <BookOpen className="h-16 w-16 mx-auto text-white/40 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Skills Available Yet</h3>
              <p className="text-white/60 text-lg max-w-md mx-auto">
                Start building the skills marketplace by adding your first skill or course.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-mint hover:bg-mint/90 text-forest">
                <Plus className="h-4 w-4 mr-2" />
                Add Your Skill
              </Button>
              <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10">
                <Users className="h-4 w-4 mr-2" />
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </RefinedPageLayout>
    </div>
  );
};

export default Skills;
