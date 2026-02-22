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
        <div id="title">Full Stack & Mobile App Developer | Media Manager</div>
        <div id="description">
          Passionate about building dynamic web applications and mobile apps, while managing media content to meet client needs and create engaging, user-friendly experiences.
        </div>
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

  <v-container fluid id="second-section-container">
      <v-col cols="12" md="10">
        <v-sheet id="about-me-box" 
        :class="{'grow': isScrolled, 'shrink': !isScrolled}">
          <h2 id="about-me-title">ABOUT ME</h2>
          <p id="about-me-text">
            I am a Full Stack & Mobile App Developer with a passion for creating seamless digital experiences. 
            With expertise in both web and mobile platforms, I focus on delivering highly functional and visually engaging solutions. 
          </p>
          <p id="about-me-description">
            <strong>Experience & Expertise:</strong> Skilled in frontend and backend technologies, ensuring scalable and optimized applications.
            <br class="break-gap"/>
            <strong>Unique Approach:</strong> Combining development and media management to create engaging, user-friendly experiences.
            <br class="break-gap"/>
            <strong>Impact:</strong> Delivering innovative solutions that enhance digital presence and user interaction.
          </p>
        </v-sheet>
      </v-col>
  </v-container>

  <v-container fluid id="skills-container">
    <h2 id="skill-title">SKILLS</h2>
    <v-row id="skills-row"
    :class="{'grow': isScrolled, 'shrink': !isScrolled}">
        <ul id="skill-html">
          <li>UI/UX Design</li>
          <li>Frontend Development</li>
          <li>Backend Development</li>
        </ul>
        <ul id="skill-node">
          <li>SEO Optimization</li>
          <li>Responsive Design</li>
          <li>Digital Media Management</li>
        </ul>
        <ul id="skill-react">
          <li>API Integration</li>
          <li>Code Debugging</li>
          <li>Agile Project Management</li>
        </ul>
    </v-row>
  </v-container>

  <v-container class="project-stack-container">
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
      <!-- Swiper slider replacing the grid for WEB APPLICATIONS -->
      <h2 class="projects-web-title">WEB APPLICATIONS</h2>
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
            <img 
              :src="project.image" 
              :alt="project.caption" 
              class="project-image"
            />
            <!-- Caption shown only if this slide is active -->
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
            <a :href="project.link" target="_blank">
              <img :src="project.image" :alt="project.caption" class="project-web-image" />
            </a>
          </div>
          <div class="project-web-caption">{{ project.caption }}</div>
        </div>
      </div>                                            
    </div>

    <div v-else class="content-box techstack-box">
      <p>Tech Stack Section</p>
    </div>
  </v-container>



  

  <v-container id="demo-1" class="container-1">
    <v-row>
      <v-col>
        <div>
          <h1>Example Container</h1>
          <p class="content-1">This is a demo container with increased height.</p>
        </div>
      </v-col>
    </v-row>
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
        { label: "Projects", type: "route", target: "/projects" },
        { label: "Skills", type: "scroll", target: "skills-container" },
        { label: "Achievements", type: "route", target: "/achievements" },
        { label: "Contact", type: "scroll", target: "contact-section" }
      ],
      
      // For fade animations
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
      fadedState: {}, // Tracks which sections are faded

      // For grow/shrink animations
      animatedSections: [
        {
          id: "about-me-box", 
          lowerThreshold: 0.1,
          growClass: "grow",
          shrinkClass: "shrink",
        },
        {
          id: "skills-row", 
          lowerThreshold: 0.1,
          growClass: "grow",
          shrinkClass: "shrink",
        },
      ],
      // Toggle between Projects and Tech Stack
      // selectedSection: "projects", 

      webProjects: [
        {
          image: "/images/Project1.png",
          caption: "PHP based Web App",
          link: "https://example.com/project1",
        },
        {
          image: "/images/Project2.png",
          caption: "MERN Stack Web App",
          link: "https://example.com/project2",
        },
        {
          image: "/images/Project3.png",
          caption: "Node JS based Robot's Web Interface",
          link: "https://example.com/project3",
        },
        {
          image: "/images/Project4.png",
          caption: "Object Oriented Programming with Java",
          link: "https://example.com/project4",
        },
      ],
      otherProjects: [
        {
          image: "/images/Project5.png",
          caption: "Google Site Development",
          link: "https://example.com/project5",
        },
        {
          image: "/images/Project6.png",
          caption: "Wix Site Development",
          link: "https://example.com/project6",
        },
      ],
    };
  },

  methods: {

    // Handle swiper slider
    onSwiper(swiper) {
      this.swiperInstance = swiper;
    },
    handleSlideClick(index) {
      // If the clicked slide is active, open its link
      if (this.swiperInstance && this.swiperInstance.realIndex === index) {
        window.open(this.webProjects[index].link, '_blank');
      } else if (this.swiperInstance) {
        // Slide the clicked slide into the center.
        // slideToLoop handles looping indexes correctly.
        this.swiperInstance.slideToLoop(index, 300);
      }
    },
    isActiveSlide(index) {
      return this.swiperInstance && this.swiperInstance.realIndex === index;
    },

    // Scroll to top of the page
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    loadFontAwesome() {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
      document.head.appendChild(link);
    },

    // Toggle visibility of scroll-to-top button

    toggleVisibility() {
      this.isVisible = window.scrollY > 200;
    },

    // Open links in new tab

    openLink(url) {
      window.open(url, "_blank");
    },

    // Handle navbar button clicks

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

    // Handle scroll events

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

      // Process fade animations

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

    // Toggle Projects/Tech Stack section
    toggleSection(section) {
      this.selectedSection = section;
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll(); // Initial check on mount
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
