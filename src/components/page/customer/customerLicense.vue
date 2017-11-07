<template>
    <div class="table">
        <div class="compHead">
            <div>
                <p>客户License管理</p>
                <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item> 客户管理 </el-breadcrumb-item>
                        <el-breadcrumb-item> 客户License管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <div class="context-cust">
        <el-row type="flex" class="row-bg" justify="space-around" style=" margin-bottom: 20px;">
            <el-col :span="24">
                <el-col :span="13">
                    <el-select v-model="select" placeholder="请选择" style="width: 126px">
                        <el-option label="授权编号" value="licenseNo" value-key></el-option>
                        <el-option label="产品名称" value="productName"></el-option>
                        <el-option label="授权人" value="operator"></el-option>
                    </el-select>
                    <el-input placeholder="请输入产品名称" v-model="input_cond" style="width: 250px">
                    </el-input>
                    <el-select v-model="customerLicenseState" placeholder="全部状态" style="width: 126px">
                    		<el-option label="全部状态" value="3"></el-option>
                        <el-option label="未付款" value="1" value-key></el-option>
                        <el-option label="已开通" value="2"></el-option>
                    </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="queryCustomer">查询</el-button>
                    <el-button type="primary" @click="authorization">授权</el-button>
                </el-col>
            </el-col>
        </el-row>

        <el-table :data="myproduct" border style="width: 100%">
            <el-row>
                <el-table-column align="center" prop="idx" label="序号" :span="2"></el-table-column>
                <el-table-column align="center" prop="licenseNo" label="授权编号" :span="6"></el-table-column>
                <el-table-column align="center" prop="productName" label="产品名称" :span="4">

                </el-table-column>
                <el-table-column align="center" prop="createdAt" label="授权日期" :span="4"></el-table-column>
                <el-table-column align="center" prop="end" label="到期时间" :span="4"></el-table-column>
                <el-table-column align="center" prop="username" label="授权人" :span="4"></el-table-column>
                <el-table-column align="center" prop="userLockedValue" label="状态" :span="4">
                    <template scope="scope">
                        <el-tag
                                :type="scope.row.licenseState==1? 'danger' : 'primary'"
                                close-transition>{{scope.row.licenseState==1?"未付款":"已开通"}}</el-tag>
                    </template>
                </el-table-column>
            </el-row>
        </el-table>

        <!--授权-->
        <el-dialog title="添加授权" :visible.sync="dialogFormVisible" :close-on-press-escape="false" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="80px">
                <el-form-item label="授权类型" prop="type">
                    <el-radio-group v-model="ruleForm.type" @change="change">
                        <el-radio label="1">试用</el-radio>
                        <el-radio label="2">续费</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!--<el-form-item>
                    <el-row :gutter="24">
                        <el-col :span="20">-->
                            <el-form-item label="授权产品" prop="product">
                                <el-select v-model="ruleForm.product" placeholder="请选择授权产品" style="width: 72%;">
                                    <el-option v-for="(item,index) in options" :key="index" :label="item.product.productName" :value="item.product.productName">
                                    </el-option>
                                </el-select>
                                <el-button type="primary" @click="addLicense(ruleForm.type)" style="margin-left:14px ;">添加</el-button>
                            </el-form-item>
                       <!-- </el-col>-->
                        <!--<el-col :span="4">-->
                            <!--<el-button @click="addLicense">添加</el-button>-->
                        <!--</el-col>
                    </el-row>
                </el-form-item>-->
                <el-form-item :label-width="formLabelWidth">
                    <el-card class="box-card" style="width: 100%;">
                        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
                            <el-form-item v-for="(license, index) in dynamicValidateForm.license" :key="license.application" :prop="'license.' + index + '.value'">
                                <el-row :gutter="20" style="margin-bottom: 10px;">
                                    <el-col :span="18">
                                        <!--<el-input v-model="license.expired" v-if="!authFlag">-->
                                            <!--<template slot="prepend">{{license.name}}</template>-->
                                            <!--<template slot="append">天</template>-->
                                        <!--</el-input>-->
                                        <p v-if="!authFlag">
                                            <span class="proNameapp">{{license.productName}}</span>
                                            <span class="day">天</span>
                                            <input type="text" style="width:50px;height: 20px; outline: none" size="small" v-model="license.timeLong" class="dayNum">
                                        </p>
                                        <!--<el-input v-model="license.years" v-if="authFlag" :disabled="true">
                                            <template slot="prepend">{{license.name}}awdawdawdawd</template>
                                            <template slot="append">年11</template>
                                        </el-input>-->
                                        <div class="renewbox" v-if="authFlag">
	                                        <div class="renew">
	                                        		<!--<p>{{license.name}}  <span>(年／坐席)</span></p>
	                                        		<span>坐席</span>
											    <el-input v-model="ruleForm.name"></el-input>-->
											    <!--智牛程控系统-->
                                                    <div class="license-left">
                                                        {{license.productName}}
                                                        <span style="color: red; display: inline-block">{{license.flag.name }}</span>
                                                    </div>
                                                <div class="license-right">
                                                    <span>{{ license.flag.text }}</span>  <!--单位-->
												    <el-input style="width: 100px" v-model="license.count" v-if="license.flag.num == 1 || license.flag.num==2 || license.flag.num==4" placeholder=""></el-input>
												    <el-select v-model="license.timeLongs" placeholder="请选择活动区域" @change="timeaaa(license.timeLongs,license)" v-if="flog&&license.flag.num==2" style="width: 150px">
												      	<el-option label="1年" :value="365"></el-option>
												      	<el-option label="2年" :value="730"></el-option>
												      	<el-option label="3年" :value="1095"></el-option>
												      	<el-option label="自定义" :value="4"></el-option>
												    </el-select>
                                                    <p v-if="license.flag.num==4" class="useForever">终身使用权</p>
                                                    <!--<p v-if="license.flag.num==3" class="useForever2">终身使用权,按使用次数计费</p>-->
                                                    <el-select v-model="license.timeLong" placeholder="请选择活动区域" v-if="license.flag.num == 1" style="width:150px">
                                                        <el-option label="1年" :value="365">1年</el-option>
                                                        <el-option label="2年" :value="730">2年</el-option>
                                                        <el-option label="3年" :value="1095">3年</el-option>
                                                    </el-select>
                                                    <!--<el-date-picker-->
                                                            <!--v-model="formdata"-->
                                                            <!--type="date"-->
                                                            <!--placeholder="选择日期"-->
                                                            <!--v-if="!flog&&license.timeLong==4"-->
                                                            <!--:picker-options="pickerOptions0">-->
                                                    <!--</el-date-picker>-->
												   <el-date-picker v-if="!flog&&license.timeLongs==4" @change="(val) => open(val,license)" :picker-options="pickerOptions0"  type="daterange" placeholder="选择日期" v-model="formdata" style="width: 100%;"></el-date-picker>
                                                    <!--智牛运营小工具-->
                                                    <!--<div v-if="tool">-->
                                                        <!--<el-select v-model="license.years" placeholder="请选择活动区域">-->
                                                            <!--<el-option label="1年" value="1年"></el-option>-->
                                                            <!--<el-option label="2年" value="2年"></el-option>-->
                                                            <!--<el-option label="3年" value="3年"></el-option>-->
                                                        <!--</el-select>-->
                                                    <!--</div>-->
                                                </div>
											</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="2">
                                        <el-button type="danger" @click.prevent="removeLicense(license)">删除</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-form-item>
                <!-- <el-form-item v-if="authFlag" label="授权码" prop="authCode">
                            <el-input v-model="ruleForm.authCode" placeholder="请输入授权码"></el-input>
                        </el-form-item> -->

                <el-form-item class="butt1and2">
                    <el-button v-if="ruleForm.type==1" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button v-else="" type="primary" @click="renewSub('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <div class="pagination">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="current1"
                    layout="total,prev, pager, next, jumper"
                    :total="pageCount">
            </el-pagination>
        </div>
        </div>
    </div>
</template>

<script>
import api from '../../../api';
import { cloneDeep } from 'lodash'
import moment from 'moment'

//试用中：授权试用license后的状态；
// 已开通：授权正式license后的状态；
// 即将过期：已开通状态的License剩余天数小于等于30天时显示此状态；
// 已过期：当前授权license已经到期；

//var getData = (that) => {
//    api.getLicenseByCustomer(that.$route.params.id).then(({ data }) => {
//        let arr = data.docs;
//        let Data = [];
//        let currentDate = Date.now();
//        for (let i = arr.length; i--;) {
//            for (let j = arr[i].child.length; j--;) {
//                let obj = {};
//                obj = cloneDeep(arr[i]);
//                obj.app = cloneDeep(arr[i].child[j]);
//
//                obj.status = '';
//
//                if (obj.app.expired) {
//                    if (currentDate <= +obj.app.endAt) {
//                        obj.status = '试用中';
//                    } else {
//                        obj.status = '已过期';
//                    }
//                } else {
//                    if (currentDate <= +obj.app.endAt) {
//                        obj.status = '已开通';
//                        if (+obj.app.endAt - currentDate < 30 * 24 * 60 * 60 * 1000) {
//                            obj.status = '即将过期';
//                        }
//                    } else {
//                        obj.status = '已过期';
//                    }
//                }
//
//                obj.startAt = moment(+obj.app.startAt).format('LL');
//                obj.endAt = moment(+obj.app.endAt).format('LL');
//                Data.push(obj);
//            }
//        }
//
//        Data.sort((a, b) => {
//            return b.effectiveAt - a.effectiveAt;
//        });
//
//        for (let i = 0; i < Data.length; i++) {
//            Data[i].idx = i + 1;
//        }
//        that.tableData = Data;
//    }
//
//    ).catch();
//}

export default {
    data() {
        return {
            pickerOptions0: {
                disabledDate(time){
                    return time.getTime()<Date.now()-8.64e7;
                },
                shortcuts: [{
                    text: '最近一年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            current1:1,
            years:'',
            number:0,
            company:{

            },
            myproduct:[],
            productdata:[],
            customerLIcense:[],
            productSelect:[],
            unit:'',  //单位
        		tool:false,   //运营工具
        		ck:false,   //程控工具
            _csrf: '',
            formdata:'',
            select:'',
            customerLicenseState:'',
            input_cond:'',
            authFlag: false,
            flog:"true",   //   续费  日期，下拉框切换
            pageCount: 1,
            tableData: [],
            cur_page: 1,
            options:[],
            optionsReadOnly: [],
            dialogFormVisible: false,
            form: {
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            dynamicValidateForm: {
                license: [{
                 	value: '',
                 	date1:'',
                }],
            },
            ruleForm: {
                // authCode: '',
                product: '',
                type: '1',
            },
            rules: {
                // authCode: [{
                //     required: true, message: '请输入授权码', trigger: 'blur'
                // }],
                product: [
                    { required: true, message: '请选择授权产品', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'blur' }
                ],
            },
            formLabelWidth: '80px'
        }
    },
    watch:{

    },
    created() {
        // this.getData();
        this.dynamicValidateForm.license.length = 0;
        //console.log(this.dynamicValidateForm);
    },
    computed: {

    },
    mounted() {
            this.getData()
    },
    methods: {
        open(val,obj){
            console.log(val,obj);
            //console.log(this.formdata,"-----formdata------")
            //console.log(val.split('-'),"-----val-------")
            var arr = val.split('-');
            var starttime = new Date(arr[0],parseInt(arr[1]-1),arr[2]);
            var srarttimes = starttime.getTime();
            //console.log(srarttimes,"srarttimes")
            var endtime = new Date(arr[3],parseInt(arr[4]-1),arr[5]);
            var endtimes = endtime.getTime();
            var intervalTime = endtimes-srarttimes;
            var lnter_Days = ((intervalTime).toFixed(2)/86400000)+1;
            this.number = lnter_Days;
            console.log(this.number,"this.number");
            obj.timeLong = lnter_Days;
            return lnter_Days
        },
        getData(){
            api.CustomerLIcense(this.$route.params.id).then(data=>{
                this.tableData = data.data.docs.rows;
                data.data.docs.myproduct = [];
//            渲染产品
                console.log(this.tableData,"this.tableData");
                for(let i=0;i<this.tableData.length;i++){
//                    console.log(data.data.docs.myproduct,"data.data.docs.myproduct");
//                    console.log(this.tableData[i].operator.username,"this.tableData[i].operator");
                    this.tableData[i].product.forEach((item,index)=>{
//                  当关联两个产品时，它们拥有相同的授权编号
                        item.licenseNo = this.tableData[i].licenseNo;
                        item.username = this.tableData[i].operator.username;
                        data.data.docs.myproduct.push(item);
                    })
                };
                this.myproduct = data.data.docs.myproduct;
                var idx = 1 == 1? 1 : 1-1+'1';
                this.myproduct.forEach((item,index)=>{
                    item.idx = idx++;
                    item.createdAt = moment(+item.createdAt).format('YYYY-MM-DD');
                    item.end = moment(+item.end).format('YYYY-MM-DD');
                });

                this.pageCount = data.data.docs.count;
                this.tableData.forEach((item,index)=>{
                    if(item.licenseState==2){
                        this.tableData[index].userLockedValue = '已开通';
                    }else{
                        this.tableData[index].userLockedValue = '已冻结';
                    }
                })
                console.log( this.myproduct," this.myproduct")
            });
        },
        callme(value, row){
            console.log(row,'row');
            console.log(value,'row2')
//            console.log(cellValue,'row3')
        },
        //授权按钮 ,获取代理商产品
        authorization(){
            this.dialogFormVisible = true
            api.getProduct().then(data => {
                    console.log(data,"product");
                    this.options = data.data.doc.rows;
            })
        },
//        查询
        queryCustomer(){
              var str = this.select;
              var obj = {};
              if(str && this.input_cond){
                  obj[str] = this.input_cond;
              }
              if(this.customerLicenseState){
              		if(this.customerLicenseState = '3'){
              			this.getData()
              			return;
              		}
                  obj.licenseState = this.customerLicenseState
              }
              obj.page = 1;
              obj.size = 10;
//              console.log(obj,"obj")
            api.serverlicense(this.$route.params.id,obj).then(data=>{
                this.tableData = data.data.docs.rows;
                data.data.docs.myproduct = [];
//            渲染产品
                console.log(this.tableData,"this.tableData");
                for(let i=0;i<this.tableData.length;i++){
//                    console.log(data.data.docs.myproduct,"data.data.docs.myproduct");
//                    console.log(this.tableData[i].operator.username,"this.tableData[i].operator");
                    this.tableData[i].product.forEach((item,index)=>{
//                  当关联两个产品时，它们拥有相同的授权编号
                        item.licenseNo = this.tableData[i].licenseNo;
                        item.username = this.tableData[i].operator.username;
                        data.data.docs.myproduct.push(item);
                    })
                };
                this.myproduct = data.data.docs.myproduct;
                var idx = 1 == 1? 1 : 1-1+'1';
                this.myproduct.forEach((item,index)=>{
                    item.idx = idx++;
                    item.createdAt = moment(+item.createdAt).format('YYYY-MM-DD');
                    item.end = moment(+item.end).format('YYYY-MM-DD');
                });

                this.pageCount = data.data.docs.count;
                this.tableData.forEach((item,index)=>{
                    if(item.licenseState==2){
                        this.tableData[index].userLockedValue = '已开通';
                    }else{
                        this.tableData[index].userLockedValue = '已冻结';
                    }
                })
            }).catch(error=>{
                console.log(error,"error")
            })
        },
        timeaaa(num,val){
            console.log(num,"num--");
            console.log(val,"val--");
//    			var num = this.dynamicValidateForm.license[0].years;
    			if(num==4){
    				this.flog = false;
    			}
        },
        change() {
            console.log('---change---',);
            let type = this.ruleForm.type;
            if (this.ruleForm.type === '1') {
                this.authFlag = false;
            } else {
                this.authFlag = true;
            }
            this.dynamicValidateForm.license.length = 0;
            this.$refs['ruleForm'].resetFields();
            this.ruleForm.type = type;
        },
        removeLicense(item) {
            var index = this.dynamicValidateForm.license.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.license.splice(index, 1)
            }
        },
        //试用添加
        addLicense(value) {
    		    if(this.ruleForm.type == 1){
                    var p = 0;
                    if (!this.ruleForm.product) {
                        this.$message({
                            type: 'error',
                            message: '请选择产品',
                        });
                    }else{
                        this.dynamicValidateForm.license.forEach(item=>{
                            if(item.productName == this.ruleForm.product){
                                this.$message({
                                    type: 'error',
                                    message: '同一个产品只能添加一次',
                                });
                                p = 1
                            }
                        })
                        if(p==1){
                            return
                        }else{
                            this.dynamicValidateForm.license.push({
                                productName:this.ruleForm.product,
                                timeLong:7
                            })
                            this.dynamicValidateForm.license = this.dynamicValidateForm.license;
                        }
                    }
                }else{
    		        var k = 0;
                    if (!this.ruleForm.product) {
                        this.$message({
                            type: 'error',
                            message: '请选择产品',
                        });
                    }else{
//                            1: '年/套',
//                            2: '年/坐席',
//                            3: '人/次',
//                            4: '终身/套',
                            var flag = 0;
                            this.options.forEach(item=>{
                            if(item.product.productName == this.ruleForm.product){
                                //item.product.productUnit = 3;
                                flag = item.product.productUnit;
                                if(item.product.productUnit == 1){
                                    this.company.name = '(年/套)'
                                    this.company.num = 1;
                                    this.company.text = '套'
                                }else if(item.product.productUnit == 2){
                                    this.company.name = '(年/坐席)';
                                    this.company.num = 2;
                                    this.company.text = '坐席'
                                }else if(item.product.productUnit == 3){
                                    this.company.name = '(人/次)'
                                    this.company.num = 3
                                    this.company.text = '终身使用权,按使用次数计费'
                                }else{
                                    this.company.name = '(终身/套)'
                                    this.company.num = 4
                                    this.company.text = '套'
                                }
                            }
                        })
                        this.dynamicValidateForm.license.forEach(item=>{
                            if(item.productName == this.ruleForm.product){
                                this.$message({
                                    type: 'error',
                                    message: '同一个产品只能添加一次',
                                });
                                k = 1
                            }
                        });
                        if(k == 1){
                            return
                        }
                        this.dynamicValidateForm.license.push({
                            "productName":this.ruleForm.product,
                            "flag":{num:flag,text:this.company.text,name:this.company.name},
                            "timeLongs":'',
                            "timeLong":'',
                            "count":''
                        })
                    }
                }

                    console.log(this.dynamicValidateForm.license,"this.dynamicValidateForm.license")
                    //console.log(this.dynamicValidateForm.license,"this.dynamicValidateForm.license");
//		            let tmp = {};
//		            this.options.forEach(i => {
//		                if (i._id === this.ruleForm.product) {
//		                    tmp = i;
//		                }
//		            });
//		            let arr = this.dynamicValidateForm.license;
//
//		            for (let i = arr.length; i--;) {
//		                if (arr[i].application === tmp._id) {
//		                    this.$message({
//		                        type: 'error',
//		                        message: '同一个产品只能添加一次',
//		                    });
//		                    return;
//		                }
//		            }
//		            if (this.ruleForm.type === '1') {
//		                this.dynamicValidateForm.license.push({
//                            timeLong: 7,
//                            productName: tmp.applicationName,
//		                    application: tmp._id
//		                });
//		            } else {
//		                this.dynamicValidateForm.license.push({
//		                    years: 1,
//                            timeLong: 7,
//                            productName: tmp.applicationName,
//		                    application: tmp._id,
//                            unit:tmp.unit,
//                            unit2:tmp.unit2
//		                });
//		            }


		            //console.log(this.dynamicValidateForm.license)


        },

        handleCurrentChange(val) {
            this.cur_page = val;
            // this.getData();
        },

        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //试用提交和重置按钮
        submitForm(formName) {
            if (this.dynamicValidateForm.license.length < 1) {
                this.$message({
                    type: 'error',
                    message: '请添加产品',
                });
                return;
            }
            //console.log(this.options,"this.options");
            this.$refs[formName].validate((valid) => {
                this.dynamicValidateForm.license.forEach((item,index)=>{
                    this.options.forEach((i,num)=>{
                        if(item.productName == i.product.productName){
                            item.productId = i.product.productId;
                            delete item.productName;
                        }
                    })
                })
                //console.log(this.dynamicValidateForm.license,"this.dynamicValidateForm.license");
                let arr = {
                    "products":this.dynamicValidateForm.license,
                    "id":this.$route.params.id
                }
                console.log(arr,"arr-------")
                api.addCusPer(arr).then(data=>{
                    console.log(data,"api");
                    this.$message({
                        type: 'success',
                        message: '授权成功',
                    });
                    this.dynamicValidateForm.license = [];
                    this.dialogFormVisible = false;
                    this.getData()
                }).catch(error=>{
                    console.log(error,"error")
                })
//                console.log(arr)
//                    if(valid){
//                        api.addCusPer(arr).then(data=>{
//                            console.log(data,"data")
//                        }).catch(error=>{
//                            console.log(error,"error")
//                        })
//                    }
//                if(valid){
//                    let dayNum =
//                }
//                console.log(this.dynamicValidateForm.license);
//                if (valid) {
//                    let data = {
//                        _csrf: this._csrf,
//                        type: this.ruleForm.type,
//                        customer: this.$route.params.id,
//                        // authCode: this.ruleForm.authCode,
//                        child: this.dynamicValidateForm.license
//                    };
//
//                    this.$store.dispatch('AddLicense', data)
//                        .then(res => {
//                            this.$message({
//                                type: 'info',
//                                message: '添加成功',
//                            });
//                            this.$refs[formName].resetFields();
//                            this.dynamicValidateForm.license.length = 0;
//                            this.dialogFormVisible = false;
//                            getData(this);
//                        })
//                        .catch(error => {
//                            if (error.data.err.count <= 0) {
//                                this.$message({
//                                    type: 'error',
//                                    message: '产品 [' + error.data.err.app.applicationName + '] 授权数量不足'
//                                });
//                            } else {
//                                this.$message({
//                                    type: 'error',
//                                    message: '未知错误'
//                                });
//                            }
//                        });
//                } else {
//                    console.log('error submit!!');
//                    return false;
//                }
            });
        },
        //续费保存
        renewSub(formName){
            if (this.dynamicValidateForm.license.length < 1) {
                this.$message({
                    type: 'error',
                    message: '请添加产品',
                });
                return;
            }
            let arr = {};
            this.dynamicValidateForm.license.forEach((item,index)=>{
                if(!item.timeLong){
                    delete item.timeLong
                }
                if(!item.count){
                    delete item.count
                }
                delete item.timeLongs;
                this.options.forEach((i,num)=>{
                    if(item.productName == i.product.productName){
                        item.productId = i.product.productId;
                        delete item.productName
                    }
                });
                arr = {
                    "products":this.dynamicValidateForm.license,
                    "id":this.$route.params.id
                };

            });

            arr.products.forEach(item=>{
                delete item.flag
            });
            api.addCusPer2(arr).then(data=>{
                console.log(data,"api")
                this.$message({
                    type: 'success',
                    message: '续费授权成功',
                });
                this.dynamicValidateForm.license = [];
                this.dialogFormVisible = false;
                this.getData()
            }).catch(error=>{
                console.log(error,"error")
            })

            console.log(arr,"-----arr-------");


//
//            this.$refs[formName].validate((valid) => {
//                    this.dynamicValidateForm.license.forEach((item,index)=>{
//                        this.options.forEach((i,num)=>{
//                            if(item.productName == i.product.productName){
//                                item.productId = i.product.productId;
//                                delete item.productName;
//                            }
//                        })
//                    })
//            });
            //console.log(this.dynamicValidateForm.license,"this.dynamicValidateForm.license111")
                    //console.log(this.dynamicValidateForm.license,"this.dynamicValidateForm.license");
//                    let arr = {
//                        "products":this.dynamicValidateForm.license,
//                        "id":this.$route.params.id,
//                        "number":this.ruleForm.num
//                    }
//                    console.log(arr,"arr")
//                    api.addCusPer2(arr).then(data=>{
//                        console.log(data,"api")
//                    }).catch(error=>{
//                        console.log(error,"error")
//                    })
//            if (this.dynamicValidateForm.license.length < 1) {
//                this.$message({
//                    type: 'error',
//                    message: '请添加产品',
//                });
//                return;
//            }
//
//            this.$refs[formName].validate((valid) => {
//                if(valid){
//                   let obj = {
//                       "products" : this.dynamicValidateForm.license,
//                       "id" : this.$route.params.id
//                   }
//                   //console.log(obj)
//                }
//            })
        },
        resetForm(formName) {
            this.dynamicValidateForm.license.length = 0;
            this.$refs[formName].resetFields();
        }
    },
}
</script>

<style scoped>
    .license-left{ float: left}
    .license-right{ float: right}
.handle-box {
    margin-bottom: 20px;
}

.handle-del {
    border-color: #bfcbd9;
    color: #999;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.butt1and2 {
    float: right;
}

.text {
    font-size: 15px;
}

.item {
    padding: 18px;
}

.box-card {
    padding: 0 0 0 0px;
    background-color: #fbfdff;
    box-shadow: inset 0 0px 5px 0 rgba(0, 0, 0, .12);
}
.compHead{ height: 90px;width: 100%;background: #fff;}
.compHead p{ color:#999;font-size: 24px; height: 60px;line-height: 60px;}
.compHead>div:first-child{ display: inline-block;float: left;margin-left: 33px; }
.retBtn{ clear:both;position: absolute;right:40px;top:28px;}
.box-card{width: 670px; box-shadow: none;}
/*.el-form-item__error{ left: 90px;}*/
.renew p{ float: left;}
.renew .el-select{ float: right; width: 100px;}
.renew .el-input{width: 50px; float: right; margin:0 5px 0 10px ;}
.renew p span{color: red;}
.renew>div>span{ float: right;}
.el-card__body{ padding-right:10px !important;}
.el-date-editor{ width: 200px !important;}
.context-cust{box-sizing: border-box; background: rgb(255,255,255); margin: 20px; padding: 40px 20px 24px 20px; border-top: 4px solid rgb( 230,235,237)}
.useForever{ text-align: right;color:rgb(0,172,141)}
.license-right span{ text-align: right;color:rgb(0,172,141)}
    .dayNum{ float: right; margin-top: 6px;}
    .day{ float: right;}
</style>


<!--续费授权-->
<!--时间段的天数可以转换，但不知道怎么push进去-->