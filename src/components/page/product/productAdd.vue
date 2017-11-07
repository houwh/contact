<template>
    <div class="col-md-12 col-lg-12">
        <v-title :title="title"></v-title>
        <div class="emptyBtn"></div>
        <div class="panel panel-default">
            <div class="panel-heading">登录信息</div>
            <div class="panel-body">
                <form id="defaultForm" class="form-horizontal" v-on:submit.prevent>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="username">
                            <span class="text-danger">*</span>&nbsp;&nbsp;登录名
                        </label>
                        <div class="col-md-4">
                            <input type="text" name="username" v-model="username" class="form-control">
                        </div>
                        <p class="col-md-4 p-lineH">6~20位字符，区分大小写</p>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="password">
                            <span class="text-danger">*</span>&nbsp;&nbsp;登录密码
                        </label>
                        <div class="col-md-4">
                            <input type="password" name="password" v-model="password" class="form-control">
                        </div>
                        <p class="col-md-4 p-lineH">8~16位字符，区分大小写</p>
                    </div>
                    <!--</form>-->
                    <!--</div>-->
                    <!--<div class="panel-heading employ-basic">基本信息</div>-->
                    <!--<div class="panel-body">-->
                    <!--<form id="form-basic" class="form-horizontal" v-on:submit.prevent>-->
                    <div class="basic col-md-12 col-lg-12">
                        <p class="styleAdd">
                            添加账号
                        </p>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="userRealName">
                            <span class="text-danger">*</span>&nbsp;&nbsp;姓名
                        </label>
                        <div class="col-md-4">
                            <input type="text" name="fullName" v-model="userRealName" class="form-control" placeholder="8~20位字符，区分大小写">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="department">
                            <span class="text-danger">*</span>&nbsp;&nbsp;部门
                        </label>
                        <div class="col-md-4">
                            <select v-model="department" class="form-control">
                                <option value="互联网">互联网</option>
                            </select>
                        </div>
                        <p class="col-md-5 p-lineH">该数据可在“全局配置->标签管理”菜单处进行维护！</p>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="role">
                            <span class="text-danger">*</span>&nbsp;&nbsp;角色
                        </label>
                        <div class="col-md-4">
                            <select v-model="role" class="form-control">
                                <option value="互联网">互联网</option>
                            </select>
                        </div>
                        <p class="col-md-5 p-lineH">该数据可在“产品管理->产品管理”菜单处进行维护！</p>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="position">
                            <span class="text-danger">*</span>&nbsp;&nbsp;岗位
                        </label>
                        <div class="col-md-4">
                            <input type="text" v-model="position" class="form-control" placeholder="8~20位字符，区分大小写">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="email">
                            <span class="text-danger">*</span>&nbsp;&nbsp;邮箱
                        </label>
                        <div class="col-md-4">
                            <input type="text" v-model="email" name="email" class="form-control">
                        </div>
                        <p class="col-md-5 p-lineH">请填写公司邮箱</p>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="mobile">
                            <span class="text-danger">*</span>&nbsp;&nbsp;手机
                        </label>
                        <div class="col-md-4">
                            <input type="text" v-model="mobile" name="email" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="telephone">
                            座机
                        </label>
                        <div class="col-md-4">
                            <input type="text" v-model="telephone" name="email" class="form-control">
                        </div>
                        <p class="col-md-5 p-lineH">示例：010-1234568-11</p>
                    </div>


                    <div class="col-md-8 col-md-offset-2">
                        <button type="submit" class="btn btn-effect-ripple btn-primary">保存</button>&nbsp;&nbsp;&nbsp;
                        <button type="reset" class="btn btn-effect-ripple btn-default reset_btn">重置</button>
                    </div>
                </form>
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>

    import Titile from '../../common/title.vue'
    export default{
        data(){
            return{
                title:"添加产品"
            }
        },
        components:{
            'v-title':Titile
        }
    }
</script>

<style scoped>
    .emptyBtn{
        height:45px;
    }
    .basic{ height: 40px; background: #f5f5f5; border: 1px solid #ddd; border-right: none; border-left: none; margin-bottom: 15px;}
    .panel-body{ padding-right: 0; padding-left: 0;}
    .styleAdd{line-height: 40px; padding-left: 15px;}
</style>
