<style lang="less">
@import '../../styles/common.less';
@import './role.less';
</style>
<template>
    <div>
        <Card :dis-hover=true>
            <Row :gutter="16">
                <Col span="4">
                <Input v-model="value" placeholder="输入角色名称"> </Input>
                </Col>
                <Col span="20">
                <Button type="ghost" icon="ios-search" @click="searchBtn">查询</Button>
                <Button type="ghost" icon="plus-round" @click='addBtn'>添加</Button>
                </Col>
            </Row>
        </Card>
        <Card :dis-hover=true>
            <editable-table refs="table2" :columnsList="tableRoleColumns" :tableData="tableRoleData" :saveEdit="saveEdit" :rowLicense="deleteRow"></editable-table>
        </Card>
        <Card :dis-hover=true>
            <page-com :totalCount="count" commit="getRole"></page-com>
        </Card>
        <!-- 添加 -->
        <Modal v-model="addModal" title="对话框标题" width="35" @on-cancel="cancel('formValidate')">
            <p slot="header" style="text-align:center">
                <span>添加角色</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Form-item label="角色名称:" prop="roleName">
                        <Input v-model="formValidate.roleName" placeholder="最大允许输入40个字符">
                        </Input>
                    </Form-item>
                    <Form-item label="备注:" prop="remark">
                        <Input v-model="formValidate.remark" placeholder="最大允许输入40个字符">
                        </Input>
                    </Form-item>
                    <FormItem label="状态" prop="roleState">
                        <RadioGroup v-model="formValidate.roleState">
                            <Radio label="1" disabled>禁用</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" class="footerBtn">
                <Button type="primary" @click="addSubmit('formValidate')">保存</Button>
                <Button @click="handleReset('formValidate')">重置</Button>
            </div>
        </Modal>
        <!-- 编辑 -->
        <Modal v-model="editModal" width="35" @on-cancel="cancel('editValidate')">
            <p slot="header" style="text-align:center">
            </p>
            <div style="text-align:center">
                <Form ref="editValidate" :model="editValidate" :rules="ruleValidate" :label-width="80">
                    <Form-item label="角色名称:" prop="roleName">
                        <Input v-model="editValidate.roleName" placeholder="最大允许输入40个字符">
                        </Input>
                    </Form-item>
                    <Form-item label="备注:" prop="remark">
                        <Input v-model="editValidate.remark" placeholder="最大允许输入40个字符">
                        </Input>
                    </Form-item>
                    <Form-item label="状态:" prop="roleState">
                        <Radio-group v-model="editValidate.roleState">
                            <Radio :label=2>启用</Radio>
                            <Radio :label=1>禁用</Radio>
                        </Radio-group>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer" class="footerBtn">
                <Button type="primary" @click="editSubmit('editValidate')">保存</Button>
                <Button @click="handleReset('editValidate')">重置</Button>
            </div>
        </Modal>
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
            addModal: false,
            tableRoleColumns: [],
            id: '',
            editModal: this.$route.query.editModal || false,
            deleteId: '',
            formValidate: {
                //添加
                roleName: '', //产品名称
                remark: '', //备注
                roleState: 1, //状态
            },
            editValidate: {
                //编辑
                roleName: '', //产品名称
                remark: '', //备注
                roleState: '', //状态
            },
            ruleValidate: {
                roleName: [{
                    required: true,
                    message: '角色名称不能为空',
                    trigger: 'blur'
                }, {
                    min: 1,
                    max: 40,
                    message: '角色名称需在40字以下',
                    trigger: 'blur'
                }],
                remark: [{
                    min: 1,
                    max: 40,
                    message: '备注需在40字以下',
                    trigger: 'blur'
                }],
                roleState: [{
                    type: 'number',
                    required: true,
                    message: '请选择角色状态',
                    trigger: 'blur'
                }, ],
            }
        }
    },
    computed: mapGetters({
        tableRoleData: 'roleData',
        count: 'roleDataCount',
        editValidate2: 'roleByIdData',
    }),
    watch: {
        '$route': function(val) {
            // let first = true;
            if (val.query.id) {
                this.id = val.query.id;
                this.$store.dispatch('getRoleByID', this.id)
                console.log(this.id, '=====================')
                    // first = false;
            };
            if (val.query.deleteId) {
                this.deleteId = val.query.deleteId;
                this.deleteTip();
            };
        },
        editValidate2(newVal) {
            console.log(newVal, '----------')
            if (newVal) {
                this.editValidate = newVal;
                this.editModal = true;
            }
        }
    },
    methods: {
        addBtn() {
            this.addModal = true;
        },
        addSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var arr = {
                        roleName: this.formValidate.roleName,
                        remark: this.formValidate.remark,
                        roleState: this.formValidate.roleState
                    }
                    console.log(arr)
                    this.$store.dispatch('roleAdd', arr).then(data => {
                        this.$Message.success('提交成功!');
                        this.addModal = false;
                        this.handleReset(name);
                        this.$store.dispatch('getRole')
                    }).catch(err => {
                        if (err.data.err.slice(0, 3) == 'Key') {
                            this.$Message.error('角色名称重复');
                        } else {
                            this.$Message.error(err.data.err);
                        }
                    })
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        editSubmit(name) {
            this.$refs[name].validate((valid) => {
                console.log(valid)
                if (valid) {
                    var arr = {
                        roleName: this.editValidate.roleName,
                        remark: this.editValidate.remark,
                        roleState: this.editValidate.roleState,
                        id: this.id
                    }
                    console.log(arr);
                    this.$store.dispatch('roleEdit', arr).then(data => {
                        this.$Message.success('提交成功!');
                        this.editModal = false;
                        this.cancel();
                        this.$store.dispatch('getRole')
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        deleteTip() {
            this.$Modal.confirm({
                title: '系统提示',
                content: '<p style="font-size:15px;">您确定要删除该角色吗？</p>',
                onOk: () => {
                    this.$store.dispatch('deleteRole', this.deleteId)
                        .then(data => {
                            this.$Message.success('成功删除');
                            this.$store.dispatch('getRole')
                        }).catch(err => {
                            console.log(err);
                        })
                },
                onCancel: () => {
                    this.$Message.info('取消删除');
                }
            });
        },
        cancel() {
            // 点击关闭弹框时
            util.openNewPage(this, 'role');
            this.$router.push({
                name: 'role',
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        saveEdit(index, success, fail) {},
        deleteRow(index, success, fail) {},
        searchBtn() {
            if (this.value) {
                this.$store.dispatch('getRole', {
                    roleName: this.value
                })
            }
        }
    },
    created() {
        this.tableRoleColumns = tableData.tableRoleColumns
    }
};
</script>
