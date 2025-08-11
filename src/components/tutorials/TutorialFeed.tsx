
import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share, Bookmark, Play, Pause, Plus, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackpackIcon from "../icons/BackpackIcon";
import { toast } from "sonner";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  thumbnail: string;
  duration: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  type: 'video' | 'article' | 'post';
}

interface TutorialFeedProps {
  tutorials: Tutorial[];
  onAddResource: (type: string) => void;
}

const TutorialFeed = ({ tutorials, onAddResource }: TutorialFeedProps) => {
  const [currentTutorial, setCurrentTutorial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRealContent, setShowRealContent] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  const handleLike = (id: string) => {
    toast.success("Liked!");
  };

  const handleComment = (id: string) => {
    toast.info("Comments feature coming soon!");
  };

  const handleShare = (id: string) => {
    toast.success("Shared!");
  };

  const handleBookmark = (id: string) => {
    toast.success("Added to backpack!");
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleExplore = () => {
    setShowRealContent(true);
    // In a real app, this would fetch content from Supabase
    toast.info("Exploring real user content...");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current) {
        const scrollTop = feedRef.current.scrollTop;
        const windowHeight = feedRef.current.clientHeight;
        const currentIndex = Math.round(scrollTop / windowHeight);
        setCurrentTutorial(currentIndex);
      }
    };

    const feedElement = feedRef.current;
    if (feedElement) {
      feedElement.addEventListener('scroll', handleScroll);
      return () => feedElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Show empty state when no tutorials are available
  if (tutorials.length === 0 && !showRealContent) {
    return (
      <div className="relative h-[80vh] w-full max-w-md mx-auto bg-forest-light rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="bg-forest/50 p-8 rounded-full mb-6">
            <Play className="h-12 w-12 text-mint" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            No Tutorials Yet
          </h2>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            Be the first to share your knowledge with the SKILL SWAP community!
          </p>
          
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button
              onClick={() => onAddResource('video')}
              className="bg-mint hover:bg-mint/90 text-forest font-medium py-3 rounded-full shadow-lg flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Tutorial
            </Button>
            
            <Button
              onClick={handleExplore}
              variant="outline"
              className="border-mint/30 text-mint hover:bg-mint/10 font-medium py-3 rounded-full flex items-center gap-2"
            >
              <Compass className="h-5 w-5" />
              Explore Content
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show message when exploring but no real content available
  if (showRealContent && tutorials.length === 0) {
    return (
      <div className="relative h-[80vh] w-full max-w-md mx-auto bg-forest-light rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="bg-forest/50 p-8 rounded-full mb-6">
            <Compass className="h-12 w-12 text-mint" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            No Content Available
          </h2>
          
          <p className="text-white/70 mb-8 leading-relaxed">
            There's no user-generated content available right now. Why not create the first one?
          </p>
          
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button
              onClick={() => onAddResource('video')}
              className="bg-mint hover:bg-mint/90 text-forest font-medium py-3 rounded-full shadow-lg flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Tutorial
            </Button>
            
            <Button
              onClick={() => setShowRealContent(false)}
              variant="outline"
              className="border-mint/30 text-mint hover:bg-mint/10 font-medium py-3 rounded-full"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render tutorials feed when content is available
  return (
    <div className="relative h-[80vh] w-full max-w-md mx-auto bg-forest-light rounded-2xl overflow-hidden">
      <div 
        ref={feedRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tutorials.map((tutorial, index) => (
          <div 
            key={tutorial.id}
            className="relative h-full w-full snap-start flex-shrink-0"
          >
            {/* Background/Thumbnail */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-forest via-forest-light to-forest bg-cover bg-center"
              style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${tutorial.thumbnail})`
              }}
            />
            
            {/* Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-16 h-16 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 text-white hover:bg-black/30"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </Button>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
              {/* Top Section - Duration and Type */}
              <div className="flex justify-between items-start">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">{tutorial.duration}</span>
                </div>
                <div className="bg-mint/20 backdrop-blur-sm rounded-full px-3 py-1 border border-mint/30">
                  <span className="text-mint text-sm font-medium capitalize">{tutorial.type}</span>
                </div>
              </div>

              {/* Bottom Section - Content and Actions */}
              <div className="flex items-end justify-between">
                {/* Left Side - Content */}
                <div className="flex-1 mr-4">
                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10 border-2 border-white">
                      <AvatarImage src={tutorial.author.avatar} />
                      <AvatarFallback className="bg-mint text-forest">
                        {tutorial.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium text-sm">{tutorial.author.name}</p>
                      <p className="text-white/70 text-xs">{tutorial.author.username}</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-mint hover:bg-mint/90 text-forest font-medium px-4"
                    >
                      Follow
                    </Button>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                    {tutorial.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                    {tutorial.description}
                  </p>
                </div>

                {/* Right Side - Actions */}
                <div className="flex flex-col gap-4 items-center">
                  {/* Like */}
                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 hover:scale-110 transition-all"
                      onClick={() => handleLike(tutorial.id)}
                    >
                      <Heart className={`h-6 w-6 ${tutorial.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <span className="text-white text-xs font-medium mt-1">
                      {tutorial.likes > 999 ? `${(tutorial.likes / 1000).toFixed(1)}k` : tutorial.likes}
                    </span>
                  </div>

                  {/* Comment */}
                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 hover:scale-110 transition-all"
                      onClick={() => handleComment(tutorial.id)}
                    >
                      <MessageCircle className="h-6 w-6" />
                    </Button>
                    <span className="text-white text-xs font-medium mt-1">{tutorial.comments}</span>
                  </div>

                  {/* Share */}
                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 hover:scale-110 transition-all"
                      onClick={() => handleShare(tutorial.id)}
                    >
                      <Share className="h-6 w-6" />
                    </Button>
                    <span className="text-white text-xs font-medium mt-1">{tutorial.shares}</span>
                  </div>

                  {/* Bookmark */}
                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 hover:scale-110 transition-all"
                      onClick={() => handleBookmark(tutorial.id)}
                    >
                      <BackpackIcon 
                        className="h-6 w-6" 
                        fill={tutorial.isBookmarked}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute top-4 right-4 flex flex-col gap-1">
              {tutorials.map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-8 rounded-full transition-colors ${
                    i === index ? 'bg-mint' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialFeed;
