
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Star, Users, BookOpen } from "lucide-react";
import { useState } from "react";

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const skillCategories = [
    {
      category: "Programming",
      skills: [
        { name: "JavaScript", learners: 1234, rating: 4.8, difficulty: "Intermediate" },
        { name: "Python", learners: 2156, rating: 4.9, difficulty: "Beginner" },
        { name: "React", learners: 892, rating: 4.7, difficulty: "Advanced" },
        { name: "Node.js", learners: 678, rating: 4.6, difficulty: "Intermediate" }
      ]
    },
    {
      category: "Design",
      skills: [
        { name: "UI/UX Design", learners: 945, rating: 4.8, difficulty: "Intermediate" },
        { name: "Figma", learners: 723, rating: 4.7, difficulty: "Beginner" },
        { name: "Adobe Photoshop", learners: 1567, rating: 4.6, difficulty: "Intermediate" }
      ]
    },
    {
      category: "Marketing",
      skills: [
        { name: "Digital Marketing", learners: 1890, rating: 4.8, difficulty: "Beginner" },
        { name: "SEO", learners: 1234, rating: 4.7, difficulty: "Intermediate" },
        { name: "Social Media Marketing", learners: 2345, rating: 4.6, difficulty: "Beginner" }
      ]
    }
  ];

  const filteredCategories = skillCategories.map(category => ({
    ...category,
    skills: category.skills.filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.skills.length > 0);

  return (
    <RefinedPageLayout title="Skills Exchange" backUrl="/dashboard">
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

        <div className="grid gap-8">
          {filteredCategories.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-white mb-4">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <Card key={skill.name} className="bg-forest-light border border-mint/10 p-6 hover:border-mint/30 transition-all hover-scale">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                      <Badge variant="outline" className="border-mint/20 text-mint">
                        {skill.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{skill.learners.toLocaleString()} learners</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{skill.rating}/5.0</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-mint hover:bg-mint/90 text-forest">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Learn
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-mint/20 text-mint hover:bg-mint/10">
                        <Plus className="h-4 w-4 mr-1" />
                        Teach
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No skills found matching your search.</p>
          </div>
        )}
      </div>
    </RefinedPageLayout>
  );
};

export default Skills;
