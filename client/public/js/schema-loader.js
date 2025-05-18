/**
 * Schema Loader - dynamically loads JSON-LD schema markup for lender pages
 * This script automatically fetches and injects structured data schema markup
 * for BCS Top 100 lender pages.
 */

(function() {
  // Get the current lender ID from URL path
  function getLenderIdFromPath() {
    const path = window.location.pathname;
    
    // Extract lender slug from path like /lenders/navy-federal.html
    const match = path.match(/\/lenders\/([^/]+)\.html/);
    
    if (match && match[1]) {
      return match[1].replace(/_/g, '-');
    }
    
    return null;
  }
  
  // Fetch schema from API and inject into page
  async function fetchAndInjectSchema() {
    const lenderId = getLenderIdFromPath();
    
    if (!lenderId) {
      console.log('Schema Loader: Not a lender page, no schema injection needed');
      return;
    }
    
    try {
      // Check if schema already exists in the page
      const existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        console.log('Schema Loader: Schema already exists in page, no injection needed');
        return;
      }
      
      // Fetch schema data from API
      const response = await fetch(`/api/schema/lender/${lenderId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch schema: ${response.statusText}`);
      }
      
      const schemaData = await response.json();
      
      // Create script element for JSON-LD
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemaData, null, 2);
      
      // Add to document head
      document.head.appendChild(script);
      console.log('Schema Loader: Successfully injected schema markup');
    } catch (error) {
      console.error('Schema Loader Error:', error);
    }
  }
  
  // Run when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchAndInjectSchema);
  } else {
    fetchAndInjectSchema();
  }
})();