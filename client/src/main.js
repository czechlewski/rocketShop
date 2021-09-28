import Vue from 'vue'
import App from './App.vue'
import router from '@/routers/routers';
import { store } from '@/store/store';
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

axios.defaults.withCredentials = false
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.url = 'http://localhost:8000';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
