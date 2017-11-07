import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'

// initial state
const state = {
    employeeDataList: [],
    employeeDataCountNum: 0,
}

const getters = {
    employeeData: state => state.employeeDataList,
    employeeDataCount: state => state.employeeDataCountNum
}

const actions = {
    getAllEmployee({
        commit
    }, pageObj) {
        api.GETEMPLOYEE(pageObj).then(async result => {
            let employeeList = result.data.docs.rows;

            for (let i = employeeList.length; i--;) {
                let roleId = employeeList[i].connection.role;
                employeeList[i].connection.roleName = '';

                let departmentId = employeeList[i].connection.department;
                employeeList[i].connection.departmentName = '';

                // 角色ID转name值
                try {
                    let {
                        data: {
                            doc: {
                                roleName
                            }
                        }
                    } = await api.GETROLEBYID(employeeList[i].connection.role);
                    employeeList[i].connection.roleName = roleName;
                } catch (e) {
                    employeeList[i].connection.roleName = employeeList[i].connection.role;
                }

                try {
                    let {
                        data: {
                            doc: {
                                departmentName
                            }
                        }
                    } = await api.GETDEPARTMENTBYID(departmentId);

                    employeeList[i].connection.departmentName = departmentName;
                } catch (e) {
                    employeeList[i].connection.departmentName = departmentId;
                }
            }
            commit(types.EMPLOYEE_SUCCESS, result.data.docs);
        }).catch(e => {
            console.error(e)
        });
    },
    getEmployeeByID({commit},data){
        return new Promise((resolve,reject)=>{
            api.GETEMPLOYEEBYID(data).then(data=>{
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    employeeEdit({commit},data){
        return new Promise((resolve,reject)=>{
            api.EMPLOYEEEDIT(data).then(data=>{
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    employeeAdd({commit},data){
        return new Promise((resolve,reject)=>{
            api.EMPLOYEEADD(data).then(data=>{
                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })
    },
    deleteEmployee({commit},data){
        return new Promise((resolve,reject)=>{
            api.DELETEEMPLOYEE(data).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err);
            })
        })
    },
}

// 在mutation里面做数据处理
const mutations = {
    [types.EMPLOYEE_SUCCESS](state, data) {
        state.employeeDataList = data.rows;
        state.employeeDataCountNum = data.count;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}