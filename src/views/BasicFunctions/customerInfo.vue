<template>
    <div>
        <data-tables
            :title="title"
            :currentPage="currentPage"
            :totalCount="totalCount"
            :tableLoading="tableLoading"
            :tableCol="tableCol"
            :tableData="customerList"
            :addFunction="addCustomerInfo"
            :getInfo="getCustomerInfo"
            :deleteInfo="deleteCustomerInfo"
            :recoveryInfo="recoveryCustomerInfo"
            :changePage="changePage">
            <div slot="Content">
                <Modal v-model="modalShow" :closable="true" :mask-closable="true" :width="600" @on-cancel="ModalCancelBtnClick" transfer>
                    <h3 slot="header" style="color:#2D8CF0">{{modalTitle}}</h3>
                    <Form ref="ModalInfoForm" :model="customerInfo" :label-width="100" label-position="right" :rules="ModalValidate">
                        <FormItem label="客户名称" prop="name">
                            <Input v-model="customerInfo.name" placeholder="请输入客户名称"></Input>
                        </FormItem>
                        <FormItem label="手机号码" prop="mobile">
                            <Input v-model="customerInfo.mobile" placeholder="请输入手机号码" :maxlength="11"></Input>
                        </FormItem>
                        <FormItem label="座机电话">
                            <Input v-model="customerInfo.telephone" placeholder="请输入联系号码" :maxlength="11"></Input>
                        </FormItem>
                    </Form>
                    <div slot="footer">
                        <Button type="text" size="large" @click="ModalCancelBtnClick">取消</Button>
                        <Button type="primary" size="large" @click="ModalOkBtnClick">保存</Button>
                    </div>
                </Modal>
            </div>
        </data-tables>
    </div>
</template>


<script>

    import dataTables from '@/components/Tables/SystemSetUpTables'

    import tableCol from '@/resource/dataJson/tableColumns'

    import validUtils from '@/libs/utils/validateUtils'

    export default {

        data() {

            return {
                title: '客户信息',
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                tableLoading: true,
                modalShow: false,
                modalTitle: '',
                modalType: '',
                customerInfo: {},
                tableCol: tableCol.customerColumns,
                customerList: [],
                ModalValidate: {
                    name: [
                        { required: true, message: '请输入客户名称', trigger: 'blur' }
                    ],
                    mobile: [
                      { required: true, message: '请输入手机号码' },
                      { validator: validUtils.validePhone }
                    ]
                }
            }
        },

        methods: {
            getCustomerList() {
                const _self = this;
                this.$store.commit('getCustomerList', {
                    data: {
                        strQuery: { name: "",phone: "" },
                        orderBy: "",
                        pageIndex: this.currentPage,
                        pagePage: this.pageSize
                    },
                    successCb(res) {
                        if(res.data) {
                            _self.customerList = res.data.list;
                            _self.totalCount = res.data.total;
                        } else {
                            _self.$Notice.error({
                                title: res.message,
                                onClose() {
                                    _self.customerList = [];
                                }
                            })
                        }
                        _self.tableLoading = false;
                    },
                    failCb(err) {
                        _self.tableLoading = false;
                    }
                })
            },
            changePage(Page) {
                this.currentPage = Page;
                this.getCustomerList();
            },
            addCustomerInfo() {
                this.customerInfo = {
                    name: '',
                    telephone: '',
                    mobile: '',
                    state: 1
                }
                this.modalShow = true;
                this.modalTitle = '新增角色信息';
                this.modalType = 'add';
            },
            getCustomerInfo(idx) {
                this.tableLoading = true;
                const _self = this;
                this.$store.commit('getCustomerInfoById', {
                    data: {
                        id: this.customerList[idx].id
                    },
                    successCb(res) {
                        _self.customerInfo = res.data;
                        _self.modalShow = true;
                        _self.modalTitle = '编辑客户信息';
                        _self.tableLoading = false;
                        _self.modalType = 'edit';
                    }
                })
            },
            deleteCustomerInfo(idx) {
                const _self = this;
                this.$store.commit('deleteCustomerById', {
                    data: {
                        id: this.customerList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getCustomerList();
                            }
                        })
                    }
                })
            },
            addConfirm() {
                const _self = this;
                this.$store.commit('addCustomer', {
                    data: this.customerInfo,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getCustomerList();
                                _self.modalShow = false;
                            }
                        })
                    }
                })
            },
            editConfirm() {
                const _self = this;
                this.$store.commit('reviseCustomerInfoById', {
                    data: this.customerInfo,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getCustomerList();
                                _self.modalShow = false;
                            }
                        })
                    }
                })
            },
            recoveryCustomerInfo(idx) {
                const _self = this;
                this.$store.commit('recoveryCustomerInfoById', {
                    data: {
                        id: this.customerList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getCustomerList();
                            }
                        })
                    }
                })
            },
            ModalCancelBtnClick() {
            this.modalShow = false;
            this.$refs.ModalInfoForm.resetFields();
          },
            ModalOkBtnClick() {
                this.$refs.ModalInfoForm.validate(valid => {
                    if(valid) {
                        if(this.modalType === 'add') {
                            this.addConfirm();
                        } else {
                            this.editConfirm();
                        }
                    }
                })
            }
        },

        created() {
            this.getCustomerList();
        },

        components: {
            dataTables
        }
    }
</script>
