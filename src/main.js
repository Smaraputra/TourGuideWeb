import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import JQuery from 'jquery'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { FontAwesomeIcon } from './plugins/font-awesome'
import ReadMore from 'vue-read-more';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import './assets/css/main.css';
import './assets/app.css'
import urlHost from '../src/services/url-host'
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
window.$ = JQuery

const app = createApp(App)
app.config.globalProperties.$prefix = {
  imgUrl(value) {
    return urlHost()+value
  },
}
app.config.globalProperties.$filters = {
  formatPrice(value) {
    if (typeof value !== "number") {
      return value;
    }
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  },
}
app.use(router)
app.use(store)
app.use(urlHost)
app.use(VueSweetalert2)
app.use(ReadMore)
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB8F5su7oI3Be2PPgLVjXCeuP731I2N4kk",
    libraries: "places",
  },
})
app.component("EasyDataTable", Vue3EasyDataTable)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount("#app");