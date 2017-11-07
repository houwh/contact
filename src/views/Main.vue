<style lang="less">
@import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': hideMenuText}">
        <div class="sidebar-menu-con" :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', background: $store.state.menuTheme === 'dark'?'#495060':'white'}">
            <div class="logo-con">
                <transition-group name="logo-img">
                    <img v-show="!hideMenuText" src="../images/logo-white.png" key="max-logo" />
                    <img v-show="hideMenuText" src="../images/logo-min.png" key="min-logo" />
                </transition-group>
            </div>
            <sidebar-menu v-if="!hideMenuText" :menuList="menuList" :iconSize="14" />
            <sidebar-menu-shrink :icon-color="menuIconColor" v-else :menuList="menuList" />
        </div>
        <div class="main-header-con" :style="{paddingLeft: hideMenuText?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="switch-theme-con">
                        <Row class="switch-theme" type="flex" justify="center" align="middle">
                            <theme-dropdown-menu></theme-dropdown-menu>
                        </Row>
                    </div>
                    <div class="message-con">
                        <Badge :count="messageCount" overflow-count="99">
                            <Tag type="border" color="blue">
                                <Button @click="showVisitor" type="text" size="small" long>访客留电</Button>
                            </Tag>
                        </Badge>
                    </div>
                    <div class="message-con">
                        <Badge :count="messageCount" overflow-count="99">
                            <Tag type="border" color="blue">
                                <Button @click="showExtern" type="text" size="small">开户续费</Button>
                            </Tag>
                        </Badge>
                    </div>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown trigger="click" @on-click="handleClickUserDropdown" :transfer="true">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <div>
                                        <Row class="margin-top-8">
                                            <Col span="8">
                                            <p class="notwrap">登录名：</p>
                                            </Col>
                                            <Col span="16" class="padding-left-8">yzg</Col>
                                        </Row>
                                        <Row class="margin-top-8">
                                            <Col span="8">
                                            <p class="notwrap">真实姓名：</p>
                                            </Col>
                                            <Col span="16" class="padding-left-8">杨振国</Col>
                                        </Row>
                                        <Row class="margin-top-8">
                                            <Col span="8">
                                            <p class="notwrap">上次登录IP：</p>
                                            </Col>
                                            <Col span="16" class="padding-left-8">114.248.230.6 北京市联通</Col>
                                        </Row>
                                        <Row class="margin-top-8">
                                            <Col span="8">
                                            <p class="notwrap">上次登录时间：</p>
                                            </Col>
                                            <Col span="16" class="padding-left-8">2017-06-28 14:12:12</Col>
                                        </Row>
                                    </div>
                                    <div class="line-gray"></div>
                                    <Row class="margin-top-8">
                                        <Col span="12">
                                        <p class="notwrap">
                                            <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                        </p>
                                        </Col>
                                        <Col span="12" class="padding-left-8">
                                        <DropdownItem name="loginout">退出</DropdownItem>
                                        </Col>
                                    </Row>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: hideMenuText?'60px':'200px'}">
            <div class="single-page">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
import sidebarMenu from './main_components/sidebarMenu.vue';
import tagsPageOpened from './main_components/tagsPageopened.vue';
import breadcrumbNav from './main_components/breadcrumbNav.vue';
import themeDropdownMenu from './main_components/themeDropdownMenu.vue';
import sidebarMenuShrink from './main_components/sidebarMenuShrink.vue';
import Cookies from 'js-cookie';
import util from '@/libs/util.js';
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex';


export default {
    components: {
        sidebarMenu,
        tagsPageOpened,
        breadcrumbNav,
        themeDropdownMenu,
        sidebarMenuShrink
    },
    data() {
        return {
            spanLeft: 4,
            spanRight: 20,
            currentPageName: '',
            hideMenuText: false,
            userName: '',
            showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
            isFullScreen: false,
            messageCount: 0,
            lockScreenSize: 0
        };
    },
    computed: {
        ...mapGetters([
            'menuList',
            'tagsList',
            'pageTagsList',
            'currentPath',
            'menuIconColor',
        ]),
        avatorPath() {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        init() {
            this.$store.dispatch('setCurrentPageName', this.$route.name);
            let pathArr = util.setCurrentPath(this, this.$route.name);
            if (pathArr.length >= 2) {
                this.$store.dispatch('addOpenSubmenu', pathArr[1].name);
            }
            this.userName = Cookies.get('user');
            let messageCount = 3;
            this.messageCount = messageCount.toString();
            this.checkTag(this.$route.name);
        },
        toggleClick() {
            this.hideMenuText = !this.hideMenuText;
        },
        handleClickUserDropdown(name) {
            if (name === 'ownSpace') {
                util.openNewPage(this, 'ownspace_index');
                this.$router.push({
                    name: 'ownspace_index'
                });
            } else if (name === 'loginout') {
                // 退出登录
                Cookies.remove('user');
                Cookies.remove('password');
                Cookies.remove('hasGreet');
                Cookies.remove('access');
                this.$Notice.close('greeting');
                this.$store.dispatch('clearOpenedSubmenu');
                // 回复默认样式
                let themeLink = document.querySelector('link[name="theme"]');
                themeLink.setAttribute('href', '');
                // 清空打开的页面等数据，但是保存主题数据
                let theme = '';
                if (localStorage.theme) {
                    theme = localStorage.theme;
                }
                localStorage.clear();
                if (theme) {
                    localStorage.theme = theme;
                }
                this.$router.push({
                    name: 'login'
                });
            }
        },
        handleFullScreen() {
            let main = document.getElementById('main');
            if (this.isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                }
            }
        },
        showExtern() {
            util.openNewPage(this, 'extern_account');
            this.$router.push({
                name: 'extern_account'
            });
        },
        showVisitor() {
            util.openNewPage(this, 'visitor');
            this.$router.push({
                name: 'visitor'
            });
        },
        lockScreen() {
            let lockScreenBack = document.getElementById('lock_screen_back');
            lockScreenBack.style.transition = 'all 3s';
            lockScreenBack.style.zIndex = 10000;
            lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset';
            this.showUnlock = true;
            this.$store.dispatch('lock');
            Cookies.set('last_page_name', this.$route.name); // 本地存储锁屏之前打开的页面以便解锁后打开
            setTimeout(() => {
                lockScreenBack.style.transition = 'all 0s';
                this.$router.push({
                    name: 'locking'
                });
            }, 800);
        },
        checkTag(name) {
            let openpageHasTag = this.pageTagsList.some(item => {
                if (item.name === name) {
                    return true;
                }
            });
            if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
            }
        }
    },
    watch: {
        '$route' (to) {
            this.$store.dispatch('setCurrentPageName', to.name);
            let pathArr = util.setCurrentPath(this, to.name);
            if (pathArr.length > 2) {
                this.$store.dispatch('addOpenSubmenu', pathArr[1].name);
            }
            this.checkTag(to.name);
        }
    },
    mounted() {
        this.init();
        // 全屏相关
        document.addEventListener('fullscreenchange', () => {
            this.isFullScreen = !this.isFullScreen;
        });
        document.addEventListener('mozfullscreenchange', () => {
            this.isFullScreen = !this.isFullScreen;
        });
        document.addEventListener('webkitfullscreenchange', () => {
            this.isFullScreen = !this.isFullScreen;
        });
        document.addEventListener('msfullscreenchange', () => {
            this.isFullScreen = !this.isFullScreen;
        });
        // 锁屏相关
        let lockScreenBack = document.getElementById('lock_screen_back');
        let x = document.body.clientWidth;
        let y = document.body.clientHeight;
        let r = Math.sqrt(x * x + y * y);
        let size = parseInt(r);
        this.lockScreenSize = size;
        window.addEventListener('resize', () => {
            let x = document.body.clientWidth;
            let y = document.body.clientHeight;
            let r = Math.sqrt(x * x + y * y);
            let size = parseInt(r);
            this.lockScreenSize = size;
            lockScreenBack.style.transition = 'all 0s';
            lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
        });
        lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
        // 问候信息相关
        if (!Cookies.get('hasGreet')) {
            let now = new Date();
            let hour = now.getHours();
            let greetingWord = {
                title: '',
                words: ''
            };
            let userName = Cookies.get('user');
            if (hour > 5 && hour < 6) {
                greetingWord = {
                    title: '凌晨好~' + userName,
                    words: '早起的鸟儿有虫吃~'
                };
            } else if (hour >= 6 && hour < 9) {
                greetingWord = {
                    title: '早上好~' + userName,
                    words: '来一杯咖啡开启美好的一天~'
                };
            } else if (hour >= 9 && hour < 12) {
                greetingWord = {
                    title: '上午好~' + userName,
                    words: '工作要加油哦~'
                };
            } else if (hour >= 12 && hour < 14) {
                greetingWord = {
                    title: '中午好~' + userName,
                    words: '午饭要吃饱~'
                };
            } else if (hour >= 14 && hour < 17) {
                greetingWord = {
                    title: '下午好~' + userName,
                    words: '下午也要活力满满哦~'
                };
            } else if (hour >= 17 && hour < 19) {
                greetingWord = {
                    title: '傍晚好~' + userName,
                    words: '下班没事问候下爸妈吧~'
                };
            } else if (hour >= 19 && hour < 21) {
                greetingWord = {
                    title: '晚上好~' + userName,
                    words: '工作之余品一品书香吧~'
                };
            } else {
                greetingWord = {
                    title: '深夜好~' + userName,
                    words: '夜深了，注意休息哦~'
                };
            }
            this.$Notice.config({
                top: 130
            });
            this.$Notice.info({
                title: greetingWord.title,
                desc: greetingWord.words,
                duration: 4,
                name: 'greeting'
            });
            Cookies.set('hasGreet', 1);
        }
    },
    created() {
        // 查找当前用户之前登录时设置的主题
        let name = Cookies.get('user');
        if (localStorage.theme) {
            let hasThisUser = JSON.parse(localStorage.theme).some(item => {
                if (item.userName === name) {
                    this.$store.dispatch('changeMenuTheme', item.menuTheme);
                    this.$store.dispatch('changeMainTheme', item.mainTheme);
                    return true;
                } else {
                    return false;
                }
            });
            if (!hasThisUser) {
                this.$store.dispatch('changeMenuTheme', 'dark');
                this.$store.dispatch('changeMainTheme', 'r');
            }
        } else {
            this.$store.dispatch('changeMenuTheme', 'dark');
            this.$store.dispatch('changeMainTheme', 'r');
        }
        // 根据用户设置主题
        if (this.$store.state.theme !== 'b') {
            let stylesheetPath = './dist/' + this.$store.state.theme + '.css';
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', stylesheetPath);
        }
        // 显示打开的页面的列表
        this.$store.dispatch('setOpenedList');
    }
};
</script>
