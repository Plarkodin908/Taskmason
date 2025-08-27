
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

interface AppearanceSettingsProps {
  preferences: any;
  onPreferenceChange: (field: string, value: string) => void;
}

const AppearanceSettings = ({ preferences, onPreferenceChange }: AppearanceSettingsProps) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'auto');
    onPreferenceChange("theme", value);
    toast.success(`Theme changed to ${value}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Theme & Appearance</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-foreground">Theme</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="bg-card border-border text-foreground w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="dark" className="text-foreground hover:bg-accent">Dark</SelectItem>
                <SelectItem value="light" className="text-foreground hover:bg-accent">Light</SelectItem>
                <SelectItem value="auto" className="text-foreground hover:bg-accent">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-foreground">Font Size</Label>
            <Select value={preferences.fontSize} onValueChange={value => onPreferenceChange("fontSize", value)}>
              <SelectTrigger className="bg-card border-border text-foreground w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="small" className="text-foreground hover:bg-accent">Small</SelectItem>
                <SelectItem value="medium" className="text-foreground hover:bg-accent">Medium</SelectItem>
                <SelectItem value="large" className="text-foreground hover:bg-accent">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
