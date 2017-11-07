<style lang="less">
@import '../../styles/common.less';
@import './revenue.less';
</style>
<template>
    <div>
        <Card :dis-hover=true>
            <Row :gutter="16">
                <Col span='3'>
                <Select v-model="search">
                    <Option value="licenseNo">授权编号</Option>
                    <Option value="licenseNo2">订单编号</Option>
                    <Option value="contractSerial">合同编号</Option>
                    <Option value="payment">凭证号</Option>
                    <Option value="user">客户登录名</Option>
                    <Option value="creator">创建人</Option>
                </Select>
                </Col>
                <Col span='4'>
                <Input v-model="value" placeholder="仅支持精准匹配查询">
                </Input>
                </Col>
                <Col span='3'>
                <Select v-model="licenseState">
                    <Option value="0">全部状态</Option>
                    <Option value="1">待付款</Option>
                    <Option value="2">已收款</Option>
                </Select>
                </Col>
                <Col span='3'>
                <!-- 搜索创建日期 -->
                <DatePicker type="daterange" placeholder="选择日期" v-model="createdAt" value="YYYY-MM-DD"></DatePicker>
                </Col>
                <Col span="11">
                <Button type="ghost" icon="ios-search" @click='searchBtn'>查询</Button>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columnsList="tableRevenueColumns" :tableData="tableRevenueData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getRevenue"></page-com>
        </Card>
    </div>
</template>
<script>
import EditableTable from '../../components/editableTable.vue';
import PageCom from '../../components/page.vue';
import tableData from '../../components/table_data.js';
import util from '../../libs/util.js';
import vuex from 'vuex';
import moment from 'moment'
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex';
export default {
    components: {
        EditableTable,
        PageCom
    },
    data() {
        return {
            value: '',
            search: "contractSerial",
            licenseState: '0',
            createdAt: '',
            searchObj: {},
            tableRevenueColumns: []
        }
    },
    computed: mapGetters({
        tableRevenueData: 'revenueData',
        count: 'revenueDataCount'
    }),
    methods: {
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {},
        //去掉空格
        trim(str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        },


        // 搜索
        searchBtn() {
            // params:  'licenseNo', 'contractSerial', 'order', 'payment', 'user','creator','licenseState',  'createdAt'
            // 授权编号，合同编号，订单编号，凭证号，用户登录名，创建人真实姓名，授权状态， 创建时间
            if (this.value) {
                let prop = this.search;
                this.searchObj[prop] = this.trim(this.value);
                if (this.searchObj.licenseNo2) {
                    this.searchObj.licenseNo = this.searchObj.licenseNo2;
                    delete this.searchObj.licenseNo2;
                }
            }
            if (this.createdAt.length != 0) {
                let c = moment(+this.createdAt[0]).format('YYYY-MM-DD')
                let d = moment(+this.createdAt[1]).format('YYYY-MM-DD')
                this.searchObj.createdAt = c + '/' + d;
            } else {}
            if (this.licenseState && this.licenseState != 0) {
                this.searchObj.licenseState = this.licenseState;
            }
            if (this.searchObj.createdAt == "1970-01-01/1970-01-01") {
                delete this.searchObj.createdAt;
            }
            console.log(this.searchObj, '5454');

            this.$store.dispatch('getRevenue', this.searchObj)
        },

    },
    created() {
        this.tableRevenueColumns = tableData.tableRevenueColumns
    }
};
</script>
