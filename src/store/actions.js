import api from '../api/api'
import Cookies from 'js-cookie';
import * as types from './mutation-types'

// let actions = {};

// 客户模块
export const UserLogin = ({
    commit
}, {
    params,
    $router
}) => {
    return new Promise((resolve, reject) => {
        api.USERLOGIN(params).then(data => {
            if (data.status == 200) {
                Cookies.set('user', data.data.doc.userRealName);
                Cookies.set('token', data.data.token);
                commit(types.USER_LOGIN, data);
                $router.push({
                    name: 'home_index'
                });
                resolve(data);
            }
        }).catch(err => {
            return reject(err);
        });
    });
};

export const setAvator = ({
    commit
}, params) => {
    commit(types.SETAVATOR, params);
};


export const setCurrentPageName = ({
    commit
}, params) => {
    commit(types.SETCURRENTPAGENAME, params);
};

export const addOpenSubmenu = ({
    commit
}, params) => {
    commit(types.ADDOPENSUBMENU, params);
};

export const clearOpenedSubmenu = ({
    commit
}) => {
    commit(types.CLEAROPENEDSUBMENU);
};

export const lock = ({
    commit
}) => {
    commit(types.LOCK);
};

export const changeMenuTheme = ({
    commit
}, params) => {
    commit(types.CHANGEMENUTHEME, params);
};

export const changeMainTheme = ({
    commit
}, params) => {
    commit(types.CHANGEMAINTHEME, params);
};

export const setOpenedList = ({
    commit
}) => {
    commit(types.SETOPENEDLIST);
};

export const initCachepage = ({
    commit
}) => {
    commit(types.INITCACHEPAGE);
};

export const updateMenulist = ({
    commit
}) => {
    commit(types.UPDATEMENULIST);
};

export const setTagsList = ({
    commit
}, params) => {
    commit(types.SETTAGSLIST, params);
};

export const setCurrentPath = ({
    commit
}, params) => {
    commit(types.SETCURRENTPATH, params);
};

export const pageOpenedList = ({
    commit
}, params) => {
    commit(types.PAGEOPENEDLIST, params);
};

export const increateTag = ({
    commit
}, params) => {
    commit(types.INCREATETAG, params);
};

export const removeTag = ({
    commit
}, params) => {
    commit(types.REMOVETAG, params);
};

export const clearAllTags = ({
    commit
}) => {
    commit(types.CLEARALLTAGS);
};

export const clearOtherTags = ({
    commit
}, params) => {
    commit(types.CLEAROTHERTAGS, params);
};

export const unlock = ({
    commit
}) => {
    commit(types.UNLOCK);
};