<template>
    <div class="detail">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goodsList' }">商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 大表单 -->
        <el-form ref="form" label-position="left" :model="form" label-width="80px" class="detail_form">
            
            <el-form-item label="内容标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label="副标题">
                <el-input v-model="form.sub_title"></el-input>
            </el-form-item>

            <el-form-item label="所属类别">
                <el-select v-model="form.category_id" placeholder="请选择">
                    <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
                        <!-- option里面可以加标签覆盖label文本, 但是label属性还得必须要, 不然会报错 -->
                        <span>
                            <!-- 子级分类才有这个图标 -->
                            <span v-if="item.class_layer != 1">|-</span> 
                            <span>{{ item.title }}</span>
                        </span>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否发布">
                <el-switch v-model="form.status"></el-switch>
            </el-form-item>

            <el-form-item label="推荐类型">
                <el-switch v-model="form.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="form.is_hot" active-text="推荐"></el-switch>
            </el-form-item>

            <el-form-item label="上传封面">
                <el-input v-model="form.a">form.imgList</el-input>
            </el-form-item>

            <el-form-item label="上传附件">
                <el-input v-model="form.b">form.fileList</el-input>
            </el-form-item>

            <el-form-item label="商品货号">
                <el-input v-model="form.goods_no"></el-input>
            </el-form-item>

            <el-form-item label="库存数量">
                <el-input v-model="form.stock_quantity"></el-input>
            </el-form-item>

            <el-form-item label="市场价格">
                <el-input v-model="form.market_price"></el-input>
            </el-form-item>

            <el-form-item label="销售价格">
                <el-input v-model="form.sell_price"></el-input>
            </el-form-item>

            <el-form-item label="内容摘要">
                <el-input type="textarea" v-model="form.zhaiyao"></el-input>
            </el-form-item>

            <el-form-item label="详细内容">
                <quillEditor v-model="form.content"></quillEditor>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <!-- go方法用来前进后退历史记录 -->
                <el-button @click="$router.go(-1)">返回上一页</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'

    export default {
        data() {
            return {
                // 表单数据
                form: {},

                // 分类列表数据
                category: [],

                // 页面一上来要从url里面拿到被编辑的商品ID
                id: this.$route.params.id
            }
        },

        methods: {

            // 获取商品数据
            getGoods() {
                this.$http.get(this.$api.gsDetail + this.id).then(res => {    
                    if(res.data.status == 0) {
                        this.form = res.data.message;

                        // 为了让分类列表默认正确显示, 把商品category_id的数据类型改为number
                        this.form.category_id = +this.form.category_id;
                    }
                });
            },

            // 获取商品分类数据
            getCategory() {
                this.$http.get(this.$api.ctList + 'goods').then(res => {    
                    if(res.data.status == 0) {
                        this.category = res.data.message;
                    }
                });
            },

            // 保存按钮
            onSubmit() {
                
            }
        },

        // 组件初始化完毕后就调用接口渲染表单默认数据
        created() {
            this.getGoods();
            this.getCategory();
        },
        
        // 把富文本组件注册成子组件使用
        components: {
            quillEditor
        }
    }
</script>

<style scoped lang="less">
    .detail {
        &_form {
            margin-top: 30px;
            width: 700px;
        }
    }
</style>