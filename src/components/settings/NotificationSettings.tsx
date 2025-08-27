
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface NotificationSettingsProps {
  preferences: any;
  onPreferenceChange: (field: string, value: boolean) => void;
}

const NotificationSettings = ({ preferences, onPreferenceChange }: NotificationSettingsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch 
              checked={preferences.emailNotifications} 
              onCheckedChange={checked => onPreferenceChange("emailNotifications", checked)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive browser notifications</p>
            </div>
            <Switch 
              checked={preferences.pushNotifications} 
              onCheckedChange={checked => onPreferenceChange("pushNotifications", checked)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive updates and promotional content</p>
            </div>
            <Switch 
              checked={preferences.marketingEmails} 
              onCheckedChange={checked => onPreferenceChange("marketingEmails", checked)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
