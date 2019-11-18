import Vue from "vue";
import Vuex from "vuex";
import apis from "@/core/api/apis";

import Store from "storejs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //定义全局属性变量
    //在组件内调用时用this.$store.state.xxx
  },
  mutations: {
    //定义全局操作state的方法
    test(state, data) {
      //第一个参数固定state,可以取state中的变量
      //传参从第二个参数开始
      //在组件内调用时用this.$store.commit(方法名,{参数})只能传一个参数
    }
  },
  getters: {
    //vuex属性计算
    count(state) {
      //参数固定state,可以取state中的变量
      //在组件内调用this.$store.getters.xxx
    }
  },
  actions: {
    //定义异步函数,发送通用接口
    //组件内部调用this.$store.dispacth(方法名,{参数}) 
  }
});