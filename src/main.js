import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import './assets/main.css'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia());
app.use(Toast);
app.use(router);

app.mount('#app')
