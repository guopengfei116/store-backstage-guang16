<template>
    <div>
        <!-- 公共头部 -->
        <app-header></app-header>
        <!-- 公共左侧 -->
        <app-aside></app-aside>
        <!-- 变化的后台管理子页面 -->
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from './subcom/Header.vue';
    import Aside from './subcom/Aside.vue';

    export default {
        // 注册子组件
        components: {
            appHeader: Header,
            appAside: Aside
        }
    }
</script>

<style scoped>

</style>