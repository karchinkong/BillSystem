<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="android-list"></Icon>
                新增订单
            </p>
            <Form ref="orderInfoForm" :model="orderInfoForm" :label-width="80" :rules="orderValidate">
                <FormItem label="订单类型">
                    <RadioGroup v-model="orderInfoForm.ordertype" type="button" @on-change="changeType">
                        <Radio label="1">厂商订单</Radio>
                        <Radio label="2">客户订单</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem :label="orderTitle" prop="sourceid">
                    <Select v-model="orderInfoForm.sourceid" style="width:200px" v-if="orderInfoForm.ordertype === '2'">
                        <Option v-for="item in customerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="orderInfoForm.sourceid" style="width:200px" v-else>
                        <Option v-for="item in factoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注">
                    <Input type="textarea" v-model="orderInfoForm.remark" placeholder="请输入备注..."></Input>
                </FormItem>
                <FormItem>
                    <div class="Filter-Wrap">
                        <h3>商品搜索</h3>
                        <Select v-model="searchKeywords" style="width:550px" filterable not-found-text="暂无商品">
                            <Option v-for="item in goodsList" :value="item.no" :key="item.no">{{ item.name }}</Option>
                        </Select>
                        <Button type="ghost" shape="circle" icon="android-add" @click="addGoodsToTable"></Button>
                    </div>
                    <Table border :columns="orderGoodsCol" :data="orderInfoForm.products" no-data-text="暂无添加商品"></Table>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit">新增订单</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>

    import tableCol from '@/resource/dataJson/tableColumns'

    export default {

        data() {
            return {
                orderInfoForm: {
                    ordertype: '1',
                    sourceid: '',
                    remark: '',
                    products: []
                },
                customerList: [],
                factoryList: [],
                goodsList: [],
                orderTitle: '订单客户',
                orderGoodsCol: [
                    {
                        title: "商品编号",
                        key: "no",
                        align: "center",
                        width: 100
                    },
                    {
                        title: "商品名称",
                        key: "name",
                        align: "center",
                        ellipsis: true
                    },
                    {
                        title: "当前存库数量",
                        key: "stock",
                        align: "center",
                        ellipsis: true,
                        render: (h, param) => {
                            const isExistStock = param.row.stock === -100 ? "暂无限制库存" : param.row.stock;
                            return h('div', [
                                h('strong', isExistStock)
                            ])
                        }
                    },
                    {
                        title: "商品销售价",
                        align: "center",
                        width: 150,
                        render: (h, param) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value: param.row.price
                                    },
                                    on:{
                                        'on-blur':(event) => {
                                            this.orderInfoForm.products[param.index].price = event.target.value;
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: "商品数量",
                        align: "center",
                        width: 150,
                        render: (h, param) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value: param.row.number
                                    },
                                    on:{
                                        'on-blur':(event) => {
                                            if(param.row.stock === -100) {
                                                this.orderInfoForm.products[param.index].number = event.target.value;
                                            } else {
                                                if(event.target.value > param.row.stock) {
                                                    this.$Notice.error({
                                                        title: '商品数量超出库存数量,当前库存为' + this.orderInfoForm.products[param.index].stock,
                                                    })
                                                }
                                                this.orderInfoForm.products[param.index].number = event.target.value;
                                            }
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: "操作",
                        align: "center",
                        render: (h, param) => {
                            return h('Poptip', {
                                props: {
                                    confirm: true,
                                    title: '您确定要删除这条数据吗?',
                                    transfer: true
                                },
                                style: {
                                    margin: '0 5px 0 0'
                                },
                                on: {
                                    'on-ok': () => {
                                        this.delGoodsListData(param.index);
                                    }
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        placement: 'top',
                                        size: 'small'
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                searchKeywords: '',
                orderValidate: {
                    sourceid: [
                        {
                            type:'number', // 添加验证类型
                            required: true, message: '请选择订单来源', trigger: 'change'
                        }
                    ]
                },
                currentPageName: this.$route.name,
                orderType: ''
            }
        },

        methods: {
            addGoodsToTable() {
                const _self = this;
                this.goodsList.forEach(goodsItem => {
                    if(goodsItem.no === _self.searchKeywords) {
                        goodsItem.number = 0;
                        goodsItem.price = 0;
                        _self.orderInfoForm.products.push(goodsItem);
                    }
                });
                this.searchKeywords = '';
            },
            handleSubmit() {
                const _self = this;
                this.$refs.orderInfoForm.validate(valid => {
                    if(valid) {
                        let isPass = true;
                        this.orderInfoForm.products.forEach(orderGoodsItem => {
                            if(orderGoodsItem.price == 0) {
                                _self.$Notice.error({
                                    title: '请输入价格再提交'
                                });
                                isPass = false;
                            }
                            if(orderGoodsItem.number === 0) {
                                console.log(orderGoodsItem.number);
                                _self.$Notice.error({
                                    title: '请输入库存再提交'
                                });
                                isPass = false;
                            }
                        });
                        if(this.orderInfoForm.products.length > 0) {
                            if(isPass){
                                if(this.orderType === 'insert') {
                                this.$store.commit('insertOrder', {
                                    data: {
                                        ordertype: _self.orderInfoForm.ordertype,
                                        sourceid: _self.orderInfoForm.sourceid,
                                        products: _self.orderInfoForm.products,
                                        remark: _self.orderInfoForm.remark
                                    },
                                    successCb(res) {
                                        _self.$Notice.success({
                                            title: res.message,
                                            duration: 2,
                                            onClose() {
                                                _self.closePage()
                                            }
                                        })
                                    }
                                })
                            } else {
                                this.$store.commit('editOrderInfo', {
                                    data: _self.orderInfoForm,
                                    successCb(res) {
                                        _self.$Notice.success({
                                            title: res.message,
                                            duration: 2,
                                            onClose() {
                                                _self.closePage()
                                            }
                                        })
                                    }
                                })
                            }
                            }
                        } else {
                            this.$Notice.error({
                                title: '请选择商品'
                            });
                        }
                    }

                })
            },
            changeType(value) {
                this.orderInfoForm.sourceid = '';
                if(value === '1') {
                    this.orderTitle = '订单客户';
                } else {
                    this.orderTitle = '订单厂商';
                }
            },
            getSelectList() {
                const _self = this;
                this.$store.commit('getSelectList', {
                    successCb(res) {
                        _self.customerList = res.data.customers;
                        _self.factoryList = res.data.factorys;
                    }
                });
            },
            getSelectListByProduct() {
                const _self = this;
                this.$store.commit('getSelectListByProduct', {
                    successCb(res) {
                        _self.goodsList = res.data;
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
            delGoodsListData(idx) {
                this.orderInfoForm.products.splice(idx, 1);
            }
        },

        created() {
            this.getSelectList();
            this.getSelectListByProduct();
            const _self = this;
            if(this.$route.params.hasOwnProperty("id")) {
                this.$store.commit('getOrderInfoById', {
                    data: {
                        id: this.$route.params.id
                    },
                    successCb(res) {
                        _self.orderInfoForm = res.data.data;
                    }
                })
                this.orderType = 'edit';
            } else {
                this.orderType = 'insert';
            }
        }

    }

</script>

<style>
    .Filter-Wrap{
        margin-bottom: 10px;
    }
    .Filter-Wrap > button{
        margin-left: 10px;
    }
</style>
