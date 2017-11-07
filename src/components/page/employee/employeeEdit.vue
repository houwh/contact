<template>
    <div class="col-md-12 col-lg-12">
        <h4 class="style1">
            编辑账号
        </h4>
        <div class="leftBtn">
                <button type="button" class="btn btn-default" onclick="history.go(-1)">返回</button>
                <button class="btn btn-danger" data-toggle="modal" data-target=".bs-example-modal-delete">删除</button>
            <!--&nbsp;&nbsp;     <v-delete :name="name"></v-delete>-->
                <button @click="frozenClick" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm">{{frozen}}</button>
        </div>
        <div class="emptyBtn"></div>
        <div class="panel panel-default">
            <div class="panel-heading">登录信息</div>
            <div class="panel-body">
                <form id="form-validation" class="form-horizontal" v-on:submit.prevent>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="username">
                            <span class="text-danger">*</span>&nbsp;&nbsp;登录名
                        </label>
                        <div class="col-md-4">
                            <input type="text" v-model="username" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="password">
                            <span class="text-danger">*</span>&nbsp;&nbsp;登录密码
                        </label>
                        <div class="col-md-4">
                            <input type="password" v-model="password" class="form-control">
                        </div>
                        <p class="col-md-4 p-lineH">8~16位字符，区分大小写</p>
                    </div>
                    <p class="col-md-4 col-md-offset-2 pmodified">密码不设置默认不修改</p>
                </form>
            </div>
            <div class="panel-heading employ-basic">基本信息</div>
            <div class="panel-body">
                <form id="form-basic" class="form-horizontal" v-on:submit.prevent>
                    <div class="form-group">
                        <label class="col-md-2 control-label" prop="userRealName">
                            <span class="text-danger">*</span>&nbsp;&nbsp;姓名
                        </label>
                        <div class="col-md-4">
                            <input type="text" v-model="userRealName" class="form-control" placeholder="8~20位字符，区分大小写">
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
            </div>
        </div>


        <!----删除----->
        <v-delete :name="name"></v-delete>
        <!---冻结---->
        <v-frozen :frozen="frozen" :frozenName="frozenName"></v-frozen>
    </div>
</template>


<script>
    import Delete from "../../common/delete.vue";
    import Frozen from "../../common/frozen.vue";
    export default{
        data(){
            return{
                name:"您确定要删除该账号吗？",
                frozen:'冻结',
                frozenName:"解冻",
                username:"juwei",
                password:"**888**8",
                userRealName:"222",
                department:"111",
                role:"角色",
                position:"",
                email:"",
                mobile:"",
                telephone:""
            }
        },
        methods:{
            frozenClick(){
                if(this.frozen == "冻结"){
                    this.frozen = "解冻"
                    this.frozenName = "冻结"
                }else{
                    this.frozen = "冻结"
                    this.frozenName = "解冻"
                }
            }
        },
        components:{
            "v-delete":Delete,
            "v-frozen":Frozen
        }
    }

</script>


<style scoped>
    .leftBtn{
        float:right;

    }
    .emptyBtn{
        height:45px;
    }
    .p-lineH{
        line-height: 34px;
        color: #BCBCBC;
        font-size: 14px;
    }
    .btn{
        padding: 6px 30px;
    }
    .pmodified{
        color: red;
    }
    .employ-basic{
        border-top: 1px solid #ddd;
        border-radius: 0;
    }
    .style1{ float: left; line-height: 45px; margin-top: 0;}
    .leftBtn{line-height: 45px;}
    .panel-default{ box-shadow: 0 2px 50px #E5E5E5}
    .btn-danger{ margin: 0 10px;}
</style>
