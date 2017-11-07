<template>
    <div class="header">
        <!--<div class="user-info">-->
            <!--<span class="company-name">-->
                <!--{{company}}-->
            <!--</span>-->
            <!--<el-dropdown trigger="click" @command="handleCommand">-->

                <!--<span class="el-dropdown-link">-->
                    <!--<img class="user-logo" :src="userImage"> {{username}}-->
                <!--</span>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item command="changepd">修改密码</el-dropdown-item>-->
                    <!--<el-dropdown-item command="loginout">退出</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
        <!--</div>-->

        <!--<el-dialog title="修改密码" :visible.sync="changepdDialogVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" :label-width="formLabelWidth" style="padding: 0 50px 0 0;">
                <el-form-item label="原密码" prop="password">
                    <el-input type="password" placeholder="请输入原密码" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpassword">
                    <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.newpassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码确认" prop="newpasswordAgain">
                    <el-input type="password" placeholder="请再次输入新密码" v-model="ruleForm.newpasswordAgain"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>-->
            <!--</span>-->
        <!--</el-dialog>-->
            <div class="header-left">
            		<img class="user-logo" src= '../../../static/img/logo@2x.png'>
            		<p>智牛代理商中心</p>
            </div>
            <div class="header-right">
            		<p>{{userObj.connection.companyName}}</p>
            </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userObj:{},
            _csrf: '',
            logoPic: '../../../static/img/logo-white-1.png',
            changepdDialogVisible: false,
            formLabelWidth: '120px',
            ruleForm: {
                password: '',
                newpassword: '',
                newpasswordAgain: ''
            },
            rules: {
                password: [{
                    required: true, message: '请输入原密码', trigger: 'blur'
                }],
                newpassword: [{
                    required: true, message: '请输入新密码', trigger: 'blur'
                }],
                newpasswordAgain: [{
                    required: true, message: '请再次输入新密码', trigger: 'blur'
                }]
            }
        }
    },
    // computed: {
    //     username() {
    //         let userObj = JSON.parse(localStorage.getItem('userObj'));
    //         // return userObj.results.user.userRealName;
    //         return userObj.results.user.userRealName ? userObj.results.user.userRealName : userObj.results.user.username;
    //     },
    //     userImage() {
    //         let userObj = JSON.parse(localStorage.getItem('userObj'));
    //         return userObj.results.user.userImg;
    //     },
    //     company() {
    //         let userObj = JSON.parse(localStorage.getItem('userObj'));
    //         let companyName = ''
    //         if (userObj.results.user.agent) {
    //             companyName = userObj.results.user.agent.connection.item.companyName;
    //         } else {
    //             companyName = userObj.results.user.connection.item.companyName;
    //         }

    //         if (!companyName) {
    //             companyName = ''//'[公司名未设置]'
    //         }
    //         return companyName;
    //     }
    // },
    mounted() {
        this.userObj = JSON.parse(localStorage.getItem('userObj'))
        console.log(this.userObj,"this.userObj")
    },
    methods: {

        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('userObj');
                this.$router.push('/login');
            }

            if (command == 'changepd') {
                this.changepdDialogVisible = true;
            }
        },

        cancel() {
            this.changepdDialogVisible = false;
            this.$refs['ruleForm'].resetFields();
        },

        handleClose(done) { done(); },
        submitForm(formName) {
            this.$confirm('此操作将需要重新登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.newpassword != this.ruleForm.newpasswordAgain) {
                            this.$message({
                                type: 'error',
                                message: '两次新密码输入不一致，请检查',
                                duration: 5000
                            });
                            return;
                        }

                        let data = {
                            _csrf: this._csrf,
                            password: this.ruleForm.password,
                            newpassword: this.ruleForm.newpassword
                        }

                        this.$store.dispatch('ChangePassword', data).then(res => {
                            this.$message({
                                type: 'success',
                                message: '密码修改成功，2s 后将转到登录页面'
                            });

                            setTimeout(() => {
                                localStorage.removeItem('userObj');
                                this.$router.push('/login');
                            }, 2000);
                        }).catch(error => {
                            console.log(error);
                            if (error.data) {
                                this.$message({
                                    type: 'error',
                                    message: error.data.msg
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '未知错误'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }).catch(() => {
            });
        }
    }
}
</script>

<style scoped>
.header{
		width: 100%;
		box-sizing: border-box;
		height: 70px;
		background: rgb(243,243,244);
		padding: 16px 30px 16px 230px;
	 }
.header-left{width: 50%; float: left;}
.header-left img{ width: 158.8px; height: 38px; float: left;}
.header-left p{ display: inline-block; font-size: 22px; color: rgb(109,111,114); margin-left: 21.2px; padding: 4px 0;}

.header-right{ width: 50%; height: 100%; float: right;}
.header-right p{ float: right; line-height: 38px; font-size: 13px; color: #797979;}
</style>
