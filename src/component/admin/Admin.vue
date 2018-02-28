<template>
    <div class="admin">
        <el-container>

            <!-- 公共头部 -->
            <el-header>
                <app-header></app-header>
            </el-header>

            <el-container class="admin_content">
                <!-- 公共左侧 -->
                <el-aside width="200px">
                    <app-aside></app-aside>
                </el-aside>
                
                <!-- 变化的后台管理子页面 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>

        </el-container>
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

<style scoped lang="less">
    .admin {
        height: 100%;
        color: #333;

        .el-header {
            line-height: 60px;
        }

        .el-container {
            height: 100%;
        }

        // &在less中是对上级选择器的引用, 书写方便
        &_content {
            background-color: red;
        }

        .el-aside {
            background-color: yellow;
        }
    }
    
    
</style>