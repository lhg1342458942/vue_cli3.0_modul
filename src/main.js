import Vue from 'vue';
import App from './App.vue';
import router from './router';

import store from '@/core/store';

import 'lib-flexible/flexible.js'; //配置淘宝框架
import 'font-awesome/css/font-awesome.css'; //配置字体图标库
import "mint-ui/lib/style.css"; //配置mint-ui
import vueWechatTitle from "vue-wechat-title"; //动态title
import coreConfig from "@/core/core.config.js"; //


Vue.use(vueWechatTitle)
//use支持传入一个函数,自动在函数内部写入Vue构建函数
Vue.use(coreConfig);
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')