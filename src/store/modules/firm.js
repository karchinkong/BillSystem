import qs from 'qs'
import NetUtils from '@/libs/utils/NetUtils'

const firm = {

    state: {

    },

    mutations: {

        getFactoryList(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/factory/getListByPage',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty('failCb')) data.failCb(err);

            })

        },

        getFactoryInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/factory/Get',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            })

        },

        reviseFactoryInfoById(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/factory/Put',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        deleteFactoryById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/factory/Delete',

                params: data.data,

                method: 'GET'

            }, (res) => {

                data.successCb(res.data);

            })

        },

        addFactory(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/factory/Insert',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            })

        },

        recoveryFactoryInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/factory/Recovery',

                params: data.data,

                method: 'GET'

            }, (res) => {

                data.successCb(res.data)

            })

        }

    }

}


export default firm;
