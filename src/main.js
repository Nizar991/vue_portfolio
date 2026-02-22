import { createApp } from 'vue'
import './style.css'
import AboutMe from './components/AboutMe.vue'

// Import Vuetify and its styles
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  icons: {
    iconfont: 'fa', 
  },
})

createApp(AboutMe)
  .use(vuetify)
  .mount('#app')
