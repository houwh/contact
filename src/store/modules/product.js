import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'

// initial state
const state = {
    productDataList: [],
    productDataCountNum: 0,
    productById:{},
}

const getters = {
    productData: state => state.productDataList,
    productDataCount: state => state.productDataCountNum,
    productById: state=>state.productById
}

const actions = {
    getProduct({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.GETPRODUCT(params).then(res => {
                commit(types.PRODUCT_SUCCESS, res.data.docs)
            }).catch(err => {
                return reject(err)
            })
        })
    },
    getAllProduct({
        commit
    }, pageObj) {
        api.GETPRODUCT(pageObj).then(result => {
            commit(types.PRODUCT_SUCCESS, result.data.docs)
        }).catch(e => {
            console.error(e)
        });
    },
    getProductByID({commit},data){
        return new Promise((resolve,reject)=>{
            api.GETPRODUCTBYID(data).then(data=>{
                resolve(data)
                commit(types.PRODUCT_EDIT, data.data.doc)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    productEdit({commit},data){
        return new Promise((resolve,reject)=>{
            api.PRODUCTEDIT(data).then(data=>{
                commit(types.PRODUCT_EDIT, data.data.doc)
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    productAdd({commit},data){
        return new Promise((resolve,reject)=>{
            api.PRODUCTADD(data).then(data=>{
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    deleteProduct({commit},data){
        return new Promise((resolve,reject)=>{
            api.DELETEPRODUCT(data).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err);
            })
        })
    },
    getAuthoriPro({commit},data){
        return new Promise((resolve,reject)=>{
            api.getAuthoriPro(data).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err);
            })
        })
    },
    oneLifePro({commit},data){
        return new Promise((resolve,reject)=>{
            api.oneLifePro(data).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err);
            })
        })
    },
}

// 在mutation里面做数据处理
const mutations = {
    [types.PRODUCT_SUCCESS](state, data) {
        for (let i = 0; i < data.rows.length; i++) {
            // let roleType = data.rows[i].connection.createdAt;
        }
        state.productDataList = data.rows;
        state.productDataCountNum = data.count;
    },
    [types.PRODUCT_EDIT](state, data) {
        state.productById = data;
        console.log(state,'===========================')
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}