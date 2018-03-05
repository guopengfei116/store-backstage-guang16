// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router' // 这是基于vue的一个插件

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'

// 商品管理模块相关组件
import GoodsList from '../component/admin/goods/list/List.vue'
import GoodsDetail from '../component/admin/goods/detail/Detail.vue'
import GoodsComment from '../component/admin/goods/comment/Comment.vue'

Vue.use(VueRouter)

// admin的子路由 => 商品管理模块相关页面
const goods = [
    { name: 'goodsList', path: 'goods/list', component: GoodsList }, // 子路由path不加/自动拼接父路由path
    { name: 'goodsDetail', path: 'goods/detail/:id', component: GoodsDetail }, // 子路由path不加/自动拼接父路由path
    { name: 'goodsComment', path: 'goods/comment', component: GoodsComment } // 子路由path不加/自动拼接父路由path
];

// 导出路由实例 
let router = new VueRouter({
    routes: [
        // 登陆
        { name: 'login', path: '/login', component: Login },

        // 后台管理
        { name: 'admin', path: '/admin', component: Admin, children: [...goods] },
    ]
});

// 添加路由前置守卫, 其实就是添加一个函数, 这个函数会在路由配置之前执行, 我们可以在这里添加一些登陆或者权限的校验
// to与from是两个对象, 可以拿到url信息
router.beforeEach((to, from, next) => {
    // 通过to.name得知用户访问的是什么页面, 如果是admin相关页面, 那么继续判断用户有没有登陆
    // 有 => 调用next()通过访问,  没有 => 调用next({name: 'login'})跳转到登陆页面

    
    // 现在我们是在一个js模块当中, 并不是在vue组件中, 所以这里的this不是组件实例, 而是undefined, 无法this.$http与this.$api
    Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res => {
        let isLogin = false;

        // 已登陆
        if(res.data.code == 'logined') {
            isLogin = true;
        }

        // 如果访问登陆页面
        // 已登陆 => 为了用户友好体验, 自动跳转到后台管理
        // 未登陆 => 允许访问登陆页面
        if(to.name == 'login') {
            if(isLogin) {
                next({name: 'admin'});
            }else {
                next();
            }
        }

        // 如果访问后台页面
        // 已登陆 => 允许访问后台页面 
        // 未登陆 => 禁止访问, 自动跳转到登陆页面
        if(to.name != 'login') {
            if(isLogin) {
                next();
            }else {
                next({name: 'login'});
            }
        }
    })
});

export default router;
