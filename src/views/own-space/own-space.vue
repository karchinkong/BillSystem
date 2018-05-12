<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Alert type="error" show-icon closable>若想修改个人信息(手机号码、姓名)请联系管理员修改</Alert>
                <Form
                    ref="userInfoForm"
                    :model="userInfo"
                    :label-width="100"
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="旧密码：" prop="oldPwd">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userInfo.oldPwd" placeholder="请输入旧密码" :type="oldPassType ? 'password' : 'text'" :icon="oldPassType? 'eye' : 'eye-disabled'" @on-click="showPassword('oldPassType')" />
                        </div>
                    </FormItem>
                    <FormItem label="新密码：" prop="newPwd">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userInfo.newPwd" placeholder="请输入新密码" :type="newPassType ? 'password' : 'text'" :icon="newPassType? 'eye' : 'eye-disabled'" @on-click="showPassword('newPassType')" />
                        </div>
                    </FormItem>
                    <FormItem label="确认新密码：" prop="newrepeatPwd">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userInfo.newrepeatPwd" placeholder="请再次输入新密码" :type="repeatNewPassType ? 'password' : 'text'" :icon="repeatNewPassType? 'eye' : 'eye-disabled'" @on-click="showPassword('repeatNewPassType')" />
                        </div>
                    </FormItem>
                    <div>
                        <Button type="text" style="width: 100px;" @click="resetForm">取消</Button>
                        <Button type="primary" style="width: 100px;" @click="reviseUserInfo">修改</Button>
                    </div>
                </Form>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </Card>
    </div>
</template>


<script>

    import Cookies from 'js-cookie'

    export default {

        data() {
            const validateRepeatPwd = (rule, value, callback) => {    // 验证两次输入的密码是否一致
                if(rule.field === 'newrepeatPwd') {
                    if (value !== this.userInfo.newPwd && this.userInfo.newPwd !== '') {
                        callback(new Error('两次输入密码不一致'));
                    }
                } else if(rule.field === 'newPwd') {
                    if (value !== this.userInfo.newrepeatPwd && this.userInfo.newrepeatPwd !== '') {
                        callback(new Error('两次输入密码不一致'));
                    }
                }
                if(this.userInfo.oldPwd === this.userInfo.newPwd) {
                    callback(new Error('新旧密码请不要相同'));
                } else {
                    callback();
                }
            };
            return {
                userInfo: {
                    oldPwd: '',           // 旧密码
                    newPwd: '',           // 新密码
                    newrepeatPwd: ''      // 确认新密码
                },
                oldPassType: true,        // 判断旧密码内容是否显示
                newPassType: true,        // 判断新密码内容是否显示
                repeatNewPassType: true,  // 判断确认新密码内容是否显示
                inforValidate: {          // 文本框验证规则
                    oldPwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validateRepeatPwd, trigger: 'blur' }
                    ],
                    newPwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                        { max: 32, message: '最多输入32个字符', trigger: 'blur' },
                        { validator: validateRepeatPwd, trigger: 'blur' }
                    ],
                    newrepeatPwd: [
                        { required: true, message: '请再次输入新密码', trigger: 'blur' },
                        { validator: validateRepeatPwd, trigger: 'blur' }
                    ]
                },
                spinShow: false
            }
        },

        mounted() {
            let CookieUserInfo = JSON.parse(Cookies.get("userInfo"));
            this.userInfo = Object.assign({}, this.userInfo, CookieUserInfo);
        },

        methods: {
            showPassword(target) {    // 显示或隐藏密码内容
                switch (target) {
                    case 'oldPassType':
                        this.oldPassType = !this.oldPassType;
                        break;
                    case 'newPassType':
                        this.newPassType = !this.newPassType;
                        break;
                    case 'repeatNewPassType':
                        this.repeatNewPassType = !this.repeatNewPassType;
                        break;
                }
            },
            resetForm() {   // 重置表单
                this.$refs.userInfoForm.resetFields();
            },
            reviseUserInfo() {
                this.$refs.userInfoForm.validate((valid) => {
                    if(valid) {
                        const JobNumber = JSON.parse(Cookies.get("userInfo")).jobnumber;
                        const _self = this;
                        this.spinShow = true;
                        this.$store.commit("reviseUserInfo", {
                            data: {
                                JobNumber: JobNumber,
                                PassWord: this.userInfo.oldPwd,
                                NewPassWord: this.userInfo.newPwd
                            },
                            successCb(data) {
                                _self.spinShow = false;
                                _self.$Notice.open({
                                    title: "修改成功",
                                    duration: 2,
                                    onClose() {
                                        _self.$router.push({
                                            name: "login"
                                        });
                                    }
                                })
                            }
                        });
                    }
                });
            }
        }

    }

</script>


<style lang="less">
    @import '../../resource/less/OwnSpace/own-space';
</style>
