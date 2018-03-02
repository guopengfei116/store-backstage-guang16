<template>
    <div class="list">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 按钮组, 带搜索框 -->
        <section class="list_btns">
            <el-button plain size="mini" icon="el-icon-plus">新增</el-button>
            <el-button plain size="mini" icon="el-icon-check">全选</el-button>
            <el-button plain size="mini" icon="el-icon-close">删除</el-button>

            <div class="list_btns_right">
                <el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" 
                    label-width="200px" size="mini">
                </el-input>
            </div>
        </section>

        <!-- 大表格 -->

        <!-- 分页 -->
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="less">
    .list {

        // 按钮组
        &_btns {
            margin-top: 20px;

            &_right {
                float: right;
                width: 200px;
            }
        }
    }
</style>