<template>
  <div class="background">
    <div class="barrages-drop">
      <vue-baberrage
          :isShow="danmu.barrageIsShow"
          :barrageList="barrageList"
          :maxWordCount="danmu.maxWordCount"
          :throttleGap="danmu.throttleGap"
          :loop="danmu.barrageLoop"
          :boxHeight="danmu.boxHeight"
          :messageHeight="danmu.messageHeight"
      >
      </vue-baberrage>
    </div>
    <div style="position: absolute;bottom: 6vw;margin-left:13vw ">
      <el-input placeholder="说点心里话~" v-model="aaa.what" class="input-with-select" style="width: 70vw;margin: 0 auto;">
        <el-button slot="append" @click="doDanMu">发送</el-button>
      </el-input>
      <el-button slot="append" @click="tousu" style="margin-left: 15px">投诉</el-button>
    </div>
    <div style="margin-top: 20vh;margin-left:35vw;width: 500px;height: 180px;border-radius: 10px" v-if="dialogshow" class="maoboli">
      <div style="text-align: center;font-size: 20px;font-weight: bold;padding-top: 15px">
        投诉
      </div>
      <div>
        <el-input type="textarea" resize="none" style="width: 400px;border-radius: 5px;margin-top: 15px;margin-left: 50px" placeholder="请输入要投诉的弹幕包含的内容" v-model="tousuParam.containthing"></el-input>
      </div>
      <div style="position:absolute;margin-left: 300px;margin-top: 15px">
        <el-button @click="cancleShow">取消</el-button><el-button @click="dotousu">确认</el-button></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { vueBaberrage, MESSAGE_TYPE } from 'vue-baberrage';
import {Things} from "@/common/const/globalConst";

Vue.use(vueBaberrage);

export default {
  name: "TreeHollow",
  data(){
    return{
      tousuParam:{
        tousuid:'',
        uid:0,
        containthing:'',
        createdate:''
      },
      dialogshow: false,
      danmuParam:{
        uid:0,
        danmu:'',
        icon:''
      },
      icon:[
          'http://10.1.188.178:8080/image/001.jpg',
          'http://10.1.188.178:8080/image/002.jpg',
          'http://10.1.188.178:8080/image/003.jpg',
          'http://10.1.188.178:8080/image/004.jpg',
          'http://10.1.188.178:8080/image/005.jpg',
          'http://10.1.188.178:8080/image/006.jpg',
      ],
      danmu:[
        ],
      barrageIsShow: true,
      messageHeight: 60,
      boxHeight: 11,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 5000,
      barrageList: [],
      aaa:{
        by:'',
        what:''
      },
      websocket:null
    }
  },
  created() {
    let a = this;
    let b = Things;
    setTimeout(function (){
      b.websocket.onmessage = function(event) {
        let temp = JSON.parse(event.data)
        let total = JSON.parse(window.sessionStorage.getItem('chatRemember'));
        let ni = JSON.parse(window.sessionStorage.getItem('newinfo'))
        ni[temp.usersentid] ++ ;
        window.sessionStorage.setItem('newinfo',JSON.stringify(ni))
        total[temp.usersentid].push(temp);
        window.sessionStorage.setItem('chatRemember',JSON.stringify(total));
        a.$notify.success({
          title: this.nk,
          message: '收到一条新信息',
          offset: 60
        })
      }
    },1000)
    if ('WebSocket'in window) {
      this.websocket = new WebSocket("ws://10.1.188.178:8080/websocket");
      let _this = this
      this.websocket.onmessage = function (event){
        let thing = {
          msg:event.data
        }
          _this._data.barrageList.push({
            id:1,
            avatar: _this._data.icon[Math.floor(Math.random()*6)],
            msg:thing.msg,
            time:10,
            type: MESSAGE_TYPE.NORMAL
          });
      }
      this.websocket.onmessage.prototype._this = this
    }
    else {
      alert('Not support websocket')
    }
  },
  mounted() {

  },
  methods: {
    dotousu(){
      if(this.tousuParam.containthing == ''){
        this.$message.info("投诉内容不能为空哟~");
      }else{
        if(this.tousuParam.containthing.match(/^\s*$/)){
          this.$message.info('投诉内容不能为空哟~')
        }else{
          this.tousuParam.uid = window.sessionStorage.getItem('uid');
          this.postRequest('/tousu/dotousu',this.tousuParam).then(resp =>{
            this.tousuParam.containthing = '';
            this.dialogshow = false;
          })
        }
      }
    },
    cancleShow(){
      this.dialogshow = false;
    },
    tousu(){
      this.dialogshow = true;
    },
    doDanMu(){
      if(!this.aaa.what.match(/^\s*$/)){
        this.danmuParam.uid = window.sessionStorage.getItem('uid');
        this.danmuParam.danmu = this.aaa.what;
        this.danmuParam.icon = this.icon[Math.floor(Math.random()*6)];
        this.postRequest('/danmu/writeDanmu',this.danmuParam).then(resp => {
          if(resp){
            this.websocket.send(this.danmuParam.danmu)
          }
        })
      }else{
        this.$message.info('不能发送空弹幕~')
      }
      this.aaa.what = '';
    }
  }
}
</script>

<style lang="less" scoped>
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
  background-image: url("../../../static/img/bg28.jpg");
  overflow: scroll;
  width: 100%;
  height: 100vh;
  padding-top: 75px;
  position: absolute;
  z-index: 0;
  background-attachment: fixed;
  background-size: 100% auto;
}
.barrages-drop {
  .baberrage-stage {
    position: absolute;
    width: 100%;
    height: 765px;
    overflow: hidden;
    top: 0;
    margin-top:80px;
  }
}
</style>