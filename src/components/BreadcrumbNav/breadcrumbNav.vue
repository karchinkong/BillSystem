<template>
    <Breadcrumb>
        <BreadcrumbItem
            v-for="(item) in currentPath"
            :href="item.path"
            :key="item.name"
        >{{item.title}}</BreadcrumbItem>
    </Breadcrumb>
</template>


<script>
    export default {
        props: {
            currentPath: Array
        }
    }
</script>
