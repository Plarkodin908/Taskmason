import React from "react";
import { Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
const Testimonials = () => {
  const testimonials = [{
    quote: "Taskmason transformed my learning experience. The personalized learning paths and expert feedback helped me land my dream job in tech.",
    author: "Sarah Chen",
    role: "Full Stack Developer",
    image: "/lovable-uploads/6a919366-1f11-4890-a656-15f1262cac03.jpg"
  }, {
    quote: "The community aspect is what sets Taskmason apart. I've found mentors and peers who genuinely care about my growth and success.",
    author: "Michael Rodriguez",
    role: "UX/UI Designer",
    image: "/lovable-uploads/44320338-928a-4f87-80c5-b108d09edc5e.png"
  }, {
    quote: "As both a learner and instructor, I've seen firsthand how Taskmason creates meaningful connections between experts and students.",
    author: "Emily Watson",
    role: "Data Science Mentor",
    image: "/lovable-uploads/54ffc2eb-8b8d-4893-beca-68661a996ce4.png"
  }];
  return <section className="py-16 px-4 backdrop-blur-sm">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">What Our Community Says</h2>
            <p className="text-white/80">Hear from learners and instructors who have transformed their careers with Taskmason.</p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <ScrollReveal key={index} delay={index * 0.2}>
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
            </ScrollReveal>)}
        </div>
      </div>
    </section>;
};
export default Testimonials;