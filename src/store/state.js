/*
 * @Author: cuiweiqiang
 * @Date:   2017-10-24 11:05:20
 * @Last Modified by:   cuiweiqiang
 * @Last Modified time: 2017-10-31 14:00:25
 */
import {
    financeRouter,
    employeeRouter,
    productRouter,
    customerRouter,
    agentRouter,
    routers,
    otherRouter,
    appRouter
} from '../router';

const state = {
    routers: [
        financeRouter,
        productRouter,
        employeeRouter,
        agentRouter,
        customerRouter,
        otherRouter,
        ...appRouter
    ],
    menuList: [],
    tagsList: [...otherRouter.children],
    pageOpenedList: [],
    currentPageName: '',
    currentPath: [{
        title: '首页',
        path: '',
        name: 'home_index'
    }], // 面包屑数组
    openedSubmenuArr: [], // 要展开的菜单数组
    menuTheme: '', // 主题
    theme: '',
    cachePage: []
};

export default state;