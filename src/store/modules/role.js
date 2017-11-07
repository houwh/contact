import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'

// initial state
const state = {
    roleDataList: [],
    roleDataCountNum: 0,
    roleById:{}
}

const getters = {
    roleData: state => state.roleDataList,
    roleDataCount: state => state.roleDataCountNum,
    roleByIdData: state=> state.roleById
}

const actions = {
    getRole({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.GETROLE(params).then(res => {
                commit(types.ROLE_SUCCESS, res.data.docs)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    getAllRole({
        commit
    }, pageObj) {
        api.GETROLE(pageObj).then(result => {
            commit(types.ROLE_SUCCESS, result.data.docs)
        }).catch(e => {
            console.error(e)
        });
    },
    getRoleByID({commit},data){
        return new Promise((resolve,reject)=>{
            api.GETROLEBYID(data).then(data=>{
                commit(types.ROLE_EDIT, data.data.doc)
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    roleEdit({commit},data){
        return new Promise((resolve,reject)=>{
            api.ROLEEDIT(data).then(data=>{
                commit(types.ROLE_EDIT, data.data.doc)
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    roleAdd({commit},data){
        return new Promise((resolve,reject)=>{
            api.ROLEADD(data).then(data=>{
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    deleteRole({commit},data){
        return new Promise((resolve,reject)=>{
            api.DELETEROLE(data).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err);
            })
        })
    },
}

// 在mutation里面做数据处理
const mutations = {
    [types.ROLE_SUCCESS](state, data) {
        // 根据创建时间排序
        data.rows.sort(function(a, b) {
            return b.createdAt - a.createdAt;
        })
        
        state.roleDataList = data.rows;
        state.roleDataCountNum = data.count;
    },
    [types.ROLE_EDIT](state, data) {
        console.log(data,'data')
        state.roleById = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}