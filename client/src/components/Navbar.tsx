import { useState } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link href="/">
          <img src="/assets/exact-logo.png" alt="Better Capital Solutions" className="logo" />
        </Link>
      </div>
      
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <i className="fas fa-bars"></i>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="/">Home</a>
          <a href="/betterlist-100.html">Directory</a>
          <a href="/funding-recommendation">AI Advisor</a>
          <a href="/resources/index.html">Resources</a>
          <a href="/resources/blog.html">Guides</a>
          <a href="/funding-funnel/index.html" className="cta-button">Find Funding</a>
        </div>
      )}
    </header>
  );
}
