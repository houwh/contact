<style lang="less">
@import './form-add.less';
</style>
<template>
    <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
            <div class="system">登录信息</div>
            <Form-item label="登录名" prop="username">
                <Input v-model="formValidate.username" placeholder="8~20位字符，区分大小写" style="width:40%"></Input>
            </Form-item>
            <Form-item label="登录密码" prop="password">
                <Input v-model="formValidate.password" placeholder="8~16位字符，区分大小写" style="width:40%"></Input>
            </Form-item>
            <!-- customer不显示，agent显示 -->
            <div v-if="type=='agent'">
                <div class="system">代理信息</div>
                <!-- <span class="changeCol">*</span> -->
                <Form-item label="代理类型" prop="agentType">
                    <Select v-model="formValidate.agentType" @on-change="agentTypeChange" style="width:40%">
                        <Option v-for="(item,i) in agentData" :value="item.value" :key="i">{{item.label}}</Option>
                        <!-- <Option ></Option> -->
                    </Select>
                </Form-item>
                <span class="changeCol" v-if="formValidate.agentType == 1">*</span>
                <Form-item label="代理省份" prop="region" v-if="formValidate.agentType == 1 ">
                    <Select v-model="formValidate.region" style="width:40%">
                        <Option v-for="(item,i) in regionData" :value="item.value" :key="i" :label="item.label"></Option>
                    </Select>
                </Form-item>
                <!-- <span class="changeCol2" v-if="formValidate.agentType == 2">*</span> -->
                <Form-item label="市代理" prop="region" v-if="formValidate.agentType==2 ">
                    <Cascader :data="regionData" v-model="formValidate.region" :render-format="format"></Cascader>
                </Form-item>
                <Form-item label="所属行业" prop="industryClass" v-if="formValidate.agentType == 3 ">
                    <Select v-model="formValidate.industryClass" placeholder="请选择所属行业" style="width:40%">
                        <Option-group v-for="(item,i) in industyData" :label="item.name" :key="i">
                            <Option v-for="(item2,index) in item.children" :value='item2.value' :key="index" :label="item2.name">{{ item2.name }}</Option>
                        </Option-group>
                    </Select>
                </Form-item>
                <Form-item label="代理折扣" prop="agentOff">
                    <Input v-model="formValidate.agentOff" placeholder="输入范围0.1-10.0" style="width:40%"></Input>
                </Form-item>
            </div>
            <!-- customer不显示，agent显示 -->
            <div class="system">
                <Icon type="ios-film-outline"></Icon>
                基本信息
            </div>
            <Form-item label="客户类型" prop="userType">
                <span class="changeRed2">*</span>
                <Radio-group v-model="formValidate.userType" @on-change="typeChange">
                    <Radio label=1 :value=1>企业</Radio>
                    <Radio label=2 :value=1>个人</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="公司名称" prop="companyName" v-if="flag">
                <Input v-model="formValidate.companyName" style="width:40%"></Input>
            </Form-item>
            <Form-item label="营业执照注册号" prop="companyBID" v-if="flag">
                <Input v-model="formValidate.companyBID" style="width:40%"></Input>
            </Form-item>
            <Form-item label="个人身份证号" prop="companyBID" v-if="!flag">
                <Input v-model="formValidate.companyBID" style="width:40%"></Input>
            </Form-item>
            <!--iview-->
            <Form-item :label=flagTip prop="companyBLimg">
                <span class="changeRed">*</span>
                <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload ref="upload" :show-upload-list="false" :format="['jpg','jpeg','png','gif','bmp']" accept="['jpg','jpeg','png','gif','bmp']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :multiple=true type="drag" action="/api/upload" style="display: inline-block;width:300px;" v-show="cameraFlag">
                    <div style="width: 300px;height:150px;line-height: 150px;">
                        <span id="comPer">营业执照副本</span>
                    </div>
                </Upload>
                <div>
                    <span class="picTip">仅能上传一张，上传的电子照片支持jpg、jpeg、gif、png、bmp格式的图片。</span>
                </div>
            </Form-item>
            <div v-if="type=='customer'">
                <Form-item label="所属行业" prop="industryClass">
                    <Select v-model="formValidate.industryClass" placeholder="请选择所属行业" style="width:40%">
                        <Option-group v-for="(item,i) in industyData" :label="item.name" :key="i">
                            <Option v-for="(item2,index) in item.children" :key="index" :value='item2.value' :label="item2.name">{{ item2.name }}</Option>
                        </Option-group>
                    </Select>
                </Form-item>
                <span class="changeCol">*</span>
                <Form-item label="所在区域" prop="region">
                    <Cascader :data="regionData" v-model="formValidate.region" :render-format="format"></Cascader>
                </Form-item>
            </div>
            <Form-item label="联系人" prop="contact">
                <Input v-model="formValidate.contact" style="width:40%"></Input>
            </Form-item>
            <Form-item label="联系人手机" prop="contactPhone">
                <Input v-model="formValidate.contactPhone" style="width:40%"></Input>
            </Form-item>
            <Form-item label="邮箱" prop="email">
                <Input v-model="formValidate.email" style="width:40%"></Input>
            </Form-item>
            <Form-item label="QQ" prop="qq">
                <Input v-model="formValidate.qq" style="width:40%"></Input>
            </Form-item>
            <Form-item label="微信号" prop="wechat">
                <Input v-model="formValidate.wechat" style="width:40%"></Input>
            </Form-item>
            <div class="system">
                <!-- <Icon type="ios-film-outline"></Icon> -->
                其他信息
            </div>
            <Form-item label="业务联系人" prop="bContact">
                <Input v-model="formValidate.bContact" style="width:40%"></Input>
            </Form-item>
            <Form-item label="业务联系人手机" prop="bContactPhone">
                <Input v-model="formValidate.bContactPhone" style="width:40%"></Input>
            </Form-item>
            <Form-item label="技术联系人" prop="tContact">
                <Input v-model="formValidate.tContact" style="width:40%"></Input>
            </Form-item>
            <Form-item label="技术联系人手机" prop="tContactPhone">
                <Input v-model="formValidate.tContactPhone" style="width:40%"></Input>
            </Form-item>
            <Form-item label="备注" prop="remark">
                <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..." style="width:40%"></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
    </div>
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
                agentProvince: '',
                agentOff: '',
                agentType: '',


                region: [],
                username: '',
                password: '',
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
            },
            ruleValidate: {
                agentOff: [{
                    required: true,
                    message: '代理折扣不能为空',
                    trigger: 'blur'
                }, {
                    validator: discountBlur,
                    trigger: 'blur'
                }],

                agentProvince: [{
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
                userType: [
                    // { required: true, message: '请选择客户类型', trigger: 'change' }
                ],
                companyName: [{
                    required: true,
                    message: '必填项，不能为空',
                    trigger: 'blur'
                }],
                companyBID: [{
                    required: true,
                    message: '必填项，不能为空',
                    trigger: 'blur'
                }, {
                    validator: validateBID,
                    trigger: 'blur'
                }],
                companyBLimg: [

                ],
                region: [],
                industryClass: [{
                    required: true,
                    message: '请选择所属行业',
                    trigger: 'change'
                }],
                contact: [{
                    required: true,
                    message: '联系人不能为空',
                    trigger: 'blur'
                }],
                contactPhone: [{
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
                bContactPhone: [{
                    message: '联系人手机格式不正确',
                    trigger: 'blur'
                }, {
                    validator: validatePhone,
                    trigger: 'blur'
                }],
                tContactPhone: [{
                    message: '联系人手机格式不正确',
                    trigger: 'blur'
                }, {
                    validator: validatePhone,
                    trigger: 'blur'
                }],
                email: [{
                    type: 'email',
                    message: '邮箱格式不正确',
                    trigger: 'blur'
                }, ],
                qq: [{}],
                wechat: [{}],
            },
        };
    },
    mounted() {
        this.regionData = region;
        this.industyData = industry;
        this.uploadList = this.$refs.upload.fileList; //上传图片
    },
    methods: {
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
                        userType: this.formValidate.userType,
                        companyName: this.formValidate.companyName,
                        companyBID: this.formValidate.companyBID,
                        companyBLimg: this.formValidate.companyBLimg,
                        industryClass: this.formValidate.industryClass,
                        region: hisRegion,
                        contact: this.formValidate.contact,
                        contactPhone: this.formValidate.contactPhone,
                        qq: this.formValidate.qq,
                        wechat: this.formValidate.wechat,
                        email: this.formValidate.email,
                        bContact: this.formValidate.bContact,
                        tContact: this.formValidate.tContact,
                        bContactPhone: this.formValidate.bContactPhone,
                        tContactPhone: this.formValidate.tContactPhone,
                        remark: this.formValidate.remark,
                    }
                    console.log(AddData);

                    if (this.type == 'customer') {
                        this.$store.dispatch('customerAdd', AddData).then(data => {
                            this.$store.dispatch('getAllCustomer', {
                                    page: 1,
                                    size: 10
                                })
                                //跳转页面 
                            util.openNewPage(this, 'customer_account');
                            this.$router.push({
                                name: 'customer_account'
                            });
                            this.$Message.success('提交成功!');
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        if (!AddData.region) {
                            delete AddData.region;
                        }
                        if (!AddData.industryClass) {
                            delete AddData.industryClass;
                        }
                        this.$store.dispatch('agentAdd', AddData).then(data => {
                            this.$store.dispatch('getAllAgent', {
                                    page: 1,
                                    size: 10
                                })
                                //跳转页面 
                            util.openNewPage(this, 'agent_account');
                            this.$router.push({
                                name: 'agent_account'
                            });
                            this.$Message.success('提交成功!');
                        }).catch(err => {
                            console.log(err);
                        })
                    }

                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
    }
};
</script>
