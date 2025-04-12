// ===== THEME TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the theme
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Theme toggle button click event
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      
      // Save the preference
      const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animate menu bars
      const bars = menuToggle.querySelectorAll('.bar');
      if (navLinks.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      });
    });
    
    // ===== ACTIVE NAVIGATION LINK =====
    // Change active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
      const scrollY = window.pageYOffset;
      
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 90;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector(`.nav-link[href*=${sectionId}]`).classList.add('active');
        } else {
          document.querySelector(`.nav-link[href*=${sectionId}]`).classList.remove('active');
        }
      });
    }
    
    window.addEventListener('scroll', scrollActive);
    
    // ===== SKILLS PROGRESS ANIMATION =====
    // Animate skill progress bars when visible
    const skillsSection = document.getElementById('skills');
    
    function animateSkills() {
      const skillBars = document.querySelectorAll('.skill-progress');
      
      skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress') + '%';
        bar.style.width = progress;
      });
    }
    
    // Use Intersection Observer to animate skills when visible
    const skillsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateSkills, 200);
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }
    
    // ===== CERTIFICATION MODAL =====
    const modal = document.getElementById('certification-modal');
    const addCertBtn = document.getElementById('add-certification-btn');
    const closeModal = document.querySelector('.close-modal');
    const addCertForm = document.getElementById('add-certification-form');
    const certificationsGrid = document.getElementById('certifications-grid');
  
    // Open modal
    addCertBtn.addEventListener('click', function() {
      modal.style.display = 'block';
    });
  
    // Close modal
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Add a new certification
    addCertForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const certName = document.getElementById('cert-name').value;
      const certIssuer = document.getElementById('cert-issuer').value;
      const certDate = document.getElementById('cert-date').value;
      const certLink = document.getElementById('cert-link').value;
      
      // Create a new certification item
      const newCert = document.createElement('div');
      newCert.className = 'certification-item';
      newCert.innerHTML = `
        <div class="certification-icon">
          <i class="fas fa-certificate"></i>
        </div>
        <div class="certification-details">
          <h4>${certName}</h4>
          <p class="certification-issuer">${certIssuer}</p>
          <p class="certification-date">${certDate}</p>
          ${certLink ? `<a href="${certLink}" class="certification-link" target="_blank">View Certificate</a>` : ''}
        </div>
      `;
      
      // Insert before the add button placeholder
      certificationsGrid.insertBefore(newCert, document.querySelector('.add-certification-placeholder'));
      
      // Reset form and close modal
      addCertForm.reset();
      modal.style.display = 'none';
    });
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, you would send the form data to your server or email service
      // For demo purposes, we'll just show a success message
      const formData = new FormData(contactForm);
      
      // Simulate sending data
      setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <div style="background-color: var(--success-color); color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0;"><i class="fas fa-check-circle" style="margin-right: 8px;"></i> Your message has been sent successfully!</p>
          </div>
        `;
        
        // Insert the message at the top of the form
        contactForm.insertBefore(successMessage, contactForm.firstChild);
        
        // Reset the form
        contactForm.reset();
        
        // Remove the message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }, 1000);
    });
    
    // ===== FOOTER CURRENT YEAR =====
    document.getElementById('current-year').textContent = new Date().getFullYear();
  });
  
  // ===== SCROLL ANIMATIONS =====
  // Add animation class to elements when they come into view
  document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.section-header, .skill-item, .timeline-item, .certification-item');
    
    const animateObserver = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          entry.target.classList.add(`delay-${(index % 5) + 1}`);
          animateObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
      animateObserver.observe(element);
    });
  });