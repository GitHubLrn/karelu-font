<template xmlns="http://www.w3.org/1999/html">
  <el-container>
    <el-header class="headerBackgroud" style="position: fixed;width: 100vw;z-index: 10">
      <div>
        <el-button style="background: none; border: none" @click="c0">
          <div style="padding-left: 10px;color: azure;font-size: 20px;line-height: 40px">Karelu 后台管理系统</div>
        </el-button>
        <div style="line-height: 60px;color: azure;display: flex;justify-content: space-around;position: absolute;right: 3vw;margin-top: -65px">
          <el-button style="background: none;border: none;color: white;margin-top: 10px" @click="tuichu">退出登录</el-button>
        </div>
      </div>
    </el-header>
    <el-container style="margin-top: 60px">
      <el-aside width="200px">
        <div style="background:#545c64;border-right:5px solid white;width: 200px;height: 100vh;position:fixed">
          <el-menu
              style="border: none"
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="c1">用户信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>举报处理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1"@click="c3">动态举报</el-menu-item>
                <el-menu-item index="1-2"@click="c4">弹幕投诉</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>管理员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-2"@click="c6">注册新管理员</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-main style="word-break: break-all;white-space: pre-wrap">
        <div v-if="choice == 0" style="display:flex;margin-top: 5vh">
          <div id="echartsExample" style="width: 50vw;height: 50vh"></div>
          <div id="echartsExample2" style="width: 60vw;height: 60vh"></div>
        </div>
        <UserInfo v-if="choice == 1"></UserInfo>
        <NoteReport v-if="choice == 3"></NoteReport>
        <DanmuReport v-if="choice == 4"></DanmuReport>
        <ChangeAdminInfo v-if="choice == 5"></ChangeAdminInfo>
        <SignUpAdmin v-if="choice == 6"></SignUpAdmin>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import UserInfo from "@/components/admin/UserInfo";
import NoteReport from "@/components/admin/NoteReport";
import DanmuReport from "@/components/admin/DanmuReport";
import SignUpAdmin from "@/components/admin/SignUpAdmin";
export default {
  name: "AdminPage",
  components: {SignUpAdmin, DanmuReport, NoteReport,  UserInfo},
  data(){
    return{
      choice:0,
      modelActive:[],
      nowActive:[]
    }
  },
  methods:{
    tuichu(){
      window.sessionStorage.removeItem('uid');
      window.sessionStorage.removeItem('tokenStr');
      window.sessionStorage.removeItem('nickname');
      this.$router.replace('/')
    },
    c0(){
      this.choice = 0;
      location.reload();
    },
    c1(){
      this.choice = 1;
    },
    c3(){
      this.choice = 3;
    },
    c4(){
      this.choice = 4;
    },
    c6(){
      this.choice = 6;
    }
  },
  created() {
    this.getRequest('/admin/getModelActive').then(resp => {
      this.modelActive = resp.obj;

      let myChart2 = this.$echarts.init(document.getElementById('echartsExample2')) // echartsExample是显示echart的元素id
      // 绘制图表
      myChart2.setOption({
        title: {
          text: '                                                  近七日活跃来源'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '活跃来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.modelActive
          }
        ]
      })
    })
    this.getRequest('/admin/getNowActive').then(resp =>{
      this.nowActive = resp.obj;
      let myChart = this.$echarts.init(document.getElementById('echartsExample')) // echartsExample是显示echart的元素id
      // 绘制图表
      myChart.setOption({
        title: {
          text: '            近七日每日活跃波动'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['05-26', '05-27', '05-28', '05-29', '05-30', '05-31','今日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '操作数',
          type: 'line',
          data: this.nowActive
        }]
      })
    })
  },
  mounted() {
  }
}
</script>

<style scoped>
.headerBackgroud{
  background: url("../../../static/img/bg5.jpg");
}
</style>