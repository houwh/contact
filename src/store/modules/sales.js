import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'

// initial state
const state = {
    visitorDataList: [],
    visitorDataCountNum: 0,
}

const getters = {
    visitorData: state => state.visitorDataList,
    visitorDataCount: state => state.visitorDataCountNum
}

const actions = {
    getVisitor({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.GETSALES(params).then(res => {
                commit(types.SALES_SUCCESS, res.data.docs)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    getAllVisitor({
        commit
    }, pageObj) {
        api.GETSALES(pageObj).then(result => {
            commit(types.SALES_SUCCESS, result.data.docs)
        }).catch(e => {
            console.error(e)
        });
    }
}

// 在mutation里面做数据处理
const mutations = {
    [types.SALES_SUCCESS](state, data) {
        for (let i = 0; i < data.rows.length; i++) {
            // let roleType = data.rows[i].connection.createdAt;
        }
        state.visitorDataList = data.rows;
        state.visitorDataCountNum = data.count;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}