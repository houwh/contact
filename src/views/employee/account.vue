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
                    <Option value="userRealName">姓名</Option>
                </Select>
                </Col>
                <Col span="4">
                <Input v-model="value" placeholder="输入完整登录名或姓名"></Input>
                </Col>
                <Col span="17">
                <Button type="ghost" icon="ios-search" @click='searchBtn'>查询</Button>
                <Button type="ghost" icon="plus-round" @click="employeeAdd">添加</Button>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columnsList="tableEmployeeColumns" :tableData="tableEmployeeData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getAllEmployee"></page-com>
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
            search: 'username',
            searchObj: {},
            tableEmployeeColumns: []
        }
    },
    computed: mapGetters({
        tableEmployeeData: 'employeeData',
        count: 'employeeDataCount'
    }),
    methods: {
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {},
        employeeAdd() {
            util.openNewPage(this, 'employee_account_add');
            this.$router.push({
                name: 'employee_account_add'
            });
        },
        searchBtn() {
            if (this.value) {
                let prop = this.search;
                this.searchObj[prop] = this.trim(this.value);
            }
            this.$store.dispatch('getAllEmployee', this.searchObj)
        }
    },
    created() {
        this.tableEmployeeColumns = tableData.tableEmployeeColumns
    }
};
</script>
