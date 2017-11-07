<template>
    <div class="table">
        <div class="crumbs">
	            <el-breadcrumb separator="/">
	            		<p class="emp-tit">员工账号管理</p>
	                <el-breadcrumb-item>
	                    员工管理
	                </el-breadcrumb-item>
	                <el-breadcrumb-item>员工账号管理</el-breadcrumb-item>
	            </el-breadcrumb>
        </div>

        <div class="context">
	        <el-row :gutter="50">
	            <el-col :span="24">
	                <!--<el-input placeholder="请输入内容" v-model="input_cond">
	                    <el-select v-model="select" slot="prepend">
	                        <el-option label="登录名" value="username"></el-option>
	                        <el-option label="姓名" value="userRealName"></el-option>
	                    </el-select>
	                    <el-button slot="append" icon="search" @click="searchAction"></el-button>
	                </el-input>-->



	                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-select v-model="formInline.select" placeholder="请选择" style="width: 126px">
                            <el-option label="登录名" value="username"></el-option>
                            <el-option label="姓名" value="userRealName"></el-option>
                        </el-select>
                        <el-input placeholder="输入登录名或姓名" v-model="formInline.input_cond" style="width: 250px"></el-input>
                        <el-select v-model="formInline.role" placeholder="全部角色" style="width: 126px">
                        		<el-option label="全部角色" value="111"></el-option>
                            <el-option v-for="(item,index) in roleSelect" :label="item.roleName" :value="item.roleName" :key="index"></el-option>
                        </el-select>
                        <el-select v-model="formInline.agentDepartment" placeholder="全部部门" style="width: 126px">
                        		<el-option label="全部部门" value="111"></el-option>
                            <el-option v-for="(item,index) in getDepartment" :label="item.agentDepartmentName" :value="item.agentDepartmentName" :key="index"></el-option>
                        </el-select>
					  <el-form-item style="margin-left: 50px">
                            <el-button type="primary" @click="queryEmployee">查询</el-button>
					        <el-button type="primary" @click="jumpAdd">添加</el-button>
					  </el-form-item>
					</el-form>

	            </el-col>
	        </el-row>

	        <el-table stripe :data="tableData" border style="width: 100%;">
                    <el-table-column prop="idx" label="序号" width="70"></el-table-column>
                    <el-table-column prop="username" label="登录名" min-width="100"></el-table-column>
                    <el-table-column prop="userRealName" label="姓名" min-width="100"></el-table-column>
                    <el-table-column prop="connection.role.roleName" label="角色" min-width="95"></el-table-column>
                    <el-table-column prop="connection.agentDepartment.agentDepartmentName" label="部门" min-width="95"></el-table-column>
                    <el-table-column prop="userTel" label="手机" min-width="130"></el-table-column>
                    <el-table-column prop="connection.email" label="邮箱" min-width="180"></el-table-column>
                    <el-table-column prop="userLockedValue" label="状态" width="100"
                                     >
                        <template scope="scope">
                            <el-tag
                                :type="scope.row.isFreeze? 'danger' : 'primary'"
                                close-transition>{{scope.row.isFreeze?"已冻结":"已开通"}}</el-tag>
                        </template>
                    </el-table-column>

	                 <el-table-column label="操作" width="115">
		                <template scope="scope">
		                    <!--<router-link to="/employeeEdit">-->
		                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
		                    </el-button>
		                    <!--</router-link>-->
		                </template>
		            </el-table-column>
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

    import api from '../../../api/index'
    var getData1 = (that,val)=>{
        api.getEmployee(val,10).then(({data,status})=>{
            //var arrEmp = data.docs.rows;
            console.log(status,"status")
            if(status == 404){
                that.$router.push('/404')
            }else if(status == 500){
                that.$router.push('/500')
            }
            that.tableData = data.docs.rows;
            console.log(that.tableData,"that.tableData");
            that.pageCount = data.docs.count;
            var idx = val == 1? val : val-1+'1';
            that.tableData.forEach((item,index)=>{
                item.idx = idx++;
            })
        }).catch(error=>{
            console.log(error,"error")
        })
//        api.getDepartment(1,100).then(depaData=>{
//            //console.log(data,"rows");
//            that.getDepartment =depaData.data.docs.rows;
//            var arr = depaData.data.docs.rows;
//            //console.log(arr)
//            api.getEmployee(val,10).then(({data})=>{
//                //console.log(data,"data");
//                that.tableData = data.docs.rows;
//                that.roleListClick(that.tableData);
//                console.log(that);
//                that.pageCount = data.docs.count;
//                //console.log(arr,"arr")
//                arr.forEach((item,index)=>{
//                    //console.log(item,'item')
//                    that.tableData.forEach((i,num)=>{
//                        i.indexNum = (val-1)*10+num+1;
//                        //console.log(i.connection.agentDepartment,"i")
//                        if(item.agentDepartmentId == i.connection.agentDepartment){
//                            that.tableData[num].agentDepartmentName = item.agentDepartmentName
//                        }
//                    })
//                })
//            })
//        })
    }
//var ge })                             tData = (that,val) => {
//    api.getEmployee(val,10).then(({data}) => {
////            console.log(that,'that')
////            console.log(data,''data)
//            var id = 0;

//        api.getDepartment(1,100).then(data=>{
//            var arr = data.data.docs.rows;
//            console.log(arr,'department')
//            arr.forEach((item,index)=>{
////                console
//                that.tableData[index].agentDepartmentName = item.agentDepartmentName
//            })
//            console.log(this.tableData)
//        })

//
//            that.tableData = data.docs.rows;
//            that.pageCount = data.docs.count;
//            //console.log(that.tableData)
//            that.tableData.forEach((item,index)=>{
//                item.id = ++id
//                if(item.userRoleType == "0"){
//                    item.userRoleType = "内部管理"
//                }else if(item.userRoleType == "1"){
//                    item.userRoleType = "内部员工"
//                }else if(item.userRoleType == "2"){
//                    item.userRoleType = "内部代理商"
//                }else if(item.userRoleType == "3"){
//                    item.userRoleType = "内部客户"
//                }else if(item.userRoleType == "4"){
//                    item.userRoleType = "代理商员工"
//                }else if(item.userRoleType == "5"){
//                    item.userRoleType = "代理商员工"
//                }else if(item.userRoleType == "6"){
//                    item.userRoleType = "代理商下级代理商"
//                }else{
//                    item.userRoleType = "客户员工"
//                }

//                if (item.isFreeze == true) {
//                    that.tableData[index].userLockedValue = '已冻结';
//                } else {
//                    that.tableData[index].userLockedValue = '已开通';
//                }

//            })





//        that.tableData.forEach((item, index) => {
//            if (!that.tableData[index].connection.item.department) {
//                that.tableData[index].connection.item.department = that.tableData[index].connection.item.departmentId.item.departmentName;
//            }
//
//            if (item.isFreeze == true) {
//                that.tableData[index].userLockedValue = '已冻结';
//            } else {
//                that.tableData[index].userLockedValue = '已开通';
//            }
//            that.tableData[index].idx = ++index;
//        })
//    })
//}
export default {
    data() {
        return {
            flag:true,
            current1:1,
            roleList:[],
            roleSelect:[],
            department:'',
            getDepartment:[],
            formInline:{
                select:'',
                input_cond: '',
                role:'',
                agentDepartment:''
            },
            selectOptions: {},
            pageCount: 0,
//            select: 'username',
            employeedata: {},
            tableData: [
            ],
            res: {},
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: ''
        }
    },
    watch:{
        tableData(val){
//            console.log(val,"val");
//            api.Role(1,1000).then(data=>{
//                console.log(data,"data")
//                 this.roleList = data.data.docs.rows
//                  this.roleList.forEach((item,index)=>{
//                        val.forEach((i,num)=>{
//                            if(i.connection.role == item.systemRoleId){
//                                i.regFrom = item.roleName;
//                                console.log(this.tableData)
//                            }
//                        })
//                  })
//            })
//             api.getDepartment(1,100).then(data=>{
//                   this.getDepartment =data.data.docs.rows;
//                   this.getDepartment.forEach((item,index)=>{
//                         val.forEach((i,num)=>{
//                            if(item.agentDepartmentId == i.connection.agentDepartment){
//                                 this.tableData[num].agentDepartmentName = item.agentDepartmentName
//                            }
//                         })
//                   })
//             })
        }
    },
    created() {
         getData1(this,1);
    },
    mounted() {
         api.Role(1,100).then(data=>{
             var arr = data.data.docs.rows;
             arr.forEach(item=>{
                 if(item.roleState == 1){
                     this.roleSelect.push(item)
                 }
             })
         });
        api.getDepartment(1,100).then(data=>{
            var arr = data.data.docs.rows;
            //console.log(this.getDepartment)
            arr.forEach((item,index)=>{
                if(item.agentDepartmentStatus == 1){
                    this.getDepartment.push(item)
                }
            })
        })

        //员工列表数据
        //getData(this,1);
//        getData1(this,1);
        //部门列表数据
        //console.log(this.tableData)

    },
    methods: {
//       roleListClick(val){
//           api.Role(1,1000).then(data=>{
//               console.log(data,"data")
//               this.roleList = data.data.docs.rows
//               this.roleList.forEach((item,index)=>{
//                   val.forEach((i,num)=>{
//                       if(i.connection.role == item.systemRoleId){
//                           i.regFrom = item.roleName;
//                           console.log(this.tableData)
//                       }
//                   })
//               })
//           })
//       },
        queryEmployee(val){
            var str = this.formInline.select;
            let obj = {};
            if(this.formInline.select){
                obj[str] = this.formInline.input_cond;
            }
            if(this.formInline.role){
            		if(this.formInline.role == "111"){
            			this.flag = true;
            			getData1(this,1);
            			return
            		}
                obj.role = this.formInline.role;
            }
            if(this.formInline.agentDepartment){
            		if(this.formInline.agentDepartment == "111"){
            			this.flag = true;
            			getData1(this,1);
            			return
            		}
                obj.agentDepartment = this.formInline.agentDepartment;
            }
            obj.page = isNaN(val)? 1 : val;;
            obj.size = 10;
            console.log(obj);
            this.flag = false;
            api.queryEmployee(obj).then(data=>{
                console.log(data,"1231313")
                this.pageCount = 11;
                this.tableData = data.data.docs.rows;
                var idx = 1 == 1? 1 : 1-1+'1';
                this.tableData.forEach((item,index)=>{
                    item.idx = idx++;
                })
            }).catch(error=>{
                console.log(error,"error")
            })
        },
        filterTag(value, row) {
            console.log(row)
            return row.tag === value;
        },
//  		跳转添加页面
    		jumpAdd(){
    			this.$router.push('/employeeAdd')
    		},
        searchAction() {
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
//                return;
//            }
//
//            api.getEmployeeByCond({
//                cond: this.input_cond,
//                type: this.select
//            }).then(({ data }) => {
//                if (data.docs.count === 0) {
//                    this.$message({
//                        type: 'warning',
//                        message: '没有找到内容'
//                    });
//                    return;
//                }
//                this.tableData = data.docs.docs;
//                this.pageCount = data.docs.count;
//                console.log(this.tableData);
//
//                this.tableData.forEach((item, index) => {
//                    if (!this.tableData[index].connection.item.department) {
//                        this.tableData[index].connection.item.department = this.tableData[index].connection.item.departmentId.item.departmentName;
//                    }
//                    if (item.isFreeze == true) {
//                        this.tableData[index].userLockedValue = '已冻结';
//                    } else {
//                        this.tableData[index].userLockedValue = '已开通';
//                    }
//                    this.tableData[index].idx = ++index;
//                })
//            })

        },
        handleEdit(index, row) {
            this.$router.push('/employeeEdit/' + row.userId);
        },
        handleCurrentChange(val) {
            console.log(val)
            if(this.flag){
                getData1(this,val)
            }else{
                this.queryEmployee(val)
            }

            //this.cur_page = val;
//            api.getEmployeeByPage(val).then(({ data }) => {
//                this.tableData = data.docs.docs;
//                console.log(2135670978265,this.tableData);
//
//                this.tableData.forEach((item, index) => {
//                    if (!this.tableData[index].connection.item.department) {
//                        this.tableData[index].connection.item.department = this.tableData[index].connection.item.departmentId.item.departmentName;
//                    }
//
//                    if (item.isFreeze == true) {
//                        this.tableData[index].userLockedValue = '已冻结';
//                    } else {
//                        this.tableData[index].userLockedValue = '已开通';
//                    }
//                    this.tableData[index].idx = ++index;
//                })
//            });
        },

        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleDelete(index, row) {
            this.$message.error('删除第' + (index + 1) + '行');
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
    }
}
</script>

<style scoped>
.el-select {
    width: 126px;
}

.handle-box {
    margin-bottom: 20px;
}

.handle-del {
    border-color: #bfcbd9;
    color: #999;
}

.handle-select {
    width: 200px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.crumbs{
	width: 100%;
	height: 90px;
	box-sizing: border-box;
	padding: 14px 40px 18px 39px;
	background: #fff;
}
.emp-tit{
	font-size:24px ;
	color: #999999;
	padding-bottom: 14px;
}
.context{box-sizing: border-box; background: rgb(255,255,255); margin: 20px; padding: 40px 20px 24px 20px; border-top: 4px solid rgb( 230,235,237)}
.el-input__inner{
	border-radius: 0;
}
.el-button--primary{
	padding: 10px 21px;
	background: rgb(0,180,148);
	border:none
}
.el-form-item{ margin-bottom: 30px;}
</style>


<!--员工-->
<!--角色和部门无法查询-->


<!--1:下拉菜单加全部-->
<!--页脚，分页-->
<!--http协议分成-->
<!--http header-->
<!--400,500-->
<!--maven+jekens-->
<!--pdca-->

