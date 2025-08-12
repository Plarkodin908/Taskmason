
import React from "react";
import { Quote, Users } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const testimonials: any[] = [];

  return (
    <section className="py-16 px-4 backdrop-blur-sm">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">What Our Community Says</h2>
            <p className="text-white/80">Join our growing community and be among the first to share your experience.</p>
          </div>
        </ScrollReveal>
        
        {testimonials.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 max-w-md mx-auto">
              <Users className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Testimonials Yet</h3>
              <p className="text-white/70 mb-6">Be the first to share your experience with our community.</p>
              <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white">
                Share Your Story
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 px-[14px]">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-white/90 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.author}</h4>
                      <p className="text-white/70 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
