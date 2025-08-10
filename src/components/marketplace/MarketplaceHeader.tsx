
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const MarketplaceHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleCreateCourse = () => {
    if (user && user.membership === "Educator") {
      navigate("/add-course");
    } else {
      toast.info("Creating courses requires an Educator membership", {
        description: "Upgrade your plan to unlock this feature",
        action: {
          label: "View Plans",
          onClick: () => navigate("/pricing")
        }
      });
      navigate("/pricing");
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Course Marketplace</h1>
      <Button 
        onClick={handleCreateCourse} 
        className="bg-mint hover:bg-mint/90 flex items-center gap-2 hover-scale text-slate-100"
      >
        <Plus className="h-4 w-4" />
        Create Course
      </Button>
    </div>
  );
};

export default MarketplaceHeader;
