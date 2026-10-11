/**
 * Spotlight Search Modal for New Green Lawns Public School
 * Instant live search across all school wings, curriculum, admissions, and facilities.
 */

class SpotlightSearch {
  constructor() {
    this.searchIndex = [
      { title: 'Admissions 2026-2027', category: 'Admissions', desc: 'Process, eligibility criteria, required documents and online application', route: 'admissions' },
      { title: 'Admission Enquiry Form', category: 'Admissions', desc: 'Book a campus walkthrough and register admission enquiry', action: 'open-enquiry' },
      { title: 'School Fee Structure & Calculator', category: 'Admissions', desc: 'Interactive annual and quarterly fee calculator for 2026-27', route: 'admissions' },
      { title: 'Download Prospectus 2026-27', category: 'Admissions', desc: 'Official digital information brochure and syllabus guide', action: 'download-prospectus' },
      { title: 'About New Green Lawns Public School', category: 'About Us', desc: 'Our 30-year legacy since 1994, vision, mission and leadership', route: 'about' },
      { title: 'Principal & Leadership Message', category: 'About Us', desc: 'Academic leadership, vision for 21st century education', route: 'about' },
      { title: 'Pre-School & Kindergarten Wing', category: 'Academics', desc: 'Experiential early childhood education and foundational numeracy', route: 'academics' },
      { title: 'Primary Wing (Classes I - V)', category: 'Academics', desc: 'Holistic CBSE curriculum, integrated inquiry-based learning', route: 'academics' },
      { title: 'Middle School (Classes VI - VIII)', category: 'Academics', desc: 'STEM integration, languages, coding and science exploration', route: 'academics' },
      { title: 'Senior Secondary Science Stream', category: 'Academics', desc: 'Physics, Chemistry, Maths/Biology, Computer Science, JEE/NEET mentorship', route: 'academics' },
      { title: 'Senior Secondary Commerce Stream', category: 'Academics', desc: 'Accountancy, Economics, Business Studies, Applied Maths, CA foundation', route: 'academics' },
      { title: 'Senior Secondary Humanities & Arts', category: 'Academics', desc: 'Psychology, Political Science, History, Sociology, Global Studies', route: 'academics' },
      { title: 'Interactive 3D Virtual Campus Tour', category: 'Campus Life', desc: 'Explore 3D buildings, smart labs, sports arena, and library', route: 'campus-life' },
      { title: 'Dr. Kalam STEM & Robotics Lab', category: 'Campus Life', desc: 'Mechatronics, 3D printing, AI coding and IoT lab facilities', route: 'campus-life' },
      { title: 'Major Dhyan Chand Sports Arena', category: 'Campus Life', desc: 'Olympic-size swimming pool, synthetic turf football and cricket nets', route: 'campus-life' },
      { title: '100% CBSE Board Results & Toppers', category: 'Achievements', desc: 'Academic achievements, national rankings and board distinction list', route: 'achievements' },
      { title: 'National Olympiad Winners', category: 'Achievements', desc: 'Science, Mathematics and Cyber Olympiad medal winners', route: 'achievements' },
      { title: 'Student Clubs & Societies (18+ Clubs)', category: 'Beyond Classroom', desc: 'Robotics, Model UN, Debating, Theatre, Eco Warriors, Music', route: 'beyond-classroom' },
      { title: 'Contact Us & Campus Location', category: 'Contact', desc: 'Sector 62, Noida, phone directory and route directions', route: 'contact' },
      { title: 'Parents Portal Demo & Login', category: 'Portals', desc: 'Attendance, fee payment, report cards and live bus tracking', route: 'parents-portal' },
      { title: 'Mandatory CBSE Public Disclosures', category: 'Disclosures', desc: 'Affiliation certificate, building safety, fire safety NOC, SMC committee', route: 'mandatory-disclosures' }
    ];

    this.init();
  }

  init() {
    // Open trigger
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-open-search]')) {
        e.preventDefault();
        this.open();
      }
      if (e.target.closest('[data-close-search]')) {
        e.preventDefault();
        this.close();
      }
    });

    // Keyboard shortcut Cmd/Ctrl + K
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.toggle();
      }
    });

    const searchInput = document.getElementById('spotlight-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filter(e.target.value);
      });
    }

    // Result clicks
    document.addEventListener('click', (e) => {
      const item = e.target.closest('.search-result-item');
      if (item) {
        const route = item.getAttribute('data-route');
        const action = item.getAttribute('data-action');
        this.close();

        if (action === 'open-enquiry' && window.enquiryManager) {
          window.enquiryManager.openModal();
        } else if (action === 'download-prospectus' && window.enquiryManager) {
          window.enquiryManager.downloadProspectusMock();
        } else if (route && window.schoolRouter) {
          window.schoolRouter.navigate(route);
        }
      }
    });
  }

  toggle() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    if (modal.classList.contains('is-open')) this.close();
    else this.open();
  }

  open() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('spotlight-search-input');
    if (!modal) return;
    modal.classList.add('is-open');
    this.filter('');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 80);
    }
  }

  close() {
    const modal = document.getElementById('search-modal');
    if (modal) modal.classList.remove('is-open');
  }

  filter(query) {
    const container = document.getElementById('search-results-list');
    if (!container) return;

    const q = query.trim().toLowerCase();
    const results = q === '' 
      ? this.searchIndex.slice(0, 7)
      : this.searchIndex.filter(item => 
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );

    if (results.length === 0) {
      container.innerHTML = `
        <div class="search-empty-state">
          <div class="empty-icon">🔍</div>
          <div class="empty-title">No matching results found for "${query}"</div>
          <div class="empty-desc">Try searching for "Admissions", "Fees", "Curriculum", "Robotics", or "Contact"</div>
        </div>
      `;
      return;
    }

    container.innerHTML = results.map(item => `
      <div class="search-result-item" 
           data-route="${item.route || ''}" 
           data-action="${item.action || ''}">
        <div class="result-left">
          <span class="result-badge">${item.category}</span>
          <div class="result-title">${item.title}</div>
          <div class="result-desc">${item.desc}</div>
        </div>
        <div class="result-arrow">→</div>
      </div>
    `).join('');
  }
}

window.SpotlightSearch = SpotlightSearch;
