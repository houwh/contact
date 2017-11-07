<style lang="less">
@import './form-add.less';
</style>
<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <Form-item label="登录名" prop="username">
            <p>{{ formValidate.username }}</p>
        </Form-item>
        <Form-item label="登录密码" prop="password">
            <Input v-model="formValidate.password" placeholder="8~16位字符，区分大小写" style="width:40%"></Input>
            <p class="alertFlot">密码不设置，默认不修改</p>
        </Form-item>
        <div class="system">
            <Icon type="ios-film-outline"></Icon>
            基本信息
        </div>
        <Form-item label="客户类型" prop="connection.userType">
            <span class="changeRedd">*</span>
            <Radio-group v-model="formValidate.connection.userType" @on-change="typeChange">
                <Radio label=1 :value=1>企业</Radio>
                <Radio label=2 :value=2>个人</Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="公司名称" prop="connection.companyName" v-if="formValidate.connection.userType==1">
            <Input v-model="formValidate.connection.companyName" style="width:40%"></Input>
        </Form-item>
        <Form-item label="营业执照注册号" prop="connection.companyBID" v-if="formValidate.connection.userType==1">
            <Input v-model="formValidate.connection.companyBID" style="width:40%"></Input>
        </Form-item>
        <Form-item label="身份证号" prop="connection.companyBID" v-if="formValidate.connection.userType==2">
            <Input v-model="formValidate.connection.companyBID" style="width:40%"></Input>
        </Form-item>
        <!--iview-->
        <Form-item :label=flagTip prop="companyBLimg">
            <span class="changeRed">*</span>
            <div class="demo-upload-list" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover" v-if="this.userRoleType!=5">
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload ref="upload" :show-upload-list="false" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :on-success="handleSuccess" multiple type="drag" action="/api/upload" style="display: inline-block;width:300px;" v-show="cameraFlag">
                <div style="width: 300px;height:150px;line-height: 150px;">
                    <span id="comPer">营业执照副本</span>
                </div>
            </Upload>
            <div>
                <span class="picTip">仅能上传一张，上传的电子照片支持jpg、jpeg、gif、png、bmp格式的图片。</span>
            </div>
        </Form-item>
        <Form-item label="所属行业" prop="connection.industryFull">
            <Select v-model="formValidate.connection.industryFull" placeholder="请选择所属行业" style='width:40%'>
                <Option-group v-for="(item,i) in industyData" :label="item.name" :key="i">
                    <Option v-for="(item2,index) in item.children" :key="index" :value='item2.name' :label="item2.name">{{ item2.name }}</Option>
                </Option-group>
            </Select>
        </Form-item>
        <span class="changeCol">*</span>
        <Form-item label="所在区域" prop="connection.regionFull">
            <Cascader :data="regionData" v-model="formValidate.connection.regionFull" :render-format="format"></Cascader>
        </Form-item>
        <Form-item label="联系人" prop="connection.contact">
            <Input v-model="formValidate.connection.contact" style="width:40%"></Input>
        </Form-item>
        <Form-item label="联系人手机" prop="connection.contactPhone">
            <Input v-model="formValidate.connection.contactPhone" style="width:40%"></Input>
        </Form-item>
        <Form-item label="邮箱" prop="connection.email">
            <Input v-model="formValidate.connection.email" style="width:40%"></Input>
        </Form-item>
        <Form-item label="QQ" prop="connection.qq">
            <Input v-model="formValidate.connection.qq" style="width:40%"></Input>
        </Form-item>
        <Form-item label="微信号" prop="connectionwechat">
            <Input v-model="formValidate.connection.wechat" style="width:40%"></Input>
        </Form-item>
        <div class="system">
            <Icon type="ios-film-outline"></Icon>
            其他信息
        </div>
        <Form-item label="业务联系人" prop="connection.bContact">
            <Input v-model="formValidate.connection.bContact" style="width:40%"></Input>
        </Form-item>
        <Form-item label="业务联系人手机" prop="connection.bContactPhone">
            <Input v-model="formValidate.connection.bContactPhone" style="width:40%"></Input>
        </Form-item>
        <Form-item label="技术联系人" prop="connection.tContact">
            <Input v-model="formValidate.connection.tContact" style="width:40%"></Input>
        </Form-item>
        <Form-item label="技术联系人手机" prop="connection.tContactPhone">
            <Input v-model="formValidate.connection.tContactPhone" style="width:40%"></Input>
        </Form-item>
        <Form-item label="备注" prop="connection.remark">
            <Input v-model="formValidate.connection.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..." style="width:40%"></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')" v-if="this.userRoleType!=5">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px" v-if="this.userRoleType!=5">重置</Button>
        </Form-item>
    </Form>
</template>
<script>
import {
    submitButton
} from './tableButton.js'
import {
    industry,
    region
} from '../libs/common.js'
import util from '../libs/util.js'
export default {
    name: 'formAdd',
    props: {
        type: String, // customer是客户,agent是代理商
        formValidate2: Object, // 
    },
    components: {

    },
    data() {
        const validateBID = (rule, value, callback) => {
            if (this.flagTip == '请上传身份证') {
                if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
                    callback(new Error('请输入正确信息'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const validatePhone = (rule, value, callback) => {
            if (value) {
                if (!(/^1[234578]\d{9}$/.test(value))) {
                    callback(new Error('请输入正确手机号'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const validateRegion = (rule, value, callback) => {
            if (!value || value.length < 1) {
                callback(new Error('请选择地区'));
            } else {
                callback();
            }
        };
        const discountBlur = (rule, value, callback) => {
            let bigValue = (+value) * 10;
            let discount = Math.round(bigValue);
            if (!(discount >= 1 && discount <= 100)) {
                console.log(discount, 'discount');
                callback(new Error('请输入0.1~10.0之间的数值'));
            } else if (bigValue % 1 != 0) {
                callback(new Error('请输入正确格式'));
            } else {
                callback();
            }
        };
        return {
            message: '',
            username: '',
            fileList: [],
            userRoleType: '', //是否是智牛下的客户
            uploadList: [],
            regionData: [],
            industyData: [],
            flagTip: '上传营业执照',
            cameraFlag: true,
            flag: true,
            agentData: [{
                label: "省代理",
                value: 1
            }, {
                label: "市代理",
                value: 2
            }, {
                label: "行业代理",
                value: 3
            }, {
                label: 'OEM代理',
                value: 4
            }],
            formValidate: {
                username: '',
                password: '',
                connection: {
                    agentProvince: '',
                    agentOff: '',
                    agentType: '',
                    region: [],
                    userType: 1,
                    companyName: '',
                    companyBID: '',
                    companyBLimg: '',
                    industryClass: '',
                    contact: '',
                    contactPhone: '',
                    qq: '',
                    wechat: '',
                    email: '',
                    bContact: '',
                    tContact: '',
                    bContactPhone: '',
                    tContactPhone: '',
                    remark: '',
                }
            },
            ruleValidate: {
                'connection.agentOff': [{
                    required: true,
                    message: '代理折扣不能为空',
                    trigger: 'blur'
                }, {
                    validator: discountBlur,
                    trigger: 'blur'
                }],

                'connection.agentProvince': [{
                    required: true,
                    message: '代理省份不能为空',
                    trigger: 'blur'
                }],
                username: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }, {
                    min: 8,
                    max: 20,
                    message: '请输入8~20位字符',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }, {
                    min: 8,
                    max: 16,
                    message: '请输入8~16位字符',
                    trigger: 'blur'
                }],
                'connection.userType': [
                    // { required: true, message: '请选择客户类型', trigger: 'change' }
                ],
                'connection.companyName': [{
                    required: true,
                    message: '必填项，不能为空',
                    trigger: 'blur'
                }],
                'connection.companyBID': [{
                    required: true,
                    message: '必填项，不能为空',
                    trigger: 'blur'
                }, {
                    validator: validateBID,
                    trigger: 'blur'
                }],
                'connection.companyBLimg': [

                ],
                'connection.region': [],
                'connection.industryClass': [{
                    required: true,
                    message: '请选择所属行业',
                    trigger: 'change'
                }],
                'connection.contact': [{
                    required: true,
                    message: '联系人不能为空',
                    trigger: 'blur'
                }],
                'connection.contactPhone': [{
                    required: true,
                    message: '联系人手机不能为空',
                    trigger: 'blur'
                }, {
                    len: 11,
                    message: '请输入正确手机号',
                    trigger: 'blur'
                }, {
                    validator: validatePhone,
                    trigger: 'blur'
                }],
                'connection.bContactPhone': [{
                    message: '联系人手机格式不正确',
                    trigger: 'blur'
                }, {
                    validator: validatePhone,
                    trigger: 'blur'
                }],
                'connection.tContactPhone': [{
                    message: '联系人手机格式不正确',
                    trigger: 'blur'
                }, {
                    validator: validatePhone,
                    trigger: 'blur'
                }],
                'connection.email': [{
                    type: 'email',
                    message: '邮箱格式不正确',
                    trigger: 'blur'
                }, ],
            },
        };
    },
    mounted() {
        this.regionData = region;
        this.industyData = industry;
        // this.uploadList = this.$refs.upload.fileList;  //上传图片
    },
    created() {

    },
    watch: {
        formValidate2(newData) {
            if (newData) {
                this.formValidate = newData;
                this.formatter()
            }
        }
    },
    computed: {
        // formValidate2(){
        //     return
        // }
    },
    methods: {
        formatter() {
            console.log(this.formValidate, 'tttttttttttt')
            console.log(this.formValidate.isFreeze)
            if (this.formValidate.isFreeze == false) {
                this.message = '冻结'
            } else {
                this.message = '解冻'
            }
            this.regionData.forEach((item, index) => {
                item.children.forEach((item2, index2) => {
                    if (item2.value == this.formValidate.connection.region) {
                        let regionFull = [];
                        regionFull.push(item.value, item2.value);
                        this.formValidate.connection.regionFull = regionFull;
                    }
                })
            })
            this.industyData.forEach((item, index) => {
                    item.children.forEach((item2, index2) => {
                        if (item2.value == this.formValidate.connection.industryClass) {
                            this.formValidate.connection.industryFull = item2.name;
                        }
                    })
                })
                // 显示图片
            console.log(this.uploadList[0], 'obj')
            let obj = {};
            obj.url = '';
            obj.status = 'finished';
            this.cameraFlag = false;
            this.uploadList.push(obj);
            this.uploadList[0].url = 'https://test.api.v2.wowoniu.com/' + this.formValidate.connection.companyBLimg;
            // https://test.api.v2.wowoniu.com/static_files/upload_47c3f15e9410b593e20a0becafd3da3d.png
        },
        regionType() {

        },
        // ----------------------agent-------------
        agentTypeChange() {
            console.log(this.formValidate.agentType);
        },
        // -----------------------------------------
        // 二级联动
        format(labels, selectedData) {
            const index = labels.length - 1;
            const data = selectedData[index] || false;
            const realValue = data.__label;
            console.log(data)
            this.realValue = realValue;
            if (data) {
                return realValue;
            }
        },
        typeChange() {
            this.flag = !this.flag;
            if (this.flag) {
                this.flagTip = '上传营业执照';
                document.getElementById('comPer').innerHTML = '营业执照副本'
                this.formValidate.companyName = '';
                this.formValidate.companyBID = ''
            } else {
                this.flagTip = '请上传身份证';
                document.getElementById('comPer').innerHTML = '身份证',
                    this.formValidate.companyName = '';
                this.formValidate.companyBID = ''
            }
        },
        // iview的上传图片 
        handleBeforeUpload(file) {
            // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
            // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
            // 读取文件作为 URL 可访问地址
            let reader = new FileReader();
            reader.readAsDataURL(file)

            const _this = this
            reader.onloadend = function(e) {
                file.url = reader.result
                console.log(_this.uploadList, 'uploadList')
                _this.uploadList[0].url = reader.result;

            }
        },
        handleSuccess(res) {
            this.cameraFlag = false;
            this.formValidate.companyBLimg = res.path;
        },
        handleFormatError(file) {
            this.$Message.error('请上传jpg、jpeg、gif、png或bmp格式的图片!');
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleRemove(file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.cameraFlag = true;
        },
        handleSubmit(name) {
            console.log(this.formValidate.region, '区域')
            this.$refs[name].validate((valid) => {
                // 公共的
                if (!this.formValidate.companyBLimg) {
                    this.$Message.error('请上传图片!');
                    return;
                }
                if (this.type == 'agent' && this.formValidate.agentType == 2 || this.type == 'customer') {
                    // 修改的
                    let myRegion = this.formValidate.region;
                    myRegion.shift();
                    var hisRegion = myRegion.toString();
                    console.log(hisRegion);
                }
                if (valid) {

                    let AddData = {
                        agentType: this.formValidate.agentType,
                        agentOff: this.formValidate.agentOff,
                        username: this.formValidate.username,

                        password: this.formValidate.password,
                        userType: this.formValidate.connection.userType,
                        companyName: this.formValidate.connection.companyName,
                        companyBID: this.formValidate.connection.companyBID,
                        companyBLimg: this.formValidate.connection.companyBLimg,
                        industryClass: this.formValidate.connection.industryFull,
                        region: hisRegion,
                        contact: this.formValidate.connection.contact,
                        contactPhone: this.formValidate.connection.contactPhone,
                        qq: this.formValidate.connection.qq,
                        wechat: this.formValidate.connection.wechat,
                        email: this.formValidate.connection.email,
                        bContact: this.formValidate.connection.bContact,
                        tContact: this.formValidate.connection.tContact,
                        bContactPhone: this.formValidate.connection.bContact,
                        tContactPhone: this.formValidate.connection.tContactPhone,
                        remark: this.formValidate.connection.remark,
                        id: this.id
                    }
                    console.log(AddData);

                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
    }
};
</script>
