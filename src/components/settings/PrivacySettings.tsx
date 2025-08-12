
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface PrivacySettingsProps {
  preferences: any;
  onPreferenceChange: (field: string, value: boolean) => void;
}

const PrivacySettings = ({ preferences, onPreferenceChange }: PrivacySettingsProps) => {
  return (
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
              onCheckedChange={checked => onPreferenceChange("publicProfile", checked)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Show Activity</Label>
              <p className="text-sm text-white/60">Display your recent activity to others</p>
            </div>
            <Switch 
              checked={preferences.showActivity} 
              onCheckedChange={checked => onPreferenceChange("showActivity", checked)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
