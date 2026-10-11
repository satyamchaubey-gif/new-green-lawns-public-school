/**
 * Main Application Script for New Green Lawns Public School
 * Initializes 3D tilt cards, header interactions, mobile menu,
 * dropdowns, and coordinates the router, enquiry, and search managers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Managers
  window.enquiryManager = new window.EnquiryManager();
  window.spotlightSearch = new window.SpotlightSearch();
  window.schoolRouter = new window.SchoolRouter();

  // Register All Routes
  registerAllSchoolRoutes(window.schoolRouter);

  // Initial Route Load
  window.schoolRouter.handleRoute();

  // Initialize UI Features
  initNavbarBehavior();
  initMobileMenu();
  init3DTiltCards();
  initFloatingEnquiryPill();
});

/**
 * 3D Card Gyroscope & Mouse Tilt
 */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.card-3d-tilt, .pillar-card, .feature-card, .legacy-card-stack');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (-10 to +10 degrees)
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;
      
      // Update lighting reflection
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => {
        card.style.transition = '';
      }, 400);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

window.init3DTiltCards = init3DTiltCards;

/**
 * Navbar Scrolled Glassmorphism & Dropdowns
 */
function initNavbarBehavior() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 35) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  });

  // Mobile menu close on link click
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-nav-route]') || e.target.closest('[data-nav-route]')) {
      const mobileNav = document.getElementById('mobile-nav-menu');
      if (mobileNav && mobileNav.classList.contains('is-open')) {
        mobileNav.classList.remove('is-open');
      }
    }
  });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileMenu() {
  const hamburger = document.getElementById('mobile-hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav-menu');
  const closeBtn = document.getElementById('mobile-nav-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
    });
  }

  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
    });
  }
}

/**
 * Floating Quick Action Enquiry Pill
 */
function initFloatingEnquiryPill() {
  const pill = document.getElementById('floating-enquiry-pill');
  if (!pill) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      pill.classList.add('visible');
    } else {
      pill.classList.remove('visible');
    }
  });
}
