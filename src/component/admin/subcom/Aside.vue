<template>
    <div>
        <el-menu class="el-menu-vertical-demo" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b">

            <!-- 预留一个一级菜单, 将来通过v-for动态生成多组一级菜单 -->
            <!-- 这里的index用来给当前菜单起个名字, 以区分 -->
            <el-submenu v-for="item in menu" :key="item.title" :index="item.title" >

                <!-- 菜单title -->
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.title }}</span>
                </template>

                <!-- 菜单list, 遍历当前菜单的chidren拿数据 -->
                <el-menu-item  v-for="subitem in item.chidren" :key="subitem.title" :index="subitem.title">
                    <router-link :to="subitem.path">{{ subitem.title }}</router-link>
                </el-menu-item>

            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 左侧导航列表数据
                menu: [
                    { 
                        title: '商品管理', 
                        chidren: [ 
                            { title: '内容管理', path: '/admin/goods' }, 
                            { title: '类别管理', path: '/admin/category' }, 
                            { title: '评论管理', path: '/admin/comment' } 
                        ]
                    },
                    { 
                        title: '订单管理', 
                        chidren: [ 
                            { title: '内容管理1', path: '/admin/a' }, 
                            { title: '类别管理2', path: '/admin/b' }, 
                            { title: '评论管理3', path: '/admin/c' } 
                        ]
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>