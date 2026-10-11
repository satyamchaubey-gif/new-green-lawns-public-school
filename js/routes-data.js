/**
 * Page Templates and Route Registrations for New Green Lawns Public School
 * Contains full HTML generators for Home (pixel-accurate to uploaded design),
 * About Us, Academics, Admissions, Campus Life (3D Tour), Achievements,
 * Beyond Classroom, Contact Us, Parents Portal, and Mandatory Disclosures.
 */

function registerAllSchoolRoutes(router) {

  // ==========================================
  // 1. HOME PAGE (MATCHING UPLOADED DESIGN)
  // ==========================================
  router.registerRoute('home', () => `
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="site-container hero-grid">
        <!-- Hero Left Column: Copy & Actions -->
        <div class="hero-content">
          <div class="hero-kicker-badge">
            <span class="kicker-leaf">🌿</span>
            WELCOME TO NEW GREEN LAWNS PUBLIC SCHOOL
          </div>
          <h1 class="hero-headline">
            Where Every Child’s<br>
            <span class="hero-headline-highlight">Potential Takes Flight.</span>
          </h1>
          <p class="hero-subtext">
            Nurturing future-ready leaders, thinkers, and innovators through a balanced and holistic CBSE education since 1994.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" data-open-enquiry>
              <span>Admissions Enquiry</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button class="btn btn-outline btn-lg" onclick="window.schoolRouter.navigate('campus-life')">
              <span>Explore Campus</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            </button>
          </div>

          <!-- Quick Trust Badges -->
          <div class="hero-trust-bar">
            <div class="trust-item">
              <span class="trust-icon">🏅</span>
              <span>CBSE Affiliated (Pre-School to XII)</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <span class="trust-icon">🌱</span>
              <span>4+ Acre Green Eco-Campus</span>
            </div>
          </div>
        </div>

        <!-- Hero Right Column: 3D Armillary Rings & Visual Art -->
        <div class="hero-visual-wrapper">
          <div class="hero-canvas-container">
            <!-- 3D Interactive WebGL Canvas -->
            <canvas id="hero-3d-canvas" class="hero-3d-canvas"></canvas>
            
            <!-- Concentric Botanical & Architectural SVG Rings (Matching Artwork) -->
            <div class="hero-art-backdrop">
              <svg viewBox="0 0 500 500" class="hero-rings-svg">
                <!-- Outer Concentric Golden Ring Arc -->
                <circle cx="250" cy="250" r="210" fill="none" stroke="rgba(212, 175, 55, 0.4)" stroke-width="1.5" stroke-dasharray="4 6"/>
                <circle cx="250" cy="250" r="185" fill="none" stroke="rgba(18, 67, 45, 0.25)" stroke-width="2"/>
                <!-- Deep Forest Green Botanical Crescent Shape -->
                <path d="M 120 70 A 200 200 0 0 1 430 330 A 185 185 0 0 0 120 70 Z" fill="#123d29" opacity="0.95"/>
                <!-- Soft Champagne Arc -->
                <path d="M 250 140 A 130 130 0 0 1 380 270 L 250 250 Z" fill="#dfb76c" opacity="0.75"/>
                <!-- Geometric Leaf Silhouette (Foliage Motif) -->
                <g transform="translate(180, 270) scale(0.9)" fill="#235c3e">
                  <path d="M 50 120 C 50 70, 90 40, 120 10 C 150 40, 190 70, 190 120 C 190 160, 150 180, 120 180 C 90 180, 50 160, 50 120 Z"/>
                  <line x1="120" y1="20" x2="120" y2="180" stroke="#dfb76c" stroke-width="2.5"/>
                  <line x1="120" y1="60" x2="160" y2="40" stroke="#dfb76c" stroke-width="2"/>
                  <line x1="120" y1="90" x2="80" y2="70" stroke="#dfb76c" stroke-width="2"/>
                  <line x1="120" y1="120" x2="165" y2="105" stroke="#dfb76c" stroke-width="2"/>
                  <line x1="120" y1="150" x2="75" y2="135" stroke="#dfb76c" stroke-width="2"/>
                </g>
              </svg>
            </div>

            <!-- Floating 3D Metric Card 1: 30+ Years of Excellence -->
            <div class="metric-card metric-card-top card-3d-tilt">
              <div class="metric-value">30+</div>
              <div class="metric-label">Years of<br>Excellence</div>
            </div>

            <!-- Floating 3D Metric Card 2: 100% Academic Success -->
            <div class="metric-card metric-card-bottom card-3d-tilt">
              <div class="metric-value">100%</div>
              <div class="metric-label">Academic<br>Success</div>
            </div>

            <!-- Interactive 3D Cursor Tip -->
            <div class="canvas-3d-hint">
              <span class="hint-dot"></span>
              Interactive 3D Armillary Canvas (Move Cursor / Touch to Rotate)
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2 & 3: TWO-COLUMN MAIN CONTENT (MATCHING UPLOADED IMAGE) -->
    <section class="split-section">
      <div class="site-container split-grid">
        
        <!-- LEFT COLUMN: NURTURING MINDS + THE PILLARS OF OUR EDUCATION -->
        <div class="col-left">
          
          <!-- Top Feature: 3D Stacked Cards & Overview -->
          <div class="stacked-feature-wrap">
            <!-- 3D Layered Cards Graphic (LEARN. LEAD. EXCEL.) -->
            <div class="stacked-cards-stage">
              <div class="legacy-card-stack card-3d-tilt">
                <div class="stack-card stack-card-back"></div>
                <div class="stack-card stack-card-middle"></div>
                <div class="stack-card stack-card-front">
                  <div class="stack-card-border"></div>
                  <div class="stack-card-content">
                    <span class="stack-word">LEARN.</span>
                    <span class="stack-word">LEAD.</span>
                    <span class="stack-word highlight">EXCEL.</span>
                  </div>
                  <div class="stack-card-corner-motif"></div>
                </div>
              </div>
            </div>

            <!-- Content beside/below cards -->
            <div class="nurturing-content">
              <h2 class="section-heading">Nurturing Minds, Shaping Futures</h2>
              <p class="section-paragraph">
                New Green Lawns Public School's heritage in holistic and exemplary education affiliated to CBSE, New Green Lawns, and team focus on synthetic 21st-century growth, focusing on holistic 21st-century growth and compassion.
              </p>
              <blockquote class="featured-quote">
                “A tradition of excellence, a vision for the future.”
              </blockquote>
              <a href="#/about" class="text-link-arrow">
                <span>Discover Our School</span>
                <span class="arrow">→</span>
              </a>
            </div>
          </div>

          <!-- SUB-SECTION: OUR FOUNDATIONS / THE PILLARS OF OUR EDUCATION -->
          <div class="pillars-section">
            <div class="kicker-gold">OUR FOUNDATIONS</div>
            <h3 class="pillars-heading">The Pillars of Our Education</h3>

            <!-- 2x2 Grid of Framed Cards Matching Image -->
            <div class="pillars-grid">
              
              <!-- Pillar 1: Academic Excellence -->
              <div class="pillar-card card-3d-tilt">
                <div class="pillar-icon-box">
                  <!-- Sprout / Book Icon -->
                  <svg viewBox="0 0 48 48" class="pillar-svg">
                    <path d="M24 8 C16 12 10 18 10 28 C10 36 18 42 24 42 C30 42 38 36 38 28 C38 18 32 12 24 8 Z" fill="none" stroke="#12432d" stroke-width="2.5"/>
                    <path d="M24 16 L24 38" stroke="#12432d" stroke-width="2"/>
                    <path d="M24 24 C28 22 33 24 35 28" stroke="#12432d" stroke-width="2"/>
                    <path d="M24 28 C20 26 15 28 13 32" stroke="#12432d" stroke-width="2"/>
                    <circle cx="24" cy="12" r="3" fill="#dfb76c"/>
                  </svg>
                </div>
                <h4 class="pillar-title">Academic Excellence</h4>
                <p class="pillar-desc">Cast on CBSE curriculum, critical thinking, and stellar results.</p>
              </div>

              <!-- Pillar 2: Holistic Development -->
              <div class="pillar-card card-3d-tilt">
                <div class="pillar-icon-box">
                  <!-- Lotus / Sunburst Trophy Icon -->
                  <svg viewBox="0 0 48 48" class="pillar-svg">
                    <circle cx="24" cy="24" r="8" fill="none" stroke="#cfa64f" stroke-width="2.5"/>
                    <path d="M24 6 L24 12 M24 36 L24 42 M6 24 L12 24 M36 24 L42 24" stroke="#cfa64f" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M11 11 L16 16 M32 32 L37 37 M11 37 L16 32 M32 16 L37 11" stroke="#cfa64f" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="24" cy="24" r="4" fill="#12432d"/>
                  </svg>
                </div>
                <h4 class="pillar-title">Holistic Development</h4>
                <p class="pillar-desc">On sports, arts, performing arts, and physical well-being.</p>
              </div>

              <!-- Pillar 3: Innovation & Discovery -->
              <div class="pillar-card card-3d-tilt">
                <div class="pillar-icon-box">
                  <!-- Compass / Gyroscope STEM Icon -->
                  <svg viewBox="0 0 48 48" class="pillar-svg">
                    <circle cx="24" cy="24" r="16" fill="none" stroke="#1d6448" stroke-width="2.5"/>
                    <polygon points="24,13 28,24 24,35 20,24" fill="#dfb76c" stroke="#1d6448" stroke-width="1.5"/>
                    <circle cx="24" cy="24" r="2.5" fill="#ffffff"/>
                    <line x1="24" y1="4" x2="24" y2="8" stroke="#1d6448" stroke-width="2"/>
                    <line x1="24" y1="40" x2="24" y2="44" stroke="#1d6448" stroke-width="2"/>
                  </svg>
                </div>
                <h4 class="pillar-title">Innovation & Discovery</h4>
                <p class="pillar-desc">STEM, robotics, digital literacy, and experiential learning.</p>
              </div>

              <!-- Pillar 4: Values & Character -->
              <div class="pillar-card card-3d-tilt">
                <div class="pillar-icon-box">
                  <!-- Shield Checkmark Icon -->
                  <svg viewBox="0 0 48 48" class="pillar-svg">
                    <path d="M24 6 L38 12 V24 C38 33 24 41 24 41 C24 41 10 33 10 24 V12 Z" fill="none" stroke="#2a7752" stroke-width="2.5"/>
                    <path d="M17 23 L22 28 L31 18" fill="none" stroke="#2a7752" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h4 class="pillar-title">Values & Character</h4>
                <p class="pillar-desc">On ethics, global citizenship, community service, and leadership.</p>
              </div>

            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: DISCOVER LIFE AT NEW GREEN LAWNS (6 CARDS IN 3x2 GRID) -->
        <div class="col-right">
          <div class="kicker-gold">EXPERIENCE OUR CAMPUS</div>
          <h2 class="section-heading">Discover Life at New Green Lawns</h2>

          <div class="discover-grid">
            
            <!-- Card 1: Academics (Pre-School to XII) - Deep Green Botanical -->
            <div class="discover-card card-pattern-green card-3d-tilt" onclick="window.schoolRouter.navigate('academics')">
              <div class="card-bg-overlay"></div>
              <div class="card-inner">
                <h3 class="card-title-light">Academics<br>(Pre-School to XII)</h3>
                <p class="card-subtitle-gold">Highlighting curriculum streams</p>
                <div class="card-badge-pill">Curriculum Streams ➔</div>
              </div>
            </div>

            <!-- Card 2: World-Class Facilities - Warm Clean Card -->
            <div class="discover-card card-clean-warm card-3d-tilt" onclick="window.schoolRouter.navigate('campus-life')">
              <div class="card-inner">
                <div class="clean-icon-pill">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b08b39" stroke-width="2"><path d="M3 21h18M5 21V7l8-4v18M13 11h4v10M9 9h1M9 13h1M9 17h1"/></svg>
                </div>
                <h3 class="card-title-dark">World-Class Facilities</h3>
                <p class="card-text-muted">Smart labs, library, and Innovation Labs, Sports complex.</p>
              </div>
            </div>

            <!-- Card 3: Life Beyond Classroom - Deep Navy/Teal Gradient -->
            <div class="discover-card card-gradient-navy card-3d-tilt" onclick="window.schoolRouter.navigate('beyond-classroom')">
              <div class="card-inner">
                <h3 class="card-title-light">Life Beyond Classroom</h3>
                <p class="card-text-teal">Clubs, model UN, and activities.</p>
                <div class="card-bullet-text">Excursions and activities.</div>
              </div>
            </div>

            <!-- Card 4: Life Beyond Classroom (Co-Curricular) - Deep Emerald Gradient -->
            <div class="discover-card card-gradient-emerald card-3d-tilt" onclick="window.schoolRouter.navigate('beyond-classroom')">
              <div class="card-inner">
                <h3 class="card-title-light">Life Beyond Classroom</h3>
                <ul class="mini-bullet-list">
                  <li>Clubs</li>
                  <li>Excursions</li>
                  <li>Activities</li>
                  <li>Sports & Clara Activities</li>
                </ul>
              </div>
            </div>

            <!-- Card 5: Admissions Journey - Interactive Stepper Flow -->
            <div class="discover-card card-clean-warm card-journey card-3d-tilt" onclick="window.schoolRouter.navigate('admissions')">
              <div class="card-inner">
                <h3 class="card-title-dark">Admissions Journey</h3>
                <div class="journey-stepper">
                  <div class="journey-step-btn">Registration</div>
                  <div class="journey-arrow">↓</div>
                  <div class="journey-step-btn">Verification</div>
                  <div class="journey-arrow">↓</div>
                  <div class="journey-step-btn btn-enroll-solid">Enrollment</div>
                </div>
              </div>
            </div>

            <!-- Card 6: Achievements & Accolades - Clean Crisp Typography -->
            <div class="discover-card card-clean-warm card-3d-tilt" onclick="window.schoolRouter.navigate('achievements')">
              <div class="card-inner">
                <h3 class="card-title-dark">Achievements & Accolades</h3>
                <p class="card-text-muted">100% board results and high ranking.</p>
                <div class="card-highlight-badge">National championship highlights</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 4: CALLOUT BANNER - "JOIN OUR LEGACY" (MATCHING UPLOADED IMAGE) -->
    <section class="legacy-banner-section">
      <div class="site-container">
        <div class="legacy-banner-box">
          
          <!-- Ornate Vintage Gold Filigree Frame -->
          <div class="filigree-corner top-left"></div>
          <div class="filigree-corner top-right"></div>
          <div class="filigree-corner bottom-left"></div>
          <div class="filigree-corner bottom-right"></div>

          <div class="legacy-banner-grid">
            
            <!-- Left Info Column -->
            <div class="legacy-info-col">
              <h2 class="legacy-title">Join Our Legacy</h2>
              <p class="legacy-subtitle">Admissions Open for Academic Session 2026-2027</p>
              
              <div class="legacy-features-list">
                <div class="feat-check-item">
                  <span class="feat-check">✓</span>
                  <span>CBSE Curriculum</span>
                </div>
                <div class="feat-check-item">
                  <span class="feat-check">✓</span>
                  <span>State-of-the-art Labs</span>
                </div>
                <div class="feat-check-item">
                  <span class="feat-check">✓</span>
                  <span>Eco-friendly Campus</span>
                </div>
              </div>

              <div class="legacy-action-buttons">
                <button class="btn btn-gold btn-md" data-open-enquiry>
                  Apply Online Now
                </button>
                <button class="btn btn-white-solid btn-md" data-download-prospectus>
                  Request Prospectus
                </button>
              </div>
            </div>

            <!-- Right Fast Enquiry Card -->
            <div class="legacy-enquiry-card card-3d-tilt">
              <div class="fast-enquiry-header">
                <h3>Enquire Now</h3>
                <span class="fast-enquiry-sub">Fast-track admission consultation</span>
              </div>
              <form id="quick-enquiry-form" class="fast-enquiry-form">
                <div class="form-group-fast">
                  <input type="text" name="name" placeholder="Name" class="fast-input" required />
                </div>
                <div class="form-group-fast">
                  <input type="email" name="email" placeholder="Email" class="fast-input" required />
                </div>
                <div class="form-group-fast">
                  <input type="tel" name="phone" placeholder="Phone Number" class="fast-input" required />
                </div>
                <div class="form-group-fast">
                  <select name="grade" class="fast-input fast-select">
                    <option value="Pre-Nursery">Pre-Nursery / Nursery / KG</option>
                    <option value="Class I-V">Primary Wing (Classes I - V)</option>
                    <option value="Class VI-VIII">Middle Wing (Classes VI - VIII)</option>
                    <option value="Class IX-X">Secondary (Classes IX - X)</option>
                    <option value="Class XI-XII Science">Senior Secondary (Science)</option>
                    <option value="Class XI-XII Commerce">Senior Secondary (Commerce/Humanities)</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-fast-enquire">
                  Enquire Now
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  `);

  // ==========================================
  // 2. ABOUT US PAGE
  // ==========================================
  router.registerRoute('about', () => `
    <div class="page-header-banner">
      <div class="site-container">
        <div class="page-kicker">OUR 30-YEAR HERITAGE</div>
        <h1 class="page-title">About New Green Lawns Public School</h1>
        <p class="page-subtitle">A tradition of academic distinction, holistic human values, and transformative leadership since 1994.</p>
      </div>
    </div>

    <section class="page-content-section">
      <div class="site-container">
        
        <!-- Principal's Message & Legacy Split -->
        <div class="about-lead-grid">
          <div class="lead-text-box">
            <h2 class="sub-heading-serif">Principal's Address</h2>
            <div class="quote-box-gold">
              “Education is not merely the transmission of textbook syllabus, but the ignition of intellect, character, and ethical purpose.”
            </div>
            <p class="text-body">
              Founded in 1994 in the heart of Sector 62, Noida, New Green Lawns Public School was envisioned as a beacon of forward-looking, values-rooted education. Over the past three decades, we have continuously reinvented pedagogical practices, establishing world-class smart laboratories, Olympic-grade sports infrastructure, and comprehensive STEM curricula.
            </p>
            <p class="text-body">
              Our alumni walk the corridors of the world’s most prestigious institutions — from IITs, AIIMS, and IIMs to Oxford, Cambridge, and Stanford — carrying with them the indelible values of humility, perseverance, and intellectual courage.
            </p>
            <div class="principal-sign-box">
              <div class="principal-name">Dr. Rajeshwari Menon, Ph.D.</div>
              <div class="principal-title">Principal & Director of Academics | CBSE National Awardee</div>
            </div>
          </div>

          <div class="lead-metrics-card card-3d-tilt">
            <h3 class="metrics-card-title">School at a Glance</h3>
            <div class="about-stats-list">
              <div class="about-stat-row">
                <div class="stat-number">1994</div>
                <div class="stat-desc">Year of Foundation in Noida</div>
              </div>
              <div class="about-stat-row">
                <div class="stat-number">2,400+</div>
                <div class="stat-desc">Scholars from Pre-School to Class XII</div>
              </div>
              <div class="about-stat-row">
                <div class="stat-number">140+</div>
                <div class="stat-desc">Certified & Experienced Faculty Members</div>
              </div>
              <div class="about-stat-row">
                <div class="stat-number">1:18</div>
                <div class="stat-desc">Student-Teacher Mentorship Ratio</div>
              </div>
              <div class="about-stat-row">
                <div class="stat-number">100%</div>
                <div class="stat-desc">CBSE Board Examination Pass Rate</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vision, Mission & Core Values -->
        <div class="vision-mission-cards">
          <div class="vm-card card-3d-tilt">
            <div class="vm-icon">🔭</div>
            <h3>Our Vision</h3>
            <p>To be an institution of global distinction that nurtures visionary leaders, critical thinkers, and empathetic global citizens equipped to excel in an interconnected 21st-century world.</p>
          </div>
          <div class="vm-card card-3d-tilt">
            <div class="vm-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To cultivate academic rigour, scientific curiosity, artistic expression, physical vitality, and moral integrity through experiential, personalized, and technology-empowered learning environments.</p>
          </div>
          <div class="vm-card card-3d-tilt">
            <div class="vm-icon">⚖️</div>
            <h3>Core Values</h3>
            <p>Integrity (Satya), Perseverance (Nishtha), Excellence (Shreshthata), and Compassion (Karuna). We instill ethical leadership and environmental stewardship in every student.</p>
          </div>
        </div>

        <!-- 30-Year Milestones Timeline -->
        <div class="timeline-container">
          <div class="kicker-gold text-center">JOURNEY OF EXCELLENCE</div>
          <h2 class="sub-heading-serif text-center">Three Decades of Milestones</h2>
          
          <div class="timeline-steps">
            <div class="t-step">
              <div class="t-year">1994</div>
              <div class="t-desc">Inception of New Green Lawns Public School with 120 foundational students.</div>
            </div>
            <div class="t-step">
              <div class="t-year">2002</div>
              <div class="t-desc">CBSE Senior Secondary Affiliation granted for Science, Commerce, and Humanities.</div>
            </div>
            <div class="t-step">
              <div class="t-year">2012</div>
              <div class="t-desc">Inauguration of Olympic Swimming Complex and Dr. Kalam Innovation Centre.</div>
            </div>
            <div class="t-step">
              <div class="t-year">2020</div>
              <div class="t-desc">Complete digital smart classroom transformation and Atal Tinkering Lab setup.</div>
            </div>
            <div class="t-step highlight">
              <div class="t-year">2026</div>
              <div class="t-desc">Celebrating 30+ Years of Excellence and launching the 2026-27 Academic Horizon.</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `);

  // ==========================================
  // 3. ACADEMICS PAGE
  // ==========================================
  router.registerRoute('academics', () => `
    <div class="page-header-banner">
      <div class="site-container">
        <div class="page-kicker">RIGOUR & INQUIRY</div>
        <h1 class="page-title">Academic Wings & Curriculum</h1>
        <p class="page-subtitle">A seamless educational continuum from Pre-School foundational play to Senior Secondary excellence.</p>
      </div>
    </div>

    <section class="page-content-section">
      <div class="site-container">
        
        <!-- Academic Wings Grid -->
        <div class="wings-grid">
          
          <!-- Wing 1 -->
          <div class="wing-card card-3d-tilt">
            <div class="wing-badge">Stage 1</div>
            <h3>Pre-School & Kindergarten</h3>
            <div class="wing-classes">Pre-Nursery, Nursery, Kindergarten (Ages 3 - 6)</div>
            <p>Guided by NEP 2020 Foundational Stage guidelines. Blends Montessori tactile learning, Jolly Phonics, early mathematical concepts, creative expression, and social-emotional development in safe, joyful activity hubs.</p>
            <ul class="wing-features">
              <li>✓ Phonics & Multilingual Storytelling</li>
              <li>✓ Tactile Math & Sensorial Play</li>
              <li>✓ Fine & Gross Motor Play Gym</li>
            </ul>
          </div>

          <!-- Wing 2 -->
          <div class="wing-card card-3d-tilt">
            <div class="wing-badge">Stage 2</div>
            <h3>Primary Wing</h3>
            <div class="wing-classes">Classes I to V (Ages 6 - 11)</div>
            <p>Emphasis on conceptual clarity, experiential science projects, foundational English fluency, mental arithmetic, and creative arts. Introduces coding logic and hands-on environmental awareness.</p>
            <ul class="wing-features">
              <li>✓ Integrated STEM & Robotics Discovery</li>
              <li>✓ Second Language Options (Hindi, French, Sanskrit)</li>
              <li>✓ Reading Circles & Drama in Education</li>
            </ul>
          </div>

          <!-- Wing 3 -->
          <div class="wing-card card-3d-tilt">
            <div class="wing-badge">Stage 3</div>
            <h3>Middle School</h3>
            <div class="wing-classes">Classes VI to VIII (Ages 11 - 14)</div>
            <p>Subject-specific laboratories, mathematical olympiad training, Model United Nations, robotics kits, and design thinking. Students develop analytical writing, debating, and collaborative teamwork.</p>
            <ul class="wing-features">
              <li>✓ Laboratory Experiments in Physics, Chem, Bio</li>
              <li>✓ Python Programming & Web Fundamentals</li>
              <li>✓ Inter-School Debate & Sports Leagues</li>
            </ul>
          </div>

          <!-- Wing 4 -->
          <div class="wing-card card-3d-tilt highlight-wing">
            <div class="wing-badge">Stage 4</div>
            <h3>Senior Secondary Wing</h3>
            <div class="wing-classes">Classes IX to XII (Ages 14 - 18)</div>
            <p>Comprehensive preparation for CBSE Board Examinations and competitive entrance examinations (JEE, NEET, CUET, CLAT, NID). Rigorous subject specialization with personalized faculty mentoring.</p>
            <ul class="wing-features">
              <li>✓ Science (Medical / Non-Medical with AI/Bio)</li>
              <li>✓ Commerce (Accountancy, Economics, Applied Math)</li>
              <li>✓ Humanities (Psychology, Pol Science, Sociology)</li>
            </ul>
          </div>

        </div>

        <!-- Curriculum Streams Deep-Dive -->
        <div class="curriculum-streams-wrap">
          <div class="kicker-gold text-center">SENIOR SECONDARY CHOICES</div>
          <h2 class="sub-heading-serif text-center">Senior Secondary Academic Streams (Class XI & XII)</h2>

          <div class="streams-table-box">
            <div class="stream-box">
              <div class="stream-header-green">
                <h4>🔬 Science Stream</h4>
                <span>Engineering & Medical Pathways</span>
              </div>
              <div class="stream-body">
                <div class="stream-subject"><strong>Compulsory:</strong> English Core, Physics, Chemistry</div>
                <div class="stream-subject"><strong>Electives (Medical):</strong> Biology, Psychology, Physical Education</div>
                <div class="stream-subject"><strong>Electives (Non-Med):</strong> Mathematics, Computer Science (Python), Biotech</div>
                <div class="stream-meta">Integrated JEE / NEET Mock Test Series & Lab Practicals</div>
              </div>
            </div>

            <div class="stream-box">
              <div class="stream-header-gold">
                <h4>📊 Commerce Stream</h4>
                <span>Finance, Management & Law Pathways</span>
              </div>
              <div class="stream-body">
                <div class="stream-subject"><strong>Compulsory:</strong> English Core, Accountancy, Business Studies, Economics</div>
                <div class="stream-subject"><strong>Electives:</strong> Applied Mathematics, Entrepreneurship, Informatics Practices</div>
                <div class="stream-meta">Mock Stock Exchanges, Industrial Visits & CA Foundation Orientation</div>
              </div>
            </div>

            <div class="stream-box">
              <div class="stream-header-navy">
                <h4>🏛️ Humanities Stream</h4>
                <span>Civil Services, Journalism & Social Sciences</span>
              </div>
              <div class="stream-body">
                <div class="stream-subject"><strong>Compulsory:</strong> English Core, Political Science, History / Psychology</div>
                <div class="stream-subject"><strong>Electives:</strong> Sociology, Economics, Fine Arts, Legal Studies</div>
                <div class="stream-meta">Policy Debates, Archival Research Projects & Model UN Specialization</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Download Syllabus & Brochure CTA -->
        <div class="academic-cta-card">
          <div class="cta-left">
            <h3>Download Complete Academic Curriculum & Booklists</h3>
            <p>Access the detailed syllabus breakdown, examination schedule, and list of recommended texts for Academic Year 2026-27.</p>
          </div>
          <div class="cta-right">
            <button class="btn btn-gold btn-md" data-download-prospectus>Download Academic Prospectus</button>
          </div>
        </div>

      </div>
    </section>
  `);

  // ==========================================
  // 4. ADMISSIONS PAGE & FEE CALCULATOR
  // ==========================================
  router.registerRoute('admissions', () => `
    <div class="page-header-banner">
      <div class="site-container">
        <div class="page-kicker">SESSION 2026-2027</div>
        <h1 class="page-title">Admissions Guide & Application</h1>
        <p class="page-subtitle">Welcome to the New Green Lawns family. Transparent procedures, merit-centric criteria, and dedicated counsellor assistance.</p>
      </div>
    </div>

    <section class="page-content-section">
      <div class="site-container">
        
        <!-- Step-by-Step Stepper -->
        <div class="admission-journey-full">
          <div class="kicker-gold text-center">THE ENROLLMENT PROCESS</div>
          <h2 class="sub-heading-serif text-center">Five Steps to Joining Our Legacy</h2>

          <div class="stepper-horizontal">
            <div class="step-card">
              <div class="step-num">01</div>
              <h4>Online Enquiry</h4>
              <p>Submit basic candidate information online or visit the Admissions Desk.</p>
            </div>
            <div class="step-card">
              <div class="step-num">02</div>
              <h4>Campus Tour</h4>
              <p>Personalized walk through labs, sports arena, and interaction with faculty.</p>
            </div>
            <div class="step-card">
              <div class="step-num">03</div>
              <h4>Interaction</h4>
              <p>Joyful informal conversation for Pre-Primary; baseline aptitude review for Grades I-XI.</p>
            </div>
            <div class="step-card">
              <div class="step-num">04</div>
              <h4>Offer & Docs</h4>
              <p>Verification of Birth Certificate, Transfer Certificate, and Report Cards.</p>
            </div>
            <div class="step-card">
              <div class="step-num">05</div>
              <h4>Enrollment</h4>
              <p>Fee payment, allotment of Student ID, uniform kit, and school transport route.</p>
            </div>
          </div>
        </div>

        <!-- INTERACTIVE FEE CALCULATOR -->
        <div class="fee-calculator-wrapper">
          <div class="fee-calc-header">
            <div class="kicker-gold">FINANCIAL TRANSPARENCY</div>
            <h2 class="sub-heading-serif">Interactive Fee Calculator (Session 2026-27)</h2>
            <p>Estimate quarterly and annual tuition, lab charges, transport, and sibling concessions dynamically.</p>
          </div>

          <div class="fee-calc-grid">
            <!-- Form Controls Left -->
            <div class="fee-calc-inputs">
              <div class="form-group">
                <label for="calc-grade">Select Class / Academic Wing:</label>
                <select id="calc-grade" class="calc-select">
                  <option value="prenursery">Pre-Nursery / Nursery / KG</option>
                  <option value="primary" selected>Primary Wing (Classes I - V)</option>
                  <option value="middle">Middle Wing (Classes VI - VIII)</option>
                  <option value="secondary">Secondary Wing (Classes IX - X)</option>
                  <option value="senior-sci">Senior Secondary Science (Classes XI - XII)</option>
                  <option value="senior-com">Senior Secondary Commerce / Arts (Classes XI - XII)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="calc-transport">School Transport Facility:</label>
                <select id="calc-transport" class="calc-select">
                  <option value="none">Self Commute (No School Bus)</option>
                  <option value="zone1" selected>Zone 1 (Within 5 km radius of Sector 62)</option>
                  <option value="zone2">Zone 2 (5 km - 10 km radius: Indirapuram / Noida Ext.)</option>
                  <option value="zone3">Zone 3 (10+ km: Greater Noida / Mayur Vihar)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="calc-sibling">Sibling Concession:</label>
                <select id="calc-sibling" class="calc-select">
                  <option value="0">No Sibling Enrolled</option>
                  <option value="0.15">2nd Child (15% Tuition Concession)</option>
                  <option value="0.25">3rd Child (25% Tuition Concession)</option>
                </select>
              </div>

              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" id="calc-meal" />
                  <span>Opt for Nutritious Cafeteria Hot Lunch Program (+₹18,000 / year)</span>
                </label>
              </div>
            </div>

            <!-- Calculated Breakdown Right -->
            <div class="fee-calc-results card-3d-tilt">
              <h3 class="results-title">Estimated Fee Summary</h3>
              <div class="results-list">
                <div class="res-row">
                  <span>Annual Tuition Fee:</span>
                  <strong id="fee-tuition">₹76,000</strong>
                </div>
                <div class="res-row">
                  <span>Activity & Digital Learning:</span>
                  <strong id="fee-activity">₹14,000</strong>
                </div>
                <div class="res-row">
                  <span>STEM & Science Lab Fee:</span>
                  <strong id="fee-lab">₹4,000</strong>
                </div>
                <div class="res-row">
                  <span>One-time Admission Fee:</span>
                  <strong id="fee-admission">₹25,000</strong>
                </div>
                <div class="res-row">
                  <span>Caution Deposit:</span>
                  <strong id="fee-caution">₹10,000 (Refundable)</strong>
                </div>
                <div class="res-row">
                  <span>School Transport Fee:</span>
                  <strong id="fee-transport">₹22,000</strong>
                </div>
                <div class="res-row">
                  <span>Nutritious Lunch Program:</span>
                  <strong id="fee-meal">Not Opted</strong>
                </div>
                <div class="res-row discount-row" id="fee-concession-item" style="display: none;">
                  <span>Sibling Concession Applied:</span>
                  <strong id="fee-concession">- ₹0</strong>
                </div>
              </div>

              <div class="res-total-box">
                <div class="total-row">
                  <span>Total Payable (Annual):</span>
                  <span class="total-amount" id="fee-annual-total">₹151,000</span>
                </div>
                <div class="quarter-row">
                  <span>Estimated Quarterly Fee:</span>
                  <span class="quarter-amount" id="fee-quarterly-total">₹29,000 / Qtr</span>
                </div>
              </div>

              <button class="btn btn-gold btn-block" data-open-enquiry>Proceed with Enquiry ➔</button>
            </div>
          </div>
        </div>

        <!-- FULL ONLINE ADMISSION APPLICATION FORM -->
        <div class="full-application-form-box">
          <div class="kicker-gold text-center">APPLY DIRECTLY</div>
          <h2 class="sub-heading-serif text-center">Online Admission Application Form (2026-27)</h2>
          <p class="text-center text-muted">Fill out the detailed application form below to register your candidate directly with our Admissions Office.</p>

          <form id="full-admission-form" class="application-form">
            <div class="form-section-title">1. Candidate Information</div>
            <div class="form-row-2">
              <div class="form-group">
                <label>Student's Full Name *</label>
                <input type="text" name="student_name" class="calc-select" required placeholder="e.g. Aarav Sharma" />
              </div>
              <div class="form-group">
                <label>Date of Birth *</label>
                <input type="date" name="dob" class="calc-select" required />
              </div>
            </div>

            <div class="form-row-3">
              <div class="form-group">
                <label>Gender *</label>
                <select name="gender" class="calc-select" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label>Applying for Grade *</label>
                <select name="grade_applied" class="calc-select" required>
                  <option value="Pre-Nursery">Pre-Nursery</option>
                  <option value="Nursery">Nursery</option>
                  <option value="KG">Kindergarten</option>
                  <option value="Class 1">Class I</option>
                  <option value="Class 2">Class II</option>
                  <option value="Class 3">Class III</option>
                  <option value="Class 4">Class IV</option>
                  <option value="Class 5">Class V</option>
                  <option value="Class 6">Class VI</option>
                  <option value="Class 7">Class VII</option>
                  <option value="Class 8">Class VIII</option>
                  <option value="Class 9">Class IX</option>
                  <option value="Class 11 Science">Class XI (Science)</option>
                  <option value="Class 11 Commerce">Class XI (Commerce)</option>
                  <option value="Class 11 Humanities">Class XI (Humanities)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Current School & Board</label>
                <input type="text" name="prev_school" class="calc-select" placeholder="Previous school name if any" />
              </div>
            </div>

            <div class="form-section-title">2. Parent / Guardian Details</div>
            <div class="form-row-2">
              <div class="form-group">
                <label>Father's / Guardian's Full Name *</label>
                <input type="text" name="father_name" class="calc-select" required placeholder="Full Name" />
              </div>
              <div class="form-group">
                <label>Mother's Full Name *</label>
                <input type="text" name="mother_name" class="calc-select" required placeholder="Full Name" />
              </div>
            </div>

            <div class="form-row-3">
              <div class="form-group">
                <label>Contact Mobile Number *</label>
                <input type="tel" name="phone" class="calc-select" required placeholder="+91 98765 43210" />
              </div>
              <div class="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" class="calc-select" required placeholder="parent@example.com" />
              </div>
              <div class="form-group">
                <label>Residential City / Sector *</label>
                <input type="text" name="address" class="calc-select" required placeholder="Sector 62, Noida" />
              </div>
            </div>

            <div class="form-submit-row">
              <button type="submit" class="btn btn-primary btn-lg">
                Submit Online Application Form ➔
              </button>
            </div>
          </form>

          <!-- Success Alert Box (Initially Hidden) -->
          <div id="application-success-box" class="app-success-box" style="display: none;">
            <div class="app-success-badge">✓ Application Registered Successfully</div>
            <h3>Registration Confirmation</h3>
            <p>Your online application has been generated with registration code: <strong id="app-generated-number" class="code-highlight">ADM-2026-92817</strong></p>
            <p>An official confirmation has been logged. Our admissions officer will get in touch to schedule your interaction date.</p>
            <button class="btn btn-gold btn-md" data-download-prospectus>Download Application Acknowledgement & Prospectus</button>
          </div>
        </div>

      </div>
    </section>
  `);

  // ==========================================
  // 5. CAMPUS LIFE & 3D VIRTUAL TOUR PAGE
  // ==========================================
  router.registerRoute('campus-life', () => `
    <div class="page-header-banner">
      <div class="site-container">
        <div class="page-kicker">INTERACTIVE 3D TOUR</div>
        <h1 class="page-title">Campus Life & 3D Virtual Explorer</h1>
        <p class="page-subtitle">Experience our 4-acre verdant campus with our interactive 3D model. Click on any facility to view details, equipment, and photos.</p>
      </div>
    </div>

    <section class="page-content-section">
      <div class="site-container">
        
        <!-- 3D VIRTUAL CAMPUS VIEWER BOX -->
        <div class="campus-3d-box" id="campus-3d-wrapper">
          <div class="campus-3d-toolbar">
            <div class="toolbar-left">
              <span class="toolbar-status">🟢 3D Real-Time Campus Simulation</span>
              <span class="toolbar-tip">Drag to orbit 360° | Scroll / Pinch to zoom | Click pins to inspect</span>
            </div>
            <div class="toolbar-right">
              <button class="btn-tool" onclick="if(window.campus3DInstance) window.campus3DInstance.setTimeOfDay('day')">☀️ Day</button>
              <button class="btn-tool" onclick="if(window.campus3DInstance) window.campus3DInstance.setTimeOfDay('golden')">🌅 Sunset</button>
              <button class="btn-tool" onclick="if(window.campus3DInstance) window.campus3DInstance.setTimeOfDay('dusk')">🌙 Night</button>
              <button class="btn-tool btn-tool-reset" onclick="if(window.campus3DInstance) window.campus3DInstance.resetCamera()">🔄 Reset View</button>
            </div>
          </div>

          <!-- Interactive 3D Canvas -->
          <canvas id="campus-3d-canvas" class="campus-3d-canvas"></canvas>

          <div class="campus-legend">
            <div class="legend-item"><span class="legend-color c-academic"></span> Academic Quadrangle</div>
            <div class="legend-item"><span class="legend-color c-stem"></span> STEM Robotics Hub</div>
            <div class="legend-item"><span class="legend-color c-science"></span> Raman Science Labs</div>
            <div class="legend-item"><span class="legend-color c-library"></span> Tagore Library</div>
            <div class="legend-item"><span class="legend-color c-sports"></span> Sports Arena & Pool</div>
            <div class="legend-item"><span class="legend-color c-auditorium"></span> Performing Arts</div>
            <div class="legend-item"><span class="legend-color c-lawns"></span> Botanical Lawns</div>
          </div>
        </div>

        <!-- Facility Cards Breakdown -->
        <div class="facilities-detail-section">
          <div class="kicker-gold text-center">INFRASTRUCTURE HIGHLIGHTS</div>
          <h2 class="sub-heading-serif text-center">World-Class Educational Amenities</h2>

          <div class="facilities-grid">
            <div class="fac-card card-3d-tilt">
              <div class="fac-icon">🏊‍♂️</div>
              <h3>Olympic-Grade Sports Arena</h3>
              <p>50m 8-lane temperature-controlled swimming pool, 4 wooden indoor badminton courts, synthetic football turf, and professional turf cricket nets with bowling machines.</p>
            </div>

            <div class="fac-card card-3d-tilt">
              <div class="fac-icon">🤖</div>
              <h3>Dr. Kalam Robotics & AI Lab</h3>
              <p>Equipped with 3D printers, drone test bays, Arduino & Raspberry Pi hardware kits, and high-performance computing rigs for machine learning.</p>
            </div>

            <div class="fac-card card-3d-tilt">
              <div class="fac-icon">📚</div>
              <h3>Tagore Digital Library</h3>
              <p>Over 45,000 physical volumes, Kindle reading lounges, JSTOR digital archives, and quiet study alcoves with Wi-Fi 6 connectivity.</p>
            </div>

            <div class="fac-card card-3d-tilt">
              <div class="fac-icon">🎭</div>
              <h3>1,200-Seat Auditorium</h3>
              <p>Acoustically calibrated auditorium with Meyer Sound line arrays, automated stage fly-towers, green rooms, and orchestra pit.</p>
            </div>

            <div class="fac-card card-3d-tilt">
              <div class="fac-icon">🚌</div>
              <h3>GPS-Enabled Safe Transport</h3>
              <p>Fleet of 35 air-conditioned buses covering Noida, Greater Noida, Indirapuram, and East Delhi with live parent GPS tracking and female attendants.</p>
            </div>

            <div class="fac-card card-3d-tilt">
              <div class="fac-icon">🥗</div>
              <h3>Hygienic Cafeteria & Infirmary</h3>
              <p>Dietician-curated vegetarian meals prepared in an ISO 22000 certified kitchen. 24x7 medical room with full-time doctor and nurse on duty.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `);

  // ==========================================
  // 6. ACHIEVEMENTS & ACCOLADES PAGE
  // ==========================================
  router.registerRoute('achievements', () => `
    <div class="page-header-banner">
      <div class="site-container">
        <div class="page-kicker">HALL OF FAME</div>
        <h1 class="page-title">Achievements & Accolades</h1>
        <p class="page-subtitle">Celebrating 100% board excellence, national olympiad triumphs, and championship trophies.</p>
      </div>
    </div>

    <section class="page-content-section">
      <div class="site-container">
        
        <!-- Board Results Highlight Cards -->
        <div class="achieve-banner-grid">
          <div class="achieve-card-stat card-3d-tilt">
            <div class="achieve-num">100%</div>
            <div class="achieve-tag">Class X & XII Pass Rate</div>
            <p>Every single candidate cleared the CBSE Board Examination with flying colours in 2025.</p>
          </div>
          <div class="achieve-card-stat card-3d-tilt">
            <div class="achieve-num">98.8%</div>
            <div class="achieve-tag">School Highest Aggregate</div>
            <p>Secured by Ananya Singhania (Science Stream), ranking among the top in Delhi-NCR.</p>
          </div>
          <div class="achieve-card-stat card-3d-tilt">
            <div class="achieve-num">82.4%</div>
            <div class="achieve-tag">Distinction Rate</div>
            <p>Over 82% of all students scored distinction (75%+ aggregate) in their board exams.</p>
          </div>
          <div class="achieve-card-stat card-3d-tilt">
            <div class="achieve-num">44</div>
            <div class="achieve-tag">Perfect 100/100 Scores</div>
            <p>Achieved across Mathematics, Chemistry, Computer Science, Economics, and Psychology.</p>
          </div>
        </div>

        <!-- Olympiad & Sports Trophies -->
        <div class="achievements-showcase">
          <div class="kicker-gold text-center">NATIONAL HONOURS</div>
          <h2 class="sub-heading-serif text-center">Recent Championship Highlights (2025-2026)</h2>

          <div class="showcase-grid">
            <div class="showcase-item card-3d-tilt">
              <span class="trophy-badge">🏆 Gold Medal</span>
              <h3>National Science Olympiad (NSO)</h3>
              <p>Kabir Mehra (Class X) bagged All-India Rank 3 in the prestigious National Science Olympiad.</p>
            </div>

            <div class="showcase-item card-3d-tilt">
              <span class="trophy-badge">🥇 1st Place</span>
              <h3>CBSE Inter-School Swimming Championship</h3>
              <p>Under-17 Girls 4x100m Medley Relay team brought home the Gold Trophy for the 3rd consecutive year.</p>
            </div>

            <div class="showcase-item card-3d-tilt">
              <span class="trophy-badge">🤖 National Winners</span>
              <h3>World Robot Olympiad (WRO India)</h3>
              <p>Our STEM Club won the RoboMission Senior Category and represented India at the International Finals.</p>
            </div>

            <div class="showcase-item card-3d-tilt">
              <span class="trophy-badge">🎭 Best Delegation</span>
              <h3>Harvard Model United Nations India</h3>
              <p>14-member student delegation won the Best Large Delegation Trophy, debating climate finance and global peace.</p>
            </div>
          </div>
        </div>

        <!-- Prestigious Alumni Spotlight -->
        <div class="alumni-spotlight">
          <div class="kicker-gold text-center">GLOBAL INFLUENCE</div>
          <h2 class="sub-heading-serif text-center">Distinguished Alumni</h2>
          
          <div class="alumni-grid">
            <div class="alumni-card card-3d-tilt">
              <div class="alumni-avatar">🎓</div>
              <h4>Dr. Vikramaditya Sen</h4>
              <div class="alumni-class">Batch of 2008</div>
              <p>Senior AI Research Scientist at DeepMind, alumnus of IIT Delhi and Stanford University.</p>
            </div>

            <div class="alumni-card card-3d-tilt">
              <div class="alumni-avatar">🏛️</div>
              <h4>Pooja Kulkarni, IAS</h4>
              <div class="alumni-class">Batch of 2012</div>
              <p>Secured All India Rank 14 in UPSC Civil Services Examination; serving as District Magistrate.</p>
            </div>

            <div class="alumni-card card-3d-tilt">
              <div class="alumni-avatar">💼</div>
              <h4>Siddharth Verma</h4>
              <div class="alumni-class">Batch of 2015</div>
              <p>Founder & CEO of CleanVolt Technologies, featured in Forbes 30 Under 30 Asia.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `);

  // ==========================================
  // 7. BEYOND CLASSROOM PAGE
  // ==========================================
  router.registerRoute('beyond-classroom', () => `
    <div class="page-header-banner">
      <div class="site-container">
        <div class="page-kicker">HOLISTIC HORIZONS</div>
        <h1 class="page-title">Life Beyond Classroom</h1>
        <p class="page-subtitle">Igniting passion, creativity, and leadership through 18+ active student clubs, sports leagues, and cultural expeditions.</p>
      </div>
    </div>

    <section class="page-content-section">
      <div class="site-container">
        
        <div class="clubs-intro text-center">
          <div class="kicker-gold">CO-CURRICULAR EXCELLENCE</div>
          <h2 class="sub-heading-serif">Clubs, Societies & Activities</h2>
          <p class="section-paragraph mx-auto">Every Wednesday and Saturday afternoon, regular classes transform into hubs of creativity, debate, robotics, and social innovation.</p>
        </div>

        <!-- 18+ Clubs Grid -->
        <div class="clubs-grid">
          <div class="club-card card-3d-tilt">
            <div class="club-icon">🤖</div>
            <h4>TinkerLab Robotics & AI Club</h4>
            <p>Hardware prototyping, autonomous obstacle avoiders, Arduino coding, and battle-bots.</p>
          </div>

          <div class="club-card card-3d-tilt">
            <div class="club-icon">🗣️</div>
            <h4>Cicero Debating & Model UN</h4>
            <p>Parliamentary debate, impromptu oratory, mock international diplomacy, and negotiation.</p>
          </div>

          <div class="club-card card-3d-tilt">
            <div class="club-icon">🌱</div>
            <h4>Green Warriors Eco Club</h4>
            <p>Campus tree censuses, paper recycling drives, organic rooftop farming, and water audit.</p>
          </div>

          <div class="club-card card-3d-tilt">
            <div class="club-icon">🎭</div>
            <h4>Rangmanch Dramatic Society</h4>
            <p>Street plays (Nukkad Natak), classical Shakespearean drama, and national theatre fests.</p>
          </div>

          <div class="club-card card-3d-tilt">
            <div class="club-icon">🎵</div>
            <h4>Aaroh Music & Harmony Club</h4>
            <p>Vocal Indian classical, rock band ensembles, piano synthesis, and annual choral showcase.</p>
          </div>

          <div class="club-card card-3d-tilt">
            <div class="club-icon">🔭</div>
            <h4>Galileo Astronomy Club</h4>
            <p>Night-sky telescope observation camps, planetary transit tracking, and astrophotography.</p>
          </div>

          <div class="club-card card-3d-tilt">
            <div class="club-icon">🎨</div>
            <h4>Kala Fine Arts & Design</h4>
            <p>Oil painting, pottery, charcoal sketching, digital vector art, and annual exhibition.</p>
          </div>

          <div class="club-card card-3d-tilt">
            <div class="club-icon">💻</div>
            <h4>Turing Hackers Coding Guild</h4>
            <p>Full-stack web apps, cybersecurity capture-the-flag competitions, and open-source.</p>
          </div>

          <div class="club-card card-3d-tilt">
            <div class="club-icon">🤝</div>
            <h4>Interact Club & NSS Outreach</h4>
            <p>Community literacy teaching, blood donation camps, and elderly care home visits.</p>
          </div>
        </div>

        <!-- Annual Expeditions & Trips -->
        <div class="expeditions-box">
          <div class="kicker-gold text-center">LEARNING ON THE ROAD</div>
          <h2 class="sub-heading-serif text-center">Excursions & Field Expeditions</h2>

          <div class="trips-grid">
            <div class="trip-card card-3d-tilt">
              <div class="trip-tag">Himalayan Leadership Camp</div>
              <h4>Adventure Trek to Rishikesh & Manali</h4>
              <p>Rock climbing, white-water rafting, wilderness survival, and team leadership for Grades IX-XI.</p>
            </div>
            <div class="trip-card card-3d-tilt">
              <div class="trip-tag">Heritage Exploration</div>
              <h4>Historical Tour to Jaipur & Hampi</h4>
              <p>Architectural surveying, astronomical observation at Jantar Mantar, and archaeology workshops.</p>
            </div>
            <div class="trip-card card-3d-tilt">
              <div class="trip-tag">Scientific Immersion</div>
              <h4>ISRO Space Centre & Science City</h4>
              <p>Educational immersion to Vikram Sarabhai Space Centre and Indian Space Research Organization.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `);

  // ==========================================
  // 8. CONTACT US PAGE
  // ==========================================
  router.registerRoute('contact', () => `
    <div class="page-header-banner">
      <div class="site-container">
        <div class="page-kicker">REACH OUT TO US</div>
        <h1 class="page-title">Contact & Campus Visit</h1>
        <p class="page-subtitle">We would love to welcome you to our campus. Get in touch with our team for visits, admissions, and transport queries.</p>
      </div>
    </div>

    <section class="page-content-section">
      <div class="site-container">
        
        <div class="contact-split-grid">
          
          <!-- Contact Info Left -->
          <div class="contact-info-col">
            <h2 class="sub-heading-serif">Campus Address & Directory</h2>
            
            <div class="c-info-card card-3d-tilt">
              <div class="c-icon">📍</div>
              <div class="c-details">
                <h4>Main Campus Location</h4>
                <p>New Green Lawns Public School<br>Plot No. 14, Institutional Area, Sector 62,<br>Noida, Gautam Buddha Nagar, Uttar Pradesh - 201309</p>
                <div class="c-meta">Nearest Metro: Noida Electronic City (Blue Line) - 800m</div>
              </div>
            </div>

            <div class="c-info-card card-3d-tilt">
              <div class="c-icon">📞</div>
              <div class="c-details">
                <h4>Telephone & Helplines</h4>
                <p>Admissions Helpdesk: <strong>+91 120 4000 000</strong><br>
                   General Reception: <strong>+91 123 400 8000</strong><br>
                   Transport In-Charge: <strong>+91 120 4000 115</strong></p>
              </div>
            </div>

            <div class="c-info-card card-3d-tilt">
              <div class="c-icon">✉️</div>
              <div class="c-details">
                <h4>Official Email Addresses</h4>
                <p>Admissions: <strong>admissions@newgreenlawns.edu.in</strong><br>
                   General: <strong>info@newgreenlawns.edu.in</strong><br>
                   Principal's Desk: <strong>principal@newgreenlawns.edu.in</strong></p>
              </div>
            </div>

            <div class="c-info-card card-3d-tilt">
              <div class="c-icon">⏰</div>
              <div class="c-details">
                <h4>Office Visiting Hours</h4>
                <p>Monday to Friday: <strong>8:00 AM - 3:30 PM</strong><br>
                   Saturday (Admissions Open): <strong>9:00 AM - 1:30 PM</strong><br>
                   Sunday: Closed</p>
              </div>
            </div>
          </div>

          <!-- Contact Form Right -->
          <div class="contact-form-col card-3d-tilt">
            <h3 class="form-col-title">Send Us a Direct Message</h3>
            <p class="form-col-sub">Have a question regarding school transport, curriculum, or visiting slots? Leave your message below.</p>

            <form onsubmit="event.preventDefault(); window.enquiryManager.showToast('Your message has been sent to our campus office. We will reply within 24 hours!', 'success'); this.reset();" class="general-contact-form">
              <div class="form-group">
                <label>Your Name *</label>
                <input type="text" class="calc-select" required placeholder="Full Name" />
              </div>
              <div class="form-group">
                <label>Your Email *</label>
                <input type="email" class="calc-select" required placeholder="name@domain.com" />
              </div>
              <div class="form-group">
                <label>Phone Number *</label>
                <input type="tel" class="calc-select" required placeholder="+91 9876543210" />
              </div>
              <div class="form-group">
                <label>Department / Enquiry Type *</label>
                <select class="calc-select" required>
                  <option value="Admissions">Admissions & New Enrolment</option>
                  <option value="Transport">School Bus Transport Routes</option>
                  <option value="Accounts">Fee Payment & Accounts</option>
                  <option value="Principal">Appointment with Principal</option>
                  <option value="Careers">Job Application & Careers</option>
                </select>
              </div>
              <div class="form-group">
                <label>Your Message / Question *</label>
                <textarea class="calc-select" rows="4" required placeholder="Type your query here..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Send Message ➔</button>
            </form>
          </div>

        </div>

      </div>
    </section>
  `);

  // ==========================================
  // 9. PARENTS PORTAL
  // ==========================================
  router.registerRoute('parents-portal', () => `
    <div class="page-header-banner">
      <div class="site-container">
        <div class="page-kicker">ERP & DIGITAL COMMUNICATION</div>
        <h1 class="page-title">Parents Portal (NGLPS Connect)</h1>
        <p class="page-subtitle">Real-time attendance, fee receipts, digital report cards, daily homework, and live GPS bus tracking.</p>
      </div>
    </div>

    <section class="page-content-section">
      <div class="site-container portal-container">
        
        <div class="portal-demo-grid">
          <!-- Login Box -->
          <div class="portal-login-card card-3d-tilt">
            <div class="login-badge">Portal Sign In</div>
            <h3>Parent ERP Account</h3>
            <p>Access your ward’s comprehensive academic dashboard.</p>

            <form onsubmit="event.preventDefault(); window.enquiryManager.showToast('Portal Login Successful! Loading student records...', 'success'); document.getElementById('portal-preview-dash').style.display = 'block';">
              <div class="form-group">
                <label>Student Admission No. / Parent Mobile</label>
                <input type="text" class="calc-select" required value="NGLPS-2024-5821" />
              </div>
              <div class="form-group">
                <label>Password / OTP</label>
                <input type="password" class="calc-select" required value="••••••••" />
              </div>
              <button type="submit" class="btn btn-primary btn-block">Sign In to Dashboard ➔</button>
              <div class="portal-help-links">
                <a href="#/contact">Forgot Password?</a> | <a href="#/contact">Contact IT Helpdesk</a>
              </div>
            </form>
          </div>

          <!-- Dashboard Preview -->
          <div id="portal-preview-dash" class="portal-dash-preview card-3d-tilt">
            <div class="dash-header">
              <div class="student-profile">
                <div class="s-avatar">👦</div>
                <div>
                  <h4>Reyansh Agarwal</h4>
                  <span>Class VII-A | Roll No: 18 | Scholar ID: NGLPS-5821</span>
                </div>
              </div>
              <span class="status-live-pill">🟢 Session 2026-27 Active</span>
            </div>

            <div class="dash-metrics-grid">
              <div class="dash-stat-box">
                <div class="dash-val">96.4%</div>
                <div class="dash-lbl">Attendance Rate</div>
              </div>
              <div class="dash-stat-box">
                <div class="dash-val">A1</div>
                <div class="dash-lbl">Term 1 Grade</div>
              </div>
              <div class="dash-stat-box">
                <div class="dash-val">Cleared</div>
                <div class="dash-lbl">Q3 Fee Status</div>
              </div>
              <div class="dash-stat-box">
                <div class="dash-val">Route 14</div>
                <div class="dash-lbl">Bus In-Transit (On Time)</div>
              </div>
            </div>

            <div class="dash-recent-notices">
              <h4>Recent Digital Circulars & Homework</h4>
              <div class="notice-row">
                <span class="notice-date">Oct 10</span>
                <span class="notice-title">Science Project Submission Guidelines for Term 2</span>
                <a href="#" onclick="event.preventDefault(); window.enquiryManager.showToast('Downloading circular PDF...', 'info');" class="download-link">PDF ⬇</a>
              </div>
              <div class="notice-row">
                <span class="notice-date">Oct 08</span>
                <span class="notice-title">Inter-House Athletics Meet Schedule & Track Events</span>
                <a href="#" onclick="event.preventDefault(); window.enquiryManager.showToast('Downloading schedule PDF...', 'info');" class="download-link">PDF ⬇</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `);

  // ==========================================
  // 10. MANDATORY DISCLOSURES PAGE
  // ==========================================
  router.registerRoute('mandatory-disclosures', () => `
    <div class="page-header-banner">
      <div class="site-container">
        <div class="page-kicker">GOVERNANCE & TRANSPARENCY</div>
        <h1 class="page-title">CBSE Mandatory Public Disclosures</h1>
        <p class="page-subtitle">In strict accordance with Appendix IX of CBSE Affiliation Bye-Laws 2018.</p>
      </div>
    </div>

    <section class="page-content-section">
      <div class="site-container">
        
        <div class="disclosure-table-wrapper">
          <h3 class="table-section-heading">A. General Information</h3>
          <table class="disclosure-table">
            <thead>
              <tr><th>S.No.</th><th>Information Details</th><th>Official Data</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Name of the School</td><td><strong>New Green Lawns Public School</strong></td></tr>
              <tr><td>2</td><td>Affiliation No. (CBSE)</td><td><strong>2130849</strong></td></tr>
              <tr><td>3</td><td>School Code</td><td><strong>60384</strong></td></tr>
              <tr><td>4</td><td>Complete Address</td><td>Plot 14, Institutional Area, Sector 62, Noida, Gautam Buddha Nagar, UP - 201309</td></tr>
              <tr><td>5</td><td>Principal Name & Qualification</td><td>Dr. Rajeshwari Menon (M.Sc., M.Ed., Ph.D.)</td></tr>
              <tr><td>6</td><td>School Email ID</td><td>info@newgreenlawns.edu.in</td></tr>
              <tr><td>7</td><td>Contact Telephone</td><td>+91 120 4000 000 / +91 123 400 8000</td></tr>
            </tbody>
          </table>

          <h3 class="table-section-heading mt-6">B. Documents & Information Compliance</h3>
          <table class="disclosure-table">
            <thead>
              <tr><th>S.No.</th><th>Documents / Certificates</th><th>Compliance Status</th><th>View Document</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Copies of Affiliation / Upgradation Letter from CBSE</td><td>Valid Till March 2029</td><td><a href="#" onclick="event.preventDefault(); window.enquiryManager.showToast('Viewing verified CBSE Affiliation Letter', 'info');">View Certificate 📄</a></td></tr>
              <tr><td>2</td><td>Copies of Societies / Trust Registration Certificate</td><td>Registered Under Societies Act 1860</td><td><a href="#" onclick="event.preventDefault(); window.enquiryManager.showToast('Viewing Society Registration', 'info');">View Certificate 📄</a></td></tr>
              <tr><td>3</td><td>No Objection Certificate (NOC) Issued by State Govt.</td><td>Granted by Uttar Pradesh Govt.</td><td><a href="#" onclick="event.preventDefault(); window.enquiryManager.showToast('Viewing State NOC', 'info');">View Certificate 📄</a></td></tr>
              <tr><td>4</td><td>Building Safety Certificate as per National Building Code</td><td>Issued by PWD Executive Engineer</td><td><a href="#" onclick="event.preventDefault(); window.enquiryManager.showToast('Viewing Building Safety NOC', 'info');">View Certificate 📄</a></td></tr>
              <tr><td>5</td><td>Fire Safety Certificate</td><td>Valid Certificate from Chief Fire Officer</td><td><a href="#" onclick="event.preventDefault(); window.enquiryManager.showToast('Viewing Fire Safety NOC', 'info');">View Certificate 📄</a></td></tr>
              <tr><td>6</td><td>Water, Health and Sanitation Certificate</td><td>Chief Medical Officer (CMO) Approved</td><td><a href="#" onclick="event.preventDefault(); window.enquiryManager.showToast('Viewing Sanitation Certificate', 'info');">View Certificate 📄</a></td></tr>
              <tr><td>7</td><td>POCSO Internal Committee & Grievance Redressal</td><td>Constituted & Active</td><td><a href="#" onclick="event.preventDefault(); window.enquiryManager.showToast('Viewing Committee Composition', 'info');">View Order 📄</a></td></tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  `);

}

window.registerAllSchoolRoutes = registerAllSchoolRoutes;
