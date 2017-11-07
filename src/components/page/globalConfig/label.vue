<template>
    <div>
            <!--main content-->
            <div class="row">
                <div class="col-lg-12">
                    <h4 class="style1">
                        标签管理
                    </h4>
                    <div class="form-group label-from">
                        <div class="row product-from">
                            <div class="col-md-3 product">
                                <input type="text" class="form-control" placeholder="输入产品名称或标识符">
                            </div>
                            <div class="col-md-2">
                                <select v-model="industyClass" class="form-control">
                                    <option selected value="全部类型" >全部类型</option>
                                    <option value="系统">系统</option>
                                    <option value="应用">应用</option>
                                </select>
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
                                        <th>标签类型</th>
                                        <th>标签名称</th>
                                        <th>适用产品</th>
                                        <th>创建日期</th>
                                        <th>状态</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>部门</td>
                                        <td>产品部</td>
                                        <td>智牛后台管理系统</td>
                                        <td>2017-05-23</td>
                                        <td>已启用</td>
                                        <td>
                                            <span data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">编辑</span>
                                            <span data-toggle="modal" data-target=".bs-example-modal-delete">删除</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        <!----编辑---->

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog product-alert" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="exampleModalLabel">编辑标签</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;标签类型：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <select v-model="industyClass" class="form-control">
                                        <option value="部门">部门</option>
                                        <option value="话术">话术</option>
                                        <option value="素材">素材</option>
                                        <option value="代理类型">代理类型</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="userType">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;适用范围：
                                </label>
                                <div class="col-md-6 col-lg-8 lable-radio" v-model="userType">
                                    <div>
                                        <label>
                                            <input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 部分产品
                                        </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 全部产品
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;选择产品：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                        <ul class="label-ul">
                                            <li v-for="(item,index) in listData" :key="index">
                                                <span>{{item.title}}</span>
                                                <input type="checkbox">
                                            </li>
                                        </ul>
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;标签名称：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12 lable-radio">
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


        <!----添加---->

        <div class="modal fade" id="exampleAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog product-alert" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="exampleModalAdd">添加标签</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;标签类型：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <select v-model="industyClass" class="form-control">
                                        <option value="部门">部门</option>
                                        <option value="话术">话术</option>
                                        <option value="素材">素材</option>
                                        <option value="代理类型">代理类型</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="userType">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;适用范围：
                                </label>
                                <div class="col-md-6 col-lg-8 lable-radio" v-model="userType">
                                    <div>
                                        <label>
                                            <input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 部分产品
                                        </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 全部产品
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;选择产品：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <ul class="label-ul">
                                        <li v-for="(item,index) in listData" :key="index">
                                            <span>{{item.title}}</span>
                                            <input type="checkbox">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12">
                                <label class="col-md-2 col-lg-4 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;标签名称：
                                </label>
                                <div class="col-md-6 col-lg-8" >
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">
                                </div>
                            </div>
                            <div class="form-group col-md-12 col-lg-12 lable-radio">
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


        <!---删除--->

        <!--<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">-->
            <!--<div class="modal-dialog modal-sm" role="document">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
                        <!--<h4 class="modal-title">系统提示</h4>-->
                    <!--</div>-->
                    <!--<div class="modal-body">-->
                        <!--<p class="modal-body-p">您确定要删除这个产品吗？</p>-->
                    <!--</div>-->
                    <!--<div class="modal-footer footer-pard">-->
                        <!--<div class="col-md-12">-->
                            <!--<button type="submit" class="btn btn-effect-ripple btn-primary">确定</button>&nbsp;&nbsp;&nbsp;-->
                            <!--<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->


        <v-delete :name="name"></v-delete>
    </div>
</template>


<script>

    import Delete from '../../common/delete.vue'

    export default{
        data(){
            return{
                listData:[
                    {title:"智牛后台管理系统"},
                    {title:"智牛SRM系统"},
                    {title:"智牛客服系统"},
                    {title:"智牛检测僵尸"},
                    {title:"智能支付"},
                    {title:"智牛秀"},
                    {title:"智牛名片"},
                    {title:"智牛微站"},
                    {title:"智牛电商"}
                ],
                name:"您确定要删除这个标签吗？"
            }
        },
        components:{
            "v-delete":Delete
        }
    }

</script>


<style scoped>
    li{ list-style: none;}
    .btn{
        padding: 6px 35px;
    }
    .form-control{
        margin-left: 15px;
    }
    .product-add{
        margin-left: 30px;
    }
    .col-md-2{ padding-left: 0}
    .modal-footer{
        border: none;
        text-align: center;
    }
    .footer-pard{ padding-top: 0;}
    .modal-body-p{ text-align: center; line-height: 20px;}
    .modal-header{
        background-color:#286090;
        padding: 10px;
    }
    .modal-content{overflow: hidden}
    .modal-title{
        text-align: center;
        color: #fff;
    }
    .product-alert{ width: 500px;}
    .control-label{
        line-height: 34px;
        text-align: right;
    }
    .form-control{ margin-left: 0 ;}
    .lable-radio{ line-height: 39px}
    .label-ul{ width: 100%; height: 137px; overflow-y: auto; border: 1px solid #E5E5E5; box-sizing: border-box;
        padding: 5px 15px 5px 5px; background: #fff;
    }
    .label-ul>li{ border-bottom: 1px dashed #E5E5E5; padding: 3px 0;}
    .label-ul>li>p{ float: left; font-size: 14px;}
    .label-ul>li input{ float: right; border:1px solid red; margin-right: 10px; width: 20px; height: 20px; }
    .label-ul>li:hover{ background: #67b7ff; color: #fff;}
    .form-group{ margin: 0;}
    .control-label{ line-height: 39px;}
    .panel{
        border:1px solid #E5E5E5;
        box-shadow: 0 2px 18px #E5E5E5;
        margin: 0 15px;
    }
    .label-from{ margin-bottom:15px; }
    .product{
        margin-left: 15px;
    }


    .style1{ border-bottom: 1px solid #E5E5E5; padding: 20px; margin-top: 0;}


    .col-lg-12{ padding-right:0px;}
    .product-from{ margin: 25px 0;}
</style>
