<template>
  <button v-show="isVisible" @click="scrollToTop" class="scroll-to-top">
    <i class="fas fa-arrow-up"></i>
  </button>

  <v-container fluid id="video-container">

      <video id="bg_video" autoplay loop muted playsinline>
        <source src="/videos/portfolio_bg.mp4" type="video/mp4" />
      </video>

      <v-app-bar id="navbar" app fixed elevation="0">
        <v-btn
          v-for="(item, index) in navItems"
          :key="index"
          :id="'nav-item-' + index"
          variant="text"
          @click="handleNavClick(item)"
        >
          {{ item.label }}
        </v-btn>
      </v-app-bar>

      <v-sheet id="video_overlay"></v-sheet>

    <v-row id="content-row">

      <v-col cols="12" md="6" id="left-section" :class="{'fade-out-left': isScrolled, 'fade-in-from-left': !isScrolled && scrolledOnce}">
        <div id="name">Nizar Ahmed</div>
        <div id="title">Full Stack Development | AI Engineering | Mobile App Development | Media Management</div>
        <div id="social-icons">
          <v-icon id="gmail-icon" data-aos="zoom-in" data-aos-delay="100">
            <a href="mailto:nizarahmed991ps@gmail.com">
              <i class="fa-brands fa-google"></i>
            </a>
          </v-icon>
          <v-icon id="linkedin-icon" @click="openLink('https://www.linkedin.com/in/nizar-ahmed/')" data-aos="zoom-in" data-aos-delay="200">
            <i class="fa-brands fa-linkedin"></i>
          </v-icon>
          <v-icon id="github-icon" @click="openLink('https://github.com/Nizar991')" data-aos="zoom-in" data-aos-delay="300">
            <i class="fa-brands fa-github"></i>
          </v-icon>
          <v-icon id="cv-icon" @click="openLink('/cv/CV_NizarAhmed.pdf')" data-aos="zoom-in" data-aos-delay="400">
            <i class="fa-solid fa-file-pdf"></i>
          </v-icon>
        </div>
      </v-col>

      <v-col cols="12" md="6" id="right-section" data-aos="fade-up" data-aos-duration="1000">
        <img
        id="profile-pic"
        src="/images/Profile_Pic.png"
        alt="Profile Picture"
        :class="{'fade-out-up': isScrolled, 'fade-in-from-top': !isScrolled && scrolledOnce}"/>
      </v-col>
    </v-row>

  </v-container>

  <!-- ===================== ABOUT ME ===================== -->
  <v-container fluid id="second-section-container" class="white-section">
    <div class="blob blob-about-1"></div>
    <div class="blob blob-about-2"></div>
    <v-col cols="12" md="10">
      <v-sheet id="about-me-box"
      :class="{'grow': isScrolled, 'shrink': !isScrolled}">
        <h2 id="about-me-title">ABOUT ME</h2>
        <p id="about-me-text">
          Full Stack Development and Machine Learning experiences using industrially used tools to implement in self-taught projects. Passionate about Engineering. Developed applications maintaining standards apart from academic projects. Looking forward to corporate experiences. Strongly confident about task accomplishments.
        </p>
      </v-sheet>
    </v-col>
  </v-container>

  <!-- ===================== SKILLS ===================== -->
  <v-container fluid id="skills-container" class="white-section">
    <div class="blob blob-skills-1"></div>
    <h2 id="skill-title">SKILLS</h2>

    <v-row
      id="skills-row"
      :class="{ 'grow': isScrolled, 'shrink': !isScrolled }"
    >
      <ul id="skill-html">
        <li>• Workflow Automation with n8n</li>
        <li>• Machine Learning Models</li>
        <li>• API Integration Development</li>
        <li>• System Testing &amp; Debugging</li>
      </ul>

      <ul id="skill-node">
        <li>• SQL &amp; Data Querying</li>
        <li>• Database Design, Migration &amp; Optimization</li>
        <li>• Frontend &amp; Backend Development with Error Handling</li>
        <li>• Data Pipelines &amp; Processing</li>
      </ul>
    </v-row>
  </v-container>

  <!-- ===================== PROGRAMMING LANGUAGES ===================== -->
  <v-container fluid id="proglang-container" class="white-section">
    <div class="blob blob-proglang-1"></div>
    <h2 class="section-title">PROGRAMMING LANGUAGES</h2>
    <div id="proglang-box" class="pill-row" :class="{ 'grow': isScrolled, 'shrink': !isScrolled }">
      <span class="pill" v-for="(lang, index) in progLanguages" :key="'lang-' + index">
        {{ lang }}
      </span>
    </div>
  </v-container>

  <!-- ===================== PROJECTS / TECH STACK TOGGLE ===================== -->
  <v-container id="projects-section" class="project-stack-container white-section">
    <div class="blob blob-toggle-1"></div>
    <div class="button-container">
      <div
        class="toggle-button"
        :class="{ active: selectedSection === 'projects' }"
        @click="selectedSection = 'projects'"
      >
        Projects
      </div>
      <div
        class="toggle-button"
        :class="{ active: selectedSection === 'techStack' }"
        @click="selectedSection = 'techStack'"
      >
        Tech Stack
      </div>
    </div>

    <!-- Content Sections -->
    <div v-if="selectedSection === 'projects'" class="content-box projects-box">
      <h2 class="projects-web-title">PROJECTS</h2>
      <swiper
        :slides-per-view="3"
        :space-between="30"
        :centered-slides="true"
        :loop="true"
        effect="coverflow"
        :coverflow-effect="{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false
        }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        class="mySwiper"
        @swiper="onSwiper"
      >
        <swiper-slide
          v-for="(project, index) in webProjects"
          :key="'web-slide-' + index"
          @click="handleSlideClick(index)"
        >
        <div class="project-item">
            <div class="project-visual">
              <i :class="project.icon"></i>
            </div>
            <div v-if="isActiveSlide(index)" class="project-caption">
              {{ project.caption }}
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <h2 class="projects-other-title">OTHER SITES</h2>
      <div class="projects-web-grid">
        <div
          class="project-web-item"
          v-for="(project, index) in otherProjects"
          :key="'other-' + index"
        >
          <div class="image-wrapper">
            <a v-if="project.link" :href="project.link" target="_blank">
              <div class="project-web-visual">
                <i :class="project.icon"></i>
              </div>
            </a>
            <div v-else class="project-web-visual">
              <i :class="project.icon"></i>
            </div>
          </div>
          <div class="project-web-caption">{{ project.caption }}</div>
        </div>
      </div>
    </div>

    <div v-else class="content-box techstack-box">
      <h2 class="projects-web-title">TECH STACK</h2>
      <div class="techstack-grid">
        <div class="techstack-card" v-for="(cat, index) in techStackCategories" :key="'tech-' + index">
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
  </v-container>

  <!-- ===================== EDUCATION ===================== -->
  <v-container fluid id="education-container" class="white-section">
    <div class="blob blob-education-1"></div>
    <h2 class="section-title">EDUCATION</h2>
    <div id="education-box" class="education-list" :class="{ 'grow': isScrolled, 'shrink': !isScrolled }">
      <div class="education-card" v-for="(edu, index) in educationList" :key="'edu-' + index">
        <i class="fa-solid fa-graduation-cap"></i>
        <div>
          <h3>{{ edu.degree }}</h3>
          <p class="education-meta">{{ edu.institution }} &middot; {{ edu.period }}</p>
          <p v-if="edu.note" class="education-note">{{ edu.note }}</p>
        </div>
      </div>
    </div>
  </v-container>

  <!-- ===================== EMPLOYMENT HISTORY ===================== -->
  <v-container fluid id="employment-container" class="white-section">
    <div class="blob blob-employment-1"></div>
    <h2 class="section-title">EMPLOYMENT HISTORY</h2>
    <div id="employment-box" class="employment-grid" :class="{ 'grow': isScrolled, 'shrink': !isScrolled }">
      <div class="employment-card" v-for="(job, index) in employmentList" :key="'job-' + index">
        <i :class="job.icon"></i>
        <span>{{ job.title }}</span>
      </div>
    </div>
  </v-container>

  <!-- ===================== CERTIFICATES ===================== -->
  <v-container fluid id="certificates-container" class="white-section">
    <div class="blob blob-certificates-1"></div>
    <div class="blob blob-certificates-2"></div>
    <h2 class="section-title">CERTIFICATES</h2>
    <div id="certificates-box" class="certificates-grid" :class="{ 'grow': isScrolled, 'shrink': !isScrolled }">
      <div class="certificate-card" v-for="(cert, index) in certificatesList" :key="'cert-' + index">
        <i class="fa-solid fa-award"></i>
        <div>
          <h3>{{ cert.title }}</h3>
          <p>{{ cert.org }}</p>
        </div>
      </div>
    </div>
  </v-container>

  <!-- ===================== RESEARCH PAPERS ===================== -->
  <v-container fluid id="research-container" class="white-section">
    <div class="blob blob-research-1"></div>
    <h2 class="section-title">RESEARCH PAPERS</h2>
    <div id="research-box" class="research-grid" :class="{ 'grow': isScrolled, 'shrink': !isScrolled }">
      <div class="research-card" v-for="(paper, index) in researchList" :key="'paper-' + index">
        <i class="fa-solid fa-file-lines"></i>
        <div>
          <h3>{{ paper.title }}</h3>
          <p>{{ paper.venue }}</p>
        </div>
      </div>
    </div>
  </v-container>

  <!-- ===================== CONTACT ===================== -->
  <v-container fluid id="contact-section" class="white-section">
    <div class="blob blob-contact-1"></div>
    <h2 class="section-title">CONTACT</h2>
    <div id="contact-box" class="contact-grid" :class="{ 'grow': isScrolled, 'shrink': !isScrolled }">
      <a class="contact-card" href="mailto:nizarahmed991ps@gmail.com">
        <i class="fa-solid fa-envelope"></i>
        <span>nizarahmed991ps@gmail.com</span>
      </a>
      <a class="contact-card" href="tel:+447466360651">
        <i class="fa-solid fa-phone"></i>
        <span>+44 7466 360651</span>
      </a>
      <a class="contact-card" href="https://www.linkedin.com/in/nizar-ahmed/" target="_blank">
        <i class="fa-brands fa-linkedin"></i>
        <span>linkedin.com/in/nizar-ahmed</span>
      </a>
      <a class="contact-card" href="https://github.com/Nizar991" target="_blank">
        <i class="fa-brands fa-github"></i>
        <span>github.com/Nizar991</span>
      </a>
      <!-- <div class="contact-card contact-card--static">
        <i class="fa-solid fa-location-dot"></i>
        <span>Willing to relocate &middot; Eligible for Full Time, switching to Graduate Visa soon</span>
      </div> -->
    </div>
  </v-container>

</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

export default {
  name: "TitleSection",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isVisible: false,
      isScrolled: false,
      scrolledOnce: false,
      selectedSection: "projects",

      navItems: [
        { label: "Home", type: "scroll", target: "top" },
        { label: "About", type: "scroll", target: "second-section-container" },
        { label: "Skills", type: "scroll", target: "skills-container" },
        { label: "Languages", type: "scroll", target: "proglang-container" },
        { label: "Projects", type: "scroll", target: "projects-section" },
        { label: "Education", type: "scroll", target: "education-container" },
        { label: "Experience", type: "scroll", target: "employment-container" },
        { label: "Certificates", type: "scroll", target: "certificates-container" },
        { label: "Research", type: "scroll", target: "research-container" },
        { label: "Contact", type: "scroll", target: "contact-section" },
      ],

      // For fade animations (hero section only)
      fadedSections: [
        {
          id: "left-section",
          fadeInClass: "fade-in-from-left",
          fadeOutClass: "fade-out-left",
        },
        {
          id: "right-section",
          fadeInClass: "fade-in-from-top",
          fadeOutClass: "fade-out-up",
        },
      ],
      fadedState: {},

      // For grow/shrink scroll-reveal animations
      animatedSections: [
        { id: "about-me-box", lowerThreshold: 0.1, growClass: "grow", shrinkClass: "shrink" },
        { id: "skills-row", lowerThreshold: 0.1, growClass: "grow", shrinkClass: "shrink" },
        { id: "proglang-box", lowerThreshold: 0.1, growClass: "grow", shrinkClass: "shrink" },
        { id: "education-box", lowerThreshold: 0.1, growClass: "grow", shrinkClass: "shrink" },
        { id: "employment-box", lowerThreshold: 0.1, growClass: "grow", shrinkClass: "shrink" },
        { id: "certificates-box", lowerThreshold: 0.1, growClass: "grow", shrinkClass: "shrink" },
        { id: "research-box", lowerThreshold: 0.1, growClass: "grow", shrinkClass: "shrink" },
        { id: "contact-box", lowerThreshold: 0.1, growClass: "grow", shrinkClass: "shrink" },
      ],

      progLanguages: ["Python", "Java", "PHP", "JavaScript", "SQL"],

      webProjects: [
        {
          caption: "Multi-Category Hate Detection (Transformer ML + Contextual Bandit) — Dissertation",
          icon: "fa-solid fa-brain",
          image: "/images/Project1.png",
        },
        {
          caption: "Library Robot — Semantic Search & ChatGPT API Integration — Thesis",
          icon: "fa-solid fa-robot",
          image: "/images/Project2.png",
        },
        {
          caption: "Laravel Neo4j Graph Relationship Management System",
          icon: "fa-solid fa-sitemap",
          image: "/images/Project3.png",
        },
        {
          caption: "E2E Product Categorizer with Trained ML Model",
          icon: "fa-solid fa-boxes-stacked",
          image: "/images/Project4.png",
        },
        {
          caption: "MERN Based CRUD Production Site for Staff Use",
          icon: "fa-brands fa-node-js",
          image: "/images/Project5.png",
        },
        {
          caption: "PHP Based Full Stack Weather Application",
          icon: "fa-solid fa-cloud-sun",
          image: "/images/Project6.png",
        },
        {
          caption: "Accessible Telemedicine Application (PHP)",
          icon: "fa-solid fa-stethoscope",
          image: "/images/Project7.png",
        },
        {
          caption: "LC Management of Bank (Java)",
          icon: "fa-brands fa-java",
          image: "/images/Project8.png",
        },
        {
          caption: "Fuzzy Decision & Topic Modelling for UK Used Car Price Prediction",
          icon: "fa-solid fa-chart-line",
          image: "/images/Project9.png",
        },
      ],
      otherProjects: [
        {
          caption: "Google Site Development",
          icon: "fa-brands fa-google",
          image: "/images/Project10.png",
          link: "",
        },
        {
          caption: "Wix Site Development",
          icon: "fa-solid fa-globe",
          image: "/images/Project11.png",
          link: "",
        },
        {
          caption: "Shopify Store Development",
          icon: "fa-brands fa-shopify",
          image: "/images/Project12.png",
          link: "",
        },
        {
          caption: "WordPress Site Development",
          icon: "fa-brands fa-wordpress-simple",
          image: "/images/Project13.png",
          link: "",
        },
      ],

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
          items: ["Docker", "Hugging Face", "TensorFlow", "Scikit-learn", "Linux", "Git", "GitHub", "Postman", "Render", "Netlify", "VS Code", "NumPy", "Thunkable", "Transformer Models", "Reinforcement Models"],
        },
      ],

      educationList: [
        {
          degree: "MSc in Applied Artificial Intelligence",
          institution: "University of Huddersfield",
          period: "2025 – 2026",
          note: "",
        },
        {
          degree: "BSc in Computer Science and Engineering",
          institution: "Independent University, Bangladesh",
          period: "2021 – 2024",
          note: "Minor: General Management",
        },
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
        { title: "Museum Guidance Robot", venue: "26th International Conference on Human Computer Interaction (HCII 2024)" },
        { title: "Cultural Robotics", venue: "Second International Workshop on Cultural Robotics (CR 2025) at HRI '25" },
        { title: "Interactive Library Robot", venue: "2025 ACM/IEEE International Conference on Human-Robot Interaction (HRI '25)" },
        { title: "mHealth Service App", venue: "6th International Conference on Mobile Computing and Sustainable Informatics (ICMCSI 2025)" },
      ],
    };
  },

  methods: {
    onSwiper(swiper) {
      this.swiperInstance = swiper;
    },
    handleSlideClick(index) {
      if (this.swiperInstance && this.swiperInstance.realIndex === index) {
        if (this.webProjects[index].link) {
          window.open(this.webProjects[index].link, '_blank');
        }
      } else if (this.swiperInstance) {
        this.swiperInstance.slideToLoop(index, 300);
      }
    },
    isActiveSlide(index) {
      return this.swiperInstance && this.swiperInstance.realIndex === index;
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    loadFontAwesome() {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
      document.head.appendChild(link);
    },

    toggleVisibility() {
      this.isVisible = window.scrollY > 200;
    },

    openLink(url) {
      window.open(url, "_blank");
    },

    handleNavClick(item) {
      if (item.type === "scroll") {
        if (item.target === "top") {
          this.scrollToTop();
        } else {
          const element = document.getElementById(item.target);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else if (item.type === "route") {
        this.$router.push(item.target);
      }
    },

    handleScroll() {
      this.animatedSections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const threshold = viewportHeight * section.lowerThreshold;
          const isVisible = rect.top < (viewportHeight - threshold);

          element.classList.toggle(section.growClass, isVisible);
          element.classList.toggle(section.shrinkClass, !isVisible);
        }
      });

      this.fadedSections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const isVisible = rect.top < viewportHeight * 0.8 && rect.bottom > viewportHeight * 0.4;

          if (!this.fadedState[section.id] && isVisible) {
            element.classList.add(section.fadeInClass);
            element.classList.remove(section.fadeOutClass);
            this.fadedState[section.id] = true;
          } else if (this.fadedState[section.id] && !isVisible) {
            element.classList.add(section.fadeOutClass);
            element.classList.remove(section.fadeInClass);
            this.fadedState[section.id] = false;
          }
        }
      });
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
    window.addEventListener("scroll", this.toggleVisibility);

    this.loadFontAwesome();
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("scroll", this.toggleVisibility);
  },
};
</script>

<style scoped>
@import "../styles/AboutMe.css";
</style>