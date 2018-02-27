import Vue from 'vue'

import App from './component/App.vue'

import vueRouter from './router'  // 自动导入该目录下的index.js

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
    el: '#app',
    // 下面使用的箭头函数也是es6语法
    render: createElement => createElement(App),
    router: vueRouter
})