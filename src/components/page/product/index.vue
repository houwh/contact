<template>
    <div class="table">
        <div class="compHead">
            <div>
                <p>代理产品管理</p>
                <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item> 代理管理 </el-breadcrumb-item>
                        <el-breadcrumb-item> 代理产品管理 </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
    <div class="context">
        <el-row :gutter="24">
            <el-col :span="7">
                <el-input placeholder="请输入产品名称" v-model="input_cond">
                </el-input>
            </el-col>
            <el-col :span="17">
                <div class="handle-box" style="float: left;" @click="searchProduct">
                    <el-button type="primary" >查询</el-button>
                </div>
            </el-col>
        </el-row>

        <el-table :data="tableData" border style="width: 100%" :highlight-current-row=true>
            <el-row>
                <el-table-column prop="idx" label="序号"></el-table-column>
                <el-table-column prop="product.productName" label="产品名称" :span="5"></el-table-column>
                <el-table-column prop="sum" label="购买总量" :span="5"></el-table-column>
                <el-table-column prop="avalid" label="剩余数量" :span="5"></el-table-column>
                <!-- <el-table-column prop="" label="操作" :span="5"></el-table-column> -->
            </el-row>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="current1"
                    layout="total,prev, pager, next, jumper"
                    :total="pageCount">
            </el-pagination>
            <!--<el-pagination-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page.sync="current1"-->
                    <!--layout="total,prev, pager, next, jumper"-->
                    <!--:total="pageCount">-->
            <!--</el-pagination>-->
            <!--<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="pageCount">-->
            <!--</el-pagination>-->
        </div>
    </div>
    </div>

</template>

<script>
import api from '../../../api';
export default {
    data() {
        return {
            current1:1,
            input_cond: '',
            pageCount: 0,
            tableData: [],
            array: [],
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            applicationName: '',
            count: 0,
            balance: 0,
            idx: 0
        }
    },
    mounted() {
        api.getProduct().then(data => {
            console.log(data,"product")
            this.tableData = data.data.doc.rows;
            this.pageCount = data.data.doc.count;
            var idx = 1 == 1? 1 : 1-1+'1';
            this.tableData.forEach((item,index)=>{
                this.tableData[index].idx = idx++;
            })
//            this.array = Object.values(data.docs);
//            this.tableData = this.array.slice(0, 10);
//            this.tableData.forEach((item, index) => {
//                this.tableData[index].balance = item.count - item.trans;
//                this.tableData[index].idx = ++index;
//            });
//            this.pageCount = this.array.length;
        }).catch();
    },
    methods: {
        searchProduct(){
            let obj = {};
            if(this.input_cond){
                obj = {
                    productName : this.input_cond,
                    page : 1,
                    size:10
                }
            }
            console.log(obj)
            api.searchProduct(obj).then(data=>{
                this.tableData = data.data.doc;
                var idx = 1 == 1? 1 : 1-1+'1';
                this.tableData.forEach((item,index)=>{
                    this.tableData[index].idx = idx++;
                })
            }).catch(error=>{
                console.log(error,"error")
            })
        },
        handleCurrentChange(val) {
            this.cur_page = val || 1;
            let start = (val - 1) * 10;
            let end = start + 10;
            this.tableData = this.array.slice(start, end);
            this.tableData.forEach((item, index) => {
                this.tableData[index].balance = item.count - item.trans;
                this.tableData[index].idx = ++index;
            });
            this.pageCount = this.array.length;
        },
        getData() {

        },
    }
}
</script>

<style scoped>
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
.compHead{ height: 90px;width: 100%;background-color: #fff;}
.compHead p{ color:#999;font-size: 24px; height: 60px;line-height: 60px;}
.compHead>div:first-child{ display: inline-block;float: left;margin-left:33px;}
.context{box-sizing: border-box; background: rgb(255,255,255); margin: 20px; padding: 40px 20px 24px 20px; border-top: 4px solid rgb( 230,235,237)}
</style>
