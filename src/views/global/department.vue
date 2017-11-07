<style lang="less">
@import '../../styles/common.less';
@import './department.less';
</style>
<template>
    <div>
        <Card :dis-hover=true>
            <Row :gutter="16">
                <Col span="4">
                <Input v-model="value" placeholder="输入部门名称"></Input>
                </Col>
                <Col span="20">
                <Button type="ghost" icon="ios-search" @click="searchBtn">查询</Button>
                <Button type="ghost" @click='addBtn'>添加</Button>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columnsList="tableDepartmentColumns" :tableData="tableDepartmentData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getDepartment"></page-com>
        </Card>
        <!-- 添加 -->
        <Modal v-model="addModal" title="对话框标题">
            <p slot="header" style="text-align:center">
                <span>添加标签</span>
            </p>
            <div style="text-align:center">
                <Form ref="addValidate" :model="addValidate" :rules="ruleValidate" :label-width="80">
                    <Form-item label="部门名称:" prop="departmentName">
                        <Input v-model="addValidate.departmentName" placeholder="最大允许输入40个字符" style="width: 300px">
                        </Input>
                    </Form-item>
                    <Form-item label="状态:" prop="departmentStatus">
                        <Radio-group v-model="addValidate.departmentStatus">
                            <Radio :label="1">启用</Radio>
                            <Radio :label="2">禁用</Radio>
                        </Radio-group>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer" class="footerBtn">
                <Button type="primary" @click="addSubmit('addValidate')">保存</Button>
                <Button @click="handleReset('addValidate')">重置</Button>
            </div>
        </Modal>
        <!-- 编辑 -->
        <Modal v-model="editModal" @on-cancel="cancel('editValidate')">
            <p slot="header" style="text-align:center">
                <span>部门编辑</span>
            </p>
            <div style="text-align:center">
                <Form ref="editValidate" :model="editValidate" :label-width="80" :rules="ruleValidate">
                    <Form-item label="标签名称:" prop="departmentName">
                        <Input v-model="editValidate.departmentName" placeholder="最大允许输入40个字符" style="width: 300px">
                        </Input>
                    </Form-item>
                    <Form-item label="状态:" prop="departmentStatus">
                        <Radio-group v-model="editValidate.departmentStatus">
                            <Radio :label="1">启用</Radio>
                            <Radio :label="2">禁用</Radio>
                        </Radio-group>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer" class="footerBtn">
                <Button type="primary" @click="confirmEdit('editValidate')">保存</Button>
                <Button @click="handleReset('editValidate')">重置</Button>
            </div>
        </Modal>
        <!-- <delete-modal :deleteId='deleteId' deleteType='department' ref='del' @listAgain='tableDepartmentData'></delete-modal> -->
    </div>
</template>
<script>
import EditableTable from '../../components/editableTable.vue';
// import DeleteModal from '../../components/deleteModal.vue';
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
        PageCom,
        // DeleteModal
    },
    data() {
        return {
            value: '', //搜索
            addModal: false, //添加弹框
            editModal: this.$route.query.editModal || false, //编辑弹框
            tableDepartmentColumns: [],
            id: '', // 点击编辑时，当前ID
            deleteId: '', //点击删除时，当前ID
            isUsed: '', //判断当前部门是否被使用
            editValidate: {
                departmentName: "", //标签名称
                departmentStatus: '', //状态
            },
            ruleValidate: {
                departmentStatus: [
                    // {required:true,message: '请选择部门状态', trigger: 'blur'}
                ],
                departmentName: [{
                    required: true,
                    message: '部门名称不能为空',
                    trigger: 'blur'
                }, {
                    min: 1,
                    max: 40,
                    message: '最大允许输入40个字符',
                    trigger: 'blur'
                }]
            },
            addValidate: {
                departmentName: "", //标签名称
                departmentStatus: '1', //状态
            },
        }
    },
    computed: mapGetters({
        tableDepartmentData: 'departmentData',
        count: 'departmentDataCount',
        editValidate2: 'departmentByIdData',
    }),
    watch: {
        '$route': function(val) {
            let first = true;
            if (val.query.id && first == true) {
                this.id = val.query.id;
                first = false;
                this.$store.dispatch('getDepartmentByID', this.id)
            };
            if (val.query.deleteId && first == true) {
                this.deleteId = val.query.deleteId;
                this.isUsed = val.query.isUsed;
                if (this.isUsed == false && first == true) {
                    this.deleteTip();
                    first = false
                } else if (this.isUsed == true) {
                    this.$Message.error('该部门已被使用，不可删除');
                }
                first = false;
            };
        },
        editValidate2(newVal) {
            if (newVal) {
                this.editValidate = newVal;
                this.editModal = true;
            }
        }
    },
    methods: {
        cancel() {
            // 点击关闭弹框时
            util.openNewPage(this, 'department');
            this.$router.push({
                name: 'department',
            });
        },
        searchBtn() {
            if (this.value) {
                this.$store.dispatch('getDepartment', {
                    departmentName: this.value
                })
            }
        },
        addBtn() {
            this.addModal = true;
        },
        handleReset(name) {
            for (var i = 0; i < this.labellistData.length; i++) {
                this.labellistData[i].checkbox = false
            }
            this.$refs[name].resetFields();
        },
        addSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let depart = {
                        departmentName: this.addValidate.departmentName,
                        departmentStatus: this.addValidate.departmentStatus
                    }
                    this.$store.dispatch('departmentAdd', depart)
                        .then(data => {
                            this.$Message.success('提交成功!');
                            console.log(data);
                            this.$store.dispatch('getDepartment')
                            this.addModal = false;
                        }).catch(err => {
                            console.log(err);
                        })
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        confirmEdit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let depart = {
                        departmentName: this.editValidate.departmentName,
                        departmentStatus: this.editValidate.departmentStatus,
                        id: this.id
                    }
                    this.$store.dispatch('departmentEdit', depart)
                        .then(data => {
                            this.editModal = false;
                            this.$Message.success('提交成功!');
                            this.$store.dispatch('getDepartment')
                            this.cancel();
                        }).catch(err => {
                            console.log(err);
                        })
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {},
        deleteTip() {
            this.$Modal.confirm({
                title: '系统提示',
                content: '<p style="font-size:15px;">您确定要删除该部门吗？</p>',
                onOk: () => {
                    this.$store.dispatch('deleteDepartment', this.deleteId)
                        .then(data => {
                            this.$Message.success('成功删除');
                            this.$store.dispatch('getDepartment')
                        }).catch(err => {
                            console.log(err);
                        })
                },
                onCancel: () => {
                    this.$Message.info('取消删除');
                }
            });
        }
    },
    created() {
        this.tableDepartmentColumns = tableData.tableDepartmentColumns;
    }
};
</script>
