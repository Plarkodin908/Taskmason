
import React from 'react';
import { User, Settings, Brush, Accessibility, BellRing, List, Database } from 'lucide-react';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SettingsSidebar = ({
  activeTab,
  setActiveTab
}: SettingsSidebarProps) => {
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const menuItems = [
    {
      id: 'account',
      label: 'Public Profile',
      icon: User
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: Settings
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: Brush
    },
    {
      id: 'language',
      label: 'Accessibility',
      icon: Accessibility
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: BellRing
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: List
    },
    {
      id: 'data',
      label: 'Data',
      icon: Database
    }
  ];

  return (
    <div className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            data-state={activeTab === item.id ? 'active' : undefined}
            onClick={() => handleTabChange(item.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
              ${activeTab === item.id 
                ? 'bg-mint/20 text-mint border border-mint/30' 
                : 'text-white/70 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <Icon size={18} className="flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SettingsSidebar;
