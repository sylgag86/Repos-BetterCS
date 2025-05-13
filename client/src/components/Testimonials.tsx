import { Link } from "wouter";

const testimonials = [
  {
    text: "Better Capital Solutions helped me navigate the complex world of business loans. Within a week, I had multiple offers and was able to secure the funding I needed to expand my store.",
    author: "James Rodriguez",
    role: "Small Business Owner",
    initials: "JR",
    rating: 5
  },
  {
    text: "The personal loan options presented by Better Capital Solutions were exactly what I needed. Despite my average credit score, I found a lender with reasonable rates that helped me consolidate my debt.",
    author: "Sarah Miller",
    role: "Teacher",
    initials: "SM",
    rating: 4.5
  },
  {
    text: "I was overwhelmed by all the credit card options out there. Better Capital Solutions simplified everything and helped me find a card with amazing travel rewards that perfectly suits my lifestyle.",
    author: "Marcus Johnson",
    role: "Marketing Executive",
    initials: "MJ",
    rating: 5
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

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their perfect funding match.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg relative">
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 text-6xl text-primary opacity-10">
                <i className="fas fa-quote-right"></i>
              </div>
              <div className="rating-stars flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-neutral-700 mb-6 relative z-10">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center mr-4">
                  <span className="text-neutral-500 font-medium">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">{testimonial.author}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="/reviews" className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors">
            Read more success stories
            <i className="fas fa-chevron-right ml-1 text-sm"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
