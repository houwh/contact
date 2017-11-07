<template>
    <div class="list">
        <Row>
            <Col>
            <Card>
                <div slot="title" class="titlebox">
                    <div class="title-left">
                        <Icon type="ios-film-outline"></Icon>
                        登录信息
                    </div>
                    <div class="title-rigth">
                        <!-- <v-frozen></v-frozen> -->
                        <!-- <Button :type="type" class="returnBtn" @click="frozenTip" ref="changeCol">{{ message }}</Button>
 -->
                        <!-- <v-delete :agentId='routerId'></v-delete> -->
                        <!-- <Button type="error" class="" @click="deleteTip">删除</Button> -->
                        <!-- <Button onclick="history.go(-1)">返回</Button> -->
                    </div>
                </div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                    <Form-item label="登录名:" prop="username">
                        <p>{{formValidate.username}}</p>
                    </Form-item>
                    <Form-item label="登录密码:" prop="password">
                        <Input v-model="formValidate.password" placeholder="8~16位字符，区分大小写" style="width: 40%">
                        </Input>
                    </Form-item>
                    <p class="formPass">密码不设置默认不修改</p>
                    <div class="system">
                        <Icon type="ios-film-outline"></Icon>
                        基本信息
                    </div>
                    <Form-item label="姓名:" prop="userRealName" class="systemForm">
                        <Input v-model="formValidate.userRealName" placeholder="请输入姓名" style="width:40%">
                        </Input>
                    </Form-item>
                    <Form-item label="部门:" prop="connection.department" class="systemForm">
                        <Select v-model="formValidate.connection.department" placeholder="请选择" style="width:40%">
                            <Option v-for='(item,index) in departmentList' :key='index' :value="item.departmentId" :label="item.departmentName" v-if='item.departmentStatus==1'></Option>
                            <Option v-for='(item,index) in departmentList' :key='index' :value="item.departmentId" :label="item.departmentName" v-if='item.departmentStatus==2' disabled></Option>
                        </Select>
                    </Form-item>
                    <Form-item label="角色:" prop="connection.role" class="systemForm">
                        <Select v-model="formValidate.connection.role" placeholder="请选择" style="width:40%">
                            <Option v-for='(item,index) in roleData' v-if="item.roleState == 2" :key="index" :value="item.systemRoleId">{{item.roleName}}</Option>
                            <Option v-for='(item,index) in roleData' v-if="item.roleState == 1" disabled :key="index" :value="item.systemRoleId">{{item.roleName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="邮箱:" prop="connection.email" class="systemForm">
                        <Input v-model="formValidate.connection.email" placeholder="请填写公司邮箱" style="width: 40%">
                        </Input>
                    </Form-item>
                    <Form-item label="手机:" prop="connection.mobile">
                        <Input v-model="formValidate.connection.mobile" style="width: 40%">
                        </Input>
                    </Form-item>
                    <Form-item label="座机:" prop="connection.telephone">
                        <Input v-model="formValidate.connection.telephone" style="width: 40%">
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
            </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import util from '../../libs/util.js';
import {
    mapState,
    mapActions
} from 'vuex'

export default {
    name: 'list',
    components: {
        // 'v-delete': Delete,
        // 'v-frozen': Frozen
    },
    data() {
        const mobilePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机不能为空'));
            } else if (!(/^1[234578]\d{9}$/.test(value))) {
                callback(new Error('手机号格式不正确'));
            } else {
                callback();
            }
        };
        const landlinPhone = (rule, value, callback) => {
            if (value === '') {
                callback()
            } else if (!/^(\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
                callback(new Error('座机号格式不正确'));
            } else {
                callback();
            }
        };
        return {
            roleData: [],
            formItem: {
                input: '',
                select: '',
                date: '',
                time: '',
                radio: '',
                checkbox: [],
                switch: ''
            },
            departmentList: [],
            message: '',
            type: 'primary',
            routerId: this.$route.query.id,
            editModal: false,
            detailModal: false,
            frozen: false, //冻结弹框
            showHeader: true, //是否显示表头 @:show-header
            fixedHeader: true, //是否固定表头 @:height
            tableSize: 'default', //@:size
            DateReady: false, // 判断异步数据加载完成，避免报错
            loading: false, //save
            currDate: {}, //当前编辑和新增的行数据
            currIndex: 0, //当前编辑和新增的行号
            saveDisabled: false,
            params: {
                page: 1,
                limit: 10,
                category: 'Android'
            },
            selection: [], //表格选中项
            listData: [], //@:data
            formValidate: {
                username: '', //登录名
                password: '', //登陆密码
                userRealName: '', //姓名
                roleList: [{
                    'value': '销售经理',
                    'text': 'A'
                }, {
                    'value': '市场经理',
                    'text': 'B'
                }, {
                    'value': '人事经理',
                    'text': 'C'
                }, {
                    'value': '财务经理',
                    'text': 'D'
                }, ], ///角色opc
                connection: {
                    role: '', //角色
                    email: '', //邮箱
                    mobile: '', //手机
                    telephone: '', //座机
                    department: '', //部门
                }
            },
            ruleValidate: {
                username: [],
                password: [

                ],
                userRealName: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                'connection.department': [{
                    required: true,
                    message: '部门不能为空',
                    trigger: 'change'
                }],
                'connection.role': [{
                    required: true,
                    message: '角色不能为空',
                    trigger: 'change'
                }],
                'connection.email': [{
                    required: true,
                    message: '邮箱不能为空',
                    trigger: 'blur'
                }, {
                    type: 'email',
                    message: '邮箱格式不正确',
                    trigger: 'blur'
                }],
                'connection.mobile': [{
                    required: true,
                    message: '不能为空',
                    trigger: 'blur'
                }, {
                    validator: mobilePhone,
                    trigger: 'blur'
                }],
                landline: [{
                    validator: landlinPhone,
                    trigger: 'blur'
                }]
            }

        }
    },
    watch: {
        message: {
            handler(val) {
                if (val == '解冻') {
                    this.type = 'error'
                } else if (val == '冻结') {
                    this.type = 'primary'
                }
            }
        },
        currDate: {
            handler(val) {
                for (let i = 0; i < Object.values(val).length; i++) {
                    if (Object.values(val)[i] == '') {
                        this.saveDisabled = true;
                        return
                    } else {
                        this.saveDisabled = false;
                    }
                }
            },
            deep: true
        }
    },
    computed: mapState({
        roleData2: state => state.role.roleDataList,
        departmentData: state => state.department.departmentDataList
    }),
    methods: {
        // 删除弹框
        deleteTip() {
            this.$Modal.confirm({
                title: '系统提示',
                content: '<p style="font-size:15px;">您确定要删除该账号吗？</p>',
                onOk: () => {
                    this.$store.dispatch('deleteEmployee', this.routerId)
                        .then(data => {
                            this.$Message.success('成功删除');
                            console.log(data);
                            this.$router.push('/employee');
                        }).catch(err => {
                            console.log(err);
                        })
                },
                onCancel: () => {
                    this.$Message.info('取消删除');
                }
            });
        },
        // 冻结弹框
        frozenTip() {
            this.$Modal.confirm({
                title: '系统提示',
                content: '<p style="font-size:15px;">您确定要' + this.message + '此账号吗？</p>',
                onOk: () => {
                    if (this.formValidate.isFreeze == false) {
                        this.$store.dispatch('freezeEmployee', this.routerId)
                            .then(data => {
                                this.$Message.success('冻结成功');
                                console.log(data);
                                this.message = '解冻';
                                this.$router.push('/employee');
                            }).catch(err => {
                                console.log(err);
                            })
                    } else {
                        this.$store.dispatch('defreezeEmployee', this.routerId)
                            .then(data => {
                                this.$Message.success('解冻成功');
                                this.message = '冻结';
                                console.log(data);
                                this.$router.push('/employee');
                            }).catch(err => {
                                console.log(err);
                            })
                    }
                },
                onCancel: () => {
                    this.$Message.info('取消冻结');
                }
            });
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (this.formValidate.password.length > 20) {
                    this.formValidate.password = '';
                }
                if (valid) {
                    let arr = {
                        password: this.formValidate.password,
                        userRealName: this.formValidate.userRealName,
                        department: this.formValidate.connection.department,
                        role: this.formValidate.connection.role,
                        email: this.formValidate.connection.email,
                        mobile: this.formValidate.connection.mobile,
                        telephone: this.formValidate.connection.telephone,
                        id: this.routerId
                    }
                    console.log(arr)
                    this.$store.dispatch('employeeEdit', arr).then(res => {
                        this.$store.dispatch('getAllEmployee', {
                            page: 1,
                            size: 10
                        })
                        util.openNewPage(this, 'employee_account');
                        this.$router.push({
                            name: 'employee_account',
                        });
                        this.$Message.success('编辑员工成功');
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name) {
            this.formValidate.password = '';
            this.formValidate.mail = '';
            this.formValidate.mobile = '';
            this.formValidate.landline = ''
        },
        getData() {
            this.$store.dispatch('getEmployeeByID', this.routerId).then(res => {
                this.formValidate = res.data.doc;
                this.formValidate.password = ''
                if (this.formValidate.isFreeze == false) {
                    this.message = '冻结'
                } else {
                    this.message = '解冻'
                }
            }).catch(err => {
                console.log(err);
            })
        },
        pageChange(page) {
            this.params.page = page
        },
        PageSizeChange(limit) {
            console.log(limit)
            this.params.limit = limit
        },
        frozenClick() {
            this.frozen = true;
        },
        saveBatch() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.$Message.info('保存成功')
                this.editModal = false
            }, 3000)
        },
        exportData(type) {
            if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: '原始数据'
                });
            } else if (type === 2) {
                this.$refs.table.exportCsv({
                    filename: '排序和过滤后的数据',
                    original: false
                });
            }
        },
        onSelect(selection, row) {
            // console.log(selection,row)
        },
        onSelectionChange(selection) {
            this.selection = selection
            console.log(selection)
        }

    },
    created() {
        this.$store.dispatch('getDepartment', {
                page: 1,
                size: 50
            }),
            this.$store.dispatch('getRole', {
                page: 1,
                size: 50
            }),
            this.roleData = this.roleData2;
        this.departmentList = this.departmentData;
        console.log(this.roleData, '1111111');
        console.log(this.departmentList, '22222222');
        this.getData()

    },
    mounted() {

    }
}
</script>
<style lang="less" scoped>
.search-filter {
    opacity: 0;
    display: none;
    overflow: hidden;
    transition: all 0.28s ease-out;
    &.active {
        opacity: 1;
        display: block;
    }
}

.boxselct {
    margin-bottom: 10px;
}

.isdelete {
    text-align: center;
    font-size: 16px;
}

.footerBtn {
    text-align: center
}


/*.ivu-select-single{ float: left;}*/


/*.ivu-input-wrapper{ float: left;}*/


/*.alertFlot{ float: left; padding-left: 20px;}*/

.system {
    border-bottom: 1px solid #E5E5E5;
    line-height: 35px;
}

.systemForm {
    margin-top: 20px;
}

.titlebox {
    overflow: hidden;
    line-height: 32px;
}

.title-rigth {
    float: right
}

.title-left {
    float: left
}

.formPass {
    margin: -10px 0 10px 150px;
    color: red;
}

.redfrozen {
    color: red
}

.frozen {
    color: #008000
}
</style>
