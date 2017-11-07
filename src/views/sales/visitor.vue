<style lang="less">
@import '../../styles/common.less';
@import './visitor.less';
</style>
<template>
    <div>
        <Card :dis-hover=true>
            <Row :gutter="16">
                <Col span="3">
                <Select v-model="search">
                    <Option value="customerName">姓名</Option>
                    <Option value="mobile">手机</Option>
                    <Option value="wechat">微信</Option>
                    <Option value="salesType">访客分类</Option>
                    <Option value="operator">处理人</Option>
                </Select>
                </Col>
                <Col span="4">
                <Input v-model="value" placeholder="仅支持精确匹配"></Input>
                </Col>
                <Col span="3">
                <Select v-model="salesState">
                    <Option value="0">全部状态</Option>
                    <Option value="1">待处理</Option>
                    <Option value="2">已处理</Option>
                </Select>
                </Col>
                <Col span="3">
                <Select v-model="search2">
                    <Option value="createdAt">留电时间</Option>
                    <Option value="firstAt">处理时间</Option>
                    <Option value="updatedAt">最近的处理时间</Option>
                </Select>
                </Col>
                <Col span="3">
                <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" v-model="datee" value="YYYY-MM-DD"></DatePicker>
                </Col>
                <Col span="8">
                <Button type="ghost" icon="ios-search" @click="searchBtn">查询</Button>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columnsList="tableVisitorColumns" :tableData="tableVisitorData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getAllVisitor"></page-com>
        </Card>
    </div>
</template>
<script>
import EditableTable from '../../components/editableTable.vue';
import PageCom from '../../components/page.vue';
import tableData from '../../components/table_data.js';
import util from '../../libs/util.js';
import vuex from 'vuex';
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
            search: 'customerName',
            search2: 'createdAt',
            datee: '',
            salesState: '0', //搜索
            searchObj: {},
            tableVisitorColumns: []
        }
    },
    computed: mapGetters({
        tableVisitorData: 'visitorData',
        count: 'visitorDataCount'
    }),
    methods: {
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {},
        searchBtn() {
            if (this.value) {
                let prop = this.search;
                this.searchObj[prop] = this.value;
            }
            if (this.datee.length != 0) {
                let prop2 = this.search2;
                this.searchObj[prop2] = this.datee;
                console.log(toString(this.datee[0]), 13234);
                let c = moment(+this.datee[0]).format('YYYY-MM-DD')
                let d = moment(+this.datee[1]).format('YYYY-MM-DD')
                this.searchObj[prop2] = c + '/' + d;
            }
            if (this.salesState && this.salesState != 0) {
                this.searchObj.salesState = this.salesState;
            }
            console.log(this.searchObj, '5454');
            this.$store.dispatch('getAllVisitor', this.searchObj)
        }
    },
    created() {
        this.tableVisitorColumns = tableData.tableVisitorColumns
    }
};
</script>
