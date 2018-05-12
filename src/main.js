
import Vue from 'vue'
import App from './App'
import {router} from './router'
import {appRouter} from './router/router';
import iview from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css';

Vue.use(iview);

Vue.config.productionTip = false;

new Vue({

    el: '#app',

    router,

    store,

    components: { App },

    template: '<App/>',

    created() {

        let tagsList = [];

        appRouter.map((item) => {

            if (item.children.length <= 1) {

                tagsList.push(item.children[0]);

            } else {

                tagsList.push(...item.children);

            }

        });

        this.$store.commit('setTagsList', tagsList);

    },

    mounted() {

        this.$store.commit('setOpenedList');

        this.$store.commit('initCachepage');

        this.$store.commit('updateMenulist');

    }

});
