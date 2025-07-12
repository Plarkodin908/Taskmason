
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Trash2, Download, Eye, EyeOff, Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Comprehensive list of world locations
const LOCATIONS = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

const SKILL_CATEGORIES = [
  "Programming", "Design", "Marketing", "Writing", "Teaching", "Music", "Photography", 
  "Languages", "Business", "Fitness", "Cooking", "Art", "Science", "Engineering"
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  
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
    theme: "dark",
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
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    const newPreferences = { ...preferences, [field]: value };
    setPreferences(newPreferences);
    
    // Save to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));

    // Apply changes immediately
    if (field === "theme") {
      applyTheme(value as string);
    } else if (field === "fontSize") {
      applyFontSize(value as string);
    } else if (field === "highContrast") {
      applyHighContrast(value as boolean);
    } else if (field === "language") {
      applyLanguage(value as string);
    }
  };

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    switch (theme) {
      case "light":
        root.style.setProperty('--background', '255 255 255');
        root.style.setProperty('--foreground', '0 0 0');
        break;
      case "dark":
        root.style.setProperty('--background', '8 47 73');
        root.style.setProperty('--foreground', '248 250 252');
        break;
      case "auto":
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? "dark" : "light");
        break;
    }
    toast.success(`Theme changed to ${theme}`);
  };

  const applyFontSize = (size: string) => {
    const root = document.documentElement;
    switch (size) {
      case "small":
        root.style.fontSize = "14px";
        break;
      case "medium":
        root.style.fontSize = "16px";
        break;
      case "large":
        root.style.fontSize = "18px";
        break;
    }
    toast.success(`Font size changed to ${size}`);
  };

  const applyHighContrast = (enabled: boolean) => {
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    toast.success(`High contrast ${enabled ? 'enabled' : 'disabled'}`);
  };

  const applyLanguage = (language: string) => {
    document.documentElement.lang = language;
    toast.success(`Language changed to ${language}`);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      localStorage.setItem('userSkills', JSON.stringify(updatedSkills));
      setNewSkill("");
      toast.success("Skill added successfully!");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    localStorage.setItem('userSkills', JSON.stringify(updatedSkills));
    toast.success("Skill removed successfully!");
  };

  const handleSave = () => {
    // Save form data
    localStorage.setItem('userFormData', JSON.stringify(formData));
    toast.success("Settings saved successfully!");
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    toast.success("Password updated successfully!");
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmed) {
      toast.error("Account deletion initiated. Please check your email for confirmation.");
    }
  };

  const handleExportData = () => {
    const userData = {
      profile: formData,
      preferences,
      skills,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-data.json';
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Data exported successfully!");
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Public Profile Information</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={e => handleInputChange("name", e.target.value)} 
              className="bg-forest-light border-mint/20 text-white" 
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email} 
              onChange={e => handleInputChange("email", e.target.value)} 
              className="bg-forest-light border-mint/20 text-white" 
            />
          </div>
          <div>
            <Label htmlFor="bio" className="text-white">Bio</Label>
            <Textarea 
              id="bio" 
              value={formData.bio} 
              onChange={e => handleInputChange("bio", e.target.value)} 
              className="bg-forest-light border-mint/20 text-white" 
              placeholder="Tell us about yourself..." 
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-white">Location</Label>
            <Popover open={locationOpen} onOpenChange={setLocationOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  role="combobox" 
                  aria-expanded={locationOpen} 
                  className="w-full justify-between bg-forest-light border-mint/20 text-white hover:bg-forest hover:text-white"
                >
                  {formData.location || "Select location..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-forest-light border-mint/20">
                <Command className="bg-forest-light">
                  <CommandInput placeholder="Search location..." className="text-white" />
                  <CommandEmpty className="text-white/60">No location found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {LOCATIONS.map(location => (
                        <CommandItem 
                          key={location} 
                          value={location} 
                          onSelect={currentValue => {
                            handleInputChange("location", currentValue === formData.location ? "" : currentValue);
                            setLocationOpen(false);
                          }} 
                          className="text-white hover:bg-mint/10"
                        >
                          <Check className={cn("mr-2 h-4 w-4", formData.location === location ? "opacity-100" : "opacity-0")} />
                          {location}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="website" className="text-white">Website</Label>
            <Input 
              id="website" 
              value={formData.website} 
              onChange={e => handleInputChange("website", e.target.value)} 
              className="bg-forest-light border-mint/20 text-white" 
              placeholder="https://" 
            />
          </div>
        </div>
      </div>

      <Separator className="bg-mint/10" />

      <div>
        <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
        <div className="grid gap-4 max-w-md">
          <div>
            <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
            <div className="relative">
              <Input 
                id="currentPassword" 
                type={showPassword ? "text" : "password"} 
                value={formData.currentPassword} 
                onChange={e => handleInputChange("currentPassword", e.target.value)} 
                className="bg-forest-light border-mint/20 text-white pr-10" 
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="newPassword" className="text-white">New Password</Label>
            <Input 
              id="newPassword" 
              type="password" 
              value={formData.newPassword} 
              onChange={e => handleInputChange("newPassword", e.target.value)} 
              className="bg-forest-light border-mint/20 text-white" 
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={formData.confirmPassword} 
              onChange={e => handleInputChange("confirmPassword", e.target.value)} 
              className="bg-forest-light border-mint/20 text-white" 
            />
          </div>
          <Button 
            onClick={handlePasswordChange} 
            className="bg-mint hover:bg-mint/90 w-fit text-violet-50"
          >
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Account Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Public Profile</Label>
              <p className="text-sm text-white/60">Make your profile visible to other users</p>
            </div>
            <Switch 
              checked={preferences.publicProfile} 
              onCheckedChange={checked => handlePreferenceChange("publicProfile", checked)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Show Activity</Label>
              <p className="text-sm text-white/60">Display your recent activity to others</p>
            </div>
            <Switch 
              checked={preferences.showActivity} 
              onCheckedChange={checked => handlePreferenceChange("showActivity", checked)} 
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Theme & Appearance</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Theme</Label>
            <Select value={preferences.theme} onValueChange={value => handlePreferenceChange("theme", value)}>
              <SelectTrigger className="bg-forest-light border-mint/20 text-white w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-forest-light border-mint/20">
                <SelectItem value="dark" className="text-white hover:bg-mint/10">Dark</SelectItem>
                <SelectItem value="light" className="text-white hover:bg-mint/10">Light</SelectItem>
                <SelectItem value="auto" className="text-white hover:bg-mint/10">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-white">Font Size</Label>
            <Select value={preferences.fontSize} onValueChange={value => handlePreferenceChange("fontSize", value)}>
              <SelectTrigger className="bg-forest-light border-mint/20 text-white w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-forest-light border-mint/20">
                <SelectItem value="small" className="text-white hover:bg-mint/10">Small</SelectItem>
                <SelectItem value="medium" className="text-white hover:bg-mint/10">Medium</SelectItem>
                <SelectItem value="large" className="text-white hover:bg-mint/10">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibilitySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Language & Accessibility</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Language</Label>
            <Select value={preferences.language} onValueChange={value => handlePreferenceChange("language", value)}>
              <SelectTrigger className="bg-forest-light border-mint/20 text-white w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-forest-light border-mint/20">
                <SelectItem value="en" className="text-white hover:bg-mint/10">English</SelectItem>
                <SelectItem value="es" className="text-white hover:bg-mint/10">Spanish</SelectItem>
                <SelectItem value="fr" className="text-white hover:bg-mint/10">French</SelectItem>
                <SelectItem value="de" className="text-white hover:bg-mint/10">German</SelectItem>
                <SelectItem value="zh" className="text-white hover:bg-mint/10">Chinese</SelectItem>
                <SelectItem value="ja" className="text-white hover:bg-mint/10">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">High Contrast</Label>
              <p className="text-sm text-white/60">Increase contrast for better visibility</p>
            </div>
            <Switch 
              checked={preferences.highContrast} 
              onCheckedChange={checked => handlePreferenceChange("highContrast", checked)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Screen Reader Support</Label>
              <p className="text-sm text-white/60">Optimize for screen readers</p>
            </div>
            <Switch 
              checked={preferences.screenReader} 
              onCheckedChange={checked => handlePreferenceChange("screenReader", checked)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Reduced Motion</Label>
              <p className="text-sm text-white/60">Minimize animations and transitions</p>
            </div>
            <Switch 
              checked={preferences.reducedMotion} 
              onCheckedChange={checked => handlePreferenceChange("reducedMotion", checked)} 
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Email Notifications</Label>
              <p className="text-sm text-white/60">Receive notifications via email</p>
            </div>
            <Switch 
              checked={preferences.emailNotifications} 
              onCheckedChange={checked => handlePreferenceChange("emailNotifications", checked)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Push Notifications</Label>
              <p className="text-sm text-white/60">Receive browser notifications</p>
            </div>
            <Switch 
              checked={preferences.pushNotifications} 
              onCheckedChange={checked => handlePreferenceChange("pushNotifications", checked)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Marketing Emails</Label>
              <p className="text-sm text-white/60">Receive updates and promotional content</p>
            </div>
            <Switch 
              checked={preferences.marketingEmails} 
              onCheckedChange={checked => handlePreferenceChange("marketingEmails", checked)} 
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkillsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Your Skills</h3>
        <p className="text-white/60 text-sm mb-4">Add skills you want to teach or learn from others</p>
        
        <div className="flex gap-2 mb-4">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            className="bg-forest-light border-mint/20 text-white"
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          />
          <Button onClick={addSkill} className="bg-mint hover:bg-mint/90 text-forest">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4">
          <Label className="text-white text-sm">Popular Skills</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {SKILL_CATEGORIES.map(skill => (
              <Button
                key={skill}
                variant="outline"
                size="sm"
                onClick={() => setNewSkill(skill)}
                className="border-mint/20 text-mint hover:bg-mint/10 text-xs"
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <Label className="text-white text-sm">Your Skills</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map(skill => (
                <div key={skill} className="flex items-center gap-1 bg-mint/20 px-3 py-1 rounded-full">
                  <span className="text-white text-sm">{skill}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill)}
                    className="h-4 w-4 p-0 text-white/60 hover:text-white"
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

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="p-4 border border-mint/20 rounded-lg">
            <h4 className="text-white font-medium mb-2">Export Your Data</h4>
            <p className="text-white/60 text-sm mb-3">Download a copy of your account data</p>
            <Button 
              onClick={handleExportData} 
              variant="outline" 
              className="border-mint/20 text-mint hover:bg-mint/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          <div className="p-4 border border-red-500/20 rounded-lg bg-red-500/5">
            <h4 className="text-white font-medium mb-2">Delete Account</h4>
            <p className="text-white/60 text-sm mb-3">Permanently delete your account and all data</p>
            <Button 
              onClick={handleDeleteAccount} 
              variant="destructive" 
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return renderAccountSettings();
      case "privacy":
        return renderPrivacySettings();
      case "appearance":
        return renderAppearanceSettings();
      case "language":
        return renderAccessibilitySettings();
      case "notifications":
        return renderNotificationSettings();
      case "skills":
        return renderSkillsSettings();
      case "data":
        return renderDataSettings();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bold text-white mb-8 text-4xl text-center">Settings</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            
            <div className="lg:col-span-3">
              <Card className="bg-forest-light border border-mint/10">
                <CardContent className="p-6">
                  {renderContent()}
                  
                  {activeTab !== "data" && (
                    <>
                      <Separator className="bg-mint/10 my-6" />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSave} 
                          className="bg-mint hover:bg-mint/90 text-indigo-50"
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
    </>
  );
};

export default Settings;
