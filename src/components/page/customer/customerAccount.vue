<template>
    <div id="clientsAccount">
        <div class="compHead">
            <div>
                <p>客户账号管理</p>
                <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item> 客户管理 </el-breadcrumb-item>
                        <el-breadcrumb-item> 客户账号管理 </el-breadcrumb-item>
                        <el-breadcrumb-item> 添加 </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div @click="this.history.go(-1)" class="retBtn">返回</div>
        </div>
        <div class="context">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="257px" class="demo-ruleForm">
                <p><span>基本信息</span></p>
                <el-form-item label="登录名" prop="username">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.username" placeholder="8~20位字符，区分大小写"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="登录密码" prop="password">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.password" placeholder="8~16位字符，区分大小写"></el-input>
                    </el-col>
                </el-form-item>
                <br/>
                <el-form-item label="客户类型" prop="userType">
                    <el-radio-group v-model="ruleForm.userType" @change="change()">
                        <el-radio label="1" checked>企业</el-radio>
                        <el-radio label="2">个人</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="公司名称" prop="companyName" v-if="flag==true">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.companyName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="营业执照注册号" prop="companyBID" v-if="flag==true">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.companyBID"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号" prop="companyBID" v-if="flag==false">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.companyBID" @blur="IdentityCodeValid(ruleForm.companyBID)"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item v-bind:label="flagTip" prop="companyBLimg">
                    <el-col :span="12">
                        <el-upload class="avatar-uploader" action="/api/upload" :show-file-list="false" :with-credentials="true" :headers="uploadHeaders" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="el-upload__tip" slot="tip">只能上传 jpeg/jpg/png/gif 文件，且不超过10MB</div>
                        </el-upload>
                    </el-col>
                </el-form-item>

                <el-form-item label="所属行业" prop="industryClass">
                    <el-select v-model="ruleForm.industryClass" placeholder="请选择">
                        <el-option-group v-for="group in industryClass" :key="group.name" :label="group.name">
                            <el-option v-for="item in group.children" :key="item.name" :label="item.name" :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>

                <el-form-item label="所在区域" prop="region">
                    <el-cascader :options="options" v-model="ruleForm.region" @change="open"></el-cascader>
                </el-form-item>

                <el-form-item label="联系人" prop="contact">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.contact"></el-input>
                    </el-col>
                </el-form-item>
                <!--自定义手机和座机的验证-->
                <el-form-item label="联系人手机" prop="contactPhone">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.contactPhone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.qq"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="微信号" prop="wechat">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.wechat"></el-input>
                    </el-col>
                </el-form-item>
                <br/>
                <p><span>其他信息</span></p>
                <el-form-item label="业务联系人" prop="bContact">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.bContact"></el-input>
                    </el-col>
                </el-form-item>
                <!--自定义手机和座机的验证-->
                <el-form-item label="业务联系人手机" prop="bContactPhone">
                    <el-col :span="13">
                        <el-input v-model.number="ruleForm.bContactPhone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="技术联系人" prop="tContact">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.tContact"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="技术联系人手机" prop="tContactPhone">
                    <el-col :span="13">
                        <el-input v-model="ruleForm.tContactPhone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-col :span="13">
                        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/javascript">
import api from '../../../api'
import Industy from '../../../file/industy.json';
import Region from '../../../file/region.json';
import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
export default {
    components: {ElButton},
    data() {
        var checkmobile = (rule, value, callback) => {

            if (!(/^1[234578]\d{9}$/.test(value))) {
                callback(new Error('请输入正确手机号'));
            } else {
                callback();
            }
        };

        var checkmobile2 = (rule, value, callback) => {
            if (!value) {
                callback();
            } else if (!(/^1[234578]\d{9}$/.test(value))) {
                callback(new Error('请输入正确手机号'));
            } else {
                callback();
            }
        };

        var checkregion = (rule, value, callback) => {
            console.log(value.length)
            if (value.length < 1) {
                callback(new Error('请选择地区'));
            } else {
                callback();
            }
        };

        return {
            dialogImageUrl: '',
            uploadHeaders: {},
            industy_class: {},
            flag: true,
            flagTip: '上传营业执照',
            options: Region,
            companyBLimg: '',
            industryClass: Industy,
            regionOptions: [110000, 110100],
            imageUrl: '',
            dialogVisible: false,
            _csrf: '',
            ruleForm: {
                qq: '',
                tContact: '',
                tContactPhone: '',
                email: '',
                wechat: '',
                bContact: '',
                bContactPhone: '',
                remark: '',
                userType: '1',
                companyName: '',
                companyBID: '',
                companyBLimg: 'kkk',
                industryClass: '',
                region: [],
                contact: '',
                contactPhone: '',
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入登录名', trigger: 'blur' },
                    { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                userType: [
                    { required: true, message: '请选择客户类型', trigger: 'change' },
                ],
                companyName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                ],
                companyBID: [
                    { required: true, message: '请按要求输入正确格式', trigger: 'blur' }
                ],
                companyBLimg: [
                    { required: true, message: '请上传贵公司的营业执照', trigger: 'blur' }
                ],
                industryClass: [
                    { required: true, message: '请选择行业', trigger: 'change' }
                ],
                region: [
                    { required: true, validator: checkregion, trigger: 'change' }
                ],
                contact: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                contactPhone: [
                    { required: true, validator: checkmobile, trigger: 'blur' }
                ],
                qq: [],
                tContact: [],
                tContactPhone: [
                    { validator: checkmobile2, trigger: 'blur' }
                ],
                email: [
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                wechat: [],
                bContact: [],
                bContactPhone: [
                    { validator: checkmobile2, trigger: 'blur' }
                ],
                skillmobile: [],
                remark: [],

            },
        };
    },
    mounted() {
//        api.getCsrf().then(({ data: { status, _csrf } }) => {
//            console.log(status, _csrf);
//            this.ruleForm._csrf = _csrf;
//            this._csrf = _csrf;
//            this.uploadHeaders = {
//                'X-CSRF-TOKEN': _csrf
//            };
//        }).catch((err) => {
//            console.log(err);
//        });
    },

    methods: {
        open(){
            //console.log(this.ruleForm.region)
        },
        IdentityCodeValid(code) {
            var city = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外 "
            };
            //    var tip = "";
            //    var pass = true;
            code = code.toUpperCase();
            if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
                //        tip = "身份证号格式错误";
                //        pass = false;
                this.$message({
                    type: 'error',
                    message: '请输入正确身份证号'
                });
                return false;
            } else if (!city[code.substr(0, 2)]) {
                tip = "地址编码错误";
                pass = false;
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
                        //                tip = "校验位错误";
                        //                pass = false;
                        this.$message({
                            type: 'error',
                            message: '请输入正确身份证号'
                        });
                        return false;
                    }

                    this.ruleForm.companyBID = code.join('');
                } else {
                    this.$message({
                        type: 'error',
                        message: '请输入正确身份证号'
                    });
                }
            }

            //    return pass;
        },
        change() {
            this.flag = !this.flag;
            if (this.flag) {
                this.flagTip = '上传营业执照'
            } else {
                this.flagTip = '上传身份证'
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                //            身份证号码验证
                if (this.flagTip == '上传身份证') {
                    var code = this.ruleForm.companyBID;
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
                        }
                    }
                }

                if (valid) {
                    this.$store.dispatch('addDepartmentCustomer', {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password,
                        userType: this.ruleForm.userType,
                        contact: this.ruleForm.contact,
                        contactPhone: this.ruleForm.contactPhone,
                        email: this.ruleForm.email,
                        qq: this.ruleForm.qq,
                        wechat: this.ruleForm.wechat,
                        bContact: this.ruleForm.bContact,
                        bContactPhone: this.ruleForm.bContactPhone,//业务联系人手机
                        industryClass: this.ruleForm.industryClass,
                        tContact: this.ruleForm.tContact,
                        tContactPhone: this.ruleForm.tContactPhone,
                        remark: this.ruleForm.remark,
                        region: this.ruleForm.region.pop(),
                        companyName: this.ruleForm.companyName,
                        companyBID: this.ruleForm.companyBID,
                        companyBLimg: this.ruleForm.companyBLimg
                    }).then(res => {
                        console.log(res)
                        this.$message({
                            type: 'info',
                            message: '添加成功',
                        });
                        this.$router.push('/customer');
                    }).catch(error => {
                        if (error.response) {
                            console.log(11, error.response.data);
                            console.log(22, error.response.status);
                            console.log(33, error.response.headers);
                        }
//                        this.$message({
//                            type: 'error',
//                            message: error.data.err
//                        });
                        this.$message({
                            type: 'error',
//                            message: error.data.err
                            message: '登录名已存在'
                        });
                    });
                } else {
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
            this.imageUrl = URL.createObjectURL(file.raw);
            this.ruleForm.companyBLimg = res.path;
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
            return isLt2M && isPIC;
        }
    }
}
</script>

<style scoped>
.compHead{ height: 90px;width: 100%;background: #fff;}
.compHead p{ color:#999;font-size: 24px; height: 60px;line-height: 60px;}
.compHead>div:first-child{ display: inline-block;float: left;margin-left: 33px; }
.retBtn{ clear:both;width: 70px;height: 34px;line-height: 34px;background: rgb(0,180,148);color:#fff;border-radius: 2px;text-align: center;position: absolute;right:40px;top:28px;}
form p{height: 50px;line-height: 50px;text-indent: 23px;border-bottom: 1px solid rgb(231,234,236);margin-bottom: 15.5px;}
form p span{ color:rgb(103,106,108);font-size: 14px; }
.saveBtn{ width: 70px;height: 34px;line-height: 34px;background: rgb(0,180,148);color:#fff;border-radius: 2px;text-align: center; }
.context{box-sizing: border-box; background: rgb(255,255,255); margin: 20px; padding-bottom: 20px; border-top: 4px solid rgb( 230,235,237)}


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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 100%;
    display: block;
}
.star { color: red;}
</style>
