import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">About Us</h3>
            <p className="text-neutral-400 mb-6">
              Better Capital Solutions provides the most comprehensive comparison service for financial products, helping you make informed decisions about your funding needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/personal-funding" className="text-neutral-400 hover:text-white transition-colors">Personal Funding</Link></li>
              <li><Link href="/business-funding" className="text-neutral-400 hover:text-white transition-colors">Business Funding</Link></li>
              <li><Link href="/credit-cards" className="text-neutral-400 hover:text-white transition-colors">Credit Cards</Link></li>
              <li><Link href="/reviews" className="text-neutral-400 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/guides" className="text-neutral-400 hover:text-white transition-colors">Guides</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/calculator" className="text-neutral-400 hover:text-white transition-colors">Financial Calculator</Link></li>
              <li><Link href="/credit-score" className="text-neutral-400 hover:text-white transition-colors">Credit Score Guide</Link></li>
              <li><Link href="/comparison-tool" className="text-neutral-400 hover:text-white transition-colors">Loan Comparison Tool</Link></li>
              <li><Link href="/rate-trends" className="text-neutral-400 hover:text-white transition-colors">Interest Rate Trends</Link></li>
              <li><Link href="/faq" className="text-neutral-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-neutral-400"></i>
                <span className="text-neutral-400">1317 Main St. #202<br/>Niagara Falls, NY 14301</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-neutral-400"></i>
                <a href="tel:+17162431397" className="text-neutral-400 hover:text-white transition-colors">716-243-1397</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-neutral-400"></i>
                <a href="mailto:support@bettercapitalsolutions.com" className="text-neutral-400 hover:text-white transition-colors">support@bettercapitalsolutions.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 pb-4">
          <div className="text-neutral-500 text-sm mb-6">
            <p className="mb-3">
              <strong>DISCLAIMER:</strong> Better Capital Solutions is not a lender or financial advisor. We are an independent comparison service that helps users find financial products that may suit their needs. We may receive compensation from the companies we feature. This may influence which products we write about and where they appear on the site, but it does not affect our recommendations, which are based on research, user feedback, and market trends.
            </p>
            <p>
              APRs, loan terms, and conditions are subject to change without notice. All loans and credit products are subject to credit approval and verification. Actual rates may vary based on your creditworthiness and other factors. Please review all terms and conditions from the lender before committing to any financial product.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-neutral-500 text-sm mb-4 md:mb-0">
              &copy; 2025 Better Capital Solutions. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-neutral-500 hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-neutral-500 hover:text-white transition-colors text-sm">Terms of Service</Link>
              <Link href="/accessibility" className="text-neutral-500 hover:text-white transition-colors text-sm">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
