<template>
    <div>
        {{ val }}
        <!-- 根组件路由占位, 将来通过url来控制页面的展示 -->
        <router-view></router-view>

        <el-switch
            v-model="nian"
            active-text="去年"
            inactive-text="今年">
        </el-switch>
    </div>
</template>

<script>
    export default {
        // 这是es6中对象定义方法的语法
        data() {
            return {
                val: 'vue脚手架测试',
                nian: true
            }
        },

        // 生命周期函数, vue会自动调用
        created() {
            this.$http.get(this.$api.logout).then(() => console.log('退出登陆'))
        }
    }
</script>

<style scoped>

</style>