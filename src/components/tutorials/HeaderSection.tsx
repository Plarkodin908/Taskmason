
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, PlusCircle } from "lucide-react";
import React from "react";

interface HeaderSectionProps {
  onAddResource: (type: string) => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeaderSection = ({ onAddResource, searchQuery, onSearchChange }: HeaderSectionProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex gap-2">
          <Button 
            className="bg-mint hover:bg-mint/90 text-forest flex items-center gap-2 hover-scale transition-transform" 
            onClick={() => onAddResource("Post")}
          >
            <Plus className="h-4 w-4" />
            Add Post
          </Button>
          
          <Button 
            variant="outline"
            className="border-mint/20 text-mint hover:bg-mint/10 flex items-center gap-2" 
            onClick={() => onAddResource("Resource")}
          >
            <PlusCircle className="h-4 w-4" />
            Upload Resource
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <Input
          className="max-w-md bg-forest-light border-mint/20 text-white"
          placeholder="Search posts and resources..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
    </>
  );
};

export default HeaderSection;
