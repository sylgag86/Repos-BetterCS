import { Link } from "wouter";

const featuredLenders = [
  {
    name: "American Express Business",
    category: "Business Cards",
    categoryClass: "bg-primary/10 text-primary",
    rating: 5.0,
    badge: {
      text: "#1 in Rating",
      class: "bg-yellow-500 text-white border-2 border-white"
    },
    features: [
      "Premium business rewards",
      "Vendor payment flexibility",
      "Interest-free periods",
      "Business management tools"
    ],
    link: "/lenders/american-express-business.html"
  },
  {
    name: "Kabbage",
    category: "Business Loans",
    categoryClass: "bg-accent/10 text-accent",
    rating: 4.8,
    badge: {
      text: "#1 in Reviews",
      class: "bg-blue-500 text-white border-2 border-white"
    },
    features: [
      "Lines up to $250K",
      "Same-day funding available",
      "No origination fees",
      "Over 2,000 verified reviews"
    ],
    link: "/lenders/kabbage.html",
    buttonClass: "bg-accent hover:bg-accent/90"
  },
  {
    name: "American Express",
    category: "Credit Cards",
    categoryClass: "bg-primary/10 text-primary",
    rating: 4.7,
    badge: {
      text: "#1 in Credit Cards",
      class: "bg-green-500 text-white border-2 border-white"
    },
    features: [
      "Premium rewards programs",
      "Exceptional travel benefits",
      "Purchase protection",
      "Member-exclusive offers"
    ],
    link: "/lenders/american-express.html"
  }
];

// Helper function to render stars based on rating
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
  }
  
  // Add empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
  }
  
  return stars;
};

export default function FeaturedLenders() {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            Top-Ranked Lenders
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Best-in-class providers with #1 ratings in their categories, verified excellence, and exceptional customer satisfaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredLenders.map((lender, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px] duration-300 border border-neutral-200 relative"
            >
              {lender.badge && (
                <div className={`absolute -top-3 -left-3 px-3 py-1.5 rounded-lg shadow-lg z-10 text-xs font-bold transform rotate-[-5deg] ${lender.badge.class}`} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                  {lender.badge.text}
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`${lender.categoryClass} text-xs font-medium px-2.5 py-1 rounded-full`}>
                      {lender.category}
                    </span>
                  </div>
                  <div className="rating-stars flex">
                    {renderStars(lender.rating)}
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-2">{lender.name}</h3>
                <div className="mb-6">
                  {lender.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <i className="fas fa-check-circle text-success mr-2"></i>
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <a href={lender.link} className={`block w-full py-3 text-center rounded-lg ${lender.buttonClass || 'bg-primary hover:bg-primary/90'} text-white font-semibold transition-colors`}>
                  Apply Now
                </a>
                <div className="mt-4 text-center text-sm text-neutral-500">
                  <span className="flex justify-center items-center">
                    <i className="fas fa-shield-alt mr-1"></i>
                    Pre-qualify with no impact to credit score
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="/betterlist-100.html" className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors">
            View all lenders
            <i className="fas fa-chevron-right ml-1 text-sm"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
