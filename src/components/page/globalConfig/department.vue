<template>
    <div class="table">
    		 <div class="crumbs">
	            <el-breadcrumb separator="/">
	            		<p class="emp-tit">部门管理</p>
	                <el-breadcrumb-item>
	                    全局配置
	                </el-breadcrumb-item>
	                <el-breadcrumb-item>部门管理</el-breadcrumb-item>
	            </el-breadcrumb>
        </div>
        <!--<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-menu"></i>&nbsp&nbsp全局</el-breadcrumb-item>
                <el-breadcrumb-item>部门管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>-->
         <div class="contexts">
		        <!--<el-row :gutter="50">
		            <el-col :span="14">
		                <el-input placeholder="请输入内容" v-model="input_cond">
		                    <template slot="prepend">部门名称</template>
		                    <el-button slot="append" icon="search" @click="searchAction"></el-button>
		                </el-input>
		            </el-col>
		            <el-col :span="5">
		                <div class="handle-box" style="float: left;">
		                    <el-button type="primary" @click="dialogFormAddVisible = true">添加</el-button>
		                </div>
		            </el-col>
		        </el-row>-->
		        <el-form :inline="true" class="demo-form-inline">
                          <el-input placeholder="请输入部门名称" v-model="input_cond" style="width: 400px"></el-input>
						  <el-form-item style="margin-left: 30px; ">
                              <el-button type="primary" @click="searchAction">查询</el-button>
						    <el-button type="primary" @click="dialogFormAddVisible = true">添加</el-button>
						  </el-form-item>
                </el-form>



		        <el-table :data="tableData" border style="width: 100%" stripe>
		                <el-table-column prop="idx" label="序号"></el-table-column>
		                <el-table-column prop="agentDepartmentName" label="部门名称"></el-table-column>
		                <el-table-column v-if="userFlag" prop="creator.userRealName" label="创建人"></el-table-column>
		                <el-table-column v-if="!userFlag" prop="creator.userRealName" label="创建人"></el-table-column>
		                <el-table-column prop="createdAt" label="创建日期"></el-table-column>
		                <el-table-column prop="agentDepartmentStatus" label="状态">
                            <template scope="scope">
                                <el-tag
                                    :type="scope.row.agentDepartmentStatus==1? 'primary' : 'danger'"
                                    close-transition>{{scope.row.agentDepartmentStatus==1?"已启用":"已禁用"}}</el-tag>
                            </template>
                        </el-table-column>
		                <el-table-column label="操作" width="200">
		                    <!--<el-input type="hidden" name="_csrf" v-model="_csrf"></el-input>-->
		                    <template scope="scope">

		                        <el-button size="small" @click="editDepartment(scope.$index,scope.row,tableData, 'ruleForm')">
		                            编辑
		                        </el-button>
		                        <el-button size="small" :disabled="true" v-if="scope.row.used==1" type="danger">删除
		                        </el-button>
		                        <el-button size="small" type="danger" v-if="!scope.row.used || scope.row.used==2 " @click="deleteDepartment(scope.$index,scope.row,tableData)">删除
		                        </el-button>
		                    </template>
		                </el-table-column>
		        </el-table>

		        <!--添加部门-->
		        <el-dialog title="添加部门" :visible.sync="dialogFormAddVisible" :close-on-click-modal="false" :close-on-press-escape="false" @click="open">
		            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
		                <!--<el-form-item label="授权类型:" :label-width="formLabelWidth" prop="departmentName">
		                    <el-input v-model="ruleForm.departmentName" auto-complete="off" placeholder="请输入授权产品"></el-input>
		                </el-form-item>-->

		                 <el-form-item label="部门类型:" prop="departmentName" :label-width="formLabelWidth">
                             <el-input v-model="ruleForm.departmentName" placeholder="" ></el-input>
						    <!--<el-select v-model="ruleForm.departmentName" placeholder="请输入授权产品">-->
						      <!--<el-option label="核心部门" value="核心部门"></el-option>-->
						      <!--<el-option label="研发部" value="研发部"></el-option>-->
						    <!--</el-select>-->
						  </el-form-item>

		                <el-form-item label="状态:" :label-width="formLabelWidth" prop="departmentStatus">
		                    <el-radio-group v-model="ruleForm.departmentStatus">
		                        <el-radio label="1" checked>启用</el-radio>
		                        <el-radio label="2">禁用</el-radio>
		                    </el-radio-group>
		                </el-form-item>
		                <el-input type="hidden" name="_csrf" v-model="ruleForm._csrf"></el-input>

		                <el-form-item class="butt1and2">
		                    <el-button type="primary" @click="submitForm('ruleForm','dialogFormAddVisible')">保存</el-button>
		                    <el-button @click="resetForm('ruleForm', 'dialogFormAddVisible')">重置</el-button>
		                </el-form-item>
		            </el-form>
		        </el-dialog>

		        <el-dialog title="编辑部门" :visible.sync="dialogFormEditVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
		            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
		               <!-- <el-input type="hidden" v-model="ruleForm._id"></el-input>-->
		                <el-form-item label="部门名称" :label-width="formLabelWidth" prop="departmentName">
		                    <el-input v-model="ruleForm.departmentName" auto-complete="off" placeholder="最大允许输入40个字符"></el-input>
		                </el-form-item>
		                <el-form-item label="状态" :label-width="formLabelWidth" prop="departmentStatus">
		                    <el-radio-group v-model="ruleForm.departmentStatus" @change="open">
		                        <el-radio :label="1">启用</el-radio>
		                        <el-radio :label="2">禁用</el-radio>
		                    </el-radio-group>
		                </el-form-item>
		                <el-input type="hidden" name="_csrf" v-model="ruleForm._csrf"></el-input>

		                <el-form-item class="butt1and2">
		                    <el-button type="primary" @click="updateForm('ruleForm', 'dialogFormEditVisible',row)">保存</el-button>
		                    <el-button @click="resetForm('ruleForm', 'dialogFormEditVisible')">取消</el-button>
		                </el-form-item>
		            </el-form>
		        </el-dialog>

		        <div class="pagination">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="sync"
                            layout="total,prev, pager, next, jumper"
                            :total="pageCount">
                    </el-pagination>
		            <!--<el-pagination :current-page.sync="sync" @current-change="handleCurrentChange" layout="prev, pager, next" :total="pageCount">-->
		            <!--</el-pagination>-->
		        </div>
        </div>
    </div>
</template>

<script>
import api from '../../../api'

var getData = (that,val) => {
    api.getDepartment(val,10).then((data) => {
        //console.log(data)
        that.tableData = data.data.docs.rows;
        that.pageCount = data.data.docs.count;
        console.log(that.tableData,"that.tableData")
        var idx = val == 1? val : val-1+'1';
        that.tableData.forEach((obj, index) => {
            that.tableData[index].idx = idx++;
            that.tableData[index].createdAt = moment(obj.createAt).format('YYYY-MM-DD');
//            if (obj.agentDepartmentStatus === 1) {
//                that.tableData[index].agentDepartmentStatus = '已启用';
//            } else {
//                that.tableData[index].agentDepartmentStatus = '已禁用';
//            }
            //that.tableData[index].createAt = moment(+obj.createAt).format('LL');
        });
//
//        if (!that.tableData.creater || !that.tableData.creater.userRealName) {
//            that.userFlag = false;
//        } else {
//            that.userFlag = true;
//        }
    });
}

export default {
    data() {
        return {
            departmentName:'',
            sync:1,
            _id:"",
            userFlag: false,
            globalName: '',
            input_cond: '',
            pageCount: 0,
            tableData: [

            ],
            cur_page: 1,
            multipleSelection: [],
            dialogFormAddVisible: false,
            dialogFormEditVisible: false,
            _csrf: '',
            ruleForm: {
                _id: '',
                departmentName: '',
                departmentStatus:'1'
            },
            rules: {
                departmentName: [
                    { required: true, message: '部门类型不能为空', trigger: 'blur' },
                    { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
                ],
                departmentStatus: [
                    { required: true}
                ],
            },
            formLabelWidth: '120px'
        }
    },
    mounted() {
        getData(this,1);
    },
    methods: {
        handleSizeChange(val){
            console.log(val)
        },
        open(id){

        },
        //查询
        searchAction() {
            let obj = {};
            if(this.input_cond){
                obj = {
                    agentDepartmentName:this.input_cond,
                    page:1,
                    size:10
                };
            }
            api.getSearch(obj).then(data=>{
                console.log(data)
                this.tableData = data.data.docs.rows;
                this.pageCount = data.data.docs.count;
                    var idx = 1 == 1? 1 : 1-1+'1';
                    this.tableData.forEach((obj, index) => {
                        this.tableData[index].idx = idx++;
                        this.tableData[index].createdAt = moment(obj.createAt).format('YYYY-MM-DD');
                    })
            }).catch(error=>{
                console.log(error)
            })
//            if (!this.input_cond) {
//                getData(this,1);
//                return;
//            }
//
//            api.getDepartmentByName(this.input_cond).then(({ data }) => {
//                if (data.docs.count === 0) {
//                    this.$message({
//                        type: 'warning',
//                        message: '没有找到内容'
//                    });
//                    return;
//                }
//                this.tableData = data.docs.docs;
//                this.pageCount = data.docs.count;
//
//                this.tableData.forEach((obj, index) => {
//                    if ((+obj.departmentStatus) === 1) {
//                        this.tableData[index].departmentStatus = '启用';
//                    } else {
//                        this.tableData[index].departmentStatus = '禁用';
//                    }
//                    this.tableData[index].createAt = moment(+obj.createAt).format('LL');
//                    this.tableData[index].idx = ++index;
//                });
//            });
        },

        handleCurrentChange(val) {
            getData(this,val)
//            this.cur_page = val;
//            api.getDepartmentByPage(val).then((data) => {
//                this.tableData = data.data.docs.docs;
//                this.pageCount = data.data.docs.count;
//                this.tableData.forEach((obj, index) => {
//
//                    if ((+obj.departmentStatus) === 1) {
//                        this.tableData[index].departmentStatus = '已启用';
//                    } else {
//                        this.tableData[index].departmentStatus = '已禁用';
//                    }
//                    this.tableData[index].createAt = moment(+obj.createAt).format('LL');
//                    this.tableData[index].idx = ++index;
//                });
//            });
        },

        editDepartment(index, row, rows, formName) {
            this.dialogFormEditVisible = true;
            this.$nextTick(() => {
                console.log(row.agentDepartmentStatus)
                this._id = row.agentDepartmentId;
                this[formName].departmentName = row.agentDepartmentName;
                this[formName].departmentStatus = row.agentDepartmentStatus;
                this.globalName = row.agentDepartmentName;

                console.log(this[formName].departmentStatus)
            });
        },

        updateForm(formName, dialogName,row) {
            this.$refs[formName].validate((valid) => {
                console.log(this._id)
                if (valid) {
                    let data = {
                         agentDepartmentName:this.ruleForm.departmentName,
                         agentDepartmentStatus:this.ruleForm.departmentStatus,
                         did:this._id
                    };
//                    if (this.globalName != data.departmentName) {
//                        data.nameChange = true;
//                    }

                    this.$store.dispatch('UpdateDepartment', data).then((data) => {
                        this.$message({
                            type: 'info',
                            message: '保存成功'
                        });
                        this[dialogName] = false;
                        getData(this,1);
                        this.sync = 1
                    }).catch((error) => {
                        if (error.data) {
                            this.$message({
                                type: 'error',
                                message: error.data.msg
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '未知错误'
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //删除按钮，如果与员工正在使用，提示无法删除，没有使用的正常删除
        deleteDepartment(index, row) {
            let csrf = this._csrf;
            if (row.used == 1) {
                this.$message({
                    type: 'error',
                    message: '该项目已被使用，不得删除!'
                });
                return;
            }
            console.log(row)
            var flag = 0;
            var str = '';
            api.getEmployee(1,1000).then(data=>{
                str = data.data.docs.count;
                this.departmentName = data.data.docs.rows;
                console.log(data,"data")
                this.departmentName.forEach(item=>{
                    if(item.connection.agentDepartment.agentDepartmentName == row.agentDepartmentName){
                        this.$message({
                            type: 'error',
                            message: '正在使用，无法删除'
                        });
                        return
                    }else{
                        flag++;
                    }
                })
                console.log(flag,str,"--------")
                if(flag == str){
                    this.$confirm('您确定要删除这个部门吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //成功
                        this.$store.dispatch('DeleteDepartment', {
                            did: row.agentDepartmentId
                        }).then((res) => {
                            console.log(res)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.tableData.splice(index, 1);
                            this.dialogFormEditVisible = false;
                            getData(this,1);
                            this.sync = 1
                        }).catch((error) => {
                            if (error.response) {
                                console.log(11, error.response.data);
                                console.log(22, error.response.status);
                                console.log(33, error.response.headers);
                            }
                            console.log(error);
                            this.$message({
                                type: 'error',
                                message: error
                            });
                        });

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }).catch(error=>{
                console.log(error,"")
            });
        },

        //            提交和重置按钮
        submitForm(formName, dialogName) {
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                if (valid) {
                    this.$store.dispatch('AddDepartment', {
                        "agentDepartmentName":this.ruleForm.departmentName,
                        "agentDepartmentStatus":this.ruleForm.departmentStatus
                    }).then((data) => {
                        console.log(data)
                        this.$message({
                            type: 'info',
                            message: '添加成功'
                        });
                        this[dialogName] = false;
                        this.$refs[formName].resetFields();
                        getData(this,1);
                        this.sync = 1

                    }).catch((error) => {
                        if (error.data) {
                            this.$message({
                                type: 'error',
                                message: error.data.msg
                            });
                        } else {
                           this.$message({
                                type: 'error',
                               message: '未知错误'
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        resetForm(formName, dialogName) {
            //this[dialogName] = false;
            if(dialogName == 'dialogFormEditVisible'){
                this[dialogName] = false;
            }else{
                this.ruleForm.departmentName = '';
                this.ruleForm.departmentStatus = '';
            }
//            this.$refs[formName].resetFields();
        }
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

.butt1and2 {
    float: right;
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
.el-form-item{ margin-right: 0; margin-bottom: 30px;}
.contexts{box-sizing: border-box; background: rgb(255,255,255); margin: 20px;border-top: 4px solid rgb( 230,235,237); padding: 44px 20px 24px 20px;}
.el-button--small{padding: 0; width: 50px; height: 22px; border-radius: 2px;}
.el-radio+.el-radio{ margin-left: 50px;}
.el-icon-caret-top+.el-input__inner{ width: 400px !important;}
</style>
