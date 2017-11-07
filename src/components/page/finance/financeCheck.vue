<template>
    <div class="financeCheck">
        <div class="a">
            <h4 class="style1">
                财务管理
                <div class="leftBtn">
                    <router-link to="finance">
                        <button type="button" class="btn btn-default">返回</button>
                    </router-link>
                </div>
            </h4>
        </div>
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">客户信息</div>
                <div class="panel-body">
                    <ul v-for="item in data2">
                        <li class="col-md-5">登录名：{{item.username}}</li>
                        <li class="col-md-5">客户类型：{{item.userType}}</li>
                        <li class="col-md-5">姓名：{{item.companyName}}</li>
                        <li class="col-md-5">身份证号：{{item.companyBID}}</li>
                    </ul>
                    <!--the end of this form and the header of the form-->
                </div>
                <div class="panel-heading employ-basic">授权信息</div>
                <div class="panel-body">
                    <!--hasta aqui-->
                    <ul v-for="item in data2">
                        <li class="col-md-5">授权编号：{{item.username}}</li>
                        <li class="col-md-5">合同金额：{{item.userType}}</li>
                        <li class="col-md-5">金额：{{item.companyName}}</li>
                        <li class="col-md-5">申请时间：{{item.companyBID}}</li>
                        <li class="col-md-5">申请人：{{item.userType}}</li>
                        <li class="col-md-5">授权产品：{{item.companyName}}</li>
                    </ul>
                    <!--the end of this form and the header of the form-->
                </div>
                <div class="panel-heading employ-basic">付款确认</div>
                <div class="panel-body">
                    <!--hasta aqui-->
                    <form id="form-validation" class="form-horizontal" v-on:submit.prevent>
                        <div class="form-group">
                            <label class="col-md-3 control-label" prop="industyClass">
                                <span class="text-danger">*</span>&nbsp;&nbsp;付款方式
                            </label>
                            <div class="col-md-5">
                                <select v-model="industyClass" class="form-control">
                                    <option value="银行汇款">银行汇款</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" prop="contact">
                                <span class="text-danger">*</span>&nbsp;&nbsp;凭证号
                            </label>
                            <div class="col-md-5">
                                <input type="text" v-model="contact" name="contact" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">
                                <span class="text-danger">*</span>&nbsp;&nbsp;上传凭证:
                            </label>
                            <div class="col-sm-5">
                                <input id="file" name="file-Portrait1" type="file" data-show-caption="true">
                                <p class="help-block">支持jpg、jpeg、png格式，大小不超过2.0M</p>
                            </div>
                        </div>
                        <div class="form-group form-actions">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-effect-ripple btn-primary">确认已收款</button>&nbsp;&nbsp;&nbsp;
                                <button type="reset" class="btn btn-effect-ripple btn-default reset_btn">重置</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//    import inputFileZh from '../../../bootstrap/js/fileInput_zh'
//    import inputFileJs from '../../../bootstrap/js/fileInput'



    export default{
        name:'financeCheck',
        data(){
            return {
                industyClass:'',
                contact:'',
                data2:[{
                    username:'nocfrefvrev',
                    userType:'1',
                    companyName:'公司名',
                    companyBID:'营业执照'
                }],
            }
        },
    }
</script>
<style scoped>
    .leftBtn{
        float:right;
    }
    h4{
        height:40px;
        line-height: 40px;
    }
    li{
        list-style: none;
        margin-left: 70px;
        height: 40px;
        line-height: 40px;
    }
    .employ-basic{
        border-top: 1px solid #ddd;
        border-radius: 0;
    }
    .text-danger{
        color:red;
    }
    .panel{
        box-shadow: 0 2px 18px #E5E5E5;
    }
    .btn{
        outline:none;
        padding:6px 30px;
    }
</style>
