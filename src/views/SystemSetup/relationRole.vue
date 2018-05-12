<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="toggle-filled"></Icon>
                关联操作
            </p>
            <Button slot="extra" size="small" type="primary" @click="saveRelationRole">确定关联</Button>
            <Form label-position="top">
                <template v-for="(item) in menuList" v-if="item.operations !== null">
                    <FormItem>
                        <div style="border-bottom: 1px solid #e9e9e9; padding-bottom: 0;">
                            <Checkbox :indeterminate="item.indeterminate" :value="item.checkAll" @click.prevent.native="handleCheckAll(item)">{{item.label}}</Checkbox>
                        </div>
                        <CheckboxGroup v-if="item.operations !== null" v-model="roleSelectedVal" @on-change="checkAllGroupChange(item)">
                            <Checkbox v-for="operaItem in item.operations" :key="operaItem" :label="operaItem.value"><span>{{operaItem.label}}</span></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                </template>
            </Form>
        </Card>
    </div>
</template>


<script>

    export default {
        data() {
            return {
                menuList: [],
                roleSelectedVal: []
            }
        },
        methods: {
            getRelationList(id) {
                const _self = this;
                this.$store.commit('getRoleMenu', {
                    data: {
                        id: id
                    },
                    successCb(res) {
                        _self.menuList = res.data.all;
                        _self.roleSelectedVal = res.data.selected;
                    }
                })
            },
            handleCheckAll(item) {
                const _self = this;
                (item.indeterminate) ? item.checkAll = false : item.checkAll = !item.checkAll;
                item.indeterminate = false;
                if(item.checkAll) {
                    item.operations.forEach(operationItem => {
                        let isExist = false;
                        _self.roleSelectedVal.forEach((selectedItem) => {
                            if(selectedItem === operationItem.value) {
                                isExist = true;
                            }
                        });
                        if(!isExist) {
                            _self.roleSelectedVal.push(operationItem.value);
                        }
                    });
                } else {
                    item.operations.forEach(operationItem => {
                        let isExist = false;
                        let ExistPosition;
                        _self.roleSelectedVal.forEach((selectedItem, selectedIndex) => {
                            if(selectedItem === operationItem.value) {
                                isExist = true;
                                ExistPosition = selectedIndex;
                            }
                        });
                        if(isExist) {
                            _self.roleSelectedVal.splice(ExistPosition, 1);
                        }
                    });
                }
            },
            checkAllGroupChange(item) {
                const _self = this;
                let selectedLength = 0;
                item.operations.forEach(operaItem => {
                    _self.roleSelectedVal.forEach(selectedItem => {
                        if(selectedItem === operaItem.value) {
                            selectedLength++;
                        }
                    })
                });
                if(selectedLength === item.operations.length) {
                    item.checkAll = true;
                    item.indeterminate = false;
                } else if(selectedLength > 0) {
                    item.checkAll = false;
                    item.indeterminate = true;
                } else if(selectedLength === 0) {
                    item.checkAll = false;
                    item.indeterminate = false;
                }
            },
            saveRelationRole() {
                const _self = this;
                this.$store.commit('updateRoleMenu', {
                    data: {
                        id: _self.$route.params.id,
                        value: JSON.stringify(_self.roleSelectedVal)
                    },
                    successCb(res) {
                        location.reload();
                    }
                })
            }
        },
        created() {
            this.getRelationList(this.$route.params.id);
        }

    }

</script>
