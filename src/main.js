import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import { FontAwesomeIcon } from './plugins/font-awesome'
import JQuery from 'jquery'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'sweetalert2/dist/sweetalert2.min.css';
window.$ = JQuery
import './assets/css/main.css';
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

createApp(App).use(router).use(store).use(VueSweetalert2).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyB8F5su7oI3Be2PPgLVjXCeuP731I2N4kk',
        libraries: "places"
    },
}).component("font-awesome-icon", FontAwesomeIcon).mount('#app')