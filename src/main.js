import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Axios from 'axios';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import JQuery from 'jquery'
window.$ = JQuery

Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

createApp(App).use(router).use(store).mount('#app')
