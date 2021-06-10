<template>
  <div class="background">
    <div style="margin-top: 12vh">
      <el-carousel :interval="4000" type="card" height="565px">
        <el-carousel-item v-for="(item,index) in url" :key="index">
          <img :src="item" style="height: 565px" @click="goPage(index)">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import {Things} from "@/common/const/globalConst";

export default {
  name: "MainPage",
  data(){
    return{
      url:[
          '/image/mp101.jpg',
          '/image/mp201.jpg',
          '/image/mp301.jpg'
      ]
    }
  },methods:{
    goPage(idx){
      if(idx == 0){
        this.$router.replace('/square')
      }else if(idx == 1){
        this.$router.replace('/treeHollow')
      }else{
        this.$router.replace('/message')
      }
    }
  },
  created() {
    let a = this;
    let b = Things;
    setTimeout(function (){
      b.websocket.onmessage = function(event) {
        let temp = JSON.parse(event.data)
        let total = JSON.parse(window.sessionStorage.getItem('chatRemember'));
        total[temp.usersentid].push(temp);
        let ni = JSON.parse(window.sessionStorage.getItem('newinfo'))
        ni[temp.usersentid] ++ ;
        window.sessionStorage.setItem('newinfo',JSON.stringify(ni))
        window.sessionStorage.setItem('chatRemember',JSON.stringify(total));
        a.$notify.success({
          title: this.nk,
          message: '收到一条新信息',
          offset: 60
        })
      }
    },1000)
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: black;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: black;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: black;
}
.maoboli{
  text-shadow: 0 1px 1px hsla(0,0%,100%,.3);
  background: hsla(0,0%,90%,.85);
}
.maoboli::before{
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: -1;
  filter: blur(50px);
  margin: -20px;
  background-size: cover;
}
.background{
  background-image: url("../../static/img/bg21.jpg");
  overflow: scroll;
  width: 100%;
  height: 100%;
  padding-top: 75px;
  position: absolute;
  z-index: 0;
  background-attachment: fixed;
  background-size: 100% auto;
}
</style>