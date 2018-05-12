<template>
    <div>
        <data-tables
            :title="title"
            :addFunction="addUserInfo"
            :currentPage="currentPage"
            :totalCount="totalCount"
            :tableLoading="tableLoading"
            :tableCol="userInfoCol"
            :tableData="userInfoList"
            :changePage="changePage"
            :getInfo="editUserInfo"
            :recoveryInfo="recoveryUserInfo"
            :deleteInfo="deleteUserInfo"
            :editConfirmFunc="editConfirm"
            :addConfirmFunc="addConfirm"
            :resetPassword="resetPassword"
            :lockFunc="LockOrUnlockUserInfo">
            <div slot="Content">
                <Modal v-model="modalShow" :closable="true" :mask-closable="true" :width="600" @on-cancel="ModalCancelBtnClick" transfer>
                    <h3 slot="header" style="color:#2D8CF0">{{modalTitle}}</h3>
                    <Form ref="ModalInfoForm" :model="editUserInfoForm" :label-width="100" label-position="right" :rules="userInfoValidate">
                        <FormItem label="账号" prop="jobnumber">
                            <Input v-model="editUserInfoForm.jobnumber" placeholder="请输入工号" :disabled="isEditUser"></Input>
                        </FormItem>
                        <FormItem label="用户名" prop="username">
                            <Input v-model="editUserInfoForm.username" placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem label="联系电话" prop="phone">
                            <Input v-model="editUserInfoForm.phone" placeholder="请输入联系电话"></Input>
                        </FormItem>
                        <FormItem label="用户组">
                            <Select v-model="editUserInfoForm.groupid" style="width:200px">
                                <Option v-for="item in groupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="角色">
                            <Select v-model="editUserInfoForm.roleid" style="width:200px">
                                <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
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

    import commonData from '@/resource/dataJson/commonData'

    import dataTables from '@/components/Tables/SystemSetUpTables'

    import validUtils from '@/libs/utils/validateUtils'

    export default{
        name: 'userInfo',
        data() {
            return {
                tableLoading: true,
                modalShow: false,
                currentPage: 1,
                totalCount: 0,
                userInfoModalType: 'add',
                userInfoCol: tableCol.userInfoColumns,
                userInfoList: [],
                userAccess: {
                    add: false,
                    edit: false,
                    del: false,
                    recovery: false,
                    lock: false,
                    resetPwd: false
                },
                editUserInfoForm: {},
                userInfoValidate: {
                    jobnumber: [
                        { required: true, message: '请输入工号', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator: validUtils.validePhone }
                    ]
                },
                groupList: commonData.groupList,
                modalTitle: '',
                isEditUser: true,
                title: '用户信息'
            }
        },
        components: {
            dataTables
        },
        methods: {
            changePage(page) {      //  改变页码执行函数
                this.tableLoading = true;
                this.currentPage = page;
                this.getUserInfoList();
            },
            getUserInfoList() {     // 获取用户列表数据
                this.tableLoading = true;
                const _self = this;
                this.$store.commit('getUserInfoList', {
                    data: {
                        strQuery: {
                            jobnumber: '',
                            name: '',
                            phone: ''
                        },
                        orderBy: '',
                        pageIndex: this.currentPage,
                        pageSize: this.pageSize
                    },
                    successCb(res) {
                        _self.tableLoading = false;
                        if(res.data) {
                            _self.userInfoList = res.data.list;
                            _self.totalCount = res.data.total;
                        }
                    },
                    failCb(err) {
                        _self.tableLoading = false;
                    }
                });
            },
            deleteUserInfo(idx) {
                const delId = this.userInfoList[idx].id;
                const _self = this;
                this.$store.commit('delUserInfoById', {
                    data: {
                        id: delId
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.data.message,
                            duration: 1,
                            onClose() {
                                _self.getUserInfoList();
                            }
                        });
                    }
                });
            },
            editUserInfo(idx) {
                const _self = this;
                this.tableLoading = true;
                this.isEditUser = true;
                this.$store.commit('getUserInfoById', {
                    data: {
                        id: this.userInfoList[idx].id
                    },
                    successCb(res) {
                        _self.editUserInfoForm = res.data.data;
                        _self.tableLoading = false;
                        _self.modalShow = true;
                        _self.modalTitle = '编辑用户信息';
                        _self.userInfoModalType = 'edit';
                    },
                    failCb(err) {
                        _self.tableLoading = false;
                    }
                });
            },
            addUserInfo() {         //  点击新增按钮操作
                this.editUserInfoForm = {
                    username: '',
                    phone: '',
                    jobnumber: '',
                    groupid: null,
                    roleid: null
                }
                this.isEditUser = false;
                this.modalShow = true;
                this.modalTitle = '新增用户信息';
                this.userInfoModalType = 'add';
            },
            LockOrUnlockUserInfo(idx, type) { // 锁定or解锁用户操作
                let data;
                const _self = this;
                (type === 'lock') ? data = { id: this.userInfoList[idx].id, state: -1 } : data = { id: this.userInfoList[idx].id, state: 1 };
                this.$store.commit('LockOrUnlockUserInfo', {
                    data: data,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.data.message,
                            onClose() {
                                _self.getUserInfoList();
                            }
                        })
                    }
                });
            },
            recoveryUserInfo(idx) {  // 恢复被删除的用户操作
                const _self = this;
                this.$store.commit('recoveryUserInfo', {
                    data: {
                        id: this.userInfoList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.data.message,
                            duration: 1,
                            onClose() {
                                _self.getUserInfoList();
                            }
                        })
                    }
                })
            },
            resetPassword(idx) {
                const _self = this;
                this.$store.commit('resetPasswordById', {
                    data: {
                        id: this.userInfoList[idx].id
                    },
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.data.message,
                            duration: 1
                        })
                    }
                })
            },
            getRoleList() {
                this.$store.commit('getRoleListForDropdownBox')
            },
            editConfirm() {
                const _self = this;
                this.$store.commit('editUserInfoByJobNumber', {
                    data: this.editUserInfoForm,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.data.message,
                            onClose() {
                                _self.modalShow = false;
                                _self.getUserInfoList();
                            }
                        });
                    }
                });
            },
            addConfirm() {
                const _self = this;
                this.$store.commit('addUserInfo', {
                    data: this.editUserInfoForm,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.data.message,
                            duration: 1,
                            onClose() {
                                _self.modalShow = false;
                                _self.getUserInfoList();
                            }
                        });
                    }
                })
            },
            ModalCancelBtnClick() {
                this.$refs.ModalInfoForm.resetFields();
                this.modalShow = false;
            },
            ModalOkBtnClick() {
                this.$refs.ModalInfoForm.validate(valid => {
                    if(valid) {
                        if(this.userInfoModalType === 'add') {
                            this.addConfirm();
                        } else {
                            this.editConfirm();
                        }
                    }
                })
            }
        },
        created() {
            this.getUserInfoList();
            this.getRoleList();
        },
        computed: {
            roleList() {
                return this.$store.state.role.RoleList;
            }
        }
    }
</script>

<style>
    .edittable-Icon{
        margin-bottom: 20px;
    }
</style>

