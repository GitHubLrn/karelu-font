<template>
    <div class="background">
        <el-form ref="NoteParam" :model="NoteParam" class="writeNoteClass" style="border-radius: 5px">
          <div style="display: flex;position: relative">
            <h3 style="margin-left: 50px;color: #212121">分享新鲜事！</h3>
            <div style="line-height: 50px;position: absolute;right: 1.542vw">
              <el-button type="primary" @click="turnShow" :icon="handle"></el-button>
              <el-button type="primary" @click="doOutput">发布</el-button>
            </div>
          </div>
          <el-upload
              style="margin-bottom: 10px;margin-left: 1.542vw"
              v-if="isShow"
              action="http://10.1.188.178:8080/user/uploadPicture"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-form-item style="margin-right: 1.542vw;margin-left: 1.542vw">
            <el-input type="textarea" v-model="NoteParam.note"  placeholder="..." resize="none" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div style="margin-right: 1.542vw;margin-left: 1.542vw">
            <el-input placeholder="搜索内容" v-model="select.what" class="input-with-select">
              <el-select v-model="select.by" slot="prepend" style="width: 80px;" v-if="select.by2 == 1">
                <el-option label="最新" value="1"></el-option>
                <el-option label="最热" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
            </el-input>
          </div>
        </el-form>
      <div style="width: 58.6vw;margin: 0 auto;padding: 30px;border-radius: 5px"class="maoboli">
        <el-menu :default-active="activeMenu" class="el-menu-demo" mode="horizontal" style="display: flex;justify-content: space-around;border-radius: 5px">
          <el-menu-item index="1" @click="CN">最新动态</el-menu-item>
          <el-menu-item index="2" @click="CH">今日最热</el-menu-item>
          <el-menu-item index="3" @click="CF">我关注的</el-menu-item>
        </el-menu>
        <el-row style="margin-left: 0vw" v-infinite-scroll="loadnewPage">
          <el-col :span="24" v-for="(item,index) in NotesInfo.data" :key="index" style="margin-top: 10px">
            <div>
              <el-card :body-style="{ padding: '0px' }" class="maoboli">
                <div style="display:flex;margin-left: 20px;margin-top: 10px" >
                  <el-popover
                      style="position: relative"
                      placement="right-start"
                      width="200"
                      @mouseover.native="getCardInfo(item.username)"
                      trigger="hover">
                    <div>{{item.username}}<el-button style="position: absolute;right: 5px" plain @click="doFocus" :type="cardInfo.isfocused[0]">
                      {{cardInfo.isfocused[1]}}</el-button></div>
                    <div>关注  {{cardInfo.focuscount}}   粉丝  {{cardInfo.befocusedcount}}</div>
                    <div>{{cardInfo.signature}}</div>
                    <el-button slot="reference" style="border:none;background:none" ><img :src="(item.icon)" class="image" style="width: 50px;height: 50px">
                    </el-button>
                  </el-popover>
                  <h3 style="margin-left: 20px">{{item.username}}</h3>
                  <span style="line-height:70px;margin-left: 20px;font-size: 6px;color: #8c939d ">{{item.date}}</span>
                  <div style="right: 10px;position: absolute;right: 2vw">
                    <el-button slot="reference" v-if="nk != item.username" @click="doReport(item.noteid)" plain style="margin-right: 10px">举报</el-button>
                    <el-button icon="el-icon-delete" v-if="nk == item.username" @click="deleteNote(item.noteid,index)" plain></el-button>
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
                  <el-col :span="20" v-for="(comment,cindex) in item.comment" style="margin-top: 10px" :key="cindex">
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
                          <el-button icon="el-icon-delete" v-if="nk == comment.nickname" @click="deleteComment(comment.commentid,index,cindex)" plain></el-button>
<!--                          <el-button :icon="comment.seeReply" plain @click="seeReplys(index,cindex)"></el-button>-->
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
                  <el-col :span="20" style="margin-top: 10px; display: flex;justify-content: space-around">
                    <el-card :body-style="{ padding: '20px' }">
                      <el-input type="textarea" placeholder="发表评论~" v-model="commentParam.commentthing" resize="none" style="width: 30vw;"></el-input>
                      <el-button style="margin-left: 30px;margin-bottom: 6px" @click="doComment(item.noteid,index)">评论</el-button>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 20px"></div>
    </div>
</template>

<script>
import {Things} from "@/common/const/globalConst";

export default {
  name: "Square",
  data(){
    return{
      page:2,
      reportParam:{
        uid:0,
        noteid:0
      },
      activeMenu:'1',
      replyParam:{
        noteid:0,
        userid:0,
        commentthing:'',
        fatherid:0
      },
      select:{
        by:'1',
        by2:'1',
        what:''
      },
      commentParam:{
        noteid:0,
        userid:0,
        commentthing:'',
        fatherid:0
      },
      handle:'el-icon-picture-outline',
      isShow:false,
      uid:'',
      NoteParam:{
        userid:'',
        note:'',
        imagesUrl:'',
        deleteImg:'',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      doGoodParam:{
        noteid:0,
        userid:0
      },
      cancleGoodParam:{
        noteid:0,
        userid:0
      },
      cardInfo:{
        un:'',
        uid:0,
        isfocused:[
            '',
            ''
        ]
      },
      nk: window.sessionStorage.getItem('nickname'),
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
      focusParam:{
        userid:'',
        focusedid:''
      }
    }
  },
  methods:{
    loadnewPage() {
      let a = this;
      setTimeout(function (){
        if (a.activeMenu == '1' && a.page < 10) {
          a.getRequest('/note/getNotesByPage?currentPage=' + a.page).then(resp => {
            if (resp) {
              for (let i = 0; i < resp.data.length; i++) {
                a.NotesInfo.data.push(resp.data[i]);
              }
            }
          })
          a.page += 1;
        } else if (a.activeMenu == '2' && a.page < 10) {
          a.getRequest('/note/getNotesByPageByHot?currentPage=' + a.page).then(resp => {
            if (resp) {
              for (let i = 0; i < resp.data.length; i++) {
                a.NotesInfo.data.push(resp.data[i]);
              }
            }
          })
          a.page += 1;
        } else if (a.activeMenu == '3' && a.page < 10) {
          a.getRequest('/note/getFocusNotesByPage?currentPage=' + a.page).then(resp => {
            if (resp) {
              for (let i = 0; i < resp.data.length; i++) {
                a.NotesInfo.data.push(resp.data[i]);
              }
            }
          })
          a.page += 1;
        }
      })
    },
    doReport(nid){
      this.reportParam.noteid = nid;
      this.reportParam.uid = window.sessionStorage.getItem('uid');
      this.postRequest('/report/doReport',this.reportParam).then(resp =>{
        if(resp){

        }
      })
    },
    doSearch(){
      this.activeMenu = '4'
        if (this.select.by == 1){
          this.getRequest('/note/getTargetNewNotesByPage?target=' + this.select.what).then(resp => {
            if(resp){
              this.NotesInfo.total = resp.total;
              this.NotesInfo.data = resp.data;
              if(resp.total == 0){
                this.$message.info("没有相关内容( ╯□╰ )~");
              }
              this.select.what = '';
            }
          })
        }else{
          this.getRequest('/note/getTargetHotNotesByPage?target=' + this.select.what).then(resp => {
            if(resp){
              this.NotesInfo.total = resp.total;
              this.NotesInfo.data = resp.data;
              if(resp.total == 0){
                this.$message.info("没有相关内容( ╯□╰ )~");
              }
            }
          })
        }
    },
    seeReplys(idx,cidx){
      if (this.NotesInfo.data[idx].comment[cidx].seeReply == 'el-icon-chat-line-round'){
        this.NotesInfo.data[idx].comment[cidx].seeReply = 'el-icon-circle-close';
      }else{
        this.NotesInfo.data[idx].comment[cidx].seeReply = 'el-icon-chat-line-round';
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
            this.getRequest('/note/getNotesByPage').then(resp => {
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
        console.log(this.cardInfo.isfocused[1]);
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
    CN(){
      this.getRequest('/note/getNotesByPage').then(resp => {
        if(resp){
          this.NotesInfo.total = resp.total;
          this.NotesInfo.data = resp.data;
          this.activeMenu = '1';
          this.page = 2;
        }
      })
    },
    CH(){
      this.getRequest('/note/getNotesByPageByHot').then(resp => {
        if(resp){
          this.NotesInfo.total = resp.total;
          this.NotesInfo.data = resp.data;
          this.activeMenu = '2';
          this.page = 2;
        }
      })
    },
    CF(){
      this.getRequest('/note/getFocusNotesByPage').then(resp => {
        if(resp){
          this.NotesInfo.total = resp.total;
          this.NotesInfo.data = resp.data;
          this.activeMenu = '3';
          this.page = 2;
        }
      })
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
            this.getRequest('/note/getNotesByPage').then(resp => {
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
    seeComment(cc,index){
      if(cc =='el-icon-chat-dot-round'){
        this.NotesInfo.data[index].commentChoice = 'el-icon-circle-close';
      }else{
        this.NotesInfo.data[index].commentChoice = 'el-icon-chat-dot-round';
      }
    },
    doOutput(){
      this.NoteParam.userid = window.sessionStorage.getItem('uid');
      if(this.NoteParam.note.match(/^\s*$/) && this.NoteParam.imagesUrl.length == this.NoteParam.deleteImg.length){
        this.$message.info("发布内容不能为空！");
      }else{
        this.postRequest('/note/writeNote',this.NoteParam).then(resp => {
          if (resp){
            this.isShow = false;
            this.NoteParam.note = '';
            this.NoteParam.imagesUrl = '';
            this.NoteParam.deleteImg = '';
            this.handle = 'el-icon-picture-outline';
            this.getRequest('/note/getNotesByPage?currentPage='+1).then(resp1 =>{
              if(resp1){
                this.NotesInfo.total = resp1.total;
                this.NotesInfo.data = resp1.data;
              }
            })
          }
        })
      }
    },
    turnShow(){
      if (this.handle == 'el-icon-picture-outline'){
        this.isShow = true;
        this.handle = 'el-icon-circle-close';
      }else{
        this.isShow = false;
        this.handle = 'el-icon-picture-outline';
      }
    },
    handleAvatarSuccess(res) {
      this.NoteParam.imagesUrl += 'image\\' + res.obj + ';';
    },
    handleRemove(file) {
      this.NoteParam.deleteImg += 'image\\' + file.response.obj + ';';
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
    this.getRequest('/note/getNotesByPage').then(resp => {
      if(resp){
        this.NotesInfo.total = resp.total;
        this.NotesInfo.data = resp.data;
      }
    })
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
.maoboli2::before{
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: -1;
  filter: blur(50px);
  margin: -20px;
  background-size: cover;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.writeNoteClass{
  margin: 10px auto ;
  width: 60vw;
  padding: 15px 15px 15px 15px;
  background: #F5F5F5;
  border-shadow: 0 0 25px #282323;
}
.background{
  background-image: url("../../../static/img/bg44.jpg");
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