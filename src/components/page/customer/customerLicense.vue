<template>
    <div>
        <div class="a">
            <h4 class="style1">
                客户License管理
            </h4>
        </div>
        <div class="col-lg-11">

        <div class="form-group">
            <div class="row">
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
                <div class="col-md-2 searchBtn">
                    <button type="button" class="btn btn-primary">查询</button>
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" data-whatever="@mdo">试用申请</button>
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3" data-whatever="@mdo">授权申请</button>
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
                            <th>类型</th>
                            <th>合同编号</th>
                            <th>金额(¥)</th>
                            <th>创建时间</th>
                            <th>开通日期</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in data2">
                            <td>{{ item.index}}</td>
                            <td>{{ item.contract.contractSerial }}</td>
                            <td>{{ item.type }}</td>
                            <td>{{ item.contract.contractNumber}}</td>
                            <td>{{ item.contract.amount}}</td>
                            <td>{{ item.createAt }}</td>
                            <td>{{ item.effectiveAt }}</td>
                            <td><span class="label label-sm label-success">{{ item.status }}</span></td>
                            <td prop=""><span class="label label-sm label-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">查看</span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            <!--查看弹出框-->
            <div class="modal fade textStyle" id="exampleModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="exampleModalLabel">查看试用申请</h4>
                        </div>
                        <div class="modal-body" v-for="item in data2">
                            <div class="row">
                                <div class="text-center">
                                    <p>授权编号:{{ item.contract.contractSerial }}</p>
                                </div>
                                <div class="text-center">
                                    <p>试用申请:{{ item.contract.contractNumber }}</p>
                                </div>
                                <div class="text-center">
                                    <p>开通时间:{{ item.createAt }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary center closeBtn" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--试用申请弹出框-->
            <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="exampleModalLabel2">试用申请</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="form-group">
                                    <div class="col-md-8">
                                        <select class="form-control" v-model="name" placeholder="选择试用产品">
                                            <option v-for="(item,value) in data2[0].applicationName" :value="item" :key="item._id">{{item}}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <button type="submit" class="btn btn-primary" @click="addProduct()">添加</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="chosedAuth">
                                    <ul>
                                        <li v-for="(item,index) in arr" :key="index">
                                            <span class="col-md-7">{{item}}</span>
                                            <span class="col-md-3"><input type="text" v-model="day">天</span>
                                            <span class="label label-sm label-danger" @click="deleteIt(index)">删除</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary center closeBtn" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--授权申请弹出框-->
            <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="exampleModalLabel3">查看授权申请</h4>
                        </div>
                        <div class="modal-body">
                            <!--<form id="form-validation" class="form-horizontal" v-on:submit.prevent>-->
                            <div class="row">
                                <div class="form-group">
                                    <label class="col-md-3 control-label" prop="contractNumber">
                                        <span class="text-danger">*</span>&nbsp;&nbsp;合同编号
                                    </label>
                                    <div class="col-md-7">
                                        <input type="text" v-model="contractNumber" class="form-control" placeholder="请输入本次合同编号">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label class="col-md-3 control-label" prop="amount">
                                        <span class="text-danger">*</span>&nbsp;&nbsp;合同金额(￥)
                                    </label>
                                    <div class="col-md-7">
                                        <input type="text" v-model="amount" class="form-control" placeholder="请输入本次合同总金额">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label class="col-md-3 control-label" prop="amount">
                                        <span class="text-danger">*</span>&nbsp;&nbsp;授权申请
                                    </label>
                                    <div class="col-md-7">
                                        <select class="form-control" v-model="name" placeholder="选择试用产品">
                                            <option v-for="(item,value) in data2[0].applicationName" :value="item" :key="item._id">{{item}}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <button type="submit" class="btn btn-primary miniBtn" @click="addProduct()">添加</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="chosedAuth">
                                    <ul>
                                        <li v-for="(item,index) in arr" :key="index">
                                            <span class="col-md-7">{{item}}</span>
                                            <span class="col-md-3"><input type="text" v-model="day">天</span>
                                            <span class="label label-sm label-danger" @click="deleteIt(index)">删除</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary center closeBtn" data-dismiss="modal">关闭</button>
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
                industyClass:'授权编号',
                data2:[{
                    index:'1',
                    type:'1',
                    contract:{
                        contractSerial:'WWNL201607150003',
                        amount:'30',
                        contractNumber:'WWNH201707020001' //新添的数据名
                    },
                    createAt:'2017年3月',
                    effectiveAt:'2019年3月',
                    status:'2',
                    applicationName:['智牛客服系统','智牛SRM系统','智牛检查僵尸','智牛支付']
                }],
                name:"",
                arr:[],
                day:'7'
            }
        },
        methods:{
            addProduct(){
               this.arr.push(this.name);
            },
            deleteIt(i){
                console.log(i);
                this.arr.splice(i,1)
                console.log(this.arr)
            }
        }
    }

</script>


<style scoped>
    .form-group{
        margin-left: 30px;
        margin-top: 10px;
    }
    h4{
        height:40px;
        line-height: 40px;
        text-indent:8px;
    }

    .modal-dialog {
    width: 500px;
    height: 35px;
    line-height: 35px;
    margin: 30px auto;
    }
    .modal-header{
        padding:3px;
        height:40px;
        line-height: 40px;
        text-align: left;
    }
    .modal-footer{
        padding:0;
        height:40px;
        line-height: 40px;
        text-align: left;
    }
    .closeBtn{
        float: right;
        margin: 3px 5px;
    }
    .btn{
        outline:none;
        padding:6px 30px;
    }
    .searchBtn{
        position: relative;
        left:25px;
    }
    .chosedAuth{
        height: 150px;
        background:rgb(242,242,242);
        overflow-y: scroll;
        margin: 20px 0;
    }
    ul li span{
        text-indent:20px;
        height: 40px;
        line-height: 40px;
    }
    li{
        list-style:none;
    }
    li input{
        outline: none;
        height:25px;
        width:50px;
    }
    .miniBtn{
        padding:3px 15px;
    }
</style>


