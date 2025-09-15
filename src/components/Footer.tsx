import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Users, MessageSquare, Mail, Phone } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="px-4 border-t border-white/10 bg-black/50 backdrop-blur-md relative z-10 py-[98px]">
      <div className="container mx-auto rounded-sm">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl text-right px-[16px] py-[4px] font-semibold">TASKMASON</h3>
            </div>
            <p className="text-white/60 max-w-xs py-[5px] px-0 mx-[21px] my-[24px]">
              Connecting learners and educators through a collaborative platform for knowledge exchange and skill development.
            </p>
            <div className="flex gap-4 pt-2 my-[37px] px-[19px]">
              <GraduationCap className="h-5 w-5 text-white/80" />
              <BookOpen className="h-5 w-5 text-white/80" />
              <Users className="h-5 w-5 text-white/80" />
              <MessageSquare className="h-5 w-5 text-white/80" />
            </div>
          </div>
          
          <div className="py-0 my-0">
            <h4 className="font-medium mb-4 px-[16px] my-[12px] py-0 mx-[22px]">Platform</h4>
            <ul className="space-y-2 py-[6px] my-[10px] mx-[2px] px-[2px]">
              <li className="py-[3px]"><Link to="/features" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>Features</Link></li>
              <li className="py-[3px]"><Link to="/pricing" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>Pricing</Link></li>
              <li className="py-[3px]"><Link to="/marketplace" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>Course Marketplace</Link></li>
              <li className="my-[3px]"><Link to="/dashboard" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>My Learning</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/company" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>About Us</Link></li>
              <li><Link to="/company" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>Team</Link></li>
              <li><Link to="/company" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/legal" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>Privacy Policy</Link></li>
              <li><Link to="/legal" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>Terms of Service</Link></li>
              <li><Link to="/legal" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>Refund Policy</Link></li>
              <li><Link to="/legal" className="text-white/60 hover:text-white transition-colors" onClick={scrollToTop}>Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-start md:items-center gap-2 text-white/60">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/legal" className="text-white/60 hover:text-white transition-colors text-sm" onClick={scrollToTop}>Privacy Policy</Link>
              <Link to="/legal" className="text-white/60 hover:text-white transition-colors text-sm" onClick={scrollToTop}>Terms of Service</Link>
              <Link to="/legal" className="text-white/60 hover:text-white transition-colors text-sm" onClick={scrollToTop}>Refund Policy</Link>
              <Link to="/legal" className="text-white/60 hover:text-white transition-colors text-sm" onClick={scrollToTop}>Contact</Link>
            </div>
            <p className="text-center w-full text-white/60 pt-2 text-sm">&copy; {new Date().getFullYear()} TASKMASON. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;