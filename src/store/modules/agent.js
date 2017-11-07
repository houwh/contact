import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'

// initial state
const state = {
    agentDataList: [],
    agentDataCountNum: 0,

    ageLicenseList: [],
    ageLicenseCountNum: 0,
    ageByIdData:{}
}

const getters = {
    agentData: state => state.agentDataList,
    agentDataCount: state => state.agentDataCountNum,

    ageLicenseData: state => state.ageLicenseList,
    ageLicenseDataCount: state => state.ageLicenseCountNum,
    ageById: state => state.ageByIdData
}

const actions = {
    getAgent({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.GETAGENT(params).then(res => {
                commit(types.AGENT_SUCCESS, res.data.docs)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    getAllAgent({
        commit
    }, pageObj) {
        api.GETAGENT(pageObj).then(result => {
            commit(types.AGENT_SUCCESS, result.data.docs)
        }).catch(e => {
            console.error(e)
        });
    },
    // agentLicense
    getAgePer({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.getAgePer(params).then(res => {
                commit(types.AGENTLICENSE_SUCCESS, res.data.docs)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    agentAdd({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.AGENTADD(data).then(data => {
                resolve(data)
                commit(types.AGENT_ADD, data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAgentByID({commit},data){
        return new Promise((resolve,reject)=>{
            api.GETAGENTBYID(data).then(data=>{
                commit(types.AGENT_EDIT, data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    agentEdit({commit},data){
        return new Promise((resolve,reject)=>{
            api.AGENTEDIT(data).then(data=>{
                commit(types.AGENT_EDIT, data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    deleteAgent({commit},data){
        return new Promise((resolve,reject)=>{
            api.DELETEAGENT(data).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err);
            })
        })
    },
}

// 在mutation里面做数据处理
const mutations = {
    [types.AGENT_SUCCESS](state, data) {
        for (let i = 0; i < data.rows.length; i++) {

        }
        state.agentDataList = data.rows;
        state.agentDataCountNum = data.count;
    },
    [types.AGENTLICENSE_SUCCESS](state, data) {
        for (let i = 0; i < data.rows.length; i++) {

        }
        state.ageLicenseList = data.rows;
        state.ageLicenseCountNum = data.count;
    },
    [types.AGENT_ADD](state, data) {
        console.log(data, 88)
    },
    [types.AGENT_EDIT](state, data) {
        state.ageByIdData = data;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}