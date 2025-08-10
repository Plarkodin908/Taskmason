import { useState, useEffect } from "react";
import { Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import VerifiedBadge from "./profile/VerifiedBadge";
interface UserResult {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  verificationStatus: "unverified" | "pending" | "verified";
}
const mockUsers: UserResult[] = [{
  id: "1",
  name: "Sarah Johnson",
  avatar: "",
  role: "Web Designer",
  verificationStatus: "verified"
}, {
  id: "2",
  name: "Michael Chen",
  avatar: "",
  role: "Front-end Developer",
  verificationStatus: "verified"
}, {
  id: "3",
  name: "Emily Parker",
  avatar: "",
  role: "UX Researcher",
  verificationStatus: "pending"
}, {
  id: "4",
  name: "David Rodriguez",
  avatar: "",
  role: "Full-stack Developer",
  verificationStatus: "unverified"
}];
const UserSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (searchQuery.length > 1) {
      setIsSearching(true);

      // Simulate API call with a timeout
      const timeoutId = setTimeout(() => {
        const filteredUsers = mockUsers.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(filteredUsers);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };
  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
    handleClose();
  };
  return <>
      <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/5" onClick={handleOpen}>
        <Search className="h-5 w-5" />
      </Button>

      {isOpen && <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/50 backdrop-blur-sm">
          <div className="bg-forest-light border border-mint/20 rounded-lg w-full max-w-lg mx-4 overflow-hidden shadow-xl bg-inherit">
            <div className="flex items-center border-b border-mint/10 p-4 bg-gray-950">
              <Search className="h-5 w-5 text-white/50 mr-2" />
              <input type="text" placeholder="Search for users..." className="flex-1 bg-transparent text-white border-none outline-none" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus />
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white" onClick={handleClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="max-h-80 overflow-y-auto p-2">
              {isSearching ? <div className="p-4 space-y-3">
                  {[...Array(3)].map((_, index) => <div key={index} className="flex flex-row gap-2">
                      <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
                      <div className="flex flex-col gap-2">
                        <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-full"></div>
                        <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
                      </div>
                    </div>)}
                </div> : searchQuery.length > 1 ? searchResults.length > 0 ? <ul>
                    {searchResults.map(user => <li key={user.id}>
                        <Button variant="ghost" className="w-full justify-start py-3 hover:bg-white/5 text-white" onClick={() => handleUserClick(user.id)}>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-mint/20">
                              {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : <AvatarFallback className="bg-forest text-white">
                                  {user.name.charAt(0)}
                                </AvatarFallback>}
                            </Avatar>
                            <div className="flex flex-col items-start">
                              <div className="flex items-center gap-1">
                                <span>{user.name}</span>
                                {user.verificationStatus === "verified" && <VerifiedBadge size="sm" />}
                              </div>
                              <span className="text-xs text-white/60">{user.role}</span>
                            </div>
                          </div>
                        </Button>
                      </li>)}
                  </ul> : <div className="text-center p-6 text-white/70 bg-indigo-950">
                    <User className="h-12 w-12 mx-auto mb-2 text-white/30" />
                    <p>No users found</p>
                  </div> : <div className="text-center p-6 text-white/70 bg-slate-950">
                  <p className="text-sm">Start typing to search for users</p>
                </div>}
            </div>
          </div>
        </div>}
    </>;
};
export default UserSearch;