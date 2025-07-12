
import React from 'react';
import Card3D from './3d/Card3D';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Feature {
  title: string;
  description: string;
  feature: string;
}

const features: Feature[] = [
  {
    title: "Collaborative Learning",
    description: "Connect with peers and experts in your field for enhanced learning experiences",
    feature: "Community-Driven"
  },
  {
    title: "Skill Exchange",
    description: "Share your expertise while learning new skills from others in the community",
    feature: "Peer-to-Peer Learning"
  },
  {
    title: "Interactive Courses",
    description: "Engage with hands-on projects and real-world applications",
    feature: "Project-Based"
  },
  {
    title: "Expert Mentorship",
    description: "Get personalized guidance from industry professionals and experienced mentors",
    feature: "1-on-1 Mentoring"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and milestone tracking",
    feature: "Analytics & Insights"
  }
];

interface FeaturesCarouselProps {
  className?: string;
  variant?: 'hero' | 'section';
}

const FeaturesCarousel = ({ className = "", variant = 'hero' }: FeaturesCarouselProps) => {
  if (variant === 'hero') {
    return (
      <div className={`relative ${className}`}>
        <Carousel className="w-full max-w-md mx-auto">
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index}>
                <Card3D variant="tilt" className="relative overflow-hidden">
                  <div className="relative group p-8 bg-gradient-to-br from-forest to-forest-light rounded-lg min-h-[280px] flex flex-col justify-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs px-3 py-1 rounded-full inline-block mb-4 font-medium text-white w-fit">
                      {feature.feature}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </Card3D>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/10 border-white/20 text-white hover:bg-white/20" />
          <CarouselNext className="right-2 bg-white/10 border-white/20 text-white hover:bg-white/20" />
        </Carousel>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 p-4">
          {features.map((feature, index) => (
            <Card3D key={index} variant="hover" className="flex-shrink-0 w-64">
              <div className="relative group overflow-hidden rounded-lg p-6 bg-gradient-to-br from-forest to-forest-light min-h-[200px] flex flex-col justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-xs px-2 py-1 rounded-full inline-block mb-3 font-medium text-white w-fit">
                  {feature.feature}
                </div>
                <h4 className="text-lg font-semibold mb-3 text-white">{feature.title}</h4>
                <p className="text-xs text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            </Card3D>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FeaturesCarousel;
