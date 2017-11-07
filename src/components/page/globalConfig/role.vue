<template>
    <div class="table role">
        <div class="compHead">
            <div>
                <p>角色管理</p>
                <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item> 全局配置 </el-breadcrumb-item>
                        <el-breadcrumb-item> 角色管理 </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <div class="context">
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-input placeholder="请输入角色名称" v-model="input_cond">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <div class="handle-box" style="float: left;" @click="queryRole">
                        <el-button type="primary">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="handle-box" style="float: left;">
                        <el-button type="primary" @click="dialogFormAddVisible_add = true">添加</el-button>
                    </div>
                </el-col>
            </el-row>

            <el-table :data="tableData" border style="width: 100%" :highlight-current-row=true>
                <el-table-column label="操作" width="240">
                    <template scope="scope">
                        <el-button size="small" @click="editRole(scope.$index, scope.row,'ruleForm')">编辑</el-button>
                        <el-button size="small" @click="delRole(scope.$index, scope.row)" type="danger">删除</el-button>
                        <el-button size="small" @click="setCheckedKeys(scope.$index, scope.row)">权限设置</el-button>
                    </template>
                </el-table-column>
                <el-row>
                    <el-table-column prop="idx" label="序号"></el-table-column>
                    <el-table-column prop="roleName" label="角色名称" :span="5"></el-table-column>
                    <el-table-column prop="creator.userRealName" label="创建人" :span="5">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="创建日期" :span="5"></el-table-column>
                    <el-table-column prop="roleNameStore" label="状态" :span="5">
                        <template scope="scope">
                            <el-tag
                                    :type="scope.row.roleState==1? 'primary' : 'danger'"
                                    close-transition>{{scope.row.roleState==1?"已开通":"已禁用"}}</el-tag>
                        </template>
                    </el-table-column>
                </el-row>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="current1"
                        layout="total,prev, pager, next, jumper"
                        :total="pageCount">
                </el-pagination>
            </div>
        </div>
        <!--添加角色-->
        <el-dialog title="添加角色" :visible.sync="dialogFormAddVisible_add" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="角色名称:" :label-width="formLabelWidth" prop="roleName">
                    <el-input v-model="ruleForm.roleName" auto-complete="off" placeholder="最大允许输入40个字符"></el-input>
                </el-form-item>
                <el-form-item label="备注:" :label-width="formLabelWidth" prop="remark">
                    <el-input v-model="ruleForm.remark" auto-complete="off" placeholder="最大允许输入40个字符"></el-input>
                </el-form-item>
                <el-form-item label="状态:" :label-width="formLabelWidth" prop="state">
                    <el-radio-group v-model="ruleForm.roleState">
                        <el-radio label="1" checked>禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="butt1and2">
                    <el-button type="primary" @click="addsubmitForm('ruleForm','dialogFormAddVisible_add')">保存</el-button>
                    <el-button @click="resetForm('ruleForm', 'dialogFormAddVisible')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑角色-->
        <el-dialog title="编辑角色" :visible.sync="dialogFormAddVisible_edit" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="角色名称:" :label-width="formLabelWidth" prop="roleName">
                    <el-input v-model="ruleForm.roleName" auto-complete="off" placeholder="最大允许输入40个字符"></el-input>
                </el-form-item>
                <el-form-item label="备注:" :label-width="formLabelWidth" prop="remark">
                    <el-input v-model="ruleForm.remark" auto-complete="off" placeholder="最大允许输入40个字符"></el-input>
                </el-form-item>
                <el-form-item label="状态:" :label-width="formLabelWidth" prop="state">
                    <el-radio-group v-model="ruleForm.roleState">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-input type="hidden" name="_csrf" v-model="ruleForm._csrf"></el-input>

                <el-form-item class="butt1and2">
                    <el-button type="primary" @click="editsubmitForm('ruleForm','dialogFormAddVisible_edit')">保存</el-button>
                    <el-button @click="resetForm('ruleForm', 'dialogFormAddVisible')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--权限设置-->
        <el-dialog title="超级管理员-权限设置" :visible.sync="dialog_license" :before-close="handleClose" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-row :gutter="24">
                <el-col :span="17" class="jurisd-menu">
                    <!--树形菜单-->
                    <ul id="demo">
                        <!--<treemenu class="item" :model="treeData" :parentModel="null" :on="null">-->
                        <!--</treemenu>-->
                        <el-tree
                                :data="treeData"
                                :props="defaultProps"
                                show-checkbox
                                node-key="systemPermissionFlag"
                                default-expand-all
                                ref="tree"
                                :default-checked-keys="permiss"
                                :expand-on-click-node="false"
                                :render-content="renderContent">
                        </el-tree>
                    </ul>
                </el-col>
                <el-col class="jurisd-btn" :span="7">
                    <el-button  type="primary" @click="getCheckedNodes">保存</el-button>
                    <el-button type="primary" @click="resetChecked">重置</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>

var data = {
    name: '智牛后台管理系统',check:true,
    children: [
        { name:'首页',check:true },
        {
            name: '客户管理',check:true,
            children: [
                {
                    name: '客户账号管理',
                    check:true,
                    children: [
                        { name: '开户' ,check:true},
                        { name: '编辑' ,check:true},
                        {name: '授权',check:true}
                    ]
                },
                { name: '客户公告管理',check:true },
                { name: '客户消息管理',check:true },
            ]
        },
        {
            name:'代理商管理',check:true,
            children:[
                {
                    name:'代理商账号管理',
                    check:true,
                    children:[
                        { name: '开户',check:true },
                        { name: '编辑',check:true },
                        {name: '授权',check:true}
                    ]
                },
                {name:'代理商公告管理',check:true},
                {name:'代理商消息管理',check:true}
            ]
        },
        {name:'员工管理',check:true},
        {
            name:'财务管理',
            check:true,
            children:[
                {name:'充值管理',check:true},
                {name:'发票管理',check:true}
            ]
        },
        {name:'统计分析',check:true},
        {name:'产品管理',check:true},
        {name:'知识管理',check:true},
        {name:'全局管理',check:true},
        {name:'系统中心',check:true},
        {name:'个人设置',check:true}
    ]
};
import api from '../../../api'
import treemenu from './treeMenu.vue'


    var getDate = (that,val) => {
        api.Role(val,10).then(data=>{
            console.log(data,"rows");
            that.tableData = data.data.docs.rows;
            that.pageCount = data.data.docs.count;
            var idx = val == 1? val : val-1+'1';
            that.tableData.forEach((item,index) => {
                item.idx = idx++;
                if(item.roleState == 1){
                    item.roleNameStore = '已启用'
                }else{
                    item.roleNameStore = '已禁用'
                }
                item.createdAt = moment(item.createAt).format('YYYY-MM-DD');
            })
        });
    };

export default {
        components: { treemenu },
        data() {
            return {
                //treeData:data,
                arr:[{
                    descresption:"智牛代理商中心",
                    systemPermissionFlag: '',
                    systemPermissionId: '',
                    children: []
                }],
                current1:1,
                permiss:[101],
                permissionArr:[],
                defaultProps: {
                    children: 'children',
                    label: 'descresption'
                },
                _id:'',
                treeData:{},
                roleBox:true,
                ruleForm: {
                    roleName: '',
                    remark: '',
                    roleState: '1',
                },
                rules: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
                    ],
                    remark: [
                        { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
                    ],
                    roleState:[{ required:true }]
                },
                formLabelWidth:'100px',
                dialogFormAddVisible_add:false,
                dialogFormAddVisible_edit:false,
                dialog_license:false,
                tableData:[],
                input_cond: '',
                pageCount: 0,
                array: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                applicationName: '',
                count: 0,
                balance: 0,
                idx: 0
            }
        },
        mounted() {

            getDate(this,1);

        },
        watch:{
            permiss(val){

            }
        },
        computed:{
            getCarts(){
                var stre = [];
                for(var i = 0; i<this.permiss.length; i++){
                    this.$set(this.permiss,i,this.permiss[i])
                }
                //console.log(this.permiss)
                return this.permiss
            }
//            getCarts(){
//                for(let i = 0; i<this.permiss.length; i++){
//                    this.permiss = Object.assign({}, this,{'permiss':this.permiss});
//                }
//                this.permiss = Object.assign({}, this.permiss);
//                return this.permiss
//            }
        },
        methods: {
            //角色查询
            queryRole(){
                var data = {};
                if(this.input_cond) {
                    data = {
                        roleName: this.input_cond,
                        page:1,
                        size:10
                    };
                }
                console.log(data);
                api.QUERYRole(data).then(data=>{
                    console.log(data,"roleData")
                    this.tableData = data.data.docs.rows;
                    this.pageCount = data.data.docs.count;
                    var idx = 1 == 1? 1 : 1-1+'1';
                    this.tableData.forEach((item,index) => {
                        item.idx = idx++;
                        if(item.roleState == 1){
                            item.roleNameStore = '已启用'
                        }else{
                            item.roleNameStore = '已禁用'
                        }
                        item.createdAt = moment(item.createAt).format('YYYY-MM-DD');
                    })
                }).catch(error=>{
                    console.log(error,"error")
                })
            },
            handleClose(){
                //this.$refs.tree.setCheckedKeys([]);
                this.dialog_license = false;
            },
            /*********树形菜单************/
            open(){
                api.Permission().then(data=>{
                    var test = data.data.docs.rows;
                    console.log(test,"-----------")
                    var obj = this.arr[0];
                    for(var i=0; i<test.length; i++){
                        if(test[i].level == 1){
                            obj.children.unshift(test[i])
                        }
                    }
                    for(var i = 0; i<obj.children.length; i++){
                        obj.children[i].children = [];
                        for(var j = 0; j<test.length; j++){
                            if((test[j].systemPermissionFlag+'').length == 5){
                                if(obj.children[i].systemPermissionFlag == test[j].systemPermissionFlag.toString().substring(0,3)){
                                    obj.children[i].children.unshift(test[j])
                                }
                            }
                        }
                    }
                    var objlen;
                    var t,j,i;
                    for( i=0; i<obj.children.length; i++){
                        objlen = obj.children[i];
                        for( j=0; j<objlen.children.length; j++){
                            objlen.children[j].children = []
                            for( t = 0; t<test.length; t++){
                                if((test[t].systemPermissionFlag+'').length == 7){
                                    if(objlen.children[j].systemPermissionFlag == test[t].systemPermissionFlag.toString().substring(0,5)){
                                        objlen.children[j].children.unshift(test[t])
                                    }
                                }
                            }
                        }
                    }
                    this.treeData = this.arr;
                    //console.log(this.treeData,"treeDatatreeData")
                })
            },
            //权限按钮
            setCheckedKeys(index,row){
                if(this.treeData.length == 1){

                }else{
                    this.open()
                }

                this._id = row.systemRoleId;
                this.dialog_license = true;
//              this.permiss["per"] = [1050202]
                if(row.permissions){
                    var perArr = [101];
                    row.permissions.forEach((item,index)=>{
                        perArr.push(item.systemPermissionFlag);
                    });
                }else{
                     var perArr = [101];
                }

                if( this.$refs.tree == undefined){
                    this.$set(this,"permiss",perArr);
                }else{
                    this.$refs.tree.setCheckedKeys(perArr)
                }
                //console.log(this.$refs.tree);
                //this.$refs.tree.setCheckedKeys(perArr);
//                if(typeof(setCheckedKeys) == "undefined"){
//                    this.$set(this,"permiss",perArr);
//                }else{
//                    this.$refs.tree.setCheckedKeys(perArr)
//                }
                //this.permiss = perArr;
                //this.$set(this,"permiss",perArr);
                //this.permiss = Object.assign({}, this,{'permiss':perArr});
                //console.log(this.permiss,"permiss");
            },
            //权限保存
            getCheckedNodes(){
                //console.log(this.$refs.tree.getCheckedNodes())
                var arrNodes = this.$refs.tree.getCheckedNodes();
                console.log(arrNodes,"arrNodes")
                this.permissionArr = [];
                arrNodes.forEach((item,index)=>{
                    this.permissionArr.push(item.systemPermissionId)
                })
                if(this.permissionArr.length){
                    api.handleNodeClick(this._id,{permissions:this.permissionArr}).then(data=>{
                        console.log(data)
                        this.dialog_license = false;
                        this.$message({
                            type: 'success',
                            message: '权限设置成功'
                        });
                        getDate(this,1)
                        this.current1 = 1
                    })
                }else{
                    this.$message({
                        type: 'error',
                        message: '权限列表为空'
                    });
                }
            },
            //权限重置
            resetChecked(){
                this.$refs.tree.setCheckedKeys([]);
            },
            append(store, data) {
                store.append({ id: id++, label: 'testtest', children: [] }, data);
            },

            remove(store, data) {
                store.remove(data);
            },

            renderContent(h, { node}) {
                return (
                    <span>
                    <span>
                    <span>{node.label}</span>
                </span>
                </span>);
            },
            /************结束***************/
            searchAction() {
                if (!this.input_cond) {
                    this.$message({
                        type: 'warning',
                        message: '请输入搜索内容'
                    });
                    return;
                }
            },
            //编辑按钮
            editRole(index, row,formName){
                this.dialogFormAddVisible_edit = true;
                this.$nextTick(()=>{
                    console.log(row,"row");
                        this._id = row.systemRoleId;
                        this[formName].roleName = row.roleName;
                        this[formName].remark = row.remark;
                        this[formName].roleState = row.roleState
                })
            },
            //编辑保存
            editsubmitForm(formName, dialogName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        this.$store.dispatch("RoleEdit",{
                            roleName:this.ruleForm.roleName,
                            remark:this.ruleForm.remark,
                            roleState:this.ruleForm.roleState,
                            systemPermissionId:[this._id]
                        }).then((data)=>{
                            console.log(data)
                            this.$message({
                                type: 'success',
                                message: '编辑成功'
                            });
                            this[dialogName] = false;
                            this.$refs[formName].resetFields();
                            getDate(this,1)
                            this.current1 = 1
                        }).catch((error)=>{
                            console.log(error);
                            if (error.data) {
                                this.$message({
                                    type: 'error',
                                    message: error.data.msg
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: error.err
                                });
                            }
                        })
                    }
                })
            },
            delRole(index,row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row)
                    this.$store.dispatch('delRole',{did:row.systemRoleId}).then((res)=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        getDate(this,1);
                        this.current1 = 1;
                    }).catch((error)=>{
                        if (error.response) {
                            console.log(11, error.response.data);
                            console.log(22, error.response.status);
                            console.log(33, error.response.headers);
                        }
                        console.log(error);
                        this.$message({
                            type: 'error',
                            message: error.err
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //添加
            addsubmitForm(formName, dialogName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch("RoleAdd",{
                            roleName:this.ruleForm.roleName,
                            remark:this.ruleForm.remark,
                            roleState:this.ruleForm.roleState
                        }).then((data)=>{
                            console.log(data)
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this[dialogName] = false;
                            this.$refs[formName].resetFields();
                            getDate(this,1)
                            this.current1 = 1
                        }).catch((error)=>{
                            console.log(error)
                            if (error.data) {
                                this.$message({
                                    type: 'error',
                                    message: error.data.msg
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: error.err
                                });
                            }
                        })
                    }else{
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            resetForm(formName, dialogName) {
                this[dialogName] = false;
                this.$refs[formName].resetFields();
            },
            handleCurrentChange(val) {
                getDate(this,val)
            },
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-del {
        border-color: #bfcbd9;
        color: #999;
    }

    .handle-select {
        width: 120px;
    }
    .butt1and2{ float: right; }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .compHead{ height: 90px;width: 100%;background-color: #fff;}
    .compHead p{ color:#999;font-size: 24px; height: 60px;line-height: 60px;}
    .compHead>div:first-child{ display: inline-block;float: left;margin-left:33px;}
    .context{box-sizing: border-box; background: rgb(255,255,255); margin: 20px; padding: 40px 20px 24px 20px; border-top: 4px solid rgb( 230,235,237)}
    .jurisd-menu{ border-right: 2px solid #E5E5E5; overflow-y: auto; height: 310px; }
    .jurisd-menu>ul{ margin-left: 30px;}
    .jurisd-btn p{ text-align: center; margin-bottom: 10px;}
    ul li{ list-style: none; }
</style>


<!--权限列表叠加bug-->
<!--已解决，不能用var arr储存，切换页面不会清空内存，造成叠加。解决方法：用this.arr保存到data里-->

<!--修改密码-->
<!--已解决,清除local Storage,清除state-->

<!--权限内容叠加bug设置权限有时设置成功，但是没有改变，-->
<!--已解决，需要把this.permissionArr清空一下，不然之前的内容会叠加进来-->

<!--到期返回登录页面-->
<!--已解决，mian.js  54-->

<!--员工列表角色加载慢-->
<!--已解决-->

<!--代理管理-->
<!--完成-->

<!--客户授权-->
<!--查询搜索-->
<!--开户人-->
<!--图片上传-->