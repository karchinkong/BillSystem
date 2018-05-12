<template>
    <div class="login">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title"><Icon type="log-in"></Icon>欢迎登录</p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend"><Icon :size="16" type="person"></Icon></span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input v-model="form.password" type="password" placeholder="请输入密码">
                                <span slot="prepend"><Icon :size="14" type="locked"></Icon></span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        data() {
            return {
                form: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                        { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                    ]
                },
                spinShow: false
            }
        },
        methods: {
            handleSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        const _self = this;
                        this.spinShow = true;
                        this.$store.commit('login', {
                            data: {
                                jobnumber: this.form.userName,
                                password: this.form.password,
                            },
                            successCb(data) {
                                _self.spinShow = false;
                                _self.$Notice.open({
                                    title: "登录成功",
                                    duration: 1,
                                    onClose() {
                                        _self.$router.push({
                                            name: "otherRouter"
                                        })
                                    }
                                });
                            },
                            failCb(err) {
                                _self.spinShow = false;
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped rel="stylesheet/less">
    @import '../resource/less/login.less';
</style>
