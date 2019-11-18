

# Vue

#### vue-router

```js
1. 安装模块
	cnpm i vue-router@3.0.0 -S	
2. 应用
    import Vue from "vue";
    import VueRouter from "vue-router";
    Vue.use(VueRouter);
	var router = new VueRouer({
        routes :[
            {
                path : "/",		//路由
                name : "",		
                componen : () => import("url"),  //懒加载
                children : [
                	{
        				path : "",
        				name : "",
        				componen : () => import("url"),
        				meta : {
        					title : "首页"
    					}
    				}
                ],
        	    redirect : "/index"    //重定向
            }
        ],
        mode : "hash"   //history	路由模式
    })


    
3. 导航守卫
	组件内部守卫
	beforeRouteEnter(to,from,next) {
		//在渲染该组件的对应路由被 confirm 前调用
    	//不！能！获取组件实例 `this`
     	//因为当守卫执行前，组件实例还没被创建
	}, 		
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
  	},
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
  	}    
	to: 	即将要进入的目标 路由对象
  	from: 	当前导航正要离开的路由
  	next: 	执行效果依赖 next 方法的调用参数。
    		next() : 进行管道中的下一个钩子
             next(false) : 中断当前的导航
             next('/') : 跳转到一个不同的地址
             next(error) : 导航会被终止且该错误会被传递给 router.onError() 注册过的回调
    全局路由钩子
    router.beforeEach((to, from, next) => {
	  //全局前置守卫,当一个导航触发时，全局前置守卫按照创建顺序调用,任何路由跳转都会触发。
	}),
     router.afterEach((to, from) => {
	  // 全局后置钩子,不会接受 next函数也不会改变导航本身
	})	
	路由独享守卫
    const router = new VueRouter({
      routes: [
            {
              path: '/foo',
              component: Foo,
              beforeEnter: (to, from, next) => {
                // 这个守卫是写在路由里面的，只有当进入这个路由时才会调用
              }
            }
          ]
       })
    
4. 路由传参和跳转  : 路由跳转用$router,参数获取用$route
	1. 传递参数
        this.$router.push("/test");
        this.$router.push("/test?name=Msea");
        this.$router.push({path : "/test", query :{name:"luce"}});
        this.$router.push({name:"test",params:{name:"lala"}});
	//query 地址栏显示,刷新不丢失
	//params地址栏不显示 刷新丢失, router路由配置项需要加 name属性
	2. 接收参数
        this.$route.params;
        this.$route.query

```

#### vuex

​	初始化(单库模式)

```js
cnpm i vuex -S
store>index.js

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);       //this.$store.state

//向外暴露
export default new Vuex.Store({
    state:{  //全局属性变量
        msg:"xxx"
    },   
    mutations:{  //全局操作state的方法 
        test(state,data){} //第一个参数固定state,传参从第二个开始取
    },   
    getters:{
        count(state){} //Vuex属性计算
    }    
    actions:{getIndexData(context,data){}}    //异步函数,发送通用接口
	//context  
		//context.state context.getters  context.commit  context.dispatch
})

import store from '@/core/store'
//在 入口文件 引入
new Vue({
  store,
}).$mount('#app')
```

```js
组件内使用
    $store.state.xxx
    $stroe.getters.xxx//当属性变量使用
    //在函数内部  加 this.$store
    mutations  ->  $store.commit("fnName",{xxxx:"xxxx"})//只能传一个参数
    actions    ->  $store.dispacth("fnName",{xxx:"xxx"}) 

```

多模块形式

```js
var store={
    namespaced:true, //多模块暴露,当做命名空间,必须加这个字段
    state:{
        msg:"lala"
    },
    mutations:{
        setName(state){
            state.msg="海样"
        }
    },
    getters:{},
    actions:{}
}
export default store;

//listModel.js
var store={
    namespaced:true,
    state:{
        msg:"lala"
    },
    mutations:{
        setName(state){
            state.msg="海样"
        }
    },
    getters:{},
    actions:{}
}
export default store;


//store/index.js


import Vue from "vue";
import Vuex from "vuex";

import indexModel from "./indexModel"
import listModel from "./listModel"

Vue.use(Vuex);  


export default new Vuex.Store({
  modules:{
    indexModel,
    listModel
  }
})

```

多模块视图使用

```js
$store.state.indexModel.msg
$store.getters.indexModel.count

$store.commit('setName')
$store.dispatch('getTestData')

//可以调用所有数据模块的方法,如果重名都调用都执
```

多模块Vuex暴露使用

```js
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  mounted(){
     
  },
  computed:{
    ...mapState("indexModel",["msg"]),
    ...mapGetters("indexModel",["count"]),
  },
  methods:{
    ...mapMutations("indexModel",["setName"]),
    ...mapActions("indexModel",["getTestData"]),
  }
};
</script>

```

####  axios

​	安装

```js
npm install axios -S
import axios from "axios";
```

​	 初始化使用

```js
const instance = axiso.create({
    baseURL : 'https://xxx.com/api/',	//
    timeout : 10000, 	//请求超时时间
    headers : {'X-Custom-Header': 'foobar'}   //自定义请求头
    transformRequest: [
    function(data) {
      // 对 data 进行任意转换处理
      // 在请求发出之前 ajax 传入参数
      // JSON.stringify()
      //transformResponse` 在传递给 then/catch 前，允许修改响应数据
      return data;
    }
	responseType: 'json'   //设置返回数据类型
})


// 什么是拦截器  项目里面所有的请求发送前
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //打开loading

    // config.headers.token="xxxxxxsalkfhsdjkfh"
    // 加入一些通用配置 通用参数
    // console.log(config)

    return config;
  }, function (error) {
    // 对请求错误做些什么
    
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)
    //关闭loading
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instance;
```





















