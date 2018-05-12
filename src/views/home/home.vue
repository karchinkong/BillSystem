<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :lg="8" :md="24">
                <Row class="home-page-row1">
                    <Col :lg="24" :md="12" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" :src="userInfo.avater" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">{{userInfo.name}}</b>
                                            <p>{{userInfo.role_name}}</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                            </Row>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">北京</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col :lg="24" :md="12">
                        <Card>
                            <Progress :percent="25"></Progress>
                            <Progress :percent="45" status="active"></Progress>
                            <Progress :percent="65" status="wrong"></Progress>
                            <Progress :percent="100"></Progress>
                            <Progress :percent="25" hide-info></Progress>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :lg="16" :md="24">
                <Row>
                    <Col :lg="24">
                        <Card>
                            <p slot="title">
                                <Icon type="calendar"></Icon>
                                发展历程
                            </p>
                            <Timeline>
                                <TimelineItem color="green">发布1.0版本</TimelineItem>
                                <TimelineItem color="green">发布2.0版本</TimelineItem>
                                <TimelineItem color="red">严重故障</TimelineItem>
                                <TimelineItem color="blue">发布3.0版本</TimelineItem>
                                <TimelineItem color="red">严重故障</TimelineItem>
                                <TimelineItem color="blue">发布3.0版本</TimelineItem>
                                <TimelineItem color="red">严重故障</TimelineItem>
                            </Timeline>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col :lg="24" :md="24">
                <Card>
                    <p slot="title" class="Card-title">
                        <Icon type="IOS-pulse-strong"></Icon>
                        收入来源统计
                    </p>
                    <div class="data-source-row">
                        <data-source-pie></data-source-pie>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>

    import dataSourcePie from './dataSourcePie'

    export default {

        computed: {

            userInfo() {

                return this.$store.state.user.userInfo

            }

        },
        components: {

            dataSourcePie

        }

    }

</script>


<style lang="less">
    @import '../../resource/less/Home/home';
    @import '../../resource/less/common';
</style>
