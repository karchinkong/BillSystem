export const judgeState = (state) => {
    if(state === 1) return '正常';
    else if(state === 0) return '已删除';
    else if(state === -1) return '锁定';
}


// 用户信息表格列的配置描述
export const userInfoColumns = [
    {
        title: 'id',
        key: 'id',
        align: 'center',
        width: 80
    },
    {
        title: '用户名',
        key: 'username',
        align: 'center',
        ellipsis: true,
        width: 120
    },
    {
        title: '联系电话',
        key: 'phone',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '登录账号',
        key: 'jobnumber',
        align: 'center',
        ellipsis: true,
    },
    {
        title: '状态',
        align: 'center',
        ellipsis: true,
        width: 80,
        render: (h, params) => {
            return h('div', [
                h('strong', judgeState(params.row.state))
            ])
        }
    },
    {
        title: '操作',
        key: 'action',
        align: 'center',
        ellipsis: true,
        handle: ['editable', 'delete']
    }
]

// 角色信息表格列的配置描述
export const roleInfoColumns = [
    {
        title: "id",
        key: "id",
        align: "center",
        width: 80
    },
    {
        title: "角色名称",
        key: "name",
        align: "center"
    },
    {
        title: "备注信息",
        align: "center",
        render: (h, params) => {
            return h('div', [
                h('strong', params.row.remark ? params.row.remark : "暂无备注信息")
            ])
        }
    },
    {
        title: "状态",
        align: "center",
        render: (h, params) => {
            return h('div', [
                h('strong', judgeState(params.row.state))
            ])
        }
    },
    {
        title: "创建时间",
        key: "createtime",
        align: "center"
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        ellipsis: true,
        handle: ['editable', 'delete']
    }
]

// 操作信息表格列的配置描述
export const operateColumns = [
    {
        title: "id",
        key: "id",
        align: "center",
        width: 80
    },
    {
        title: "操作名称",
        key: "name",
        align: "center"
    },
    {
        title: "Url地址",
        align: "center",
        render: (h, params) => {
            return h('div', [
                h('strong', params.row.path ? params.row.path : '暂无Url地址')
            ])
        }
    },
    {
        title: "状态",
        align: "center",
        render: (h, params) => {
            return h('div', [
                h('strong', judgeState(params.row.state))
            ])
        }
    },
    {
        title: "创建时间",
        key: "createtime",
        align: "center"
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        ellipsis: true,
        handle: ['editable', 'delete']
    }
]

// 菜单信息表格列的配置描述
export const menuColumns = [
    {
        title: "id",
        key: "id",
        align: "center",
        width: 80
    },
    {
        title: "菜单名称",
        key: "name",
        align: "center"
    },
    {
        title: "Url地址",
        align: "center",
        render: (h, params) => {
            return h('div', [
                h('strong', params.row.path ? params.row.path : '暂无Url地址')
            ])
        }
    },
    {
        title: "状态",
        align: "center",
        render: (h, params) => {
            return h('div', [
                h('strong', judgeState(params.row.state))
            ])
        }
    },
    {
        title: "创建时间",
        key: "createtime",
        align: "center"
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        ellipsis: true,
        handle: ['editable', 'delete']
    }
]

// 客户信息表格列的配置描述
export const customerColumns = [
    {
        title: "id",
        key: "id",
        align: "center",
        width: 80
    },
    {
        title: "客户名称",
        key: "name",
        align: "center"
    },
    {
        title: "座机号码",
        key: "telephone",
        align: "center"
    },
    {
        title: "手机号码",
        key: "mobile",
        align: "center"
    },
    {
        title: "状态",
        align: "center",
        render: (h, params) => {
          return h('div', [
              h('strong', judgeState(params.row.state))
          ])
        }
    },
    {
        title: "创建时间",
        key: "createtime",
        align: "center"
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        ellipsis: true,
        handle: ['editable', 'delete', 'recovery']
    }
]

// 厂商信息表格列的配置描述
export const factoryColumns = [
    {
        title: "id",
        key: "id",
        align: "center",
        width: 80
    },
    {
        title: "厂家名称",
        key: "name",
        align: "center"
    },
    {
        title: "联系人",
        key: "contacts",
        align: "center"
    },
    {
        title: "联系人座机号码",
        key: "telephone",
        align: "center"
    },
    {
        title: "联系人手机号码",
        key: "mobile",
        align: "center"
    },
    {
        title: "状态",
        align: "center",
        render: (h, params) => {
            return h('div', [
                h('strong', judgeState(params.row.state))
            ])
        }
    },
    {
        title: "创建时间",
        key: "createtime",
        align: "center"
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        ellipsis: true,
        handle: ['editable', 'delete', 'recovery']
    }
]

// 厂商信息表格列的配置描述
export const goodsInfoColumns = [
    {
        title: "id",
        key: "id",
        align: "center",
        width: 60
    },
    {
        title: "产品名称",
        key: "name",
        align: "left",
        ellipsis: true
    },
    {
        title: "进货价",
        key: "costprice",
        align: "center",
        width: 100
    },
    {
        title: "销售价",
        key: "marketprice",
        align: "center",
        width: 100
    },
    {
        title: "库存",
        key: "stock",
        align: "center",
        width: 100
    },
    {
        title: "状态",
        align: "center",
        width: 80,
        render: (h, params) => {
            return h('div', [
                h('strong', judgeState(params.row.state))
            ])
        }
    },
    {
        title: "创建时间",
        key: "createtime",
        align: "center",
        ellipsis: true,
        width: 160
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        ellipsis: true,
        width: 120,
        handle: ['editable', 'delete', 'recovery']
    }
]

// 厂商信息表格列的配置描述
export const orderInfoColumns = [
    {
        type: 'expand',
        width: 50
    },
    {
        title: "订单编号",
        key: "ordersn",
        align: "center",
        width: 190,
        ellipsis: true
    },
    {
        title: "订单来源",
        key: "cfname",
        align: "left",
        ellipsis: true
    },
    {
        title: "总价",
        key: "price",
        align: "center",
        width: 80
    },
    {
        title: "审核状态",
        align: "left",
        width: 120,
        render: (h, param) => {
            const color = param.row.auditing === '未审核' ? 'blue' : param.row.auditing === '通过' ? 'green' : 'red';
            return h('div', [
                h('Tag', {
                    props: {
                        type: 'dot',
                        color: color
                    }
                }, param.row.auditing)
            ])
        }
    },
    {
        title: "付款状态",
        key: "state",
        align: "left",
        width: 140,
        render: (h, param) => {
            const color = param.row.state === '未付款' ? 'red' : param.row.state === '已付款' ? 'green' : 'blue';
            return h('div', [
                h('Tag', {
                    props: {
                        type: 'dot',
                        color: color
                    }
                }, param.row.state)
            ])
        }
    },
    {
        title: "操作",
        key: "action",
        align: "left",
        width: 200,
        ellipsis: true,
        handle: ['editable']
    }
]

// 订单详情商品列表的配置描述
export const orderDetailsGoodsInfoColumns = [
    {
        title: "商品编号",
        key: "no",
        align: "center",
        ellipsis: true
    },
    {
        title: "商品名称",
        key: "name",
        align: "center",
        ellipsis: true
    },
    {
        title: "商品价格",
        key: "price",
        align: "center",
        ellipsis: true
    },
    {
        title: "商品数量",
        key: "number",
        align: "center",
        ellipsis: true
    }
]

// 订单详情商品列表的配置描述
export const orderDetailsPayListColumns = [
    {
        title: "支付账号",
        key: "account_number",
        align: "center",
        ellipsis: true
    },
    {
        title: "支付类型",
        key: "payment_type",
        align: "center",
        ellipsis: true
    },
    {
        title: "支付金额",
        key: "amount_money",
        align: "center",
        ellipsis: true
    },
    {
        title: "确认收款人",
        key: "user_name",
        align: "center",
        ellipsis: true
    }
]


const tableColumns = {
    userInfoColumns,
    roleInfoColumns,
    operateColumns,
    menuColumns,
    customerColumns,
    factoryColumns,
    goodsInfoColumns,
    orderInfoColumns,
    orderDetailsGoodsInfoColumns,
    orderDetailsPayListColumns
}



export default tableColumns;
