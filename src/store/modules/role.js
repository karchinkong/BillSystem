import qs from 'qs'
import NetUtils from '@/libs/utils/NetUtils'

const role = {

    state: {

        RoleList: []

    },

    mutations: {

        getRoleListForDropdownBox(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/role/GetSelect',

                method: 'GET'

            }, (res) => {

                state.RoleList = res.data.data

            });

        },

        getRoleList(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/role/GetListByPage',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            }, (err) => {

                data.failCb(err);

            })

        },

        getRoleInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/role/Get',

                params: data.data,

                method: 'GET'

            }, (res) => {

                data.successCb(res.data);

            })

        },

        reviseRoleInfoById(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/role/Put',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        deleteRoleById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/role/Delete',

                params: data.data,

                method: 'GET'

            }, (res) => {

                data.successCb(res.data);

            })

        },

        addRole(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/role/Insert',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res.data);

            })

        },

        recoveryRoleInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/role/Recovery',

                params: data.data,

                method: 'GET'

            }, (res) => {

                data.successCb(res.data)

            })

        },

        getRoleMenu(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/role/GetRoleMenu',

                params: data.data,

                method: 'GET'

            }, (res) => {

                data.successCb(res.data)

            })

        },

        updateRoleMenu(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/role/UpdateRoleMenu',

                data: stringData,

                method: 'POST'

            }, (res) => {

                data.successCb(res);

            })

        }

    }

}


export default role;
