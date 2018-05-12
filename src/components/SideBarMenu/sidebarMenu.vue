<template>
    <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="(item) in menuList">
            <MenuItem v-if="item.children.length===1" :name="item.children[0].name" :key="'menuitem' + item.children[0].name">
                <Icon :type="item.children[0].icon" :size="iconSize" :key="'menuicon' + item.children[0].name"></Icon>
                <span class="layout-text" :key="'title' + item.children[0].name">{{ item.children[0].title }}</span>
            </MenuItem>
            <Submenu v-else-if="item.children.length > 1" :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ item.title }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ child.title }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>


<script>
    export default {
        name: 'sidebarMenu',
        props: {
            menuList: Array,
            iconSize: Number,
            menuTheme: {
                type: String,
                default: 'dark'
            },
            openNames: {
                type: Array
            }
        },
        methods: {
            changeMenu(name) {
                this.$emit("on-change", name);
            }
        },
        updated () {
            this.$nextTick(() => {
                if (this.$refs.sideMenu) {
                    this.$refs.sideMenu.updateOpened();     // 手动更新展开的子目录，注意要在 $nextTick 里调用 （iView API）
                    this.$refs.sideMenu.updateActiveName(); // 手动更新当前选择项，注意要在 $nextTick 里调用（iView API）
                }
            });
        }
    }
</script>


<style lang="less">
    @import '../../resource/less/SideBarMenu/menu.less';
</style>
