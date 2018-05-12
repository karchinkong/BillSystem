import qs from 'qs'
import NetUtils from '@/libs/utils/NetUtils'
import Cookies from 'js-cookie'
import {routers,appRouter} from '@/router/router.js'

const user = {

    state: {

        userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null

    },

    mutations: {

        // 退出登录
        logout() {

            Cookies.remove('userInfo');

        },

        // 用户登录
        login(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: "/api/account/login",

                data: stringData,

                method: "POST"

            }, (res) => {

                res.data.data.avater = res.data.data.hasOwnProperty("avater") ? res.data.data.avater : "http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1210/09/c2/14332620_1349771167668_800x800.jpg";

                Cookies.set("userInfo", JSON.stringify(res.data.data));

                state.userInfo = JSON.parse(Cookies.get("userInfo"));

                if(data.hasOwnProperty("successCb")) data.successCb(res.data.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        // 修改用户密码-个人中心
        reviseUserInfo(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: "/api/user/UpdatePassword",

                data: stringData,

                method: "POST"

            }, (res) => {

                Cookies.remove('userInfo');

                localStorage.removeItem('pageOpenedList');

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });
        },

        // 根据账号获取该账号的用户信息
        getUserInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/user/get',

                params: data.data,

                method: 'GET'

            }, (res) => {

                res.data.data.state === 1 ? res.data.data.state = true : res.data.data.state = false;

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        // 获取用户信息列表
        getUserInfoList(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/user/GetListByPage',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res.data);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        // 修改用户信息
        editUserInfoByJobNumber(state, data) {

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/user/Put',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            });

        },

        // 删除用户
        delUserInfoById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/user/Delete',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            })

        },

        // 添加用户
        addUserInfo(state, data) {

            data.data.state === true ? data.data.state = 1 : data.data.state = 0;

            const stringData = qs.stringify(data.data);

            NetUtils.ajaxRequest({

                url: '/api/user/Insert',

                data: stringData,

                method: 'POST'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            })

        },

        // 锁定用户
        LockOrUnlockUserInfo(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/user/GetUserLocking',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            })

        },

        // 恢复被删除的用户
        recoveryUserInfo(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/user/GetUserRecovery',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            })

        },

        // 重置密码
        resetPasswordById(state, data) {

            NetUtils.ajaxRequest({

                url: '/api/user/GetResetPassWord',

                params: data.data,

                method: 'GET'

            }, (res) => {

                if(data.hasOwnProperty("successCb")) data.successCb(res);

            }, (err) => {

                if(data.hasOwnProperty("failCb")) data.failCb(err);

            })

        }

    }

}

export default user;
