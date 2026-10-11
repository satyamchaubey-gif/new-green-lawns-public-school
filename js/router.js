/**
 * SPA Router for New Green Lawns Public School
 * Manages multi-page transitions, active navigation states, browser history,
 * and page-specific initializations (such as 3D canvas resize).
 */

class SchoolRouter {
  constructor() {
    this.routes = {};
    this.currentRoute = 'home';
    this.pageContainer = document.getElementById('main-content');
    
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  registerRoute(name, templateFn) {
    this.routes[name] = templateFn;
  }

  navigate(routeName, updateHash = true) {
    if (!this.routes[routeName]) {
      routeName = 'home';
    }

    this.currentRoute = routeName;
    if (updateHash) {
      window.location.hash = `#/${routeName === 'home' ? '' : routeName}`;
    }

    this.render();
  }

  handleRoute() {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    const cleanRoute = rawHash.split('/')[0] || 'home';
    
    if (this.routes[cleanRoute]) {
      this.currentRoute = cleanRoute;
    } else {
      this.currentRoute = 'home';
    }

    this.render();
  }

  render() {
    const templateFn = this.routes[this.currentRoute];
    if (!templateFn) return;

    // Smooth page fade transition
    this.pageContainer.style.opacity = '0';
    this.pageContainer.style.transform = 'translateY(8px)';

    setTimeout(() => {
      this.pageContainer.innerHTML = templateFn();
      this.pageContainer.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
      this.pageContainer.style.opacity = '1';
      this.pageContainer.style.transform = 'translateY(0)';

      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update Nav Active Links
      this.updateNavStates();

      // Trigger post-render callbacks
      this.postRender();
    }, 120);
  }

  updateNavStates() {
    document.querySelectorAll('[data-nav-route]').forEach(link => {
      const target = link.getAttribute('data-nav-route');
      if (target === this.currentRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu if open
    const mobileNav = document.getElementById('mobile-nav-menu');
    if (mobileNav && mobileNav.classList.contains('is-open')) {
      mobileNav.classList.remove('is-open');
    }
  }

  postRender() {
    // Re-initialize 3D scenes if on relevant pages
    if (this.currentRoute === 'home') {
      if (window.hero3DInstance) {
        window.hero3DInstance.resize();
      } else if (document.getElementById('hero-3d-canvas')) {
        window.hero3DInstance = new window.Hero3DScene('hero-3d-canvas');
      }
    }

    if (this.currentRoute === 'campus-life') {
      setTimeout(() => {
        if (document.getElementById('campus-3d-canvas')) {
          window.campus3DInstance = new window.Campus3DExplorer('campus-3d-canvas', 'campus-3d-wrapper');
        }
      }, 50);
    }

    // Re-bind 3D tilt cards
    if (window.init3DTiltCards) {
      window.init3DTiltCards();
    }

    // Re-bind fee calculator if on admissions page
    if (this.currentRoute === 'admissions' && window.initFeeCalculator) {
      window.initFeeCalculator();
    }
  }
}

window.SchoolRouter = SchoolRouter;
