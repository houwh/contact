import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

const state = {
//    客户

//    代理商

//    员工

//    产品

//    标签

//    财务

//    token
    tooken:""

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters

});
