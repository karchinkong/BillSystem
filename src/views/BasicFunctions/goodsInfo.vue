<template>

    <div>

        <data-tables
            :title="title"
            :tableLoading="tableLoading"
            :currentPage="currentPage"
            :totalCount="totalCount"
            :tableData="GoodsList"
            :changePage="changePage"
            :showAddBtn=false
            :tableCol="goodsInfoCol"
            :getInfo="reviseGoodsInfo"
            :recoveryInfo="recoveryGoodsInfo"
            :deleteInfo="deleteGoodsInfo">
        </data-tables>

    </div>

</template>


<script>

    import dataTables from '@/components/Tables/SystemSetUpTables'

    import tableCol from '@/resource/dataJson/tableColumns'

    export default {

        data() {
            return {
                GoodsList: [],
                totalCount: 0,
                currentPage: 1,
                pageSize: 10,
                title: '商品信息',
                goodsInfoCol: tableCol.goodsInfoColumns,
                tableLoading: true
            }
        },
        methods: {
            getGoodsList() {
                this.tableLoading = true;
                const _self = this;
                this.$store.commit('getGoodsList', {
                    data: {
                        strQuery: { name: "", no: "" },
                        orderBy: "",
                        pageIndex: this.currentPage,
                        pagePage: this.pageSize
                    },
                    successCb(res) {
                        _self.GoodsList = res.data.list;
                        _self.totalCount = res.data.total;
                        _self.tableLoading = false;
                    }
                });
            },
            changePage(Page) {
                this.currentPage = Page;
                this.getGoodsList();
            },
            deleteGoodsInfo(idx) {
                const _self = this;
                this.$store.commit('deleteGoodsById', {
                    data: {
                        id: this.GoodsList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getGoodsList();
                            }
                        })
                    }
                })
            },
            reviseGoodsInfo(idx) {
                this.$router.push(({path: '/basic/productInfo/' + this.GoodsList[idx].id}));
            },
            recoveryGoodsInfo(idx) {
                const _self = this;
                this.$store.commit('recoveryGoodsInfoById', {
                    data: {
                        id: this.GoodsList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            duration: 1,
                            onClose() {
                                _self.getGoodsList();
                            }
                        })
                    }
                })
            }
        },
        created() {
            this.getGoodsList();
        },
        components: {
            dataTables
        }

    }

</script>



