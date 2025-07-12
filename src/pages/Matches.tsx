import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter, 
  MessageSquare, 
  Calendar, 
  Star, 
  User,
  X,
  CheckSquare
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/ui/loading";
import { useAuth } from "@/contexts/AuthContext";
import RequiresMembership from "@/components/membership/RequiresMembership";
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";

type MatchCategory = "Programming" | "Design" | "Marketing" | "Business" | "Art" | "Music" | "Writing" | "All";
type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert" | "All";

type Match = {
  id: number;
  name: string;
  avatar: string;
  title: string;
  skills: string[];
  rating: number;
  isPremium: boolean;
  category: MatchCategory;
  skillLevel: SkillLevel;
};

const Matches = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<MatchCategory>("All");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("All");
  
  const allMatches: Match[] = [
    {
      id: 1,
      name: "Emma Watson",
      avatar: "https://i.pravatar.cc/150?img=1",
      title: "Frontend Developer",
      skills: ["React", "JavaScript", "CSS", "UX Design"],
      rating: 4.9,
      isPremium: true,
      category: "Programming",
      skillLevel: "Expert"
    },
    {
      id: 2,
      name: "James Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      title: "Backend Engineer",
      skills: ["Node.js", "Python", "MongoDB", "AWS"],
      rating: 4.7,
      isPremium: false,
      category: "Programming",
      skillLevel: "Advanced"
    },
    {
      id: 3,
      name: "Sarah Connor",
      avatar: "https://i.pravatar.cc/150?img=4",
      title: "UX/UI Designer",
      skills: ["Figma", "Sketch", "Wireframing", "User Research"],
      rating: 4.8,
      isPremium: true,
      category: "Design",
      skillLevel: "Expert"
    },
    {
      id: 4,
      name: "Michael Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
      title: "Data Scientist",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      rating: 4.6,
      isPremium: false,
      category: "Programming",
      skillLevel: "Advanced"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isPremiumOnly, setIsPremiumOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const allSkills = Array.from(new Set(allMatches.flatMap(match => match.skills))).sort();
  const categories: MatchCategory[] = ["All", "Programming", "Design", "Marketing", "Business", "Art", "Music", "Writing"];
  const skillLevels: SkillLevel[] = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

  const filteredMatches = allMatches.filter(match => {
    if (
      searchTerm && 
      !match.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !match.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !match.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false;
    }
    
    if (selectedSkills.length > 0 && !selectedSkills.some(skill => match.skills.includes(skill))) {
      return false;
    }
    
    if (isPremiumOnly && !match.isPremium) {
      return false;
    }
    
    if (match.rating < minRating) {
      return false;
    }
    
    if (category !== "All" && match.category !== category) {
      return false;
    }
    
    if (skillLevel !== "All" && match.skillLevel !== skillLevel) {
      return false;
    }
    
    return true;
  });

  const handleConnect = (match: Match) => {
    setIsLoading(true);
    toast.success(`Sending connection request to ${match.name}`);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Connection request sent to ${match.name}`);
    }, 1000);
  };

  const handleMessage = (match: Match) => {
    navigate(`/messages`);
    toast.success(`Opening chat with ${match.name}`);
  };

  const handleSchedule = (match: Match) => {
    setIsLoading(true);
    toast.success(`Setting up scheduling with ${match.name}`);
    setTimeout(() => {
      navigate(`/calendar`);
    }, 500);
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const handleCategoryChange = (cat: MatchCategory) => {
    setCategory(cat);
  };
  
  const handleSkillLevelChange = (level: SkillLevel) => {
    setSkillLevel(level);
  };

  if (isLoading) {
    return (
      <RefinedPageLayout title="Find Matches" backUrl="/dashboard">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Loading text="Preparing your personalized match experience..." />
        </div>
      </RefinedPageLayout>
    );
  }

  return (
    <RefinedPageLayout title="Find Matches" backUrl="/dashboard">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-mint" />
            <p className="text-white/70">Connect with learners and experts in your field</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input 
                placeholder="Search names or skills..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-forest border border-mint/20 text-white"
              />
            </div>
            <Button 
              variant="outline"
              className="border-mint/20 text-mint hover:bg-mint/10 flex items-center gap-2 hover-scale"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {(selectedSkills.length > 0 || isPremiumOnly || minRating > 0 || category !== "All" || skillLevel !== "All") && (
                <span className="bg-mint text-forest h-5 w-5 rounded-full flex items-center justify-center text-xs">
                  {(selectedSkills.length > 0 ? 1 : 0) + 
                   (isPremiumOnly ? 1 : 0) + 
                   (minRating > 0 ? 1 : 0) + 
                   (category !== "All" ? 1 : 0) + 
                   (skillLevel !== "All" ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                className={`${
                  category === cat 
                    ? "bg-mint hover:bg-mint/90 text-forest" 
                    : "border-mint/20 text-white hover:bg-mint/10"
                } hover-scale`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {showFilters && (
            <div className="lg:col-span-1">
              <Card className="bg-forest-light border border-mint/10 p-6 sticky top-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-white/60 hover:text-white"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-white mb-2">Skill Level</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {skillLevels.map((level) => (
                      <Button
                        key={level}
                        variant={skillLevel === level ? "default" : "outline"}
                        size="sm"
                        className={`${
                          skillLevel === level 
                            ? "bg-mint hover:bg-mint/90 text-forest" 
                            : "border-mint/20 text-white hover:bg-mint/10"
                        } hover-scale`}
                        onClick={() => handleSkillLevelChange(level)}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-white mb-2">Skills</h4>
                  <div className="max-h-60 overflow-y-auto pr-2">
                    {allSkills.map(skill => (
                      <div key={skill} className="flex items-center mb-2">
                        <input 
                          type="checkbox" 
                          id={`skill-${skill}`}
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                          className="mr-2 accent-mint h-4 w-4"
                        />
                        <label htmlFor={`skill-${skill}`} className="text-white/80">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-white mb-2">Minimum Rating</h4>
                  <div className="flex items-center justify-between mb-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="5" 
                      step="0.5"
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="w-full accent-mint"
                    />
                    <span className="text-white ml-2 flex items-center gap-1">
                      {minRating} <Star className="h-4 w-4 text-mint" />
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-white mb-2">User Type</h4>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="premium-only"
                      checked={isPremiumOnly}
                      onChange={() => setIsPremiumOnly(!isPremiumOnly)}
                      className="mr-2 accent-mint h-4 w-4"
                    />
                    <label htmlFor="premium-only" className="text-white/80 flex items-center gap-1">
                      Premium Users Only
                      <span className="text-xs bg-mint text-forest px-1 rounded">Pro</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      setSelectedSkills([]);
                      setIsPremiumOnly(false);
                      setMinRating(0);
                      setCategory("All");
                      setSkillLevel("All");
                    }}
                    className="flex-1 bg-mint/10 text-mint hover:bg-mint/20 hover-scale"
                  >
                    Clear All
                  </Button>
                  <Button 
                    onClick={() => setShowFilters(false)}
                    className="flex-1 bg-mint hover:bg-mint/90 text-forest hover-scale"
                  >
                    Apply
                  </Button>
                </div>
              </Card>
            </div>
          )}
          
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <RequiresMembership
              requiredMembership="Lite"
              fallbackText="Advanced matching features are available to our Lite and Pro members. Upgrade your plan to connect with experts and peers in your field."
            >
              {filteredMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMatches.map(match => (
                    <Card key={match.id} className="bg-forest-light border border-mint/10 p-6 hover:border-mint/30 transition-all hover-scale relative">
                      {match.isPremium && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-mint text-forest px-2 py-0.5 rounded-full text-xs font-medium">
                            PRO
                          </span>
                        </div>
                      )}
                      
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                          <img src={match.avatar} alt={match.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold text-white">{match.name}</h3>
                        <p className="text-white/70">{match.title}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-mint fill-mint" />
                          <span className="text-white/80 ml-1">{match.rating}</span>
                        </div>
                        <Badge className="mt-2 bg-forest border-mint/20 text-white">
                          {match.skillLevel} • {match.category}
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-white/70 mb-2 text-sm font-medium">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {match.skills.map(skill => (
                            <span 
                              key={skill} 
                              className={`
                                text-xs px-2 py-1 rounded-full 
                                ${selectedSkills.includes(skill) 
                                  ? 'bg-mint text-forest font-medium' 
                                  : 'bg-forest text-white/80'}
                              `}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          onClick={() => handleConnect(match)}
                          className="w-full bg-mint hover:bg-mint/90 text-forest flex items-center justify-center gap-2 hover-scale"
                        >
                          <CheckSquare className="h-4 w-4" />
                          Connect
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            onClick={() => handleMessage(match)}
                            variant="outline"
                            className="border-mint/20 text-mint hover:bg-mint/10 flex items-center justify-center gap-1 hover-scale"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </Button>
                          <Button 
                            onClick={() => handleSchedule(match)}
                            variant="outline"
                            className="border-mint/20 text-mint hover:bg-mint/10 flex items-center justify-center gap-1 hover-scale"
                          >
                            <Calendar className="h-4 w-4" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-forest-light border border-mint/10 p-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-forest p-4 rounded-full mb-4">
                      <User className="h-8 w-8 text-mint/40" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
                    <p className="text-white/70 mb-6 max-w-md mx-auto">
                      Try adjusting your filters or search term to find more people that match your criteria.
                    </p>
                    <Button 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedSkills([]);
                        setIsPremiumOnly(false);
                        setMinRating(0);
                        setCategory("All");
                        setSkillLevel("All");
                      }}
                      className="bg-mint hover:bg-mint/90 text-forest hover-scale"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </Card>
              )}
            </RequiresMembership>
          </div>
        </div>
      </div>
    </RefinedPageLayout>
  );
};

export default Matches;
