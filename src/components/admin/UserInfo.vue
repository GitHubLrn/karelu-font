<template>
  <div>
    <div style="font-size: 24px">用户信息</div>
    <el-table
        :data="userInfo"
        stripe
        style="width: 100%">
      <el-table-column
          prop="id"
          label="用户id"
          width="70">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="头像"
          width="70">
        <template slot-scope="scope"><img :src="scope.row.icon" style="width: 30px;height: 30px"> </template>
      </el-table-column>
      <el-table-column
          prop="username"
          label="账号"
          width="140">
      </el-table-column>
      <el-table-column
          prop="nickName"
          label="昵称"
          width="100">
      </el-table-column>
      <el-table-column
          prop="signature"
          label="签名"
          width="250">
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态"
          width="120">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEditnickname(scope.$index, scope.row)">重置昵称</el-button>
          <el-button
              size="mini"
              @click="handleEditicon(scope.$index, scope.row)">重置头像</el-button>
          <el-button
              size="mini"
              @click="handleEditsignature(scope.$index, scope.row)">重置签名</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleStateto0(scope.$index, scope.row)">封号</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleStateto1(scope.$index, scope.row)">解封</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data(){
    return{
      userInfo:[],
      NickNameUpload:{
        name:'',
        uid:''
      },
      IconUpload:{
        uid:'',
        url:'image/1.jpg'
      },
      SignatureUpdate:{
        signature:'',
        uid:''
      }
    }
  },
  methods:{
    handleEditnickname(index, row) {
      this.NickNameUpload.name = '初始昵称' + row.id;
      this.NickNameUpload.uid = row.id;
      this.postRequest('/user/changenick',this.NickNameUpload).then(resp => {
        this.userInfo[index].nickName = this.NickNameUpload.name;
      })
    },
    handleEditicon(index, row) {
      this.IconUpload.uid = row.id;
      this.postRequest('/user/changeic',this.IconUpload).then(resp => {
        this.userInfo[index].icon = this.IconUpload.url;
      })
    },
    handleEditsignature(index, row) {
      this.SignatureUpdate.uid = row.id;
      this.postRequest('/user/changeSign',this.SignatureUpdate).then(resp =>{
        this.userInfo[index].signature = this.SignatureUpdate.signature;
      })
    },
    handleStateto0(index, row) {
      this.putRequest('/user/fenghao?targetUid=' + row.id).then(resp =>{
        this.userInfo[index].state = '已封禁';
      })
    },
    handleStateto1(index, row) {
      this.putRequest('/user/jiefeng?targetUid=' + row.id).then(resp =>{
        this.userInfo[index].state = '已启用';
      })
    }
  },
  created() {
    this.getRequest('/admin/getAllUser').then(resp => {
      this.userInfo = resp.obj;
    })
  }
}
</script>

<style scoped>

</style>