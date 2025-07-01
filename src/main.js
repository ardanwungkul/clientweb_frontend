import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/font-awesome.css'
import '@/assets/js/font-awesome.min.js'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
})

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
