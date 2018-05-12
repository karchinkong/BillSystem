<template>
    <div>
        <data-tables
            :title="title"
            :currentPage="currentPage"
            :totalCount="totalCount"
            :tableLoading="tableLoading"
            :tableCol="operateCol"
            :tableData="operateList"
            :changePage="changePage"
            :getInfo="getOperateInfo"
            :addFunction="addOperateInfo"
            :deleteInfo="deleteOperateInfo"
            :recoveryInfo="recoveryOperateInfo">
            <div slot="Content">
                <Modal v-model="modalShow" :closable="true" :mask-closable="true" :width="600" @on-cancel="ModalCancelBtnClick" transfer>
                    <h3 slot="header" style="color:#2D8CF0">{{modalTitle}}</h3>
                    <Form ref="ModalInfoForm" :model="operateInfo" :label-width="100" label-position="right" :rules="ModalValidate">
                        <FormItem label="操作名称" prop="name">
                            <Input v-model="operateInfo.name" placeholder="请输入操作名称"></Input>
                        </FormItem>
                        <FormItem label="Url地址" prop="path">
                            <Input v-model="operateInfo.path" placeholder="请输入Url地址"></Input>
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
            return {
                userAccess: [],
                title: '操作信息',
                currentPage: 1,
                totalCount: 0,
                pageSize: 10,
                tableLoading: true,
                modalShow: false,
                modalTitle: '',
                modalType: '',
                operateCol: tableCol.operateColumns,
                operateList: [],
                operateInfo: {},
                ModalValidate: {
                    name: [
                        { required: true, message: '请输入操作名称', trigger: 'blur' }
                    ],
                    path: [
                        { required: true, message: '请输入url地址', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.getOperateList();
        },
        methods: {
            addOperateInfo() {
                this.modalShow = true;
                this.modalTitle = '新增操作信息';
                this.modalType = 'add';
            },
            changePage(page) {
                this.currentPage = page;
                this.getOperateList();
            },
            getOperateList() {
                const _self = this;
                this.$store.commit('getOperateList', {
                  data: {
                      strQuery: { name: "" },
                      orderBy: "",
                      pageIndex: this.currentPage,
                      pagePage: this.pageSize
                  },
                  successCb(res) {
                      if(res.data) {
                          _self.operateList = res.data.list;
                          _self.totalCount = res.data.total;
                      } else {
                          _self.$Notice.error({
                              title: res.message,
                              onClose() {
                                  _self.operateList = [];
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
            getOperateInfo(idx) {
                this.tableLoading = true;
                const _self = this;
                this.$store.commit('getOperateInfoById', {
                    data: {
                        id: this.operateList[idx].id
                    },
                    successCb(res) {
                        _self.operateInfo = res.data;
                        _self.modalShow = true;
                        _self.modalTitle = '编辑角色信息';
                        _self.tableLoading = false;
                        _self.modalType = 'edit';
                    }
                })
            },
            deleteOperateInfo(idx) {
                const _self = this;
                this.$store.commit('deleteOperateById', {
                    data: {
                        id: this.operateList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.$store.commit('logout');
                                _self.getOperateList();
                            }
                        })
                    }
                })
            },
            recoveryOperateInfo(idx) {
                const _self = this;
                this.$store.commit('recoveryOperateInfoById', {
                    data: {
                        id: this.operateList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getOperateList();
                            }
                        })
                    }
                })
            },
            addConfirm() {
                const _self = this;
                this.$store.commit('addOperate', {
                    data: this.operateInfo,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.modalShow = false;
                                _self.getOperateList();
                            }
                        })
                    }
                })
            },
            editConfirm() {
                const _self = this;
                this.$store.commit('reviseOperateInfoById', {
                    data: this.operateInfo,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.modalShow = false;
                                _self.getOperateList();
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
                if(this.modalType === 'add') {
                    this.addConfirm();
                } else {
                    this.editConfirm();
                }
            }
        },
        components: {
            dataTables
        }
    }

</script>
