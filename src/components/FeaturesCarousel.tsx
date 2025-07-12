
import React from 'react';
import { Card3D } from './3d/Card3D';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FeatureImage {
  src: string;
  title: string;
  description: string;
  feature: string;
}

const featureImages: FeatureImage[] = [
  {
    src: "/lovable-uploads/79bf9c55-24c6-4feb-84ff-310a64214018.png",
    title: "Collaborative Learning",
    description: "Connect with peers and experts",
    feature: "Community-Driven"
  },
  {
    src: "/lovable-uploads/43cf2307-26cc-408d-b7ec-b67811205dab.png",
    title: "Skill Exchange",
    description: "Share your expertise, learn new skills",
    feature: "Peer-to-Peer Learning"
  },
  {
    src: "/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png",
    title: "Interactive Courses",
    description: "Hands-on learning experiences",
    feature: "Project-Based"
  },
  {
    src: "/lovable-uploads/44320338-928a-4f87-80c5-b108d09edc5e.png",
    title: "Expert Mentorship",
    description: "Get guidance from industry professionals",
    feature: "1-on-1 Mentoring"
  },
  {
    src: "/lovable-uploads/54ffc2eb-8b8d-4893-beca-68661a996ce4.png",
    title: "Progress Tracking",
    description: "Monitor your learning journey",
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
            {featureImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card3D variant="tilt" className="relative overflow-hidden">
                  <div className="relative group">
                    <img 
                      src={image.src}
                      alt={image.title}
                      className="w-full h-64 md:h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-lg" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs px-2 py-1 rounded-full inline-block mb-2 font-medium">
                        {image.feature}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                      <p className="text-sm text-gray-200">{image.description}</p>
                    </div>
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
          {featureImages.map((image, index) => (
            <Card3D key={index} variant="hover" className="flex-shrink-0 w-64">
              <div className="relative group overflow-hidden rounded-lg">
                <img 
                  src={image.src}
                  alt={image.title}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-xs px-2 py-1 rounded-full inline-block mb-1 font-medium">
                    {image.feature}
                  </div>
                  <h4 className="text-sm font-semibold mb-1">{image.title}</h4>
                  <p className="text-xs text-gray-200">{image.description}</p>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FeaturesCarousel;
