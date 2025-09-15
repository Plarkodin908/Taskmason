
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface EditProfileDialogProps {
  profile: {
    name: string;
    role: string;
    bio: string;
    location?: string;
    website?: string;
    avatar?: string;
    coverImage?: string;
  };
  onProfileUpdate: (updatedProfile: any) => void;
}

const EditProfileDialog = ({ profile, onProfileUpdate }: EditProfileDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    role: profile.role,
    bio: profile.bio,
    location: profile.location || '',
    website: profile.website || '',
    avatar: profile.avatar || '',
    coverImage: profile.coverImage || ''
  });
  const { user } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const imageUrl = event.target?.result as string;
        setFormData(prev => ({ ...prev, avatar: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const imageUrl = event.target?.result as string;
        setFormData(prev => ({ ...prev, coverImage: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onProfileUpdate(formData);
    setOpen(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-mint/20 text-mint hover:bg-mint/10"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-forest-light border border-mint/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-mint">Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Cover Image Upload */}
          <div className="space-y-2">
            <Label className="text-white">Cover Image</Label>
            <div className="relative">
              <div 
                className="h-32 w-full rounded-lg bg-gradient-to-br from-mint/20 via-forest/40 to-mint/10 bg-cover bg-center relative overflow-hidden"
                style={formData.coverImage ? { backgroundImage: `url(${formData.coverImage})` } : {}}
              >
                <div className="absolute inset-0 bg-black/20" />
                <label htmlFor="cover-upload" className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-all">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" size="sm" asChild>
                    <span>
                      <Camera className="h-4 w-4 mr-2" />
                      Change Cover
                    </span>
                  </Button>
                </label>
              </div>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
              />
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.avatar} alt="Profile" />
              <AvatarFallback className="bg-forest text-mint text-xl">
                {formData.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Button variant="outline" className="border-mint/20 text-mint hover:bg-mint/10" size="sm" asChild>
                <span>
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </span>
              </Button>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-forest border-mint/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-white">Role/Title</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="bg-forest border-mint/20 text-white"
                placeholder="e.g. Senior Developer"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-white">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-forest border-mint/20 text-white"
                placeholder="e.g. San Francisco, CA"
              />
            </div>

            <div>
              <Label htmlFor="website" className="text-white">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="bg-forest border-mint/20 text-white"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-white">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="bg-forest border-mint/20 text-white resize-none"
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSave}
              className="bg-mint hover:bg-mint/90 text-forest flex-1"
            >
              Save Changes
            </Button>
            <Button 
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-mint/20 text-mint hover:bg-mint/10"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
