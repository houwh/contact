import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {
    routers,
    otherRouter,
    employeeRouter,
    productRouter,
    agentRouter,
    customerRouter,
    appRouter
} from './router';
import store from './store';
import {
    axios
} from './api/api';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import Cookies from 'js-cookie';
import 'iview/dist/styles/iview.css';

import moment from 'moment'
moment.locale('zh-cn');

import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';

Vue.prototype.moment = moment
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = 'zh-CN';
// const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
        next(false);
        router.replace({
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            if (Util.getRouterObjByName([agentRouter, customerRouter, employeeRouter, productRouter, otherRouter, ...appRouter], to.name).access !== undefined) { // 判断用户是否有权限访问当前页
                if (Util.getRouterObjByName([agentRouter, customerRouter, employeeRouter, productRouter, otherRouter, ...appRouter], to.name).access === parseInt(Cookies.get('access'))) {
                    next();
                } else {
                    router.replace({
                        name: 'error_401'
                    });
                    next();
                }
            } else {
                next();
            }
        }
    }
    iView.LoadingBar.finish();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

// 状态管理

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        this.$store.dispatch('initCachepage');
        // 权限菜单过滤相关
        this.$store.dispatch('updateMenulist');
    },
    created() {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });

        if (customerRouter.children.length <= 1) {
            tagsList.push(customerRouter.children[0]);
        } else {
            tagsList.push(...customerRouter.children);
        }

        if (agentRouter.children.length <= 1) {
            tagsList.push(agentRouter.children[0]);
        } else {
            tagsList.push(...agentRouter.children);
        }

        if (employeeRouter.children.length <= 1) {
            tagsList.push(employeeRouter.children[0]);
        } else {
            tagsList.push(...employeeRouter.children);
        }

        if (productRouter.children.length <= 1) {
            tagsList.push(productRouter.children[0]);
        } else {
            tagsList.push(...productRouter.children);
        }
        this.$store.dispatch('setTagsList', tagsList);

        axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            Cookies.remove('user');
                            Cookies.remove('password');
                            Cookies.remove('hasGreet');
                            Cookies.remove('access');
                            this.$Notice.close('greeting');
                            this.$store.dispatch('clearOpenedSubmenu');
                            // 回复默认样式
                            let themeLink = document.querySelector('link[name="theme"]');
                            themeLink.setAttribute('href', '');
                            // 清空打开的页面等数据，但是保存主题数据
                            let theme = '';
                            if (localStorage.theme) {
                                theme = localStorage.theme;
                            }
                            localStorage.clear();
                            if (theme) {
                                localStorage.theme = theme;
                            }
                            this.$router.push({
                                name: 'login'
                            });
                    }
                }
                return Promise.reject(error.response.data) // 返回接口返回的错误信息
            });
    },
    watch: {
        '$route' (to) {
            // if (Util.getRouterObjByName(this, to.name).access) {
            //     if (Util.getRouterObjByName(this, to.name).access !== parseInt(Cookies.get('access'))) {
            //         console.log(123)
            //     }
            // }
        }
    }
});