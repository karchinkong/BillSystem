import Vue from 'vue';
import {appRouter, otherRouter} from '@/router/router'
import CommonUtils from "../../libs/utils/CommonUtils";
import Cookies from 'js-cookie';

const app = {
    state: {
        menuTheme: 'light', // 主题
        menuList: [],
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],    //  记录页面当前打开过的页面信息
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        openedSubmenuArr: [],   // 当前路由所在的菜单是否在二级页面,若是则打开该菜单栏
        cachePage: [],          // 缓存页面信息数组
        dontCache: [],
        currentPageName: '',    // 当前页面信息
        tagsList: [...otherRouter.children],
        routers: [
            otherRouter,
            ...appRouter
        ]
    },
    mutations: {
        updateMenulist(state) {
            if(Cookies.get("userInfo")) {
                let accessCode = JSON.parse(Cookies.get('userInfo')).menus;
                let menuList = new Array();
                appRouter.forEach(routerItem => {
                  if(routerItem.children.length>0) {
                    let pushIndex = menuList.push(routerItem);
                    let childrenArr = new Array();
                    routerItem.children.forEach(child => {
                      if(child.hasOwnProperty("meta")) {
                        if(child.meta.hasOwnProperty("noAuth")) {

                        } else {
                          accessCode.forEach(accessItem => {
                            if(child.access !== undefined) {
                              if(child.access === accessItem){
                                childrenArr.push(child);
                              }
                            } else {
                              childrenArr.push(child);
                            }
                          });
                        }
                      } else {
                        accessCode.forEach(accessItem => {
                          if(child.access !== undefined) {
                            if(child.access === accessItem){
                              childrenArr.push(child);
                            }
                          } else {
                            childrenArr.push(child);
                          }
                        });
                      }

                    });
                    menuList[pushIndex-1].children = childrenArr;
                  }
                });
                state.menuList = menuList;
            }

        },
        increateTag(state, tagObj) {    // 添加标签
            if (!CommonUtils.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.setItem('cachePage', JSON.stringify(state.cachePage));
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setTagsList(state, tagsList) {
            state.tagsList.push(...tagsList);
        },
        removeTag(state, name) {    // 移除标签
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        setCurrentPageName(state, name) {
            state.currentPageName = name;
        },
        setOpenedList(state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        addSubMenu(state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr = [];
                state.openedSubmenuArr.push(name);
            }
        },
        setCurrentPath(state, path) {
            state.currentPath = path;
        },
        clearOpenedSubmenu(state) {
            state.openedSubmenuArr.length = 0;
            state.pageOpenedList = [{
                title: '首页',
                path: '',
                name: 'home_index'
            }];
            localStorage.clear("pageOpenedList");
        },
        clearAllTags(state) {   // 关闭所有标签
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.setItem('cachePage', JSON.stringify([]));
            state.cachePage = JSON.parse(localStorage.getItem('cachePage'));
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state, vm) {   // 关闭除首页和当前的其他标签
            let currentTagName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if(item.name === currentTagName) {
                    currentIndex = index;
                }
            });
            if(currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentTagName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        initCachepage(state) {
            if (localStorage.getItem('cachePage')) {
                state.cachePage = JSON.parse(localStorage.getItem('cachePage'));
            }
        }
    }
}


export default app;
