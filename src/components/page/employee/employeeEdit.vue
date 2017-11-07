<template>
    <div id="agentsAccount">

    		 <div class="crumbs">
    		 	<div class="crumbs-left">
	            <el-breadcrumb separator="/">
	            		<p class="emp-tit">员工账号管理</p>
	                <el-breadcrumb-item>
	                    员工管理
	                </el-breadcrumb-item>
	                <el-breadcrumb-item>员工账号管理</el-breadcrumb-item>
	                <el-breadcrumb-item>编辑员工</el-breadcrumb-item>
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
	        				<el-button type="danger" @click="freezeEmployee" v-if="!isFreeze">冻结</el-button>
                    		<el-button type="primary" @click="deFreezeEmployee" v-if="isFreeze">解冻</el-button>
	        				<el-button type="danger" @click="deleteEmployee">删除</el-button>
	        			</div>
	        		</div>
	            <el-form-item label="登录名:" prop="username">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.username" placeholder="8~20位字符，区分大小写" :disabled="true"></el-input>
	                </el-col>
	            </el-form-item>

	            <el-form-item label="登录密码:" prop="password">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.password" placeholder="8~16位字符，区分大小写"></el-input>
	                    <span class="red">密码不设置，默认不修改</span>
	                </el-col>
	            </el-form-item>

	            <el-form-item label="姓名:" prop="userRealName">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.userRealName"></el-input>
	                </el-col>
	            </el-form-item>
	            <el-form-item label="部门:" prop="connection.agentDepartment">
	                <el-select v-model="ruleForm.connection.agentDepartment" label="ruleForm.connection.agentDepartment" placeholder="请选择" @change="open">
	                    <el-option v-for="(item,index) in options" :key="index" :label="item.agentDepartmentName" :value="item.agentDepartmentId">
	                    </el-option>
	                </el-select>
	            </el-form-item>

	            <el-form-item label="角色:" prop="connection.role">
	                <el-select v-model="ruleForm.connection.role">
	                    <el-option v-for="(item,index) in roleSelect" :key="index" :label="item.roleName" :value="item.systemRoleId"></el-option>
	                </el-select>
	            </el-form-item>
	            <!--<el-form-item label="岗位" prop="position">-->
	            <!--<el-col :span="13">-->
	            <!--<el-input v-model="ruleForm.connection.item.position"></el-input>-->
	            <!--</el-col>-->
	            <!--</el-form-item>-->

	            <el-form-item label="邮箱:" prop="connection.email">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.connection.email" placeholder="请输入公司邮箱"></el-input>
	                </el-col>
	            </el-form-item>

	            <!--自定义手机和座机的验证-->
	            <el-form-item label="手机:" prop="connection.mobile">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.connection.mobile" :maxlength=11></el-input>
	                </el-col>
	            </el-form-item>

	            <el-form-item label="座机:" prop="connection.telephone">
	                <el-col :span="13">
	                    <el-input v-model="ruleForm.connection.telephone" placeholder="示例:010-12345678"></el-input>
	                </el-col>
	            </el-form-item>

	            <el-form-item>
	                <el-button type="primary" @click="submitForm('ruleForm','numberValidateForm')">保存</el-button>
	                <el-button @click="resetForm('ruleForm')">重置</el-button>
	            </el-form-item>
	        </el-form>
	    </div>
    </div>
</template>

<script type="text/javascript">
import api from '../../../api'
import store from '../../../store'

export default {
    data() {
        var checkmobile = (rule, value, callback) => {
            value = +value;
            //console.log(value);
            if (Number.isNaN(value) || !(/^1[34578]\d{9}$/.test(value))) {
                callback(new Error('请输入正确手机号'));
            } else {
                callback();
            }
        };
        var checktelephone = (rule, value, callback) => {
            if (value === '') {
                callback();
            } else {
                if (!/^[0][1-9][0-9]{1,2}-[0-9]{5,8}(-\d{1,6})?$/.test(value)) {
                    console.log(value)
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
            isFreeze: true,
            ruleForm: {
                isFreeze: false,
                connection: {
                        agentDepartment:'',
                        mobile: '',
                        role: '',
                        position: '',
                        email: '',
                        telephone: '',
                },
                userRealName: '',
                password: '',
                username: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
            routerId: this.$route.params.id,
            rules: {
                username: [],
                password: [
                    { message: '请输入密码', trigger: 'blur' },
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                userRealName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                // 'connection.department': [
                //     { required: true, message: '请选择部门', trigger: 'change' }
                // ],
                'connection.agentDepartment': [
                    { required: true, message: '请选择部门', trigger: 'change' }
                ],
                'connection.role': [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                'connection.position': [
                    { required: true, message: '请输入岗位', trigger: 'blur' }
                ],
                'connection.email': [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                'connection.mobile': [
                    { required: true, validator: checkmobile, trigger: 'blur' }
                ],
                'connection.telephone': [
                    { validator: checktelephone, trigger: 'blur' }
                ],
            }
        };
    },
    mounted() {
        //角色
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

        api.getEmployeeById(this.$route.params.id)
            .then(data => {
                //console.log(data)
                    this.ruleForm = data.data.doc;
                    console.log(this.ruleForm,"this.ruleForm")
                    this.ruleForm.password = '';
                //console.log(this.ruleForm)
                    if(this.ruleForm.isFreeze){
                        this.isFreeze = true
                    }else{
                        this.isFreeze = false
                    }
            })
            .catch(error => {
                console.log(error)
            });

        //部门
        api.departmentavailable(1,1000).then(data=>{
            this.options = data.data.docs.rows
            console.log(this.options)
        })


        //部门

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
        open(id){
            console.log(id)
        },
        //冻结
        freezeEmployee() {
            this.$confirm('您确定要冻结这名员工吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('FreezeEmployee', {
                    cid:this.$route.params.id
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '冻结成功!'
                    });
                    this.$router.push('/employee');
                }).catch((error) => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: error
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消冻结'
                });
            });
        },
        //解冻
        deFreezeEmployee() {
            this.$confirm('您确定要解冻这个员工吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('DeFreezeEmployee', {
                    cid:this.$route.params.id
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '解冻成功!'
                    });
                    this.$router.push('/Employee');
                }).catch((error) => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: error
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消解冻'
                });
            });
        },

        deleteEmployee() {
            this.$confirm('您确定要删除这名员工吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('DeleteEmployee', {
                    cid:this.$route.params.id
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push('/employee');
                    this.dialogFormEditVisible = false;
                }).catch((error) => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: error
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        _id: this.$route.params.id,
                        role: this.ruleForm.connection.role,    //角色
                        agentDepartment: this.ruleForm.connection.agentDepartment,   //部门
                        mobile: this.ruleForm.connection.mobile,    //手机
                        telephone: this.ruleForm.connection.telephone,   //座机
                        email: this.ruleForm.connection.email,   //邮箱
                        userRealName: this.ruleForm.userRealName,  //姓名
                        password: this.ruleForm.password, //密码
                    };


                        this.$store.dispatch('EditDepartmentEmployee', data).then(res => {
                            this.$message({
                                type: 'info',
                                message: '编辑成功',
                            });
                            this.$router.push('/employee');
                            this.dialogFormEditVisible = false;
                        }).catch(error => {
                            console.log(error)
                            this.$message({
                                type: 'error',
                                message: error.data
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

.twoBtns {
    float: right;
}

/*.red {
    color: red;
    font-size: 13px;
}*/

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
.form-header{ width: 100%; height: 50px; box-sizing: border-box; border-bottom: 1px solid rgb(231,234,236); padding: 0 20px 0 23px; margin-bottom: 30px;}
.form-header p{ float: left; line-height: 50px; font-size: 14px; color: rgb(103,106,108);}
.form-header>div{ float: right; line-height: 50px;}
.el-button--danger{ width: 70px; height: 33px;}
.el-form-item{ padding-left: 157px;}
.el-form-item:last-child{ padding-top:46px; padding-bottom: 150px;}
.red {
    color: rgb(255, 84, 102);
    font-size: 13px;
}
</style>
