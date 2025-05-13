import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Add the global header CSS to the React app
  useEffect(() => {
    // Load the global header CSS if it hasn't been loaded yet
    if (!document.getElementById('global-header-css')) {
      const link = document.createElement('link');
      link.id = 'global-header-css';
      link.rel = 'stylesheet';
      link.href = '/assets/global-header.css';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <Link href="/">
          <img src="/assets/exact-logo.png" alt="Better Capital Solutions" className="logo" />
        </Link>
      </div>
      
      <div className="desktop-menu">
        <Link href="/">Home</Link>
        <Link href="/betterlist-100.html">Directory</Link>
        <Link href="/funding-recommendation">AI Advisor</Link>
        <Link href="/resources/index.html">Resources</Link>
        <Link href="/resources/blog.html">Guides</Link>
        <Link href="/funding-funnel/index.html" className="cta-button">Find Funding</Link>
      </div>
      
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <i className="fas fa-bars"></i>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
        <Link href="/">Home</Link>
        <Link href="/betterlist-100.html">Directory</Link>
        <Link href="/funding-recommendation">AI Advisor</Link>
        <Link href="/resources/index.html">Resources</Link>
        <Link href="/resources/blog.html">Guides</Link>
        <Link href="/funding-funnel/index.html" className="cta-button">Find Funding</Link>
      </div>
    </header>
  );
}
