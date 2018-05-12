import qs from 'qs'
import NetUtils from '@/libs/utils/NetUtils'

const log = {

    state: {



    },

    mutations: {

        getLogListByDate(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/user/GetUserLog',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty('successCb')) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty('failCb')) data.failCb(err);

            })

        }

    }

}


export default log;
