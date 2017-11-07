<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <h4 class="style1">
                    客户开户
                    <div class="leftBtn">
                        <router-link to="customer">
                            <button type="button" class="btn btn-primary">返回</button>
                        </router-link>
                    </div>
                </h4>
                <div class="panel panel-default">
                    <div class="panel-heading">登录信息</div>
                    <div class="panel-body">
                        <form id="defaultForm" class="form-horizontal" v-on:submit.prevent>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;登录名
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="username" class="form-control" name="username">
                                </div>
                                <p class="col-md-4 p-lineH">8~20位字符，区分大小写</p>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="password">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;登录密码
                                </label>
                                <div class="col-md-4">
                                    <input type="password" v-model="password" class="form-control" name="password">
                                </div>
                                <p class="col-md-4 p-lineH">8~16位字符，区分大小写</p>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="userType">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;客户类型
                                </label>
                                <div class="col-md-4" v-model="userType" @click="radio1()">
                                    <div>
                                        <label>
                                            <input class="custom_radio" type="radio" v-model="userType" :value="1" name="userType"/> 企业
                                        </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input class="custom_radio" type="radio" v-model="userType" :value="2" name="userType"/> 个人
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-show="flag==true">
                                <label class="col-md-3 control-label" prop="companyName">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;公司名称
                                </label>
                                <div class="col-md-4">
                                    <input type="password" v-model="companyName" name="" class="form-control" name="companyName">
                                </div>
                            </div>
                            <div class="form-group" v-show="flag==true">
                                <label class="col-md-3 control-label" prop="companyBID">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;营业执照注册号
                                </label>
                                <div class="col-md-4">
                                    <input type="password" v-model="companyBID" name="" class="form-control" name="companyBID">
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
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="companyBLing" :prop="flagTip">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;{{flagTip}}
                                </label>
                                <div class="col-md-4">
                                    <input type="password" v-model="companyBLing" name="" class="form-control" name="companyBling">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" v-model="selected">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;所属行业
                                </label>
                                <div class="col-md-4">
                                    <select v-model="industyClass" class="form-control">
                                        <option v-for="(item,value) in industy_class" v-bind:item="industy_class.item" name="industyClass">{{ item }}</option>
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
                                    <button type="submit" class="btn btn-effect-ripple btn-primary">保存</button>&nbsp;&nbsp;&nbsp;
                                    <button type="reset" class="btn btn-effect-ripple btn-default reset_btn">重置</button>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-8 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary" name="signup" value="Sign up">Sign up</button>
                                    <button type="submit" class="btn btn-primary" name="signup2" value="Sign up 2">Sign up 2</button>
                                    <button type="button" class="btn btn-info" id="validateBtn">Manual validate</button>
                                    <button type="button" class="btn btn-default" id="resetBtn">重置</button>
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
    import { randomNumber,config } from 'src/utils/valiador'
    export default{
        data(){
            return{
                selected:'801',
                industy_class:'',
                flag:true,
                username:'用户名字',
                password:'*********',
                userType:'1',
                contact:'contact',
                contactPhone:'contactPhone',
                email:'email#@dd.com',
                qq:'qq7044',
                wechat:'wechat',
                bContact:'bContact',
                bContactPhone:'bContactPhone',
                industyClass:'industyClass',
                tContact:'tContact',
                tContactPhone:'tContactPhone',
                remark:'',
                region:'region',
                companyName:'companyNmae',
                companyBID:'BID',
                companyBLing:'',
                flagTip:'上传身份证'
            }
    },
    mounted(){
        randomNumber();
        config();
    },
    created(){
         this.$axios.get('static/industy_class.json').then(res=>{
             this.industy_class = res.data;
             console.log(this.industy_class);
         }).catch(err=>{
             console.log(err);
         })
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
        }
    }
    }
</script>


<style scoped>
    .leftBtn{
        float:right;
    }
    h4{
        height:40px;
        line-height: 40px;
        text-indent: 20px;
    }
    .employ-basic{
        border-top: 1px solid #ddd;
        border-radius: 0;
    }
    .text-danger{
        color:red;
    }
    .panel{
        margin-left: 20px;
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
    .has-feedback label~.form-control-feedback {
         top: 0;
    }
</style>
