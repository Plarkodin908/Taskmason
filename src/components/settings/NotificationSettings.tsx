
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
          <div className="flex items-center justify-between p-4 bg-accent/40 rounded-lg border border-border hover:bg-accent/60 transition-colors">
            <div>
              <Label className="text-foreground font-semibold">Email Notifications</Label>
              <p className="text-sm text-foreground/80">Receive notifications via email</p>
            </div>
            <Switch 
              checked={preferences.emailNotifications} 
              onCheckedChange={checked => onPreferenceChange("emailNotifications", checked)}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary"
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-accent/40 rounded-lg border border-border hover:bg-accent/60 transition-colors">
            <div>
              <Label className="text-foreground font-semibold">Push Notifications</Label>
              <p className="text-sm text-foreground/80">Receive browser notifications</p>
            </div>
            <Switch 
              checked={preferences.pushNotifications} 
              onCheckedChange={checked => onPreferenceChange("pushNotifications", checked)}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary"
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-accent/40 rounded-lg border border-border hover:bg-accent/60 transition-colors">
            <div>
              <Label className="text-foreground font-semibold">Marketing Emails</Label>
              <p className="text-sm text-foreground/80">Receive updates and promotional content</p>
            </div>
            <Switch 
              checked={preferences.marketingEmails} 
              onCheckedChange={checked => onPreferenceChange("marketingEmails", checked)}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

