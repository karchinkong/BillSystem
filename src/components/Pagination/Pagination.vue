<template>
    <div style="margin: 15px 0 0;overflow: hidden">
        <div style="float: right;">
            <Page :total="totalPage" :current="curPage" @on-change="changePage"></Page>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            curPage: Number,
            totalPage: Number
        },
        methods: {
            changePage(page) {
                this.$emit("on-change", page);
            }
        }
    }
</script>
