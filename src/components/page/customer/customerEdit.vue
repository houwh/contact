<template>
        <!--main content-->
            <div class="col-md-12">
                <h4 class="style1">
                    客户编辑
                    <div class="leftBtn">
                        <router-link to="customer">
                            <button type="button" class="btn btn-default">返回</button>
                        </router-link>
                        &nbsp;&nbsp;
                        <button class="btn btn-danger" data-toggle="modal" data-target=".bs-example-modal-delete">删除</button>
                        &nbsp;&nbsp;
                        <button @click="frozenClick" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm">{{frozen}}</button>
                    </div>
                </h4>

                <div class="panel panel-default">
                    <div class="panel-heading">登录信息</div>
                    <div class="panel-body">
                        <form id="form-validation" class="form-horizontal" v-on:submit.prevent>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="username">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;登录名
                                </label>
                                <div class="col-md-4">
                                    <input type="text" v-model="username" class="form-control" placeholder="8~20位字符，区分大小写" readonly>
                                </div>
                                <p class="col-md-4 p-lineH">8~20位字符，区分大小写</p>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="password">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;登录密码
                                </label>
                                <div class="col-md-4">
                                    <input type="password" v-model="password" class="form-control" placeholder="8~16位字符，区分大小写">
                                </div>
                                <p class="col-md-4 p-lineH">8~16位字符，区分大小写</p>
                                <p class="col-md-4 col-md-offset-2 pmodified">密码不设置默认不修改</p>
                            </div>
                            <!--the end of this form and the header of the form-->
                        </form>
                    </div>
                    <div class="panel-heading employ-basic">基本信息</div>
                    <div class="panel-body">
                        <form id="" class="form-horizontal" v-on:submit.prevent>
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
                            <div class="form-group">
                                <label class="col-md-3 control-label" prop="companyBLing" v-text="flagTip">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;{{flagTip}}
                                </label>
                                <div class="col-md-9">
                                    <div id="preview"></div>
                                    <div class="col-md-12">
                                        <div class="col-md-2">
                                            <div class="file">
                                                <span>本地上传</span>
                                                <input type="file" ref="file" @change="preview" />
                                            </div>
                                        </div>
                                        <div class="col-md-10 fileName">
                                            <p>仅能上传一张，上传的电子照片支持jpg、jpeg、gif、png、bmp格式的图片。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-3 control-label" v-model="industyClass">
                                    <span class="text-danger">*</span>&nbsp;&nbsp;所属行业
                                </label>
                                <div class="col-md-4">
                                    <select v-model="industyClass" class="form-control">
                                        <option v-for="(item,value) in industy_class" v-bind:item="industy_class.item">{{ item }}</option>
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
                                    备注：
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
                        </form>
                    </div>
                </div>



                <!-----冻结------->


                <v-frozen :frozen="frozen" :frozenName="frozenName"></v-frozen>

                <!-----删除------>


                <v-delete :name="name"></v-delete>

            </div>
</template>
<script>
    import Frozen from "../../common/frozen.vue"
    import Delete from "../../common/delete.vue";
    export default{
        data(){
            return {
                industy_class: '',
                flag: true,
                username: 'username',
                password: '********',
                userType: '1',
                contact: 'luz',
                contactPhone: '17310188888',
                email: 'email@xdec.com',
                qq: 'qq',
                wechat: 'wexhat',
                bContact: 'bContact',
                bContactPhone: 'ccccc',
                industyClass: 'industyClass',
                tContact: 'tContact',
                tContactPhone: 'tContactPhne',
                remark: '',
                region: 'region',
                companyName: 'companyNmae',
                companyBID: 'BID',
                companyBLing: '',
                flagTip: '上传身份证',
                frozen: '冻结',
                frozenName: "解冻",
                name: "您确定要删除该账号吗？"

            }
        },

        components: {
            "v-frozen": Frozen,
            "v-delete": Delete
        },
        created(){
            this.$axios.get('static/industy_class.json').then(res => {
                this.industy_class = res.data;
                console.log(this.industy_class);
            }).catch(err => {
                console.log(err);
            })
        },
        methods: {
            radio1(){
                if (this.userType == 1) {
                    this.flag = true;
                    this.flagTip = '上传营业执照'
                } else {
                    this.flag = false;
                    this.flagTip = '上传身份证'
                }
            },

            frozenClick(){
                if (this.frozen == "冻结") {
                    this.frozen = "解冻"
                    this.frozenName = "冻结"
                } else {
                    this.frozen = "冻结"
                    this.frozenName = "解冻"
                }
            },
            preview(){
                var file = this.$refs['file']
                var prevDiv = document.getElementById('preview');
                if (file.files && file.files[0])
                {
                    var reader = new FileReader();
                    reader.onload = function(evt){
                        prevDiv.innerHTML = '<img src="' + evt.target.result + '"  width="280px" height="170px"/>';
                        $('#preview img').addClass('upimg')
                    }
                    reader.readAsDataURL(file.files[0]);
                }
                else
                {
                    prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
                }
            }

        },
        components: {
            "v-frozen": Frozen,
            "v-delete": Delete
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
.pmodified{
    color: red;
    margin-top: 15px;
    text-indent: 80px;
}
    .panel-body{
        padding-top:40px;
    }


#preview
{
    width:280px;
    height:170px;
}
#preview
{
    border:1px solid #E5E5E5;
}
.file {
    margin-top: 10px;
    position: relative;
    display: inline-block;
    background: #ffc941;
    /*border: 1px solid #99D3F5;*/
    border-radius: 4px;
    overflow: hidden;
    color: #000;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    font-size: 12px;
}
.file span{
    padding: 5px 25px;
    display: inline-block;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
    .fileName{
        margin-top: 10px;
        font-size: 14px;
        color: #868686;
        line-height: 30px;
    }
</style>
