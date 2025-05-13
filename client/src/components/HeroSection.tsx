import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden">
      {/* Subtle, professional background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <path d="M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor"></path>
        </svg>
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
