<template>
  <div class="background">
    <el-container style="width: 70vw;margin-left: 15vw;margin-top: 20px">
      <el-aside width="300px">
        <el-menu
            active-text-color="black"
            style="padding: 20px;border-radius: 5px"
            class="el-menu-vertical-demo maoboli">
          <img :src.sync="UserInfo.icon" style="width: 200px;height: 200px;margin-left: 30px;border-radius: 5px">
          <h3 style="color: #282323;text-align: center">{{UserInfo.nickName}}</h3>
          <div style="word-break: break-all;text-align: center">{{qianming}}</div>
          <el-menu-item class="maoboli" style="border-radius: 5px;margin-top: 20px;text-align: center" @click="SMD">我的动态</el-menu-item>
          <el-menu-item class="maoboli" style="border-radius: 5px;margin-top: 20px;text-align: center;" @click="SI">维护信息</el-menu-item>
          <el-menu-item class="maoboli" style="border-radius: 5px;margin-top: 20px;text-align: center" @click="SFO">我的关注</el-menu-item>
          <el-menu-item class="maoboli" style="border-radius: 5px;margin-top: 20px;text-align: center" @click="SFA">我的粉丝</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="margin: 0;padding: 0;margin-left: 15px">
        <div v-if="choice == 1" class="maoboli" style="border-radius: 5px;padding-bottom: 30px">
          <h2 style="text-align: center;margin: 0;padding: 0;padding-top: 15px">我的动态</h2>
          <div class="maoboli" v-if="NotesInfo.data.length == 0" style="text-align: center;margin-top: 30px;width: 45vw;margin-left: 4vw;font-size: 24px">你还没有任何动态哟</div>
          <el-row style="margin-left: 4vw">
            <el-col :span="22" v-for="(item,index) in NotesInfo.data" :key="index" style="margin-top: 10px">
              <div>
                <el-card :body-style="{ padding: '0px' }" class="maoboli">
                  <div style="display:flex;margin-left: 20px;margin-top: 10px" >
                    <img :src="(item.icon)" class="image" style="width: 50px;height: 50px">
                    <h3 style="margin-left: 20px">{{item.username}}</h3>
                    <span style="line-height:70px;margin-left: 20px;font-size: 6px;color: #8c939d ">{{item.date}}</span>
                    <div style="position: absolute;right: 5vw">
                      <el-button icon="el-icon-delete" @click="deleteNote(item.noteid,index)" plain></el-button>
                      <el-button :type="item.beGooded" icon="el-icon-star-off" @click="doGood(item.noteid,item.beGooded,index)" plain>{{item.goodcount}}</el-button>
                      <el-button :icon="item.commentChoice" plain @click="seeComment(item.commentChoice,index)">{{item.commentCount}}</el-button>
                    </div>
                  </div>
                  <div style="padding-bottom:10px;margin-left: 40px;word-break: break-all;white-space: pre-wrap">{{item.note}}</div>
                  <div style="margin-left: 20px;padding-bottom: 10px;">
                    <el-image
                        v-for="url in item.images"
                        v-if="url != ''"
                        style="width: 258px; height: 258px;margin-top: 10px;margin-left: 10px"
                        :src="(url)"
                        :preview-src-list="item.images">
                    </el-image>
                  </div>
                  <el-row style="margin-left: 10vw;padding-bottom: 15px" v-if="item.commentChoice == 'el-icon-circle-close'" class="maoboli2">
                    <h3>评论区  ( {{item.commentCount}} )</h3>
                    <el-col :span="19" v-for="(comment,cindex) in item.comment" style="margin-top: 10px" :key="cindex">
                      <el-card :body-style="{ padding: '0px' }">
                        <div style="display:flex;margin-left: 20px;margin-top: 15px">
                          <el-popover
                              style="position: relative"
                              placement="right-start"
                              width="200"
                              @mouseover.native="getCardInfo(comment.nickname)"
                              trigger="hover">
                            <div>{{comment.nickname}}
                              <el-button style="position: absolute;right: 5px" plain @click="doFocus" :type="cardInfo.isfocused[0]">
                                {{cardInfo.isfocused[1]}}
                              </el-button>
                            </div>
                            <div>关注  {{cardInfo.focuscount}}   粉丝  {{cardInfo.befocusedcount}}</div>
                            <div>{{cardInfo.signature}}</div>
                            <el-button slot="reference" style="border:none"><img :src="comment.iconrul" class="image" style="width: 50px;height: 50px">
                            </el-button>
                          </el-popover>
                          <h3 style="margin-left: 20px">{{comment.nickname}}</h3>
                          <span style="line-height:70px;margin-left: 20px;font-size: 6px;color: #8c939d ">{{comment.createdate}}</span>
                          <div style="right: 10px;position: absolute;right: 10vw">
                            <el-button icon="el-icon-delete" v-if="UserInfo.nickName == comment.nickname" @click="deleteComment(comment.commentid,index,cindex)" plain></el-button>
                            <el-button :icon="comment.seeReply" plain @click="seeReplys(index,cindex)"></el-button>
                          </div>
                        </div>
                        <div style="padding-bottom:10px;margin-left: 30px;word-break: break-all;margin-right: 20px">
                          {{comment.commentthing}}
                        </div>
                      </el-card>
                      <el-card :body-style="{ padding: '20px' }" v-if="comment.seeReply == 'el-icon-circle-close'" style="display: flex;justify-content: space-around">
                        <el-input type="textarea" placeholder="回复~" v-model="replyParam.commentthing" resize="none" style="width: 25vw"></el-input>
                        <el-button style="margin-left: 30px;margin-bottom: 6px" @click="doReply(comment.commentid,item.noteid,index,cindex)">回复</el-button>
                      </el-card>
                    </el-col>
                    <el-col :span="19" style="margin-top: 10px; display: flex;justify-content: space-around">
                      <el-card :body-style="{ padding: '20px' }">
                        <el-input type="textarea" placeholder="发表评论~" v-model="commentParam.commentthing" resize="none" style="width: 20.5vw;"></el-input>
                        <el-button style="margin-left: 30px;margin-bottom: 6px" @click="doComment(item.noteid,index)">评论</el-button>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="maoboli" style="border-radius: 5px;padding-bottom: 30px" v-if="choice == 4">
          <h2 style="text-align: center;margin:0;padding: 0;padding-top: 15px">维护信息</h2>
          <div class="maoboli" style="padding: 15px;width: 45vw;border-radius: 5px;margin-top: 15px;margin-left: 3.7vw;">
            <div style="display: flex">
              <div style="line-height: 93px;font-weight: bold;margin-left: 20px">修改头像</div>
              <el-upload
                  style="margin-left:50px;"
                  class="avatar-uploader"
                  action="http://10.1.188.178:8080/user/uploadPicture"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                <img v-if="iconUpload.url" :src="iconUpload.url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button style="height: 50px;margin-top: 18px;margin-left: 50px" @click="changeicon">确认修改</el-button>
              </div>
              <div style="border: 1px dashed gray"></div>
              <div style="display: flex">
                <div style="line-height: 93px;font-weight: bold;margin-left: 20px">修改昵称</div>
                <el-input style="width: 220px;margin-left: 50px;margin-top: 25px" placeholder="请输入新的昵称，2~5位字符" v-model="newnickname.name"></el-input>
                <el-button style="height: 50px;margin-top: 22px;margin-left: 50px" @click="changenickname">确认修改</el-button>
              </div>
              <div style="border: 1px dashed gray"></div>
            <div style="display: flex">
              <div style="line-height: 93px;font-weight: bold;margin-left: 20px">修改签名</div>
              <el-input style="width: 24vw;margin-left: 50px;margin-top: 18px;margin-bottom: 18px" type="textarea" v-model="updateSignature.signature"  placeholder="请输入新的签名" resize="none" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
              <el-button style="height: 50px;margin-top: 22px;margin-left: 50px" @click="doupdateSignature">确认修改</el-button>
            </div>
            <div style="border: 1px dashed gray"></div>
            <div style="display: flex">
              <div style="line-height: 93px;font-weight: bold;margin-left: 20px">修改密码</div>
              <el-input style="width: 11vw;margin-left: 50px;margin-top: 28px" placeholder="请输入旧密码" v-model="changepassword.oldpassword" type="password"></el-input>
              <el-input style="width: 11vw;margin-left: 2vw;margin-top: 28px" placeholder="请输入新的密码" v-model="changepassword.newpassword" type="password"></el-input>
              <el-button style="height: 50px;margin-top: 22px;margin-left: 50px" @click="DoChangePassword">确认修改</el-button>
            </div>
            </div>
          </div>
        <div class="maoboli" style="border-radius: 5px;padding-bottom: 30px" v-if="choice == 2">
          <h2 style="text-align: center;margin:0;padding: 0;padding-top: 15px">我的关注</h2>
          <div class="maoboli" style="padding: 15px;width: 45vw;border-radius: 5px;margin-top: 15px;margin-left: 3.7vw;">
            <div>
              <div v-if="FocusInfo.length == 0" style="text-align: center">你还没有任何关注的人哟</div>
              <el-card v-for="(item,index) in FocusInfo" :key="index">
                <div style="display: flex">
                  <img :src="item.icon" style="width: 5.5vw;height: 5.5vw">
                  <div style="font-size: 20px;font-weight:bold;margin-left: 40px">{{item.nickname}}</div>
                  <div style="position: absolute;margin-left: 7.5vw;margin-top: 40px;width: 15vw;word-break: break-all">{{item.signature}}</div>
                  <div style="position: absolute;margin-left: 24vw;font-weight: bold">关注数  {{item.focus}}</div>
                  <div style="position: absolute;margin-left: 24vw;font-weight: bold;margin-top: 40px">粉丝数  {{item.fans}}</div>
                  <div style="position: absolute;margin-left: 24vw;font-weight: bold;margin-top: 80px">动态数   {{item.notes}}</div>
                  <el-button style="position: absolute;margin-left: 33vw;margin-top: 30px" @click="cancleFocus(item.uid,index)">取消关注</el-button>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <div class="maoboli" style="border-radius: 5px;padding-bottom: 30px" v-if="choice == 3">
          <h2 style="text-align: center;margin:0;padding: 0;padding-top: 15px">我的粉丝</h2>
          <div class="maoboli" style="padding: 15px;width: 45vw;border-radius: 5px;margin-top: 15px;margin-left: 3.7vw;">
            <el-card v-for="(item,index) in FansInfo" :key="index">
              <div style="display: flex">
                <img :src="item.icon" style="width: 5.5vw;height: 5.5vw">
                <div style="font-size: 20px;font-weight:bold;margin-left: 40px">{{item.nickname}}</div>
                <div style="position: absolute;margin-left: 7.5vw;margin-top: 40px;width: 250px;word-break: break-all">{{item.signature}}</div>
                <div style="position: absolute;margin-left: 24vw;font-weight: bold">关注数  {{item.focus}}</div>
                <div style="position: absolute;margin-left: 24vw;font-weight: bold;margin-top: 40px">粉丝数  {{item.fans}}</div>
                <div style="position: absolute;margin-left: 24vw;font-weight: bold;margin-top: 80px">动态数  {{item.notes}}</div>
                <el-button style="position: absolute;margin-left: 33vw;margin-top: 30px" @click="doFans(item.uid,item.focustoo,index)">{{item.focustoo}}</el-button>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {Things} from "@/common/const/globalConst";

export default {
  name: "UserCenter",
  data(){
    return{
      replyParam:{
        noteid:0,
        userid:0,
        commentthing:'',
        fatherid:0
      },
      NotesInfo:{
        total:0,
        data:[
          {
            images:'',
            comment:[{
              seeReply:''
            }]
          }
        ]
      },
      FansInfo:[],
      FocusInfo:[],
      changepassword:{
        newpassword:'',
        oldpassword:'',
        uid:''
      },
      updateSignature:{
        signature:'',
        uid:'',
      },
      doGoodParam:{
        noteid:0,
        userid:0
      },
      cancleGoodParam:{
        noteid:0,
        userid:0
      },
      qianming:'',
      newnickname:{
        name:'',
        uid:''
      },
      iconUpload:{
        url:'',
        uid:''
      },
      choice:1,
      UserInfo:{

      },
      focusParam:{
        userid:'',
        focusedid:''
      },
      cardInfo:{
        un:'',
        uid:0,
        isfocused:[
          '',
          ''
        ]
      },
      commentParam:{
        noteid:0,
        userid:0,
        commentthing:'',
        fatherid:0
      },
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
    this.getRequest('/note/getMyNotes').then(resp => {
      this.NotesInfo = resp;
    })
    this.getRequest('/user/getMyFans').then(resp => {
      this.FansInfo = resp.obj;
    })
    this.getRequest('/user/getMyFocus').then(resp => {
      this.FocusInfo = resp.obj;
    })
    this.getRequest('/user/getUser').then(resp =>{
      this.UserInfo = resp.obj;
    })
    this.getRequest('/signature/getSignature?uid=' + window.sessionStorage.getItem('uid')).then(resp => {
      this.qianming += resp.obj;
    })
  },
  methods:{
    seeReplys(idx,cidx){
      if (this.NotesInfo.data[idx].comment[cidx].seeReply == 'el-icon-chat-line-round'){
        this.NotesInfo.data[idx].comment[cidx].seeReply = 'el-icon-circle-close';
      }else{
        this.NotesInfo.data[idx].comment[cidx].seeReply = 'el-icon-chat-line-round';
      }
    },
    deleteComment(cid,index,cindex){
      this.postRequest('/comment/delComment?id=' + cid).then(resp => {
        if(resp){
          this.NotesInfo.data[index].comment.splice(cindex,1);
          this.NotesInfo.data[index].commentCount --;
        }
      })
    },
    doComment(nid,index){
      this.commentParam.fatherid = 0;
      this.commentParam.noteid = nid;
      this.commentParam.userid = window.sessionStorage.getItem('uid');
      if(!this.commentParam.commentthing.match(/^\s*$/)){
        this.postRequest('/comment/doComment',this.commentParam).then(resp =>{
          if(resp){
            this.commentParam.commentthing = '';
            this.getRequest('/note/getMyNotes').then(resp => {
              if(resp){
                this.NotesInfo.total = resp.total;
                this.NotesInfo.data = resp.data;
                this.NotesInfo.data[index].commentChoice ='el-icon-circle-close';
              }
            })
          }
        })
      }else{
        this.$message.info('不能发送空评论哟~');
      }
    },
    doFocus(){
      if(this.cardInfo.isfocused[1] == '关注') {
        this.focusParam.userid = window.sessionStorage.getItem('uid');
        this.focusParam.focusedid = this.cardInfo.uid;
        if (this.focusParam.focusedid == this.focusParam.userid){
          this.$message.error("不能关注自己哟~");
        }else{
          this.postRequest('/focus/addFocus', this.focusParam).then(resp => {
            if (resp) {
              this.cardInfo.befocusedcount++;
              this.cardInfo.isfocused[0] = 'danger';
              this.cardInfo.isfocused[1] = '已关注';
            }
          })
        }
      }else{
        this.focusParam.userid = window.sessionStorage.getItem('uid');
        this.focusParam.focusedid = this.cardInfo.uid;
        this.postRequest('/focus/delFocus', this.focusParam).then(resp => {
          this.cardInfo.befocusedcount --;
          this.cardInfo.isfocused[0] = null;
          this.cardInfo.isfocused[1] = '关注';
        })
      }
    },
    getCardInfo(username){
      if(this.cardInfo.un != username){
        this.getRequest('/user/getCardInfo?username=' + username).then(resp => {
          if(resp){
            this.cardInfo = resp.obj;
          }
        })
      }
    },
    doReply(cid,nid,idx,cidx){
      this.replyParam.fatherid = cid;
      this.replyParam.noteid = nid;
      this.replyParam.userid = window.sessionStorage.getItem('uid');
      if(!this.replyParam.commentthing.match(/^\s*$/)){
        this.postRequest('/comment/doComment',this.replyParam).then(resp =>{
          if(resp){
            this.replyParam.commentthing = '';
            this.getRequest('/note/getMyNotes').then(resp => {
              if(resp){
                this.NotesInfo.total = resp.total;
                this.NotesInfo.data = resp.data;
                this.NotesInfo.data[idx].commentChoice ='el-icon-circle-close';
                this.NotesInfo.data[idx].comment[cidx].seeReply = 'el-icon-chat-line-round';
              }
            })
          }
        })
      }else{
        this.$message.info("不能发送空回复哟~");
      }
    },
    deleteNote(id,index){
      this.$confirm('确定删除动态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/note/delNote?id=' + id).then(resp => {
          if(resp){
            this.NotesInfo.data.splice(index,1)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    seeComment(cc,index){
      console.log("123")
      if(cc =='el-icon-chat-dot-round'){
        this.NotesInfo.data[index].commentChoice = 'el-icon-circle-close';
      }else{
        this.NotesInfo.data[index].commentChoice = 'el-icon-chat-dot-round';
      }
    },
    doGood(nid,bg,index){
      if (bg == ''){
        this.doGoodParam.noteid = nid;
        this.doGoodParam.userid = window.sessionStorage.getItem('uid');
        this.postRequest('/good/dogood',this.doGoodParam).then(resp => {
          this.NotesInfo.data[index].goodcount ++;
          this.NotesInfo.data[index].beGooded = 'danger';
        })
      }else{
        this.cancleGoodParam.noteid = nid;
        this.cancleGoodParam.userid = window.sessionStorage.getItem('uid');
        this.deleteRequest('/good/canclegood',this.cancleGoodParam).then(resp =>{
          if(resp){
            this.NotesInfo.data[index].goodcount --;
            this.NotesInfo.data[index].beGooded = '';
          }
        })
      }
    },
    SMD(){
      this.choice = 1;
    },
    doFans(uid,focustoo,idx){
      if(focustoo == '点击回关'){
        this.focusParam.focusedid = uid;
        this.focusParam.userid =  window.sessionStorage.getItem('uid');
        this.postRequest('/focus/addFocus',this.focusParam).then(resp => {
          this.FansInfo[idx].focustoo = '点击取关';
        })
      }else{
        this.postRequest('/focus/delFocus',this.focusParam).then(resp => {
          this.FansInfo[idx].focustoo = '点击回关';
        })
      }
    },
    cancleFocus(uid,idx){
      this.focusParam.userid = window.sessionStorage.getItem('uid');
      this.focusParam.focusedid = uid;
      this.postRequest('/focus/delFocus',this.focusParam).then(resp =>{
        this.FocusInfo.splice(idx,1);
      })
    },
    DoChangePassword(){
      if(this.changepassword.newpassword.length<6 || this.changepassword.newpassword.length > 16|| this.signUpForm.password.match(/^\s*$/)){
        this.$message.info("密码不合法");
      }else{
        this.changepassword.uid = window.sessionStorage.getItem('uid');
        this.postRequest('/user/changePassword',this.changepassword).then(resp =>{
          if(resp.message == '更新密码成功'){
            window.sessionStorage.removeItem('uid');
            window.sessionStorage.removeItem('nickname');
            window.sessionStorage.removeItem('tokenStr');
            this.$router.replace('/');
          }
        })
      }
    },
    doupdateSignature(){
      if (this.updateSignature.signature.match(/^\s*$/)){
        this.$message.info("签名不合法");
      }else{
        this.updateSignature.uid = window.sessionStorage.getItem('uid');
        this.postRequest('/user/changeSignature',this.updateSignature).then(resp => {
          location.reload();
        })
      }
    },
    changenickname(){
      if (this.newnickname.name.length < 2 || this.newnickname.name.length > 5 || this.newnickname.name.match(/^\s*$/)) {
        this.$message.info("昵称不合法");
      }else{
        this.newnickname.uid = window.sessionStorage.getItem('uid');
        this.postRequest('/user/changenickname',this.newnickname).then(resp =>{
          location.reload();
        })
      }
    },
    changeicon(){
      if (this.iconUpload.url == ''){
        this.$message.info("请先选择一个新的头像");
      }else{
        this.iconUpload.uid = window.sessionStorage.getItem('uid');
        this.postRequest('/user/changeicon',this.iconUpload).then(resp =>{
          location.reload();
        })
      }
    },
    SI(){
      this.choice = 4;
    },
    SFO(){
      this.choice = 2;
      this.getRequest('/user/getMyFocus').then(resp => {
        this.FocusInfo = resp.obj;
      })
    },
    SFA(){
      this.choice = 3;
      this.getRequest('/user/getMyFans').then(resp => {
        this.FansInfo = resp.obj;
      })
    },
    handleAvatarSuccess(res, file) {
      this.iconUpload.url = 'image' +'\\' +  res.obj;
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
<style scoped>
.maoboli{
  text-shadow: 0 1px 1px hsla(0,0%,100%,.3);
  background: hsla(0,0%,90%,.7);
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
  background-image: url("../../../static/img/bg42.jpg");
  overflow: scroll;
  width: 100%;
  height: 100vh;
  padding-top: 75px;
  position: absolute;
  z-index: 0;
  background-attachment: fixed;
  background-size: 100% auto;
}
</style>