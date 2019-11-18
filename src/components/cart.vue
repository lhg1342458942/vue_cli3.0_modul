<template>
  <div>
      <h1>购物车xxxx</h1>
      <ul>
        <li v-for="(item,index) in cartList" :key="index">
          <div>
            <!-- <input type="checkbox" v-model="item.bool" @change="count"> -->

            <div>
              <img :src="`https://res.bestcake.com/m-images/order/mw_firm_duihao_${item.bool?1:2}.jpg`" @click="changeFn(item)">
            </div>
            <p>商品名称:{{item.Name}}</p>
            <p>商品单价:{{item.CurrentPrice}}</p>

            <button @click="add(item)">+</button>
            <span>{{item.num}}</span>
            <button>-</button>
            <span>{{item.num*item.CurrentPrice}}</span>
          </div>
          <hr>
        </li>
      </ul>
      <hr/>
      <div>总价:{{allPrice}}</div>
      <div>全选:
         <input type="checkbox" v-model="isBool">
      </div>
  </div> 
</template>

<script>
import Store from "storejs";
export default {
  data(){
    return {
      cartList:[],
      allPrice:0,
      isArr:[],
      isBool:false
    }
  },
  mounted(){
    this.cartList=this.$store.state.cartList;
    this.cartList.map((item)=>{
      item.bool=false;
    })
  },
  methods:{
      add(item){
        // Vuex使用的数据更当前组件的数据是 一个内存地址
        item.num++;
        Store.set("cartList",this.$store.state.cartList);
        this.count();
      },
      changeFn(item){
        item.bool=!item.bool;
        this.count();
      },
      count(){
        this.allPrice=0;
        this.isArr=[];
        this.cartList.map((item)=>{
          if(item.bool){
            this.allPrice+=item.num*item.CurrentPrice;
            this.isArr.push(item);
          }
        })
        if(this.isArr.length===this.cartList.length){
          // console.log("all")
          this.isBool=true;
        }else{
           this.isBool=false;
        }

      }


  },

};
</script>
