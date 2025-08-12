
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AppearanceSettingsProps {
  preferences: any;
  onPreferenceChange: (field: string, value: string) => void;
}

const AppearanceSettings = ({ preferences, onPreferenceChange }: AppearanceSettingsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Theme & Appearance</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Theme</Label>
            <Select value={preferences.theme} onValueChange={value => onPreferenceChange("theme", value)}>
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
            <Select value={preferences.fontSize} onValueChange={value => onPreferenceChange("fontSize", value)}>
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
};

export default AppearanceSettings;
