<template>
    <div>
        {{ val }}
        <!-- 根组件路由占位, 将来通过url来控制页面的展示 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        // 这是es6中对象定义方法的语法
        data() {
            return {
                val: 'vue脚手架测试'
            }
        },
    }
</script>

<style scoped>

</style>