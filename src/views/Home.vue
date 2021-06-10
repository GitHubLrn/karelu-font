<template>
  <div>
    <el-container>
      <el-header style="height: 65px;margin: 0;padding: 0;width: 100vw;position: absolute;z-index: 1">
        <el-menu
            router
            class="el-menu-demo qqq"
            mode="horizontal"
            text-color="#BDBDBD"
            active-text-color="#BDBDBD"
            style="display: flex;justify-content: space-around;border: none">
          <el-button style="background: none; border: none"><div style="padding-left: 10px;color: azure;font-family: Facon;font-size: 20px" @click="goMainPage">Karelu</div></el-button>
          <el-menu-item index="/square" >广场</el-menu-item>
          <el-menu-item index="/treeHollow" >树洞</el-menu-item>
          <el-menu-item index="/message">消息</el-menu-item>
          <div style="line-height: 60px;padding-left: 10px;color: azure;display: flex;justify-content: space-around">
            <el-dropdown  @command="commandHandler">
              <span class="el-dropdown-link" style="color: azure">
                {{user.name}}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user" style="margin-top: 5px" command="goMySpace">个人空间</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-close" style="margin-top: 5px" command="logout">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div style="line-height: 50px"><img :src="user.icon" style="width: 30px;height: 30px;padding-top: 15px;margin-left: 20px"></div>
          </div>
        </el-menu>
      </el-header>
      <el-main style="margin: 0;padding:0;">
        <router-view ref="message"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {Things} from "@/common/const/globalConst";

export default {
  name: "Home",
  data(){
    return{
      timer:null,
      uid:0,
      user:{
        icon:'',
        name:''
      }
    }
  },
  methods:{
    goMainPage(){
      this.$router.replace('/mainPage')
    },
    commandHandler(command){
      if(command == 'goMySpace'){
        this.$router.replace('/userCenter')
      }
      if (command=='logout'){
        this.$confirm('确定注销？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type:'success',
            message:'注销成功'
          })
          clearInterval(this.timer);
          this.timer = null;
          window.sessionStorage.removeItem('uid');
          window.sessionStorage.removeItem('tokenStr');
          window.sessionStorage.removeItem('nickname');
          window.sessionStorage.removeItem('chatRemember');
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消注销'
          });
        });
      }
    }
  },
  created() {
    this.getRequest('/chat/getNeedToDone').then(resp => {
      window.sessionStorage.setItem('newinfo',JSON.stringify(resp.obj))
    })
    this.getRequest('/chat/getAllMemory').then(resp => {
      window.sessionStorage.setItem('chatRemember',JSON.stringify(resp.obj))
      Things.chatMemory = resp.obj;
    })

    this.getRequest('/user/getUserName').then(resp => {
      this.user.name = resp.obj;
    })

    this.getRequest('/user/getIcon').then(resp => {
      this.user.icon = resp.obj;
    })

    if ('WebSocket' in window) {
      this.getRequest('/user/getUser').then(resp => {
        this.uid = resp.obj.id;
        Things.websocket = new WebSocket('ws://10.1.188.178:8080/ws/'+ this.uid)
        let a = this;
        Things.websocket.onopen = function(event) {
          // heartCheck.reset().start();
        }

        Things.websocket.onclose = function(event) {
        }

        Things.websocket.onmessage = function(event) {
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

        Things.websocket.onerror = function(event) {
          console.log('error')
        }

        window.onbeforeunload = function(event) {
          Things.websocket.close()
        }
      })
    } else {
      alert('该浏览器不支持WebSocket')
    }
  }
}
</script>

<style>
.qqq{
  background: url("../../static/img/bg5.jpg");
}

::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>