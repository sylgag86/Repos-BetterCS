import { Link } from "wouter";

const featuredLenders = [
  {
    name: "American Express Business",
    category: "Business Cards",
    categoryClass: "bg-primary/10 text-primary",
    rating: 5.0,
    badge: {
      text: "#1 in Rating",
      color: "var(--color-primary)"
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
      color: "var(--color-accent)"
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
      color: "#2D5A27"
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-6">
            Top-Ranked Lenders
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Best-in-class providers with #1 ratings in their categories, verified excellence, and exceptional customer satisfaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredLenders.map((lender, index) => (
            <div 
              key={index}
              className="bg-white overflow-hidden shadow transition-all hover:shadow-md duration-300 relative"
            >

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-2">
                    <span className={`${lender.categoryClass} text-xs font-medium px-2.5 py-1 rounded-sm`}>
                      {lender.category}
                    </span>
                    {lender.badge && (
                      <span className="text-xs font-semibold py-1 px-2.5 rounded-sm text-white" style={{ backgroundColor: lender.badge.color }}>
                        {lender.badge.text}
                      </span>
                    )}
                  </div>
                  <div className="rating-stars flex">
                    {renderStars(lender.rating)}
                  </div>
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-5 border-b border-neutral-100 pb-4">{lender.name}</h3>
                
                <div className="mb-8 space-y-3">
                  {lender.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <i className="fas fa-check text-success mr-3 text-sm"></i>
                      <span className="text-neutral-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <a href={lender.link} className={`block w-full py-3 text-center border ${lender.buttonClass ? 'border-accent text-accent hover:bg-accent hover:text-white' : 'border-primary text-primary hover:bg-primary hover:text-white'} font-medium transition-colors`}>
                    View Profile
                  </a>
                  <div className="text-center text-xs text-neutral-400">
                    <span className="flex justify-center items-center">
                      <i className="fas fa-shield-alt mr-1"></i>
                      Pre-qualify with no impact to credit score
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a href="/betterlist-100.html" className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-medium rounded-sm">
            View All Lenders
            <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
