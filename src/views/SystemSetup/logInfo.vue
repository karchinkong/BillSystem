<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="ios-paper"></Icon>
                日志信息
            </p>
            <a href="javascript:void(0);" slot="extra" >
                <DatePicker type="date" :options="dateOpts" placeholder="选择需要查询的日期" element-id="queryDate" :clearable="false" @on-change="queryDataByDate"></DatePicker>
            </a>
            <Timeline id="logListWrap" v-if="logList.length > 0">
                <template v-for="(item) in logList">
                    <TimelineItem>
                        <p class="time">{{item.datetime}}</p>
                        <p class="content" v-for="(contItem) in item.content">{{contItem}}</p>
                    </TimelineItem>
                </template>
            </Timeline>
            <div v-else style="text-align: center;">暂无数据</div>
            <Spin size="large" fix v-if="loading"></Spin>
        </Card>
    </div>
</template>


<script>

    export default {
        name: 'logInfo',
        data() {
            return {
                dateOpts: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                logList: [],
                loading: false
            }
        },
        methods: {
            queryDataByDate(date) {
                this.getLogList(date)
            },
            getLogList(datetime) {
                const _self = this;
                this.loading = true;
                datetime = datetime || '';
                this.$store.commit('getLogListByDate', {
                    data: {
                        datetime: datetime
                    },
                    successCb(res) {
                        if(res.data) _self.logList = res.data;
                        _self.loading = false;
                    },
                    failCb(err) {
                        _self.loading = false;
                    }
                })
            }
        },
        created() {
            this.getLogList()
        }
    }

</script>


<style>
    #queryDate{
        top: -4px;
    }
    .ivu-input-icon{
        line-height: 24px;
    }
    #logListWrap{
        max-height: 550px;
        overflow-y: scroll;
    }
    .time{
        font-size: 16px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
        font-size: 14px;
    }
</style>
