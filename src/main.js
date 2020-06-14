import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './assets/styles/reset.css'
// import remAndPhoneConfg from '../remConfig.js'
import '../remConfig.js'

import axios from 'axios'

axios.interceptors.request.use(config=>{
  console.log(config);
  // config.url = 'http://127.0.0.1' + config.url;
  return config;
})


// remAndPhoneConfg();

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app");

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})