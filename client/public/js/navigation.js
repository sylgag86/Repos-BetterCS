// Handle navigation to reviews section
document.addEventListener('DOMContentLoaded', function() {
  // Special handling for the reviews section
  
  // Check if URL has a hash to testimonials section
  if (window.location.hash === '#testimonials') {
    setTimeout(function() {
      const testimonialsSection = document.getElementById('testimonials');
      if (testimonialsSection) {
        testimonialsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
  
  // Intercept all review link clicks to handle them properly
  const addReviewsClickHandler = function() {
    const reviewLinks = document.querySelectorAll('a[href="/reviews"]');
    
    reviewLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Check if we're on the home page
        if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '') {
          // We're already on the home page, just scroll to the section
          const testimonialsSection = document.getElementById('testimonials');
          if (testimonialsSection) {
            testimonialsSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // We're on another page, navigate to homepage with hash
          window.location.href = '/#testimonials';
        }
      });
    });
  };

  // Run initially
  addReviewsClickHandler();
  
  // Also run when page DOM changes (for dynamically loaded content)
  // Use MutationObserver if available
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
      addReviewsClickHandler();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    // Fallback for older browsers
    setInterval(addReviewsClickHandler, 2000);
  }
});