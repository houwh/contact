<template>
	<Card>
		<div slot="title" class="titlebox">
	        <div class="title-left">
	            <Icon type="ios-film-outline"></Icon>
	            基础信息
	        </div>
	        <!-- <div style="float:right">
	            <Button onclick="history.go(-1)">返回</Button>
	        </div> -->
        </div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
            <Form-item label="产品分类:" prop="productClass">
                <Select v-model="formValidate.productClass" placeholder="请选择分类" style="width:40%">
                        <Option v-for="(value,key) in formValidate.productClassData"
                        :value="key" :label="value" :key="key">{{ value }}</Option>
                    <!--</Option-group>-->
                </Select>
            </Form-item>
            <Form-item label="产品品类:" prop="productType">
                <Radio-group v-model="formValidate.productType">
                    <Radio label='1'>创客版</Radio>
                    <Radio label=2>企业版</Radio>
                    <Radio label=3>集团版</Radio>
                    <Radio label=4>通用版</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="部署方式:" prop="productDeploy">
                <Radio-group v-model="formValidate.productDeploy">
                    <Radio label=1>公有云</Radio>
                    <Radio label=2>私有云</Radio>
                    <Radio label=3>独立部署</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="库存量单位:" prop="productUnit">
                <Radio-group v-model="formValidate.productUnit">
                    <Radio label='1'>年/套</Radio>
                    <Radio label='2'>年/坐席</Radio>
                    <Radio label='3'>人/次</Radio>
                    <Radio label='4'>终身/套</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="产品名称:" prop="productName">
                <Input v-model="formValidate.productName" placeholder="全局唯一，最大允许输入40个字符" style="width: 40%">
                </Input>
                <!--<p class="alertFlot">全局唯一，最大允许输入40个字符</p>-->
            </Form-item>
            <Form-item label="零售价:" prop="productPrice">
                <Input v-model="formValidate.productPrice" placeholder="请输入大于零的数，小数点后可精确到两位" style="width: 40%"></Input>
            </Form-item>
            <div class="system">
                <Icon type="ios-film-outline"></Icon>
                系统信息
            </div>
            <Form-item label="唯一标识符:" prop="uniqueFlag" class="systemForm">
                <Input v-model="formValidate.uniqueFlag" placeholder="全局唯一，最大允许输入40个字符" style="width: 40%">
                </Input>
            </Form-item>

            <!-- <Form-item label="可视范围:" prop="range">
                <Radio-group v-model="formValidate.range">
                    <Radio label="PC客户中心">PC客户中心</Radio>
                    <Radio label="小程序客户中心">小程序客户中心</Radio>
                </Radio-group>
            </Form-item> -->

            <!-- <Form-item label="免费试用:" prop="freeTrial">
                <Radio-group v-model="formValidate.freeTrial">
                    <Radio :label='true'>支持</Radio>
                    <Radio :label='false'>不支持</Radio>
                </Radio-group>
            </Form-item>
 -->
            <Form-item label="试用天数:" prop="trialDays" v-if="formValidate.freeTrial==true">
                <Input v-model="formValidate.trialDays" placeholder="请输入默认天数" style="width: 40%">
                </Input>
            </Form-item>

            <Form-item label="手动开户:" prop="manualConn">
                <Radio-group v-model="formValidate.manualConn">
                    <Radio label='1'>不需要</Radio>
                    <Radio label='2'>需要</Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="访问地址:" prop="uri">
                <Input v-model="formValidate.uri" placeholder="设置产品下载地址或访问域名等" style="width: 40%">
                </Input>
            </Form-item>
            <Form-item label="产品图片:" prop="productImg">
                <!-- <span class="changeRed">*</span> -->
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
                <Upload ref="upload" :show-upload-list="false" :format="['jpg','jpeg','png','gif','bmp']" :accept="['jpg','jpeg','png','gif','bmp']"
                    :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :on-success="handleSuccess"
                    multiple type="drag" action="/api/upload" style="display: inline-block;width:300px;"  v-show="cameraFlag">
                    <div style="width: 300px;height:150px;line-height: 150px;">
                        <span id="comPer">产品图</span>
                    </div>
                </Upload>  
                <div>
                    <!-- <div class="file">
                        <span>本地上传</span>
                    </div> -->
                    <span class="picTip">仅能上传一张，上传的电子照片支持jpg、jpeg、gif、png、bmp格式的图片。</span>
                </div>
            </Form-item>
            <Form-item label="备注" prop="remark">
                <Input type="textarea" v-model="formValidate.remark" placeholder="请填写备注信息" style="width: 40%">
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
	</Card>
</template>
<script>
import industry from '../../libs/common.js'
import util from '../../libs/util.js';
import {
    mapState,mapActions
} from 'vuex'
export default {
        name: 'list',
        components: {},
        data() {
            const priceBox = (rule,value,callback) => {
                if(value===''){
                    callback(new Error('零售价不能为空'))
                }else if(!(/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/.test(value))){
                    callback(new Error('请输入大于零的数，小数点后可精确到两位'))
                }else{
                    callback()
                }
            };
            const trialDaysValiador = (rule,value,callback) => {
                if(value===''){
                    callback(new Error('试用天数不能为空'))
                }else if(value%1!=0){
                    callback(new Error('请输入天数'))
                }else{
                    callback()
                }
            };
            return {
                cameraFlag:true,
                imgName: '',
                uploadList: [],
                industyData:'',
                radio:'true',
                editModal: false,
                detailModal: false,
                deleteTip: false,
                showHeader: true, //是否显示表头 @:show-header
                fixedHeader: true, //是否固定表头 @:height
                tableSize: 'default', //@:size
                DateReady: false, // 判断异步数据加载完成，避免报错
                loading: false, //save
                currDate: {}, //当前编辑和新增的行数据
                currIndex: 0, //当前编辑和新增的行号
                saveDisabled: false,
                params: {
                    page: 1,
                    limit: 10,
                    category: 'Android'
                },
                selection: [], //表格选中项
                listData: [], //@:data
                formValidate: {
                    //产品分类
                    productClassData :{
                        1: '行业应用',
                        2: '社群应用',
                        3: '社交管理',
                        4: '内容推广',
                        5: '运营小工具'
                    },
                    productName: '',  //产品名称
                    uniqueFlag:'', //唯一标识符
                    range:'PC客户中心',   //可视范围
                    uri: '', //访问地址
                    productClass:'', // 产品分类
                    productType: '1', // 产品品类
                    productDeploy:1, // 部署方式
                    productUnit: 1, // 库存量单位
                    productPrice:'', // 零售价
                    freeTrial: true, // 免费试用
                    trialDays: '', // 试用天数
                    manualConn:1, // 手动开户 1.不需要 2.需要
                    remark:'',
                    productImg:"",
                    remark:'',
                },
                ruleValidate: {
                    productName: [
                        { required: true, message: '产品名称不能为空', trigger: 'blur' },
                        { min:1,max:40,message:'产品名称需在40字以下', trigger:'blur'}
                    ],
                    uniqueFlag:[
                        { required: true, message: '唯一标识符不能为空', trigger: 'blur' },
                        { min:1,max:40,message:'最大允许输入40个字符', trigger:'blur'}
                    ],
                    productType:[
                        {required:true,type:'string'}
                    ],
                    productDeploy:[
                        {required:true}
                    ],
                    productUnit:[
                        {required:true}
                    ],
                    uri:[
                        {required: true, message: '访问地址不能为空', trigger: 'blur' },
                        // {type:'url',message: '访问地址如：https://www.example.com',trigger: 'blur'},
                    ],
                    productClass:[
                        {required: true, message: '产品分类不能为空', trigger: 'change' }
                    ],
                    productPrice:[
                        {required:true,message:'零售价不能为空',trigger:'blur'},
                        {validator: priceBox, trigger: 'blur'}
                    ],
                    freeTrial:[
                        { required:true }
                    ],
                    trialDays:[
                        { required: true, message: '试用天数不能为空', trigger: 'blur' },
                        {validator: trialDaysValiador, trigger: 'blur'}
                    ],
                    manualConn:[
                        { required:true }
                    ],
                    productImg:[
                        // { required:true, message: '', trigger: 'blur' }
                    ],
                    remark:[
                        { required:true,message: '请填写备注信息', trigger: 'blur'  }
                    ],
                }
            }
        },
        watch: {
        },
        computed: {
            state() {
                return this.$store.state.app
            },
        },
        methods: {
            // ...mapActions(['Header']),
            handleSubmit (name) {
                if(!this.formValidate.productImg){
                    this.$Message.error('请上传产品图!');
                    return;
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let obj = {
                            productName:this.formValidate.productName,
                            productType:this.formValidate.productType,
                            productClass:this.formValidate.productClass,
                            productPrice:this.formValidate.productPrice,
                            uniqueFlag:this.formValidate.uniqueFlag,
                            freeTrial:this.formValidate.freeTrial,
                            trialDays:this.formValidate.trialDays,
                            productDeploy:this.formValidate.productDeploy,
                            productUnit: this.formValidate.productUnit,
                            // range:this.formValidate.range,
                            manualConn:this.formValidate.manualConn,
                            uri:this.formValidate.uri,
                            remark:this.formValidate.remark,
                            productImg:this.formValidate.productImg,
                        }
                        if(!obj.trialDays){
                            delete obj.trialDays;
                        }
                        console.log(obj);
                        this.$store.dispatch('productAdd',obj).then(data=>{
                            this.$Message.success('提交成功!');
                            util.openNewPage(this, 'product_index');
                            this.$router.push({
                                name: 'product_index',
                            });
                        }).catch(err=>{
                            console.log(err);
                            this.$Message.error('请检查产品名称和标识符，不可重复');
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            // iview的上传图片 
            handleBeforeUpload (file) {
            let reader = new FileReader();
                reader.readAsDataURL(file)

                const _this = this
                reader.onloadend = function (e) {
                    file.url = reader.result
                    // console.log(_this.uploadList,'uploadList')
                    _this.uploadList[0].url = reader.result;   
                }
            },
            handleSuccess(res){
            	console.log(res);
                this.cameraFlag = false;
                this.formValidate.productImg = res.path;
            },
            handleFormatError (file) {
                this.$Message.error('请上传jpg、jpeg、gif、png或bmp格式的图片!');
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.cameraFlag = true;
            },
            pageChange(page) {
                this.params.page = page
            },
            PageSizeChange(limit) {
                console.log(limit)
                this.params.limit = limit
            },
            remove(index) {
                this.listData.splice(index, 1);
            },  
        },
        mounted(){
            this.industyData = industry;
            this.uploadList = this.$refs.upload.fileList;  //上传图片
        }
    }
</script>

