<template>
    <div id="CustomerAccount">
        <div class="compHead">
            <div>
                <p>客户账号管理</p>
                <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item> 客户管理 </el-breadcrumb-item>
                        <el-breadcrumb-item> 客户账号管理 </el-breadcrumb-item>
                        <el-breadcrumb-item> 编辑 </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <el-button @click="this.history.go(-1)" type="primary" class="retBtn">返回</el-button>
        </div>

        <div class="context">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="257px" class="demo-ruleForm" style="mar">
                <div class="formHead">
                    <span>基本信息</span>
                    <div class="twoBtn">
                        <el-button type="primary" @click="freezeCustomer" v-if="!isFreeze">冻结</el-button>
                        <el-button type="danger" @click="deFreezeCustomer" v-if="isFreeze">解冻</el-button>
                        <el-button @click="deleteCustomer" type='danger'>删除</el-button>
                    </div>
                </div>
                <el-form-item label="登录名" prop="username">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.username" placeholder="8~20位字符，区分大小写" disabled="disabled"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="登录密码" prop="password">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.password" placeholder="8~16位字符，区分大小写"></el-input>
                        <span class="red">密码不设置，默认不修改</span>
                    </el-col>
                </el-form-item>
                <br/>
                <el-form-item label="客户类型" prop="connection.userType">
                    <el-radio-group v-model="ruleForm.connection.userType" @change="change">
                        <el-radio :label="1">企业</el-radio>
                        <el-radio :label="2">个人</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="公司名称" prop="connection.companyName" v-if="flag">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.connection.companyName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="营业执照注册号" prop="connection.companyBID" v-if="flag">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.connection.companyBID" placeholder="" ref="company"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号" prop="connection.companyBID" v-if="!flag">
                    <el-col :span="13">
                        <el-input @blur="IdentityCodeValid(connection.companyBID)" v-model="cardId" id="identifycheck" ref="person">{{ a }}</el-input>
                    </el-col>
                </el-form-item>

                <el-form-item v-bind:label="flagTip" prop="connection.companyBLimg" v-if="ruleForm.connection.userType==1">
                    <el-col :span="12">
                        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false" :with-credentials="true" :headers="uploadHeaders" :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.connection.companyBLimg" :src="ruleForm.connection.companyBLimg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="el-upload__tip" slot="tip">只能上传 jpeg/jpg/png/gif 文件，且不超过10MB</div>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <!--身份证-->
                <el-form-item v-bind:label="flagTip" prop="connection.companyBLimg" v-if="ruleForm.connection.userType==2">
                    <el-col :span="12">
                        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false" :with-credentials="true" :headers="uploadHeaders" :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="cardImgUrl" :src="cardImgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="el-upload__tip" slot="tip">只能上传 jpeg/jpg/png/gif 文件，且不超过10MB</div>
                        </el-upload>
                    </el-col>
                </el-form-item>
                

                <el-form-item label="所属行业" prop="connection.industryClass">
                    <el-select v-model="ruleForm.connection.industryClass" placeholder="请选择" @change="open">
                        <el-option-group v-for="group in industyClass" :label="group.name">
                            <el-option v-for="item in group.children" :key="item.value" :label="item.name" :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>

                <el-form-item label="所在区域" prop="connection.region">
                    <el-cascader :options="options" v-model="ruleForm.connection.region"></el-cascader>
                </el-form-item>

                <el-form-item label="联系人" prop="connection.contact">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.connection.contact"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="联系人手机" prop="connection.contactPhone">
                    <el-col :span="13">
                        <el-input v-model.number="ruleForm.connection.contactPhone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="邮箱" prop="connection.email">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.connection.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="QQ" prop="connection.qq">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.connection.qq"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="微信号" prop="connection.wechat">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.connection.wechat"></el-input>
                    </el-col>
                </el-form-item>
                <br/>
                <div class="formHead"><span>其他信息</span></div>
                <el-form-item label="业务联系人" prop="connection.bContact">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.connection.bContact"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="业务联系人手机" prop="connection.bContactPhone">
                    <el-col :span="13">
                        <el-input v-model.number="ruleForm.connection.bContactPhone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="技术联系人" prop="connection.tContact">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.connection.tContact"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="技术联系人手机" prop="connection.tContactPhone">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.connection.tContactPhone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注" prop="connection.remark">
                    <el-col :span="13">
                        <el-input type="textarea" v-model="ruleForm.connection.remark"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm('ruleForm')" type="primary">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/javascript">
import api from '../../../api'
import industy_class from '../../../file/industy_class.json'
import Industy from '../../../file/industy.json';
import Region from '../../../file/region.json';

export default {
    data() {
        var checkmobile2 = (rule, value, callback) => {
            if (!value) {
                callback();
            } else if (!(/^1[234578]\d{9}$/.test(value))) {
                callback(new Error('请输入正确手机号'));
            } else {
                callback();
            }
        };
        var checkmobile = (rule, value, callback) => {
            value = +value;
//            console.log(value);
            if (Number.isNaN(value) || !(/^1[34578]\d{9}$/.test(value))) {
                callback(new Error('请输入正确手机号'));
            } else {
                callback();
            }

        };
            return {
            flag: true,
            upload: false,
                cardImgUrl:'',   //身份证照片
                cardId:'',   //身份证号
            dialogImageUrl: '',
            imageUrl: '',    //营业执照照片
            uploadHeaders: {},
            flagTip: '上传营业执照',
            industy_class: {},
            options: Region,
            industyClass: Industy,
            regionOptions: [110000, 110100],
            _csrf: '',
            _id: this.$route.params.id,
            isFreeze: true,
            dialogVisible: false,
            ruleForm: {
                connection: {
                        qq: '',
                        tContact: '',
                        tContactPhone: '',
                        email: '',
                        wechat: '',
                        bContact: '',
                        bContactPhone: '',
                        remark: '',
                        userType: '',
                        companyName: '',
                        companyBID: '' || this.cardId,
                        companyBLimg: '',
                        industryClass: '',
                        region: '',
                        contact: '',
                        contactPhone: '',
                },

                username: 'awdawd123123',
                password: '',
            },
            routerId: this.$route.params.id,
            rules: {
                username: [
                    { required: true, message: '请输入登录名', trigger: 'blur' },
                    { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
                ],
//                password: [
//                    { required: false, message: '请输入登录密码', trigger: 'blur' },
//                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
//                ],
                'connection.userType': [
                    { required: true },
                ],
                'connection.companyName': [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                ],
                'connection.companyBID': [
                    { required: true, message: '请输入营业执照注册号', trigger: 'blur' },
                ],
                'connection.companyBLimg': [
                    { message: '请上传贵公司的营业执照', trigger: 'blur' }
                ],
                'connection.industyClass': [
                    { required: true, message: '请选择行业', trigger: 'change' }
                ],
                'connection.region': [
                    { required:true}
                ],
                'connection.contact': [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                'connection.contactPhone': [
                    { required: true, validator: checkmobile, trigger: 'blur' }
                ],
                'connection.qq': [],
                'connection.tContact': [],
                'connection.tContactPhone': [
                    { validator: checkmobile2, trigger: 'blur' }
                ],
                'connection.email': [
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                'connection.wechat': [],
                'connection.bContact': [],
                'connection.bContactPhone': [
                    { validator: checkmobile2, trigger: 'blur' }
                ],
                'connection.skillmobile': [],
                'connection.remark': [],
            }
        };
    },
    mounted() {
            api.getCustomerById(this.$route.params.id)
                .then(data=>{
//                    console.log(data.data.doc)
                    this.ruleForm = data.data.doc;
                    if(this.ruleForm.connection.userType == 2){
                        this.cardImgUrl = 'data:image/jpg;base64,' + this.ruleForm.connection.companyBLimg;
                        this.cardId = this.ruleForm.connection.companyBID;
//                        this.ruleForm.connection.companyBID = '';
                        this.ruleForm.connection.companyName = '';
                        this.ruleForm.connection.companyBLimg = '';
                    }
                    if(this.ruleForm.connection.userType == 1){
                        this.ruleForm.connection.companyBLimg = 'data:image/jpg;base64,' + this.ruleForm.connection.companyBLimg;
                    }
                    console.log(this.ruleForm,"this.ruleForm");
                    //this.ruleForm.connection.companyBLimg = 'data:image/jpg;base64,' + this.ruleForm.connection.companyBLimg;
                    this.ruleForm.password = ''
                    //console.log(Region);
                    var arr = []
                    var num ;
                    //区域
                    Region.forEach((item,index)=>{
                        item.children.forEach((i,id)=>{
                            if(i.value == this.ruleForm.connection.region){
                                arr.push(item.value);
                                arr.push(i.value)
                            }
                        })
                    });
                    this.ruleForm.connection.region = arr
                    //console.log(arr)
//                    this.ruleForm.isFreeze
                    //获取区域

                    //冻结解冻
                    if(this.ruleForm.isFreeze){
                        this.isFreeze = true
                    }else{
                        this.isFreeze = false
                    }
                    this._id = data.data.doc.userId
                    //console.log(this.ruleForm.connection.industryClass)

                    //行业
                    this.industyClass.forEach((item,index)=>{
                        //console.log(item)
                        item.children.forEach((i,num)=>{
                            if(i.value == this.ruleForm.connection.industryClass){
                                this.ruleForm.connection.industryClass = i.value
//                                this.ruleForm.connection.industryfull = i.name
                            }
                        })
                    })
//                    this.ruleForm.connection.item.industryClass = data.data.doc.connection.industryClass
//                    console.log(this.ruleForm.connection.item.industryClass)
                })

//        api.getCsrf().then(({ data: { status, _csrf } }) => {
//            this.ruleForm._csrf = _csrf;
//            this._csrf = _csrf;
//            this.uploadHeaders = {
//                'X-CSRF-TOKEN': _csrf
//            };
//        }).catch((err) => {
//            console.log(err);
//        });
//        api.getCustomerById(this.routerId)
//            .then(data => {
//                let newData = data.data.doc;
//                this.isFreeze = newData.isFreeze;
//
//                this._id = newData._id;
//                this.imageUrl = 'data:image/jpg;base64,' + newData.connection.item.companyBLimg;
//                this.ruleForm.username = newData.username;
//                this.ruleForm.connection.item = newData.connection.item;
//
//                this.ruleForm.connection.item.personBID="";
//                if (2==this.ruleForm.connection.item.userType){
//                    this.ruleForm.connection.item.personBID=this.ruleForm.connection.item.companyBID;
//                    this.ruleForm.connection.item.companyBID="";
//                }
//
//                let region = this.ruleForm.connection.item.region;
//                region = +((region + '').substr(0, 2) + '0000');
//                this.regionOptions = [region, this.ruleForm.connection.item.region];
//                this.ruleForm.connection.item.industyClass += '';
//                this.ruleForm.connection.item.userType += '';
//
//                if (+newData.connection.item.userType === 1) {
//                    this.flag = true;
//                }
//            })
//            .catch(error => {
//                console.log(error)
//            });
    },
    computed:{
        a: function () {
            if(this.flag==false){
//                console.log(11111);
//                console.log(this.$refs.company)

            }
        }
    },
    methods: {
        open(){
            console.log(this.ruleForm.connection.industryClass)
        },
        change(id) {
//            let typeUser = this.ruleForm.connection.item.userType;
            if (id == 1) {
                this.flag = true;
                this.flagTip = '上传营业执照'
//                console.log(this.$refs.person.value);
            } else {
                this.flag = false;
                this.flagTip = '上传身份证'
            }
        },
        deleteCustomer() {
            this.$confirm('您确定要删除这个客户吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               //确定
                this.$store.dispatch('DeleteCustomer', {
                    cid: this._id
                }).then((res) => {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push('/customer');
                }).catch((error) => {
                    if (error.response) {
                        console.log(11, error.response.data);
                        console.log(22, error.response.status);
                        console.log(33, error.response.headers);
                    }
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: error
                    });
                });
            }).catch(() => {
                alert("dawdw")
//                this.$message({
//                    type: 'info',
//                    message: '已取消删除'
//                });
            });
        },
        freezeCustomer() {
            this.$confirm('您确定要冻结这个客户吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('FreezeCustomer', {
                    cid: this._id
//                    _csrf: this._csrf
                }).then((res) => {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '冻结成功!'
                    });
                    this.$router.push('/customer');
                    this.isFreeze = !this.isFreeze
                }).catch((error) => {
                    if (error.response) {
                        console.log(11, error.response.data);
                        console.log(22, error.response.status);
                        console.log(33, error.response.headers);
                    }
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: error
                    });
                });
            }).catch(() => {
//                this.$message({
//                    type: 'info',
//                    message: '已取消冻结'
//                });
            });

        },
        //解冻
        deFreezeCustomer() {
            this.$confirm('您确定要解冻这个客户吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('DeFreezeCustomer', {
                    cid: this._id
//                    _csrf: this._csrf
                }).then((res) => {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '解冻成功!'
                    });
                    this.isFreeze = !this.isFreeze
                    this.$router.push('/customer');
                }).catch((error) => {
                    if (error.response) {
                        console.log(11, error.response.data);
                        console.log(22, error.response.status);
                        console.log(33, error.response.headers);
                    }
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: error
                    });
                });
            }).catch(() => {
//                this.$message({
//                    type: 'info',
//                    message: '已取消解冻'
//                });
            });
        },

        submitForm(formName) {
           // console.log(this.ruleForm.connection);
            this.$refs[formName].validate((valid) => {
                //                必填项验证
//              if (this.flagTip == '上传营业执照') {
//                  if (!this.ruleForm.connection.companyName) {
//                      this.$message({
//                          type: 'error',
//                          message: '请输入公司名称'
//                      });
//                      return false;
//                  }
//                  if (!this.ruleForm.connection.companyBID) {
//                      this.$message({
//                          type: 'error',
//                          message: '请输入公司营业执照'
//                      });
//                      return false;
//                  }
//              }
//                身份证验证
                if(this.flagTip == '上传身份证'){
                    var code = this.cardId.toUpperCase();
                    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
                        this.$message({
                            type: 'error',
                            message: '请输入正确身份证号'
                        });
                        return false;
                    } else {
                        //18位身份证需要验证最后一位校验位
                        if (code.length == 18) {
                            code = code.split('');
                            //∑(ai×Wi)(mod 11)
                            //加权因子
                            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                            //校验位
                            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                            var sum = 0;
                            var ai = 0;
                            var wi = 0;
                            for (var i = 0; i < 17; i++) {
                                ai = code[i];
                                wi = factor[i];
                                sum += ai * wi;
                            }
                            var last = parity[sum % 11];
                            if (parity[sum % 11] != code[17]) {
                                this.$message({
                                    type: 'error',
                                    message: '请输入正确身份证号'
                                });
                                return false;
                            }
                            //this.ruleForm.connection.personBID = code.join('');
                        } else {
                            this.$message({
                                type: 'error',
                                message: '请输入正确身份证号'
                            });
                        }
                    }
                }

                if (valid) {
//                   let image = this.ruleForm.connection.companyBLimg || '';
//                    if (!this.upload) {
//                        image = '';
//                    }

                    if (Array.isArray(this.ruleForm.connection.region)) {
                        this.ruleForm.connection.region = this.ruleForm.connection.region.pop();
                    }
//                    let companyBID=this.ruleForm.connection.companyBID;
//                    if (2==this.ruleForm.connection.userType){
//                        companyBID=this.ruleForm.connection.personBID.toUpperCase();
//
//                    }
                    let data = {
                        _id:this._id,
                        userType: this.ruleForm.connection.userType,
                        password: this.ruleForm.password,
                        contact: this.ruleForm.connection.contact,
                        contactPhone: this.ruleForm.connection.contactPhone,
                        email: this.ruleForm.connection.email,
                        qq: this.ruleForm.connection.qq,
                        wechat: this.ruleForm.connection.wechat,
                        bContact: this.ruleForm.connection.bContact,
                        bContactPhone: this.ruleForm.connection.bContactPhone,//业务联系人手机
                        industryClass: this.ruleForm.connection.industryClass,   //none
                        tContact: this.ruleForm.connection.tContact,
                        tContactPhone: this.ruleForm.connection.tContactPhone,
                        remark: this.ruleForm.connection.remark,
                        region: this.ruleForm.connection.region,
                        companyName: this.ruleForm.connection.companyName,
                        companyBID: this.ruleForm.connection.companyBID,
                        companyBLimg: this.imageUrl
                    }
                    if(this.ruleForm.connection.userType == 2){
                        data.companyBID = this.cardId
                    }

                    this.$store.dispatch('editDepartmentCustomer', data).then(res => {
                        console.log(res)
                        this.$message({
                            type: 'info',
                            message: '编辑成功',
                        });
                        this.$router.push('/customer');
                    }).catch(error => {
                        this.$message({
                            type: 'error',
                            message: error.data.err
                        });
                    });
                }else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //              上传文件
        handleAvatarSuccess(res, file) {
        		console.log(file,"file")
            //this.imageUrl = URL.createObjectURL(file.raw);
            if(this.ruleForm.connection.userType == 1){
                this.ruleForm.connection.companyBLimg = URL.createObjectURL(file.raw)
            }
            if(this.ruleForm.connection.userType == 2){
                this.cardImgUrl = URL.createObjectURL(file.raw);
            }
            this.imageUrl = res.path;
            console.log( this.ruleForm.connection.companyBLimg," this.ruleForm.connection.companyBLimg")
            this.upload = true;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(file) {
            const isPIC = file.type === 'image/jpeg' || 'image/jpg' || 'image/png' || 'image/gif';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPIC) {
                this.$message.error('请上传图片格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isPIC && isLt2M;
        },
    },

}
</script>

<style scoped>
.star {
    color: red;
}

.el-row {
    margin-bottom: 20px;
}


.compHead{ height: 90px;width: 100%;background-color: #fff;}
.compHead p{ color:#999;font-size: 24px; height: 60px;line-height: 60px;}
.compHead>div:first-child{ display: inline-block;float: left;margin-left:33px;}
.retBtn{ clear:both;position: absolute;right:40px;top:28px;}
.el-form-item__label{ color:rgb(116,119,121)}
.formHead{height: 50px;line-height: 50px;text-indent: 23px;border-bottom: 1px solid rgb(231,234,236);margin-bottom: 15.5px;}
.formHead span{ color:rgb(103,106,108);font-size: 14px; }
.twoBtn{ padding-right: 20px; float: right;}
.context{box-sizing: border-box; background: rgb(255,255,255); margin: 20px; padding-bottom: 20px; border-top: 4px solid rgb( 230,235,237);}



/*上传文件*/

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
}
.avatar {
    width: 100%;
    display: block;
}
.red {
    color: rgb(255, 84, 102);
    font-size: 13px;
}
</style>
