import axios from 'axios'

export {
    axios
};

export default {
    //登录
    USERLOGIN(data) {
        return axios.post('/api/login', data)
    },
    LOGOUT(data) {
        return axios.post('/api/logout', data)
    },
    // 更新密码
    changePassword(data) {
        return axios.put('/api/updatePassword', data)
    },
    //------------------代理商-----------------------
    GETAGENT(data) {
        return axios.get('/api/agent', {
            params: data
        });
    },
    AGENTADD(data) {
        return axios.post('/api/agent', data)
    },
    GETAGENTBYID(id) {
        return axios.get('/api/agent/' + id)
    },
    DELETEAGENT(id) {
        return axios.delete('/api/agent/' + id)
    },
    AGENTEDIT(data) {
        return axios.put('/api/agent/' + data.id, data)
    },
    FREEZEAGENT(id) {
        return axios.put('/api/agent/' + id + '/freeze')
    },
    DEFREEZEAGENT(id) {
        return axios.put('/api/agent/' + id + '/deFreeze')
    },

    // 根据代理商ID获取授权列表
    getAgePer(data) {
        return axios.get('/api/agent/' + data.id + '/license?page=' + data.page + '&size=' + data.size)
    },
    // 根据代理商ID添加正式授权
    addAgePer(data) {
        return axios.post('/api/agent/' + data.id + '/license/offical', data)
    },
    // 终身套的产品，不能再次添加
    // /license/user/:uid/product/:pid
    oneLifePro(data) {
        return axios.get('/api/license/user/' + data.cusId + '/product/' + data.proId)
    },
    //-----------------客户-------------------------------------
    GETCUSTOMER(data) {
        // return axios.get('/api/customer?page=' + data.page + '&size=' + data.size)
        return axios.get('/api/customer', {
            params: data
        });
    },
    CUSTOMERADD(data) {
        return axios.post('/api/customer', data)
    },
    GETCUSTOMERBYID(id) {
        return axios.get('/api/customer/' + id)
    },
    DELETECUSTOMER(id) {
        return axios.delete('/api/customer/' + id)
    },
    CUSTOMEREDIT(data) {
        return axios.put('/api/customer/' + data.id, data)
    },
    FREEZECUSTOMER(id) {
        return axios.put('/api/customer/' + id + '/freeze')
    },
    DEFREEZECUSTOMER(id) {
        return axios.put('/api/customer/' + id + '/deFreeze')
    },
    // 根据客户ID获取授权列表
    getCusPer(data) {
        return axios.get('/api/customer/' + data.id + '/license', {
            params: data
        });
        // return axios.get('/api/customer/' + data.id + '/license?page=' + data.page + '&size=' + data.size)
    },
    // 根据客户ID添加试用授权
    addCusPer(data) {
        console.log(data);
        return axios.post('/api/customer/' + data.id + '/license/trial', data)
    },
    // 根据licenseId获取详情
    GETLICENBYID(id) {
        return axios.get('/api/license/' + id)
    },
    // 根据客户ID添加正式授权
    addCusPer2(data) {
        console.log(data);
        return axios.post('/api/customer/' + data.id + '/license/offical', data)
    },
    // 上传照片
    cusUpload(data) {
        return axios.post('/api/upload', data)
    },
    // -------------------------外部账号-----------------------
    // get('/accountLink/records'  外部账号-获取外部账号
    getAccLink(data) {
        return axios.get('/api/accountLink/records?page=' + data.page + '&size=' + data.size)
    },
    // get('/accountLink/opened'  外部账号-获取已开户账号
    getOpenedAccount(data) {
        return axios.get('/api/accountLink/opened?page=' + data.page + '&size=' + data.size)
    },
    getOpenedSearch(data) {
        return axios.get('/api/accountLink/opened', {
            params: data
        });
    },
    // 外部账号已处理所有数据
    getHandleData(data) {
        return axios.get('/api/accountLink/handle?page=' + data.page + '&size=' + data.size)
    },
    // 外部账号未处理所有数据
    getUnhandleData(data) {
        return axios.get('/api/accountLink/unhandle?page=' + data.page + '&size=' + data.size)
    },
    // post '/accountLink/:id/bind', 外部账号绑定账号
    bindAccLink(data) {
        return axios.post('/api/accountLink/' + data.id + '/bind', data)
    },
    // post('/accountLink/renewal'  外部账号-续期账号
    renewalAccLink(data) {
        return axios.post('/api/accountLink/' + data.id + '/renewal', data)
    },
    // post '/accountLink/opened:id/update',  已开户信息中修改密码
    modifypswLink(data) {
        return axios.post('/api/accountLink/opened' + data.id + '/update', data)
    },
    // ------------------员工-------------------------------------
    GETEMPLOYEE(data) {
        // return axios.get('/api/employee?page=' + data.page + '&size=' + data.size)
        return axios.get('/api/employee', {
            params: data
        });
    },
    GETEMPLOYEEBYID(id) {
        return axios.get('/api/employee/' + id)
    },
    EMPLOYEEADD(data) {
        return axios.post('/api/employee', data)
    },
    DELETEEMPLOYEE(id) {
        return axios.delete('/api/employee/' + id)
    },
    FREEZEEMPLOYEE(id) {
        return axios.put('/api/employee/' + id + '/freeze')
    },
    DEFREEZEEMPLOYEE(id) {
        return axios.put('/api/employee/' + id + '/deFreeze')
    },
    EMPLOYEEEDIT(data) {
        console.log(data, 'yesoroID')
        return axios.put('/api/employee/' + data.id, data)
    },
    //------------------------------部门-------------------------------
    GETDEPARTMENT(data) {
        // return axios.get('/api/department?page=' + data.page + '&size=' + data.size)
        return axios.get('/api/department', {
            params: data
        })
    },
    GETDEPARTMENTBYID(id) {
        return axios.get('/api/department/' + id)
    },
    DEPARTMENTADD(data) {
        return axios.post('/api/department', data)
    },
    DELETEDEPARTMENT(id) {
        return axios.delete('/api/department/' + id)
    },
    DEPARTMENTEDIT(data) {
        return axios.put('/api/department/' + data.id, data)
    },
    FREEZEDEPARTMENT(id) {
        return axios.put('/api/department/' + id + '/freeze')
    },
    DEFREEZEDEPARTMENT(id) {
        return axios.put('/api/department/' + id + '/deFreeze')
    },
    // ----------------------------产品--------------------------------------
    GETPRODUCT(data) {
        return axios.get('/api/product', {
            params: data
        });
        // return axios.get('/api/product?page=' + data.page + '&size=' + data.size)
    },
    GETPRODUCTBYID(id) {
        return axios.get('/api/product/' + id)
    },
    PRODUCTADD(data) {
        return axios.post('/api/product', data)
    },
    DELETEPRODUCT(id) {
        return axios.delete('/api/product/' + id)
    },
    PRODUCTEDIT(data) {
        return axios.put('/api/product/' + data.productId, data)
    },
    // get '/product/:pid/permissions' // 根据产品ID获取权限列表
    GETPERMISSIONSBYPROID(data) {
        return axios.get('/api/product/' + data + '/permissions', data)
    },
    // post '/product/:pid/permissions' // 根据产品ID添加权限
    ADDPERMISSIONSBYPROID(data) {
        return axios.post('/api/product/' + data + '/permissions', data)
    },
    // 授权可用的产品（上架状态）
    getAuthoriPro(data) {
        return axios.get('/api/product/available?page=' + data.page + '&size=' + data.size)
    },
    //-----------------产品下的默认角色-----------------------
    // get '/product/:pid/role' // 根据产品ID获得角色列表
    // post '/product/:pid/role' // 根据产品ID添加角色
    // get '/product/:pid/role/:rid' // 根据产品ID和角色ID获得角色详情
    // put '/product/:pid/role/:rid' //  根据产品id和角色id更新角色
    // delete '/product/:pid/role/:rid' //  根据产品id和角色id删除角色

    GETPROROLE(data) {
        return axios.get('/api/product/' + data.proId + '/role/' + '?page=' + data.page + '&size=' + data.size);
    },
    GETPROROLEBYID(data) {
        return axios.get('/api/product/' + data.proId + '/role/' + data.roleId, data)
    },
    PROROLEEDIT(data) {
        return axios.put('/api/product/' + data.proId + '/role/' + data.roleId, data)
    },
    PROROLEADD(data) {
        return axios.post('/api/product/' + data.proId + '/role', data)
    },
    DELETEPROROLE(data) {
        console.log(data, 'data')
        return axios.delete('/api/product/' + data.proId + '/role/' + data.roleId, data)
    },
    // post '/product/:pid/role/:rid/permissions' // 根据产品id和角色id 添加权限
    ADDPROROLEPERMISSIONS(data) {
        return axios.post('/api/product/' + data.proId + '/role/' + data.roleId + '/permissions')
    },
    ROLEPERMISSIONS(id, data) {
        console.log(id, data)
        return axios.post(`/api/role/${id}/permissions`, data)
    },
    // ---------------------------------标签---------------------------------------
    GETTAG(data) {
        return axios.get('/api/tag?page=' + data.page + '&size=' + data.size)
    },
    GETTAGBYID(id) {
        return axios.get('/api/tag/' + id)
    },
    TAGADD(data) {
        return axios.post('/api/tag', data)
    },
    DELETETAG(id) {
        return axios.delete('/api/tag/' + id)
    },
    TAGEDIT(data) {
        return axios.put('/api/tag/' + data.id, data)
    },
    // --------------------------------扩展客户--------------------------------
    GETCUSTOMEREXPAND(data) {
        // return axios.get('/api/sales/expand?page=' + data.page + '&size=' + data.size)
        return axios.get('/api/sales/expand', {
            params: data
        });
    },
    GETCUSTOMEREXPANDBYID(id) {
        return axios.get('/api/sales/expand/' + id)
    },
    ADDREMARK(data) {
        return axios.post('/api/sales/expand/' + data.id + '/remark', data)
    },
    UPLOADEXCEL(data) {
        return axios.post('/api/upload', data)
    },
    GETSALESCLASS(data) {
        return axios.get('/api/sales/class', data)
    },
    ADDSALESCLASS(data) {
        console.log(data, '/api')
        return axios.post('/api/sales/class/', data)
    },
    // 编辑个人的分类
    // post '/sales/expand/:id/update'  salesClass : string
    editsalesClass(data) {
        return axios.put('/api/sales/expand/' + data.id + '/update', data);
    },
    // --------------------------------留电访客--------------------------------------
    GETPHONECUSTOMER(data) {
        // return axios.get('/api/sales/visitor?page=' + data.page + '&size=' + data.size)
        return axios.get('/api/sales/visitor', {
            params: data
        });
    },
    GETCUSTOMERPHONEBYID(id) {
        return axios.get('/api/sales/visitor/' + id)
    },
    addRemarkPhone(data) {
        return axios.post('/api/sales/visitor/' + data.id + '/remark', data)
    },
    // 留电访客未处理的
    HISUnhandleData(data) {
        return axios.get('/api/sales/visitor/unhandle', data)
    },
    //-----------------------------------角色------------------------------------
    SEARCHROLE(data) {
        return axios.get(`api/role?roleName=${data.roleName}`)
    },
    GETROLE(data) {
        return axios.get('/api/role', {
            params: data
        });
    },
    GETROLEBYID(id) {
        return axios.get('/api/role/' + id)
    },
    ROLEADD(data) {
        return axios.post('/api/role', data)
    },
    DELETEROLE(id) {
        return axios.delete('/api/role/' + id)
    },
    ROLEEDIT(data) {
        return axios.put('/api/role/' + data.id, data)
    },
    Permission(id) {
        return axios.get('/api/permission')
    },
    //-------------------------------------查找功能--------------------------------------
    GETCUSSEARCH(data) {
        return axios.get('/api/customer', {
            params: data
        });
    },
    getRoleSearch(data) {
        return axios.get('/api/role', {
            params: data
        })
    },
    getAgeSearch(data) {
        return axios.get('/api/agent', {
            params: data
        });
    },
    // 扩展客户
    getSalesExpSearch(data) {
        return axios.get('/api/sales/expand', {
            params: data
        });
    },
    // 员工
    getEmploySearch(data) {
        return axios.get('/api/employee', {
            params: data
        });
    },
    // 茶品
    getProSearch(data) {
        return axios.get('/api/product', {
            params: data
        });
    },
    // 留电访客
    GETSALES(data) {
        return axios.get('/api/sales/visitor', {
            params: data
        });
    },
    //客户license
    getLicenSearchCus(data) {
        return axios.get('/api/customer/' + data.id + '/license', {
            params: data
        });
    },
    // 代理商License
    getLicenSearchAge(data) {
        return axios.get('/api/customer/' + data.id + '/license', {
            params: data
        });
    },
    // 财务
    getFinanceSearch(data) {
        return axios.get('/api/revenue', {
            params: data
        });
    },
    SEARCHDEPART(data) {
        return axios.get('/api/department', {
            params: data
        })
    },
    // ------------------------------------收入管理--------------------------------
    // get '/revenue' //获取收入列表
    GETREVENUE(data) {
        // return axios.get('/api/revenue?page=' + data.page + '&size=' + data.size)
        return axios.get('/api/revenue', {
            params: data
        });
    },
    // get '/revenue/:rid' // 根据ID获取收入详情
    GETREVENUEById(id) {
        return axios.get('/api/revenue/' + id);
    },
    // post '/revenue/:rid' // 提交收入凭证
    submitProof(data) {
        return axios.post('/api/revenue/' + data.id, data);
    }
}