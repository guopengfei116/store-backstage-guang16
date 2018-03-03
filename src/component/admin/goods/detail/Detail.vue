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

                <!-- action用来设置上传接口, list-type用来设置文件列表样式 -->
                <!-- file-list用来设置文件列表的数据, 我们每上传成功一个文件, 就要给这个列表数据push上传后的信息, 然后列表就会展示出来 -->
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg"
                    list-type="picture" :file-list="form.imgList" :on-success="uploadImg">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>

            </el-form-item>

            <el-form-item label="上传附件">
                <!-- 我们要监听文件上传成功的事件, 事件触发时要拿到后端接口返回的数据, 把它保存到data的from里, 将来保存修改的时候使用 -->
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile"
                    :file-list="form.fileList" :on-success="uploadFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
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

            // 上传封面 => 咱们的后端接口, 只能接收一张封面
            uploadImg(data) {
                // this.form.imgList = [];
                // this.form.fileList.push(data); // 把接口返回的数据保存起来, 供将来保存使用

                this.form.imgList = [data];
            },

            // 上传附件
            uploadFile(data) {
                this.form.fileList.push(data); // 把接口返回的数据保存起来, 供将来保存使用
            },

            // 保存按钮
            onSubmit() {
                this.$http.post(this.$api.gsEdit + this.id, this.form).then(res => {    
                    if(res.data.status == 0) {
                        this.$alert('数据修改成功');
                    }
                });
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