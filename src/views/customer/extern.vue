<style lang="less">
@import './extern.less';
</style>
<template>
    <div class="extern-main-con">
        <div class="extern-content-con">
            <Card class="extern-content-card" :bordered=false :dis-hover=true>
                <p slot="title" class="extern-content-card-title">
                    <Button type="ghost">全部记录</Button>
                    <Button type="ghost">所有未处理</Button>
                    <Button type="ghost">所有已处理</Button>
                    <Button type="ghost" @click='openedPage'>已开户信息</Button>
                </p>
                <transition name="view-extern">
                    <div v-if="showMesTitleList" class="extern-title-list-con">
                        <Table ref="externList" :columns="mesTitleColumns" :data="currentMesList" :no-data-text="noDataText" size="large" :show-header=false></Table>
                    </div>
                </transition>
            </Card>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data() {
            const markAsreadBtn = (h, params) => {
                return h('div', [
                    h('div', {
                        style: {
                            'font-size': '12px',
                            'padding-bottom': '5px'
                        }
                    }, params.row.state),
                    h('Button', {
                        props: {
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                alert('click ok')
                            }
                        }
                    }, '绑定')
                ])
            };

            return {
                current: '',
                currentMesList: [],
                unreadMesList: [],
                hasreadMesList: [],
                recyclebinList: [],
                currentMessageType: 'unread',
                showMesTitleList: true,
                unreadCount: 0,
                hasreadCount: 0,
                recyclebinCount: 0,
                noDataText: '暂无未读消息',
                mes: {
                    title: '',
                    time: '',
                    content: ''
                },
                mesTitleColumns: [{
                    key: 'title',
                    align: 'left',
                    ellipsis: true,
                    render: (h, params) => {
                        return h('span', [
                            h('Avatar', {
                                props: {
                                    src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                                },
                                style: {
                                    float: 'left',
                                    background: '#619fe7',
                                    'margin-left': '0px',
                                    'margin-right': '10px'
                                }
                            }),
                            h('span', [
                                h('div', {}, params.row.linkUser.username),
                                h('div', {
                                    style: {
                                        'font-size': '12px',
                                    }
                                }, '该客户' + params.row.detail2 + params.row.product.productClass + params.row.product.productType + params.row.product.productDeploy + '产品，' + '请尽快' + params.row.detail)
                            ])
                        ])
                    }
                }, {
                    title: ' ',
                    key: 'time',
                    align: 'center',
                    width: 180,
                    render: (h, params) => {
                        return h('span', [
                            h('div', {
                                style: {
                                    size: 12
                                }
                            }, this.formatDate(params.row.product.createdAt)),
                            h('div', {
                                style: {
                                    size: 12,
                                    'color': 'green'
                                }
                            }, this.formatDate(params.row.product.updatedAt))
                        ]);
                    }
                }, {
                    title: ' ',
                    key: 'asread',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        if (this.currentMessageType === 'unread') {
                            return h('div', [
                                markAsreadBtn(h, params)
                            ]);
                        } else if (this.currentMessageType === 'hasread') {
                            return h('div', [
                                deleteMesBtn(h, params)
                            ]);
                        } else {
                            return h('div', [
                                restoreBtn(h, params)
                            ]);
                        }
                    }
                }]
            };
        },
        methods: {
            getData(a, b) {
                this.current = a;
                this.$store.dispatch('getAccLink', {
                    page: a,
                    size: b,
                }).then(res => {
                    if (res.status == 200) {
                        this.spinShow = false;
                    }
                    this.flogState = '全部记录';
                    this.getRealData(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            getRealData(res) {
                this.historyData = res.data.docs.rows;
                this.dataCount = res.data.docs.count;
                this.historyData.forEach((item, index) => {
                    // 格式转化
                    if (item.product) {
                        // 产品分类
                        switch (item.product.productClass) {
                            case 1:
                                item.product.productClass = '行业应用';
                                break;
                            case 2:
                                item.product.productClass = '社群应用';
                                break;
                            case 3:
                                item.product.productClass = '社交管理';
                                break;
                            case 4:
                                item.product.productClass = '内容推广';
                                break;
                            case 5:
                                item.product.productClass = '运营小工具';
                        }
                        // 产品品类
                        switch (item.product.productType) {
                            case 1:
                                item.product.productType = '创客版';
                                break;
                            case 2:
                                item.product.productType = '企业版';
                                break;
                            case 3:
                                item.product.productType = '集团版';
                                break;
                            case 4:
                                item.product.productType = '通用版';
                        }
                        // 部署方式
                        switch (item.product.productDeploy) {
                            case 1:
                                item.product.productDeploy = '公有云';
                                break;
                            case 2:
                                item.product.productDeploy = '私有云';
                                break;
                            case 3:
                                item.product.productDeploy = '独立部署';
                        }
                    }
                    item.hisDaysFlag = true;
                    // 等于3的时候 ，是我这边的客户
                    // if(item.linkUser.userRoleType==3){
                    if (item.license.expired) {
                        if (item.license.expired == 0) {
                            item.hisDaysFlag = false;
                        }
                        let days = item.license.expired / 24 / 60 / 60 / 1000;
                        if (days == 365) {
                            item.hisDays = '1年';
                        } else if (days == 730) {
                            item.hisDays = '2年';
                        } else if (days == 1095) {
                            item.hisDays = '3年';
                        } else {
                            item.hisDays = days + '天';
                        }
                    }
                    // }else{
                    // 等于5是代理商的客户
                    // }
                    if (item.linkUser.connection) {
                        // /1. 企业  2.个人 
                        if (item.linkUser.connection.userType == 1) {
                            item.detailCus = item.linkUser.connection.companyName;
                        } else {
                            item.detailCus = '个人'
                        }
                    } else {
                        item.detailCus = '--'
                    }
                    item.product.createdAt = moment(+item.createdAt).format('YYYY-MM-DD HH:mm');
                    item.product.updatedAt = moment(+item.updatedAt).format('YYYY-MM-DD HH:mm');

                    // 坐席，套数
                    if (item.license.count) {
                        item.license.countFlag = true;
                    } else {
                        item.license.countFlag = false;
                    }
                    if (item.accountLinkState == 1) {
                        item.state = '待开户'
                        item.operation = '绑定'
                        item.detail = '绑定系统登录账号!'

                        if (item.license.pType == 1) {
                            item.detail2 = '申请试用'
                        } else if (item.license.pType == 2) {
                            item.detail2 = '购买了'
                        }
                    } else if (item.accountLinkState == 2) {
                        item.state = '待续期'
                        item.operation = '续期'
                        item.detail = '进行同步续期处理!'
                        item.detail2 = '续费了'
                    } else if (item.accountLinkState == 3) {
                        item.state = '已绑定'
                        item.operation = item.operator.userRealName || item.operator.username;
                        item.detail = '绑定系统登录账号!'
                    } else if (item.accountLinkState == 4) {
                        item.state = '已续期'
                        item.operation = item.operator.userRealName || item.operator.username;
                        item.detail = '进行同步续期处理!'
                        item.detail2 = '续费了'
                    } else {}

                    if (item.accountLinkState == 1 || item.accountLinkState == 3) {

                    }
                })
                console.log(this.historyData, 'hhhhhhhhhh')
                this.currentMesList = this.historyData;
            },
            openedPage() {

            },
            formatDate(time) {
                if (time == 0) {
                    return ''
                }
                let date = new Date(time);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let minute = date.getMinutes();
                // let second = date.getSeconds();
                return year + '/' + month + '/' + day + '  ' + hour + ':' + minute; //+ ':' + second;
            },
            backMesTitleList() {
                this.showMesTitleList = true;
            },
        },
        computed: {
            avatorPath() {
                return localStorage.avatorImgPath;
            }
        },
        created() {
            this.getData();
        },
        mounted() {
            // this.currentMesList = this.unreadMesList = [{
            //     state: '待续期',
            //     title: 'wangdapeng（个人）',
            //     content: '该客户申请试用 社交管理-创客版（公有云）产品，请尽快绑定系统登录账号！',
            //     start: 1507390106000,
            //     end: 1508390106000
            // }];
            this.unreadCount = this.unreadMesList.length;
            this.hasreadCount = this.hasreadMesList.length;
            this.recyclebinCount = this.recyclebinList.length;
        },
        watch: {
            unreadMesList(arr) {
                this.unreadCount = arr.length;
            },
            hasreadMesList(arr) {
                this.hasreadCount = arr.length;
            },
            recyclebinList(arr) {
                this.recyclebinCount = arr.length;
            }
        }
};
</script>
