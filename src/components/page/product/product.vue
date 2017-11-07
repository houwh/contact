<template>
    <div>
        <!--main content-->
        <div class="row">
            <div class="col-lg-12">
                <h4 class="style1">
                    产品管理
                </h4>

                <div class="form-group">
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
                        <router-link to="productAdd" class="col-md-1 product-add">
                            <button type="button" class="btn btn-primary">添加</button>
                        </router-link>

                    </div>
                </div>



                <div class="panel">
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th @click="transdate('1234567896543')">序号</th>
                                    <th>产品名称</th>
                                    <th>产品唯一标识符</th>
                                    <th>产品类型</th>
                                    <th>创建日期</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(app,index) in apps">
                                    <td>{{app.id}}</td>
                                    <td>{{app.applicationName}}</td>
                                    <td>{{app.uniqueFlag}}</td>
                                    <td v-if="app.type==1">系统</td>
                                    <td v-else>应用</td>
                                    <td>{{app.createAt}}</td>
                                    <td v-if="app.status==2">已上架</td>
                                    <td v-else>未上架</td>
                                    <td>
                                        <router-link to="productEdit">编辑</router-link>
                                        <!--<span data-toggle="modal" data-target=".bs-example-modal-delete">删除</span>-->
                                        <router-link to="productJurisdiction">
                                           权限管理
                                        </router-link>
                                        <router-link to="productRole">
                                            默认角色
                                        </router-link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!---编辑---->

        <!--<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">-->
            <!--<div class="modal-dialog product-alert" role="document">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
                        <!--<h4 class="modal-title" id="exampleModalLabel">编辑产品</h4>-->
                    <!--</div>-->
                    <!--<div class="modal-body">-->
                        <!--<form>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="applicationName">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;产品名称：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8" >-->
                                    <!--<input type="text" v-model="applicationName" class="form-control" placeholder="8~20位字符，区分大小写">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="username">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;唯一标识符：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8">-->
                                    <!--<input type="text" v-model="uniqueFlag" class="form-control" placeholder="8~20位字符，区分大小写">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="userType">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;类型：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8" v-model="userType">-->
                                    <!--<div>-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 系统-->
                                        <!--</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 应用-->
                                        <!--</label>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="userType">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;License授权：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8" v-model="userType">-->
                                    <!--<div>-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit1" v-model="userType" :value="1" /> 不需要-->
                                        <!--</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit1" v-model="userType" :value="2" /> 需要-->
                                        <!--</label>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="userType">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;状态：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8" v-model="userType">-->
                                    <!--<div>-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit2" v-model="userType" :value="1" /> 未上线-->
                                        <!--</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit2" v-model="userType" :value="2" /> 已上线-->
                                        <!--</label>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="modal-footer ">-->
                                <!--<div class="col-md-12">-->
                                    <!--<button type="submit" class="btn btn-effect-ripple btn-primary">保存</button>&nbsp;&nbsp;&nbsp;-->
                                    <!--<button type="reset" class="btn btn-effect-ripple btn-default reset_btn">重置</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</form>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!---添加---->

        <!--<div class="modal fade" id="exampleAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">-->
            <!--<div class="modal-dialog product-alert" role="document">-->
                <!--<div class="modal-content">-->
                    <!--<div class="modal-header">-->
                        <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
                        <!--<h4 class="modal-title" id="exampleModalAdd">添加产品</h4>-->
                    <!--</div>-->
                    <!--<div class="modal-body">-->
                        <!--<form>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="username">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;产品名称：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8" >-->
                                    <!--<input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="username">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;唯一标识符：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8">-->
                                    <!--<input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写">-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="userType">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;类型：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8" v-model="userType">-->
                                    <!--<div>-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 系统-->
                                        <!--</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit" v-model="userType" :value="1" /> 应用-->
                                        <!--</label>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="userType">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;License授权：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8" v-model="userType">-->
                                    <!--<div>-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit1" v-model="userType" :value="1" /> 不需要-->
                                        <!--</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit1" v-model="userType" :value="2" /> 需要-->
                                        <!--</label>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-group col-md-12 col-lg-12">-->
                                <!--<label class="col-md-2 col-lg-4 control-label" prop="userType">-->
                                    <!--<span class="text-danger">*</span>&nbsp;&nbsp;状态：-->
                                <!--</label>-->
                                <!--<div class="col-md-6 col-lg-8" v-model="userType">-->
                                    <!--<div>-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit2" v-model="userType" :value="1" /> 未上线-->
                                        <!--</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                                        <!--<label>-->
                                            <!--<input class="custom_radio" type="radio" name="Fruit2" v-model="userType" :value="2" /> 已上线-->
                                        <!--</label>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="modal-footer ">-->
                                <!--<div class="col-md-12">-->
                                    <!--<button type="submit" class="btn btn-effect-ripple btn-primary">保存</button>&nbsp;&nbsp;&nbsp;-->
                                    <!--<button type="reset" class="btn btn-effect-ripple btn-default reset_btn">重置</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</form>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->


        <!--&lt;!&ndash;-删除&#45;&#45;&ndash;&gt;-->

        <!--<v-delete :name="name"></v-delete>-->
    </div>
</template>


<script>
//    import Delete from "../../common/delete.vue";
    export default{
        data(){
            return{
                apps:[
                    {applicationName:"智牛后台管理系统1",id:"1",uniqueFlag:"NC_MANAGER",type:"1",
                        createAt:"2017-05-2311",status:"2"
                    },
                    {applicationName:"智牛管理系统1",id:"1",uniqueFlag:"NC_MANAGER",type:"1",
                        createAt:"2017-05-2311",status:"2"
                    }
                ],
                time:"",
                applicationName:"dawdawdawd",
                uniqueFlag:"awdawdawd123",
                industyClass:"全部类型",
                userType:"",
                username:""
            }
        },
        methods:{
            /****时间戳******/
            transdate(nS){
                var timeName = new Date(parseInt(nS) * 1000).toLocaleString().substr(1,10).repeat("/","_");
                this.time = timeName
                alert(this.time)
            }
        }
    }

</script>


<style scoped>
    .modal-footer{
        border: none;
        text-align: center;
    }
    .control-label{
        line-height: 34px;
        text-align: right;
    }
    .modal-body{
        padding-left: 0px;
    }
    .form-group{
        line-height: 34px;
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
    .panel{
        border:1px solid #E5E5E5;
        box-shadow: 0 2px 18px #E5E5E5;
        margin: 0 15px;
    }

        .modal-title{
            text-align: center;
            color: #fff;
        }
    .modal-header{
        background-color:#286090;
        padding: 15px;
    }
    .modal-content{overflow: hidden}
    .modal-body-p{ text-align: center; line-height: 20px;}
    .footer-pard{ padding-top: 0;}
    .product-alert{ width: 500px;}


    .style1{ border-bottom: 1px solid #E5E5E5; padding: 20px; margin-top: 0;}


    .col-lg-12{ padding-right:0px;}
    .product-from{ margin: 25px 0; border-bottom: 1px solid #E5E5E5; padding: 10px 0;
        margin: 0 15px; box-shadow: 0 2px 18px #E5E5E5; border-radius: 4px;
    }
</style>
