<template>
    <div>
        <data-tables
            :title="title"
            :currentPage="currentPage"
            :totalCount="totalCount"
            :tableLoading="tableLoading"
            :tableCol="tableCol"
            :tableData="menuList"
            :addFunction="addMenuInfo"
            :deleteInfo="deleteMenuInfo"
            :getInfo="getMenuInfo"
            :recoveryInfo="recoveryMenuInfo"
            :changePage="changePage">
            <div slot="Content">
                <Modal v-model="modalShow" :closable="true" :mask-closable="true" :width="600" @on-cancel="ModalCancelBtnClick" transfer>
                    <h3 slot="header" style="color:#2D8CF0">{{modalTitle}}</h3>
                    <Form ref="ModalInfoForm" :model="menuInfo" :label-width="100" label-position="right" :rules="ModalValidate">
                        <FormItem label="操作名称" prop="name">
                            <Input v-model="menuInfo.name" placeholder="请输入操作名称"></Input>
                        </FormItem>
                        <FormItem label="Url地址" prop="path">
                            <Input v-model="menuInfo.path" placeholder="请输入Url地址"></Input>
                        </FormItem>
                        <FormItem label="菜单层级">
                            <Cascader :data="CascaderList" v-model="menuInfo.parentid" change-on-select @on-change="SelectCascader" :render-format="formatCascader"></Cascader>
                        </FormItem>
                        <FormItem label="关联操作" v-if="(menuInfo.istreeleaf === 1)">
                            <CheckboxGroup v-model="menuInfo.relation_operations">
                                <Checkbox v-for="(item) in operationsList" :key="item.value" :label="item.value" :disabled="item.disabled"><span>{{item.label}}</span></Checkbox>
                            </CheckboxGroup>
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
                title: '菜单信息',
                currentPage: 1,
                totalCount: 0,
                tableLoading: true,
                modalShow: false,
                modalTitle: '',
                modalType: '',
                menuInfo: {},
                tableCol: tableCol.menuColumns,
                menuList: [],
                ModalValidate: {
                    name: [
                        { required: true, message: '请输入操作名称', trigger: 'blur' }
                    ],
                    path: [
                        { required: true, message: '请输入url地址', trigger: 'blur' }
                    ]
                },
                CascaderList: [],
                operationsList: []
            }
        },

        methods: {
            changePage(Page) {
                this.currentPage = Page;
                this.getMenuList();
            },
            getMenuList() {
                const _self = this;
                this.$store.commit('getMenuList', {
                    data: {
                        strQuery: { name: "" },
                        orderBy: "",
                        pageIndex: this.currentPage,
                        pagePage: this.pageSize
                    },
                    successCb(res) {
                        if(res.data) {
                            _self.menuList = res.data.list;
                            _self.totalCount = res.data.total;
                        } else {
                            _self.$Notice.error({
                                title: res.message,
                                onClose() {
                                    _self.menuList = [];
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
            getCascaderList() {
                const _self = this;
                this.$store.commit('getCascaderList', {
                    successCb(res) {
                        _self.CascaderList = res.data.cascader;
                        _self.operationsList = res.data.operations;
                    }
                });
            },
            addMenuInfo() {
                this.menuInfo = {
                    name: '',
                    path: ''
                }
                this.modalShow = true;
                this.modalTitle = '新增菜单信息';
                this.modalType = 'add';
            },
            deleteMenuInfo() {

            },
            getMenuInfo(idx) {
                this.tableLoading = true;
                const _self = this;
                this.$store.commit('getMenuInfoById', {
                    data: {
                        id: this.menuList[idx].id
                    },
                    successCb(res) {
                        _self.menuInfo = res.data;
                        _self.modalShow = true;
                        _self.modalTitle = '编辑角色信息';
                        _self.tableLoading = false;
                        _self.modalType = 'edit';
                    }
                })
            },
            recoveryMenuInfo() {

            },
            addConfirm() {

            },
            editConfirm() {
                const _self = this;
                this.$store.commit('reviseMenuInfoById', {
                    data: this.menuInfo,
                    successCb(res) {
                        _self.$Notice.success({
                            title: res.message,
                            onClose() {
                                location.reload()
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
            },
            SelectCascader(value, selectedData) {
                (value.length > 1) ? this.menuInfo.istreeleaf = 1 : this.menuInfo.istreeleaf = 0;
                this.menuInfo.treelevel = (value.length - 1);
                if(value.length === 1 && value[0] === 0) {
                    this.menuInfo.relation_operations = [];
                }
            },
            formatCascader(labels) {
                const index = labels.length - 1;
                return labels[index];
            }
        },

        created() {
            this.getMenuList();
            this.getCascaderList();
        },

        components: {
            dataTables
        }

    }

</script>


