<template>
  <el-button @click="fasong">发送</el-button>
</template>

<script>
export default {
  name: "testRabbit",
  data(){
    return{
      websocket:null
    }
  },
  created() {
    let uid = window.sessionStorage.getItem('uid');
    let toid = 0;
    if (uid == 7){
      toid = 41
    }else{
      toid = 7
    }
    if ('WebSocket' in window) {
      let protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://'
      this.websocket = new WebSocket('ws://10.1.188.178:8080/ws/'+ uid)
    } else {
      alert('该浏览器不支持WebSocket')
    }

    this.websocket.onopen = function(event) {
      // heartCheck.reset().start();
    }

    this.websocket.onclose = function(event) {
    }

    this.websocket.onmessage = function(event) {
      console.log(event.data)
    }

    this.websocket.onerror = function(event) {
      console.log('websocket通信发生错误')
    }

    window.onbeforeunload = function(event) {
      this.websocket.close()
    }
  },
  methods: {
    fasong(){
      let message = '';
      message += '41;'
      message += 'info'
      this.websocket.send(message);
    }
  }
}
</script>

<style scoped>

</style>