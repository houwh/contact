<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class=" role-header">
                    <h4 class="style1 ">
                        默认角色
                    </h4>
                    <div class="leftBtn col-md-2">
                        <button type="button" class="btn btn-default" onclick="history.go(-1)">返回</button>
                    </div>
                 </div>
                <div class="form-group ">
                    <div class="row role-from">
                        <div class="col-md-3 product">
                            <input type="text" class="form-control" placeholder="输入产品名称或标识符">
                        </div>
                        <div class="col-md-1">
                            <button type="button" class="btn btn-primary">查询</button>
                        </div>
                        <div class="col-md-1 product-add">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleAdd" data-whatever="@mdo">添加</button>
                        </div>

                    </div>
                </div>

                <div class="panel">
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>产品名称</th>
                                    <th>角色名称</th>
                                    <th>创建人</th>
                                    <th>创建日期</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>智牛后台管理系统</td>
                                    <td>超级管理员</td>
                                    <td>赵玉湖</td>
                                    <td>2017-05-23</td>
                                    <td>已开通</td>
                                    <td>
                                        <span data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">编辑</span>
                                        <span data-toggle="modal" data-target=".bs-example-modal-delete" data-whatever="@mdo">删除</span>
                                        <span data-toggle="modal" data-target="#exampleRole" data-whatever="@mdo">权限管理</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!---编辑--->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog product-alert" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="exampleModalLabel">编辑角色</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;角色名称：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;备注：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="userType">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;状态：
                                </label>
                                <div class="col-md-6 col-lg-8" v-model="userType">
                                    <div>
                                        <label>
                                            <input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 启用
                                        </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 禁用
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer ">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-effect-ripple btn-primary">保存</button>&nbsp;&nbsp;&nbsp;
                                    <button type="reset" class="btn btn-effect-ripple btn-default reset_btn">重置</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!---添加--->

        <div class="modal fade" id="exampleAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog product-alert" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="exampleModalAdd">添加角色</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;角色名称：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;备注：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="userType">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;状态：
                                </label>
                                <div class="col-md-6 col-lg-8" v-model="userType">
                                    <div>
                                        <label>
                                            <input class="custom_radio" type="radio" name="Fruit" v-model="userType" disabled/> 禁用
                                        </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer ">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-effect-ripple btn-primary">保存</button>&nbsp;&nbsp;&nbsp;
                                    <button type="reset" class="btn btn-effect-ripple btn-default reset_btn">重置</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!--权限设置--->

        <div class="modal fade" id="exampleRole" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog product-alert" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="exampleModalRole">超级管理员——权限设置</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;角色名称：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;备注：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="userType">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;状态：
                                </label>
                                <div class="col-md-6 col-lg-8" v-model="userType">
                                    <div>
                                        <label>
                                            <input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 启用
                                        </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 禁用
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer ">
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-effect-ripple btn-primary">保存</button>&nbsp;&nbsp;&nbsp;
                                    <button type="reset" class="btn btn-effect-ripple btn-default reset_btn">重置</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>




        <!---删除---->

        <v-delete :name="name"></v-delete>

    </div>
</template>


<script>

    import Delete from '../../common/delete.vue'

    export default{
        data(){
            return{
                name:"您确定要删除这个角色吗",
                userType:"",
                username:""
            }
        },
        components:{
            "v-delete":Delete
        }
    }
</script>


<style scoped>
    h4{
        margin-bottom: 0;
    }
    .control-label{
        line-height: 34px;
        text-align: right;
    }
    .form-group{
        line-height: 34px;
        margin: 0px;
    }
    .role-header{
        overflow: hidden;
        box-sizing: border-box;
    }
    .btn{
        padding: 6px 35px;
    }
    .product-add{
        margin-left: 30px;
    }
    .product{
        margin-left: 15px;
    }
    /*.role-from{*/
        /*line-height: 40px;*/
    /*}*/
    .panel{
        border:1px solid #E5E5E5;
        box-shadow: 0 2px 18px #E5E5E5;
        margin: 0 15px;
    }

    .style1{ float: left; line-height: 45px; margin-top: 0;}
    .leftBtn{line-height: 60px; float: right;}
    .panel-default{ box-shadow: 0 2px 50px #E5E5E5}

    .modal-footer{
        border: none;
        text-align: center;
    }
    .modal-title{
        text-align: center;
        color: #fff;
    }
    .modal-header{
        background-color:#286090;
        padding: 10px;
    }
    .modal-content{overflow: hidden}
    .product-alert{ width: 500px;}
    .modal-body-p{ text-align: center; line-height: 20px;}
    .footer-pard{ padding-top: 0;}

    .panel-body{}
    .role-header{ border-bottom: 1px solid #E5E5E5;}
    .style1{ padding: 7px 0px; margin-top: 0; margin-left: 20px;}
    .col-lg-12{ padding-right:0px;}
    .role-from{ margin: 10px 15px 15px 15px;border: 1px solid #E5E5E5; padding: 10px 0;
        box-shadow: 0 2px 18px #E5E5E5;border-radius: 4px;
    }
    .col-md-12{ padding-right: 0;}
</style>
