import axios from 'axios'
import iView from 'iview'
import Vue from 'vue'
import Cookies from 'js-cookie'

Vue.use(iView);

const utils = {

    /**
     * AJAX请求
     * @param extendConfig        @配置属性
     */
    ajaxRequest(extendConfig) {

        const baseConfig = {

            baseURL: '',

            method: "GET",

            headers: {

                'Content-Type':'application/x-www-form-urlencoded',

            }

        }

        const AssignData = Object.assign({}, baseConfig, extendConfig);

        const instance = axios.create(AssignData);

        const successCallBackFunc = arguments[1] || undefined;

        const FailCallBackFunc = arguments[2] || function(err) {  };

        if (process.env.NODE_ENV == 'development') {

            instance.defaults.baseURL = 'http://192.168.124.10:8088';

        } else if (process.env.NODE_ENV == 'production') {

            instance.defaults.baseURL = 'http://120.77.44.179:8088';

        }

        instance.interceptors.request.use(function(config){

            if(Cookies.get("userInfo")) {

                config.headers['token'] = JSON.parse(Cookies.get("userInfo")).token;

            }

            return config;

        });

        // http response 服务器响应拦截器
        instance.interceptors.response.use(

            response => {

                return response;

            },

            error => {

                if (error.response) {

                    switch (error.response.status) {

                        case 403:

                            return Promise.reject("暂无权限访问");

                            break;

                        case 500:

                            return Promise.reject("服务器内部错误，请联系管理员");

                            break;

                        case 404:

                            return Promise.reject("暂未找到相应接口");

                            break;

                        default:

                            return Promise.reject(error);

                            break;

                    }

                }

            }

        );

        instance().then((res) => {

            if(res.data.code === 1101) {

                iView.Notice.error({

                    title: '请求失败',

                    desc: res.data.message,

                    duration: 2,

                    onClose() {

                        FailCallBackFunc();

                    }

                });

            } else if(res.data.code === 2001) {

                iView.Notice.error({

                    title: 'Cookie失效',

                    desc: res.data.message,

                    duration: 2,

                    onClose() {

                        Cookies.remove("userInfo");

                    }

                });

            } else if(res.data.code === 0) {

                successCallBackFunc(res);

            }

        }).catch(function(err) {

            iView.Notice.error({

                title: '请求失败',

                desc: err,

                duration: 2,

                onClose() {

                    FailCallBackFunc(err);

                }

            });

        })

    }

}


export default utils;
