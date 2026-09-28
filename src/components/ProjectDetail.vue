<template>
  <div id="detail-root">
    <canvas id="detail-canvas" ref="detailCanvas"></canvas>

    <nav id="detail-nav">
      <router-link v-if="canRoute" to="/" class="back-link">
        <i class="fa-solid fa-arrow-left"></i> Back to portfolio
      </router-link>
      <a v-else href="/" class="back-link">
        <i class="fa-solid fa-arrow-left"></i> Back to portfolio
      </a>
    </nav>

    <div v-if="project" class="detail-content" :class="{ 'reveal-in': loaded }">
      <span class="detail-category">{{ project.category }}</span>
      <h1 class="detail-title">{{ project.title }}</h1>
      <span class="detail-tag-badge">{{ project.tag }}</span>

      <p class="detail-description">{{ project.description }}</p>

      <div class="detail-grid">
        <div class="glass-panel detail-panel">
          <h2><i class="fa-solid fa-star"></i> Highlights</h2>
          <ul>
            <li v-for="(h, i) in project.highlights" :key="i">
              <span class="dot"></span>{{ h }}
            </li>
          </ul>
        </div>

        <div class="glass-panel detail-panel">
          <h2><i class="fa-solid fa-layer-group"></i> Tech Stack</h2>
          <div class="stack-tags">
            <span v-for="(t, i) in project.stack" :key="i" class="stack-tag">{{ t }}</span>
          </div>

          <a v-if="project.link" :href="project.link" target="_blank" rel="noopener" class="external-link-btn">
            View Repository <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <p v-else class="link-placeholder">Repository link coming soon.</p>
        </div>
      </div>

      <div class="detail-nav-footer">
        <router-link v-if="canRoute && prevProject" :to="'/project/' + prevProject.id" class="nav-footer-link">
          <i class="fa-solid fa-arrow-left"></i>
          <span>{{ prevProject.title }}</span>
        </router-link>
        <a v-else-if="prevProject" :href="'/project/' + prevProject.id" class="nav-footer-link">
          <i class="fa-solid fa-arrow-left"></i>
          <span>{{ prevProject.title }}</span>
        </a>
        <span v-else></span>

        <router-link v-if="canRoute && nextProject" :to="'/project/' + nextProject.id" class="nav-footer-link nav-footer-link-right">
          <span>{{ nextProject.title }}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </router-link>
        <a v-else-if="nextProject" :href="'/project/' + nextProject.id" class="nav-footer-link nav-footer-link-right">
          <span>{{ nextProject.title }}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>

    <div v-else class="not-found">
      <i class="fa-solid fa-satellite-dish"></i>
      <h2>This project drifted out of orbit.</h2>
      <p>We couldn't find that case study.</p>
      <router-link v-if="canRoute" to="/" class="external-link-btn">Return home</router-link>
      <a v-else href="/" class="external-link-btn">Return home</a>
    </div>
  </div>
</template>

<script>
import { projects, getProjectById } from '../data/projects.js';

export default {
  name: "ProjectDetail",
  props: {
    id: { type: String, default: null },
  },
  data() {
    return {
      loaded: false,
      canRoute: !!(this.$router),
      _particles: [],
      _animFrame: null,
    };
  },
  computed: {
    projectId() {
      return this.id || (this.$route ? this.$route.params.id : null);
    },
    project() {
      return getProjectById(this.projectId);
    },
    currentIndex() {
      return projects.findIndex((p) => p.id === this.projectId);
    },
    prevProject() {
      return this.currentIndex > 0 ? projects[this.currentIndex - 1] : null;
    },
    nextProject() {
      return this.currentIndex >= 0 && this.currentIndex < projects.length - 1
        ? projects[this.currentIndex + 1]
        : null;
    },
  },
  methods: {
    loadFonts() {
      const fa = document.createElement("link");
      fa.rel = "stylesheet";
      fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
      document.head.appendChild(fa);

      const gf = document.createElement("link");
      gf.rel = "stylesheet";
      gf.href = "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap";
      document.head.appendChild(gf);
    },
    setupCanvas() {
      const canvas = this.$refs.detailCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width, height;
      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);
      this._resizeHandler = resize;

      const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 22000));
      this._particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.4 + 0.5,
      }));

      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        for (const p of this._particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        for (let i = 0; i < this._particles.length; i++) {
          for (let j = i + 1; j < this._particles.length; j++) {
            const dx = this._particles[i].x - this._particles[j].x;
            const dy = this._particles[i].y - this._particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              ctx.strokeStyle = `rgba(139,92,246,${0.1 * (1 - dist / 130)})`;
              ctx.beginPath();
              ctx.moveTo(this._particles[i].x, this._particles[i].y);
              ctx.lineTo(this._particles[j].x, this._particles[j].y);
              ctx.stroke();
            }
          }
        }
        for (const p of this._particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(139,92,246,0.7)";
          ctx.fill();
        }
        this._animFrame = requestAnimationFrame(draw);
      };
      draw();
    },
  },
  mounted() {
    this.loadFonts();
    this.setupCanvas();
    window.scrollTo(0, 0);
    setTimeout(() => { this.loaded = true; }, 100);
  },
  beforeUnmount() {
    if (this._resizeHandler) window.removeEventListener("resize", this._resizeHandler);
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
  },
};
</script>

<style>
/* Unscoped: :root variables must not be attribute-scoped */
@import "../styles/theme-tokens.css";
</style>

<style scoped>
@import "../styles/ProjectDetail.css";
</style>