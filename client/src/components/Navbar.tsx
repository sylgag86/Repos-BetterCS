import { useState } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img src="/assets/logo.png" alt="Better Capital Solutions" className="h-20 mr-3" />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-neutral-500 hover:text-primary focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-primary font-medium">Home</Link>
            <Link href="/personal-funding" className="text-neutral-700 hover:text-primary transition-colors font-medium">Personal Funding</Link>
            <Link href="/business-funding" className="text-neutral-700 hover:text-primary transition-colors font-medium">Business Funding</Link>
            <Link href="/funding-recommendation" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              <span className="flex items-center">
                <i className="fas fa-magic mr-1"></i> 
                AI Advisor
              </span>
            </Link>
            <Link href="/reviews" className="text-neutral-700 hover:text-primary transition-colors font-medium">Reviews</Link>
            <Link href="/guides" className="text-neutral-700 hover:text-primary transition-colors font-medium">Guides</Link>
            <Link href="/contact" className="text-neutral-700 hover:text-primary transition-colors font-medium">Contact</Link>
            <Link href="/apply" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
              <i className="fas fa-rocket mr-1"></i>
              Apply Now
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-neutral-200">
          <Link href="/" className="block px-3 py-2 text-primary font-medium">Home</Link>
          <Link href="/personal-funding" className="block px-3 py-2 text-neutral-700 hover:text-primary transition-colors font-medium">Personal Funding</Link>
          <Link href="/business-funding" className="block px-3 py-2 text-neutral-700 hover:text-primary transition-colors font-medium">Business Funding</Link>
          <Link href="/funding-recommendation" className="block px-3 py-2 text-neutral-700 hover:text-primary transition-colors font-medium">
            <span className="flex items-center">
              <i className="fas fa-magic mr-1"></i> 
              AI Advisor
            </span>
          </Link>
          <Link href="/reviews" className="block px-3 py-2 text-neutral-700 hover:text-primary transition-colors font-medium">Reviews</Link>
          <Link href="/guides" className="block px-3 py-2 text-neutral-700 hover:text-primary transition-colors font-medium">Guides</Link>
          <Link href="/contact" className="block px-3 py-2 text-neutral-700 hover:text-primary transition-colors font-medium">Contact</Link>
          
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <Link href="/apply" className="block w-full text-center bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200">
              <span className="flex items-center justify-center">
                <i className="fas fa-rocket mr-2"></i>
                Apply for Funding Now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
