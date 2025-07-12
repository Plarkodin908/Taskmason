
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface RefinedPageLayoutProps {
  children: React.ReactNode;
  title: string;
  backUrl?: string;
  className?: string;
}

const RefinedPageLayout: React.FC<RefinedPageLayoutProps> = ({
  children,
  title,
  backUrl,
  className = ""
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`min-h-screen bg-forest ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            className="border-mint/20 text-mint hover:bg-mint/10 hover-scale"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default RefinedPageLayout;
