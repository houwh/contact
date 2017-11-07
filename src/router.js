import Main from './views/Main.vue';

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['./views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['./views/error_page/404.vue'], resolve);
    }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => {
        require(['./views/error_page/401.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => {
        require(['./views/error_page/500.vue'], resolve);
    }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => {
        require(['./views/form/article-publish/preview.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['./views/main_components/locking-page.vue'], resolve);
    }
};

export const customerRouter = {
    path: '/customer',
    name: 'customerRouter',
    title: '客户账号管理',
    component: Main,
    children: [{
        path: 'add',
        name: 'customer_account_add',
        title: '添加客户',
        component: resolve => {
            require(['./views/customer/add.vue'], resolve);
        }
    }, {
        path: 'edit',
        name: 'customer_account_edit',
        title:'客户编辑',
        component: resolve => {
            require(['./views/customer/edit.vue'], resolve);
        }
    }, {
        path: 'license',
        title: '客户License管理',
        name: 'customer_account_license',
        component: resolve => {
            require(['./views/customer/license.vue'], resolve);
        }
    }, {
        path: 'opened',
        title: '已开户信息',
        name: 'customer_account_opened',
        component: resolve => {
            require(['./views/customer/opened.vue'], resolve);
        }
    }, ]
};
export const employeeRouter = {
    path: '/employee',
    name: 'employeeRouter',
    component: Main,
    children: [{
        path: 'add',
        name: 'employee_account_add',
        title: '添加员工',
        component: resolve => {
            require(['./views/employee/add.vue'], resolve);
        }
    }, {
        path: 'edit',
        name: 'employee_account_edit',
        title: '编辑员工',
        component: resolve => {
            require(['./views/employee/edit.vue'], resolve);
        }
    }]
};
export const financeRouter = {
    path: '/finance',
    name: 'financeRouter',
    component: Main,
    children: [{
        path: 'check',
        name: 'finance_revenue_check',
        title: '财务审核',
        component: resolve => {
            require(['./views/finance/financeCheck.vue'], resolve);
        }
    }]
};

export const productRouter = {
    path: '/product',
    name: 'productRouter',
    component: Main,
    children: [{
        path: 'add',
        name: 'product_account_add',
        title: '添加产品',
        component: resolve => {
            require(['./views/product/add.vue'], resolve);
        }
    }, {
        path: 'edit',
        name: 'product_account_edit',
        title: '编辑产品',
        component: resolve => {
            require(['./views/product/edit.vue'], resolve);
        }
    }]
};

export const agentRouter = {
    path: '/agent',
    name: 'agentRouter',
    component: Main,
    children: [{
        path: 'add',
        name: 'agent_account_add',
        title: '添加代理商',
        component: resolve => {
            require(['./views/agent/add.vue'], resolve);
        }
    }, {
        path: 'edit',
        name: 'agent_account_edit',
        title:'编辑代理商',
        component: resolve => {
            require(['./views/agent/edit.vue'], resolve);
        }
    }, {
        path: 'license',
        name: 'agent_account_license',
        title:'代理商License',
        component: resolve => {
            require(['./views/agent/license.vue'], resolve);
        }
    }]
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'home',
            title: '首页',
            name: 'home_index',
            component: resolve => {
                require(['./views/home/home.vue'], resolve);
            }
        }, {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: resolve => {
                require(['./views/own-space/own-space.vue'], resolve);
            }
        }, {
            path: 'ownspace/:username',
            title: '带参个人中心',
            name: 'ownspace_with_name',
            component: resolve => {
                require(['./views/own-space/own-space.vue'], resolve);
            }
        }, // 用于展示带参路由
        {
            path: 'order/:order_id',
            title: '订单详情',
            name: 'order_info',
            component: resolve => {
                require(['./views/argument-page/order-info.vue'], resolve);
            }
        }, // 用于展示带参路由
        {
            path: 'message',
            title: '消息中心',
            name: 'message_index',
            component: resolve => {
                require(['./views/message/message.vue'], resolve);
            }
        },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里

export const appRouter = [{
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    title: '首页',
    icon: 'home',
    component: Main,
    component: resolve => {
        require(['./views/home/home.vue'], resolve);
    },
    children: [{
        path: 'home',
        title: '首页',
        name: 'home_index',
        component: resolve => {
            require(['./views/home/home.vue'], resolve);
        }
    }]
}, {
    path: '/customer',
    redirect: '/component/account',
    icon: 'android-contact',
    title: '客户管理',
    name: 'customer',
    component: Main,
    children: [{
        path: 'account',
        icon: '',
        title: '客户账号管理',
        name: 'customer_account',
        component: resolve => {
            require(['./views/customer/account.vue'], resolve);
        }
    }, {
        path: 'extern',
        icon: '',
        title: '外部账号管理',
        name: 'extern_account',
        component: resolve => {
            require(['./views/customer/extern.vue'], resolve);
        }
    }]
}, {
    path: '/agent',
    icon: 'android-contacts',
    title: '代理商管理',
    name: 'agent',
    component: Main,
    children: [{
        path: 'account',
        title: '代理商账号管理',
        name: 'agent_account',
        component: resolve => {
            require(['./views/agent/account.vue'], resolve);
        }
    }]
}, {
    path: '/sales',
    icon: 'arrow-graph-up-right',
    title: '销售管理',
    name: 'sales',
    component: Main,
    children: [{
        path: 'visitor',
        icon: '',
        title: '留电访客管理',
        name: 'visitor',
        component: resolve => {
            require(['./views/sales/visitor.vue'], resolve);
        }
    }, {
        path: 'expand',
        title: '拓展客户管理',
        name: 'expand',
        icon: '',
        component: resolve => {
            require(['./views/sales/expand.vue'], resolve);
        }
    }]
}, {
    path: '/employee',
    icon: 'ios-people',
    title: '员工管理',
    name: 'employee',
    component: Main,
    children: [{
        path: 'account',
        title: '账号管理',
        name: 'employee_account',
        component: resolve => {
            require(['./views/employee/account.vue'], resolve);
        }
    }]
}, {
    path: '/finance',
    title: '财务管理',
    name: 'finance',
    icon: 'social-usd',
    component: Main,
    children: [{
        path: 'revenue',
        title: '收入管理',
        name: 'revenue',
        component: resolve => {
            require(['./views/finance/revenue.vue'], resolve);
        }
    }]
}, {
    path: '/product',
    icon: 'ios-cart',
    title: '产品管理',
    name: 'product',
    component: Main,
    children: [{
        path: 'index',
        title: '产品管理',
        name: 'product_index',
        component: resolve => {
            require(['./views/product/index.vue'], resolve);
        }
    }]
}, {
    path: '/global',
    title: '全局配置',
    icon: 'gear-a',
    name: 'global',
    component: Main,
    children: [{
        path: 'department',
        title: '部门管理',
        name: 'department',
        icon: '',
        component: resolve => {
            require(['./views/global/department.vue'], resolve);
        }
    }, {
        path: 'role',
        title: '角色管理',
        name: 'role',
        icon: '',
        component: resolve => {
            require(['./views/global/role.vue'], resolve);
        }
    }]
}];

export const routers = [
    loginRouter,
    otherRouter,
    customerRouter,
    agentRouter,
    employeeRouter,
    productRouter,
    financeRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page401,
    page404,
];