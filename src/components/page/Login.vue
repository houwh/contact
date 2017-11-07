<template>
    <div class="login-wrap">
        <div class="ms-title">
            <div class="logo">
                <img class="user-logo" src="../../../static/img/logo2.png" height="90px">
            </div>
            <!--智牛代理商中心-->
        </div>
        <div class="ms-login">
            <form id="form-validation" class="form-horizontal">
                <div class="form-group">
                    <label prop="username">登录名</label>
                    <input type="text" class="form-control" v-model="username">
                </div>
                <div class="form-group">
                    <label prop="password">密码</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <br>
                <div class="form-group">
                    <input type="button" value="登录" class="btn btn-primary btn-block" @click="login(username,password)"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import {setToken} from '../../utils/auth'
    export default {
        data() {
            return {
                username:'',
                password:'',
                error:'',
                user:''
            }
        },
        methods:{
            ...mapActions(['loginTo']),
            login(username,password){
                this.$axios.get('static/mack.json').then((data)=>{
                    if(username==data.data.star.user && password==data.data.star.pass){
                        this.loginTo(data.data.star);          //把用户名密码token发送到action
                        this.$router.push('/customer')          // 验证成功跳转
                    }else{
                        alert("错误")
                    }
                })
            }
        },
        mounted(){

        }

    }

</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.ms-title {
    position: absolute;
    top: 50%;
    /* width: 45%; */
    width: 29%;

    margin-top: -230px;
    margin-left: 35%;
    text-align: center;
    font-size: 30px;
    color: #fff;
}

.ms-title .logo {
    float: left;
    text-align: center;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 270px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
}
    .danger{
        color:red;
        visibility: hidden;
    }
</style>

