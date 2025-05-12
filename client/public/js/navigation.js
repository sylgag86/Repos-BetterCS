// Handle navigation to reviews section
document.addEventListener('DOMContentLoaded', function() {
  // Check if we need to scroll to testimonials section
  if (window.location.hash === '#testimonials') {
    const element = document.getElementById('testimonials');
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }
  
  // Add event listener to all review links
  const reviewLinks = document.querySelectorAll('a[href="/reviews"]');
  reviewLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // If we're already on the homepage
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        const element = document.getElementById('testimonials');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're on another page, go to homepage with hash
        window.location.href = '/#testimonials';
      }
    });
  });
});