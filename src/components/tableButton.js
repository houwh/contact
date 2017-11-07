import util from '../libs/util'

export const viewButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: 'ghost',
            size: 'small'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                alert('查看')
            }
        }
    }, '查看');
};

export const visitorButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: 'ghost',
            size: 'small'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                alert('访客管理')
            }
        }
    }, '访客管理');
};

export const expandButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: 'ghost',
            size: 'small'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                alert('客户管理')
            }
        }
    }, '客户管理');
};

export const checkButton = (vm, h, currentRow, index) => {
    const text = currentRow.licenseState === 1 ? '审核' : '查看';
    return h('Button', {
        props: {
            type: 'ghost',
            size: 'small'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                util.openNewPage(vm, 'finance_revenue_check');
                vm.$router.push({
                    name: 'finance_revenue_check',
                    query:{licenseId: currentRow.licenseId}
                });
            }
        }
    }, text);
};
export const editButton = (vm, h, currentRow, index,editModal) => {
    return h('Button', {
        props: {
            type: 'ghost',
            size: 'small'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': (MouseEvent) => {
                let temp = vm.$route.name.split('_')[0];
                if(temp=='agent'){
                    util.openNewPage(vm, 'agent_account_edit');
                    vm.$router.push({
                        name: 'agent_account_edit',
                        query:{id: currentRow.userId}
                    });
                }else if(temp=='customer'){
                    util.openNewPage(vm, 'customer_account_edit');
                    vm.$router.push({
                        name: 'customer_account_edit',
                        query:{id: currentRow.userId}
                    });
                }else if(temp=='employee'){
                    util.openNewPage(vm, 'employee_account_edit');
                    vm.$router.push({
                        name: 'employee_account_edit',
                        query:{id: currentRow.userId}
                    });
                }else if(temp=='product'){
                    util.openNewPage(vm, 'product_account_edit');
                    vm.$router.push({
                        name: 'product_account_edit',
                        query:{id: currentRow.productId}
                    });
                }else if(temp=='department'){
                    util.openNewPage(vm, 'department');
                    vm.$router.push({
                        name: 'department',
                        query:{id: currentRow.departmentId,editModal:true}
                    });
                }else if(temp=='role'){
                    util.openNewPage(vm, 'role');
                    vm.$router.push({
                        name: 'role',
                        query:{id: currentRow.systemRoleId,editModal:true}
                    });
                }else{

                }
            }
        }
    }, '编辑');
};
export const deleteButton = (vm, h, currentRow, index) => {
    let temp = vm.$route.name.split('_')[0];
    return h('Button', {
        props: {
            type: 'ghost',
            size: 'small'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                if(temp=='department'){
                    util.openNewPage(vm, 'department');
                    vm.$router.push({
                        name: 'department',
                        query:{deleteId: currentRow.departmentId,isUsed:currentRow.isUsed}
                    });
                }else if(temp=='role'){
                    util.openNewPage(vm, 'role');
                    vm.$router.push({
                        name: 'role',
                        query:{deleteId: currentRow.systemRoleId}
                    });
                }
            }
        }
    }, '删除');
};

export const permissionButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: 'ghost',
            size: 'small'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                alert('权限设置')
            }
        }
    }, '权限设置');
};

export const roleButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: 'ghost',
            size: 'small'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                alert('默认角色')
            }
        }
    }, '默认角色');
};

export const licenseButton = (vm, h, currentRow, index) => {
    return h('Button', {
        style: {
            margin: '0 5px'
        },
        props: {
            type: 'ghost',
            size: 'small'
        },
        on: {
            'click': () => {
                let temp = vm.$route.name.split('_')[0];
                if(temp=='agent'){
                    util.openNewPage(vm, 'agent_account_license');
                    vm.$router.push({
                        name: 'agent_account_license',
                        query:{id: currentRow.userId,agentOff:currentRow.connection.agentOff}
                    });
                }else{
                    console.log(currentRow.userRoleType,'222222')
                    util.openNewPage(vm, 'customer_account_license');
                    vm.$router.push({
                        name: 'customer_account_license',
                        query:{id: currentRow.userId,userRoleType:currentRow.userRoleType}
                    });
                }
            }
        }
    }, 'License 管理');
};