<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="toggle-filled"></Icon>
                客户订单
            </p>
            <div>
                <Table border :loading="tableLoading" :columns="orderListCols" :data="orderList" ></Table>
                <page-nation :curPage="currentPage" :totalPage="totalCount" @on-change="changePage"></page-nation>
            </div>
        </Card>
    </div>
</template>


<script>

    import pageNation from '@/components/Pagination/Pagination'

    import tableCol from '@/resource/dataJson/tableColumns'

    import expandRow from '@/views/Order/expandRow'

    import CommonUtils from '@/libs/utils/CommonUtils'

    export default {

        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                tableLoading: true,
                orderList: [],
                orderListCols: tableCol.orderInfoColumns,
                userAccess: {}
            }
        },

        methods: {
            changePage(Page) {
                this.currentPage = Page;
                this.getOrderList();
            },
            getOrderList() {
                const _self = this;
                this.$store.commit('getOrderListByTypeId', {
                    data: {
                        strQuery: { ordertype: this.$route.meta.queryId, ordersn: '', cfid: '', auditin: '', state: '' },
                        orderBy: "",
                        pageIndex: this.currentPage,
                        pagePage: this.pageSize
                    },
                    successCb(res) {
                        _self.orderList = res.data.list;
                        _self.totalCount = res.data.total;
                        _self.tableLoading = false;
                    }
                })
            },
            editOrderInfo(idx) {
                this.$router.push(({path: '/order/reviseOrder/' + this.orderList[idx].id}));
            },
            detailOrderInfo(idx) {
                this.$router.push({path: '/order/orderDetails/' + this.orderList[idx].id});
            },
            payDetailsInfo(idx) {
                this.$router.push({path: '/order/orderPayDetails/' + this.orderList[idx].ordersn});
            },
            initTableColumns() {
                this.orderListCols.forEach(orderListItem => {
                    if(orderListItem.hasOwnProperty("type")) {
                        if(orderListItem.type === 'expand') {
                            orderListItem.render = (h, param) => {
                                return h(expandRow, {
                                    props: {
                                        row: param.row
                                    }
                                })
                            }
                        }
                    }
                    if(orderListItem.hasOwnProperty("handle")) {
                        if(orderListItem.hasOwnProperty("handle")) {
                            orderListItem.render = (h, param) => {
                                return h('div', [
                                    this.userAccess.edit ? CommonUtils.editButton(this, h, orderListItem, param.index, this.editOrderInfo) : '',
                                    this.userAccess.detail ? CommonUtils.detailButton(this, h, orderListItem, param.index, this.detailOrderInfo): '',
                                    this.userAccess.pay ? CommonUtils.payButton(this, h, orderListItem, param.index, this.payDetailsInfo): ''
                                ]);
                            }
                        }
                    }
                })
            }
        },

        created() {
            this.userAccess = CommonUtils.judgeAccess(this.$route.meta.id);
            this.getOrderList();
            this.initTableColumns();
        },

        components: {
            pageNation
        }

    }

</script>
