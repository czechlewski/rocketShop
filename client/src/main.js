import Vue from 'vue'
import App from './App.vue'
import router from '@/routers/routers';
import { store } from '@/store/store';
import axios from 'axios';

axios.defaults.withCredentials = false
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.url = 'http://localhost:8000';

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
