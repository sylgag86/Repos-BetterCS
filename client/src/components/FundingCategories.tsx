import { Link } from "wouter";

const categories = [
  {
    title: "SBA Loans",
    description: "Government-backed loans with competitive rates for qualified small businesses.",
    imageSrc: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    imageAlt: "SBA Loans for Small Business",
    rate: "4.75%",
    rateLabel: "Rates from:",
    linkText: "Explore Options",
    link: "/betterlist-100.html"
  },
  {
    title: "Credit Cards",
    description: "Compare rewards, cashback, and low-interest credit cards from top issuers.",
    imageSrc: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    imageAlt: "Credit Card Options",
    rate: "5%",
    rateLabel: "Cashback up to:",
    linkText: "Compare Cards",
    link: "/betterlist-100.html"
  },
  {
    title: "Bad Credit Funding",
    description: "Specialized loan options for those with challenged credit histories.",
    imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    imageAlt: "Bad Credit Funding Options",
    rate: "580+",
    rateLabel: "Min. credit score:",
    linkText: "Find Solutions",
    link: "/betterlist-100.html"
  },
  {
    title: "Fast Approval",
    description: "Quick funding options when you need capital in a hurry.",
    imageSrc: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    imageAlt: "Fast Approval Funding",
    rate: "24 hours",
    rateLabel: "Funding as fast as:",
    linkText: "Apply Now",
    link: "/betterlist-100.html"
  }
];

export default function FundingCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Explore Top Funding Options
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Whatever your financial needs, we've got options that fit your situation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-neutral-200"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">{category.title}</h3>
                <p className="text-neutral-600 mb-4">{category.description}</p>
                <div className="flex items-center mb-4">
                  <div className="mr-2 text-sm text-neutral-500">{category.rateLabel}</div>
                  <div className="text-lg font-semibold text-neutral-900">{category.rate}</div>
                </div>
                <a href={category.link} className="block w-full py-3 text-center rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors">
                  {category.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
