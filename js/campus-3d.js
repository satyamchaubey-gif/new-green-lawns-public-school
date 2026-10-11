/**
 * 3D Interactive Virtual Campus Tour Engine
 * Renders an interactive 3D isometric architectural campus view with orbit controls,
 * facility buildings, day/night lighting, and interactive hotspot pins.
 */

class Campus3DExplorer {
  constructor(canvasId, containerId) {
    this.canvas = document.getElementById(canvasId);
    this.container = document.getElementById(containerId) || (this.canvas ? this.canvas.parentElement : null);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.time = 0;
    this.orbit = {
      angle: 0.65,
      tilt: 0.58,
      zoom: 1.0,
      targetAngle: 0.65,
      targetTilt: 0.58,
      targetZoom: 1.0
    };

    this.isDragging = false;
    this.lastMouse = { x: 0, y: 0 };
    this.hoveredBuilding = null;
    this.selectedBuilding = null;
    this.timeOfDay = 'day'; // 'day', 'golden', 'dusk'

    // Campus Facility Data
    this.facilities = [
      {
        id: 'academic-block',
        name: 'Main Academic Quadrangle',
        category: 'Academics',
        subtitle: 'Foundational & Senior Secondary Wings (Pre-School to XII)',
        x: 0, y: -20, z: 0,
        width: 140, length: 110, height: 75,
        color: '#1d4834',
        accentColor: '#cfa64f',
        description: 'State-of-the-art 4-story smart academic wing with 85 air-conditioned digital classrooms, interactive Promethean smart boards, and ergonomic learning pods.',
        stats: { Classrooms: '85 Smart Classrooms', Capacity: '2,400 Students', 'Board Affiliation': 'CBSE New Delhi', 'Teacher Ratio': '1:18' },
        tags: ['Smart Boards', 'Wi-Fi 6', 'Air Conditioned', 'Ergonomic Seating']
      },
      {
        id: 'stem-innovation',
        name: 'Dr. Kalam STEM & Robotics Hub',
        category: 'STEM & Labs',
        subtitle: 'AI, Mechatronics, 3D Printing & Coding Labs',
        x: 140, y: -40, z: 0,
        width: 90, length: 80, height: 60,
        color: '#153828',
        accentColor: '#e0b553',
        description: 'Equipped with industrial robotic arms, high-precision 3D printers, IoT kits, LEGO Mindstorms, and dedicated high-performance workstations for AI & Machine Learning.',
        stats: { Workstations: '60 High-End PCs', '3D Printers': '4 Rapid Prototypers', Drones: 'Autonomous Flight Pods', Competitions: '12 National Titles' },
        tags: ['Robotics', 'Python/AI', '3D Printing', 'Drone Lab']
      },
      {
        id: 'science-labs',
        name: 'Sir C.V. Raman Science Centre',
        category: 'STEM & Labs',
        subtitle: 'Advanced Physics, Chemistry & Biology Research Labs',
        x: 140, y: 70, z: 0,
        width: 85, length: 85, height: 55,
        color: '#1a4130',
        accentColor: '#d6a847',
        description: 'Exceeding standard CBSE specifications with laminar airflow chambers, optical spectrophotometers, digital microscopes, and chemical safety fume hoods.',
        stats: { 'Physics Lab': 'Capacity 45', 'Chemistry Lab': 'Zero-emission hoods', 'Bio Lab': 'Phase-contrast microscopes', Safety: 'ISO Certified' },
        tags: ['Spectroscopy', 'Chemical Safety', 'Specimen Museum', 'Digital Microscopes']
      },
      {
        id: 'library-centre',
        name: 'Tagore Central Digital Library',
        category: 'Academics',
        subtitle: 'Over 45,000 Titles, Rare Manuscripts & JSTOR Access',
        x: -140, y: -40, z: 0,
        width: 90, length: 75, height: 50,
        color: '#1e4b37',
        accentColor: '#cda249',
        description: 'Bi-level silent study sanctuary with RFID automated book checkout, Kindle e-readers, Kindle oasis loan stations, and subscription to international research journals.',
        stats: { Books: '45,000+ Physical Books', Digital: '100,000+ E-Books', Seating: '220 Scholars', Periodicals: '65 Journals' },
        tags: ['RFID Checkout', 'Quiet Pods', 'Research Archives', 'Audiobook Kiosks']
      },
      {
        id: 'sports-arena',
        name: 'Major Dhyan Chand Sports Arena',
        category: 'Sports',
        subtitle: 'Olympic Swimming Pool, Synthetic Turf & Indoor Stadium',
        x: -130, y: 90, z: 0,
        width: 120, length: 130, height: 35,
        color: '#123724',
        accentColor: '#2b8455',
        description: 'Features a temperature-controlled 50m Olympic pool, 4 wooden indoor badminton courts, 2 FIBA basketball courts, synthetic football turf, and professional turf cricket nets with bowling machines.',
        stats: { Pool: '8-Lane Olympic 50m', Badminton: 'BWF Wooden Courts', Football: 'FIFA Certified Turf', Cricket: '4 Turf Nets & Pitch' },
        tags: ['Olympic Pool', 'Night Floodlights', 'BWF Courts', 'Gymnasium']
      },
      {
        id: 'auditorium',
        name: 'Shanti Niketan Performing Arts Centre',
        category: 'Arts & Culture',
        subtitle: '1,200-Seat Acoustic Auditorium & Music Conservatoire',
        x: 0, y: 130, z: 0,
        width: 110, length: 90, height: 65,
        color: '#183f2e',
        accentColor: '#dfb76c',
        description: 'Architecturally tuned Meyer Sound acoustic system, motorized stage fly-tower, digital orchestra pit, green rooms, and classical Indian & Western instrument studios.',
        stats: { Capacity: '1,200 Seats', Acoustics: 'RT60 1.2s Tuned', Stage: '14m x 10m Proscenium', Recording: 'ProTools HD Studio' },
        tags: ['Meyer Sound', 'Orchestra Pit', 'Stage Lighting', 'Dance Studios']
      },
      {
        id: 'botanical-lawns',
        name: 'The Green Lawns & Solar Eco-Pavilion',
        category: 'Eco-Campus',
        subtitle: '4 Acres Lush Botanical Gardens & 150 kW Solar Canopy',
        x: 0, y: 55, z: 0,
        width: 90, length: 50, height: 12,
        color: '#286244',
        accentColor: '#68b884',
        description: 'Vast verdant lawns with indigenous flora, butterfly conservatory, organic medicinal herb terrace, rainwater harvesting percolation wells, and 150 kW rooftop solar array.',
        stats: { Greenery: '68% Campus Footprint', Solar: '150 kW Clean Energy', Harvesting: '100% Water Recharged', Flora: '140+ Tree Species' },
        tags: ['Butterfly Garden', 'Zero Carbon', 'Solar Farm', 'Organic Herbarium']
      }
    ];

    this.initEvents();
    this.resize();
    this.startLoop();
  }

  initEvents() {
    window.addEventListener('resize', () => this.resize());

    // Mouse drag orbit controls
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastMouse.x;
        const dy = e.clientY - this.lastMouse.y;
        this.orbit.targetAngle += dx * 0.006;
        this.orbit.targetTilt = Math.max(0.25, Math.min(0.9, this.orbit.targetTilt - dy * 0.004));
        this.lastMouse = { x: e.clientX, y: e.clientY };
      } else {
        this.checkHover(e);
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Zoom on wheel
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.001;
      this.orbit.targetZoom = Math.max(0.65, Math.min(1.6, this.orbit.targetZoom + zoomDelta));
    }, { passive: false });

    // Click to inspect building
    this.canvas.addEventListener('click', (e) => {
      if (this.hoveredBuilding) {
        this.openBuildingModal(this.hoveredBuilding);
      }
    });

    // Touch controls for mobile
    let touchStartDist = 0;
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        const dx = e.touches[0].clientX - this.lastMouse.x;
        const dy = e.touches[0].clientY - this.lastMouse.y;
        this.orbit.targetAngle += dx * 0.008;
        this.orbit.targetTilt = Math.max(0.25, Math.min(0.9, this.orbit.targetTilt - dy * 0.006));
        this.lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = (dist - touchStartDist) * 0.003;
        this.orbit.targetZoom = Math.max(0.65, Math.min(1.6, this.orbit.targetZoom + diff));
        touchStartDist = dist;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 550;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr);
    this.displayWidth = width;
    this.displayHeight = height;
  }

  project(x, y, z) {
    // 3D rotation and axonometric projection
    const cosA = Math.cos(this.orbit.angle);
    const sinA = Math.sin(this.orbit.angle);
    const sinT = Math.sin(this.orbit.tilt);
    const cosT = Math.cos(this.orbit.tilt);

    // Rotate about Z axis
    const rx = x * cosA - y * sinA;
    const ry = x * sinA + y * cosA;

    // Isometric tilt projection
    const screenX = (rx - ry) * 0.866 * this.orbit.zoom + (this.displayWidth / 2);
    const screenY = (rx + ry) * 0.5 * sinT * this.orbit.zoom - z * cosT * this.orbit.zoom + (this.displayHeight / 2) + 20;

    return { x: screenX, y: screenY, depth: rx + ry };
  }

  checkHover(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let found = null;
    let minD = 38;

    for (const b of this.facilities) {
      const pinPos = this.project(b.x, b.y, b.height + 25);
      const d = Math.hypot(pinPos.x - mx, pinPos.y - my);
      if (d < minD) {
        minD = d;
        found = b;
      }
    }

    this.hoveredBuilding = found;
    this.canvas.style.cursor = found ? 'pointer' : (this.isDragging ? 'grabbing' : 'grab');
  }

  startLoop() {
    const loop = () => {
      this.time += 0.016;

      // Smooth inertia
      this.orbit.angle += (this.orbit.targetAngle - this.orbit.angle) * 0.08;
      this.orbit.tilt += (this.orbit.targetTilt - this.orbit.tilt) * 0.08;
      this.orbit.zoom += (this.orbit.targetZoom - this.orbit.zoom) * 0.08;

      // Subtle ambient camera drift when not dragging
      if (!this.isDragging) {
        this.orbit.targetAngle += 0.0008;
      }

      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  render() {
    const ctx = this.ctx;
    const w = this.displayWidth;
    const h = this.displayHeight;

    ctx.clearRect(0, 0, w, h);

    // Atmospheric Background Gradient
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, Math.max(w, h));
    if (this.timeOfDay === 'day') {
      bgGrad.addColorStop(0, '#f9f8f4');
      bgGrad.addColorStop(0.65, '#efebe1');
      bgGrad.addColorStop(1, '#e3ded1');
    } else if (this.timeOfDay === 'golden') {
      bgGrad.addColorStop(0, '#fcf5e6');
      bgGrad.addColorStop(0.7, '#f3e5c9');
      bgGrad.addColorStop(1, '#e2cb9f');
    } else {
      bgGrad.addColorStop(0, '#1a3328');
      bgGrad.addColorStop(0.7, '#10241b');
      bgGrad.addColorStop(1, '#091510');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Campus Base Ground Plane (Plaza & Lawns)
    this.drawCampusGround(ctx);

    // Sort buildings by depth to render back-to-front
    const sorted = [...this.facilities].sort((a, b) => {
      const pA = this.project(a.x, a.y, 0);
      const pB = this.project(b.x, b.y, 0);
      return pA.depth - pB.depth;
    });

    // Draw Buildings
    for (const b of sorted) {
      this.drawBuilding3D(ctx, b);
    }

    // Draw Hotspot Pins & Badges
    for (const b of sorted) {
      this.drawPin3D(ctx, b);
    }

    // Draw active hover tooltip
    if (this.hoveredBuilding) {
      this.drawHoverCard(ctx, this.hoveredBuilding);
    }
  }

  drawCampusGround(ctx) {
    // Draw outer boundary lawn
    const radius = 260;
    const segments = 32;
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * (radius * 0.9);
      const p = this.project(x, y, -2);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fillStyle = this.timeOfDay === 'dusk' ? '#133524' : '#e6f0e2';
    ctx.strokeStyle = this.timeOfDay === 'dusk' ? '#255e42' : '#c3dbbe';
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();

    // Central paved walkways & ring road
    ctx.beginPath();
    for (let i = 0; i <= 24; i++) {
      const theta = (i / 24) * Math.PI * 2;
      const x = Math.cos(theta) * 160;
      const y = Math.sin(theta) * 135;
      const p = this.project(x, y, 0);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.strokeStyle = this.timeOfDay === 'dusk' ? '#234936' : '#d2cbbf';
    ctx.lineWidth = 14 * this.orbit.zoom;
    ctx.stroke();

    // Subtle sports field lines on arena
    const sp = this.project(-130, 90, 1);
    ctx.save();
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, 22 * this.orbit.zoom, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  drawBuilding3D(ctx, b) {
    const hw = b.width / 2;
    const hl = b.length / 2;
    const h = b.height;

    // 8 vertices in 3D
    const v000 = this.project(b.x - hw, b.y - hl, 0);
    const v100 = this.project(b.x + hw, b.y - hl, 0);
    const v110 = this.project(b.x + hw, b.y + hl, 0);
    const v010 = this.project(b.x - hw, b.y + hl, 0);

    const v001 = this.project(b.x - hw, b.y - hl, h);
    const v101 = this.project(b.x + hw, b.y - hl, h);
    const v111 = this.project(b.x + hw, b.y + hl, h);
    const v011 = this.project(b.x - hw, b.y + hl, h);

    const isHover = (this.hoveredBuilding && this.hoveredBuilding.id === b.id);

    // Ground contact shadow
    ctx.beginPath();
    ctx.moveTo(v000.x, v000.y + 6);
    ctx.lineTo(v100.x, v100.y + 6);
    ctx.lineTo(v110.x, v110.y + 6);
    ctx.lineTo(v010.x, v010.y + 6);
    ctx.closePath();
    ctx.fillStyle = 'rgba(15, 30, 22, 0.18)';
    ctx.fill();

    // Side Face 1 (Front-Left)
    ctx.beginPath();
    ctx.moveTo(v000.x, v000.y);
    ctx.lineTo(v100.x, v100.y);
    ctx.lineTo(v101.x, v101.y);
    ctx.lineTo(v001.x, v001.y);
    ctx.closePath();
    ctx.fillStyle = isHover ? '#275e44' : b.color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Window louvers
    this.drawWindows(ctx, v000, v100, v101, v001, 4, 3);

    // Side Face 2 (Front-Right)
    ctx.beginPath();
    ctx.moveTo(v100.x, v100.y);
    ctx.lineTo(v110.x, v110.y);
    ctx.lineTo(v111.x, v111.y);
    ctx.lineTo(v101.x, v101.y);
    ctx.closePath();
    ctx.fillStyle = isHover ? '#1b4733' : '#143425';
    ctx.fill();
    ctx.stroke();

    this.drawWindows(ctx, v100, v110, v111, v101, 3, 3);

    // Roof Face (Top)
    ctx.beginPath();
    ctx.moveTo(v001.x, v001.y);
    ctx.lineTo(v101.x, v101.y);
    ctx.lineTo(v111.x, v111.y);
    ctx.lineTo(v011.x, v011.y);
    ctx.closePath();
    ctx.fillStyle = isHover ? '#cfa64f' : '#2d674b';
    ctx.fill();
    ctx.strokeStyle = isHover ? '#fff' : b.accentColor;
    ctx.lineWidth = isHover ? 2.5 : 1.5;
    ctx.stroke();

    // Architectural cornice or skylight
    const cx = (v001.x + v101.x + v111.x + v011.x) / 4;
    const cy = (v001.y + v101.y + v111.y + v011.y) / 4;
    ctx.beginPath();
    ctx.arc(cx, cy, 7 * this.orbit.zoom, 0, Math.PI * 2);
    ctx.fillStyle = isHover ? '#ffffff' : b.accentColor;
    ctx.fill();
  }

  drawWindows(ctx, p0, p1, p2, p3, cols, rows) {
    ctx.fillStyle = 'rgba(240, 245, 225, 0.45)';
    for (let r = 1; r <= rows; r++) {
      const vY0 = r / (rows + 1);
      const vY1 = (r + 0.6) / (rows + 1);

      for (let c = 1; c <= cols; c++) {
        const uX0 = c / (cols + 1);
        const uX1 = (c + 0.5) / (cols + 1);

        const w0 = this.lerp2D(p0, p1, p3, p2, uX0, vY0);
        const w1 = this.lerp2D(p0, p1, p3, p2, uX1, vY0);
        const w2 = this.lerp2D(p0, p1, p3, p2, uX1, vY1);
        const w3 = this.lerp2D(p0, p1, p3, p2, uX0, vY1);

        ctx.beginPath();
        ctx.moveTo(w0.x, w0.y);
        ctx.lineTo(w1.x, w1.y);
        ctx.lineTo(w2.x, w2.y);
        ctx.lineTo(w3.x, w3.y);
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  lerp2D(p0, p1, p3, p2, u, v) {
    const topX = p0.x + (p1.x - p0.x) * u;
    const topY = p0.y + (p1.y - p0.y) * u;
    const botX = p3.x + (p2.x - p3.x) * u;
    const botY = p3.y + (p2.y - p3.y) * u;
    return {
      x: topX + (botX - topX) * v,
      y: topY + (botY - topY) * v
    };
  }

  drawPin3D(ctx, b) {
    const isHover = (this.hoveredBuilding && this.hoveredBuilding.id === b.id);
    const bob = Math.sin(this.time * 3 + b.x) * 4;
    const pin = this.project(b.x, b.y, b.height + 26 + bob);

    // Pulsing halo wave
    const wave = (this.time * 2) % 1;
    ctx.beginPath();
    ctx.arc(pin.x, pin.y, (14 + wave * 16) * this.orbit.zoom, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(212, 175, 55, ${1.0 - wave})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pin stem
    ctx.beginPath();
    ctx.moveTo(pin.x, pin.y);
    const ground = this.project(b.x, b.y, b.height + 4);
    ctx.lineTo(ground.x, ground.y);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pin Head Badge
    ctx.beginPath();
    ctx.arc(pin.x, pin.y, (isHover ? 16 : 13) * this.orbit.zoom, 0, Math.PI * 2);
    ctx.fillStyle = isHover ? '#d4af37' : '#0f3322';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Pin center beacon
    ctx.beginPath();
    ctx.arc(pin.x, pin.y, 4 * this.orbit.zoom, 0, Math.PI * 2);
    ctx.fillStyle = isHover ? '#0f3322' : '#d4af37';
    ctx.fill();
  }

  drawHoverCard(ctx, b) {
    const pin = this.project(b.x, b.y, b.height + 34);
    const cardW = 220;
    const cardH = 68;
    const cardX = Math.min(this.displayWidth - cardW - 16, Math.max(16, pin.x - cardW / 2));
    const cardY = Math.max(16, pin.y - cardH - 18);

    // Glassmorphic Card Container
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 6;

    ctx.beginPath();
    this.roundRect(ctx, cardX, cardY, cardW, cardH, 10);
    ctx.fillStyle = 'rgba(15, 43, 30, 0.94)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Category Tag
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#dfb76c';
    ctx.fillText(b.category.toUpperCase(), cardX + 14, cardY + 20);

    // Building Title
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(b.name, cardX + 14, cardY + 38);

    // Click prompt
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#a6cbb5';
    ctx.fillText('Click to explore facility ➔', cardX + 14, cardY + 54);
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
  }

  openBuildingModal(b) {
    const modal = document.getElementById('facility-modal');
    if (!modal) return;

    document.getElementById('facility-modal-title').textContent = b.name;
    document.getElementById('facility-modal-subtitle').textContent = b.subtitle;
    document.getElementById('facility-modal-desc').textContent = b.description;
    document.getElementById('facility-modal-category').textContent = b.category;

    // Render Stats
    const statsContainer = document.getElementById('facility-modal-stats');
    if (statsContainer) {
      statsContainer.innerHTML = Object.entries(b.stats).map(([k, v]) => `
        <div class="stat-pill">
          <div class="stat-pill-label">${k}</div>
          <div class="stat-pill-value">${v}</div>
        </div>
      `).join('');
    }

    // Render Tags
    const tagsContainer = document.getElementById('facility-modal-tags');
    if (tagsContainer) {
      tagsContainer.innerHTML = b.tags.map(t => `<span class="feature-badge">✓ ${t}</span>`).join('');
    }

    modal.classList.add('is-open');
  }

  resetCamera() {
    this.orbit.targetAngle = 0.65;
    this.orbit.targetTilt = 0.58;
    this.orbit.targetZoom = 1.0;
  }

  setTimeOfDay(tod) {
    this.timeOfDay = tod;
  }
}

window.Campus3DExplorer = Campus3DExplorer;
