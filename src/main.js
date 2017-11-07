import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import ElementUI from 'element-ui';
import moment from 'moment';
import 'element-ui/lib/theme-default/index.css';
import '../static/css/sidebar.css'
import "babel-polyfill";
import '../static/css/input_inner.css'
import './icon/iconfont.css'

moment.locale('zh-cn');
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$axios = axios;


axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(error)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    //store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });



new Vue({
    router,
    store,
    moment,
    render: h => h(App)
}).$mount('#app');

// 客户
// 客户License续费,状态查询,开户

// 员工
// 员工角色查询,部门查询