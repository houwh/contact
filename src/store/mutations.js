// 在mutation里面处理格式

import * as types from './mutation-types'
import Cookies from 'js-cookie';
import {
    routers,
    otherRouter,
    appRouter
} from '../router';

export default {
    [types.USER_LOGIN](state, data) {
        state.token = data.data.token;
        state.expire = data.data.expire;
        state.permission = data.data.doc.PermissionFront.list;
    },
    [types.SETTAGSLIST](state, list) {
        console.log('--------------------', 'setTagsList');
        state.tagsList.push(...list);
    },
    [types.CLOSEPAGE](state, name) {
        console.log('--------------------', 'closePage');
        state.cachePage.forEach((item, index) => {
            if (item === name) {
                state.cachePage.splice(index, 1);
            }
        });
    },

    [types.INCREATETAG](state, tagObj) {
        console.log('--------------------', 'increateTag');
        state.cachePage.push(tagObj.name);
        state.pageOpenedList.push(tagObj);
    },

    [types.INITCACHEPAGE](state) {
        console.log('--------------------', 'initCachepage');
        if (localStorage.pageOpenedList) {
            state.cachePage = JSON.parse(localStorage.pageOpenedList).map(item => {
                if (item.name !== 'home_index') {
                    return item.name;
                }
            });
        }
    },

    [types.REMOVETAG](state, name) {
        console.log('--------------------', 'removeTag');
        state.pageOpenedList.map((item, index) => {
            if (item.name === name) {
                state.pageOpenedList.splice(index, 1);
            }
        });
    },

    [types.PAGEOPENEDLIST](state, get) {
        let openedPage = state.pageOpenedList[get.index];
        if (get.argu) {
            openedPage.argu = get.argu;
        }
        if (get.query) {
            openedPage.query = get.query;
        }
        state.pageOpenedList.splice(get.index, 1, openedPage);
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        console.log('--------------------', 'pageOpenedList');
    },

    [types.CLEARALLTAGS](state) {
        console.log('--------------------', 'clearAllTags');
        state.pageOpenedList.splice(1);
        router.push({
            name: 'home_index'
        });
        state.cachePage = [];
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },

    [types.CLEAROTHERTAGS](state, vm) {
        console.log('--------------------', 'clearOtherTags');
        let currentName = vm.$route.name;
        let currentIndex = 0;
        state.pageOpenedList.forEach((item, index) => {
            if (item.name === currentName) {
                currentIndex = index;
            }
        });
        if (currentIndex === 0) {
            state.pageOpenedList.splice(1);
        } else {
            state.pageOpenedList.splice(currentIndex + 1);
            state.pageOpenedList.splice(1, currentIndex - 1);
        }
        let newCachepage = state.cachePage.filter(item => {
            return item === currentName;
        });
        state.cachePage = newCachepage;
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },

    [types.SETOPENEDLIST](state) {
        console.log('--------------------', 'setOpenedList');
        let tmp = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]]
        state.pageOpenedList = tmp.slice();
        console.log('++++++++++++++++++++', 'setOpenedList');
    },

    [types.SETCURRENTPATH](state, pathArr) {
        console.log('--------------------', 'setCurrentPath');
        state.currentPath = pathArr;
    },

    [types.SETCURRENTPAGENAME](state, name) {
        console.log('--------------------', 'setCurrentPageName');
        state.currentPageName = name;
    },

    [types.ADDOPENSUBMENU](state, name) {
        let hasThisName = false;
        let isEmpty = false;
        if (name.length === 0) {
            isEmpty = true;
        }
        if (state.openedSubmenuArr.indexOf(name) > -1) {
            hasThisName = true;
        }
        if (!hasThisName && !isEmpty) {
            state.openedSubmenuArr.push(name);
        }
        console.log('--------------------', 'addOpenSubmenu');
    },

    [types.CLEAROPENEDSUBMENU](state) {
        console.log('--------------------', 'clearOpenedSubmenu');
        state.openedSubmenuArr.length = 0;
    },

    [types.CHANGEMENUTHEME](state, theme) {
        console.log('--------------------', 'changeMenuTheme');
        state.menuTheme = theme;
    },

    [types.CHANGEMAINTHEME](state, mainTheme) {
        console.log('--------------------', 'changeMainTheme');
        state.theme = mainTheme;
    },

    [types.LOCK](state) {
        Cookies.set('locking', '1');
    },

    [types.UNLOCK](state) {
        Cookies.set('locking', '0');
    },

    [types.SETMENULIST](state, menulist) {
        console.log('--------------------', 'setMenuList');
        state.menuList = menulist;
    },

    [types.UPDATEMENULIST](state) {
        console.log('--------------------', 'updateMenulist');
        let accessCode = parseInt(Cookies.get('access'));
        let menuList = [];
        appRouter.forEach((item, index) => {
            if (item.access !== undefined) {
                if (Util.showThisRoute(item.access, accessCode)) {
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (child.access === accessCode) {
                                    return child;
                                }
                            } else {
                                return child;
                            }
                        });
                        menuList[len - 1].children = childrenArr;
                    }
                }
            } else {
                if (item.children.length === 1) {
                    menuList.push(item);
                } else {
                    let len = menuList.push(item);
                    let childrenArr = [];
                    childrenArr = item.children.filter(child => {
                        if (child.access !== undefined) {
                            if (Util.showThisRoute(child.access, accessCode)) {
                                return child;
                            }
                        } else {
                            return child;
                        }
                    });
                    let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                    handledItem.children = childrenArr;
                    menuList.splice(len - 1, 1, handledItem);
                }
            }
        });
        state.menuList = menuList;
    },

    [types.SETAVATOR](state, path) {
        console.log('--------------------', 'setAvator');
        localStorage.avatorImgPath = path;
    }
}