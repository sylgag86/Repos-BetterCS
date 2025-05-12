import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Find Your Perfect Funding Solution?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of individuals and businesses who found their ideal financial match through Better Capital Solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/funding-funnel/index.html"
              className="btn-primary px-8 py-4 rounded-lg text-primary font-medium bg-white hover:bg-neutral-100 transition-colors transform hover:-translate-y-1 duration-200 shadow-lg inline-block">
              Explore Funding Options
            </a>
            <Link href="/funding-recommendation" className="px-8 py-4 rounded-lg text-white font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors flex items-center justify-center inline-block transform hover:-translate-y-1 duration-200">
              <i className="fas fa-magic mr-2"></i>
              AI Funding Advisor
            </Link>
            <a 
              href="/funding-funnel/index.html"
              className="px-8 py-4 rounded-lg text-white font-medium bg-accent hover:bg-accent/90 transition-colors flex items-center justify-center inline-block transform hover:-translate-y-1 duration-200 shadow-lg">
              <i className="fas fa-rocket mr-2"></i>
              Find Perfect Funding
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
