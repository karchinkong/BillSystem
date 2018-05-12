<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{ width: shrink ? '60px': '200px', overflow: shrink ? 'visible' : 'auto' }">
            <shrinkable-menu
                :shrink="shrink"
                :theme="menuTheme"
                :menuList="menuList"
                :open-names="openedSubmenuArr">
                <div slot="Logo" class="logo-con">
                    <img v-show="!shrink"  src="@/resource/images/logo.jpg" key="max-logo" />
                    <img v-show="shrink" src="@/resource/images/logo-min.jpg" key="min-logo" />
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink ? '60px' : '200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-avator-con">
                    <lock-screen></lock-screen>
                    <message-tips></message-tips>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleDropdownItem">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userInfo.name }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="userInfo.avater" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>


<script>
    import shrinkableMenu from '@/components/SideBarMenu/shrinkable-menu'
    import lockScreen from '@/components/LockScreen/lockScreen'
    import messageTips from '@/components/MsgTips/msgTips'
    import tagsPageOpened from '@/components/TagsPageOpened/tagsPageOpened'
    import breadcrumbNav from '@/components/BreadcrumbNav/breadcrumbNav'
    import Cookies from 'js-cookie'
    import CommonUtils from '@/libs/utils/CommonUtils'
    export default {
        data() {
            return {
                shrink: false,
                userInfo: ''
            }
        },
        computed: {
            menuTheme() {   // 菜单主题
                return this.$store.state.app.menuTheme;
            },
            menuList() {    // 菜单列表
                return this.$store.state.app.menuList;
            },
            cachePage() {   // 缓存的页面
                return this.$store.state.app.cachePage;
            },
            pageTagsList() {  // 打开的页面的页面对象
                return this.$store.state.app.pageOpenedList;
            },
            currentPath() {
                return this.$store.state.app.currentPath;
            },
            openedSubmenuArr() {
                return this.$store.state.app.openedSubmenuArr
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let pathArr = CommonUtils.setCurrentPath(this, this.$route.name);
                if(pathArr.length >= 2) {
                    this.$store.commit('addSubMenu', pathArr[1].name);
                }
                this.$store.commit('updateMenulist');
                this.userInfo = JSON.parse(Cookies.get("userInfo"));
            },
            toggleClick() {
                this.shrink = !this.shrink;
            },
            handleDropdownItem(name) {
                if(name === 'loginout') { // 退出登录操作
                    this.$store.commit('logout');
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: "login"
                    });
                } else if(name === 'ownSpace') {  // 进入个人中心
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                }
            }
        },
        components: {
            shrinkableMenu,
            lockScreen,
            messageTips,
            tagsPageOpened,
            breadcrumbNav
        },
        watch: {
            '$route'(to) {
                if(to.hasOwnProperty("meta")) {
                    if(to.meta.hasOwnProperty("noAuth")) {
                        return false;
                    }
                }
                if(!to.meta.auth) {
                    this.$store.commit('setCurrentPageName', to.name);
                    let pathArr = CommonUtils.setCurrentPath(this, to.name);
                    if (pathArr.length > 2) {
                        this.$store.commit('addSubMenu', pathArr[1].name);
                    }
                }
            }
        }
    }
</script>


<style lang="less">
    @import './Main.less';
</style>

