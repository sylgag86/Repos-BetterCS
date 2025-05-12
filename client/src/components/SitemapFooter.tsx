import React from 'react';
import { Link } from 'wouter';

export default function SitemapFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About & Main Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Better Capital Solutions</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/reviews" className="text-neutral-400 hover:text-white transition-colors">Reviews</Link></li>
              <li><a href="/funding-funnel/index.html" className="text-neutral-400 hover:text-white transition-colors">Find Funding</a></li>
            </ul>
          </div>
          
          {/* Column 2: Funding Options */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Funding Options</h3>
            <ul className="space-y-2">
              <li><Link href="/lenders" className="text-neutral-400 hover:text-white transition-colors">BCS Top 100™ Directory</Link></li>
              <li><Link href="/lenders/sba" className="text-neutral-400 hover:text-white transition-colors">SBA Loans</Link></li>
              <li><Link href="/lenders/business-loans" className="text-neutral-400 hover:text-white transition-colors">Business Loans</Link></li>
              <li><Link href="/lenders/lines-of-credit" className="text-neutral-400 hover:text-white transition-colors">Lines of Credit</Link></li>
              <li><Link href="/lenders/equipment-financing" className="text-neutral-400 hover:text-white transition-colors">Equipment Financing</Link></li>
              <li><Link href="/funding-recommendation" className="text-neutral-400 hover:text-white transition-colors">AI Funding Advisor</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Credit Repair */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Credit Solutions</h3>
            <ul className="space-y-2">
              <li><a href="/credit-repair/join.html" className="text-neutral-400 hover:text-white transition-colors">Professional Credit Repair</a></li>
              <li><a href="/diy-credit/start.html" className="text-neutral-400 hover:text-white transition-colors">DIY Credit Repair Bundle</a></li>
              <li><Link href="/guides/credit-score" className="text-neutral-400 hover:text-white transition-colors">Credit Score Guides</Link></li>
              <li><Link href="/guides/credit-building" className="text-neutral-400 hover:text-white transition-colors">Credit Building Tips</Link></li>
              <li><Link href="/guides/dispute-letters" className="text-neutral-400 hover:text-white transition-colors">Dispute Letter Samples</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Resources & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/guides" className="text-neutral-400 hover:text-white transition-colors">Funding Guides</Link></li>
              <li><Link href="/guides/business-credit" className="text-neutral-400 hover:text-white transition-colors">Business Credit Building</Link></li>
              <li><Link href="/calculator" className="text-neutral-400 hover:text-white transition-colors">Loan Calculator</Link></li>
              <li><a href="/privacy-policy.html" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service.html" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/sitemap.xml" className="text-neutral-400 hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-neutral-400">
              &copy; {currentYear} Better Capital Solutions. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-neutral-400 hover:text-white transition-colors">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-neutral-400 hover:text-white transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-neutral-400 hover:text-white transition-colors">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-neutral-400 hover:text-white transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}