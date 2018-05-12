import qs from 'qs'
import NetUtils from '@/libs/utils/NetUtils'

const customer = {

    state: {

    },

    mutations: {

        getCustomerList(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/customer/getListByPage',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty('failCb')) data.failCb(err);

            })

        },

        getCustomerInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/customer/Get',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            })

        },

        reviseCustomerInfoById(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/customer/Put',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        deleteCustomerById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/customer/Delete',

                params: data.data,

                method: 'GET'

            }, (res) => {

                data.successCb(res.data);

            })

        },

        addCustomer(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/customer/Insert',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            })

        },

        recoveryCustomerInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/customer/Recovery',

                params: data.data,

                method: 'GET'

            }, (res) => {

                data.successCb(res.data)

            })

        }

    }

}


export default customer;
