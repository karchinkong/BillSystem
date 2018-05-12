import qs from 'qs'
import NetUtils from '@/libs/utils/NetUtils'

const role = {

    state: {

        RoleList: []

    },

    mutations: {

        getSelectList(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/order/GetSelect',

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res.data)

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err)

            })

        },

        getSelectListByProduct(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/order/GetSelectByProduct',

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res.data)

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err)

            })

        },

        insertOrder(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/order/Insert',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res.data)

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err)

            })

        },

        getOrderListByTypeId(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: 'api/order/GetListByPage',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res.data)

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err)

            })

        },

        getOrderInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/order/get',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            })

        },

        editOrderInfo(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/order/Put',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        getOrderDetails(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/order/GetDetail',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            })

        },

        orderAuditingState(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/order/Auditing',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        getPaymentList(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/order/GetSelectByPayment',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            })

        },

        insertOrderPayment(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/order/Money',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        }

    }

}


export default role;
