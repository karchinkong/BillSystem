import qs from 'qs'
import NetUtils from '@/libs/utils/NetUtils'

const goods = {

    state: {

    },

    mutations: {

        insertGoods(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/product/Insert',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty('failCb')) data.failCb(err);

            })

        },

        getGoodsList(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/product/GetListByPage',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            })

        },

        getGoodsInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/product/Get',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty('failCb')) data.failCb(err);

            })

        },

        editGoodsById(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/product/Put',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        deleteGoodsById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/product/Delete/' + data.data.id,

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            })

        },

        recoveryGoodsInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/product/Recovery',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data)

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            })

        },

        getGoodsTypeList(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/product/GetAdditional',

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data)

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        }

    }

}


export default goods;
