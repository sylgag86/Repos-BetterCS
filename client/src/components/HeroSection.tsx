import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative hero-gradient py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {/* A blurred grid of financial graphs and charts as a background texture */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000')] bg-no-repeat bg-cover bg-center filter blur-sm"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full text-sm font-medium bg-white/10 text-white/90 backdrop-blur-sm">
            <span className="mr-2 text-success">
              <i className="fas fa-star"></i>
            </span>
            <span className="mr-1 font-bold">NEW:</span> AI-Powered Funding Recommendations
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Find the Best Funding Options for 2025
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Compare personalized offers from top lenders for business loans, personal loans, credit cards, and more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
                href="https://safeclientaccess.com/forms/f/f0fd3fc6-84d2-4a93-be3b-0bc0bffb2e78"
                target="_blank"
                rel="noopener noreferrer" 
                className="btn-primary px-8 py-4 rounded-lg text-white font-medium bg-primary hover:bg-primary/90 transition-colors transform hover:-translate-y-1 duration-200 shadow-lg inline-flex items-center justify-center">
                <i className="fas fa-rocket mr-2"></i>
                Apply for Funding
            </a>
            <Link href="/funding-recommendation" className="btn-primary px-8 py-4 rounded-lg text-white font-medium bg-accent hover:bg-accent/90 transition-colors transform hover:-translate-y-1 duration-200 shadow-lg inline-flex items-center justify-center">
                <i className="fas fa-magic mr-2"></i>
                Get AI Recommendations
            </Link>
            <a 
                href="https://safeclientaccess.com/forms/f/f0fd3fc6-84d2-4a93-be3b-0bc0bffb2e78"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg text-white font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors flex items-center justify-center transform hover:-translate-y-1 duration-200">
                <i className="fas fa-arrow-right mr-2"></i>
                Explore All Options
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <div className="trusted-badge rounded-lg px-4 py-2 text-primary flex items-center">
              <i className="fas fa-shield-alt mr-2"></i>
              <span>256-bit SSL Encrypted</span>
            </div>
            <div className="trusted-badge rounded-lg px-4 py-2 text-primary flex items-center">
              <i className="fas fa-star mr-2"></i>
              <span>4.9/5 Average Rating</span>
            </div>
            <div className="trusted-badge rounded-lg px-4 py-2 text-primary flex items-center">
              <i className="fas fa-lock mr-2"></i>
              <span>100% Secure Process</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
