import { createApp } from 'vue'
// import './style.css'
import 'vant/es/toast/style';
import 'vant/lib/index.css';
import '../global.css';

import App from './App.vue'

//全局引入
import Vant from 'vant';
//引入组件样式
import 'vant/lib/index.css';

import * as VueRouter from 'vue-router';
import routes from "./config/route";

const app = createApp(App);


//全局引入
app.use(Vant)

//  创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),//Hash路由在url最后的页面以#开头
    routes, // `routes: routes` 的缩写
})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
//挂载
app.mount('#app')
// 现在，应用已经启动了！

