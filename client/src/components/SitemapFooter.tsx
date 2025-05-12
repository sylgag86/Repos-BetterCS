import React from "react";
import { Link } from "wouter";

export default function SitemapFooter() {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About & Main Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Better Capital Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/reviews">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Reviews</span>
                </Link>
              </li>
              <li>
                <Link href="/funding-funnel">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Find Funding</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 2: Funding Options */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Funding Options</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/lenders">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">BCS Top 100™ Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/lenders/sba">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">SBA Loans</span>
                </Link>
              </li>
              <li>
                <Link href="/lenders/business-loans">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Business Loans</span>
                </Link>
              </li>
              <li>
                <Link href="/lenders/lines-of-credit">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Lines of Credit</span>
                </Link>
              </li>
              <li>
                <Link href="/lenders/equipment-financing">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Equipment Financing</span>
                </Link>
              </li>
              <li>
                <Link href="/funding-recommendation">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">AI Funding Advisor</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Credit Repair */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Credit Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/credit-repair/join">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Professional Credit Repair</span>
                </Link>
              </li>
              <li>
                <Link href="/diy-credit/start">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">DIY Credit Repair Bundle</span>
                </Link>
              </li>
              <li>
                <Link href="/guides/credit-score">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Credit Score Guides</span>
                </Link>
              </li>
              <li>
                <Link href="/guides/credit-building">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Credit Building Tips</span>
                </Link>
              </li>
              <li>
                <Link href="/guides/dispute-letters">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Dispute Letter Samples</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Resources & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Funding Guides</span>
                </Link>
              </li>
              <li>
                <Link href="/guides/business-credit">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Business Credit Building</span>
                </Link>
              </li>
              <li>
                <Link href="/calculator">
                  <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Loan Calculator</span>
                </Link>
              </li>
              <li>
                <a href="/privacy-policy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-service.html" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-neutral-400 hover:text-white transition-colors">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-neutral-400">
              &copy; 2025 Better Capital Solutions. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-neutral-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-neutral-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-neutral-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-neutral-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}