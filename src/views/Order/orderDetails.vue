<template>

    <div>
        <Card>
            <p slot="title">
                <Icon type="android-list"></Icon>
                订单详情
            </p>
            <Form ref="orderDetailsInfoForm" :model="orderDetailsInfoForm" :label-width="100">
                <FormItem label="订单编号"><Input readonly v-model="orderDetailsInfoForm.order_sn"></Input></FormItem>
                <FormItem label="订单总价"><Input readonly v-model="orderDetailsInfoForm.order_price"></Input></FormItem>
                <FormItem label="订单状态"><Input readonly v-model="orderDetailsInfoForm.auditing"></Input></FormItem>
                <FormItem label="付款状态"><Input readonly v-model="orderDetailsInfoForm.state"></Input></FormItem>
                <FormItem label="下单人"><Input readonly v-model="orderDetailsInfoForm.user_name"></Input></FormItem>
                <FormItem label="订单来源"><Input readonly v-model="orderDetailsInfoForm.cf_name"></Input></FormItem>
                <FormItem label="商品列表">
                    <Table border :columns="orderDetailsGoodsListCols" :data="orderDetailsGoodsListData"></Table>
                </FormItem>
                <FormItem label="订单支付列表">
                    <Table border :columns="orderDetailsPayListCols" :data="orderDetailsPayListData"></Table>
                </FormItem>
                <FormItem label="审核操作" v-if="!(orderDetailsInfoForm.auditing === '未通过' || orderDetailsInfoForm.auditing === '通过')">
                    <Button @click="auditingSuccess" type="primary" class="Auditing_Button">审核通过</Button>
                    <Button @click="auditingFail" type="error">审核不通过</Button>
                </FormItem>
            </Form>
        </Card>
    </div>

</template>

<script>

    import tableCols from '@/resource/dataJson/tableColumns'

    export default {
        data() {
            return {
                orderDetailsInfoForm: {},
                orderDetailsGoodsListCols: tableCols.orderDetailsGoodsInfoColumns,
                orderDetailsGoodsListData: [],
                orderDetailsPayListCols: tableCols.orderDetailsPayListColumns,
                orderDetailsPayListData: [],
                currentPageName: this.$route.name,
            }
        },
        methods: {
            auditingSuccess() {
                this.auditingCtrl(1);
            },
            auditingFail() {
                this.auditingCtrl(-1);
            },
            auditingCtrl(state) {
                const _self = this;
                this.$store.commit('orderAuditingState', {
                    data: {
                        state: state,
                        id: this.$route.params.id
                    },
                    successCb(res) {
                        _self.closePage();
                    }
                });
            },
            closePage() {
                let pageOpenedList = this.$store.state.app.pageOpenedList;
                let lastPageObj = pageOpenedList[0];
                let PageLength = pageOpenedList.length;
                for(let i=1; i<PageLength; i++) {
                    if(this.currentPageName === pageOpenedList[i].name) {
                        if(i < (PageLength-1)) {  //  当前关闭的Tag标签非最后一个标签的情况
                            lastPageObj = pageOpenedList[i+1];
                        } else {  // 当前关闭的Tag标签是最后一个标签的情况
                            lastPageObj = pageOpenedList[i-1];
                        }
                        break;
                    }
                }
                this.$store.commit('removeTag', this.currentPageName);
                pageOpenedList = this.$store.state.app.pageOpenedList;
                localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
                this.RoutePush(lastPageObj);
            },
            RoutePush(PageObj) {  // 关闭页面后页面跳转到最近打开的页面
                let routerObj = new Object();
                routerObj.name = PageObj.name;
                routerObj.params = PageObj.argu;
                routerObj.query = routerObj.query;
                this.$router.push(routerObj);
            },
        },
        mounted() {
            const _self = this;
            this.$store.commit('getOrderDetails', {
                data: {
                    id: this.$route.params.id
                },
                successCb(res) {
                    _self.orderDetailsInfoForm = res.data.data;
                    if(res.data.data.products) _self.orderDetailsGoodsListData = res.data.data.products;
                    if(res.data.data.transactions) _self.orderDetailsPayListData = res.data.data.transactions;
                }
            })
        }
    }

</script>

<style>
  .Auditing_Button{
      margin-right:10px;
  }
</style>
