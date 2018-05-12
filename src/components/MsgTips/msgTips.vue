<template>
    <div class="message-con">
        <Tooltip :content="toolTips">
            <Badge dot>
                <Icon type="ios-bell" :size="22"></Icon>
            </Badge>
        </Tooltip>
    </div>
</template>


<script>
    export default {
        props: {
            toolTips: {
                type: String,
                default: "暂无信息"
            }
        }
    }
</script>
