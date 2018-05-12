<template>

    <div>

        <Card>
            <p slot="title">
                <Icon type="android-list"></Icon>
                付款信息
            </p>
            <Form ref="payDetailsForm" :model="payDetailsForm" :label-width="100" :rules="orderValidate">
                <FormItem label="支付类型" prop="payment_type">
                    <Select v-model="payDetailsForm.payment_type" style="width:200px">
                        <Option v-for="item in paymentList" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="支付金额" prop="amount_money"><Input v-model="payDetailsForm.amount_money" placeholder="请输入支付金额"></Input></FormItem>
                <FormItem label="支付账号" prop="account_number"><Input v-model="payDetailsForm.account_number" placeholder="请输入支付账号"></Input></FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit">添加</Button>
                </FormItem>
            </Form>
        </Card>

    </div>

</template>

<script>

    export default {
        data() {
            return {
                payDetailsForm: {
                    order_sn: this.$route.params.id,
                    payment_type: '',
                    amount_money: '',
                    account_number: ''
                },
                paymentList: [],
                orderValidate: {
                    payment_type: [
                        {
                          type:'number', // 添加验证类型
                          required: true, message: '请选择支付方式', trigger: 'change'
                        }
                    ],
                    amount_money: [
                        { required: true, message: '请输入支付金额', trigger: 'blur' }
                    ],
                    account_number: [
                        { required: true, message: '请输入支付账号', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$refs.payDetailsForm.validate(valid => {
                    if(valid) {
                        const _self = this;
                        this.$store.commit('insertOrderPayment', {
                            data: _self.payDetailsForm,
                            successCb(res) {
                                _self.closePage();
                            }
                        })
                    }
                })

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
        created() {
            const _self = this;
            this.$store.commit('getPaymentList', {
                successCb(res) {
                    _self.paymentList = res.data.data;
                }
            })
        }
    }

</script>
