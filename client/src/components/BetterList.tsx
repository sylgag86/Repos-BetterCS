import { Link } from "wouter";

export default function BetterList() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <i className="fas fa-trophy mr-2"></i>
              Exclusive Research
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-6">
              Introducing the BetterList 100™
            </h2>
            <p className="text-lg text-neutral-700 mb-6">
              Our team of financial experts analyzes thousands of lending options to create a definitive ranking of the top 100 funding providers across multiple categories.
            </p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                <span>Comprehensive analysis of rates, terms, and customer satisfaction</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                <span>Quarterly updates to reflect the latest market conditions</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                <span>Detailed reviews and side-by-side comparisons</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                <span>Specialized categories for business and personal funding</span>
              </li>
            </ul>
            <Link href="/better-list-100" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors">
              Explore the BetterList 100™
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
          
          <div className="md:w-1/2">
            {/* Financial professionals in a meeting analyzing documents */}
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Financial experts analyzing lending options" 
                className="w-full h-auto"
              />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto -mt-16 relative z-20 border border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <div className="font-heading font-bold text-xl text-neutral-900">2025 Rankings</div>
                <div className="text-sm text-neutral-500">Updated Quarterly</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="font-medium">Best Business Loan Provider</span>
                  <span className="text-primary font-bold">CapitalPrime</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="font-medium">Best Personal Loan Provider</span>
                  <span className="text-primary font-bold">LendingCircle</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Best Credit Card Issuer</span>
                  <span className="text-primary font-bold">RewardOne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
