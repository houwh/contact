<template>
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <h4 class="style1">
                权限管理
            </h4>
            <div class="leftBtn">
                <button type="button" class="btn btn-primary btn-lg active" @click="fold">全部折叠</button>
                <button type="button" class="btn btn-primary btn-lg active">全部展开</button>
            </div>
            <div class="col-md-12 col-lg-12 jurisd-box">
                <div class="col-md-5 col-lg-5 jurisd-menu">
                    <ul>
                        <li>
                            <i class="iconfont">&#xe600;</i>智牛后台管理系统
                        </li>
                        <li v-for="(item,index) in listDate" class="twomenu">
                            <i :class="item.icon=='\ue602'?'fadff':'ffbb'" class="iconfont" @click="editlicense($event,index)">{{item.icon}}</i>{{item.title}}
                            <ul v-if="foldJugen">
                                <li v-for="(data,i) in item.name" class="threemenu" v-if="foldId==data.id">
                                    <i class="iconfont" :class="item.icon=='\ue600'?'fadff':'ffbb'">{{data.icon}}</i>{{data.titleItem}}
                                    <ul>
                                        <li v-for="(num,j) in data.three" class="fourmenu">
                                            <i class="iconfont" :class="item.icon=='\ue600'?'fadff':'ffbb'">{{num.icon}}</i>{{num.title}}
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="col-md-1 col-lg-1 contentdiv">
                    <p></p>
                </div>
                <div class="col-md-5 col-lg-5 rightdiv">
                    <!--<p>在左侧选择树节点，鼠标右键进行添加！</p>-->
                    <div v-show="edit">
                        <div class="col-md-12 col-lg-12">
                            <div class="col-md-5 col-lg-5 rightdiv-left">所在位置:</div>
                            <div class="col-md-7 col-lg-7 rightdiv-right">1</div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <div class="col-md-5 col-lg-5 rightdiv-left">类型:</div>
                            <div class="col-md-7 col-lg-7 rightdiv-right">2</div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <div class="col-md-5 col-lg-5 rightdiv-left">名称:</div>
                            <div class="col-md-7 col-lg-7 rightdiv-right">2</div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <div class="col-md-5 col-lg-5 rightdiv-left">唯一标识:</div>
                            <div class="col-md-7 col-lg-7 rightdiv-right">2</div>
                        </div>
                        <div class="col-md-12 col-lg-12 rightdiv-btn">
                            <button @click="editclick" class="btn btn-primary btnpadd" data-toggle="modal">编辑</button>
                            <button class="btn btn-danger btnpadd" data-toggle="modal" data-target=".bs-example-modal-delete">删除</button>
                        </div>
                    </div>

                    <!---编辑-->
                    <div v-show="!edit">
                        <div class="col-md-12 col-lg-12">
                            <div class="col-md-5 col-lg-5 rightdiv-left">所在位置:</div>
                            <div class="col-md-7 col-lg-7 rightdiv-right">1</div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <div class="col-md-5 col-lg-5 rightdiv-left">类型:</div>
                            <div class="col-md-7 col-lg-7 rightdiv-right">
                                    <label>
                                        <input class="custom_radio" type="radio" name="Fruit2" v-model="userType" :value="1" /> 未上线
                                    </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input class="custom_radio" type="radio" name="Fruit2" v-model="userType" :value="2" /> 已上线
                                    </label>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <div class="col-md-5 col-lg-5 rightdiv-left">名称:</div>
                            <div class="col-md-7 col-lg-7 rightdiv-right">
                                <input type="text" v-model="mobile" name="email" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                            <div class="col-md-5 col-lg-5 rightdiv-left">唯一标识:</div>
                            <div class="col-md-7 col-lg-7 rightdiv-right">
                                <input type="text" v-model="mobile" name="email" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12 rightdiv-btn">
                            <button @click="editclick" class="btn btn-primary btnpadd" data-toggle="modal">编辑</button>
                            <button class="btn btn-danger btnpadd" data-toggle="modal" data-target=".bs-example-modal-delete">删除</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <v-delete :name="name"></v-delete>
    </div>
</template>


<script>

    import Delete from '../../common/delete.vue'

    export default{
        data(){
            return{
                listDate:[
                    {title:"首页",icon:"\ue602"},
                    {title:"客户管理",icon:"\ue600",
                        name:[
                            {titleItem:"客户账号管理", id:"1",icon:"\ue600",three: [
                                {title:"开户",icon:"\ue602"},
                                {title:"编辑",icon:"\ue602"},
                                {title:"授权",icon:"\ue602"}
                            ]},
                            {titleItem:"客户公告管理",icon:"\ue602",id:"1",},
                            {titleItem:"客户消息管理",icon:"\ue602",id:"1",},
                        ]
                    },
                    {title:"代理商管理",icon:"\ue600",
                        name:[
                            {titleItem:"代理商账号管理",id:"2",icon:"\ue602",three:[
                                {title:"开户",icon:"\ue602"},
                                {title:"编辑",icon:"\ue602"},
                                {title:"授权",icon:"\ue602"}
                            ]},
                            {titleItem:"代理商公告管理",icon:"\ue602",id:"2"},
                            {titleItem:"代理商消息管理",icon:"\ue602",id:"2"}
                        ]
                    },
                    {title:"员工管理",icon:"\ue602"},
                    {title:"财务管理",icon:"\ue600",
                        name:[
                            {titleItem:"充值管理",icon:"\ue602",id:"4"},
                            {titleItem:"发票管理",icon:"\ue602",id:"4"}
                        ]
                    },
                    {title:"统计分析",icon:"\ue602"},
                    {title:"产品管理",icon:"\ue602"},
                    {title:"知识管理",icon:"\ue602"},
                    {title:"全局管理",icon:"\ue602"},
                    {title:"统计中心",icon:"\ue602"},
                    {title:"个人设置",icon:"\ue602"}
                ],
                foldJugen:"true",
                foldId:"",
                name:"您确定要删除该权限吗？",
                edit:true,
                mobile:"132312323",
                userType:"wadaw"
            }
        },

        methods:{
            fold(){
                this.foldJugen = !this.foldJugen
            },
            editlicense(e,id){

                this.foldId = id;

            },
            editclick(){
                this.edit = false
            }
        },
        components:{
            "v-delete":Delete
        }
    }

</script>

<style scoped>

    .btn-lg{
        font-size: 13px;
    }
    li{ list-style: none ; font-size: 13px;}
    .twomenu{ margin-left: 15px;}
    .twomenu>i{padding-right: 3px}
    .threemenu{margin-left: 15px; }
    .threemenu>i{padding-right: 3px
    }
    .fourmenu{ margin-left: 15px;}
    .fourmenu>i{ padding-right: 3px}


    .jurisd-box{ box-sizing: border-box; margin: 20px;}
    .jurisd-menu{ border-top: 2px solid #E5E5E5; overflow-y: auto; height: 510px;
        padding-top: 20px;
    }
    .ffbb{color: #ffbb36;}
    .fadff{color: #7fadff ;}
    p{color:darkgray; font-size: 20px}
    .contentdiv{ height: 510px;}
    .contentdiv>p{ width: 2px; height:480px;background: #E5E5E5;margin: 0 40px;  margin-top: 15px;}
    .col-md-1{ margin-left: 0;}
    .style1{ border-bottom: 1px solid #E5E5E5; padding: 20px; margin-top: 0;}
    .leftBtn{margin-left: 20px;}
    .rightdiv{height:510px;text-align: center; border-top: 2px solid #E5E5E5; padding-top: 40px; line-height: 40px;
        font-size: 14px;
    }
    .rightdiv>P{
        line-height: 300px;
    }

    .rightdiv-left{ text-align: right}
    .rightdiv-right{ text-align: left}
    .rightdiv-btn{ text-align: center; padding-top: 20px;}
    .btnpadd{
        padding: 6px 30px;
    }
    .col-lg-12,.col-md-12{
        padding-right: 0;
    }
    .btnpadd{ margin: 0 5px;}
</style>
