<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <h4 class="style1">
                    代理商开户
                    <router-link to="agent">
                        <button type="button" class="btn btn-default leftBtn">返回</button>
                    </router-link>
                </h4>
                <!--<div class="emptyBtn"></div>-->
                <div class="panel panel-default">
                    <div class="panel-heading">登录信息</div>
                    <div class="panel-body">
                        <form id="form-validation" class="form-horizontal" v-on:submit.prevent>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;登录名
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="username" class="form-control">
                                </div>
                                <p class="col-md-4 p-lineH">8~20位字符，区分大小写</p>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="password">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;登录密码
                                </label>
                                <div class="col-md-4">
                                    <input type="password" v-model="password" class="form-control">
                                </div>
                                <p class="col-md-4 p-lineH">8~16位字符，区分大小写</p>
                            </div>
                            <!--the end of this form and the header of the form-->
                        </form>
                    </div>
                    <div class="panel-heading employ-basic">代理信息</div>
                    <div class="panel-body">
                        <form class="form-horizontal" v-on:submit.prevent>
                            <!--hasta aqui-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="agentType">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;代理类型
                                </label>
                                <div class="col-md-4">
                                    <select v-model="agentType" class="form-control">
                                        <option value="省代理">省代理</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="agentRegion">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;代理省份
                                </label>
                                <div class="col-md-4">
                                    <select v-model="agentRegion" class="form-control">
                                        <option value="北京">北京</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="agentOff">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;代理折扣
                                </label>
                                <div class="col-md-4">
                                    <select v-model="agentOff" class="form-control">
                                        <option value="五折">五折</option>
                                    </select>
                                </div>
                            </div>
                            <!--the end of this form and the header of the form-->
                        </form>
                    </div>
                    <div class="panel-heading employ-basic">基本信息</div>
                    <div class="panel-body">
                        <form class="form-horizontal" v-on:submit.prevent>
                            <!--hasta aqui-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="userType">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;客户类型
                                </label>
                                <div class="col-md-4" v-model="userType" @click="radio1()">
                                    <div>
                                        <label>
                                            <input class="custom_radio" type="radio" v-model="userType" :value="1" /> 企业
                                        </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input class="custom_radio" type="radio" v-model="userType" :value="2" /> 个人
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group" v-show="flag==true">
                                <label class="col-md-3 control-label" prop="companyName">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;公司名称
                                </label>
                                <div class="col-md-4">
                                    <input type="password" v-model="companyName" name="" class="form-control">
                                </div>
                            </div>
                            <div class="form-group" v-show="flag==true">
                                <label class="col-md-3 control-label" prop="companyBID">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;营业执照注册号
                                </label>
                                <div class="col-md-4">
                                    <input type="password" v-model="companyBID" name="" class="form-control">
                                </div>
                            </div>
                            <div class="form-group" v-show="flag==false">
                                <label class="col-md-3 control-label" prop="companyBID">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;身份证号
                                </label>
                                <div class="col-md-4">
                                    <input type="password" v-model="companyBID" name="" class="form-control">
                                </div>
                            </div>

                            <div class="form-group" v-bind:label="flagTip">
                                <label class="col-md-3 control-label" prop="companyBLing">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;{{ flagTip }}
                                </label>
                                <div class="col-md-4">
                                    <span>只能上传 jpeg/jpg/png/gif 文件，且不超过10MB</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="industyClass">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;所属行业
                                </label>
                                <div class="col-md-4">
                                    <select v-model="industyClass" class="form-control">
                                        <option value="互联网">互联网</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="contact">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;联系人
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="contact" name="contact" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="contactPhone">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;联系人手机
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="contactPhone" name="contactPhone" class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="email">
                                    邮箱
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="email" name="email" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="qq">
                                    QQ
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="qq" name="qq" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="wechat">
                                    微信号
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="wechat" name="wechat" class="form-control">
                                </div>
                            </div>
                            <!--the end of this form and the header of the form-->
                        </form>
                    </div>
                    <div class="panel-heading employ-basic">其他信息</div>
                    <div class="panel-body">
                        <form class="form-horizontal" v-on:submit.prevent>
                            <!--hasta aqui-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="bContact">
                                    业务联系人
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="bContact" name="bContact" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="bContactPhone">
                                    业务联系人手机
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="bContactPhone" name="bContactPhone" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="tContact">
                                    技术联系人
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="tContact" name="tContact" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="tContactPhone">
                                    技术联系人手机
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="tContactPhone" name="tContactPhone" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="remark">
                                    备注
                                </label>
                                <div class="col-md-4">
                                    <textarea class="col-md-3 form-control" v-model="remark"></textarea>
                                </div>
                            </div>
                            <br>
                            <div class="form-group form-actions">
                                <div class="col-md-8 col-md-offset-4">
                                    <button type="submit" class="btn btn-effect-ripple btn-primary">提交</button>&nbsp;&nbsp;&nbsp;
                                    <button type="reset" class="btn btn-effect-ripple btn-default reset_btn">重置</button>
                                </div>
                            </div>
                        </form>
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
                flag:true,
                flagTip:'上传营业执照',
                username:'',
                password:'',
                userType:'1',
                contact:'',
                contactPhone:'',
                email:'',
                qq:'',
                wechat:'',
                bContact:'',
                bContactPhone:'',
                industyClass:'',
                tContact:'',
                tContactPhone:'',
                remark:'',
                region:'',
                companyName:'',
                companyBID:'',
                one:'',
                two:'',
                three:'',
                industryClass:'',
                companyBLing:'',
                agentType:"省级代理",
                agentRegion:'代理省份',
                agentOff:'五折',
            }
        },

    created(){
    },
    methods:{
        radio1(){
            if(this.userType==1){
                this.flag =true;
                this.flagTip = '上传营业执照'
            }else{
                this.flag = false;
                this.flagTip = '上传身份证'
            }
        },
    }
    }
</script>


<style scoped>
    .row{
        padding-left: 15px;
    }
    .leftBtn{
        float:right;

    }
    h4{
        height:40px;
        line-height: 40px;
        /*border-bottom: 1px solid #E5E5E5;*/
        text-indent: 15px;
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
    .p-lineH{
        line-height: 34px;
        color: #BCBCBC;
        font-size: 14px;
    }
</style>
