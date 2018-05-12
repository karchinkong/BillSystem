<template>
    <div>
        <Form v-for="item in row.products" :key="item" inline>
            <FormItem v-for="(childItem, childItemKey) in item" :key="childItem">
                <template v-if="childItemKey === 'no'">
                    商品编号： {{childItem}}
                </template>
                <template v-else-if="childItemKey === 'name'">
                    商品名称： {{childItem}}
                </template>
                <template v-else-if="childItemKey === 'number'">
                    商品数量： {{childItem}}
                </template>
                <template v-else-if="childItemKey === 'price'">
                    商品单价： {{childItem}}
                </template>
            </FormItem>
        </Form>
    </div>
</template>


<script>

    export default {
        props: {
            row: Object
        }
    };

</script>

<style>
    .ivu-form-inline .ivu-form-item{
        margin-right: 80px;
    }
</style>
