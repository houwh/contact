<template>
    <!--<div class="panel-group" id="accordion">-->
        <!--<div v-for="(item,index) in items">-->
            <!--<div class="style3">-->
                <!--<div>-->
                    <!--<div :class='item.icon' @click="changeIt(index)" class="outside">-->
                        <!--{{item.title}}-->
                        <!--<div v-show="currentIndex == index" class="style3">-->
                            <!--<div v-for="(item2,index) in item.subs" class="style1">-->
                                <!--<router-link :to="item2.index">-->
                                    <!--<a href="#" :class="item2.icon" class="style0">-->
                                        <!--{{ item2.title }}-->
                                    <!--</a>-->
                                <!--</router-link>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->

                <!--</div>-->

            <!--</div>-->
        <!--</div>-->
    <!--</div>-->


    <div class="row">
        <div class="col-md-3 www">
            <div class="panel-group table-responsive" role="tablist">
                <!--<div class="panel panel-primary leftMenu" v-for="(item,index) in items" :key="index">-->
                    <!--<div class="panel-heading" :id="'collapseListGroupHeading'+index" data-toggle="collapse" :data-target="'#collapseListGroup'+index" role="tab" >-->
                        <!--<h4 class="panel-title">-->
                            <!--{{item.title}}-->
                            <!--<span class="glyphicon glyphicon-chevron-up right"></span>-->
                        <!--</h4>-->
                        <!--<div v-for="data in item.subs" :id="'collapseListGroup'+index" class="panel-collapse collapse in" role="tabpanel" :aria-labelledby="'collapseListGroupHeading'+index">-->
                            <!--<ul class="list-group">-->
                                <!--<li class="list-group-item">-->
                                    <!--<button class="menu-item-left" data-target="test2.html">-->
                                        <!--<span class="glyphicon glyphicon-triangle-right"></span>{{data.title}}-->
                                    <!--</button>-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <div class="panel panel-primary leftMenu">
                    <!-- 利用data-target指定要折叠的分组列表 -->
                    <div class="panel-heading" id="collapseListGroupHeading1" data-toggle="collapse"  role="tab" >
                        <h4 class="panel-title">
                            <i class="glyphicon glyphicon-equalizer"></i>
                            客户管理
                            <!--<span class="glyphicon glyphicon-chevron-up right"></span>-->
                        </h4>
                    </div>
                    <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
                    <div id="collapseListGroup1" class="panel-collapse collapse in" role="tabpanel" >
                        <ul class="list-group">
                            <li class="list-group-item">
                                <!-- 利用data-target指定URL -->
                                <a href="#/customer" class="menu-item-left" data-target="test2.html">
                                    <span class="glyphicon glyphicon-pawn"></span>
                                    客户账号管理
                                </a>
                            </li>
                        </ul>
                    </div>
                </div><!--panel end-->
                <div class="panel panel-primary leftMenu">
                    <div class="panel-heading" id="collapseListGroupHeading2" data-toggle="collapse"  role="tab" >
                        <h4 class="panel-title">
                            <i class="glyphicon glyphicon-fire"></i>
                            代理商管理
                            <!--<span class="glyphicon glyphicon-chevron-down right"></span>-->
                        </h4>
                    </div>
                    <div id="collapseListGroup2" class="panel-collapse collapse" role="tabpanel" >
                        <ul class="list-group">
                            <li class="list-group-item">
                                <a href="#/agent" class="menu-item-left">
                                    <span class="glyphicon glyphicon-knight"></span>
                                    代理商账号管理
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="panel panel-primary leftMenu">
                    <div class="panel-heading" id="collapseListGroupHeading3" data-toggle="collapse"  role="tab" >
                        <h4 class="panel-title">
                            <i class="glyphicon glyphicon-user"></i>
                            员工管理
                            <!--<span class="glyphicon glyphicon-chevron-down right"></span>-->
                        </h4>
                    </div>
                    <div id="collapseListGroup3" class="panel-collapse collapse" role="tabpanel" >
                        <ul class="list-group">
                            <li class="list-group-item">
                                <a href="#/employee" class="menu-item-left">
                                    <span class="glyphicon glyphicon-ice-lolly"></span>
                                    员工账号管理
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="panel panel-primary leftMenu">
                    <div class="panel-heading" id="collapseListGroupHeading4" data-toggle="collapse"  role="tab" >
                        <h4 class="panel-title">
                            <i class="glyphicon glyphicon-star"></i>
                            产品管理
                            <!--<span class="glyphicon glyphicon-chevron-down right"></span>-->
                        </h4>
                    </div>
                    <div id="collapseListGroup4" class="panel-collapse collapse" role="tabpanel" >
                        <ul class="list-group">
                            <li class="list-group-item">
                                <a href="#/product" class="menu-item-left">
                                    <span class="glyphicon glyphicon-gift"></span>
                                    产品管理
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="panel panel-primary leftMenu">
                    <div class="panel-heading" id="collapseListGroupHeading5" data-toggle="collapse"  role="tab" >
                        <h4 class="panel-title">
                            <i class="glyphicon glyphicon-jpy"></i>
                            财务管理
                            <!--<span class="glyphicon glyphicon-chevron-down right"></span>-->
                        </h4>
                    </div>
                    <div id="collapseListGroup5" class="panel-collapse collapse" role="tabpanel" >
                        <ul class="list-group">
                            <li class="list-group-item">
                                <a href="#/finance" class="menu-item-left">
                                    <span class="glyphicon glyphicon-usd"></span>
                                    收入管理
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="panel panel-primary leftMenu">
                    <div class="panel-heading" id="collapseListGroupHeading6" data-toggle="collapse"  role="tab" >
                        <h4 class="panel-title">
                            <i class="glyphicon glyphicon-globe"></i>
                            全局配置
                            <!--<span class="glyphicon glyphicon-chevron-down right"></span>-->
                        </h4>
                    </div>
                    <div id="collapseListGroup6" class="panel-collapse collapse" role="tabpanel" >
                        <ul class="list-group">
                            <li class="list-group-item">
                                <a href="#/label" class="menu-item-left">
                                    <span class="glyphicon glyphicon-tags"></span>
                                    标签管理
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default{

        mounted(){

                $(".panel-heading").click(function(e){
                    /*切换折叠指示图标*/
//                    $(this).find("span").toggleClass("glyphicon-chevron-down");
//                    $(this).find("span").toggleClass("glyphicon-chevron-up");
                    $(this).next('div').show(300)
                        .parent().siblings().find(".panel-collapse").hide(300)
                });


                $(".menu-item-left").click(function(){
                    $(this).addClass('active').parents(".panel-primary").siblings().find('a').removeClass('active')
                })

        }
    }
//    $(function(){
//        $(".panel-heading").click(function(e){
//            /*切换折叠指示图标*/
//            $(this).find("span").toggleClass("glyphicon-chevron-down");
//            $(this).find("span").toggleClass("glyphicon-chevron-up");
//        });
//    });

//    export default {
//        data() {
//            return {
//                currentIndex:99,
//                flag:false,
//                items: [
//                    {
//                        icon: 'glyphicon glyphicon-equalizer',
//                        index: '1',
//                        title: '客户管理',
//                        subs: [
//                            {
//                                icon:'glyphicon glyphicon-pawn',
//                                index: '/customer',
//                                title: '客户账号管理'
//                            },
//                        ]
//                    },
//                    {
//                        icon: 'glyphicon glyphicon-fire',
//                        index: '2',
//                        title: '代理商管理',
//                        subs: [
//                            {
//                                icon:'glyphicon glyphicon-knight',
//                                index: '/agent',
//                                title: '代理商账号管理'
//                            },
//                        ]
//                    },
//                    {
//                        icon: 'glyphicon glyphicon-user',
//                        index: '3',
//                        title: '员工管理',
//                        subs: [
//                            {
//                                icon:'glyphicon glyphicon-ice-lolly',
//                                index: '/employee',
//                                title: '员工账号管理'
//                            },
//                        ]
//                    },
//                    {
//                        icon: 'glyphicon glyphicon-star',
//                        index: '4',
//                        title: '产品管理',
//                        subs: [
//                            {
//                                icon:'glyphicon glyphicon-gift',
//                                index: '/product',
//                                title: '产品管理'
//                            },
//                        ]
//                    },
//                    {
//                     icon: 'glyphicon glyphicon-jpy',
//                     index: '5',
//                     title: '财务管理',
//                     subs: [
//                             {
//                                 icon:'glyphicon glyphicon-usd',
//                                index: 'finance',
//                                title: '收入管理'
//                             },
//                            ]
//                     },
//                    {
//                        icon: 'glyphicon glyphicon-globe',
//                        index: '6',
//                        title: '全局配置',
//                        subs: [
//                            {
//                                icon:'glyphicon glyphicon-tags',
//                                index: '/label',
//                                title: '标签管理'
//                            },
////                         {
////                             index: 'role',
////                             title: '角色管理'
////                         },
//                        ]
//                    },
//                ]
//            }
//        },
//        computed:{
//            onRoutes(){
//                return this.$route.path.replace('/','');
//            }
//        },
//        methods:{
//            changeIt(index){
//                this.currentIndex = index;
//                console.log(index);
//                this.flag=!this.flag;
////                document.querySelector('.style3 a').className='color3';
//            }
//        }
//    }
</script>

<style scoped>
    .outside{
        height:50px;
        line-height: 55px;
        /*margin-top:20px;*/
        margin-left: 55px;
        cursor: pointer;
    }
    a{
        display: inline-block;
        color:#666;
        text-decoration: none;
       margin-top:-8px;
        margin-left: 50px;
        cursor: pointer;
    }
    /*a:hover{*/
        /*color:#337ab7;*/
    /*}*/
    .active{
        color:#337ab7;
    }
    .style0{
        margin-left:-48px;
        color: #117eff;
    }
    #accordion{
        /*background:pink;*/
    }
    .panel-heading{ background: #fff; border:none;}
    .panel-primary{ border: none;}
    .panel-group .panel+.panel{ margin-top: 0;}
    .right{ float: right; margin-right: 50px;}
    .panel-heading{ padding-left: 50px;}
    .www{height: 100vh; background: #fff;}
    .panel-title{ font-size: 14px; font-weight: 100; color: black}
    .panel-title i{ padding-right: 15px;}
    .menu-item-left{ width: 100% ; height: 100%;}
    .menu-item-left span{ padding-right: 15px;}
</style>
