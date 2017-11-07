<style lang="less">
@import '../../styles/common.less';
@import './account.less';
</style>
<template>
    <div>
        <Card :dis-hover=true>
            <Row :gutter="16">
                <Col span="3">
                <Select v-model="search">
                    <Option value="username">登录名</Option>
                    <Option value="userTel">联系人手机</Option>
                    <Option value="creator">开户人</Option>
                </Select>
                </Col>
                <Col span="4">
                <Input v-model="value" placeholder="仅支持精确匹配"></Input>
                </Col>
                <Col span="3">
                <Select v-model="isFreeze" style="width:120px">
                    <Option value="0">全部状态</Option>
                    <!-- <Option value="1">待完善</Option> -->
                    <Option value=true>已冻结</Option>
                    <Option value=false>已开通</Option>
                </Select>
                </Col>
                <Col span="2">
                <Button type="ghost" icon="ios-search" @click='searchBtn'>查询</Button>
                <Button type="success" @click="application = true" v-if="userRoleType!=5">
                    试用申请
                </Button>
                <Button type="success" @click="modal6 = true" v-if="userRoleType!=5">
                    授权申请
                </Button>
                </Col>
                <Col span='12'>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columns-list="agentLicenseColumns" :table-data="agentLicenseData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getAgePer" :ageId="id"></page-com>
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
                <Button type="success" @click="addProduct">
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
                <Button type="success" size="large" @click="yesTry('formValidate')">添加</Button>
                <Button type="default" size="large" @click="handleReset1('formValidate')">重置</Button>
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
                        <!-- 12232343444444444444 -->
                        <Select v-model="item.timeLong1" placeholder="请选择年限" style="width:100px" @on-change="v=>{ setOption2(v,item.productName)}" v-if="item.flog == true && item.unit == '年/套'">
                            <Option :value="365" label="1年"></Option>
                            <Option :value="730" label="2年"></Option>
                            <Option :value="1095" label="3年"></Option>
                            <!-- <Option :value="4" label="自定义"></Option> -->
                        </Select>
                        <!-- 默认函数不能传参，声明一个带有参数的函数！并且把默认的函数当做参数传递 -->
                        <Select v-model="item.timeLong2" placeholder="请选择年限" style="width:100px" @on-change="v=>{ setOption(v,item.productName)}" v-if="item.flog ==true && item.unit == '年/坐席' ">
                            <Option :value="365" label="1年"></Option>
                            <Option :value="730" label="2年"></Option>
                            <Option :value="1095" label="3年"></Option>
                            <!-- <Option :value="4" label="自定义"></Option> -->
                        </Select>
                        <!-- <DatePicker type="daterange" placeholder="选择日期" value="YYYY-MM-DD" v-model="item.timeLong3" v-if="item.flog == false && item.unit == '年/套'" @on-change="v=>{ setOption3(v,item.productName)}"></DatePicker>
                        <DatePicker type="daterange" placeholder="选择日期" value="YYYY-MM-DD" v-model="item.timeLong4" v-if="item.flog == false && item.unit == '年/坐席'" @on-change="v=>{ setOption4(v,item.productName)}"></DatePicker> -->
                        <span v-if="item.unit == '终身/套'" style="color: green;">终身使用权</span>
                        <span v-if="item.unit == '人/次'" style="color: green;">终身使用权,按使用次数付费</span>
                        <Select v-model="timeLong" placeholder="请选择产品" style="width:100px" @on-change="time" v-if="item.appLication==4">
                            <Option :value="365" label="1年"></Option>
                            <Option :value="730" label="2年"></Option>
                            <Option :value="1095" label="3年"></Option>
                        </Select>
                        <!-- 2323434444444444444444 -->
                        <!-- <Input v-model="item.count" placeholder="单位" style="width: 100px" v-show=" item.unit == '终身/套' || item.unit == '年/套'"></Input> -->
                        <Input v-model="item.count" placeholder="单位" style="width: 100px" v-show=" item.unit == '年/坐席' "></Input>
                        <!-- <span v-show="item.unit == '年/套'|| item.unit == '终身/套'">套</span> -->
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
        <!--试用查看弹出框-->
        <Modal v-model="modal4" title="查看试用申请" width="470" v-if="licenseType==1" @no-cancel="handleReset()">
            <div class="checkbox">
                <p>授权编号：{{ licenseDetail.licenseNo}}</p>
                <p>申请时间：{{ licenseDetail.createdChin0 }}</p>
                <p>付款审核时间：{{ licenseDetail.effeChin0}}</p>
            </div>
            <div class="prodSelected">
                <h4>试用申请</h4>
                <ul v-for="item in licenseDetail.product">
                    <li>{{ item.productName }}</li>
                    <li style="color:green">({{ item.hisDays }}天)</li>
                    <li style="color:green">[{{ item.hisStart}}~</li>
                    <li style="color:green">{{ item.hisEnd }}]</li>
                </ul>
            </div>
        </Modal>
        <!-- 授权查看弹出框 -->
        <Modal v-model="modal5" title="查看授权申请" width="470" v-if="licenseType==2">
            <div class="checkbox">
                <p>授权编号：{{ licenseDetail.licenseNo}}</p>
                <p v-if="userRoleType!=5">合同编号：{{ licenseDetail.contractSerial.contractSerial}}</p>
                <p v-if="userRoleType!=5">合同金额：<span style="color:red">{{ licenseDetail.contractSerial.amount}}</span></p>
                <p>申请时间：{{ licenseDetail.createdChin0 }}</p>
            </div>
            <div class="prodSelected">
                <h4>授权详情</h4>
                <ul v-for="item in licenseDetail.product">
                    <li>
                        {{ item.productName }}
                        <span style="color:green">
                            （{{ item.hisDays }}, {{ item.count }})
                            <span v-if="item.productUnit ==1 || item.productUnit ==2">
                                <span v-show="licenseState==2">
                                    [{{ item.hisStart }}~{{ item.hisEnd }}]
                                </span>
                        </span>
                        </span>
                    </li>
                </ul>
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
        return {
            // 搜索
            userRoleType: this.$route.query.userRoleType, //当它为5时，授权按钮不显示
            search: 'username',
            value: '',
            isFreeze: '0',
            id: this.$route.query.id,
            searchObj: {},
            agentLicenseColumns: [],
            applicationName: '',
            appLication: '',
            TrialProducts: [],
            addProduct: [],
            tryPro: [],
        };
    },
    computed: mapGetters({
        agentLicenseData: 'ageLicenseData',
        count: 'ageLicenseDataCount'
    }),
    methods: {
        trim(str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        },
        searchBtn() {
            // 查找
            if (this.value) {
                let prop = this.search;
                this.searchObj[prop] = this.trim(this.value);
            }
            if (this.isFreeze && this.isFreeze != 0) {
                this.searchObj.isFreeze = this.isFreeze;
            }
            console.log(this.searchObj, '5454');

            this.$store.dispatch('getAgeSearch', this.searchObj)

        },
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {}
    },
    created() {
        this.agentLicenseColumns = tableData.agentLicenseColumns;
    }
};
</script>
