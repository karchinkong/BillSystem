import Main from '@/views/Main.vue'

// 不作为Main组件的子页面展示的页面单独写,该路由配置为登录路由
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
}

// 首页路由
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: "/home",
    meta: {
        title: "首页"
    },
    component: Main,
    children: [
        { path: "home", name: "home_index", title:'首页', component: resolve => { require(['@/views/home/home.vue'], resolve); }},
        { path: 'ownspace', name: 'ownspace_index', title: '个人中心', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } }
    ]
}

// 主菜单路由
export const appRouter = [
    {
        path: '/basic',
        name: 'basic',
        icon: 'toggle-filled',
        title: '基本功能',
        component: Main,
        children: [
            { path: 'customerInfo', title: '客户信息', access: 6, meta: { id: 6 }, name: 'customer-info', component: resolve => { require(['@/views/BasicFunctions/customerInfo.vue'], resolve); } },
            { path: 'firmInfo', title: '厂家信息', access: 7, meta: { id: 7 }, name: 'firm-info', component: resolve => { require(['@/views/BasicFunctions/firmInfo.vue'], resolve); } },
            { path: 'productInfo', title: '商品信息', access: 8, meta: { id: 8 }, name: 'product-info', component: resolve => { require(['@/views/BasicFunctions/goodsInfo.vue'], resolve); } },
            { path: 'addGoodsInfo', title: '新增商品信息', access: 15, meta: { id: 15 }, name: 'addGoods-info', component: resolve => { require(['@/views/BasicFunctions/addGoodsInfo.vue'], resolve); } },
            { path: 'productInfo/:id', title: '修改商品信息',  access: 8, meta: { id: 8, noAuth: true }, name: 'reviseGoods-info', component: resolve => { require(['@/views/BasicFunctions/addGoodsInfo.vue'], resolve); }}
        ]
    },
    {
        path: '/system',
        icon: 'wrench',
        name: 'system',
        title: '系统设置',
        component: Main,
        children: [
            { path: 'userInfo', title: '用户信息', access: 3, meta: { id: 3 }, name: 'user-info', component: resolve => { require(['@/views/SystemSetup/userInfo.vue'], resolve); } },
            { path: 'roleInfo', title: '角色信息', access: 4, meta: { id: 4 }, name: 'role-info', component: resolve => { require(['@/views/SystemSetup/roleInfo.vue'], resolve); } },
            { path: 'menuInfo', title: '菜单信息', access: 14, meta: { id: 14 }, name: 'menu-info', component: resolve => { require(['@/views/SystemSetup/menuInfo.vue'], resolve); } },
            { path: 'handleInfo', title: '操作信息', access: 5, meta: { id: 5 }, name: 'operate-info', component: resolve => { require(['@/views/SystemSetup/operateInfo.vue'], resolve); } },
            { path: 'logInfo', title: '日志信息', access: 13, meta: { id: 13 }, name: 'log-info', component: resolve => { require(['@/views/SystemSetup/logInfo.vue'], resolve); } },
            { path: 'roleInfo/:id', title: '角色关联操作',  access: 4, meta: { id: 4, noAuth: true }, name: 'relation-info', component: resolve => { require(['@/views/SystemSetup/relationRole.vue'], resolve); }}
        ]
    },
    {
        path: '/order',
        icon: 'ios-pulse-strong',
        title: '订单管理',
        name: 'order',
        component: Main,
        children: [
            { path: 'factoryOrderInfo', title: '厂商订单', access: 11, meta: { id: 11, queryId: 1 }, name: 'factoryorder-info', component: resolve => { require(['@/views/Order/factoryOrder.vue'], resolve); } },
            { path: 'customerOrderInfo', title: '客户订单', access: 18, meta: { id: 18, queryId: 2 }, name: 'customerorder-info', component: resolve => { require(['@/views/Order/customerOrder.vue'], resolve); } },
            { path: 'increaseOrder', title: '新增订单', access: 12, meta: { id: 12 }, name: 'insert-order', component: resolve => { require(['@/views/Order/insertOrder.vue'], resolve); } },
            { path: 'reviseOrder/:id', title: '修改订单', access: 11, meta: { id: 11, noAuth: true }, name: 'revise-order', component: resolve => { require(['@/views/Order/insertOrder.vue'], resolve); } },
            { path: 'orderDetails/:id', title: '订单详情', access: 11, meta: { id: 11, noAuth: true }, name: 'order-details', component: resolve => { require(['@/views/Order/orderDetails.vue'], resolve); } },
            { path: 'orderPayDetails/:id', title: '付款详情', access: 11, meta: { id: 11, noAuth: true }, name: 'orderPay-details', component: resolve => { require(['@/views/Order/orderPayDetails.vue'], resolve); } }
        ]
    },
    {
        path: '/report',
        icon: 'lock-combination',
        title: '报表管理',
        name: 'report',
        component: Main,
        children: []
    }
]

// 403权限路由
export const Router403 = {
  path: '/403',
  name: 'error-403',
  meta: {
    title: '403-暂无权限'
  },
  component: resolve => { require(['@/views/error-page/403.vue'], resolve); }
}

// 404页面路由
export const Router404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
}



export const routers = [
    otherRouter,
    loginRouter,
    ...appRouter,
    Router403,
    Router404
]
