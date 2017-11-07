import axios from 'axios'

export default {
    //get csrf
    // getCsrf() {
    //     return axios.get('/api/signin');
    // },
//  getCsrf() {
//      return axios.get('/csrf/kw8shgba5tlrgfxctwf0uusbz5o7hskgnk6re');
//  },
    // 登录
    localLogin(data) {
        return axios.post('/api/login', data);
    },
    // 退出
    localLogout(data) {
        return axios.post('/api/logout', data);
    },

    changePassword(data) {
        console.log(data)
        return axios.put('/api/updatePassword', data);
    },

    /************ Agent Employee API ************/
    //员工搜索
    queryEmployee(data){
        console.log(data);
        return axios.get(`/api/employee`,{params:data})
    },
    //添加员工
    addEmployee(data) {
        return axios.post('/api/employee', data);
    },
    //员工列表
    getEmployee(page,size) {
        console.log(page,size,"员工列表-----------");
        return axios.get(`/api/employee?page=${page}&size=${size}`);
    },

    getEmployeeByCond(data) {
        return axios.get('/api/agent/employee?' + data.type + '=' + data.cond);
    },

    getEmployeeByPage(page) {
        return axios.get('/api/agent/employee?page=' + page);
    },

    getEmployeeById(data) {
        return axios.get('/api/employee/' + data);
    },
    //编辑员工
    editEmployee(data) {
        console.log(data);
        return axios.put('/api/employee/' + data._id, data);
    },
    //删除员工
    deleteEmployee(data) {
        console.log(data)
        return axios.delete('/api/employee/' + data.cid)
    },
    //冻结员工
    freezeEmployee(data) {
        return axios.put('/api/employee/' + data.cid + '/freeze');
    },
    //解冻员工
    deFreezeEmployee(data) {
        return axios.put('/api/employee/' + data.cid + '/defreeze');
    },
    /************ Agent Employee API ************/

    /************ Agent License API ************/

    addLicense(data) {
        return axios.post('/api/agent/license', data);
    },

    getLicenseByCustomer(data) {
        return axios.get('/api/agent/license/user/' + data);
    },
    /************ Agent License API ************/
    serverlicense(id,data){
        return axios.get(`/api/customer/${id}/license`,{params:data})
    },

    /************ Agent Customer API ************/
    //客户搜索
    getCusSearch(data){
        console.log(data);
        return axios.get(`/api/customer`,{params:data})
    },
    //获取客户列表
    getCustomer(page,size) {
        return axios.get(`/api/customer?page=${page}&size=${size}`);
    },
    //添加客户
    addCustomer(data) {
        return axios.post('/api/customer',data);
    },
    //编辑客户
    getCustomerById(id) {
        return axios.get('/api/customer/' + id);
    },
    getCustomerByPage(page) {
        return axios.get('/api/agent/customer?page=' + page);
    },
    getCustomerByCond(data) {
        return axios.get('/api/agent/customer?' + data.type + '=' + data.cond);
    },

    //编辑客户保存
    editCustomer(data) {
        console.log(data)
        return axios.put('/api//customer/' + data._id, data);
    },
    //删除客户
    deleteCustomer(data) {
        console.log(data.cid)
        return axios.delete('/api/customer/' + data.cid);
    },

    // deleteCustomer(data) {
    //     return axios.delete('/api/customer/' + data._id + '/delete', {
    //         headers: {
    //             'X-CSRF-TOKEN': data._csrf
    //         }
    //     });
    // },

    //客户解冻
    freezeCustomer(data) {
        return axios.put('/api/customer/' + data.cid + '/freeze');
    },
    //客户解冻
    deFreezeCustomer(data) {
        return axios.put('/api/customer/' + data.cid + '/defreeze');
    },
    /************ Agent Customer API ************/

    /************ Agent Department API ************/
    //部门搜索
    getSearch(data){
        console.log(data);
      return axios.get(`/api/department`,{params:data})
    },
    //获取部门列表
    getDepartment(page,size) {
        return axios.get(`/api/department?page=${page}&size=${size}`);
    },

    getDepartmentByName(name) {
        return axios.get('/api/agent/department?departmentName=' + name);
    },

    getDepartmentByPage(page) {
        return axios.get('/api/agent/department?page=' + page);
    },

    getDepartmentBySize(size) {
        return axios.get('/api/agent/department?size=' + size);
    },

    getDepartmentById(did) {
        return axios.get('/api/agent/department/' + did);
    },

    getDepartmentByStatus() {
        return axios.get('/api/agent/department/all?' + 'departmentStatus=1');
    },
    // 部门管理添加
    addDepartment(data) {
        console.log(data)
        return axios.post('/api/department',data);
    },

    updateDepartment(data) {
        return axios.put('/api/department/' + data.did, data);
    },
    //部门删除
    deleteDepartment(data) {
        return axios.delete('/api/department/' + data.did);
    },
    /************ Agent Department API ************/

    departmentavailable(page,size) {
        return axios.get(`/api/department/available?page=${page}&size=${size}`)
    },
    //角色权限
    Permission(){
        return axios.get('/api/permission')
    },


    /************ Agent role API ************/
    //角色搜索
    QUERYRole(data){
        return axios.get(`/api/role`,{params:data})
    },
    //获取角色
    Role(page,size){
        console.log(page,size);
        return axios.get(`/api/role?page=${page}&size=${size}`)
    },
    //添加角色
    RoleAdd(data){
        console.log(data);
        return axios.post('/api/role',data)
    },
    //编辑角色
    RoleEdit(data){
        console.log(data);
        return axios.put('/api/role/'+data.systemPermissionId[0],data)
    },
    delRole(data){
        console.log(data);
        return axios.delete('/api/role/'+data.did)
    },
    //权限
    handleNodeClick(id,data){
        console.log(data);
        return axios.post(`/api/role/${id}/permissions`,data)
    },

    /************ Agent role API ************/
    //根据客户ID获取授权列表
    CustomerLIcense(id){
        return axios.get(`/api/customer/${id}/license`)
    },
    // 根据客户ID添加试用授权
    CustomerLIcensetrial(id){
        return axios.post(`/api/customer/${id}/license/trial`)
    },
    //试用授权
    addCusPer(data){
        console.log(data);
        return axios.post(`/api/customer/${data.id}/license/trial`,data)
    },
    // 根据客户ID添加正式授权
    addCusPer2(data){
        console.log(data);
        return axios.post('api/customer/'+data.id+'/license/offical',data)
    },
    /************ Agent product API ************/
    //代理商列表
    getProduct() {
        return axios.get('/api/product');
    },
    //代理商搜索
    searchProduct(data){
        return axios.get('api/product',{params:data})
    }
}
