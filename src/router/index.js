import { createRouter, createWebHistory } from 'vue-router'
import AboutMe from '../components/AboutMe.vue'
import ProjectDetail from '../components/ProjectDetail.vue'

const routes = [
  { path: '/', component: AboutMe },
  {
    path: '/project/:id',
    component: ProjectDetail,
    props: true,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})