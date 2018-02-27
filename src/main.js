import Vue from 'vue'

import App from './component/App.vue'

new Vue({
    el: '#app',
    // 下面使用的箭头函数也是es6语法
    render: createElement => createElement(App)
})