<template>
    <div id="agentsAccount">
        <!--<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i> 员工</el-breadcrumb-item>
                <el-breadcrumb-item>添加员工</el-breadcrumb-item>
            </el-breadcrumb>
        </div>-->
         <div class="crumbs">
    		 	<div class="crumbs-left">
	            <el-breadcrumb separator="/">
	            		<p class="emp-tit">员工账号管理</p>
	                <el-breadcrumb-item>
	                    员工管理
	                </el-breadcrumb-item>
	                <el-breadcrumb-item>员工账号管理</el-breadcrumb-item>
	                <el-breadcrumb-item>添加员工</el-breadcrumb-item>
	            </el-breadcrumb>
	        </div>
	        <div class="crumbs-right">
	        		<el-button type="primary" onClick="javascript :history.back(-1);">返回</el-button>
	        </div>
	    </div>
        <div class="context">
	        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<div class="form-header">
	        			<p>基本信息</p>
	        			<div>
	        				<!--<el-button type="primary">解冻</el-button>
	        				<el-button type="danger">删除</el-button>-->
	        			</div>
	        		</div>
	            <el-form-item label="登录名" prop="username">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.username" placeholder="8~20位字符，区分大小写"></el-input>
	                </el-col>
	            </el-form-item>

	            <el-form-item label="登录密码" prop="password">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.password" placeholder="8~16位字符，区分大小写"></el-input>
	                </el-col>
	            </el-form-item>
	            <el-form-item label="姓名" prop="userRealName">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.userRealName"></el-input>
	                </el-col>
	            </el-form-item>

	            <el-form-item label="部门" prop="departmentId">
	                <el-select v-model="ruleForm.departmentId" :name="ruleForm.department" placeholder="请选择">
	                    <el-option v-for="(item,index) in options" :key="index" :label="item.agentDepartmentName" :value="item.agentDepartmentId">
	                    </el-option>
	                </el-select>
	            </el-form-item>
	            <el-form-item label="角色" prop="role">
	                <el-select v-model="ruleForm.role">
	                    <el-option v-for="(item,index) in roleSelect" :key="index" :label="item.roleName" :value="item.systemRoleId"></el-option>
	                </el-select>
	            </el-form-item>
	            <el-form-item label="岗位" prop="position">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.position"></el-input>
	                </el-col>
	            </el-form-item>

	            <el-form-item label="邮箱" prop="email">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.email" placeholder="请输入公司邮箱"></el-input>
	                </el-col>
	            </el-form-item>

	            <!--自定义手机和座机的验证-->
	            <el-form-item label="手机" prop="mobile">
	                <el-col :span="13">
	                    <el-input v-model.number="ruleForm.mobile"></el-input>
	                </el-col>
	            </el-form-item>

	            <el-form-item label="座机" prop="telephone">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.telephone" placeholder="示例:010-12345678"></el-input>
	                </el-col>
	            </el-form-item>

	            <el-form-item>
	                <!--<router-link to="/employee">-->
	                <el-button type="primary" @click="submitForm('ruleForm','numberValidateForm')">保存</el-button>
	                <!--</router-link>-->
	                <el-button @click="resetForm('ruleForm')">重置</el-button>
	            </el-form-item>
	        </el-form>
	     </div>
    </div>
</template>

<script type="text/javascript">
import api from '../../../api'

export default {
    data() {
        var checkmobile = (rule, value, callback) => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入你的手机号'));
            } else {
                if (!(/^1[234578]\d{9}$/.test(value))) {
                    callback(new Error('请输入正确手机号'));
                } else {
                    callback();
                }
            }
        };
        var checktelephone = (rule, value, callback) => {
            if (value === '') {
                callback();
            } else {
                value = value.toString();
                console.log(typeof (value));
                if (!/^(\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
                    console.log('ewrtyuiuytrewertyutrertyutrertyutretyutre', value, );
                    callback(new Error('请输入正确座机号'));
                } else {
                    callback();
                }
            }
        };
        return {
            roleSelect:[],
            options: [],
            selectOptions: {},
            ruleForm: {
                userRealName: '',
                password: '',
                username: '',
                department: '',
                departmentId: '',
                mobile: '',
                role: '',
                position: '',
                email: '',
                telephone: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                _csrf: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入登录名', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                userRealName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                departmentId: [
                    { required: true, message: '请选择部门', trigger: 'change' }
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                position: [
                    { required: true, message: '请输入岗位', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, validator: checkmobile, trigger: 'blur' }
                ],
                telephone: [
                    { validator: checktelephone, trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {
//        api.getDepartment(1,100).then(({data})=>{
//            this.options = data.docs.rows;
//            console.log(this.options)
//            if(this.options.length<1){
//                return;
//            }
//            this.options.forEach(item=>{
//               // console.log(item.departmentName)
////                this.selectOptions[item.agentDepartmentId] = item.departmentName;
//            })
//
//        })
        //角色下拉列表
        api.Role(1,1000).then(data=>{
            console.log(data,"role");
            var arr = data.data.docs.rows;
//            this.roleSelect = data.data.docs.rows;
            arr.forEach((item,index)=>{
                if(item.roleState == 1){
                    this.roleSelect.push(item)
                }
            })
        });
        //部门的下拉列表
        api.departmentavailable(1,1000).then(data=>{
            this.options = data.data.docs.rows
//            this.options = data.docs.rows;
//            console.log(this.options)
//            if(this.options.length<1){
//                return;
//            }
        })
//        api.getCsrf().then(({ data: { status, _csrf } }) => {
//            console.log(status, _csrf);
//            this.ruleForm._csrf = _csrf;
//        }).catch((err) => {
//            console.log(err);
//        });
//
//        api.getDepartmentByStatus().then(({ data: { docs } }) => {
//            this.options = docs.docs;
//            if (this.options.length < 1) {
//                return
//            }
//            this.options.forEach(item => {
//                this.selectOptions[item._id] = item.departmentName;
//            });
//        }).catch();

    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    console.log(this.ruleForm);
                    // return;
//                    let data = {
//                        _csrf: this.ruleForm._csrf,
//                        username: this.ruleForm.username,
//                        role: this.ruleForm.role,
//                        department: this.ruleForm.department,
//                        departmentId: this.ruleForm.departmentId,
//                        mobile: this.ruleForm.mobile,
//                        telephone:this.ruleForm.telephone,
//                        email: this.ruleForm.email,
//                        userRealName: this.ruleForm.userRealName,
//                        password: this.ruleForm.password,
//
//                    };

                    let arr = {
                            email:this.ruleForm.email,  //邮箱
                            mobile:this.ruleForm.mobile,  //手机
                            telephone:this.ruleForm.telephone,  //座机
                            role:this.ruleForm.role,  //角色
                            agentDepartment:this.ruleForm.departmentId,  //部门
                            position:this.ruleForm.position,   //岗位
                            userRealName:this.ruleForm.userRealName,   //姓名
                            username:this.ruleForm.username,  //登录名
                            password:this.ruleForm.password //密码
                    }

//                    api.addEmployee(arr).then(res=>{
//                        console.log(res)
//                    })

                    this.$store.dispatch('AddDepartmentEmployee', arr).then(res => {
                        this.$message({
                            type: 'info',
                            message: '添加成功'
                        });
                        this.$router.push('/employee');
                    }).catch(error => {
                        if (error.response) {
                            console.log(11, error.response.data);
                            console.log(22, error.response.status);
                            console.log(33, error.response.headers);
                        }
                        this.$message({
                            type: 'error',
//                            message: error.data.err
                            message: '名称已存在'
                        });
                    });

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}
</script>

<style scoped>
.star {
    color: red;
}
.crumbs{
	width: 100%;
	height: 90px;
	box-sizing: border-box;
	padding: 14px 40px 18px 39px;
	background: #fff;
}
.crumbs-left{float: left;}
.crumbs-right{ float: right; line-height:58px;}
.emp-tit{
	font-size:24px ;
	color: #999999;
	padding-bottom: 14px;
}
.context{box-sizing: border-box; background: rgb(255,255,255); margin: 20px;border-top: 4px solid rgb( 230,235,237)}
.el-form-item:last-child{ padding-top:46px; padding-bottom: 150px;}

.form-header{ width: 100%; height: 50px; box-sizing: border-box; border-bottom: 1px solid rgb(231,234,236); padding: 0 20px 0 23px; margin-bottom: 30px;}
.form-header p{ float: left; line-height: 50px; font-size: 14px; color: rgb(103,106,108);}
.form-header>div{ float: right; line-height: 50px;}
.el-form-item{ padding-left: 157px;}
</style>
