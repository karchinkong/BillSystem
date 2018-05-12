<template>
    <div class="ivu-shrinkable-menu" :style="{background: bgColor}">
        <slot name="Logo"></slot>
        <sidebar-menu
            v-show="!shrink"
            :menu-theme="theme"
            :menu-list="menuList"
            :open-names="openNames"
            @on-change="handleChange"
        ></sidebar-menu>
        <sidebar-menu-shrink
            v-show="shrink"
            :menu-theme="theme"
            :menu-list="menuList"
            :icon-color="shrinkIconColor"
            @on-change="handleChange"
        ></sidebar-menu-shrink>
    </div>
</template>

<script>
    import sidebarMenu from '@/components/SideBarMenu/sidebarMenu'
    import sidebarMenuShrink from '@/components/SideBarMenu/sidebarMenu-shrink'

    export default {

        props: {
            theme: {
                type: String,
                default: 'dark'
            },
            shrink: {
                type: Boolean,
                default: false
            },
            menuList: {
                type: Array
            },
            openNames: {
                type: Array
            }
        },

        computed: {
            bgColor() {
                return this.theme === "dark" ? "#495060" : "#fff";
            },
            shrinkIconColor () {
                return this.theme === 'dark' ? '#fff' : '#495060';
            }
        },

        components: {
            sidebarMenu,
            sidebarMenuShrink
        },

        methods: {
            handleChange(name) {
                this.$router.push({
                    name: name
                });
            }
        }

    }
</script>

<style lang="less">
    @import '../../resource/less/SideBarMenu/menu.less';
</style>
