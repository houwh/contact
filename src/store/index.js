/*
 * @Author: cuiweiqiang
 * @Date:   2017-10-23 12:17:48
 * @Last Modified by:   cuiweiqiang
 * @Last Modified time: 2017-11-02 15:41:05
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

import customer from './modules/customer'; //customer模块
import agent from './modules/agent' //引入agent模块
import department from './modules/department'
import employee from './modules/employee'
import revenue from './modules/revenue'
import role from './modules/role'
import expand from './modules/expand'
import sales from './modules/sales'
import product from './modules/product'

console.log(getters, "getters----------")

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    strict: false,
    plugins: debug ? [createLogger()] : [],
    modules: {
        customer,
        agent,
        department,
        employee,
        revenue,
        role,
        expand,
        sales,
        product
    }
})