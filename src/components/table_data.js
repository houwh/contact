//view visitor expand check edit delete permission role license 
import vue from 'Vue'
import moment from 'moment'
import api from '../api/api'
import {
    industry,
    region
} from '../libs/common';

export const tableRoleColumns = [{
    title: '序号',
    type: 'index',
    align: 'center'
}, {
    title: '角色名称',
    align: 'center',
    key: 'roleName'
}, {
    title: '创建人',
    align: 'center',
    render: (h, params) => {
        const text = params.row.creator.userRealName || params.row.creator.username;
        return h('p', text);
    }
}, {
    title: '创建日期',
    align: 'center',
    render: (h, params) => {
        let row = params.row.createdAt;
        const text = moment(+row).format('YYYY-MM-DD');
        return h('p', {}, text);
    }
}, {
    title: '状态',
    align: 'center',
    render: (h, params) => {
        const row = params.row;
        const text = row.roleState == 1 ? '已禁用' : '已启用';
        const color = row.roleState == 1 ? 'red' : 'green';
        const cursor = 'default';
        return h('div', [
            h('Button', {
                props: {
                    type: 'text',
                    size: 'small'
                },
                style: {
                    color: color
                },
            }, text),
        ])
    }
}, {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['edit', 'delete', ] //'permission'
}];;

export const tableDepartmentColumns = [{
    title: '序号',
    type: 'index',
    align: 'center'
}, {
    title: '部门名称',
    align: 'center',
    key: 'departmentName'
}, {
    title: '创建人',
    align: 'center',
    render: (h, params) => {
        const text = params.row.creator.userRealName || params.row.creator.username;
        return h('p', text);
    }
}, {
    title: '创建日期',
    align: 'center',
    render: (h, params) => {
        let row = params.row.createdAt;
        const text = moment(+row).format('YYYY-MM-DD');
        return h('p', {}, text);
    }
}, {
    title: '状态',
    align: 'center',
    render: (h, params) => {
        const row = params.row.departmentStatus;
        const text = row == 1 ? '启用' : '禁用'
        const color = row == 1 ? 'green' : 'red';
        return h('div', [
            h('Button', {
                props: {
                    type: 'text',
                    size: 'small'
                },
                style: {
                    color: color
                },
            }, text),
        ])
    }
}, {
    title: '操作',
    align: 'center',
    width: 240,
    key: 'handle',
    handle: ['edit', 'delete']
}];

export const tableProductColumns = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
}, {
    title: '产品名称',
    align: 'center',
    key: 'productName'
}, {
    title: '库存量单位',
    align: 'center',
    render: (h, params) => {
        const unit = params.row.productUnit;
        const text = unit == 1 ? '年/套' : unit == 2 ? '年/坐席' : unit == 3 ? '人/次' : '终身/套';
        return h('p', text)
    }
}, {
    title: '零售价',
    align: 'center',
    key: 'productPrice'
}, {
    title: '创建日期',
    align: 'center',
    render: (h, params) => {
        const unit = params.row.createdAt;
        const text = moment(+unit).format('YYYY-MM-DD');
        return h('p', text)
    }
}, {
    title: '状态',
    align: 'center',
    render: (h, params) => {
        const status = params.row.status;
        const text = status == 1 ? '已上架' : '已下架';
        const color = status == 1 ? 'green' : 'red';
        return h('div', [
            h('Button', {
                props: {
                    type: 'text',
                    size: 'small'
                },
                style: {
                    color: color
                },
            }, text),
        ])
    }
}, {
    title: '操作',
    align: 'center',
    // width: 240,
    key: 'handle',
    handle: ['edit',] // 'permission', 'role'
}];


export const tableRevenueColumns = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
}, {
    title: '授权编号/订单编号',
    align: 'center',
    key: 'licenseNo'
}, {
    title: '金额',
    align: 'center',
    render: (h, params) => {
        const text = params.row.order;
        const text2 = text == null ? '--' : text.amount;
        return h('p', text2);
    }
}, {
    title: '客户登录名',
    align: 'center',
    render: (h, params) => {
        const text = params.row.userInfo.username;
        return h('p', text);
    }
}, {
    title: '创建人',
    align: 'center',
    render: (h, params) => {
        const text = params.row.creator.userRealName || params.row.creator.username;
        return h('p', text);
    }
}, {
    title: '创建日期',
    align: 'center',
    render: (h, params) => {
        const row = params.row.createdAt;
        const text = moment(+row).format('YYYY-MM-DD');
        return h('p', {}, text);
    },
}, {
    title: '审核日期',
    align: 'center',
    render: (h, params) => {
        const state = params.row.licenseState;

        const row = params.row.updatedAt;
        const text2 = moment(+row).format('YYYY-MM-DD');

        const text = state === 1 ? '--' : text2;

        return h('p', {}, text);
    }
}, {
    title: '状态',
    align: 'center',
    render: (h, params) => {
        const state = params.row.licenseState;
        const color = state == 1 ? 'red' : 'green';
        const text = state === 1 ? '待付款' : '已收款';

        return h('div', [
            h('Button', {
                props: {
                    type: 'text',
                    size: 'small'
                },
                style: {
                    color: color
                },
            }, text),
        ])
    }
}, {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['check']
}];


export const tableEmployeeColumns = [{
    title: '序号',
    type: 'index',
    align: 'center'
}, {
    title: '登录名',
    align: 'center',
    key: 'username'
}, {
    title: '姓名',
    align: 'center',
    key: 'userRealName'
}, {
    title: '角色',
    align: 'center',
    render: (h, params) => {
        const row = params.row.connection.roleName;
        const text = row;
        return h('p', text)
    }
}, {
    title: '部门',
    align: 'center',
    render: (h, params) => {
        const row = params.row.connection.departmentName;
        const text = row;
        return h('p', text)
    }
}, {
    title: '手机',
    align: 'center',
    key: 'userTel'
}, {
    title: '邮箱',
    align: 'center',
    render: (h, params) => {
        const row = params.row.connection.email;
        const text = row;
        return h('p', text)
    }
}, {
    title: '状态',
    align: 'center',
    render: (h, params) => {
        const row = params.row.isFreeze;
        const text = row === true ? '已冻结' : '已开通';
        const color = row === true ? 'red' : 'green'
        return h('div', [
            h('Button', {
                props: {
                    type: 'text',
                    size: 'small'
                },
                style: {
                    color: color
                },
            }, text),
        ])
    }
}, {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['edit']
}];

export const tableVisitorColumns = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
}, {
    title: '姓名',
    align: 'center',
    key: 'customerName'
}, {
    title: '手机',
    align: 'center',
    key: 'mobile'
}, {
    title: '微信',
    align: 'center',
    key: 'wechat'
}, {
    title: '留电时间',
    align: 'center',
    render: (h, params) => {
        const row = params.row.createdAt;
        const text = moment(+row).format('YYYY-MM-DD');
        return h('p', text)
    }
}, {
    title: '访客分类',
    align: 'center',
    render: (h, params) => {
        const myClass = params.row.class;
        const text = myClass == null ? '--' : myClass.salesClass;
        return h('p', text)
    }
}, {
    title: '最近处理时间',
    align: 'center',
    render: (h, params) => {
        const row = params.row.updatedAt;
        const text2 = moment(+row).format('LL');
        const text = row == null ? '--' : text2;
        return h('p', text)
    }
}, {
    title: '处理人',
    align: 'center',
    render: (h, params) => {
        const row = params.row.operator;
        console.log(row);
        const text = row == null ? '--' : row.userRealName == null ? row.username : row.userRealName;
        return h('p', text)
    }
}, {
    title: '状态',
    align: 'center',
    render: (h, params) => {
        const status = params.row.salesState;
        const text = status == 1 ? '待处理' : '已处理';
        const color = status == 1 ? 'red' : 'green';
        return h('div', [
            h('Button', {
                props: {
                    type: 'text',
                    size: 'small'
                },
                style: {
                    color: color
                },
            }, text),
        ])
    }
}, {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['visitor']
}];

export const tableExpandColumns = [{
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
}, {
    title: '姓名',
    align: 'center',
    key: 'customerName'
}, {
    title: '手机',
    align: 'center',
    key: 'mobile'
}, {
    title: '微信',
    align: 'center',
    key: 'wechat'
}, {
    title: '邮箱',
    align: 'center',
    key: 'email'
}, {
    title: '导入时间',
    align: 'center',
    render: (h, params) => {
        const row = params.row.createdAt;
        const text = moment(+row).format('YYYY-MM-DD');
        return h('p', text)
    }
}, {
    title: '客户分类',
    align: 'center',
    render: (h, params) => {
        const myClass = params.row.class;
        const text = myClass == null ? '--' : myClass.salesClass;
        return h('p', text)
    }
}, {
    title: '最近处理时间',
    align: 'center',
    render: (h, params) => {
        const row = params.row.updatedAt;
        const text2 = moment(+row).format('YYYY-MM-DD');
        const text = row == null ? '--' : text2;
        return h('p', text)
    }
}, {
    title: '处理人',
    align: 'center',
    render: (h, params) => {
        const row = params.row.operator;
        console.log(row);
        const text = row == null ? '--' : row.userRealName == null ? row.username : row.userRealName;
        return h('p', text)
    }
}, {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['expand']
}];

export const tableAgentColumns = [{
    title: '序号',
    type: 'index',
    align: 'center'
}, {
    title: '登录名',
    align: 'center',
    key: 'username'
}, {
    title: '联系人',
    align: 'center',
    key: 'userRealName'
}, {
    title: '联系人手机',
    align: 'center',
    key: 'userTel'
}, {
    title: '代理类型',
    align: 'center',
    render: (h, params) => {
        const row = params.row.connection.agentType;
        const text = row === 1 ? '省代理' : row === 2 ? '市代理' : row == 3 ? '行业代理' : 'OEM代理';
        return h('p', {
            props: {
                text: text
            }
        }, text);
    }
}, {
    title: '开户日期',
    align: 'center',
    render: (h, params) => {
        let row = params.row.createdAt;
        const text = moment(+row).format('YYYY-MM-DD');
        return h('p', {}, text);
    }
}, {
    title: '开户人',
    align: 'center',
    render: (h, params) => {
        const text = params.row.creator.userRealName || params.row.creator.username;
        return h('p', text);
    }
}, {
    title: '状态',
    align: 'center',
    render: (h, params) => {
        const row = params.row.isFreeze;
        const text = row === true ? '已冻结' : '已开通';
        const color = row === true ? 'red' : 'green'

        return h('div', [
            h('Button', {
                props: {
                    type: 'text',
                    size: 'small'
                },
                style: {
                    color: color
                },
            }, text),
        ])
    },
}, {
    title: '操作',
    align: 'center',
    key: 'handle',
    width: 200,
    handle: ['edit', 'license']
}];

export const agentLicenseColumns = [{
    title: '序号',
    type: 'index',
    align: 'center'
}, {
    align: 'center',
    title: '授权编号/订单编号',
    key: 'licenseNo',
    className: 'min-width'
}, {
    align: 'center',
    title: '金额（￥）',
    render: (h, params) => {
        const text = params.row.order.amount;
        return h('p', text)
    }
}, {
    align: 'center',
    title: '创建日期',
    render: (h, params) => {
        const unit = params.row.createdAt;
        const text = moment(+unit).format('YYYY-MM-DD');
        return h('p', text)
    }
}, {
    align: 'center',
    title: '开通日期',
    render: (h, params) => {
        const state = params.row.licenseState;
        const unit = params.row.effectiveAt;
        const text2 = moment(+unit).format('YYYY-MM-DD');
        const text = state === 1 ? '--' : text2;
        return h('p', text)
    }
}, {
    align: 'center',
    title: '申请人',
    render: (h, params) => {
        const text = params.row.creator.userRealName || params.row.creator.username;
        console.log(text);
        return h('p', text)
    }
}, {
    align: 'center',
    title: '状态',
    render: (h, params) => {
        const state = params.row.licenseState;
        const color = state === 2 ? 'green' : 'red';
        const text = state === 2 ? '已付款' : '待付款';

        return h('div', [
            h('Button', {
                props: {
                    type: 'text',
                    size: 'small'
                },
                style: {
                    color: color
                },
            }, text),
        ])
    }
}, {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['view']
}];

export const tableCustomerColumns = [{
    title: '序号',
    type: 'index',
    align: 'center'
}, {
    title: '登录名',
    align: 'center',
    key: 'username'
}, {
    title: '联系人',
    align: 'center',
    key: 'userRealName'
}, {
    title: '联系人手机',
    align: 'center',
    key: 'userTel'
}, {
    title: '行业',
    align: 'center',
    render: (h, params) => {
        if (!params.row.connection.industryClass) {
            return h('p', '-');
        }
        for(let i=0;i<industry.length;i++){
            for(let n=0;n<industry[i].children.length;n++){
                if(params.row.connection.industryClass==industry[i].children[n].value){
                    return h('p',industry[i].children[n].name)
                }
            }
        }
    }
}, {
    title: '开户日期',
    align: 'center',
    render: (h, params) => {
        let row = params.row.createdAt;
        const text = moment(+row).format('YYYY-MM-DD');
        return h('p', {}, text);
    }
}, {
    title: '开户人',
    align: 'center',
    render: (h, params) => {
        if (!params.row.creator) {
            return h('p', '用户注册');
        }
        const text = params.row.creator.userRealName || params.row.creator.username;
        return h('p', text);
    }
}, {
    title: '状态',
    align: 'center',
    render: (h, params) => {
        const row = params.row.connection.status;
        const text = row === 1 ? '待完善' : row === 2 ? '已冻结' : row == 3 ? '已开通' : '-';
        return h('p', text);
    }
}, {
    title: '操作',
    align: 'center',
    key: 'handle',
    width: 200,
    handle: ['edit','license']
}];

export const customerLicenseColumns = [{
    title: '序号',
    type: 'index',
    align: 'center'
}, {
    align: 'center',
    title: '授权编号/订单编号',
    key: 'licenseNo',
    className: 'min-width'
}, {
    align: 'center',
    title: '类型',
    render: (h, params) => {
        const type = params.row.licenseType;
        const text = type === 1 ? '试用' : '续费';
        return h('p', text)
    }

}, {
    align: 'center',
    title: '合同编号',
    render: (h, params) => {
        const text = params.row.contractSerial;
        const text2 = text == null ? '--' : text.contractSerial;
        return h('p', text2)
    }
}, {
    align: 'center',
    title: '金额（￥）',
    render: (h, params) => {
        const text = params.row.contractSerial;
        const text2 = text == null ? '--' : text.amount;
        return h('p', text2)
    }
}, {
    align: 'center',
    title: '创建时间',
    render: (h, params) => {
        const unit = params.row.createdAt;
        const text = moment(+unit).format('YYYY-MM-DD');
        return h('p', text)
    }
}, {
    align: 'center',
    title: '开通日期',
    render: (h, params) => {
        const state = params.row.licenseState;
        const unit = params.row.effectiveAt;
        const text2 = moment(+unit).format('YYYY-MM-DD');
        const text = state === 1 ? '--' : text2;
        return h('p', text)
    }
}, {
    align: 'center',
    title: '申请人',
    render: (h, params) => {
        const text = params.row.creator.userRealName || params.row.creator.username;
        return h('p', text)
    }
}, {
    align: 'center',
    title: '状态',
    render: (h, params) => {
        const state = params.row.licenseState;
        const color = state === 2 ? 'green' : 'red';
        const text = state === 2 ? '已付款' : '待付款';

        return h('div', [
            h('Button', {
                props: {
                    type: 'text',
                    size: 'small'
                },
                style: {
                    color: color
                },
            }, text),
        ])
    }
}, {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['view']
}];

const tableData = {
    tableRoleColumns,
    tableDepartmentColumns,
    tableProductColumns,
    tableRevenueColumns,
    tableEmployeeColumns,
    tableVisitorColumns,
    tableExpandColumns,
    tableAgentColumns,
    tableCustomerColumns,
    customerLicenseColumns,
    agentLicenseColumns,
};

export default tableData;