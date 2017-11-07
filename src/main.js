import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex'
import store from 'store'
import Cookies from 'js-cookie'

import "babel-polyfill";
import fn from './bootstrap/input/jquery-1.10.2.min'
import $ from './bootstrap/input/jquery-1.10.2.min'
import jquery from './bootstrap/input/jquery-1.10.2.min'
import './bootstrap/js/bootstrap.min.js'
import './bootstrap/css/bootstrap.min.css'
import './components/page/iconfont/iconfont.css'

import './bootstrap/input/bootstrapValidator.css'
import './bootstrap/input/bootstrapValidator'

Vue.prototype.$axios = axios;
Vue.use(Vuex)
new Vue({
    store,
    jquery,
    $,fn,
    Vuex,
    router,
    render: h => h(App)
}).$mount('#app');



