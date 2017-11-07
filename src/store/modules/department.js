import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'

// initial state
const state = {
    departmentDataList: [],
    departmentDataCountNum: 0,

    departmentById: {}
}

const getters = {
    departmentData: state => state.departmentDataList,
    departmentDataCount: state => state.departmentDataCountNum,
    departmentByIdData:state =>state.departmentById,
}

const actions = {
        getDepartment({
            commit
        }, pageObj) {
            api.GETDEPARTMENT(pageObj).then(result => {
                commit(types.DEPARTMENT_SUCCESS, result.data.docs)
            }).catch(e => {
                console.error(e)
            });
        },
        departmentAdd({
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                api.DEPARTMENTADD(data).then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getDepartmentByID({
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                api.GETDEPARTMENTBYID(data).then(data => {
                    commit(types.DEPARTMENT_EDIT, data.data.doc)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        departmentEdit({commit},data){
            return new Promise((resolve,reject)=>{
                api.DEPARTMENTEDIT(data).then(data=>{
                    resolve(data)
                    commit(types.DEPARTMENT_EDIT, data.data.doc)
                }).catch(error=>{
                    reject(error)
                })
            })
        },
        deleteDepartment({commit},data){
            return new Promise((resolve,reject)=>{
                api.DELETEDEPARTMENT(data).then(data=>{
                    resolve(data)
                }).catch(err=>{
                    reject(err);
                })
            })
        },
    }
    // 在mutation里面做数据处理
const mutations = {
    [types.DEPARTMENT_SUCCESS](state, data) {
        // 根据创建时间排序
        data.rows.sort(function(a, b) {
            return b.createdAt - a.createdAt;
        })
        state.departmentDataList = data.rows;
        state.departmentDataCountNum = data.count;
    },
    [types.DEPARTMENT_EDIT](state, data) {
        state.departmentById = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}