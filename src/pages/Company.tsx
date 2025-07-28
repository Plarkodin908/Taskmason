import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
const Company = () => {
  const team = [{
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Former educator with 10+ years of experience in edtech, passionate about democratizing education.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop"
  }, {
    name: "Sarah Chen",
    role: "Chief Learning Officer",
    bio: "PhD in Educational Technology, dedicated to creating effective and engaging learning experiences.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
  }, {
    name: "Marcus Williams",
    role: "CTO",
    bio: "Software engineer and lifelong learner, building technology that connects people through knowledge sharing.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop"
  }, {
    name: "Priya Patel",
    role: "Head of Community",
    bio: "Community builder and educator focused on creating supportive learning environments for all.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
  }];
  return <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Our <span className="text-mint">Mission</span></h1>
          <p className="text-xl text-white/80 mb-8 animate-fade-in" style={{
          animationDelay: "200ms"
        }}>
            We're building a world where quality education is accessible to everyone, 
            and where knowledge sharing creates opportunities for personal and professional growth.
          </p>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-white/80 mb-4">
                TASKMASON began with a simple idea: what if we could create a platform where people could easily share their knowledge and skills with others who want to learn?
              </p>
              <p className="text-white/80 mb-4">
                Founded in 2023, we've grown from a small community of passionate educators and learners to a global platform connecting thousands of people through the power of knowledge exchange.
              </p>
              <p className="text-white/80 mb-4">
                Our platform is built on the belief that everyone has something valuable to teach and something new to learn. By creating a space where this exchange can happen seamlessly, we're empowering individuals to grow personally and professionally.
              </p>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Our Values</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["Accessibility for all", "Community-driven growth", "Quality education", "Continuous innovation"].map((value, index) => <div key={index} className="bg-mint/10 p-3 rounded-lg border border-mint/20">
                      <p className="text-mint font-medium">{value}</p>
                    </div>)}
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" alt="Team collaboration" className="rounded-xl shadow-xl" />
              <div className="absolute -bottom-6 -right-6 bg-mint p-4 rounded-lg shadow-lg">
                <p className="text-forest font-bold">Est. 2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      
      
      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-white/80 mb-8">
                Have questions about TASKMASON? We'd love to hear from you. Reach out to our team using any of the contact methods below.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-mint/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-mint" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email Us</h3>
                    <p className="text-white/70 py-[5px]">taskmason@gmail.com</p>
                    <p className="text-white/70 py-[5px]">skillnexus0@gmail.com</p>
                  </div>
                </div>
                
                
                
                <div className="flex items-start gap-4">
                  <div className="bg-mint/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-mint" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Call Us</h3>
                    <p className="text-white/70">(213)666521277- WhatsApp</p>
                    <p className="text-white/70">Mon-Fri, 9AM-5PM PT</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[{
                  icon: Twitter,
                  label: "Twitter"
                }, {
                  icon: Github,
                  label: "GitHub"
                }, {
                  icon: Linkedin,
                  label: "LinkedIn"
                }].map((social, index) => <a key={index} href="#" className="bg-forest-light border border-mint/20 p-3 rounded-lg hover:bg-mint/10 transition-colors" aria-label={social.label}>
                      <social.icon className="h-5 w-5 text-mint" />
                    </a>)}
                </div>
              </div>
            </div>
            
            <Card className="bg-forest-light border border-mint/10 p-6">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
                    <input id="name" type="text" className="w-full bg-forest border border-mint/20 rounded-md p-3 text-white focus:outline-none focus:border-mint" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                    <input id="email" type="email" className="w-full bg-forest border border-mint/20 rounded-md p-3 text-white focus:outline-none focus:border-mint" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-white/80 mb-2">Subject</label>
                  <input id="subject" type="text" className="w-full bg-forest border border-mint/20 rounded-md p-3 text-white focus:outline-none focus:border-mint" placeholder="How can we help?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full bg-forest border border-mint/20 rounded-md p-3 text-white focus:outline-none focus:border-mint" placeholder="Tell us more about your inquiry..."></textarea>
                </div>
                <Button className="w-full bg-mint hover:bg-mint/90 text-forest hover-scale">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>;
};
export default Company;