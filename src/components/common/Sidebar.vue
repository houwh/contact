<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router @open="handleOpen">
        		<!--头像，设置-->
        		<div class="portrait">
	    			<div class="img-por">
	    				<img src="../../assets/logo.png" alt="" />
	    			</div>
    				<p class="userobj">{{userObj.username}}</p>
    				<el-row class="block-col-2">
    					<el-col :span="12">
					    <el-dropdown trigger="click">
					      <span class="el-dropdown-link">
					        设置<i class="el-icon-caret-bottom el-icon--right"></i>
					      </span>
					      <el-dropdown-menu slot="dropdown">
					       	<div class="drop-left" @click="changepdDialogVisible=true">
					       		<i class="iconfont icon-xiugai" style="color: rgb(0,172,141);"></i>
					       		<p>修改密码</p>
					       		<!--<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->
					       	</div>
					       	<div class="drop-right" @click="userLogout">
					       		<i class="iconfont icon-tuichu" style="color: rgb(163,172,189);"></i>
					       		<p>退出登录</p>
					       	</div>
					      </el-dropdown-menu>
					    </el-dropdown>
					  </el-col>
    				</el-row>
    			</div>

    			<!--侧边栏-->
            <template v-for="(item,index) in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title" class="ccc">
                            <i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" :class="{aaa:onRoutes==subItem.index}">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-submenu >
                        <el-menu-item :index="item.index">
                            <i :class="item.icon"></i>{{ item.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
            </template>
        </el-menu>

        <!--修改密码-->
        <el-dialog title="修改密码" :visible.sync="changepdDialogVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="90px">
                <el-form-item label="原密码:" prop="password">
                    <el-input type="password" placeholder="请输入原密码" v-model="ruleForm.password" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="newpassword">
                    <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.newpassword" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item label="新密码确认:" prop="newpasswordAgain">
                    <el-input type="password" placeholder="请再次输入新密码" v-model="ruleForm.newpasswordAgain" style="width: 70%;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            		<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    data() {
    		var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          if (this.ruleForm.newpasswordAgain !== '') {
		            //this.$refs.rules.validateField('newpasswordAgain');
		          }
		          callback();
		        }
	      };
	      var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm.newpassword) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
	      };
        return {
                routePath:this.$route.path,
                userObj:{},
        		ruleForm: {
                password: '',
                newpassword: '',
                newpasswordAgain: '',
            },
            rules:{
            		password: [
                    { required: true, message: '请输入登录名', trigger: 'blur' },
                ],
                newpassword: [
                    {required: true, validator: validatePass, trigger: 'blur' }
                ],
                newpasswordAgain: [
                    {required: true, validator: validatePass2, trigger: 'blur' },
                ],
            },
        		changepdDialogVisible: false,  //修改密码
        		liId:'0',
            items: [
                {
                    icon: 'el-icon-date',
                    index: '2',
                    title: '客户管理',
                    subs: [
                        {
                            index: '/customer',
                            title: '客户账号管理'
                        },
                    ]
                },
                {
                    icon: 'el-icon-menu',
                    index: '3',
                    title: '员工管理',
                    subs: [
                        {
                            index: '/employee',
                            title: '员工账号管理'
                        },
                    ]
                },
                {
                    icon: 'el-icon-star-on',
                    index: '4',
                    title: '代理管理',
                    subs: [
                        {
                            index: '/product',
                            title: '代理产品管理'
                        },
                    ]
                },
                /*{
                    icon: 'el-icon-menu',
                    index: '5',
                    title: '财务管理',
                    subs: [
                        {
                            index: 'financial',
                            title: '收入管理'
                        },
                    ]
                },*/
                {
                    icon: 'el-icon-setting',
                    index: '5',
                    title: '全局配置',
                    subs: [
                        {
                            index: '/department',
                            title: '部门管理'
                        },
                         {
                             index: '/role',
                             title: '角色管理'
                         },
                    ]
                },
            ]
        }
    },
    computed: {
        onRoutes() {
            var arr = ''
            if(this.$route.path == '/department'){
                arr = this.$route.path.substring(0,11);
            }else {
                arr = this.$route.path.substring(0, 9);
            }
            return arr
        }
    },
    mounted(){
        //console.log(this.$router.options.routes[1].children,"$router.options.routes")
        this.userObj = JSON.parse(localStorage.getItem('userObj'))
        //console.log(this.userObj,"this.userObj")
    },
    methods:{
//        退出登录
        userLogout(){
            this.$store.dispatch("UserLogout");
            this.$message({
                message: '已成功退出',
                type: 'success'
            });
        },
    		//修改密码 取消按钮
        cancel() {
            this.changepdDialogVisible = false;
            this.$refs['ruleForm'].resetFields();
        },
        //修改密码 表单提交
        submitForm(formName) {
            this.$confirm('此操作将需要重新登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.newpassword != this.ruleForm.newpasswordAgain) {
                            this.$message({
                                type: 'error',
                                message: '两次新密码输入不一致，请检查',
                                duration: 5000
                            });
                            return;
                        }

                        let data = {
                            password: this.ruleForm.password,
                            newPassword: this.ruleForm.newpassword
                        }

                        this.$store.dispatch('ChangePassword', data).then(res => {
                            this.$message({
                                type: 'success',
                                message: '密码修改成功，2s 后将转到登录页面'
                            });

                            setTimeout(() => {
                                localStorage.removeItem('jwt');
                                this.$store.state.token = '';
                                this.$router.push('/login');
                            }, 2000);
                        }).catch(error => {
                            console.log(error);
                            if (error.data) {
                                this.$message({
                                    type: 'error',
                                    message: error.data.msg
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: error.err
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }).catch(() => {
            });
        },
    		liClick(id){
    			console.log(id)
    		},
    		handleOpen(key, keyPath) {
    			this.liId = key-1
    			this.liId = this.liId-1
    			console.log(this.liId)
           //console.log(key, keyPath);
       },
    }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    width: 210px;
    left: 0;
    top: 0px;
    bottom: 0;
    background-color:rgb(47,64,80) ;
    float: left;
}
.el-menu-vertical-demo{
	background: url(../../../static/img/top@2x.png) no-repeat;
	background-size:210px 164px;
}

    .sidebar > ul {
        height: 100%;
    }

    i{

    }
    /*.el-submenu{ margin-right: 8px;}*/

    .el-menu{ background-color:rgb(47,64,80) ; overflow: hidden;}
    /*.el-icon-date{ margin-right: 8px;}*/
   .el-submenu [class^=el-icon-]{ margin-right: 8px;}

	.el-submenu .el-menu{ background-color:black ;}
	.el-submenu .el-menu-item{ background: rgb(41,54,70);}
    .aaa{ border-left: 4px solid rgb(0,172,141); background: rgb(41,54,70); color: #fff;}
    .bbb{ color:rgb(255,255,255) ;}
    .el-menu-item{ padding-left: 50px !important;}

    .el-menu-vertical-demo>ul>li:hover{
    		background: red;
    }

    .img-por{width: 48px; height: 48px; border-radius: 50%; overflow: hidden;}
    .img-por img{ width: 100%;}
    .portrait{padding: 41px 0 0 26px;}
    .portrait p{font-size: 14px; text-align: left; color: rgb(202,209,219); padding: 6px 0 4px 0;}
    .el-dropdown{margin-bottom: 25px;}
    .el-dropdown-link{color: rgb(125,147,165); font-size: 14px; }
    .el-icon-caret-bottom{margin-left: 27px;}
    .el-dropdown-menu{ width: 165px; height: 58px; border-radius:2px ; left: 20px !important; box-sizing: border-box; padding:10px 0 ;}
    .el-dropdown-menu div{width: 50%; height: 100%; float: left; box-sizing: border-box;}
    .drop-left{ border-right: 2px solid rgb(243,243,244);}
    .drop-left,.drop-right{ text-align: center;}
    .drop-left p,.drop-right p{font-size: 12px; color: rgb(105,108,110); margin-top: 7px;}

    /*.portrait span{ display: inline-block; color: rgb(125,147,165); font-size: 14px; padding-bottom: 40px;}*/
</style>


