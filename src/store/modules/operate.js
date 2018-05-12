import qs from 'qs'
import NetUtils from '@/libs/utils/NetUtils'

const operate = {

    state: {

    },

    mutations: {

        getOperateList(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/operation/GetListByPage',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty('failCb')) data.failCb(err);

            })

        },

        getOperateInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/operation/Get',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            })

        },

        deleteOperateById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/operation/Delete',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            })

        },

        addOperate(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/operation/Insert',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            })

        },

        reviseOperateInfoById(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/operation/Put',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        recoveryOperateInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/operation/Recovery',

                params: data.data,

                method: 'GET'

            }, (res) => {

                data.successCb(res.data)

            })

        }

    }

}


export default operate;
