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
                        <Button onclick="history.go(-1)">返回</Button>
                    </div>
                </div>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                    <Form-item label="登录名:" prop="username">
                        <Input v-model="formValidate.username" style="width: 40%" placeholder="6~20位字符，区分大小写">
                        </Input>
                    </Form-item>
                    <Form-item label="登录密码:" prop="password">
                        <Input v-model="formValidate.password" placeholder="8~16位字符，区分大小写" style="width: 40%">
                        </Input>
                    </Form-item>
                    <div class="system">
                        <Icon type="ios-film-outline"></Icon>
                        基本信息
                    </div>
                    <Form-item label="姓名:" prop="name" class="systemForm">
                        <Input v-model="formValidate.name" style="width: 40%">
                        </Input>
                    </Form-item>
                    <Form-item label="部门:" prop="department" class="systemForm">
                        <Select v-model="formValidate.department" placeholder="请选择" style="width:40%" @on-change="departmentClick">
                            <Option v-for='(item,index) in departmentList' :key='index' :value="item.departmentId" :label="item.departmentName" v-if='item.departmentStatus==1'></Option>
                            <Option v-for='(item,index) in departmentList' :key='index' :value="item.departmentId" :label="item.departmentName" v-if='item.departmentStatus==2' disabled></Option>
                        </Select>
                    </Form-item>
                    <Form-item label="角色:" prop="role" class="systemForm">
                        <Select v-model="formValidate.role" placeholder="请选择" style="width:40%">
                            <Option v-for='(item,index) in roleData' v-if="item.roleState == 2" :key="index" :value="item.systemRoleId">{{item.roleName}}</Option>
                            <Option v-for='(item,index) in roleData' v-if="item.roleState == 1" disabled :key="index" :value="item.systemRoleId">{{item.roleName}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="岗位:" prop="post" class="systemForm">
                        <Input v-model="formValidate.post" style="width: 40%">
                        </Input>
                    </Form-item>
                    <Form-item label="邮箱:" prop="email" class="systemForm">
                        <Input v-model="formValidate.email" placeholder="请填写公司邮箱" style="width: 40%">
                        </Input>
                    </Form-item>
                    <Form-item label="手机:" prop="mobile" class="systemForm">
                        <Input v-model="formValidate.mobile" style="width: 40%">
                        </Input>
                    </Form-item>
                    <Form-item label="座机:" prop="telephone">
                        <Input v-model="formValidate.telephone" placeholder="示例：010-1234568-11" style="width: 40%">
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
    mapActions,
    mapGetters
} from 'vuex'

export default {
    name: 'list',
    components: {},
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
            formItem: {
                input: '',
                select: '',
                date: '',
                time: '',
                radio: '',
                checkbox: [],
                switch: ''
            },
            roleData: [],
            departmentList: [],
            editModal: false,
            detailModal: false,
            deleteTip: false,
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
                name: '', //姓名
                department: '', //部门
                role: '', //角色
                post: '', //岗位
                email: '', //邮箱
                mobile: '', //手机
                landline: '', //座机
            },
            ruleValidate: {
                username: [{
                    required: true,
                    message: '登录名不能为空',
                    trigger: 'blur'
                }, {
                    min: 6,
                    max: 20,
                    message: '登录名需6到20位',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }, {
                    min: 8,
                    max: 16,
                    message: '密码需8到16位',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                department: [{
                    required: true,
                    message: '部门不能为空',
                    trigger: 'change'
                }],
                role: [{
                    required: true,
                    message: '角色不能为空',
                    trigger: 'change'
                }],
                post: [{
                    required: true,
                    message: '岗位不能为空',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '邮箱不能为空',
                    trigger: 'blur'
                }, {
                    type: 'email',
                    message: '邮箱格式不正确',
                    trigger: 'blur'
                }],
                mobile: [{
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
    computed: mapState({
        roleData2: state => state.role.roleDataList,
        departmentData: state => state.department.departmentDataList
    }),
    methods: {
        departmentClick() {
            console.log(this.formValidate.department)
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let arr = {
                        username: this.formValidate.username,
                        password: this.formValidate.password,
                        userRealName: this.formValidate.name,
                        department: this.formValidate.department,
                        role: this.formValidate.role,
                        post: this.formValidate.post,
                        email: this.formValidate.email,
                        mobile: this.formValidate.mobile,
                        telephone: this.formValidate.telephone
                    }
                    console.log(arr)
                    this.$store.dispatch('employeeAdd', arr).then(data => {
                        this.$store.dispatch('getAllEmployee', {
                            page: 1,
                            size: 10
                        })
                        util.openNewPage(this, 'employee_account');
                        this.$router.push({
                            name: 'employee_account',
                        });
                        this.$Message.success('添加员工成功');
                    }).catch(err => {
                        console.log(err);
                        this.$Message.error('登录名已存在');
                    })
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        pageChange(page) {
            this.params.page = page
        },
        PageSizeChange(limit) {
            console.log(limit)
            this.params.limit = limit
        },
        onSelect(selection, row) {
            // console.log(selection,row)
        },
        deleteBatch() {

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
        })
        this.$store.dispatch('getRole', {
            page: 1,
            size: 50
        })
        this.roleData = this.roleData2;
        this.departmentList = this.departmentData;
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
</style>
