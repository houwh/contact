import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'

// initial state
const state = {
    expandDataList: [],
    expandDataCountNum: 0,
}

const getters = {
    expandData: state => state.expandDataList,
    expandDataCount: state => state.expandDataCountNum
}

const actions = {
    getExpand({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.GETCUSTOMEREXPAND(params).then(res => {
                commit(types.EXPAND_SUCCESS, res.data.docs)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    getAllExpand({
        commit
    }, pageObj) {
        api.GETCUSTOMEREXPAND(pageObj).then(result => {
            commit(types.EXPAND_SUCCESS, result.data.docs)
        }).catch(e => {
            console.error(e)
        });
    }
}

// 在mutation里面做数据处理
const mutations = {
    [types.EXPAND_SUCCESS](state, data) {
        for (let i = 0; i < data.rows.length; i++) {
            // let roleType = data.rows[i].connection.createdAt;
        }
        state.expandDataList = data.rows;
        state.expandDataCountNum = data.count;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}