<style lang="less">
@import '../../styles/common.less';
@import './index.less';
</style>
<template>
    <div>
        <Card :dis-hover=true>
            <Row :gutter="16">
                <Col span="3">
                <Select v-model="search">
                    <Option value="productName">产品名称</Option>
                    <Option value="uniqueFlag">标识符</Option>
                </Select>
                </Col>
                <Col span="4">
                <Input v-model="value" placeholder="请输入产品名称或标识符"></Input>
                </Col>
                <Col span="3">
                <Select v-model="productClass">
                    <Option value='0'>全部分类</Option>
                    <Option v-for="(item,index) in classificationList" :value="item.value" :key="index">
                        {{item.name}}
                    </Option>
                </Select>
                </Col>
                <Col span="3">
                <Select v-model="productType" placeholder="全部品类">
                    <Option value='0'>全部品类</Option>
                    <Option v-for="(item,index) in categoryList" :value="item.value" :key="index">
                        {{item.name}}
                    </Option>
                </Select>
                </Col>
                <Col span="11">
                <Button type="ghost" icon="ios-search" @click="searchBtn">查询</Button>
                <Button type="ghost" icon="plus-round" @click="productAdd">添加</Button>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columnsList="tableProductColumns" :tableData="tableProductData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getAllProduct"></page-com>
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
            search: 'productName',
            productType: '0',
            productClass: '0',
            searchObj: {},
            classificationList: [
                // {"name":"全部分类"},
                {
                    "name": "行业应用",
                    value: 1,
                }, {
                    "name": "社群应用",
                    value: 2
                }, {
                    "name": "社交管理",
                    value: 3
                }, {
                    "name": "内容推广",
                    value: 4
                }, {
                    "name": "运营小工具",
                    value: 5
                }
            ], //全部分类ops
            categoryList: [
                // {"name":"全部品类"},
                {
                    "name": "创客版",
                    value: 1
                }, {
                    "name": "企业版",
                    value: 2
                }, {
                    "name": "集团版",
                    value: 3
                }, {
                    "name": "通用版",
                    value: 4
                }
            ],
            tableProductColumns: []
        }
    },
    computed: mapGetters({
        tableProductData: 'productData',
        count: 'productDataCount'
    }),
    methods: {
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {},
        productAdd() {
            util.openNewPage(this, 'product_account_add');
            this.$router.push({
                name: 'product_account_add'
            });
        },
        searchBtn() {
            if (this.productClass && this.productClass != 0) {
                this.searchObj.productClass = this.productClass;
            }
            if (this.productType && this.productType != 0) {
                this.searchObj.productType = this.productType;
            }
            if (this.value) {
                let prop = this.search;
                this.searchObj[prop] = this.trim(this.value);
            }
            console.log(this.searchObj, '5454');

            this.$store.dispatch('getAllProduct', this.searchObj)
        }
    },
    created() {
        this.tableProductColumns = tableData.tableProductColumns
    }
};
</script>
