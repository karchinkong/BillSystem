import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import app from './modules/app';
import role from './modules/role';
import log from './modules/log';
import operate from './modules/operate'
import menu from './modules/menu'
import customer from './modules/customer'
import firm from './modules/firm'
import goods from './modules/goods'
import order from './modules/order'

Vue.use(Vuex);


export default new Vuex.Store({

    modules: {

        user,

        app,

        role,

        log,

        operate,

        menu,

        customer,

        firm,

        goods,

        order

    }

})
