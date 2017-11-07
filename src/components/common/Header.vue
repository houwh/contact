<template>
    <div class="header">
        <div class="logo">
            <img src="../../../static/img/logo2.png" alt="" height="70px">
        </div>
        <!--<span>智牛综合管理后台</span>-->
        <div class="user-info">

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
//                logoPic: '../../../static/img/logo2.png',
                name: 'linxin'
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        overflow: hidden;
    }
    .header .logo{
        float: left;
        width:300px;
        text-align: center;
        margin-left: -50px;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
