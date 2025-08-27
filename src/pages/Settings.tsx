
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import AccountSettings from "@/components/settings/AccountSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SkillsSettings from "@/components/settings/SkillsSettings";
import DataSettings from "@/components/settings/DataSettings";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { user } = useAuth();
  const { theme } = useTheme();
  const [skills, setSkills] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    location: "",
    website: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    publicProfile: true,
    showActivity: true,
    theme: theme,
    language: "en",
    fontSize: "medium",
    highContrast: false,
    screenReader: false,
    reducedMotion: false
  });

  // Load saved preferences on component mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      setPreferences(prev => ({ ...prev, ...JSON.parse(savedPrefs) }));
    }
    const savedSkills = localStorage.getItem('userSkills');
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }
    const savedFormData = localStorage.getItem('userFormData');
    if (savedFormData) {
      setFormData(prev => ({ ...prev, ...JSON.parse(savedFormData) }));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    const newPreferences = { ...preferences, [field]: value };
    setPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    toast.success(`${field} updated successfully!`);
  };

  const handleSkillsChange = (newSkills: string[]) => {
    setSkills(newSkills);
    localStorage.setItem('userSkills', JSON.stringify(newSkills));
  };

  const handleSave = () => {
    localStorage.setItem('userFormData', JSON.stringify(formData));
    toast.success("Settings saved successfully!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings formData={formData} onInputChange={handleInputChange} />;
      case "privacy":
        return <PrivacySettings preferences={preferences} onPreferenceChange={handlePreferenceChange} />;
      case "appearance":
        return <AppearanceSettings preferences={preferences} onPreferenceChange={handlePreferenceChange} />;
      case "notifications":
        return <NotificationSettings preferences={preferences} onPreferenceChange={handlePreferenceChange} />;
      case "skills":
        return <SkillsSettings skills={skills} onSkillsChange={handleSkillsChange} />;
      case "data":
        return <DataSettings formData={formData} preferences={preferences} skills={skills} />;
      default:
        return <AccountSettings formData={formData} onInputChange={handleInputChange} />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-bold text-foreground mb-8 text-4xl text-center">Settings</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
              
              <div className="lg:col-span-3">
                <Card className="bg-card/50 backdrop-blur-sm border border-border">
                  <CardContent className="p-6">
                    {renderContent()}
                    
                    {activeTab !== "data" && (
                      <>
                        <Separator className="bg-border my-6" />
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleSave} 
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
