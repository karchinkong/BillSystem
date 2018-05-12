
import Cookies from 'js-cookie'

import {mapState} from 'vuex'

const CommonUtils = {

  /**
   * 设置标题
   * @param title
   */
  title(title) {

        title = title || '账单后台系统';

        window.document.title = title;

    },

  /**
   * 打开新的路由
   * @param vm
   * @param name
   * @param params
   * @param query
   */
    openNewPage(vm, name, params, query) {
        let pageOpenedList = vm.$store.state.app.pageOpenedList;
        let openedPageLength = pageOpenedList.length;
        let tagHasOpened = false;
        for(let i=0; i<openedPageLength; i++) {
            if(name === pageOpenedList[i].name) {
                tagHasOpened = true;
            }
        }
        if(!tagHasOpened) {
            let tag = vm.$store.state.app.tagsList.filter((item) => {
                if(item !== undefined){
                    if (item.hasOwnProperty("children")) {
                        return name === item.children[0].name;
                    } else {
                        return name === item.name;
                    }
                }
            });
            tag = tag[0];
            if(tag) {
                tag = tag.children ? tag.children[0] : tag;
                if (params) {
                    tag.argu = params;
                }
                if (query) {
                    tag.query = query;
                }
                vm.$store.commit('increateTag', tag);
            }
        }
        vm.$store.commit('setCurrentPageName', name);
    },

  /**
   * 通过路由的name属性获取该路由信息
   * @param routers
   * @param name
   * @returns {*}
   */
    getRouterObjByName(routers, name) {
        if (!name || !routers || !routers.length) {
            return null;
        }
        let routerObj = null;
        for (let item of routers) {
            if (item.name === name) {
                return item;
            }
            routerObj = CommonUtils.getRouterObjByName(item.children, name);
            if (routerObj) {
                return routerObj;
            }
        }
        return null;
    },

  /**
   * 设置当前所在的路径
   * @param vm
   * @param name
   * @returns {Array}
   */
    setCurrentPath(vm, name) {
        let title = '';
        let isOtherRouter = false;
        vm.$store.state.app.routers.forEach(item => {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    title = item.title;
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            } else {
                item.children.forEach(child => {
                    if (child.name === name) {
                        title = item.title;
                        if (item.name === 'otherRouter') {
                            isOtherRouter = true;
                        }
                    }
                });
            }
        });
        let currentPathArr = new Array();
        if(name === 'home_index') {   // 当前路径为首页
            currentPathArr = [
                {
                    title: CommonUtils.getRouterObjByName(vm.$store.state.app.routers, 'home_index').title,
                    name: name,
                    path: ""
                }
            ];
        } else if((name.indexOf("_index") >= 0 || isOtherRouter) && name !== 'home_index') {  // 当前路径为首页下的一级页面

            currentPathArr = [
                {
                    title: CommonUtils.getRouterObjByName(vm.$store.state.app.routers, 'home_index').title,
                    name: 'home_index',
                    path: "/home"
                },
                {
                    title: title,
                    name: name,
                    path: ''
                }
            ]

        } else {  //  当前路径为首页下的二级页面

            let currentPathObj;

            vm.$store.state.app.routers.forEach(item => {
                if(item.children.length > 0) {
                    item.children.forEach(childItem => {
                        if(childItem.name === name) {
                            currentPathObj = item;
                        }
                    });
                    return false;
                }
            });

            if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
                currentPathArr = [
                    {
                        title: '首页',
                        path: '',
                        name: 'home_index'
                    }
                ];
            } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
                currentPathArr = [
                    {
                        title: '首页',
                        path: '/home',
                        name: 'home_index'
                    },
                    {
                        title: currentPathObj.title,
                        path: '',
                        name: name
                    }
                ];
            } else {
                let childObj = currentPathObj.children.filter((child) => {
                    return child.name === name;
                })[0];
                currentPathArr = [
                    {
                        title: '首页',
                        path: '/home',
                        name: 'home_index'
                    },
                    {
                        title: currentPathObj.title,
                        path: '',
                        name: currentPathObj.name
                    },
                    {
                        title: childObj.title,
                        path: currentPathObj.path + '/' + childObj.path,
                        name: name
                    }
                ];
            }

        }

        vm.$store.commit('setCurrentPath', currentPathArr);

        return currentPathArr;
    },

  /**
   * 判断当前菜单拥有的操作权限并返回对应的操作权限对象
   * @param menuId
   * @returns {{add: boolean, edit: boolean, del: boolean, query: boolean, export: boolean, print: boolean, resetPwd: boolean, recovery: boolean, lock: boolean}}
   */
    judgeAccess(menuId) {
        let AccessArr = JSON.parse(Cookies.get("userInfo")).access;
        let userAccess = {
            add: false,
            edit: false,
            del: false,
            query: false,
            export: false,
            print: false,
            resetPwd: false,
            recovery: false,
            lock: false,
            detail: false,
            auditing: false,
            pay: false
        }
        AccessArr.forEach(AccessItem => {
            if(AccessItem.menuId === menuId) {
                AccessItem.operations.forEach(operationsItem => {
                    if(operationsItem === 1) {
                        userAccess.add = true;
                    } else if(operationsItem === 2) {
                        userAccess.edit = true;
                    } else if(operationsItem === 3) {
                        userAccess.del = true;
                    } else if(operationsItem === 4) {
                        userAccess.query = true;
                    } else if(operationsItem === 5) {
                        userAccess.export = true;
                    } else if(operationsItem === 6) {
                        userAccess.print = true;
                    } else if(operationsItem === 7) {
                        userAccess.resetPwd = true;
                    } else if(operationsItem === 8) {
                        userAccess.recovery = true;
                    } else if(operationsItem === 9) {
                        userAccess.lock = true;
                    } else if(operationsItem === 10) {
                        userAccess.detail = true;
                    } else if(operationsItem === 11) {
                        userAccess.auditing = true;
                    } else if(operationsItem === 12) {
                        userAccess.pay = true;
                    }
                });
            }
        });
        return userAccess;
    },


  /**
   * 生成 删除 按钮
   * @param vm
   * @param h
   * @param currentRow
   * @param index
   * @param delClick
   * @returns {*}
   */
    deleteButton(vm, h, currentRow, index, delClick) {
        const ButtonTxt = vm.title === '商品信息' ? '下架' : '删除';
        const PoptipTxt = vm.title === '商品信息' ? '您确定要下架此商品吗?' : '您确定要删除这条数据吗?';
        return h('Poptip', {
            props: {
                confirm: true,
                title: PoptipTxt,
                transfer: true
            },
            style: {
                margin: '0 5px 0 0'
            },
            on: {
                'on-ok': () => {
                    delClick(index);
                }
            }
        }, [
            h('Button', {
                props: {
                    type: 'error',
                    placement: 'top',
                    size: 'small'
                }
            }, ButtonTxt)
        ]);
    },

  /**
   * 生成 修改 按钮
   * @param vm
   * @param h
   * @param currentRow
   * @param index
   * @param editClick
   * @returns {*}
   */
    editButton(vm, h, currentRow, index, editClick) {
        return h('Button', {
            props: {
                type: 'primary',
                size: 'small'
            },
            style: {
                margin: '0 5px 0 0'
            },
            on: {
                'click': () => {
                    editClick(index);
                }
            }
        }, '修改');
    },

  /**
   * 生成 恢复 按钮
   * @param vm
   * @param h
   * @param currentRow
   * @param index
   * @param recoveryClick
   * @returns {*}
   */
    recoveryButton(vm, h, currentRow, index, recoveryClick) {
        const ButtonTxt = vm.title === '商品信息' ? '上架' : '恢复';
        const PoptipTxt = vm.title === '商品信息' ? '您确定要上架此商品吗?' : '您确定要恢复这条数据吗?';
        return h('Poptip', {
            props: {
                confirm: true,
                title: PoptipTxt,
                transfer: true
            },
            style: {
                margin: '0 5px 0 0'
            },
            on: {
                'on-ok': () => {
                    recoveryClick(index);
                }
            }
        }, [
            h('Button', {
                props: {
                    type: 'success',
                    placement: 'top',
                    size: 'small'
                }
            }, ButtonTxt)
        ]);
    },

  /**
   * 生成 重置密码 按钮
   * @param vm
   * @param h
   * @param currentRow
   * @param index
   * @param resetClick
   * @returns {*}
   */
    resetPwdButton(vm, h, currentRow, index, resetClick) {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '您确定要重置该用户的密码吗?',
                transfer: true,
                placement: 'left'
            },
            on: {
                'on-ok': () => {
                    resetClick(index);
                }
            }
        }, [
            h('Button', {
                props: {
                    type: 'error',
                    placement: 'top',
                    size: 'small'
                }
            }, '重置密码')
        ]);
    },

  /**
   * 生成 锁定/解锁 按钮
   * @param vm
   * @param h
   * @param currentRow
   * @param index
   * @param type
   * @param lockClick
   * @returns {*}
   */
    lockButton(vm, h, currentRow, index, type, lockClick) {
        const TipsTitle = (type === 'lock') ? '您确定要锁定这个用户吗?' : '您确定要解锁这个用户吗?';
        const ButtonText = (type === 'lock') ? '锁定' : '解锁';
        const ButtonType = (type === 'lock') ? 'warning' : 'success';
        return h('Poptip', {
            props: {
                confirm: true,
                title: TipsTitle,
                transfer: true,
                placement: 'left'
            },
            style: {
                margin: '0 5px 0 0'
            },
            on: {
                'on-ok': () => {
                    lockClick(index, type);
                }
            }
        }, [
            h('Button', {
                props: {
                    type: ButtonType,
                    placement: 'top',
                    size: 'small'
                }
            }, ButtonText)
        ]);
    },

  /**
   * 生成 权限关联 按钮
   * @param vm
   * @param h
   * @param currentRow
   * @param index
   * @param relatClick
   * @returns {*}
   */
    relatOperationsButton(vm, h, currentRow, index, relatClick) {
        return h('Button', {
            props: {
                type: 'primary',
                size: 'small'
            },
            style: {
                margin: '0 5px 0 0'
            },
            on: {
                'click': () => {
                    relatClick(index);
                }
            }
        }, '关联操作');
    },

    detailButton(vm, h, currentRow, index, detailClick) {
        return h('Button', {
            props: {
                type: 'primary',
                size: 'small'
            },
            style: {
                margin: '0 5px 0 0'
            },
            on: {
                'click': () => {
                    detailClick(index);
                }
            }
        }, '查看详情');
    },

    payButton(vm, h, currentRow, index, payClick) {
        return h('Button', {
            props: {
                type: 'primary',
                size: 'small'
            },
            style: {
                margin: '0 5px 0 0'
            },
            on: {
                'click': () => {
                    payClick(index);
                }
            }
        }, '付款');
    },

    oneOf(ele, targetArr) {

        if (targetArr.indexOf(ele) >= 0) {

            return true;

        } else {

            return false;

        }

    }

}

export default CommonUtils;
