
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronsUpDown, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const LOCATIONS = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

interface AccountSettingsProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

const AccountSettings = ({ formData, onInputChange }: AccountSettingsProps) => {
  const [locationOpen, setLocationOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

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
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Public Profile Information</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input 
              id="name" 
              value={formData.name || ""} 
              onChange={e => onInputChange("name", e.target.value)} 
              className="bg-forest-light border-mint/20 text-white" 
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email || ""} 
              onChange={e => onInputChange("email", e.target.value)} 
              className="bg-forest-light border-mint/20 text-white" 
            />
          </div>
          <div>
            <Label htmlFor="bio" className="text-white">Bio</Label>
            <Textarea 
              id="bio" 
              value={formData.bio || ""} 
              onChange={e => onInputChange("bio", e.target.value)} 
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
                            onInputChange("location", currentValue === formData.location ? "" : currentValue);
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
              value={formData.website || ""} 
              onChange={e => onInputChange("website", e.target.value)} 
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
                value={formData.currentPassword || ""} 
                onChange={e => onInputChange("currentPassword", e.target.value)} 
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
              value={formData.newPassword || ""} 
              onChange={e => onInputChange("newPassword", e.target.value)} 
              className="bg-forest-light border-mint/20 text-white" 
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={formData.confirmPassword || ""} 
              onChange={e => onInputChange("confirmPassword", e.target.value)} 
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
};

export default AccountSettings;
