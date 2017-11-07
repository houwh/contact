<style lang="less">
@import '../../styles/common.less';
@import './account.less';
</style>
<template>
    <div>
        <Card :dis-hover=true>
            <Row :gutter="16">
                <Col span="3">
                <Select v-model="search" style="width:120px">
                    <Option value="licenseNo">授权编号</Option>
                    <Option value="contractSerial">合同编号</Option>
                    <Option value="orderNo">订单编号</Option>
                    <Option value="creator">授权人</Option>
                </Select>
                </Col>
                <Col span="4">
                <Input v-model="value" placeholder="仅支持精确匹配"></Input>
                </Col>
                <Col span="3">
                <Select v-model="licenseType2" style="width:120px">
                    <Option value="0">全部类型</Option>
                    <Option value="1">试用</Option>
                    <Option value="2">续费</Option>
                </Select>
                </Col>
                <Col span="3">
                <Select v-model="licenseState2" style="width:120px">
                    <Option value="0">全部状态</Option>
                    <Option value="1">待付款</Option>
                    <Option value="2">已开通</Option>
                </Select>
                </Col>
                <Col span="2">
                <Button type="ghost" icon="ios-search" @click='searchBtn'>查询</Button>
                </Col>
                <Col span='9'>
                <Button type="ghost" @click="application = true" v-if="userRoleType!=5">
                    试用申请
                </Button>
                <Button type="ghost" @click="modal6 = true" v-if="userRoleType!=5">
                    授权申请
                </Button>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columns-list="customerLicenseColumns" :table-data="customerLicenseData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getCusPer" :cusId="id"></page-com>
        </Card>
        <!--试用申请按钮-->
        <Modal v-model="application" title="试用申请" width="47%" @on-cancel="handleReset1()" :mask-closable="false">
            <row>
                <Col span="18">
                <Select ref="trailSelect" v-model="applicationName" placeholder="请选择试用产品">
                    <Option v-for="(item,index) in TrialProducts" :value="item.productName" :key="index">{{item.productName}}</Option>
                </Select>
                </col>
                <col span="6">
                <Button type="ghost" @click="addProduct">
                    添加
                </Button>
                </col>
            </row>
            <div class="prodSelected">
                <p v-for="(item,i) in tryPro">
                    <span class="proNameapp">{{ item.productName }}</span>
                    <input type="text" name="" style="width:50px;height: 20px; outline: none" size="small" v-model="item.timeLong" class="dayNum">天
                    <Button type="error" @click="deleteProduct(i)" size="small" class="miniBtn2">
                        删除
                    </Button>
                </p>
            </div>
            <div slot="footer">
                <Button type="ghost" size="large" @click="yesTry('formValidate')">添加</Button>
                <Button type="ghost" size="large" @click="handleReset1('formValidate')">重置</Button>
            </div>
        </Modal>
        <!-- 授权申请 -->
        <Modal v-model="modal6" title="授权申请" width="600" @on-cancel="handleReset2" :mask-closable="false">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" inline>
                <Form-item label="合同编号" prop="contractSerial">
                    <Input v-model="formValidate.contractSerial" style="width:300px" placeholder="请输入本次合同编号"></Input>
                </Form-item>
                <Form-item label="合同金额" prop="amount">
                    <Input v-model="formValidate.amount" style="width:300px" placeholder="请输入本次合同总金额"></Input>
                </Form-item>
                <Form-item label="授权产品" prop="productName">
                    <Select ref="productSelect" v-model="formValidate.productName" placeholder="请选择产品" style="width:300px">
                        <Option v-for="(item,index) in proAll" :value="item.productName" :key="index">{{ item.productName }}</Option>
                    </Select>
                </Form-item>
                <Button type="success" @click="addProduct2">
                    添加
                </Button>
            </form>
            <div class="prodSelected">
                <div v-for="(item,i) in authoriPro" style="overflow: hidden">
                    <div class="Licensed-left">
                        <span class="proName">{{ item.productName }}</span>
                        <span class="unit">{{item.unit}}</span>
                    </div>
                    <div class="Licensed-right">
                        <Select v-model="item.timeLong1" placeholder="请选择年限" style="width:100px" v-if="item.flog == true && item.unit == '年/套'">
                            <Option :value="365" label="1年"></Option>
                            <Option :value="730" label="2年"></Option>
                            <Option :value="1095" label="3年"></Option>
                        </Select>
                        <!-- 默认函数不能传参，声明一个带有参数的函数！并且把默认的函数当做参数传递 -->
                        <Select v-model="item.timeLong2" placeholder="请选择年限" style="width:100px" v-if="item.flog ==true && item.unit == '年/坐席' ">
                            <Option :value="365" label="1年"></Option>
                            <Option :value="730" label="2年"></Option>
                            <Option :value="1095" label="3年"></Option>
                        </Select>
                        <span v-if="item.unit == '终身/套'" style="color: green;">终身使用权</span>
                        <span v-if="item.unit == '人/次'" style="color: green;">终身使用权,按使用次数付费</span>
                        <Select v-model="timeLong" placeholder="请选择产品" style="width:100px" @on-change="time" v-if="item.appLication==4">
                            <Option :value="365" label="1年"></Option>
                            <Option :value="730" label="2年"></Option>
                            <Option :value="1095" label="3年"></Option>
                        </Select>
                        <Input v-model="item.count" placeholder="单位" style="width: 100px" v-show=" item.unit == '年/坐席' "></Input>
                        <span style="color:green" v-show=" item.unit == '终身/套' || item.unit == '年/套'">/1套</span>
                        <span v-show="item.unit == '年/坐席' ">坐席</span>
                        <Button type="error" @click="deleteProduct2(i)" size="small" class="miniBtn1">
                            删除
                        </Button>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button type="success" size="large" @click="yesAuthori('formValidate')">添加</Button>
                <Button type="default" size="large" @click="handleReset2('formValidate')">重置</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import EditableTable from '../../components/editableTable.vue';
import PageCom from '../../components/page.vue';
import tableData from '../../components/table_data.js';
import util from '../../libs/util.js';
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex'

export default {
    components: {
        EditableTable,
        PageCom
    },
    data() {
        const validateAmount = (rule, value, callback) => {
            if (value) {
                if ((+value) % 1 != 0) {
                    callback(new Error('请输入正确合同金额'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            // 搜索
            icenseType2: '0', //搜索
            licenseState2: '0', //搜索
            licenseType: '', //查看按钮当前类型
            search: "contractSerial",
            value: '',
            licenseType2: '0',
            licenseState2: '0',
            id: this.$route.query.id,
            userRoleType: this.$route.query.userRoleType,
            customerLicenseColumns: [],
            searchObj: {},
            application: false,
            modal6: false,
            applicationName: '',
            TrialProducts: [],
            tryPro: [], //添加的试用申请
            authoriPro: [], //添加的正式授权
            formValidate: {
                contractSerial: '', //合同编号
                amount: '', //合同金额
                productId: '',
                timeLong1: '',
                timeLong2: '',
                count: '',
            },
            productName: '',
            date: '',
            state2: '',
            contractSerial: '',
            licenseType2: '0', //搜索
            licenseState2: '0', //搜索
            licenseType: '', //查看按钮当前类型
            licenseState: '',
            licenseDetail: {},
            licenseId: '',
            proAll: [],
            proArr: [],
            tryProDays: [],

            ruleValidate: {
                contractSerial: [{
                    required: true,
                    message: '合同编号不能为空',
                    trigger: 'blur'
                }, ],
                amount: [{
                    required: true,
                    message: '合同金额不能为空',
                    trigger: 'blur'
                }, {
                    validator: validateAmount,
                    trigger: 'blur'
                }],
                productName: [{
                    required: true,
                    message: '授权产品不能为空',
                    trigger: 'blur'
                }, ],
            },
        };
    },
    computed: mapGetters({
        customerLicenseData: 'cusLicenseData',
        count: 'cusLicenseDataCount'
    }),
    methods: {
        trim(str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        },
        searchBtn() {
            // 查找
            this.searchObj = {
                // page: this.pageCount, //第几页
                // size: this.pageSize,
                id: this.$route.query.id,
            };
            let prop = this.search;
            if (this.value) {
                this.searchObj[prop] = this.value;
            }
            if (this.licenseType2 && this.licenseType2 != 0) {
                this.searchObj.licenseType = this.licenseType2;
            }
            if (this.licenseState2 && this.licenseState2 != 0) {
                this.searchObj.licenseState = this.licenseState2;
            }
            console.log(this.searchObj, '5454');

            this.$store.dispatch('getCusPer', this.searchObj)

        },
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {},
        //            添加产品
        addProduct() {
            // 判断一下是否是第二次添加
            this.tryPro.forEach((item, i) => {
                if (item.productName == this.applicationName) {
                    this.$Message.warning('同一个产品只能添加一次');
                    callback();
                }
            })
            if (!this.applicationName) {
                this.modalSystem = true;
                this.systemMessage = '请选择一个试用产品'
            } else {
                this.tryPro.push({
                    productName: this.applicationName,
                    timeLong: 7,
                });
                this.tryPro = this.tryPro
            }
        },
        getProduct() {
            // 获取产品。。
            this.$store.dispatch('getAuthoriPro', {
                page: 1,
                size: 50
            }).then(res => {
                console.log(res, 'effective product');
                this.proAll = res.data.docs.rows;
                // 如果产品下架，不能被授权
                this.proAll.forEach((item, index) => {
                    if (item.freeTrial == true) {
                        // 所有的试用产品
                        this.TrialProducts.push(item);
                    }

                    switch (item.productUnit) {
                        case 1:
                            item.unit = '年/套';
                            break;
                        case 2:
                            item.unit = '年/坐席';
                            break;
                        case 3:
                            item.unit = '人/次';
                            break;
                        case 4:
                            item.unit = '终身/套';
                            break;
                    }
                })
            }).catch(err => {
                console.log(err);
            })
        },
        //授权产品添加
        addProduct2() {
            for (let i = 0; i < this.authoriPro.length; i++) {
                if (this.formValidate.productName == this.authoriPro[i].productName) {
                    this.$Message.warning('同一个产品只能添加一次');
                    return;
                }
            }
            this.proAll.forEach(item3 => {
                if (!this.formValidate.productName) {
                    this.$Message.warning('请选择一个授权产品');
                }
                if (item3.productName == this.formValidate.productName) {
                    // 是终身的单位  终身/套  人次
                    if (item3.productUnit == 4 || item3.productUnit == 3) {
                        this.$store.dispatch('oneLifePro', {
                            cusId: this.id,
                            proId: item3.productId,
                        }).then(data => {
                            console.log(data, '1111111111')
                            if (data.data.success == false) {
                                this.$Message.warning(data.data.message);
                                this.lifeFlag = false;
                                return;
                            } else {
                                this.lifeFlag = true;
                                this.authoriPro.push({
                                    productName: this.formValidate.productName,
                                    // count: this.authoriPro.count,
                                    count: 1,
                                    flog: true, //来判断日期控件是否显示
                                });
                                this.addUnit();
                            }
                        }).catch(err => {
                            return false;
                        })
                    } else {
                        // 年/套    年/坐席
                        this.lifeFlag = true;
                        this.authoriPro.push({
                            productName: this.formValidate.productName,
                            count: this.authoriPro.count || 1,
                            flog: true, //来判断日期控件是否显示
                        });
                        this.addUnit();
                    }
                }
            })
        },
        // 试用申请  确认/取消按钮
        yesTry() {
            if (this.tryPro.length == 0) {
                this.$Message.error('请添加试用产品');
                return;
            }
            let dayNum = document.getElementsByClassName('dayNum');

            console.log(dayNum[0].value, '123435432232')

            for (let a = 0; a < dayNum.length; a++) {
                if (dayNum[a].value < 1 || dayNum[a].value % 1 != 0) {
                    this.$Message.error('试用产品时长必须为大于0的整数');
                    return false;
                }
                this.tryProDays.push(dayNum[a].value); //
            }
            for (let i = 0; i < this.proAll.length; i++) {
                for (let m = 0; m < this.tryPro.length; m++) {
                    if (!this.tryPro[m].timeLong) {
                        this.$Message.error('试用产品时长为空');
                        this.tryPro.pop();
                        return;
                    }
                    if (this.proAll[i].productName == this.tryPro[m].productName) {
                        this.tryPro[m].productId = this.proAll[i].productId;
                        delete this.tryPro[m].productName;


                        if (this.tryPro[m].timeLong > this.proAll[i].trialDays) {
                            this.$Message.error('试用时间超出最大天数');
                            this.tryPro.pop();
                            return;
                        }
                    }
                }
            }

            if (this.tryPro.length != 0) {
                this.$store.dispatch('addCusPer', {
                    "products": this.tryPro,
                    "id": this.id
                }).then(data => {
                    this.modal4 = false;
                    this.tryPro = [];
                    // this.handleReset();  //清空操作
                    this.$store.dispatch('getCusPer', {
                        page: 1,
                        size: 10
                    })
                    this.$Message.success('试用申请成功');
                    location.reload();
                }).catch(err => {
                    document.getElementsByClassName('prodSelected')[0].innerHTML = '';
                    this.product = '';
                });
            }
        },
        // 授权申请  确认/取消按钮
        yesAuthori(name) {
            this.$refs[name].validate((valid) => {
                let obj = {};
                this.modal6 = true;
                if (valid) {
                    for (let m = 0; m < this.proAll.length; m++) {
                        let item = this.proAll[m];
                        for (let n = 0; n < this.authoriPro.length; n++) {
                            // 将name转为id
                            if (this.authoriPro[n].productName == this.proAll[m].productName) {
                                this.authoriPro[n].productId = this.proAll[m].productId;
                                delete this.authoriPro[n].flog;
                                delete this.authoriPro[n].unit;
                            }
                            // 判断空和有效值
                            if (this.authoriPro[n].unit == "年/套") {
                                if (!this.authoriPro[n].timeLong1) {
                                    this.$Message.error('授权产品时长不能为空!');
                                    return;
                                }
                            } else if (this.authoriPro[n].unit == "年/坐席") {
                                if (!this.authoriPro[n].timeLong2) {
                                    this.$Message.error('授权产品时长不能为空!');
                                    return;
                                }
                                if (!this.authoriPro[n].count) {
                                    this.$Message.error('授权数量不能为空!');
                                    return;
                                }
                            }
                        }
                    };
                    obj = {
                            id: this.id,
                            products: this.authoriPro,
                            contractSerial: this.formValidate.contractSerial,
                            amount: this.formValidate.amount,
                        },
                        this.$store.dispatch('addCusPer2', obj).then(data => {
                            this.modal6 = false;
                            this.$Message.success('授权申请成功');
                            this.$store.dispatch('getCusPer', {
                                    page: 1,
                                    size: 10
                                })
                                // location.reload();
                        }).catch(err => {
                            console.log(err);
                        })
                } else {
                    this.modal6 = true;
                    this.$Message.error('验证失败');
                }
            })
        },
        // 变换单位
        addUnit() {
            // 遍历被添加的产品，获得相应单位
            this.authoriPro.forEach((hisPro, hisI) => {
                this.proAll.forEach((pro, i) => {
                    if (pro.productName == hisPro.productName) {
                        hisPro.unit = pro.unit;
                    }
                })
            })
        },
        // 重置按钮
        handleReset1() {
            this.applicationName = '';
            this.$refs['trailSelect'].clearSingleSelect();
            // this.product = '';
            this.tryPro = [];
        },
        handleReset2(name) {
            this.$refs["productSelect"].clearSingleSelect();
            // this.$refs[name].resetFields();
            this.authoriPro = [];
        },
        deleteProduct(i) {
            this.tryPro.splice(i, 1);
        },
        deleteProduct2(i) {
            this.authoriPro.splice(i, 1);
        },
    },
    created() {
        this.customerLicenseColumns = tableData.customerLicenseColumns;
        this.getProduct();
    }
};
</script>
<style lang="less" scoped>
.search-filter {
    opacity: 0;
    display: none;
    overflow: hidden;
    transition: all 0.28s ease-out;
    &.active {
        opacity: 1;
        display: block;
    }
}

.boxselct {
    margin-bottom: 10px;
}

.prodadd {
    color: #fff;
}

button {
    margin-left: 20px
}

.prodSelected {
    height: 200px;
    width: 100%;
    background: rgba(242, 242, 242, 1);
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 5px 20px 5px 0;
}

.prodSelected div {
    line-height: 32px;
    padding: 3px 0;
}

.prodSelected ul {
    text-indent: 20px;
}

.prodSelected ul li {
    display: inline-block;
}

.prodSelected ul li:last-child {
    text-indent: 0;
}

.Licensed-left {
    float: left
}

.Licensed-right {
    float: right
}

.proNameapp {
    width: 30%;
    display: inline-block;
    text-indent: 20px;
}

.proName {
    display: inline-block;
    text-indent: 20px;
}

.unit {
    display: inline-block;
    color: red;
}

p {
    height: 44px;
    line-height: 44px;
}


/*.miniBtn1{ margin-left: 20%; }*/

.miniBtn2 {
    margin-left: 20%
}

.dayNum {
    margin-left: 20%;
    text-align: center;
}

.miniBtn {
    margin-left: 62px;
}

ul li {
    height: 44px;
    line-height: 44px;
}

.checkbox {
    padding-left: 70px
}

h4 {
    text-align: center;
    padding-top: 7px;
    padding-bottom: 7px;
}

.h4Font {
    font-size: 20px
}

.hisName {
    margin-left: 20px;
}

.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}
</style>
