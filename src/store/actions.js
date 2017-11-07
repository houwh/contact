import api from '../api'
import router from '../router'

export default {
    //  后台登录
    UserLogin({
        commit
    }, data) {

        return new Promise((resovle, reject) => {
            api.localLogin(data).then(({
                data
            }) => {
         		console.log(data)
                if (data.doc) {
                    // 找到代理商
                  commit('USER_SIGNIN',data);
                  let obj = JSON.stringify(data.doc);
                  localStorage.setItem('userObj', obj);
                    router.replace({
                        path: '/customer'
                    })
                  	resovle(data);
                } else {
                		console.log("cw")
                    // 没找到用户或者密码不对
                    // MsgAlert(data.message)
                    // console.log(error);
                }
            }).catch(error => {
                reject(error);
            })
        });
    },
    UserLogout({
        commit
    }) {
        commit('USER_SIGNOUT');
        router.push({
            path: '/login'
        });
    },

    /************ Agent Customer Action ************/
    //客户添加
    addDepartmentCustomer({
        commit
    }, data) {
        console.log(data)
        return new Promise((resolve, reject) => {
            api.addCustomer(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    GetDepartmentCustomerById({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.getCustomerById(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    //删除客户
    DeleteCustomer({
        commit
    }, data) {
        // console.log(data)
        return new Promise((resolve, reject) => {
            api.deleteCustomer(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    //客户管理编辑保存
    editDepartmentCustomer({
        commit,
        getters
    }, data) {
        console.log(data,"editDepartmentCustomer")
        return new Promise((resolve, reject) => {
            api.editCustomer(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    //客户冻结
    FreezeCustomer({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.freezeCustomer(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    //客户解冻
    DeFreezeCustomer({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.deFreezeCustomer(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    /************ Agent Customer Action ************/

    /************ Agent Employee Action ************/
    //添加员工
    AddDepartmentEmployee({
        commit
    }, data) {
        console.log(data)
        return new Promise((resolve, reject) => {
            api.addEmployee(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },

    GetDepartmentEmployeeById({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.getEmployeeById(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    EditDepartmentEmployee({
        commit,
        getters
    }, data) {
        console.log(data)
        return new Promise((resolve, reject) => {
            api.editEmployee(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    DeleteEmployee({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.deleteEmployee(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    FreezeEmployee({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.freezeEmployee(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    DeFreezeEmployee({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.deFreezeEmployee(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    //修改密码
    ChangePassword({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.changePassword(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    /************ Agent Employee Action ************/

    /************ Agent Department API ************/

    //部门管理添加
    AddDepartment({
        commit
    }, data) {
         console.log(data)
        return new Promise((resolve, reject) => {
            api.addDepartment(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },

    UpdateDepartment({
        commit
    }, data) {
        console.log(data)
        return new Promise((resolve, reject) => {
            api.updateDepartment(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },
    //部门删除
    DeleteDepartment({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            api.deleteDepartment(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    },

    /************ Agent Department API ************/

    /************ Agent License API ************/

    AddLicense({
        commit
    }, data) {
        return new Promise((resovle, reject) => {
            api.addLicense(data)
                .then(response => resovle(response))
                .catch(error => reject(error));
        });
    },

    GetLicenseByCustomer({
        commit
    }, data) {
        return new Promise((resovle, reject) => {
            api.getLicenseByCustomer(data)
                .then(response => resovle(response))
                .catch(error => reject(error));
        });
    },

    /************ Agent License API ************/

    /************ Agent role API ************/
    //添加角色
    RoleAdd({commit},data){
        return new  Promise((resovle,reject)=>{
            api.RoleAdd(data)
                .then(response => resovle(response))
                .catch(error => reject(error))
        })
    },
    //编辑角色
    RoleEdit({commit},data){
        //console.log(data.systemPermissionId[0],data)
        return new Promise((resovle,reject)=>{
            api.RoleEdit(data)
                .then(response => resovle(response))
                .catch(error => reject(error));
        })
    },
    //删除角色
    delRole({commit},data){
        return new Promise((resovle,reject)=>{
            api.delRole(data)
                .then(response => resovle(response))
                .catch(error => reject(error))
        })
    }
}
