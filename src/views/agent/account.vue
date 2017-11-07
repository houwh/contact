<style lang="less">
@import '../../styles/common.less';
@import './account.less';
</style>
<template>
    <div>
        <Card :dis-hover=true>
            <Row :gutter='16'>
                <Col span="3">
                <Select v-model="search">
                    <Option value="username">登录名</Option>
                    <Option value="userTel">联系人手机</Option>
                    <Option value="creator">开户人</Option>
                </Select>
                </Col>
                <Col span="3">
                <Input v-model="value" placeholder="仅支持精确匹配"> </Input>
                </Col>
                <Col span="3">
                <Select v-model="isFreeze">
                    <Option value="0">全部状态</Option>
                    <!-- <Option value="1">待完善</Option> -->
                    <Option value="3">已开通</Option>
                    <Option value="2">已冻结</Option>
                </Select>
                </Col>
                <Col span="15">
                <Button type="ghost" icon="ios-search" @click="searchBtn">查询</Button>
                <Button type="ghost" icon="plus-round" @click="addAgent">开户</Button>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columnsList="tableAgentColumns" :tableData="tableAgentData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getAllAgent"></page-com>
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
            agentType: '0',
            isFreeze: '0',
            tableAgentColumns: [],
            searchObj: {}
        }
    },
    computed: mapGetters({
        tableAgentData: 'agentData',
        count: 'agentDataCount'
    }),
    methods: {
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {},
        addAgent() {
            util.openNewPage(this, 'agent_account_add');
            this.$router.push({
                name: 'agent_account_add'
            });
        },
        trim(str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        },
        searchBtn() {
            if (this.agentType && this.agentType != 0) {
                this.searchObj.agentType = this.agentType;
            }
            if (this.isFreeze && this.isFreeze != 0) {
                this.searchObj.isFreeze = this.isFreeze;
            }
            if (this.value) {
                let prop = this.search;
                this.searchObj[prop] = this.trim(this.value);
            }
            console.log(this.searchObj, '5454');

            this.$store.dispatch('getAllAgent', this.searchObj)
        },
    },
    created() {
        this.tableAgentColumns = tableData.tableAgentColumns;
    }
};
</script>
