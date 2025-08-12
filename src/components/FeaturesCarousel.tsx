
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
      <div className={`relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto ${className}`}>
        <Carousel 
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {features.map((feature, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4">
                <Card3D variant="tilt" className="relative overflow-hidden">
                  <div className="relative group p-4 sm:p-6 md:p-8 bg-gradient-to-br from-forest to-forest-light rounded-lg min-h-[240px] sm:min-h-[260px] md:min-h-[280px] flex flex-col justify-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs px-2 sm:px-3 py-1 rounded-full inline-block mb-3 sm:mb-4 font-medium text-white w-fit">
                      {feature.feature}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">{feature.title}</h3>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </Card3D>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 sm:left-2 bg-white/10 border-white/20 text-white hover:bg-white/20 h-6 w-6 sm:h-8 sm:w-8" />
          <CarouselNext className="right-1 sm:right-2 bg-white/10 border-white/20 text-white hover:bg-white/20 h-6 w-6 sm:h-8 sm:w-8" />
        </Carousel>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {features.map((feature, index) => (
            <CarouselItem key={index} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <Card3D variant="hover" className="h-full">
                <div className="relative group overflow-hidden rounded-lg p-4 sm:p-6 bg-gradient-to-br from-forest to-forest-light min-h-[180px] sm:min-h-[200px] flex flex-col justify-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-xs px-2 py-1 rounded-full inline-block mb-2 sm:mb-3 font-medium text-white w-fit">
                    {feature.feature}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">{feature.title}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </Card3D>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 sm:left-2 bg-white/10 border-white/20 text-white hover:bg-white/20" />
        <CarouselNext className="right-1 sm:right-2 bg-white/10 border-white/20 text-white hover:bg-white/20" />
      </Carousel>
    </div>
  );
};

export default FeaturesCarousel;
