/**
 * 3D WebGL Hero Scene for New Green Lawns Public School
 * Renders interactive concentric golden armillary rings, central faceted gem/emblem,
 * and 3D particle constellation with mouse parallax and physics.
 */

class Hero3DScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.gl = this.canvas.getContext('webgl', { antialias: true, alpha: true }) ||
              this.canvas.getContext('experimental-webgl', { antialias: true, alpha: true });

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.rotation = { x: 0.2, y: 0.3, z: 0 };
    this.time = 0;
    this.particleCount = 220;
    this.isHovered = false;

    if (this.gl) {
      this.initWebGL();
    } else {
      this.initCanvasFallback();
    }

    this.initEvents();
  }

  initWebGL() {
    const gl = this.gl;
    this.resize();

    // Shaders for 3D Rings & Polyhedra
    const vsSource = `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      attribute vec4 aColor;
      
      uniform mat4 uProjection;
      uniform mat4 uModelView;
      uniform mat3 uNormalMatrix;
      uniform vec3 uLightPos;
      
      varying vec4 vColor;
      varying vec3 vNormal;
      varying vec3 vLightDir;
      varying vec3 vViewDir;
      
      void main() {
        vec4 pos4 = uModelView * vec4(aPosition, 1.0);
        gl_Position = uProjection * pos4;
        
        vNormal = normalize(uNormalMatrix * aNormal);
        vLightDir = normalize(uLightPos - pos4.xyz);
        vViewDir = normalize(-pos4.xyz);
        vColor = aColor;
      }
    `;

    const fsSource = `
      precision mediump float;
      
      varying vec4 vColor;
      varying vec3 vNormal;
      varying vec3 vLightDir;
      varying vec3 vViewDir;
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(vLightDir);
        vec3 viewDir = normalize(vViewDir);
        
        // Ambient
        vec3 ambient = 0.35 * vColor.rgb;
        
        // Diffuse
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = 0.7 * diff * vColor.rgb;
        
        // Specular (Gold reflection)
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
        vec3 specular = vec3(0.9, 0.8, 0.4) * spec * 0.9;
        
        // Subtle rim lighting
        float rim = 1.0 - max(dot(viewDir, normal), 0.0);
        rim = pow(rim, 3.0) * 0.4;
        vec3 rimColor = vec3(0.2, 0.8, 0.4) * rim;
        
        gl_FragColor = vec4(ambient + diffuse + specular + rimColor, vColor.a);
      }
    `;

    this.program = this.createProgram(gl, vsSource, fsSource);
    if (!this.program) {
      this.initCanvasFallback();
      return;
    }

    // Geometry buffers
    this.createGeometries();

    // Setup 3D particles
    this.initParticles();

    // Start render loop
    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
  }

  createProgram(gl, vsSource, fsSource) {
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.warn('Vertex shader error:', gl.getShaderInfoLog(vs));
      return null;
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.warn('Fragment shader error:', gl.getShaderInfoLog(fs));
      return null;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }

  createGeometries() {
    const gl = this.gl;

    // Build concentric 3D torus rings
    this.meshData = [];

    // Ring 1: Outer Gold Ring (radius 2.2, tube 0.04)
    this.meshData.push(this.buildTorus(2.2, 0.04, 64, 16, [0.85, 0.68, 0.28, 0.95], { speedX: 0.12, speedY: 0.18, tiltZ: 0.2 }));

    // Ring 2: Middle Emerald/Gold Ring (radius 1.75, tube 0.05)
    this.meshData.push(this.buildTorus(1.75, 0.05, 56, 16, [0.12, 0.48, 0.32, 0.95], { speedX: -0.16, speedY: 0.24, tiltZ: -0.5 }));

    // Ring 3: Inner Champagne Gold Ring (radius 1.3, tube 0.035)
    this.meshData.push(this.buildTorus(1.3, 0.035, 48, 16, [0.92, 0.78, 0.38, 0.95], { speedX: 0.22, speedY: -0.14, tiltZ: 0.8 }));

    // Central 3D Icosahedron / Crest Gem
    this.meshData.push(this.buildIcosahedron(0.65, [0.15, 0.55, 0.36, 1.0], { speedX: 0.3, speedY: 0.3, tiltZ: 0 }));

    // Upload buffers for each mesh
    for (const mesh of this.meshData) {
      mesh.posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.positions), gl.STATIC_DRAW);

      mesh.normBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.normals), gl.STATIC_DRAW);

      mesh.colBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.colors), gl.STATIC_DRAW);

      mesh.idxBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.idxBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);
    }
  }

  buildTorus(R, r, segR, segr, color, motion) {
    const positions = [];
    const normals = [];
    const colors = [];
    const indices = [];

    for (let i = 0; i <= segR; i++) {
      const u = (i / segR) * Math.PI * 2;
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);

      for (let j = 0; j <= segr; j++) {
        const v = (j / segr) * Math.PI * 2;
        const cosV = Math.cos(v);
        const sinV = Math.sin(v);

        // Position
        const x = (R + r * cosV) * cosU;
        const y = (R + r * cosV) * sinU;
        const z = r * sinV;
        positions.push(x, y, z);

        // Normal
        const nx = cosV * cosU;
        const ny = cosV * sinU;
        const nz = sinV;
        normals.push(nx, ny, nz);

        // Color with subtle variation
        const cVar = 1.0 + (sinV * 0.15);
        colors.push(
          Math.min(1.0, color[0] * cVar),
          Math.min(1.0, color[1] * cVar),
          Math.min(1.0, color[2] * cVar),
          color[3]
        );
      }
    }

    for (let i = 0; i < segR; i++) {
      for (let j = 0; j < segr; j++) {
        const first = i * (segr + 1) + j;
        const second = first + segr + 1;
        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }

    return { positions, normals, colors, indices, count: indices.length, motion };
  }

  buildIcosahedron(radius, color, motion) {
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
    const verts = [
      [-1,  t,  0], [ 1,  t,  0], [-1, -t,  0], [ 1, -t,  0],
      [ 0, -1,  t], [ 0,  1,  t], [ 0, -1, -t], [ 0,  1, -t],
      [ t,  0, -1], [ t,  0,  1], [-t,  0, -1], [-t,  0,  1]
    ];

    const faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    const positions = [];
    const normals = [];
    const colors = [];
    const indices = [];

    let idx = 0;
    for (const f of faces) {
      const vA = verts[f[0]];
      const vB = verts[f[1]];
      const vC = verts[f[2]];

      // Compute face normal
      const e1 = [vB[0] - vA[0], vB[1] - vA[1], vB[2] - vA[2]];
      const e2 = [vC[0] - vA[0], vC[1] - vA[1], vC[2] - vA[2]];
      const fn = [
        e1[1] * e2[2] - e1[2] * e2[1],
        e1[2] * e2[0] - e1[0] * e2[2],
        e1[0] * e2[1] - e1[1] * e2[0]
      ];
      const fnLen = Math.hypot(fn[0], fn[1], fn[2]) || 1;
      const nx = fn[0] / fnLen, ny = fn[1] / fnLen, nz = fn[2] / fnLen;

      for (const vi of [vA, vB, vC]) {
        const len = Math.hypot(vi[0], vi[1], vi[2]);
        positions.push((vi[0] / len) * radius, (vi[1] / len) * radius, (vi[2] / len) * radius);
        normals.push(nx, ny, nz);
        colors.push(color[0], color[1], color[2], color[3]);
        indices.push(idx++);
      }
    }

    return { positions, normals, colors, indices, count: indices.length, motion };
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 1.0 + Math.random() * 2.8;
      this.particles.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        z: (Math.random() - 0.5) * 2.5,
        size: 1.5 + Math.random() * 3.5,
        speed: 0.2 + Math.random() * 0.6,
        color: Math.random() > 0.4 ? 'rgba(218, 175, 75, ' : 'rgba(38, 120, 80, ',
        alpha: 0.3 + Math.random() * 0.7,
        pulseSpeed: 1 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  initEvents() {
    window.addEventListener('resize', () => this.resize());

    const container = this.canvas.parentElement;
    if (container) {
      container.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        this.mouse.targetX = x * 0.6;
        this.mouse.targetY = y * 0.6;
        this.isHovered = true;
      });

      container.addEventListener('mouseleave', () => {
        this.mouse.targetX = 0;
        this.mouse.targetY = 0;
        this.isHovered = false;
      });

      // Touch interaction
      container.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          const rect = this.canvas.getBoundingClientRect();
          const t = e.touches[0];
          const x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -(((t.clientY - rect.top) / rect.height) * 2 - 1);
          this.mouse.targetX = x * 0.8;
          this.mouse.targetY = y * 0.8;
        }
      }, { passive: true });
    }
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(rect.width || 560, 320);
    const height = Math.max(rect.height || 560, 320);

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;

    if (this.gl) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  render() {
    const gl = this.gl;
    this.time += 0.016;

    // Smooth inertia mouse tracking
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(this.program);

    // Camera & Projection
    const aspect = this.canvas.width / this.canvas.height;
    const proj = this.createPerspectiveMatrix(42 * (Math.PI / 180), aspect, 0.1, 100.0);
    const uProjLoc = gl.getUniformLocation(this.program, 'uProjection');
    gl.uniformMatrix4fv(uProjLoc, false, proj);

    const uLightPosLoc = gl.getUniformLocation(this.program, 'uLightPos');
    gl.uniform3f(uLightPosLoc, 5.0, 6.0, 7.0);

    const aPosLoc = gl.getAttribLocation(this.program, 'aPosition');
    const aNormLoc = gl.getAttribLocation(this.program, 'aNormal');
    const aColLoc = gl.getAttribLocation(this.program, 'aColor');
    const uModelViewLoc = gl.getUniformLocation(this.program, 'uModelView');
    const uNormMatLoc = gl.getUniformLocation(this.program, 'uNormalMatrix');

    gl.enableVertexAttribArray(aPosLoc);
    gl.enableVertexAttribArray(aNormLoc);
    gl.enableVertexAttribArray(aColLoc);

    // Base View transformation (camera distance ~ 5.8)
    const baseView = this.createIdentityMatrix();
    this.translateMatrix(baseView, 0, 0, -5.8);

    // Global interactive tilt from mouse
    this.rotateXMatrix(baseView, -this.mouse.y * 0.6 + 0.15);
    this.rotateYMatrix(baseView, this.mouse.x * 0.7 + this.time * 0.1);

    // Render meshes
    for (let i = 0; i < this.meshData.length; i++) {
      const mesh = this.meshData[i];
      const mv = this.cloneMatrix(baseView);

      // Local mesh rotations
      if (mesh.motion) {
        this.rotateZMatrix(mv, mesh.motion.tiltZ);
        this.rotateXMatrix(mv, this.time * mesh.motion.speedX);
        this.rotateYMatrix(mv, this.time * mesh.motion.speedY);
      }

      const normMat = this.createNormalMatrix(mv);

      gl.uniformMatrix4fv(uModelViewLoc, false, mv);
      gl.uniformMatrix3fv(uNormMatLoc, false, normMat);

      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.posBuffer);
      gl.vertexAttribPointer(aPosLoc, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normBuffer);
      gl.vertexAttribPointer(aNormLoc, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colBuffer);
      gl.vertexAttribPointer(aColLoc, 4, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.idxBuffer);
      gl.drawElements(gl.TRIANGLES, mesh.count, gl.UNSIGNED_SHORT, 0);
    }

    requestAnimationFrame(this.render);
  }

  // --- 3D Matrix Utilities ---
  createIdentityMatrix() {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
  }

  cloneMatrix(m) {
    return m.slice();
  }

  createPerspectiveMatrix(fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    const nf = 1 / (near - far);
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, (2 * far * near) * nf, 0
    ];
  }

  translateMatrix(m, x, y, z) {
    m[12] += m[0] * x + m[4] * y + m[8] * z;
    m[13] += m[1] * x + m[5] * y + m[9] * z;
    m[14] += m[2] * x + m[6] * y + m[10] * z;
    m[15] += m[3] * x + m[7] * y + m[11] * z;
  }

  rotateXMatrix(m, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
    const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
    m[4] = a10 * c + a20 * s;
    m[5] = a11 * c + a21 * s;
    m[6] = a12 * c + a22 * s;
    m[7] = a13 * c + a23 * s;
    m[8] = a10 * -s + a20 * c;
    m[9] = a11 * -s + a21 * c;
    m[10] = a12 * -s + a22 * c;
    m[11] = a13 * -s + a23 * c;
  }

  rotateYMatrix(m, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
    const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
    m[0] = a00 * c + a20 * -s;
    m[1] = a01 * c + a21 * -s;
    m[2] = a02 * c + a22 * -s;
    m[3] = a03 * c + a23 * -s;
    m[8] = a00 * s + a20 * c;
    m[9] = a01 * s + a21 * c;
    m[10] = a02 * s + a22 * c;
    m[11] = a03 * s + a23 * c;
  }

  rotateZMatrix(m, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
    const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
    m[0] = a00 * c + a10 * s;
    m[1] = a01 * c + a11 * s;
    m[2] = a02 * c + a12 * s;
    m[3] = a03 * c + a13 * s;
    m[4] = a00 * -s + a10 * c;
    m[5] = a01 * -s + a11 * c;
    m[6] = a02 * -s + a12 * c;
    m[7] = a03 * -s + a13 * c;
  }

  createNormalMatrix(m) {
    // Top-left 3x3 of inverse transpose
    return [
      m[0], m[1], m[2],
      m[4], m[5], m[6],
      m[8], m[9], m[10]
    ];
  }

  // Graceful 2D/3D Canvas fallback
  initCanvasFallback() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    this.resize();

    const loop = () => {
      this.time += 0.02;
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;
      const radius = Math.min(cx, cy) * 0.75;

      // Draw elegant layered rings
      for (let r = 0; r < 4; r++) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.time * (0.2 + r * 0.1) + this.mouse.x * (r + 1) * 0.3);
        ctx.scale(1, 0.45 + r * 0.15);
        ctx.arc(0, 0, radius * (0.4 + r * 0.2), 0, Math.PI * 2);
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(212, 175, 55, 0.7)' : 'rgba(18, 67, 45, 0.6)';
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.restore();
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

window.Hero3DScene = Hero3DScene;
