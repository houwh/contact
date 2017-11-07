<template>
    <div>
        <!--main content-->
        <div class="row">
            <div class="col-lg-12">
                <h4 class="style1">
                    员工账号管理
                </h4>
                <div class="form-group">
                    <div class="row product-from">
                        <div class="col-md-3">
                            <input type="text" class="form-control" placeholder="输入产品名称或标识符" v-model="csrf">
                        </div>
                        <div class="col-md-2">
                            <select v-model="data.workername" class="form-control">
                                <option selected value="全部角色" >全部角色</option>
                                <option value="系统">系统</option>
                                <option value="应用">应用</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select v-model="data.department" class="form-control">
                                <option selected value="全部部门" >全部部门</option>
                                <option value="系统">系统</option>
                                <option value="应用">应用</option>
                            </select>
                        </div>
                        <div class="col-md-1">
                            <button type="button" class="btn btn-primary btn-div">查询</button>
                        </div>
                        <div class="col-md-1 product-add">
                            <router-link :to="{path:'employeeAdd'}">
                                <button type="button" class="btn btn-primary btn-div" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">添加</button>
                            </router-link>
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
                                    <th>登录名</th>
                                    <th>姓名</th>
                                    <th>角色</th>
                                    <th>部门</th>
                                    <th>手机</th>
                                    <th>邮箱</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(user,index) in docs" :key="index">
                                    <td>{{user.id}}</td>
                                    <td>{{user.username}}</td>
                                    <td>{{ user.userRealName }}</td>
                                    <td>{{ user.connection.item.role }}</td>
                                    <td>{{ user.connection.item.department }}</td>
                                    <td>{{ user.connection.item.mobile }}</td>
                                    <td>{{ user.connection.item.email }}</td>
                                    <td v-if="user.isFreeze">已冻结</td>
                                    <td v-else>已开通</td>
                                    <td>
                                        <router-link :to="{path:'employeeEdit'}">
                                            编辑
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
    </div>
</template>
<script>

    export default{
        data(){
            return{
                docs:[
                    {username:"Loyce",userRealName:"Larson",id:"1",
                        connection:{item:{role:"Industrial",department:"产品",mobile:"1",email:"Loyce"}},
                    },
                    {username:"Loyce",userRealName:"Larson",id:"1",
                        connection:{item:{role:"Industrial",department:"产品",mobile:"1",email:"Loyce"}},
                    },
                    {username:"Loyce",userRealName:"Larson",id:"1",
                        connection:{item:{role:"Industrial",department:"产品",mobile:"1",email:"Loyce"}},
                    }
                ],
                csrf:"请输入旧密码",
                data:{
                    workername:"全部角色",
                    department:"全部部门"
                }
            }
        }
    }

</script>

<style scoped>
    .table>thead>tr>th,.table>tbody>tr>td{
        text-align: center;
    }
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
     .breadcrumb{
       height: 50px;
         line-height: 50px;
    }
    .btn-div{ margin-left: 15px;}
    .panel{
        border:1px solid #E5E5E5;
        box-shadow: inset 0 0 10px #E5E5E5;
        margin: 0 15px;
    }


    .style1{ border-bottom: 1px solid #E5E5E5; padding: 20px; margin-top: 0;}


    .col-lg-12{ padding-right:0px;}
    .product-from{ margin: 25px 0; border: 1px solid #E5E5E5; padding: 10px 0;
        margin: 0 15px; box-shadow: inset 0 0 10px #E5E5E5; border-radius:4px ;
    }
    .table-responsive{ border: none}
</style>
