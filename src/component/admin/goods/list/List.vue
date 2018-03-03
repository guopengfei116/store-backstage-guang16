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
            <el-button plain size="mini" icon="el-icon-check" @click="all">全选</el-button>
            <el-button plain size="mini" icon="el-icon-close" @click="del">删除</el-button>

            <div class="list_btns_right">
                <el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" 
                    label-width="200px" size="mini" v-model="apiQuery.searchvalue" @blur="search">
                </el-input>
            </div>
        </section>

        <!-- 大表格 -->
        <!-- data属性用来配置表格数据  -->
        <el-table @selection-change="change" ref="multipleTable" :data="tableData3" style="width: 100%">
            
            <!-- type为selection, 即多选框 -->
            <el-table-column type="selection" width="55"></el-table-column>

            <!-- label用来设置当前列的表头 -->
            <!-- 里面的template用来自定义表格中的内容与数据, 相比较prop属性的方式, 更加灵活, 可以对数据进行标签包裹 -->
            <el-table-column label="标题">
                <template slot-scope="scope">

                    <!-- 在a标签上嵌套tooltip标签, 就可以添加提示信息 -->
                    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                        <router-link style="color: #666;" :to="{ path: `/admin/goods/detail/${scope.row.id}` }">{{ scope.row.title }}</router-link>
                        
                        <!-- 通过带有slot的标签, 来自定义提示框里的子元素 -->
                        <div slot="content">
                            <img style="width: 200px;" :src="scope.row.imgurl" alt="商品图片">
                        </div>

                    </el-tooltip>

                </template>
            </el-table-column>

            <!-- 当前列要展示对象中的那个字段的值, 就配置prop属性为那个字段名 -->
            <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>
            
            <!-- 当前列要展示对象中的那个字段的值, 就配置prop属性为那个字段名 -->
            <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip></el-table-column>

            <el-table-column prop="market_price" label="市场价" width="120" show-overflow-tooltip></el-table-column>

            <el-table-column prop="sell_price" label="销售价" width="120" show-overflow-tooltip></el-table-column>

            <el-table-column label="属性" width="120" show-overflow-tooltip>
                <!-- 注意template要加slot-scope属性 -->
                <template slot-scope="scope">
                    <!-- 轮播图: is_slide -->
                    <span :class="['el-icon-picture-outline', scope.row.is_slide == 1? 'active': '']"></span>

                    <!-- 指定: is_top -->
                    <span :class="['el-icon-upload2', scope.row.is_top == 1? 'active': '']"></span>

                    <!-- 推荐: is_hot -->
                    <span :class="['el-icon-star-off', scope.row.is_hot == 1? 'active': '']"></span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                    <router-link style="color: #666;" :to="{ path: `/admin/goods/detail/${scope.row.id}` }">修改</router-link>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
    </div>
</template>

<script>
    export default {
        data() {
            return {

                // 搜索
                apiQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    searchvalue: ''
                },

                // 被选中的商品数据
                selectedGoodsList: [],

                // 表格数据
                tableData3: [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, 
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, 
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, 
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                multipleSelection: []
            }
        },

        // 编写供自己使用的方法
        methods: {

            // 搜索
            search() {
                this.getGoodsData();
            },

            // 获取商品列表数据
            getGoodsData() {
                // 这个接口需要pageIndex指定页, pageSize指定每页数量, searchvalue用于商品搜索
                let api = `${this.$api.gsList}?pageIndex=${this.apiQuery.pageIndex}&pageSize=${this.apiQuery.pageSize}&searchvalue=${this.apiQuery.searchvalue}`
                this.$http.get(api).then((res) => {
                    if(res.data.status == 0) {
                        this.tableData3 = res.data.message;  // 把请求回来的数据覆盖原data数量, 表格就会自动刷新
                    }
                });
            },

            // 监听多选框状态的变化, 参数可以拿到被选的商品数据
            change(selection) {
                this.selectedGoodsList = selection;
            },

            // 删除按钮
            del() {
                let delIDS = this.selectedGoodsList.map(v => v.id); // 提取所有被选商品的id
                this.$http.get(this.$api.gsDel + delIDS).then((res) => {
                    // 删除成功后重新获取数据进行渲染
                    if(res.data.status == 0) {
                        this.getGoodsData();
                    }
                })
            },

            // 全选按钮
            all() {
                document.querySelector('.el-checkbox__original').click();
            },
            
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },

        // 页面一上来就自动调用接口获取表格数据进行展示
        // 当组件初始化完毕, 并且数据可用时, 被自动调用
        created() {
            this.getGoodsData();
        }
    }
</script>

<style scoped lang="less">
    .list {

        // 按钮组
        &_btns {
            margin-top: 20px;
            margin-bottom: 20px;

            &_right {
                float: right;
                width: 200px;
            }
        }

        // 添加icon点亮的样式
        [class^=el-icon].active {
            color: #000;
            font-weight: bold;
        }
    }
</style>
