<template>
  <div id="portfolio-root">

    <!-- ===== Cursor glow (desktop only, purely decorative) ===== -->
    <div id="cursor-glow" ref="cursorGlow"></div>

    <!-- ===== Constellation background canvas ===== -->
    <canvas id="constellation-canvas" ref="constellationCanvas"></canvas>

    <button v-show="isVisible" @click="scrollToTop" class="scroll-to-top" aria-label="Scroll to top">
      <i class="fas fa-arrow-up"></i>
    </button>

    <!-- ===== NAVBAR with sliding glow indicator ===== -->
    <nav id="navbar" ref="navbar">
      <div class="nav-inner">
        <div class="nav-logo" @click="scrollToTop">Nizar Ahmed</div>
        <div class="nav-items" ref="navItems">
          <button
            v-for="(item, index) in navItems"
            :key="index"
            :ref="el => setNavRef(el, index)"
            class="nav-item"
            :class="{ 'nav-item-active': activeSection === item.target }"
            @click="handleNavClick(item)"
          >
            {{ item.label }}
          </button>
          <span class="nav-indicator" ref="navIndicator"></span>
        </div>
      </div>
    </nav>

    <!-- ===== HERO ===== -->
    <section id="hero-section">
      <div class="hero-glow hero-glow-1"></div>
      <div class="hero-glow hero-glow-2"></div>

      <div class="hero-content">
        <div class="hero-left">
          <h1 id="hero-name" :class="{ 'reveal-in': heroLoaded }">
            <span v-for="(letter, i) in nameLetters" :key="i" class="letter" :style="{ transitionDelay: (i * 0.045) + 's' }">{{ letter === ' ' ? '\u00A0' : letter }}</span>
          </h1>
          <p id="hero-title" :class="{ 'reveal-in': heroLoaded }">{{ titleText }}</p>
          <p class="hero-blurb" :class="{ 'reveal-in': heroLoaded }">
            {{ personalStatement }}
          </p>


          <div id="social-icons" :class="{ 'reveal-in': heroLoaded }">
            <a class="social-icon" href="mailto:nizarahmed991ps@gmail.com" aria-label="Email" data-tip="Email">
              <i class="fa-solid fa-envelope"></i>
            </a>
            <a class="social-icon" href="https://www.linkedin.com/in/nizar-ahmed/" target="_blank" rel="noopener" aria-label="LinkedIn" data-tip="LinkedIn">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a class="social-icon" href="https://github.com/Nizar991" target="_blank" rel="noopener" aria-label="GitHub" data-tip="GitHub">
              <i class="fa-brands fa-github"></i>
            </a>
            <a class="social-icon" href="/cv/CV_NizarAhmed.pdf" target="_blank" rel="noopener" aria-label="Download CV" data-tip="Resume">
              <i class="fa-solid fa-file-arrow-down"></i>
            </a>
          </div>
        </div>

        <div class="hero-right" :class="{ 'reveal-in': heroLoaded }">
          <div class="profile-ring-wrap" @mousemove="handleProfileTilt" @mouseleave="resetProfileTilt" ref="profileWrap">
            <div class="profile-ring profile-ring-outer"></div>
            <div class="profile-ring profile-ring-inner"></div>
            <div class="profile-orbit-dot dot-1"></div>
            <div class="profile-orbit-dot dot-2"></div>
            <div class="profile-orbit-dot dot-3"></div>
            <img
              id="profile-pic"
              src="/images/Profile_Pic.png"
              alt="Nizar Ahmed"
              ref="profilePic"
            />
          </div>
        </div>
      </div>

      <div class="scroll-hint" @click="scrollToId('about-section')">
        <span>Scroll</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </section>

    <!-- ===== ABOUT ===== -->
    <section id="about-section" class="reveal-section" data-reveal>
      <div class="section-inner">
        <div class="glass-panel about-panel">
          <span class="panel-index">01</span>
          <h2 class="section-title">About Me</h2>
          <p class="about-text">{{ personalStatement }}</p>
        </div>
      </div>
    </section>

    <!-- ===== SKILLS ===== -->
    <section id="skills-section" class="reveal-section" data-reveal>
      <div class="section-inner">
        <h2 class="section-title centered">Skills</h2>
        <div class="skills-grid">
          <div class="skill-card" v-for="(group, gi) in skillGroups" :key="'skill-group-' + gi" @mousemove="handleCardTilt" @mouseleave="resetCardTilt">
            <div class="skill-card-glow"></div>
            <i :class="group.icon" class="skill-card-icon"></i>
            <h3>{{ group.title }}</h3>
            <ul>
              <li v-for="(item, i) in group.items" :key="i"><span class="dot"></span>{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PROGRAMMING LANGUAGES ===== -->
    <section id="languages-section" class="reveal-section" data-reveal>
      <div class="section-inner">
        <h2 class="section-title centered">Programming Languages</h2>
        <div class="pill-row">
          <span class="pill" v-for="(lang, index) in progLanguages" :key="'lang-' + index" :style="{ transitionDelay: (index * 0.06) + 's' }">
            {{ lang }}
          </span>
        </div>
      </div>
    </section>

    <!-- ===== PROJECTS / TECH STACK ===== -->
    <section id="projects-section" class="reveal-section" data-reveal>
      <div class="section-inner wide">
        <div class="button-container">
          <div class="toggle-button" :class="{ active: selectedSection === 'projects' }" @click="selectedSection = 'projects'">
            Projects
          </div>
          <div class="toggle-button" :class="{ active: selectedSection === 'techStack' }" @click="selectedSection = 'techStack'">
            Tech Stack
          </div>
        </div>

        <transition name="fade-swap" mode="out-in">
          <div v-if="selectedSection === 'projects'" key="projects" class="content-box">
            <h3 class="subsection-title">Featured Projects</h3>
            <p class="subsection-hint">Pick a category, click a card to flip it, then open the full case study.</p>

            <div class="category-tabs">
              <button
                v-for="cat in projectCategories"
                :key="cat"
                class="category-tab"
                :class="{ active: projectCategory === cat }"
                @click="setProjectCategory(cat)"
              >
                {{ cat }}
                <span class="category-count">{{ projectsInCategory(cat).length }}</span>
              </button>
            </div>

            <div class="projects-grid" :key="projectCategory">
              <div
                v-for="(project, pIndex) in visibleProjects"
                :key="project.id"
                class="flip-card"
                :class="{ flipped: flippedCard === project.id }"
                :style="{ '--i': pIndex }"
                @click="toggleFlip(project.id)"
              >
                <div class="flip-card-inner">
                  <div class="flip-card-face flip-card-front">
                    <div class="project-visual"><i :class="project.icon"></i></div>
                    <span class="project-category-tag">{{ project.tag }}</span>
                    <h4>{{ project.title }}</h4>
                    <p class="project-tagline">{{ project.tagline }}</p>
                    <span class="flip-hint"><i class="fa-solid fa-arrow-rotate-right"></i> Flip</span>
                  </div>
                  <div class="flip-card-face flip-card-back">
                    <span class="project-tag-badge">{{ project.tag }}</span>
                    <p class="project-summary">{{ project.summary }}</p>
                    <div class="project-stack-tags">
                      <span v-for="(t, i) in project.stack.slice(0,4)" :key="i" class="mini-tag">{{ t }}</span>
                    </div>
                    <router-link
                      v-if="canRoute"
                      :to="'/project/' + project.id"
                      class="case-study-btn"
                      @click.stop
                    >
                      View Case Study <i class="fa-solid fa-arrow-right"></i>
                    </router-link>
                    <a v-else :href="'/project/' + project.id" class="case-study-btn" @click.stop>
                      View Case Study <i class="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <h3 class="subsection-title other-sites-title">Other Sites</h3>
            <div class="projects-web-grid">
              <div class="project-web-item" v-for="(project, index) in otherSites" :key="'other-' + index">
                <div class="image-wrapper">
                  <a v-if="project.link" :href="project.link" target="_blank" rel="noopener">
                    <div class="project-web-visual"><i :class="project.icon"></i></div>
                  </a>
                  <div v-else class="project-web-visual"><i :class="project.icon"></i></div>
                </div>
                <div class="project-web-caption">{{ project.caption }}</div>
              </div>
            </div>
          </div>

          <div v-else key="tech" class="content-box">
            <h3 class="subsection-title">Tech Stack</h3>
            <div class="techstack-grid">
              <div class="techstack-card" v-for="(cat, index) in techStackCategories" :key="'tech-' + index" @mousemove="handleCardTilt" @mouseleave="resetCardTilt">
                <div class="skill-card-glow"></div>
                <div class="techstack-card-header">
                  <i :class="cat.icon"></i>
                  <h3>{{ cat.title }}</h3>
                </div>
                <div class="techstack-tags">
                  <span class="tag" v-for="(item, i) in cat.items" :key="'tech-item-' + index + '-' + i">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- ===== EDUCATION ===== -->
    <section id="education-section" class="reveal-section" data-reveal>
      <div class="section-inner">
        <h2 class="section-title centered">Education</h2>
        <div class="timeline">
          <div class="timeline-card" v-for="(edu, index) in educationList" :key="'edu-' + index">
            <div class="timeline-marker"><i class="fa-solid fa-graduation-cap"></i></div>
            <div class="timeline-content glass-panel">
              <span class="timeline-period">{{ edu.period }}</span>
              <h3>{{ edu.degree }}</h3>
              <p class="timeline-meta">{{ edu.institution }}</p>
              <p v-if="edu.note" class="timeline-note">{{ edu.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== EMPLOYMENT ===== -->
    <section id="employment-section" class="reveal-section" data-reveal>
      <div class="section-inner">
        <h2 class="section-title centered">Employment History</h2>
        <div class="employment-grid">
          <div class="employment-card" v-for="(job, index) in employmentList" :key="'job-' + index">
            <i :class="job.icon"></i>
            <span>{{ job.title }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== STRENGTHS & WEAKNESSES ===== -->
    <section id="strengths-section" class="reveal-section" data-reveal>
      <div class="section-inner">
        <h2 class="section-title centered">Strengths &amp; Weaknesses</h2>
        <div class="sw-grid">
          <div class="sw-card sw-strength">
            <i class="fa-solid fa-bolt"></i>
            <h3>Strength</h3>
            <p>{{ strengthText }}</p>
          </div>
          <div class="sw-card sw-weakness">
            <i class="fa-solid fa-hourglass-half"></i>
            <h3>Weakness</h3>
            <p>{{ weaknessText }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CERTIFICATES ===== -->
    <section id="certificates-section" class="reveal-section" data-reveal>
      <div class="section-inner">
        <h2 class="section-title centered">Certificates &amp; Achievements</h2>
        <div class="certificates-grid">
          <div class="certificate-card" v-for="(cert, index) in certificatesList" :key="'cert-' + index">
            <i class="fa-solid fa-award"></i>
            <div>
              <h3>{{ cert.title }}</h3>
              <p>{{ cert.org }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== RESEARCH ===== -->
    <section id="research-section" class="reveal-section" data-reveal>
      <div class="section-inner">
        <h2 class="section-title centered">Research Papers</h2>
        <div class="research-grid">
          <component
            :is="paper.link ? 'a' : 'div'"
            v-for="(paper, index) in researchList"
            :key="'paper-' + index"
            class="research-card"
            :class="{ 'has-link': paper.link }"
            :href="paper.link || null"
            :target="paper.link ? '_blank' : null"
            :rel="paper.link ? 'noopener' : null"
          >
            <i class="fa-solid fa-file-lines"></i>
            <div class="research-body">
              <h3>{{ paper.title }}</h3>
              <p>{{ paper.venue }}</p>
              <span class="paper-link-chip" :class="{ 'is-pending': !paper.link }">
                <template v-if="paper.link">Read paper <i class="fa-solid fa-arrow-up-right-from-square"></i></template>
                <template v-else>Link coming soon</template>
              </span>
            </div>
          </component>
        </div>
      </div>
    </section>

    <!-- ===== CONTACT ===== -->
    <section id="contact-section" class="reveal-section" data-reveal>
      <div class="section-inner">
        <h2 class="section-title centered">Let's Talk</h2>
        <div class="contact-grid">
          <a class="contact-card" href="mailto:nizarahmed991ps@gmail.com">
            <i class="fa-solid fa-envelope"></i>
            <span>nizarahmed991ps@gmail.com</span>
          </a>
          <a class="contact-card" href="tel:+447466360651">
            <i class="fa-solid fa-phone"></i>
            <span>+44 7466 360651</span>
          </a>
          <a class="contact-card" href="https://www.linkedin.com/in/nizar-ahmed/" target="_blank" rel="noopener">
            <i class="fa-brands fa-linkedin"></i>
            <span>linkedin.com/in/nizar-ahmed</span>
          </a>
          <a class="contact-card" href="https://github.com/Nizar991" target="_blank" rel="noopener">
            <i class="fa-brands fa-github"></i>
            <span>github.com/Nizar991</span>
          </a>
        </div>
        <p class="footer-note">Designed &amp; built by Nizar Ahmed</p>
      </div>
    </section>

  </div>
</template>

<script>
import { projects, otherSites } from '../data/projects.js';

export default {
  name: "TitleSection",
  data() {
    return {
      isVisible: false,
      heroLoaded: false,
      activeSection: "top",
      selectedSection: "projects",
      flippedCard: null,
      projectCategory: projects[0].category,
      canRoute: !!(this.$router),

      titleText: "Full Stack Development | AI Engineering | Mobile App Development | Media Management",
      personalStatement: "Full Stack Development and Machine Learning experiences using industrially used tools through implementation in self-taught projects. Passionate about Engineering. Developed applications maintaining standards alongside academic projects. Looking forward to corporate experiences. Strongly confident about task accomplishments. Carries a side interest in digital marketing and social media management.",
      strengthText: "Stays positive under pressure and handles difficult situations with patience.",
      weaknessText: "When deeply involved in a project, can lose track of time while working through the details more precisely.",

      navItems: [
        { label: "Home", target: "top" },
        { label: "About", target: "about-section" },
        { label: "Skills", target: "skills-section" },
        { label: "Languages", target: "languages-section" },
        { label: "Projects", target: "projects-section" },
        { label: "Education", target: "education-section" },
        { label: "Experience", target: "employment-section" },
        { label: "Certificates", target: "certificates-section" },
        { label: "Research", target: "research-section" },
        { label: "Contact", target: "contact-section" },
      ],
      navRefs: [],

      progLanguages: ["Python", "Java", "PHP", "JavaScript", "SQL"],

      skillGroups: [
        {
          title: "Automation & Integration",
          icon: "fa-solid fa-gears",
          items: [
            "Workflow Automation with n8n",
            "Machine Learning Models",
            "API Integration Development",
            "System Testing & Debugging",
          ],
        },
        {
          title: "Data & Development",
          icon: "fa-solid fa-database",
          items: [
            "SQL & Data Querying",
            "Database Design, Migration & Optimization",
            "Frontend & Backend Development with Error Handling",
            "Data Pipelines & Processing",
          ],
        },
        {
          title: "Marketing & CRM",
          icon: "fa-solid fa-bullhorn",
          items: [
            "CRM Tools & Social Media Management",
            "Digital Marketing & Content Strategy",
            "Campaign Planning & Audience Engagement",
          ],
        },
      ],

      projects,
      otherSites,

      techStackCategories: [
        {
          title: "Frontend & UI/UX",
          icon: "fa-solid fa-palette",
          items: ["HTML", "CSS", "JavaScript / TypeScript", "React", "Vue.js", "React Native", "Bootstrap", "Tailwind CSS", "UI/UX Design", "Figma", "WordPress", "Shopify", "Wix", "Google Sites"],
        },
        {
          title: "Backend, APIs & Databases",
          icon: "fa-solid fa-server",
          items: ["Node.js", "Laravel", "MERN", "MySQL", "PostgreSQL", "Supabase", "Firebase", "Strapi", "Neo4j", "Graph Database", "n8n", "OpenAI APIs", "REST APIs", "FastAPI", "XAMPP"],
        },
        {
          title: "AI/ML, DevOps & Dev Tools",
          icon: "fa-solid fa-microchip",
          items: ["Prompt Engineering", "Docker", "Hugging Face", "TensorFlow", "Scikit-learn", "Linux", "Git", "GitHub", "Postman", "Render", "Netlify", "VS Code", "NumPy", "Thunkable", "Transformer Models", "Reinforcement Models"],
        },
        {
          title: "Marketing, CRM & Social Media",
          icon: "fa-solid fa-hashtag",
          items: ["CRM Tools", "Social Media Management", "Digital Marketing", "Content Strategy", "Campaign Planning", "Audience Engagement"],
        },
      ],

      educationList: [
        { degree: "MSc in Applied Artificial Intelligence", institution: "University of Huddersfield", period: "2025 – 2026", note: "" },
        { degree: "BSc in Computer Science and Engineering", institution: "Independent University, Bangladesh", period: "2021 – 2024", note: "Minor: General Management" },
      ],

      employmentList: [
        { title: "Social Media Manager", icon: "fa-solid fa-hashtag" },
        { title: "Customer Support Agent", icon: "fa-solid fa-headset" },
        { title: "Warehouse Operative", icon: "fa-solid fa-warehouse" },
        { title: "SIA Door Supervisor", icon: "fa-solid fa-shield-halved" },
      ],

      certificatesList: [
        { title: "OOP Project (Runners-Up)", org: "Independent University, Bangladesh" },
        { title: "AI Engineering Hackathon", org: "Poridhio.io" },
        { title: "Dean Merit List", org: "Independent University, Bangladesh" },
        { title: "MERN Stack Development", org: "Creative IT Institute" },
        { title: "CCNAv7: Introduction to Networks", org: "Cisco Networking Academy" },
        { title: "Milestone in the Revenue to Rewards Program on Applink", org: "Banglalink" },
        { title: "Dean List — 4 times", org: "Independent University, Bangladesh" },
        { title: "Soccerbot Competition", org: "Ahsanullah University of Science and Technology" },
        { title: "Soccerbot Competition", org: "Dhaka University of Engineering & Technology" },
      ],

      researchList: [
        // Paste each paper's URL between the quotes in `link`. Leave "" until you have it.
        { title: "Museum Guidance Robot", venue: "26th International Conference on Human Computer Interaction (HCII 2024)", link: "" },
        { title: "Cultural Robotics", venue: "Second International Workshop on Cultural Robotics (CR 2025) at HRI '25", link: "" },
        { title: "Interactive Library Robot", venue: "2025 ACM/IEEE International Conference on Human-Robot Interaction (HRI '25)", link: "" },
        { title: "mHealth Service App", venue: "6th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI 2025)", link: "" },
      ],

      _particles: [],
      _animFrame: null,
      _observer: null,
      _cursorPos: { x: 0, y: 0 },
      _cursorCurrent: { x: 0, y: 0 },
    };
  },

  computed: {
    nameLetters() {
      return "Nizar Ahmed".split("");
    },
    projectCategories() {
      const seen = [];
      this.projects.forEach((p) => {
        if (!seen.includes(p.category)) seen.push(p.category);
      });
      return seen;
    },
    visibleProjects() {
      return this.projects.filter((p) => p.category === this.projectCategory);
    },
  },

  methods: {
    setNavRef(el, index) {
      if (el) this.navRefs[index] = el;
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    scrollToId(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },

    handleNavClick(item) {
      if (item.target === "top") {
        this.scrollToTop();
      } else {
        this.scrollToId(item.target);
      }
    },

    projectsInCategory(cat) {
      return this.projects.filter((p) => p.category === cat);
    },
    setProjectCategory(cat) {
      this.projectCategory = cat;
      this.flippedCard = null;
    },

    toggleFlip(id) {
      this.flippedCard = this.flippedCard === id ? null : id;
    },

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

    toggleVisibility() {
      this.isVisible = window.scrollY > 400;
    },

    // ---------- Cursor glow ----------
    handleMouseMove(e) {
      this._cursorPos.x = e.clientX;
      this._cursorPos.y = e.clientY;
    },
    animateCursor() {
      this._cursorCurrent.x += (this._cursorPos.x - this._cursorCurrent.x) * 0.12;
      this._cursorCurrent.y += (this._cursorPos.y - this._cursorCurrent.y) * 0.12;
      if (this.$refs.cursorGlow) {
        this.$refs.cursorGlow.style.transform = `translate(${this._cursorCurrent.x}px, ${this._cursorCurrent.y}px)`;
      }
      requestAnimationFrame(this.animateCursor);
    },

    // ---------- 3D tilt ----------
    handleCardTilt(e) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 14;
      const rotateX = ((y / rect.height) - 0.5) * -14;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    },
    resetCardTilt(e) {
      e.currentTarget.style.transform = "";
    },
    handleProfileTilt(e) {
      const wrap = e.currentTarget;
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 18;
      const rotateX = ((y / rect.height) - 0.5) * -18;
      wrap.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },
    resetProfileTilt(e) {
      e.currentTarget.style.transform = "";
    },

    // ---------- Scroll-spy via IntersectionObserver ----------
    setupObserver() {
      const sections = document.querySelectorAll("[data-reveal]");
      this._observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              this.activeSection = entry.target.id;
              this.updateNavIndicator();
            }
          });
        },
        { threshold: 0.05 }
      );
      sections.forEach((s) => this._observer.observe(s));
    },

    updateNavIndicator() {
      this.$nextTick(() => {
        const idx = this.navItems.findIndex((n) => n.target === this.activeSection);
        const el = this.navRefs[idx];
        const indicator = this.$refs.navIndicator;
        if (el && indicator) {
          indicator.style.width = el.offsetWidth + "px";
          indicator.style.transform = `translateX(${el.offsetLeft}px)`;
          indicator.style.opacity = "1";
        }
      });
    },

    // ---------- Constellation canvas ----------
    setupCanvas() {
      const canvas = this.$refs.constellationCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width, height;

      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = document.documentElement.scrollHeight;
      };
      resize();
      window.addEventListener("resize", resize);
      this._resizeHandler = resize;

      const particleCount = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 18000));
      this._particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));

      const colors = ["139,92,246", "79,157,255", "209,107,255"];

      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        const scrollY = window.scrollY;
        const viewTop = scrollY - 200;
        const viewBottom = scrollY + window.innerHeight + 200;

        for (const p of this._particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        for (let i = 0; i < this._particles.length; i++) {
          const p = this._particles[i];
          if (p.y < viewTop || p.y > viewBottom) continue;
          for (let j = i + 1; j < this._particles.length; j++) {
            const q = this._particles[j];
            if (q.y < viewTop || q.y > viewBottom) continue;
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - dist / 140)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }

        for (let i = 0; i < this._particles.length; i++) {
          const p = this._particles[i];
          if (p.y < viewTop || p.y > viewBottom) continue;
          const c = colors[i % colors.length];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c},0.75)`;
          ctx.fill();
        }

        this._animFrame = requestAnimationFrame(draw);
      };
      draw();
    },
  },

  mounted() {
    this.loadFonts();
    window.addEventListener("scroll", this.toggleVisibility);
    window.addEventListener("mousemove", this.handleMouseMove);
    requestAnimationFrame(this.animateCursor);

    this.setupCanvas();
    this.setupObserver();

    setTimeout(() => {
      this.heroLoaded = true;
      this.$nextTick(() => this.updateNavIndicator());
    }, 150);

    window.addEventListener("resize", this.updateNavIndicator);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.toggleVisibility);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("resize", this.updateNavIndicator);
    if (this._resizeHandler) window.removeEventListener("resize", this._resizeHandler);
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
    if (this._observer) this._observer.disconnect();
  },
};
</script>

<style>
/* Unscoped on purpose: :root custom properties must not be attribute-scoped */
@import "../styles/theme-tokens.css";
</style>

<style scoped>
@import "../styles/AboutMe.css";
</style>