// Mobile menu toggle and smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navList.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navList.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = navList.contains(event.target) || hamburger.contains(event.target);
    
    if (!isClickInside && navList.classList.contains('active')) {
      navList.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
  
  // Smooth scrolling for anchor links
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default if the href is not just "#"
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calculate header height to offset scroll position
          const headerHeight = 70; // Approximate navbar height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without page refresh
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Add scroll-triggered animations
  const animateOnScroll = () => {
    // Elements to animate
    const animateElements = document.querySelectorAll('.map-image, .map-content, .pricing-image, .pricing-content');
    
    animateElements.forEach(element => {
      // Get element position relative to viewport
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // If element is in viewport (with offset)
      if (elementPosition < windowHeight * 0.85) {
        // Add animation class
        element.classList.add('animate-in');
      }
    });
  };
  
  // Initial check for elements on page load
  animateOnScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);
  
  // Subtle parallax effect for sections
  const parallaxElements = document.querySelectorAll('.map-section, .pricing-section');
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      
      // Only apply parallax when element is in view
      if (scrollPosition > elementTop - window.innerHeight && 
          scrollPosition < elementTop + elementHeight) {
        
        // Calculate parallax intensity
        const distance = scrollPosition - elementTop;
        const intensity = distance * 0.05; // Adjust for subtlety
        
        // Apply subtle transform to the ::before pseudo-element via CSS variable
        element.style.setProperty('--parallax-shift', `${intensity}px`);
      }
    });
  });
}); 