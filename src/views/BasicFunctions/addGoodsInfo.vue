<template>

    <Card>
        <p slot="title">
            <Icon type="toggle-filled"></Icon>
            新增商品信息
        </p>
        <Form ref="GoodsInfoForm" :model="GoodsInfoForm" :rules="GoodsInfoValidate" :label-width="100">
            <FormItem label="商品编号" prop="productno">
                <Input placeholder="请输入商品编号" v-model="GoodsInfoForm.productno"></Input>
            </FormItem>
            <FormItem label="商品名称" prop="goodsname">
                <Input placeholder="请输入商品名称" v-model="GoodsInfoForm.goodsname"></Input>
            </FormItem>
            <FormItem label="商品类型">
                <Select v-model="GoodsInfoForm.type" style="width:200px">
                    <Option v-for="item in GoodsTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="属性-颜色">
                <Input placeholder="请输入属性值(例:红色)" v-model="extendProperty.PropertyColor"></Input>
            </FormItem>
            <FormItem label="属性-尺寸">
                <Input placeholder="请输入属性值(例:XL,L)" v-model="extendProperty.PropertySize"></Input>
            </FormItem>
            <FormItem label="属性-其他">
                <Input placeholder="请输入属性值" v-model="extendProperty.PropertyExtend"></Input>
            </FormItem>
            <FormItem label="是否存在库存">
                <RadioGroup v-model="GoodsInfoForm.isstock" @on-change="changeStock">
                    <Radio label="1">是</Radio>
                    <Radio label="0">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="库存数量" prop="stock" v-if="GoodsInfoForm.stock !== '-100'">
                <Input placeholder="请输入库存数量" v-model="GoodsInfoForm.stock"></Input>
            </FormItem>
            <FormItem label="进货价" prop="costprice">
                <Input placeholder="请输入进货价" v-model="GoodsInfoForm.costprice"></Input>
            </FormItem>
            <FormItem label="销售价" prop="marketprice">
                <Input placeholder="请输入销售价" v-model="GoodsInfoForm.marketprice"></Input>
            </FormItem>
            <FormItem label="图片上传">
                <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload
                    ref="upload"
                    multiple
                    :headers="headersToken"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleSuccess"
                    type="drag"
                    action="/api/product/Upload"
                    style="display: inline-block;width: 58px;">
                    <div style="width: 54px;height: 58px;line-height: 64px;margin: 0 auto;">
                        <Icon type="camera" size="20"></Icon>
                    </div>
                </Upload>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit">新增</Button>
            </FormItem>
        </Form>

    </Card>

</template>


<script>

    import validateUtils from '@/libs/utils/validateUtils'

    import CommonUtils from '@/libs/utils/CommonUtils'

    import Cookies from 'js-cookie'

    export default {

        data() {

            return {
                uploadList: [],
                defaultList: [],
                currentPageName: this.$route.name,
                extendProperty: {
                  PropertyColor: null,
                  PropertySize: null,
                  PropertyExtend: null,
                },
                GoodsInfoForm: {
                    productno: '',
                    isstock: "1",
                    costprice: '',
                    marketprice: '',
                    goodsname: '',
                    stock: '',
                    type: 0
                },
                GoodsInfoValidate: {
                    productno: [
                        { required: true, message: '请输入商品编号', trigger: 'blur' }
                    ],
                    goodsname: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    stock: [
                        { required: true, message: '请输入库存数量', trigger: 'blur' },
                    ],
                    costprice: [
                        { required: true, message: '请输入进货价', trigger: 'blur' }
                    ],
                    marketprice: [
                        { required: true, message: '请输入销售价', trigger: 'blur' }
                    ]
                },
                handleSubmitType: '',
                headersToken: {
                    token: JSON.parse(Cookies.get("userInfo")).token
                },
                GoodsTypeList: []
            }
        },

        methods: {
            handleMaxSize(file, fileList) {
                this.$Notice.error({
                    title: '文件超出限制大小,最大为2MB'
                });
            },
            handleBeforeUpload() {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传五张图片'
                    });
                }
                return check;
            },
            handleSuccess (res, file) {
                if(res.code === 1011) {
                    this.$Notice.error({
                        title: res.message
                    });
                    this.handleRemove(file);
                } else if(res.code === 2001) {
                    this.$Notice.error({
                        title: 'Cookie失效',
                        desc: res.message,
                        onClose() {
                            Cookies.remove("userInfo");
                            location.reload();
                        }
                    });
                } else {
                    file.url = res.data;
                }
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSubmit() {
                const _self = this;
                const SubmitType = this.handleSubmitType === 'add' ? 'insertGoods' : 'editGoodsById';
                this.$refs.GoodsInfoForm.validate(valid => {
                    if(valid) {
                        this.GoodsInfoForm.name = this.GoodsInfoForm.goodsname;
                        for(var Key in this.extendProperty) {
                            if(this.extendProperty[Key] !== '' && this.extendProperty[Key] !== undefined && this.extendProperty[Key] !== null) {
                                this.GoodsInfoForm.name += '_' + this.extendProperty[Key];
                            }
                        }
                        this.GoodsInfoForm.images = [];
                        this.uploadList.forEach(imageItem => {
                            if(imageItem.url) {
                                this.GoodsInfoForm.images.push(imageItem.url);
                            }
                        });
                        this.$store.commit(SubmitType, {
                            data: this.GoodsInfoForm,
                            successCb(res) {
                                _self.$Notice.success({
                                    title: res.message,
                                    duration: 2,
                                    onClose() {
                                        _self.closePage()
                                    }
                                })
                            }
                        });
                    }
                });
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '上传图片格式错误,只能上传jpg、jpeg、png'
                });
            },
            closePage() {  // 关闭页面操作
                let pageOpenedList = this.$store.state.app.pageOpenedList;
                let lastPageObj = pageOpenedList[0];
                let PageLength = pageOpenedList.length;
                for(let i=1; i<PageLength; i++) {
                    if(this.currentPageName === pageOpenedList[i].name) {
                        if(i < (PageLength-1)) {  //  当前关闭的Tag标签非最后一个标签的情况
                            lastPageObj = pageOpenedList[i+1];
                        } else {  // 当前关闭的Tag标签是最后一个标签的情况
                            lastPageObj = pageOpenedList[i-1];
                        }
                        break;
                    }
                }
                this.$store.commit('removeTag', this.currentPageName);
                pageOpenedList = this.$store.state.app.pageOpenedList;
                localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
                this.RoutePush(lastPageObj);
            },
            RoutePush(PageObj) {  // 关闭页面后页面跳转到最近打开的页面
                let routerObj = new Object();
                routerObj.name = PageObj.name;
                routerObj.params = PageObj.argu;
                routerObj.query = routerObj.query;
                this.$router.push(routerObj);
            },
            getGoodsInfo() {
                const _self = this;
                this.$store.commit('getGoodsInfoById', {
                    data: {
                        id: this.$route.params.id
                    },
                    successCb(res) {
                        let nameAttrArray = res.data.name.split("_");
                        res.data.isstock = String(res.data.isstock);
                        res.data.stock = String(res.data.stock);
                        res.data.goodsname = nameAttrArray[0];
                        _self.extendProperty.PropertyColor = nameAttrArray[1];
                        _self.extendProperty.PropertySize = nameAttrArray[2];
                        _self.extendProperty.PropertyExtend = nameAttrArray[3];
                        _self.GoodsInfoForm = res.data;
                        res.data.images.forEach(ImageItem => {
                            _self.$refs.upload.fileList.push({
                                url: ImageItem,
                                status: "finished",
                                showProgress: false,
                                percentage: 100
                            });
                        });
                    }
                })
            },
            changeStock(value) {
                if(value === "0") {
                    this.GoodsInfoForm.stock = '-100';
                } else {
                    this.GoodsInfoForm.stock = '';
                }
            },
            getGoodsTypeList() {
                const _self = this;
                this.$store.commit('getGoodsTypeList', {
                    successCb(res) {
                        _self.GoodsTypeList = res.data.cascader[0].children;
                    }
                });
            }
        },

        mounted() {
            if(this.$route.params.hasOwnProperty("id")) {
                this.getGoodsInfo();
                this.handleSubmitType = 'edit';
            } else {
                this.handleSubmitType = 'add';
            }
            this.uploadList = this.$refs.upload.fileList;
        },

        created() {
            this.getGoodsTypeList();
        }

    }

</script>

<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
