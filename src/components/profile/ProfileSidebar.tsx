
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GenderSelection from "./GenderSelection";
import SocialLinksBadges from "./SocialLinksBadges";
import VerificationSection from "./VerificationSection";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, Image } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ProfileSidebarProps {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
  isEditing?: boolean;
  onProfilePictureChange?: (url: string) => void;
  onCoverPictureChange?: (url: string) => void;
}

const ProfileSidebar = ({
  selectedGender,
  onGenderChange,
  isEditing = false,
  onProfilePictureChange,
  onCoverPictureChange
}: ProfileSidebarProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    github: "",
    linkedin: "",
    website: ""
  });
  const [profilePicture, setProfilePicture] = useState<string>(user?.avatar || "");
  const [coverPicture, setCoverPicture] = useState<string>("");

  const handleSaveChanges = () => {
    // Save profile changes logic here
    navigate("/pricing");
  };

  const handleSocialLinkChange = (platform: keyof typeof socialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const imageUrl = event.target?.result as string;
        setProfilePicture(imageUrl);
        if (onProfilePictureChange) {
          onProfilePictureChange(imageUrl);
        }
        toast.success("Profile picture updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const imageUrl = event.target?.result as string;
        setCoverPicture(imageUrl);
        if (onCoverPictureChange) {
          onCoverPictureChange(imageUrl);
        }
        toast.success("Cover picture updated");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profilePicture} alt="Profile" />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {user?.name?.substring(0, 2) || "UN"}
            </AvatarFallback>
          </Avatar>
          <div className="flex space-x-2">
            <label htmlFor="profile-upload" className="cursor-pointer">
              <Button variant="outline" className="border-border text-foreground hover:bg-accent" asChild>
                <span>
                  <Camera className="h-4 w-4 mr-2" />
                  Profile
                </span>
              </Button>
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
            
            <label htmlFor="cover-upload" className="cursor-pointer">
              <Button variant="outline" className="border-border text-foreground hover:bg-accent" asChild>
                <span>
                  <Image className="h-4 w-4 mr-2" />
                  Cover
                </span>
              </Button>
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverPictureChange}
            />
          </div>
        </div>

        {/* Gender Selection */}
        <GenderSelection
          selectedGender={selectedGender}
          onGenderChange={onGenderChange}
        />

        {/* Social Links */}
        <SocialLinksBadges
          links={socialLinks}
          onChange={handleSocialLinkChange}
          readOnly={false}
        />

        {/* Verification Section */}
        <VerificationSection />

        {/* Save Button */}
        <Button 
          onClick={handleSaveChanges}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
