import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

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

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')