import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const HomeButton = () => {
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showShine] = useState(true);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    setClickCount(prev => prev + 1);
    
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      if (clickCount === 0) {
        // Single click - scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast.success("Scrolled to top");
      } else if (clickCount === 1) {
        // Double click - reload site
        window.location.reload();
        toast.success("Reloading site...");
      }
      setClickCount(0);
    }, 300);
  };

  return (
    <Link to="/" onClick={handleHomeClick} className="mr-6">
      <div className="flex items-center gap-3">
        <img 
          src="/lovable-uploads/taskmason-logo.png" 
          alt="Taskmason Logo" 
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <h1 className={`text-lg md:text-xl font-bold text-white ${showShine ? 'shine-animation' : ''}`}>
          TASK<span className="text-purple-400">MASON</span>
        </h1>
      </div>
    </Link>
  );
};

export default HomeButton;
