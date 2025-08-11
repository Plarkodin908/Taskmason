import { useState } from "react";
import { toast } from "sonner";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import TutorialFeed from "@/components/tutorials/TutorialFeed";
import ResourceDialog from "@/components/tutorials/ResourceDialog";

const Tutorials = () => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  
  const handleAddResource = (type: string) => {
    setActiveDialog(type);
  };
  
  const handleSubmitResource = (type: string) => {
    toast.success(`New ${type} added!`, {
      description: `Your ${type.toLowerCase()} has been created successfully.`,
    });
    setActiveDialog(null);
  };
  
  return (
    <RefinedPageLayout title="Tutorials" backUrl="/dashboard">
      <div className="flex justify-center items-center min-h-[80vh]">
        <TutorialFeed 
          tutorials={[]} // Empty array will show mock data
          onAddResource={handleAddResource}
        />
      </div>
      
      {/* Resource Dialog for video creation */}
      <ResourceDialog
        type="video"
        isOpen={activeDialog === "video"}
        onOpenChange={(open) => !open && setActiveDialog(null)}
        onSubmit={handleSubmitResource}
      />
      
      {/* Keep other dialogs for different resource types */}
      <ResourceDialog
        type="Post"
        isOpen={activeDialog === "Post"}
        onOpenChange={(open) => !open && setActiveDialog(null)}
        onSubmit={handleSubmitResource}
      />
      
      <ResourceDialog
        type="Resource"
        isOpen={activeDialog === "Resource"}
        onOpenChange={(open) => !open && setActiveDialog(null)}
        onSubmit={handleSubmitResource}
      />
    </RefinedPageLayout>
  );
};

export default Tutorials;
