import Vue from 'vue'
import router from '../router'
import api from '../api'
import {setToken} from "../utils/auth"

export default{
    loginTo({commit,state},data){
        console.log(state);
         setToken(data.token);
        commit("loginTo",data)
    }

}



