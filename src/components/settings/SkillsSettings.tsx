
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const SKILL_CATEGORIES = [
  "Programming", "Design", "Marketing", "Writing", "Teaching", "Music", "Photography", 
  "Languages", "Business", "Fitness", "Cooking", "Art", "Science", "Engineering"
];

interface SkillsSettingsProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const SkillsSettings = ({ skills, onSkillsChange }: SkillsSettingsProps) => {
  const [newSkill, setNewSkill] = React.useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      onSkillsChange(updatedSkills);
      setNewSkill("");
      toast.success("Skill added successfully!");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    onSkillsChange(updatedSkills);
    toast.success("Skill removed successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Your Skills</h3>
        <p className="text-muted-foreground text-sm mb-4">Add skills you want to teach or learn from others</p>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          />
          <Button onClick={addSkill} aria-label="Add skill">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4">
          <Label className="text-foreground text-sm">Popular Skills</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {SKILL_CATEGORIES.map(skill => (
              <Button
                key={skill}
                variant="outline"
                size="sm"
                onClick={() => setNewSkill(skill)}
                className="border-border text-foreground hover:bg-accent/20 text-xs"
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <Label className="text-foreground text-sm">Your Skills</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map(skill => (
                <div key={skill} className="flex items-center gap-1 bg-accent px-3 py-1 rounded-full">
                  <span className="text-accent-foreground text-sm">{skill}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill)}
                    className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${skill}`}
                    title={`Remove ${skill}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSettings;
