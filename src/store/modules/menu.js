import qs from 'qs'
import NetUtils from '@/libs/utils/NetUtils'

const log = {

    state: {

    },

    mutations: {

        getMenuList(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/menu/getListByPage',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty('failCb')) data.failCb(err);

            })

        },

        getCascaderList(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/menu/GetAdditional',

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty('failCb')) data.failCb(err);

            })

        },

        getMenuInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/menu/Get',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            })

        },

        reviseMenuInfoById(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/menu/Put',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        }

    }

}


export default log;
