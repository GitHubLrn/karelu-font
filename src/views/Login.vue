<template>
  <div style="display: flex;">
    <img src="../../static/img/bg6.jpg" style="position:absolute;top: 0;width: 100vw;height: 100vh;z-index: 0">
    <div style="z-index: 1;position: absolute">
      <div style="color: azure;font-family: Facon;margin-top: 36vh;font-size: 100px;margin-left: 39vw;position: absolute">KARELU</div>
      <div style="display: flex;justify-content: space-around;margin-top: 65vh;margin-left: 36vw;position: absolute">
        <el-button size="medium " @click="Login_drawer= true" type="primary" style="margin-right: 180px;font-size: 24px;background: none;border:1px solid white;color: white" plain>
          登录
        </el-button>
        <el-button size="medium " @click="signup_drawer = true" type="primary" style="margin-left: 195px;font-size: 20px;font-size: 24px;background: none;border:1px solid white;color: white" plain>
          注册
        </el-button>
      </div>
    </div>
    <el-drawer
        title=""
        :visible.sync="Login_drawer"
        direction="ltr"
        :before-close="handleClose">
      <img src="../../static/img/bg29.jpg" style="position:absolute;top: 0;filter: brightness(70%)">
      <el-form :rules="rule" ref="loginForm" :model="loginForm" class="loginContainer" style="position:absolute;z-index: 1;margin-left: 6vw;">
        <h3 style="text-align: center">Karelu</h3>
        <el-form-item prop="username">
          <el-input auto-complete="false" type="text" v-model="loginForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input auto-complete="false" type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width: 230px" auto-complete="false" type="text" v-model="loginForm.code" placeholder="点击图片更换验证码"></el-input>
          <img :src="kaptchaUrl" @click="updateKaptchaUrl" style="margin-left: 10px">
        </el-form-item>
        <div style="display: flex;justify-content: space-around">
          <el-button type="primary" style="width: 45%;margin-left: 3%" @click="login">登录</el-button>
        </div>
      </el-form>
    </el-drawer>
    <el-drawer
        :visible.sync="signup_drawer"
        direction="rtl"
        :before-close="handleClose1">
      <img src="../../static/img/bg29.jpg" style="position:absolute;top: 0;filter: brightness(70%);">
        <el-form :rules="rule2" ref="signUpForm" :model="signUpForm" class="loginContainer" style="position: absolute;margin-top: 12vh;margin-left: 5vw">
          <h3 style="text-align: center">Karelu</h3>
          <div style="display: flex;">
            <el-button>头像</el-button>
            <el-upload
                style="margin-left:15px"
                class="avatar-uploader"
                action="http://10.1.188.178:8080/user/uploadPicture"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <img v-if="iconurl" :src="iconurl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        <el-form-item prop="username" style="margin-top: 15px">
          <el-button>账号</el-button>
          <el-input auto-complete="false" type="text" v-model="signUpForm.username" placeholder="6-16位字母或数字" style="margin-left: 15px"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-button>昵称</el-button>
          <el-input auto-complete="false" type="text" v-model="signUpForm.nickname" placeholder="2-5位字符" style="margin-left: 15px"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-button>密码</el-button>
          <el-input auto-complete="false" type="password" v-model="signUpForm.password" placeholder="6-16位字母或数字" style="margin-left: 15px"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-button>验证</el-button>
          <el-input style="width: 230px;margin-left: 10px" auto-complete="false" type="text" v-model="signUpForm.code" placeholder="刷新" ></el-input>
          <img :src="kaptchaUrl" @click="updateKaptchaUrl" style="margin-left: 9px">
        </el-form-item>
        <div style="display: flex ;justify-content: space-around">
          <el-button type="primary" style="width: 45%" @click="doSignup">注册并登录</el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      iconurl:'',
      signUpForm:{
        username:'',
        password:'',
        nickname:'',
        code:'',
        icon:''
      },
      signup_drawer:false,
      Login_drawer:false,
      kaptchaUrl:'/kaptcha?time=' + new Date(),
      loginForm:{
        username:'',
        password:'',
        code:''
      },
      rule:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}],
        code:[{required:true,message:'请输入验证码',trigger:'blur'}],
      },
      rule2:{
        username:[{required:true,message:'请输入账号',trigger:'blur'}],
        nickname:[{required:true,message:'请输入昵称',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}],
        code:[{required:true,message:'请输入验证码',trigger:'blur'}]
      }
    }
  },
  methods:{
    handleClose(done) {
      done();
    },handleClose1(done) {
      done();
    },
    updateKaptchaUrl(){
      this.kaptchaUrl = '/kaptcha?time=' + new Date();
    },
    doSignup(){
      this.$refs.signUpForm.validate((valid) => {
        if (valid){
          if (this.signUpForm.username.length < 6 || this.signUpForm.username.length > 16 || this.signUpForm.username.match(/^\s*$/)){
            this.$message.info("账号不合法");
          }else if(this.signUpForm.password.length < 6 || this.signUpForm.password.length > 16 || this.signUpForm.password.match(/^\s*$/)){
            this.$message.info("密码不合法")
          }else if(this.signUpForm.nickname.length < 2 || this.signUpForm.nickname.length > 5 || this.signUpForm.nickname.match(/^\s*$/)){
            this.$message.info("昵称不合法")
          }
          else{
            this.postRequest('/user/signUp',this.signUpForm).then(resp =>{
              if (resp){
                this.loginForm.password = this.signUpForm.password;
                this.loginForm.code = this.signUpForm.code;
                this.loginForm.username = this.signUpForm.username;
                this.postRequest('/user/logIn',this.loginForm).then(resp =>{
                  if (resp){
                    const  tokenStr = resp.obj.tokenHead + resp.obj.token;
                    window.sessionStorage.setItem('tokenStr',tokenStr);
                    this.getRequest('/user/getUser').then( resp1 => {
                      if(resp1){
                        window.sessionStorage.setItem('uid',resp1.obj.id);
                        window.sessionStorage.setItem('nickname',resp1.obj.nickName);
                      }
                    })
                    setTimeout(()=>{
                      this.$router.replace('/mainPage');
                      this.$notify.success({
                        title: this.nk,
                        message: '欢迎来到Karelu',
                        offset: 60
                      })
                    },500)
                  }
                })
              }
            })
          }
        }else{
          this.$message.error('请输入所有字段');
          return false;
        }
      });
    },
    login(){
      this.$refs.loginForm.validate((valid) => {
        if (valid){
          window.sessionStorage.setItem('tokenStr','');
          this.postRequest('/user/logIn',this.loginForm).then(resp =>{
            if (resp){
              const  tokenStr = resp.obj.tokenHead + resp.obj.token;
              window.sessionStorage.setItem('tokenStr',tokenStr);
              this.getRequest('/user/getUser').then( resp1 => {
                if(resp1){
                  window.sessionStorage.setItem('uid',resp1.obj.id);
                  window.sessionStorage.setItem('nickname',resp1.obj.nickName);
                }
              })
              if(resp.obj.role == '1'){
                this.$router.replace('/mainPage');
                this.$notify.success({
                  title: this.nk,
                  message: '欢迎来到Karelu',
                  offset: 60
                })
              }else{
                this.$router.replace('/admin')
                this.$notify.success({
                  title: this.nk,
                  message: '欢迎管理员',
                  offset: 60
                })
              }
            }
          })
        }else{
          this.$message.error('请输入所有字段');
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.iconurl = 'image\\' + res.obj;
      this.signUpForm.icon = 'image\\' +  res.obj;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style>
.touming{
  opacity: 10%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  margin: 30px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.loginContainer{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto ;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: aliceblue;
    border: 1px solid azure;
    border-shadow: 0 0 25px #282323;
  }
  .el-form-item__content{
    display: flex;
  }
html,body{
  margin:0;
  padding:0;
}

</style>