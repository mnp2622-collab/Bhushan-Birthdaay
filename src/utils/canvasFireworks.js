// Canvas Particle Engine for Fireworks, Confetti, and Celebrations

export class FireworksEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.fireworks = [];
    this.confetti = [];
    this.animId = null;
    this.active = false;
    this.resize = this.resize.bind(this);
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.loop();
  }

  stop() {
    this.active = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    this.particles = [];
    this.fireworks = [];
    this.confetti = [];
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  // Launch a rocket that explodes into particles
  launchRocket(x = Math.random() * this.canvas.width, targetY = Math.random() * (this.canvas.height * 0.4) + 100) {
    const colors = ["#ff2a75", "#ffd700", "#00f0ff", "#a855f7", "#ff5e00", "#10b981", "#ffffff"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.fireworks.push({
      x: x,
      y: this.canvas.height,
      targetY: targetY,
      speed: Math.random() * 4 + 8,
      color: color
    });
  }

  // Create explosion particles at (x,y)
  createExplosion(x, y, color) {
    const particleCount = 60 + Math.floor(Math.random() * 40);
    const colors = ["#ff2a75", "#ffd700", "#00f0ff", "#a855f7", "#ff5e00", "#ffffff"];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      const pColor = colors[Math.floor(Math.random() * colors.length)] || color;

      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01,
        color: pColor,
        size: Math.random() * 3 + 2,
        gravity: 0.08
      });
    }
  }

  // Launch confetti rain
  spawnConfetti(count = 100) {
    const colors = ["#ff2a75", "#ffd700", "#00f0ff", "#a855f7", "#ff5e00", "#10b981", "#ff4500"];
    for (let i = 0; i < count; i++) {
      this.confetti.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -this.canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: Math.random() * 8 + 6,
        height: Math.random() * 12 + 8,
        alpha: 1
      });
    }
  }

  loop() {
    if (!this.active || !this.ctx) return;

    // Clear canvas cleanly so underlying video and UI stay crisp and visible
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update fireworks rockets
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i];
      fw.y -= fw.speed;

      this.ctx.beginPath();
      this.ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = fw.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = fw.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      if (fw.y <= fw.targetY) {
        this.createExplosion(fw.x, fw.y, fw.color);
        this.fireworks.splice(i, 1);
      }
    }

    // Update explosion particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.restore();
    }

    // Update confetti pieces
    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const c = this.confetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.rotation += c.rotSpeed;

      if (c.y > this.canvas.height + 20) {
        c.y = -20;
        c.x = Math.random() * this.canvas.width;
      }

      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate(c.rotation);
      this.ctx.fillStyle = c.color;
      this.ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
      this.ctx.restore();
    }

    // Random auto rockets if active
    if (Math.random() < 0.08 && this.fireworks.length < 5) {
      this.launchRocket();
    }

    this.animId = requestAnimationFrame(this.loop.bind(this));
  }

  destroy() {
    this.stop();
    window.removeEventListener("resize", this.resize);
  }
}
