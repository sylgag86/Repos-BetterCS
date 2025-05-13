// Global header implementation for Better Capital Solutions
document.addEventListener('DOMContentLoaded', function() {
  // Find the menu icon
  const menuIcon = document.querySelector('.menu-icon');
  // Find the mobile menu
  const mobileMenu = document.querySelector('.mobile-menu');
  
  // Toggle mobile menu when menu icon is clicked
  if (menuIcon && mobileMenu) {
    menuIcon.addEventListener('click', function() {
      if (mobileMenu.classList.contains('mobile-menu-active')) {
        mobileMenu.classList.remove('mobile-menu-active');
      } else {
        mobileMenu.classList.add('mobile-menu-active');
      }
    });
  }
});