import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'

// initial state
const state = {
    revenueDataList: [],
    revenueDataCountNum: 0,
    revenueCheck:{}
}

const getters = {
    revenueData: state => state.revenueDataList,
    revenueDataCount: state => state.revenueDataCountNum,
    revenueCheck: state=> state.revenueCheck
}

const actions = {
    getRevenue({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.GETREVENUE(params).then(res => {
                commit(types.REVENUE_SUCCESS, res.data.docs)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    getAllRevenue({
        commit
    }, pageObj) {
        api.GETREVENUE(pageObj).then(result => {
            commit(types.REVENUE_SUCCESS, result.data.docs)
        }).catch(e => {
            console.error(e)
        });
    },
    getFinanceById({commit},data){
        return new Promise((resolve,reject)=>{
            api.getFinanceById(data).then(data=>{
                commit(types.REVENUE_EDIT, data.data.doc)
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    submitProof({commit},data){
        return new Promise((resolve,reject)=>{
            api.submitProof(data).then(data=>{
                commit(types.REVENUE_EDIT, data.data.doc)
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
}

// 在mutation里面做数据处理
const mutations = {
    [types.REVENUE_SUCCESS](state, data) {
        state.revenueDataList = data.rows;
        state.revenueDataCountNum = data.count;
    },
    [types.REVENUE_EDIT](state, data) {
        state.revenueCheck = data;
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}