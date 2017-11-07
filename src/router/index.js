import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import store from '../store/index'

Vue.use(Router);
Vue.use(Vuex);


const router =  new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/index',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                    path: '/',
                    component: resolve => require(['../components/page/index.vue'], resolve)
                },
                {
                    path: '/customer',
                    component: resolve => require(['../components/page/customer/customer.vue'], resolve),
                    meta: {requiresAuth: true}
                },
                {
                    path: '/customerAccount',
                    component: resolve => require(['../components/page/customer/customerAccount.vue'], resolve),
                    meta: {requiresAuth: true}
                },
                {
                    path: '/customerEdit/:id',
                    component: resolve => require(['../components/page/customer/customerEdit.vue'], resolve),
                    meta: {requiresAuth: true}
                },
                {
                    path: '/customerLicense/:id',
                    component: resolve => require(['../components/page/customer/customerLicense.vue'], resolve),
                    meta: {requiresAuth: true}
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/globalConfig/role.vue'], resolve),
                    meta: {requiresAuth: true}
                },
                {
                    path: '/department',
                    component: resolve => require(['../components/page/globalConfig/department.vue'], resolve),
                    meta: {requiresAuth: true}
                },
                {
                    path: '/product',
                    component: resolve => require(['../components/page/product/index.vue'], resolve),
                    meta: {requiresAuth: true}
                },
                {
                    path: '/employee',
                    component: resolve => require(['../components/page/employee/employee.vue'], resolve),
                    meta: {requiresAuth: true}
                },
                {
                    path: '/employeeAdd',
                    component: resolve => require(['../components/page/employee/employeeAdd.vue'], resolve),
                    meta: {requiresAuth: true}
                },
                {
                    path: '/employeeEdit/:id',
                    component: resolve => require(['../components/page/employee/employeeEdit.vue'], resolve),
                    meta: {requiresAuth: true}
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/common/404.vue'], resolve),
            meta: {requiresAuth: true}
        },
        {
            path: '/500',
            component: resolve => require(['../components/common/500.vue'], resolve),
            meta: {requiresAuth: true}
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {// 判断该路由是否需要登录权限
    		console.log("dawdadwad")
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
        		console.log("dawdadwad")
            next();
        }else{
        		console.log('dawdwad')
            next({
                path: '/login',
            })
        }
    }
    else {
        next();
    }
})
export default router;
