import { Link } from "wouter";
import heroImage from "@assets/image_1747670964067.png";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Hero image as background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Business professionals shaking hands" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 to-neutral-800/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Simple, elegant header with serif font for a premium look */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Better Capital Solutions
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto font-light">
              Connecting you with personalized funding solutions for your business and personal needs.
            </p>
          </div>
          
          {/* Central, prominent CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a 
              href="/funding-funnel/index.html"
              className="px-10 py-5 rounded-md bg-[#203047] hover:bg-[#15243a] text-white font-medium transition-all duration-300 shadow-xl inline-flex items-center justify-center text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Get Funded Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            
            <a 
              href="/funding-recommendation" 
              className="px-8 py-5 rounded-md bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white/90 font-medium transition-all duration-300 inline-flex items-center justify-center text-lg"
            >
              <i className="far fa-lightbulb mr-2 text-primary"></i>
              AI Recommendations
            </a>
          </div>
          
          {/* Simplified trust indicators with subtle design */}
          <div className="flex justify-center space-x-6">
            <div className="flex items-center text-white/60 text-sm">
              <i className="fas fa-shield-alt mr-2 text-primary/70"></i>
              <span>256-bit SSL Encrypted</span>
            </div>
            <div className="hidden md:flex items-center text-white/60 text-sm">
              <i className="fas fa-star mr-2 text-primary/70"></i>
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
