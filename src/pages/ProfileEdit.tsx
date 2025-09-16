import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Camera, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
      });
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
      if (user.coverImage) {
        setCoverPreview(user.coverImage);
      }
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = event => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = event => {
        setCoverPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
    }
  };

  const removeCover = () => {
    setCoverPreview(null);
    setCoverFile(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  };

  // In a real app, this would upload files to your media server
  const uploadFile = async (file: File): Promise<string> => {
    // Simulate file upload
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a mock URL - in a real app this would be the actual uploaded file URL
        resolve(URL.createObjectURL(file));
      }, 500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload files if they exist
      let avatarUrl = avatarPreview;
      let coverUrl = coverPreview;
      
      if (avatarFile) {
        avatarUrl = await uploadFile(avatarFile);
      }
      
      if (coverFile) {
        coverUrl = await uploadFile(coverFile);
      }
      
      // Prepare profile data
      const profileData = {
        ...formData,
        ...(avatarUrl && { avatar: avatarUrl }),
        ...(coverUrl && { coverImage: coverUrl }),
      };
      
      await updateUserProfile(profileData);
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-white">Please sign in to edit your profile.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="border-primary-purple/30 text-white hover:bg-primary-purple/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card className="bg-dark-purple border-primary-purple/30">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update your profile information and photo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cover Photo */}
              <div className="space-y-2">
                <Label className="text-white">Cover Photo</Label>
                <div className="relative">
                  <div 
                    className="h-48 rounded-lg bg-gradient-to-br from-primary-purple/20 via-dark-purple to-primary-purple/10 bg-cover bg-center relative overflow-hidden"
                    style={coverPreview ? { backgroundImage: `url(${coverPreview})` } : {}}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <label 
                      htmlFor="cover-upload" 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-all"
                    >
                      <Button 
                        variant="outline" 
                        className="border-white/30 text-white hover:bg-white/10"
                        type="button"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        {coverPreview ? 'Change Cover' : 'Upload Cover'}
                      </Button>
                    </label>
                    
                    {coverPreview && (
                      <button
                        type="button"
                        onClick={removeCover}
                        className="absolute top-2 right-2 bg-black/50 rounded-full p-1 hover:bg-black/70"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    )}
                  </div>
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverChange}
                    ref={coverInputRef}
                  />
                </div>
              </div>
              
              {/* Profile Photo */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-purple/20 via-dark-purple to-primary-purple/10 bg-cover bg-center relative overflow-hidden border-4 border-primary-purple/30">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-primary-purple text-4xl font-bold">
                          {formData.name.substring(0, 2).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                    <label 
                      htmlFor="avatar-upload" 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-all rounded-full"
                    >
                      <div className="bg-black/50 rounded-full p-2">
                        <Camera className="h-4 w-4 text-white" />
                      </div>
                    </label>
                    
                    {avatarPreview && (
                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="absolute -top-2 -right-2 bg-black/50 rounded-full p-1 hover:bg-black/70"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    )}
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    ref={avatarInputRef}
                  />
                </div>
                <p className="text-gray-400 text-sm">Click on the image to upload a new profile photo</p>
              </div>
              
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-dark-purple border-primary-purple/30 text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="bg-dark-purple border-primary-purple/30 text-white"
                    placeholder="Where are you based?"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website" className="text-white">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="bg-dark-purple border-primary-purple/30 text-white"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="bg-dark-purple border-primary-purple/30 text-white resize-none"
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
                <p className="text-gray-400 text-sm">Brief description for your profile.</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/profile')}
                  className="border-primary-purple/30 text-white hover:bg-primary-purple/10"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-purple hover:bg-primary-purple/90 text-white"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfileEdit;