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
                </Col>
                <Col span='12'>
                <Button type="ghost" icon="plus-round" @click="showAdd">开户</Button>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columns-list="tableCustomerColumns" :table-data="tableCustomerData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getAllCustomer"></page-com>
        </Card>
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
            search: 'username',
            value: '',
            isFreeze: '0',
            searchObj: {},

            tableCustomerColumns: []
        };
    },
    computed: mapGetters({
        tableCustomerData: 'customerData',
        count: 'customerDataCount'
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

            this.$store.dispatch('getAllCustomer', this.searchObj)

        },
        showAdd() {
            util.openNewPage(this, 'customer_account_add');
            this.$router.push({
                name: 'customer_account_add'
            });
        },
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {}
    },
    created() {
        this.tableCustomerColumns = tableData.tableCustomerColumns;
    }
};
</script>
