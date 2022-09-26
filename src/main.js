import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {jwtInterceptor } from './_helper/jwtInterceptor';
import {loginCheck } from './_helper/loginCheck';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'

loginCheck();
jwtInterceptor();

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('v-select', vSelect)
Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import 'bootstrap/dist/js/bootstrap.js'

