<template>
  <div>
    <div style="font-size: 24px">注册新管理员</div>
    <el-form label-position="right" label-width="80px" style="width: 30vw;margin-top: 2vh">
      <el-form-item label="账号">
        <el-input v-model="SignUpAdminParam.name" placeholder="6-16位字母或数字"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="SignUpAdminParam.nickname" placeholder="2-5位字符"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="SignUpAdminParam.password" type="password" placeholder="6-16位字母或数字"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-left: 12vw">确认注册新管理员</el-button>
  </div>
</template>

<script>
export default {
  name: "SignUpAdmin",
  data(){
    return{
      SignUpAdminParam:{
        username:'',
        nickname:'',
        password:''
      }
    }
  }
}
</script>

<style scoped>

</style>