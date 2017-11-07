import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'

// initial state
const state = {
    customerDataList: [],
    customerDataCountNum: 0,

    cusLicenseList: [], //customer license 
    cusLicenseCountNum: 0,

    cusByIdData: {},
}

const getters = {
    customerData: state => state.customerDataList,
    customerDataCount: state => state.customerDataCountNum,

    cusLicenseData: state => state.cusLicenseList,
    cusLicenseDataCount: state => state.cusLicenseCountNum,

    cusById: state => state.cusByIdData

}

const actions = {
    getCustomer({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.GETCUSTOMER(params).then(res => {
                commit(types.CUSTOMER_SUCCESS, res.data.docs)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    getAllCustomer({
        commit
    }, pageObj) {
        api.GETCUSTOMER(pageObj).then(result => {
            commit(types.CUSTOMER_SUCCESS, result.data.docs)
        }).catch(e => {
            console.error(e)
        });
    },
    // customerLicense
    getCusPer({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.getCusPer(params).then(res => {
                commit(types.CUSLICENSE_SUCCESS, res.data.docs)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    customerAdd({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.CUSTOMERADD(data).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getCustomerByID({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.GETCUSTOMERBYID(data).then(data => {
                let idData = data.data.doc;
                idData.password = '';
                commit(types.CUSTOMER_EDIT, idData)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 正式授权时，判断其是否为永久产品
    addCusPer({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.addCusPer(data).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 外部账号管理列表
    getAccLink({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.getAccLink(data).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    addCusPer2({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.addCusPer2(data).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

// 在mutation里面做数据处理
const mutations = {
    [types.CUSTOMER_SUCCESS](state, data) {
        state.customerDataList = data.rows;
        state.customerDataCountNum = data.count;
    },
    [types.CUSLICENSE_SUCCESS](state, data) {
        state.cusLicenseList = data.rows;
        state.cusLicenseCountNum = data.count;
    },
    [types.CUSTOMER_EDIT](state, data) {
        state.cusByIdData = data;
    },
}


export default {
    state,
    getters,
    actions,
    mutations
}