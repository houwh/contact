<template>
    <div>
        <Row>
            <Col>
            <Card>
                <div slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    客户信息
                    <Button type="default" class="returnBtn" onclick="history.go(-1)">返回</Button>
                </div>
                <div class="disDiv">
                    <Row>
                        <Col span="12">
                        <li>登录名：{{DA.userInfo.username}}</li>
                        </Col>
                        <Col span="12">
                        <li>客户类型：{{DA.userInfo.type}}</li>
                        </Col>
                    </Row>
                    <Row v-if='flag==1'>
                        <Col span="12">
                        <li>姓名：{{DA.userInfo.userRealName}}</li>
                        </Col>
                        <Col span="12">
                        <li>身份证号：{{DA.userInfo.companyBID}}</li>
                        </Col>
                    </Row>
                    <Row v-if='flag==2'>
                        <Col span="12">
                        <li>公司名称：{{DA.userInfo.companyName}}</li>
                        </Col>
                        <Col span="12">
                        <li>营业执照：{{DA.userInfo.companyBID}}</li>
                        </Col>
                    </Row>
                </div>
                <p border-bottom="1px solid #e3e8ee">
                    <Icon type="ios-film-outline" class="left10"></Icon>授权信息</p>
                <div class="disDiv">
                    <Row>
                        <Col span="12">
                        <li>授权编号：{{DA.licenseInfo.licenseNo}}</li>
                        </Col>
                        <Col span="12" v-if="orderPer == '客户'">
                        <li>合同编号：{{DA.licenseInfo.contractSerial}}</li>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12" style="color:red">
                        <li>金额：{{DA.order.amount}}</li>
                        </Col>
                        <Col span="12">
                        <li>申请时间：{{DA.licenseInfo.createdAt2}}</li>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        <li>申请人：{{ DA.userInfo.userRealName }}</li>
                        </Col>
                        <Col span="12">
                        <!-- <li v-for="item in DA.licenseInfo.product">
                            授权产品：{{item.productName}}
                        </li> -->
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24"> 授权产品：
                        <li v-for="item in DA.licenseInfo.product" class="proSty">
                            {{item.productName}}
                            <span style="color:green">
                                <span>
                                    （{{ item.hisDays }}, {{ item.count }})
                                </span>
                            <span v-if="item.productUnit==1 || item.productUnit==2">
                                    <span v-show="DA.licenseInfo.licenseState==2">
                                        [{{ DA.licenseInfo.newDate }}~{{item.effeChin}}]
                                    </span>
                            </span>
                            </span>
                            <!-- <span  style="color:green"  v-if=" orderPer == '代理商' ">
                                [{{ item.licenseProduct.count }}套]
                            </span> -->
                        </li>
                        <span v-if=" orderPer == '代理商' " class="redtip">每套产品的License使用期限为1年</span>
                        </Col>
                    </Row>
                </div>
                <p border-bottom="1px solid #e3e8ee">
                    <Icon type="ios-film-outline" class="left10"></Icon>付款确认</p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                    <Form-item label="付款方式" prop="paymentMethod">
                        <span v-if="payState==2">{{DA.payment.method2}}</span>
                        <Select v-model="formValidate.paymentMethod" placeholder="请选择支付方式" v-if="payState==1">
                            <Option value="1">银行转账</Option>
                            <Option value="2">支付宝支付</Option>
                            <Option value="3">微信支付</Option>
                            <Option value="4">现金</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="凭证号" prop="paymentProof">
                        <span v-if="payState==2">{{DA.payment.paymentProof}}</span>
                        <Input v-model="formValidate.paymentProof" placeholder="输入收到款的凭证号，比如银行流水号、支付宝交易号、现金收据号等" style="width:50%" v-if="payState==1"></Input>
                    </Form-item>
                    <!--img-->
                    <Form-item label="上传凭证" prop="paymentProofImg">
                        <span class="changeRed">*</span>
                        <div class="demo-upload-list" v-for="item in uploadList">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover" v-if="DA.licenseInfo.licenseState==1">
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload ref="upload" :show-upload-list="false" :format="['jpg','jpeg','png','gif','bmp']" :accept="['jpg','jpeg','png','gif','bmp']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :on-success="handleSuccess" multiple type="drag" action="/api/upload" style="display: inline-block;width:300px;" v-show="cameraFlag">
                            <div style="width: 300px;height:150px;line-height: 150px;">
                                <span id="comPer">凭证电子版</span>
                            </div>
                        </Upload>
                        <div>
                            <!-- <div class="file">
                                <span>本地上传</span>
                            </div> -->
                            <span class="picTip">仅能上传一张，上传的电子照片支持jpg、jpeg、gif、png、bmp格式的图片。</span>
                        </div>
                    </Form-item>
                    <Form-item label="审核时间" prop="paymentProof" v-if="DA.licenseInfo.licenseState==2">
                        <span>{{DA.licenseInfo.updatedAt}}</span>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formValidate')" v-if="DA.licenseInfo.licenseState==1">确认已收款</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px" v-if="DA.licenseInfo.licenseState==1">重置</Button>
                    </Form-item>
                </Form>
            </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import {
    mapState,
    mapActions
} from 'vuex'

export default {
    name: 'agent',
    components: {},
    data() {
        return {
            expiredFlag: "",
            orderPer: '',
            cameraFlag: true,
            imgName: '',
            uploadList: [],
            payState: '',
            DA: {},
            flag: '',
            industyClass: '',
            contact: '',
            licenseId: this.$route.query.id,
            DA: {},
            formValidate: {
                paymentMethod: '',
                paymentProof: '',
                paymentProofImg: '',
            },
            ruleValidate: {
                paymentProof: [{
                    required: true,
                    message: '凭证号不能为空',
                    trigger: 'blur'
                }, ],
                paymentMethod: [{
                    required: true,
                    message: '请选择支付方式',
                    trigger: 'change'
                }],
            }
        }
    },
    methods: {
        handleSubmit(name) {
            if (!this.formValidate.paymentProofImg) {
                this.$Message.error('请上传图片!');
                return;
            }
            this.$refs[name].validate((valid) => {
                if (this.formValidate.paymentProofImg.length > 100) {
                    this.formValidate.paymentProofImg = '';
                }
                if (valid) {
                    let checkObj = {
                        paymentMethod: this.formValidate.paymentMethod,
                        paymentProof: this.formValidate.paymentProof,
                        paymentProofImg: this.formValidate.paymentProofImg,
                        id: this.licenseId,
                    }
                    console.log(checkObj, 'objjjjjjjjjjj')
                    this.$store.dispatch('submitProof', checkObj).then(res => {
                        console.log(res);
                        console.log(res.data.doc)
                        this.licenseData = res.data.doc;
                        this.$router.push('/finance');
                        // 未处理访客管理提示
                        this.$store.dispatch('GETUnhandleData', {
                            page: this.pageCount,
                            size: this.pageSize,
                        }).then(res => {
                            console.log(res);
                            console.log(store.state.countExpand, 'aaaaa') //扩展客户未处理的

                        }).catch(err => {
                            console.log(err);
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }
            });
        },
        // 重置
        handleReset(name) {
            location.reload();
        },
        // iview的上传图片
        handleBeforeUpload(file) {
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
            this.formValidate.paymentProofImg = res.path;
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
            this.uploadList = [];
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.cameraFlag = true;
            this.uploadList = this.$refs.upload.fileList; //上传图片
        },
    },
    created() {
        console.log(this.licenseId);
        this.$store.dispatch('getFinanceById', this.licenseId).then(res => {
            this.DA = res.data.doc;
            this.payState = this.DA.licenseInfo.licenseState;

            if (this.DA.userInfo.companyName) {
                this.DA.userInfo.type = '企业';
                this.flag = 2;
            } else {
                this.DA.userInfo.type = '个人'
                this.flag = 1;
            }
            console.log(this.flag, 'flaggggggggggg');
            // 如果是客户的话，那么有/显示合同编号
            if (this.DA.licenseInfo.contractSerial) {
                this.orderPer = '客户'
            } else {
                this.orderPer = '代理商'
            }
            // 授权产品的具体内容
            this.DA.licenseInfo.product.forEach(item => {
                    console.log(item, '产品')
                    if (item.licenseProduct.expired == 0) {
                        item.licenseProduct.expiredFlag = false;
                    } else {
                        item.licenseProduct.expiredFlag = true;
                        // 起始时间是授权创建的时间
                        let newExpired = (+item.licenseProduct.expired) + (+this.DA.licenseInfo.updatedAt);
                        console.log(1111111111, newExpired, this.$moment(+newExpired).format('YYYY-MM-DD'))
                        item.effeChin = this.$moment(+newExpired).format('YYYY-MM-DD');
                    }
                    console.log(item, '里面有flagggggggggg');
                    item.updatedChin = this.$moment(+item.updatedAt).format('YYYY-MM-DD');


                    // 不同产品的单位，不同时间转换,不同的套数
                    let item2 = item.licenseProduct;
                    item.hisDays = item.licenseProduct.expired / 24 / 60 / 60 / 1000; // 产品的授权时间

                    // if(this.orderPer == '客户'){
                    switch (item.productUnit) {
                        case 1:
                            item.count = item2.count + '套';
                            if (item.hisDays == 365) {
                                item.hisDays = '1年';
                            } else if (item.hisDays == 730) {
                                item.hisDays = '2年';
                            } else if (item.hisDays == 1095) {
                                item.hisDays = '3年';
                            } else {
                                item.hisDays = item.hisDays + '天';
                            }
                            break;
                        case 2:
                            item.count = item2.count + '坐席';
                            if (item.hisDays == 365) {
                                item.hisDays = '1年';
                            } else if (item.hisDays == 730) {
                                item.hisDays = '2年';
                            } else if (item.hisDays == 1095) {
                                item.hisDays = '3年';
                            } else {
                                item.hisDays = item.hisDays + '天';
                            }
                            break;
                        case 3:
                            item.count = '按使用次数付费';
                            item.hisDays = '终身使用权';
                            break;
                        case 4:
                            item.hisDays = '终身使用权';
                            item.count = item2.count + '套';
                            break;
                    }
                    // }else if(this.orderPer == '代理商'){
                    // 上面格式的转换是针对客户类型的而言，而对于代理商来说
                    console.log(item.licenseProduct.count, 'herererere')
                        // }
                    console.log(item, '时间长')
                })
                // 如果是审核成功，也就是查看状态时
            if (this.DA.licenseInfo.licenseState == 2) {
                // 审核时间

                this.DA.licenseInfo.newDate = this.$moment(+this.DA.licenseInfo.updatedAt).format('YYYY-MM-DD');
                this.DA.licenseInfo.updatedAt = this.$moment(+this.DA.licenseInfo.updatedAt).format('YYYY-MM-DD HH:mm');


                console.log(this.DA.licenseInfo.newDate, 'iiiiiiiiiiiiiiiiiiiii')

                // 显示照片
                let obj = {};
                obj.url = '';
                obj.status = 'finished';
                this.cameraFlag = false;
                this.uploadList.push(obj);
                this.uploadList[0].url = 'data:image/jpg;base64,' + this.DA.payment.paymentProofImg;
                console.log(this.uploadList, '999999999')
            }
            this.DA.licenseInfo.createdAt2 = this.$moment(+this.DA.licenseInfo.createdAt).format('YYYY-MM-DD HH:mm');
            this.formValidate = this.DA.payment;
            console.log(this.formValidate, 'ffff')
            switch (this.formValidate.paymentMethod) {
                case 1:
                    this.formValidate.method2 = '银行转账';
                    break;
                case 2:
                    this.formValidate.method2 = '支付宝支付';
                    break;
                case 3:
                    this.formValidate.method2 = '微信支付'
                    break;
                case 4:
                    this.formValidate.method2 = '现金'
                    break;
            }
        }).catch(err => {
            console.log(err);
        })
    },
    updated() {
        if (this.DA.licenseInfo.licenseState == 1) {
            this.uploadList = this.$refs.upload.fileList; //上传图片
        }
    },
}
</script>
<style scoped>
.leftBtn {
    float: right;
}

h4 {
    height: 40px;
    line-height: 40px;
}

li {
    list-style: none;
    /*margin-left: 70px;*/
    height: 40px;
    line-height: 40px;
}

p {
    border-bottom: 1px solid #e3e8ee;
    padding: 14px 16px;
    margin-bottom: 15px;
}

.ivu-select {
    width: 50%;
}

.left10 {
    position: relative;
    left: -10px;
}


/*上传照片*/

#preview {
    width: 280px;
    height: 170px;
    line-height: 170px;
    text-align: center
}

#preview {
    border: 1px solid #E5E5E5;
}

#comPer {
    font-family: '华文新魏';
    font-weight: 400;
    font-style: normal;
    font-size: 30px;
    color: #AEAEAE;
}

.file {
    margin-top: 10px;
    position: relative;
    display: inline-block;
    background: #ffc941;
    border-radius: 4px;
    overflow: hidden;
    color: #000;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    font-size: 12px;
}

.file span {
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

.fileName {
    margin-top: 10px;
    font-size: 14px;
    color: #868686;
    line-height: 30px;
}

.changeRed {
    color: red;
    position: relative;
    left: -67px;
    top: -130px;
}

.fileName p {
    padding: 0
}

.disDiv {
    margin-left: 90px;
}


/*iview上传图片*/

.demo-upload-list {
    display: inline-block;
    width: 300px;
    height: 150px;
    text-align: center;
    line-height: 150px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}

.returnBtn {
    float: right;
    margin-top: -10px
}

.proSty {
    margin-left: 65px;
    height: 23px;
    line-height: 23px;
}

.redtip {
    color: red;
    margin-left: 65px;
    font-size: 12px;
}
</style>
