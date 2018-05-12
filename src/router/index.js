import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import CommonUtils from '@/libs/utils/CommonUtils'
import Cookies from 'js-cookie'
import {routers, otherRouter, appRouter} from './router';

Vue.use(Router);
Vue.use(iView);

const RouterConfig = {
    routes: routers
};

export const router = new Router(RouterConfig);

router.beforeEach((to, from, next) => { // 路由跳转前操作

    iView.LoadingBar.start();

    CommonUtils.title(to.meta.title);

    if(!Cookies.get("userInfo") && to.name !=="login") {  // 用户未登录的情况下打开除首页外的页面,跳转回登录页面

        next('/login');

    } else if(Cookies.get("userInfo") && to.name === "login") {

        next('/');

    } else {

        const currentPathObj = CommonUtils.getRouterObjByName([otherRouter, ...appRouter], to.name);

        if(currentPathObj && currentPathObj.access !== undefined) {   // 根据权限判断是否能进入当前页面

            const accessArr = JSON.parse(Cookies.get("userInfo")).menus;

            let noAccess = true;

            accessArr.forEach(item => {

                if (currentPathObj.access === item) {

                    noAccess = false;

                }

            });

            if(noAccess) {

                next({ replace: true, name: 'error-403'});

            } else {

                next();

            }

        } else {

            next();

        }

    }

});

router.afterEach((to) => {  // 路由跳转完成后操作

    CommonUtils.openNewPage(router.app, to.name, to.params, to.query);

    iView.LoadingBar.finish();

});
