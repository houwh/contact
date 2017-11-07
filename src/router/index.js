import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'
import {getToken} from '../utils/auth'
import {mapActions} from 'vuex'

Vue.use(Router);

const router = new Router({
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
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                    component: resolve => require(['../components/page/customer/customer.vue'], resolve)
                },
                {
                    path: '/customerAdd',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/customer/customerAdd.vue'], resolve)
                },
                {
                    path: '/customerEdit',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/customer/customerEdit.vue'], resolve)
                },
                {
                    path: '/customerLicense',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/customer/customerLicense.vue'], resolve)
                },
                {
                    path: '/agent',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/agent/agent.vue'], resolve)
                },
                {
                    path: '/agentAdd',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/agent/agentAdd.vue'], resolve)
                },
                {
                    path: '/agentEdit',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/agent/agentEdit.vue'], resolve)
                },
                {
                    path: '/agentLicense',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/agent/agentLicense.vue'], resolve)
                },
                {
                    path: '/finance',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/finance/finance.vue'], resolve)
                },
                {
                    path: '/financeCheck',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/finance/financeCheck.vue'], resolve)
                },
                {
                    path: '/product',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/product/product.vue'], resolve)
                },
                {
                    path: '/productJurisdiction',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/product/productJurisdiction.vue'],resolve)
                },
                {
                    path:'/productRole',
                    meta:{
                        requireAuth: true,
                    },
                    component:resolve => require(['../components/page/product/productRole'],resolve)
                },
                {
                    path:"/prodBox",
                    component:resolve => require(['../components/page/product/prodBox'],resolve)
                },
                {
                    path:"/productAdd",
                    component:resolve => require(['../components/page/product/productAdd'],resolve)
                },
                {
                    path:"/productEdit",
                    component:resolve => require(['../components/page/product/productEdit'],resolve)
                },
                {
                    path: '/employee',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/employee/employee.vue'], resolve)
                },
                {
                    path: '/employeeAdd',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/employee/employeeAdd.vue'], resolve)
                },
                {
                    path: '/employeeEdit',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/employee/employeeEdit.vue'], resolve)
                },
                {
                    path: '/label',
                    meta:{
                        requireAuth: true,
                    },
                    component: resolve => require(['../components/page/globalConfig/label.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})


if(getToken("Token")){
   store.commit("loginTo",{token:getToken("Token")})
}


router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login'
            })
        }
    }
    else {
        next();
    }
})


export default router


