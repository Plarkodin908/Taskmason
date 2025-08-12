
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DataSettingsProps {
  formData: any;
  preferences: any;
  skills: string[];
}

const DataSettings = ({ formData, preferences, skills }: DataSettingsProps) => {
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

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmed) {
      toast.error("Account deletion initiated. Please check your email for confirmation.");
    }
  };

  return (
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
};

export default DataSettings;
