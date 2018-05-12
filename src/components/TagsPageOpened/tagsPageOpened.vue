<template>
    <div ref="scrollCon" class="tags-outer-scroll-con" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
        <div class="close-all-tag-con">
            <Dropdown transfer @on-click="clearTags">
                <Button size="small" type="primary">
                    标签选项
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearAll">关闭所有</DropdownItem>
                    <DropdownItem name="clearOthers">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <Tag
              type="dot"
              v-for="(item) in pageTagsList"
              ref="tagsPageOpened"
              :key="item.name"
              :name="item.name"
              :color="item.children?(item.children[0].name===currentPageName?'blue':'default'):(item.name===currentPageName?'blue':'default')"
              :closable="item.name === 'home_index' ? false : true"
              @on-close="closePage"
              @click.native="RoutePush(item)"
            >{{item.title}}</Tag>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                tagBodyLeft: 0,
                currentPageName: this.$route.name,
                refsTag: []
            }
        },
        props: {
            pageTagsList: Array
        },
        mounted() {
            this.refsTag = this.$refs.tagsPageOpened;
            setTimeout(() => {
                this.refsTag.forEach((item, index) => {
                    if (this.$route.name === item.name) {
                        let tag = this.refsTag[index].$el;
                        this.moveToView(tag);
                    }
                });
            }, 1); // 这里不设定时器就会有偏移bug
        },
        methods: {
            moveToView (tag) {
                if (tag.offsetLeft < -this.tagBodyLeft) {
                    // 标签在可视区域左侧
                    this.tagBodyLeft = -tag.offsetLeft + 10;
                } else if (tag.offsetLeft + 10 > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100) {
                    // 标签在可视区域
                } else {
                    // 标签在可视区域右侧
                    this.tagBodyLeft = -(tag.offsetLeft - (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) + 20);
                }
            },
            RoutePush(PageObj) {  // 关闭页面后页面跳转到最近打开的页面
                let routerObj = new Object();
                routerObj.name = PageObj.name;
                routerObj.params = PageObj.argu;
                routerObj.query = routerObj.query;
                this.$router.push(routerObj);
            },
            closePage(event, name) {  // 关闭页面操作
                let pageOpenedList = this.$store.state.app.pageOpenedList;
                let lastPageObj = pageOpenedList[0];
                if(this.currentPageName === name) {
                    let PageLength = pageOpenedList.length;
                    for(let i=1; i<PageLength; i++) {
                        if(name === pageOpenedList[i].name) {
                            if(i < (PageLength-1)) {  //  当前关闭的Tag标签非最后一个标签的情况
                                lastPageObj = pageOpenedList[i+1];
                            } else {  // 当前关闭的Tag标签是最后一个标签的情况
                                lastPageObj = pageOpenedList[i-1];
                            }
                            break;
                        }
                    }
                }
                this.$store.commit('removeTag', name);
                pageOpenedList = this.$store.state.app.pageOpenedList;
                localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
                if(this.currentPageName === name) {
                    this.RoutePush(lastPageObj);
                }
            },
            clearTags(name) {
                if(name === 'clearAll') {   // 关闭所有标签
                    this.$store.commit('clearAllTags');
                    this.$router.push({
                        name: 'home_index'
                    });
                } else if(name === 'clearOthers') {   // 关闭除当前打开中的其他标签
                    this.$store.commit('clearOtherTags', this);
                }
                this.tagBodyLeft = 0;
            },
            handlescroll(event) {
                var type = event.type;
                let delta = 0;
                if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                    delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0) * 40;
                }
                let left = 0;
                if (delta > 0) {
                    left = Math.min(0, this.tagBodyLeft + delta);
                } else {
                    if (this.$refs.scrollCon.offsetWidth - 100 < this.$refs.scrollBody.offsetWidth) {
                        if (this.tagBodyLeft < -(this.$refs.scrollBody.offsetWidth - this.$refs.scrollCon.offsetWidth + 100)) {
                            left = this.tagBodyLeft;
                        } else {
                            left = Math.max(this.tagBodyLeft + delta, this.$refs.scrollCon.offsetWidth - this.$refs.scrollBody.offsetWidth - 100);
                        }
                    } else {
                        this.tagBodyLeft = 0;
                    }
                }
                this.tagBodyLeft = left;
            }
        },
        watch: {
            '$route' (to) {
                this.currentPageName = to.name;
                this.$nextTick(() => {
                    this.refsTag.forEach((item, index) => {
                        if (to.name === item.name) {
                            let tag = this.refsTag[index].$el;
                            this.moveToView(tag);
                        }
                    });
                });
            }
        }
    }
</script>


<style lang="less">
    @import '../../views/Main.less';
</style>
