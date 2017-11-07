<template>
    <div class="table">
        <div class="compHead">
            <div>
                <p>客户账号管理</p>
                <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item> 客户管理 </el-breadcrumb-item>
                        <el-breadcrumb-item> 客户账号管理 </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
        <div class="context">
            <el-row :gutter="24">
                <el-col :span="17">
                <!-- 其中filter 主持搜索 -->
                    <el-select v-model="select" filterable placeholder="请选择" style="width: 126px">
                        <el-option label="登录名" value="username" value-key></el-option>
                        <el-option label="联系人手机" value="userTel"></el-option>
                        <el-option label="开户人" value="creator"></el-option>
                    </el-select>
                    <el-input placeholder="请输入产品名称" v-model="input_cond" style="width: 250px">
                    </el-input>
                    <el-select v-model="customerIndustry" placeholder="全部行业" style="width: 150px">
                    		<el-option label="全部行业" value="111"></el-option>
                        <el-option-group v-for="group in industryClass" :key="group.name" :label="group.name">
                            <el-option v-for="item in group.children" :key="item.name" :label="item.name" :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                    <el-select v-model="customerState" placeholder="全部状态" style="width: 126px">
                    		<el-option label="全部状态" value="111"></el-option>
                        <el-option label="待完善" value="1"></el-option>
                        <el-option label="已开通" value="3"></el-option>
                        <el-option label="已冻结" value="2"></el-option>
                    </el-select>&nbsp;&nbsp;&nbsp;&nbsp;

                </el-col>
                <div>
                    <el-button type="primary" @click="queryCustomer">查询</el-button>
                    <router-link to="/customerAccount">
                        <el-button type="primary">添加</el-button>
                    </router-link>
                </div>
            </el-row>

            <el-table :data="tableData" border style="width: 100% ;margin-top: 15px;">
                <el-table-column label="操作" width="240">
                    <template scope="scope">
                        <el-button size="small" @click="editCustomer(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" @click="editLicense(scope.$index, scope.row)">License管理</el-button>
                    </template>
                </el-table-column>
                <el-row>
                    <el-table-column prop="idx" label="序号" :span="3"></el-table-column>
                    <el-table-column prop="connection.companyName" label="登录名" :span="3"></el-table-column>
                    <el-table-column prop="connection.contact" label="联系人" :span="3"></el-table-column>
                    <el-table-column prop="userTel" label="联系人手机" :span="3"></el-table-column>
                    <el-table-column prop="industry" label="行业" :span="3"></el-table-column>
                    <el-table-column prop="createdAt" label="开户日期" :span="3" id="createAT"></el-table-column>
                    <el-table-column prop="creator.userRealName" label="开户人" :span="3"></el-table-column>
                    <el-table-column prop="userLockedValue" label="状态" :span="3">
                        <template scope="scope">
                            <el-tag
                                :type="scope.row.isFreeze? 'danger' : 'primary'"
                                close-transition>{{scope.row.isFreeze?"已冻结":"已开通"}}</el-tag>
                        </template>
                    </el-table-column>
                </el-row>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="current1"
                        layout="total,prev, pager, next, jumper"
                        :total="pageCount">
                </el-pagination>
                <!--<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="pageCount">-->
                <!--</el-pagination>-->
            </div>
        </div>
    </div>
</template>


<script>
import api from '../../../api'
import industy_class from '../../../file/industy_class.json'
import Industy from '../../../file/industy.json';

var getData = (that,val) => {
    api.getCustomer(val,10).then(({ data }) => {
//            console.log(data)
        that.pageCount = data.docs.count;
        that.tableData = data.docs.rows;
        console.log(that.tableData,"data");
        var idx = val == 1? val : val-1+'1';

        that.tableData.forEach((item, index) => {
            that.tableData[index].idx = idx++;
            //console.log(item.connection.industryClass);
            that.tableData[index].industry =industy_class[item.connection.industryClass];  //行业
            that.tableData[index].createdAt = moment(item.createAt).format('YYYY-MM-DD');  //时间
//            if (item.connection.status == 3) {
//                that.tableData[index].userLockedValue = '已开通';
//            } else if(item.connection.status == 2){
//                that.tableData[index].userLockedValue = '已冻结';
//            }else{
//                that.tableData[index].userLockedValue = '待完善';
//            }

        })
    })
}
export default {
    data() {
        return {
            flag:true,  //判断分页的触发是全部还是查询出来的数据
            current1:1,
            page:'',
            username:'',
            userTel: '',
            creator :'',
            input_cond: '',
            select: '',
            customerIndustry:'',
            customerState:'',
            industryClass: Industy,
            pageCount: 0,
            data: {},
            tableData: {},
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,

            // 模拟的两条数据
            tableData:[]
        }
    },
    mounted() {
        console.log("--------mouned-----")
        getData(this,1);
    },

    methods: {
        //查询
        queryCustomer(val){
            var str = this.select;
            let obj = {};
            if(str){
                obj[str] = this.input_cond;
            }
            if(this.customerIndustry){
            		if(this.customerIndustry == '111'){
            			console.log(this,"this----")
            			this.flag = true;
            			getData(this,1);
            			return
            		}
                obj.industryClass = this.customerIndustry;
            }
            if(this.customerState){
            		if(this.customerState == '111'){
            			this.flag = true;
            			getData(this,1);
            			return
            		}
                obj.status = eval(this.customerState);
            }
            //判断val默认值，如果是object等于1，是number等于val
            obj.page = isNaN(val)? 1 : val;
            obj.size = 10;
            console.log(obj);
            this.flag = false;
            api.getCusSearch(obj).then(data=>{
                this.pageCount = 11;
                this.tableData = data.data.docs.rows;
                var idx = 1 == 1? 1 : 1-1+'1';
                this.tableData.forEach((item, index) => {
                    this.tableData[index].idx = idx++;
                    this.tableData[index].industry =industy_class[item.connection.industryClass];  //行业
                    this.tableData[index].createdAt = moment(item.createAt).format('YYYY-MM-DD');  //时间
                    if (item.isFreeze == true) {
                        this.tableData[index].userLockedValue = '已冻结';
                    } else {
                        this.tableData[index].userLockedValue = '已开通';
                    }
                })
            }).catch(error=>{
                console.log(error)
            })
        },
//        searchAction() {
//            if (!this.select) {
//                this.$message({
//                    type: 'warning',
//                    message: '请选择搜索类型'
//                });
//                return;
//            }
//
//            if (!this.input_cond) {
//                getData(this);
//                this.current1 = 1;
//                return;
//            }
//
//            api.getCustomerByCond({
//                cond: this.input_cond,
//                type: this.select
//            }).then(({ data }) => {
//                if (data.count === 0) {
//                    this.$message({
//                        type: 'warning',
//                        message: '没有找到内容'
//                    });
//                    return;
//                }
//                this.pageCount = data.count;
//                this.tableData = data.data;
//
//                this.tableData.forEach((item, index) => {
//                    if (item.isFreeze == true) {
//                        this.tableData[index].userLockedValue = '已冻结';
//                    } else {
//                        this.tableData[index].userLockedValue = '已开通';
//                    }
//                    if (this.tableData[index].connection.item.industyClass) {
//                        this.tableData[index].connection.item.industyClass = industy_class[this.tableData[index].connection.item.industyClass];
//                    } else {
//                        this.tableData[index].connection.item.industyClass = '-';
//                    }
//
//                    if (!item.creater) {
//                        this.tableData[index].creater = this.tableData[index].agent.userRealName || this.tableData[index].agent.username;
//                    }
//
//                    this.tableData[index].createAtstr = moment(+item.createAt).format('LL');
//                    this.tableData[index].idx = ++index;
//                });
//            }).catch(error => {
//                if ( error.status === 404) {
//                    this.pageCount = 1;
//                    this.tableData = [];
//                    this.$message({
//                        type: 'warning',
//                        message: '没有找到内容'
//                    });
//                }
//            });
//        },

        editCustomer(index, row) {
            console.log(row)
            this.$router.push('/customerEdit/' + row.userId);
        },
        editLicense(index, row) {
            this.$router.push('/customerLicense/' + row.userId);
        },
        handleCurrentChange(val) {
            console.log(val);
            this.page = val;
            //判断是全部还是条件
            if(this.flag){
                getData(this,val)
            }else{
                this.queryCustomer(val);
            }
           // this.cur_page = val;
//            api.getCustomerByPage(val).then(({ data }) => {
//                this.pageCount = data.count;
//                this.tableData = data.data;
//                console.log(data);
//                this.tableData.forEach((item, index) => {
//                    if (item.isFreeze == true) {
//                        this.tableData[index].userLockedValue = '已冻结';
//                    } else {
//                        this.tableData[index].userLockedValue = '已开通';
//                    }
//
//                    if (this.tableData[index].connection.item.industyClass) {
//                        this.tableData[index].connection.item.industyClass = industy_class[this.tableData[index].connection.item.industyClass];
//                    } else {
//                        this.tableData[index].connection.item.industyClass = '-';
//                    }
//
//                    if (!item.creater) {
//                        this.tableData[index].creater = this.tableData[index].agent.userRealName || this.tableData[index].agent.username;
//                    }
//
//                    this.tableData[index].createAtstr = moment(+item.createAt).format('LL');
//                    this.tableData[index].idx = ++index;
//                });
//            })
        },
        search() {
            this.is_search = true;
        }
    }
}
</script>


<style scoped>
.el-select {
    width: 110px;
}

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
.compHead{ height: 90px;width: 100%;background: #fff;}
.compHead p{ color:#999;font-size: 24px; height: 60px;line-height: 60px;}
.compHead>div:first-child{ display: inline-block;float: left;margin-left: 33px; }
.retBtn{ clear:both;position: absolute;right:40px;top:28px;}
.context{box-sizing: border-box; background: rgb(255,255,255); margin: 20px; padding: 40px 20px 24px 20px; border-top: 4px solid rgb( 230,235,237)}
.el-table__header-wrapper.cell{ color:rgb(102,106,108);}
</style>


<!--客户-->
<!--行业，状态查询输出数据正常，但是有调用了全部数据的接口，倒是被覆盖-->
<!--原因，触发分页方法，解决方法没想明白-->
<!--已解决，数据没有数量 data.data.docs.count-->


<!--查询搜索出来的数据无法分页-->
<!--已解决-->

<!--开户人查询  部分不能-->
<!--上传图片-->


