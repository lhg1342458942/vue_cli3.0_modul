import directive from "./directive.js";
import Apis from "@/core/api/apis.js";
import Global from "@/core/global";
import Common from "@/components/common";



export default (Vue) => {
	directive(Vue); //注册全局指令
	Common(Vue); //swiper注册到全局
	Vue.prototype.$eventBus = new Vue(); //全局通信
	Vue.prototype.$apis = Apis; //把$apis注册到了全局
}