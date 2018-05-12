<template>
    <div>
        <data-tables
            :title="title"
            :currentPage="currentPage"
            :totalCount="totalCount"
            :tableLoading="tableLoading"
            :tableCol="roleInfoCol"
            :tableData="roleInfoList"
            :changePage="changePage"
            :addFunction="addRoleInfo"
            :getInfo="getRoleInfo"
            :recoveryInfo="recoveryRoleInfo"
            :relationFunc="relationRole"
            :deleteInfo="deleteRoleInfo">
            <div slot="Content">
                <Modal v-model="modalShow" :closable="true" :mask-closable="true" :width="600" @on-cancel="ModalCancelBtnClick" transfer>
                    <h3 slot="header" style="color:#2D8CF0">{{roleInfoModalTitle}}</h3>
                    <Form ref="ModalInfoForm" :model="editRoleInfo" :label-width="100" label-position="right" :rules="roleInfoValidate">
                        <FormItem label="角色名称" prop="name">
                            <Input v-model="editRoleInfo.name" placeholder="请输入角色名称"></Input>
                        </FormItem>
                        <FormItem label="备注信息">
                            <Input v-model="editRoleInfo.remark" placeholder="请输入备注信息"></Input>
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

    import tableCol from '@/resource/dataJson/tableColumns'

    import dataTables from '@/components/Tables/SystemSetUpTables'

    export default {
        name: 'roleInfo',
        data() {
            return {
                title: '角色信息',
                tableLoading: true,
                currentPage: 1,
                totalCount: 0,
                pageSize: 10,
                editRoleInfo: {},
                roleInfoCol: tableCol.roleInfoColumns,
                modalShow: false,
                roleInfoModalTitle: '',
                roleInfoModalType: '',
                roleInfoList: [],
                roleInfoValidate: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            changePage(page) {
                this.currentPage = page;
                this.getRoleList();
            },
            getRoleList() {
                const _self = this;
                this.$store.commit('getRoleList', {
                    data: {
                        strQuery: { name: "" },
                        orderBy: "",
                        pageIndex: this.currentPage,
                        pagePage: this.pageSize
                    },
                    successCb(res) {
                        _self.roleInfoList = res.data.list;
                        _self.totalCount = res.data.total;
                        _self.tableLoading = false;
                    },
                    failCb(err) {
                        _self.tableLoading = false;
                    }
                })
            },
            deleteRoleInfo(idx) {
                const _self = this;
                this.$store.commit('deleteRoleById', {
                    data: {
                        id: this.roleInfoList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getRoleList();
                            }
                        })
                    }
                })
            },
            getRoleInfo(idx) {
                const _self = this;
                this.tableLoading = true;
                this.$store.commit('getRoleInfoById', {
                    data: {
                        id: this.roleInfoList[idx].id
                    },
                    successCb(res) {
                        _self.editRoleInfo = res.data;
                        _self.roleInfoModalTitle = '编辑角色信息';
                        _self.modalShow = true;
                        _self.tableLoading = false;
                        _self.roleInfoModalType = 'edit';
                    }
                })
            },
            recoveryRoleInfo(idx) {
                const _self = this;
                this.$store.commit('recoveryRoleInfoById', {
                    data: {
                        id: this.roleInfoList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.getRoleList();
                            }
                        })
                    }
                })
            },
            addRoleInfo() {
                this.editRoleInfo = {
                    name: '',
                    remark: '',
                    state: 1
                }
                this.modalShow = true;
                this.roleInfoModalTitle = '新增角色信息';
                this.roleInfoModalType = 'add';
            },
            editConfirm() {
                const _self = this;
                this.$store.commit('reviseRoleInfoById', {
                    data: this.editRoleInfo,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.modalShow = false;
                                _self.getRoleList();
                            }
                        })
                    }
                })
            },
            addConfirm() {
                const _self = this;
                this.$store.commit('addRole', {
                    data: this.editRoleInfo,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                _self.modalShow = false;
                                _self.getRoleList();
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
                        if(this.roleInfoModalType === 'add') {
                            this.addConfirm();
                        } else {
                            this.editConfirm();
                        }
                    }
                })
            },
            relationRole(idx) {
                this.$router.push(({path: '/system/roleInfo/' + this.roleInfoList[idx].id}))
            }
        },
        created() {
            this.getRoleList();
        },
        components: {
            dataTables
        }
    }
</script>
