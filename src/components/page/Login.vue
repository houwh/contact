<template>
    <div class="login-wrap">
        <div class="ms-login">
             <!--<div class="logo">-->
                <!--&lt;!&ndash;<img class="user-logo" src="../../../static/img/logo@2x.png" style="width:302px; float: left">&ndash;&gt;-->
            <!--</div>-->
            <p>智牛代理商中心</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="40px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" style="width: 300px"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="" @click="submitForm('ruleForm')" class='btnLog'>登录</el-button>
                </div>
            </el-form>
        </div>

    </div>
</template>

<script>
import api from '../../api'
import {mapActions} from 'vuex'

export default {
    data: function () {
        return {
            ruleForm: {
                username: 'agent',
                password: 'agent'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
//      		alert("dawdawd")
            this.$refs[formName].validate((valid) => {
            		//console.log(valid)
                if (valid) {
                    this.$store.dispatch('UserLogin', {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    }).then(data => {
                        console.log(data,"data");
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                    }).catch(error => {
                        console.log(error,"error")
				        this.$message.error('用户名或密码错误');
//                      if (error.data.results) {
//                          this.$message({
//                              type: 'error',
//                              message: error.data.results
//                          });
//                      } else {
//                          this.$message({
//                              type: 'error',
//                              message: '未知错误'
//                          });
//                      }

                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted() {
//        api.getCsrf().then(({ data: { status, _csrf } }) => {
//            console.log(status, _csrf);
//            this.ruleForm._csrf = _csrf;
//        }).catch((err) => {
//            console.log(err);
//        })
    }
}
</script>

<style scoped>
    /*.logo{*/
        /*background: url("../../../static/img/logo@2x.png") no-repeat top center;*/
        /*background-size:302px ;*/
    /*}*/
.login-wrap{
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../../static/img/bg_1@2x.png') no-repeat;
    background-size: 100%;
    background-color:rgb(47,64,80);
}
.ms-login{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -272px 0 0 -203px;

    width: 406px;
    height: 544px;
    background: url('../../../static/img/bg_2@2x.png') no-repeat;
    background-size: 388px 544px;
}
.ms-login>div{ position: absolute;bottom: 0;width: 388px; height: 358px; display: block;}
.ms-login>div>img{ width: 302px; height: 73px; margin-left:42px;}
.ms-login>p{ height: 45px;line-height: 45px;font-size: 30px;color:rgb(102,106,108);text-align: center;margin-top:280px;margin-bottom: 20px;}
.login-btn{ width: 300px;height: 34px; }
.btnLog{ width: 300px;height: 34px; margin-left:40px; background-color: rgb(0,180,148);color:#fff;}
</style>

