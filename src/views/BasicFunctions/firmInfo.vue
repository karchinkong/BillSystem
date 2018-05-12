<template>
    <div>
        <data-tables
            :title="title"
            :currentPage="currentPage"
            :totalCount="totalCount"
            :tableLoading="tableLoading"
            :tableCol="tableCol"
            :tableData="factoryList"
            :addFunction="addFactoryInfo"
            :getInfo="getFactoryInfo"
            :deleteInfo="deleteFactoryInfo"
            :recoveryInfo="recoveryFactoryInfo"
            :changePage="changePage">
            <div slot="Content">
                <Modal v-model="modalShow" :closable="true" :mask-closable="true" :width="600" @on-cancel="ModalCancelBtnClick" transfer>
                    <h3 slot="header" style="color:#2D8CF0">{{modalTitle}}</h3>
                    <Form ref="ModalInfoForm" :model="factoryInfo" :label-width="120" label-position="right" :rules="ModalValidate">
                        <FormItem label="厂商名称" prop="name">
                            <Input v-model="factoryInfo.name" placeholder="请输入厂商名称"></Input>
                        </FormItem>
                        <FormItem label="联系人名称" prop="contacts">
                            <Input v-model="factoryInfo.contacts" placeholder="请输入联系人名称"></Input>
                        </FormItem>
                        <FormItem label="联系人手机号码" prop="mobile">
                            <Input v-model="factoryInfo.mobile" placeholder="请输入手机号码" :maxlength="11"></Input>
                        </FormItem>
                        <FormItem label="联系人座机电话">
                            <Input v-model="factoryInfo.telephone" placeholder="请输入联系号码" :maxlength="11"></Input>
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

    export default {

        data() {

            const validePhone = (rule, value, callback) => {
                var re = /^1[0-9]{10}$/;
                if (!re.test(value)) {
                    callback(new Error('请输入正确格式的手机号'));
                } else {
                    callback();
                }
            };

            return {
                title: '厂商信息',
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                tableLoading: true,
                modalShow: false,
                modalTitle: '',
                modalType: '',
                factoryInfo: {},
                tableCol: tableCol.factoryColumns,
                factoryList: [],
                ModalValidate: {
                    name: [
                        { required: true, message: '请输入厂商名称', trigger: 'blur' }
                    ],
                    contacts: [
                        { required: true, message: '请输入联系人名称', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号码' },
                        { validator: validePhone }
                    ]
                }
            }
        },

        methods: {
            getFactoryList() {
                const _self = this;
                this.$store.commit('getFactoryList', {
                    data: {
                        strQuery: { name: "", phone: "", contact: "" },
                        orderBy: "",
                        pageIndex: this.currentPage,
                        pagePage: this.pageSize
                    },
                    successCb(res) {
                        if(res.data) {
                            _self.factoryList = res.data.list;
                            _self.totalCount = res.data.total;
                        } else {
                            _self.$Notice.error({
                                title: res.message,
                                onClose() {
                                    _self.factoryList = [];
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
                this.getFactoryList();
            },
            addFactoryInfo() {
                this.factoryInfo = {
                    name: '',
                    telephone: '',
                    mobile: '',
                    state: 1
                }
                this.modalShow = true;
                this.modalTitle = '新增角色信息';
                this.modalType = 'add';
            },
            getFactoryInfo(idx) {
                this.tableLoading = true;
                const _self = this;
                this.$store.commit('getFactoryInfoById', {
                    data: {
                        id: this.factoryList[idx].id
                    },
                    successCb(res) {
                        _self.factoryInfo = res.data;
                        _self.modalShow = true;
                        _self.modalTitle = '编辑客户信息';
                        _self.tableLoading = false;
                        _self.modalType = 'edit';
                    }
                })
            },
            deleteFactoryInfo(idx) {
                const _self = this;
                this.$store.commit('deleteFactoryById', {
                    data: {
                        id: this.factoryList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getFactoryList();
                            }
                        })
                    }
                })
            },
            addConfirm() {
                const _self = this;
                this.$store.commit('addFactory', {
                    data: this.factoryInfo,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getFactoryList();
                                _self.modalShow = false;
                            }
                        })
                    }
                })
            },
            editConfirm() {
                const _self = this;
                this.$store.commit('reviseFactoryInfoById', {
                    data: this.factoryInfo,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getFactoryList();
                                _self.modalShow = false;
                            }
                        })
                    }
                })
            },
            recoveryFactoryInfo(idx) {
                const _self = this;
                this.$store.commit('recoveryFactoryInfoById', {
                    data: {
                        id: this.factoryList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getFactoryList();
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
            this.getFactoryList();
        },

        components: {
            dataTables
        }
    }
</script>
