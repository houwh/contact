<template>
    <div class="row">
    <div class="col-lg-12">
        <h4 class="style1">
            财务管理
        </h4>
        <div class="form-group">
            <div class="row finance-form">
                <div class="col-md-2">
                    <select v-model="industyClass" class="form-control">
                        <option value="授权编号" >授权编号</option>
                        <option value="订单编号">订单编号</option>
                        <option value="合同编号">合同编号</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" placeholder="仅支持精确匹配查找">
                </div>
                <div class="col-md-1">
                    <button type="button" class="btn btn-primary">查询</button>
                </div>
            </div>
        </div>
        <div class="panel ">
            <div class="panel-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>授权编号/订单编号</th>
                            <th>金额(¥)</th>
                            <th>客户登录名</th>
                            <th>创建人</th>
                            <th>创建时间</th>
                            <th>审核日期</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td prop="">1</td>
                            <td prop="">WWNL201607150003</td>
                            <td prop="">12,000.00</td>
                            <td prop="">pablo</td>
                            <td prop="">杨雷</td>
                            <td prop="">2016-07-15</td>
                            <td prop="">2016-07-15</td>
                            <td prop=""><span class="label label-sm label-danger">代付款</span></td>
                            <td prop="">
                                <router-link to="financeCheck">
                                    <span class="label label-sm label-success">审核</span>
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
</template>



<script>
    export default{
        data(){
            return{
                industyClass:''
            }
        }
    }

</script>


<style scoped>
    .table>thead>tr>th,.table>tbody>tr>td{
        text-align: center;
    }
    .btn{
        /*display: inline-block;*/
        /*height: 34px;*/
        /*width:100px;*/
        margin-left: 25px;
        padding:6px 30px;
        outline:none;
    }
    .form-control{
        margin-left: 15px;
    }
    .panel{
        border:1px solid #E5E5E5;
        box-shadow: 0 2px 18px #E5E5E5;
        margin: 0 15px;
    }

    .style1{ border-bottom: 1px solid #E5E5E5; padding: 20px; margin-top: 0;}

    .col-lg-12{ padding-right:0;}
    .finance-form{ margin: 25px 15px; border-bottom: 1px solid #E5E5E5; padding: 15px 0;
        box-shadow: 0 2px 18px #E5E5E5;
    }
</style>
