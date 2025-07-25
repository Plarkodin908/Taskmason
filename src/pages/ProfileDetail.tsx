
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import VerifiedBadge from '@/components/profile/VerifiedBadge';
import { Mail, UserPlus, UserMinus, Flag, ArrowUp, ArrowDown, MessageCircle, Share2, Trophy, Calendar, MapPin, Link as LinkIcon, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EditProfileDialog from '@/components/profile/EditProfileDialog';
import SocialMediaSection from '@/components/profile/SocialMediaSection';

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  coverImage?: string;
  role: string;
  location?: string;
  website?: string;
  bio: string;
  verificationStatus: "unverified" | "pending" | "verified";
  memberSince: string;
  following: number;
  followers: number;
  karma: number;
  posts: number;
  comments: number;
  skills: string[];
  experience: Array<{
    title: string;
    duration: string;
  }>;
}

// Mock user data - updated with location and website
const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Senior Web Designer",
    location: "San Francisco, CA",
    website: "https://sarahdesigns.com",
    bio: "Creative designer with 5+ years of experience in UI/UX and web design. Passionate about creating intuitive and beautiful user experiences that solve real problems.",
    verificationStatus: "verified",
    memberSince: "May 2023",
    following: 127,
    followers: 312,
    karma: 2847,
    posts: 43,
    comments: 158,
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "React", "CSS"],
    experience: [
      { title: "Senior Web Designer", duration: "2022 - Present" },
      { title: "UI Designer", duration: "2020 - 2022" }
    ]
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Front-end Developer",
    location: "New York, NY",
    website: "https://michaelchen.dev",
    bio: "Front-end developer specializing in React and modern JavaScript frameworks. Building responsive and accessible web applications.",
    verificationStatus: "verified",
    memberSince: "January 2024",
    following: 85,
    followers: 143,
    karma: 1923,
    posts: 28,
    comments: 94,
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    experience: [
      { title: "Front-end Developer", duration: "2023 - Present" },
      { title: "Junior Developer", duration: "2021 - 2023" }
    ]
  }
];

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    const foundUser = mockUsers.find(u => u.id === id);
    if (foundUser) {
      setProfile(foundUser);
    }
  }, [id]);
  
  if (!profile) {
    return (
      <div className="relative min-h-screen bg-black">
        {/* Animated background pattern */}
        <div className="animated-pattern-container"></div>
        <div className="animated-pattern-overlay"></div>
        
        <Navbar />
        <div className="container mx-auto pt-24 pb-16 px-4">
          <div className="text-center">
            <h2 className="text-xl text-white mb-4">User not found</h2>
            <Link to="/marketplace">
              <Button className="bg-mint hover:bg-mint/90 text-forest">
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? `Unfollowed ${profile.name}` : `Now following ${profile.name}`);
  };
  
  const handleMessage = () => {
    toast.success(`Message sent to ${profile.name}`);
  };
  
  const handleReport = () => {
    toast.info("Report submitted. We'll review this profile.");
  };

  const handleUpvote = () => {
    toast.success("Upvoted!");
  };

  const handleDownvote = () => {
    toast.success("Downvoted!");
  };
  
  const courses = [
    {
      id: 1,
      title: "JavaScript Basics",
      author: profile.name,
      likes: 156,
      comments: 42,
      views: 2540
    },
    {
      id: 2,
      title: "React Fundamentals",
      author: profile.name,
      likes: 231,
      comments: 78,
      views: 3620
    }
  ];
  
  const handleProfileUpdate = (updatedData: any) => {
    if (profile) {
      setProfile({
        ...profile,
        ...updatedData
      });
      toast.success("Profile updated successfully!");
    }
  };

  const handleSocialMediaSave = (links: any) => {
    console.log('Saving social media links:', links);
    toast.success("Social media links updated!");
  };
  
  return (
    <div className="relative bg-black min-h-screen">
      {/* Animated background pattern */}
      <div className="animated-pattern-container"></div>
      <div className="animated-pattern-overlay"></div>
      
      <Navbar />
      
      {/* Enhanced Cover Section */}
      <div className="relative pt-16">
        <div className="h-56 md:h-64 bg-gradient-to-br from-mint/20 via-forest/40 to-mint/10 relative overflow-hidden">
          {profile.coverImage ? (
            <img 
              src={profile.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-mint/30 via-forest-light/60 to-forest/80" />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Enhanced Profile Header */}
        <div className="container mx-auto px-4 relative">
          <div className="bg-forest-light/95 backdrop-blur-sm border border-mint/20 rounded-xl -mt-24 relative z-10 p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Profile Info Section */}
              <div className="flex flex-col md:flex-row gap-6 flex-1">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-32 w-32 md:h-36 md:w-36 border-4 border-mint/30 shadow-lg">
                    {profile.avatar ? (
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                    ) : (
                      <AvatarFallback className="bg-forest text-mint text-4xl font-bold">
                        {profile.name.substring(0, 2)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{profile.name}</h1>
                    {profile.verificationStatus === "verified" && (
                      <VerifiedBadge size="md" />
                    )}
                  </div>
                  
                  <p className="text-mint text-xl mb-4">{profile.role}</p>
                  
                  {/* Contact Info */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/60 text-sm mb-4">
                    {profile.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-mint" />
                        {profile.location}
                      </div>
                    )}
                    {profile.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-mint" />
                        <a 
                          href={profile.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-mint hover:text-mint/80 hover:underline transition-colors"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-mint" />
                      Member since {profile.memberSince}
                    </div>
                  </div>
                  
                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="text-center p-3 bg-forest/50 rounded-lg border border-mint/10">
                      <p className="text-2xl font-bold text-mint">{profile.karma.toLocaleString()}</p>
                      <p className="text-white/60 text-xs">Karma</p>
                    </div>
                    <div className="text-center p-3 bg-forest/50 rounded-lg border border-mint/10">
                      <p className="text-2xl font-bold text-white">{profile.followers}</p>
                      <p className="text-white/60 text-xs">Followers</p>
                    </div>
                    <div className="text-center p-3 bg-forest/50 rounded-lg border border-mint/10">
                      <p className="text-2xl font-bold text-white">{profile.following}</p>
                      <p className="text-white/60 text-xs">Following</p>
                    </div>
                    <div className="text-center p-3 bg-forest/50 rounded-lg border border-mint/10">
                      <p className="text-2xl font-bold text-white">{profile.posts}</p>
                      <p className="text-white/60 text-xs">Posts</p>
                    </div>
                    <div className="text-center p-3 bg-forest/50 rounded-lg border border-mint/10">
                      <p className="text-2xl font-bold text-white">{profile.comments}</p>
                      <p className="text-white/60 text-xs">Comments</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex flex-col gap-3 min-w-[220px]">
                {user?.name === profile.name && (
                  <EditProfileDialog 
                    profile={profile}
                    onProfileUpdate={handleProfileUpdate}
                  />
                )}
                
                {user?.name !== profile.name && (
                  <Button
                    className={isFollowing 
                      ? 'border border-mint/30 text-white bg-transparent hover:bg-mint/10' 
                      : 'bg-mint hover:bg-mint/90 text-forest'
                    }
                    onClick={handleFollow}
                  >
                    {isFollowing ? (
                      <>
                        <UserMinus className="h-4 w-4 mr-2" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  className="border-mint/30 text-mint hover:bg-mint/10"
                  onClick={handleMessage}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Message
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/30 text-green-500 hover:bg-green-500/10 flex-1"
                    onClick={handleUpvote}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-500 hover:bg-red-500/10 flex-1"
                    onClick={handleDownvote}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-mint/30 text-mint hover:bg-mint/10 flex-1"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white/60 hover:bg-white/5 flex-1"
                    onClick={handleReport}
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* About Section */}
            <Card className="bg-forest-light/95 backdrop-blur-sm border border-mint/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-mint" />
                About
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4">{profile.bio}</p>
              
              {(profile.location || profile.website) && (
                <div className="pt-4 border-t border-mint/10">
                  <h4 className="text-sm font-medium text-white/90 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    {profile.location && (
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <MapPin className="h-4 w-4 text-mint" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile.website && (
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <LinkIcon className="h-4 w-4 text-mint" />
                        <a 
                          href={profile.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-mint hover:text-mint/80 hover:underline transition-colors"
                        >
                          {profile.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Social Media Section */}
            <SocialMediaSection
              isOwner={user?.name === profile.name}
              initialLinks={{
                instagram: '',
                facebook: '',
                whatsapp: '',
                gmail: profile.id === '1' ? 'sarah@sarahdesigns.com' : 'michael@michaelchen.dev'
              }}
              onSave={handleSocialMediaSave}
            />
            
            {/* Skills Section */}
            <Card className="bg-forest-light/95 backdrop-blur-sm border border-mint/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-mint/20 text-mint hover:bg-mint/30 border border-mint/30"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
            
            {/* Experience Section */}
            <Card className="bg-forest-light/95 backdrop-blur-sm border border-mint/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Professional Experience</h3>
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-mint/40 pl-4 relative">
                    <div className="absolute w-2 h-2 bg-mint rounded-full -left-1 top-2"></div>
                    <h4 className="font-medium text-white">{exp.title}</h4>
                    <p className="text-white/60 text-sm">{exp.duration}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Privacy Notice */}
            <Card className="bg-forest-light/95 backdrop-blur-sm border border-mint/20 p-4">
              <h4 className="text-sm font-medium text-white/90 mb-2">Privacy & Content</h4>
              <p className="text-white/60 text-xs mb-2">
                All content and personal information shared on this profile is subject to our privacy policy.
              </p>
              <p className="text-white/60 text-xs mb-3">
                © {new Date().getFullYear()} TASKMASON. User-generated content remains property of respective creators.
              </p>
              <Link to="/legal" className="text-mint text-xs hover:underline transition-colors">
                Privacy Policy & Terms
              </Link>
            </Card>
          </div>
          
          {/* Main Content Area */}
          <div className="xl:col-span-3">
            <ProfileTabs courses={courses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
