<template>
    <div>
      <Card>
          <p slot="title">
              <Icon type="toggle-filled"></Icon>
              {{title}}
          </p>
          <div class="roleTable-Icon" v-if="userAccess.add && showAddBtn">
              <Button type="success" icon="plus" @click="addFunction">新增</Button>
          </div>
          <div>
              <Table border :loading="tableLoading" :columns="tableCol" :data="tableData"></Table>
              <page-nation :curPage="currentPage" :totalPage="totalCount" @on-change="changePage"></page-nation>
          </div>
      </Card>
      <slot name="Content"></slot>
    </div>
</template>


<script>

    import CommonUtils from '@/libs/utils/CommonUtils'

    import pageNation from '@/components/Pagination/Pagination'

    export default {
        data() {
            return {
                userAccess: [],
                ModalType: ''
            }
        },
        props: {
            title: {
                type: String
            },
            addFunction: {
                type: Function
            },
            currentPage: {
                type: Number
            },
            totalCount: {
                type: Number
            },
            tableLoading: {
                type: Boolean
            },
            tableCol: {
                type: Array
            },
            tableData: {
                type: Array
            },
            changePage: {
                type: Function
            },
            getInfo: {
                type: Function
            },
            deleteInfo: {
                type: Function
            },
            recoveryInfo: {
                type: Function
            },
            resetPassword: {
                type: Function
            },
            lockFunc: {
                type: Function
            },
            relationFunc: {
                type: Function
            },
            showAddBtn: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            handleRender() {
                if(this.userAccess.del || this.userAccess.edit || this.userAccess.export || this.userAccess.lock || this.userAccess.print || this.userAccess.recovery || this.userAccess.resetPwd) {
                    this.tableCol.forEach(tableColItem => {
                        if(tableColItem.hasOwnProperty('handle')) {
                            tableColItem.render = (h, param) => {
                                if(param.row.state === 1) {
                                    return h('div', [
                                        this.userAccess.edit ? CommonUtils.editButton(this, h, tableColItem, param.index, this.getInfo) : '',
                                        this.userAccess.del ? CommonUtils.deleteButton(this, h, tableColItem, param.index, this.deleteInfo) : '',
                                        this.userAccess.lock ? CommonUtils.lockButton(this, h, tableColItem, param.index, 'lock', this.lockFunc) : '',
                                        this.userAccess.resetPwd ? CommonUtils.resetPwdButton(this, h, tableColItem, param.index, this.resetPassword) : '',
                                        this.title === '角色信息' ? CommonUtils.relatOperationsButton(this, h, tableColItem, param.index, this.relationFunc) : ''
                                    ]);
                                } else if(param.row.state === 0) {
                                    return h('div', [
                                        this.userAccess.recovery ? CommonUtils.recoveryButton(this, h, tableColItem, param.index, this.recoveryInfo) : '',
                                    ]);
                                } else if(param.row.state === -1) {
                                    return h('div', [
                                        this.userAccess.lock ? CommonUtils.lockButton(this, h, tableColItem, param.index, 'unlock', this.lockFunc) : ''
                                    ]);
                                }
                            }
                        }
                    });
                } else {
                    if(this.tableCol[this.tableCol.length-1].key === 'action') {
                        this.tableCol.pop();
                    }
                }
            }
        },
        created() {
            this.userAccess = CommonUtils.judgeAccess(this.$route.meta.id);
            this.handleRender();
        },
        components:{
            pageNation
        }
    }
</script>


<style lang="less">
    .roleTable-Icon{
        margin-bottom: 20px;
    }
</style>

