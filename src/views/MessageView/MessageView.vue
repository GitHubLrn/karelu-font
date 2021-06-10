<template>
  <div class="background">
    <div class="maoboli" style="width: 70vw;height: 70vh;padding: 30px;border-radius: 15px;margin-left: 13vw;margin-top: 5vh;border: 2px solid gray">
      <el-container>
        <el-aside style="width: 15vw">
          <div class="maoboli" style="height: 70vh;border-radius: 15px;border: 2px solid gray">
            <div class="maoboli" style="border: 2px solid gray;height: 15vh;border-radius: 15px;width: 13vw;margin-left: 1vw;position: absolute;margin-top: 2vh;display: flex;line-height: 15vh;font-weight: bold;font-size: 20px;">
              <img :src="user.icon" style="width: 9vh;height: 9vh;margin-left: 1vw;margin-top: 3vh">
              <div style="margin-left: 1vw">{{ user.name }}</div>
            </div>
            <div class="maoboli" style="height: 49vh;border-radius: 15px;width: 13vw;margin-left: 1vw;position: absolute;margin-top: 19vh;border: 2px solid gray">
              <div class="haoyou maoboli" style="height: 47vh;margin-top: 1vh;width: 12vw;padding-left: 0.5vw">
                <el-collapse v-model="activeNames" style="">
                  <el-collapse-item title="消息列表" name="1">
                    <div class="maoboli" style="height: 9vh;border-radius: 15px;width: 10vw;margin-left: 1vw;display: flex;line-height: 9vh;font-weight: bold;font-size: 10px;margin-bottom: 5px" v-for="(item,index) in newInfolist" :key="index" @click="getInfonew(item.uid,index,item.icon,item.nickname)">
                      <img :src="item.icon" style="width: 7vh;height: 7vh;margin-left: 1vw;margin-top: 1vh">
                      <div style="margin-left: 1vw">{{ item.nickname }}</div>
                      <el-badge :value="newinfo[item.uid]" :max="99" class="item" v-if="newinfo[item.uid] > 0">
                      </el-badge>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="我的关注" name="2">
                    <div class="maoboli" style="height: 9vh;border-radius: 15px;width: 10vw;margin-left: 1vw;display: flex;line-height: 9vh;font-weight: bold;font-size: 14px;margin-bottom: 5px" v-for="(item,index) in focuslist" :key="index" @click="getInfonew(item.uid,index,item.icon,item.nickname)">
                      <img :src="item.icon" style="width: 7vh;height: 7vh;margin-left: 1vw;margin-top: 1vh">
                      <div style="margin-left: 1vw">{{ item.nickname }}</div>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title=" 我的粉丝" name="3">
                    <div class="maoboli" style="height: 9vh;border-radius: 15px;width: 10vw;margin-left: 1vw;display: flex;margin-bottom:5px;line-height: 9vh;font-weight: bold;font-size: 14px;" v-for="(item,index) in fanslist" :key="index" @click="getInfonew(item.uid,index,item.icon,item.nickname)">
                      <img :src="item.icon" style="width: 7vh;height: 7vh;margin-left: 1vw;margin-top: 1vh">
                      <div style="margin-left: 1vw">{{item.nickname}}</div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main style="padding-top: 0;padding-right: 0">
          <div class="maoboli" style="height: 70vh;border-radius: 15px;border: 2px solid gray">
            <div style="display: flex">
              <img :src="toicon" v-if="toicon != ''" style="width: 3vw;height: 3vw;margin-left: 1vw;margin-top: 1vh;border-radius: 3px">
              <div style="font-size: 24px;font-weight: bold;line-height: 3vw;margin-left: 1vw;margin-top: 1vh">{{toname}}</div>
            </div>
            <div class="maoboli" style="height: 66vh;border-radius: 15px;width: 52vw;margin-left: 1vw;position: absolute;margin-top: 1vh;" v-if="touid == 0">
              <div style="font-weight: bold;font-size: 24px;text-align: center;margin-top: 30vh">
                快选择一个会话窗口开始聊天吧~
              </div>
            </div>
            <div class="maoboli" style="height: 44vh;border-radius: 15px;width: 52vw;margin-left: 1vw;position: absolute;margin-top: 1vh;overflow: scroll;border: 2px solid gray" id="chatView" v-if="touid != 0">
                <div v-for="item in infoshowlist" style="margin-left: 1vw;margin-top: 2vh" >
                  <div v-if="item.usersentid == touid" style="width: 50vw;display: flex">
                    <div style="word-break: break-all;font-size: 24px;line-height: 7vh;width: 45vw;margin-left: 6vw">{{item.chatthing}}</div>
                    <img :src="toicon" style="position:absolute;width: 5vh;height: 5vh;margin-top: 1vh;margin-left: 1vw">
                  </div>
                  <div v-if="item.usersentid != touid" style="width: 50vw;display: flex;">
                    <div style="word-break: break-all;font-size: 24px;line-height: 7vh;width: 45vw;right: 1vw;text-align: right;">{{item.chatthing}}</div>
                    <img :src="user.icon" style="position:absolute;width: 5vh;height: 5vh;margin-top: 1vh;margin-left: 46vw">
                  </div>
                </div>
            </div>
            <div v-if="touid != 0" class="maoboli" style="height: 15vh;border-radius: 15px;width: 52vw;margin-left: 1vw;position: absolute;margin-top: 46vh;border: 2px solid gray">
              <div style="position: absolute;height: 12vh">
                <el-popover
                    placement="left"
                    title="表情"
                    width="350"
                    trigger="click"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                  <div class="emotionList">
                    <a href="javascript:void(0);" @click="getEmo(index)" v-for="(item,index) in faceList" :key="index" class="emotionItem">{{item}}</a>
                  </div>
                  <el-button
                      style="margin-bottom: 2.5vh;margin-left: 1vw;"
                      class="emotionSelect"
                      icon="iconfont icon-biaoqing"
                      slot="reference">
                    <img src="../../../static/img/bq1.png">
                  </el-button>
                </el-popover>
                <el-input type="textarea" style="width: 38vw;margin-left: 1vw;margin-top: 1vh" rows="5" resize="none" v-model="doChatParam.chatthing" id="textarea"  @keyup.enter.native="dochat"></el-input>
              </div>
              <el-button style="margin-top: 3vh;position: absolute;right: 1vw;height: 9vh;font-size: 24px" @click="dochat">发送</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import {Things} from "@/common/const/globalConst";

export default {
  name: "Message",
  data(){
    return{
      faceList:[],
      emoji:[
        {
          "codes": "1F600",
          "char": "😀",
          "name": "grinning face"
        },
        {
          "codes": "1F603",
          "char": "😃",
          "name": "grinning face with big eyes"
        },
        {
          "codes": "1F604",
          "char": "😄",
          "name": "grinning face with smiling eyes"
        },
        {
          "codes": "1F601",
          "char": "😁",
          "name": "beaming face with smiling eyes"
        },
        {
          "codes": "1F606",
          "char": "😆",
          "name": "grinning squinting face"
        },
        {
          "codes": "1F605",
          "char": "😅",
          "name": "grinning face with sweat"
        },
        {
          "codes": "1F923",
          "char": "🤣",
          "name": "rolling on the floor laughing"
        },
        {
          "codes": "1F602",
          "char": "😂",
          "name": "face with tears of joy"
        },
        {
          "codes": "1F642",
          "char": "🙂",
          "name": "slightly smiling face"
        },
        {
          "codes": "1F643",
          "char": "🙃",
          "name": "upside-down face"
        },
        {
          "codes": "1F609",
          "char": "😉",
          "name": "winking face"
        },
        {
          "codes": "1F60A",
          "char": "😊",
          "name": "smiling face with smiling eyes"
        },
        {
          "codes": "1F607",
          "char": "😇",
          "name": "smiling face with halo"
        },
        {
          "codes": "1F970",
          "char": "🥰",
          "name": "smiling face with hearts"
        },
        {
          "codes": "1F60D",
          "char": "😍",
          "name": "smiling face with heart-eyes"
        },
        {
          "codes": "1F929",
          "char": "🤩",
          "name": "star-struck"
        },
        {
          "codes": "1F618",
          "char": "😘",
          "name": "face blowing a kiss"
        },
        {
          "codes": "1F617",
          "char": "😗",
          "name": "kissing face"
        },
        {
          "codes": "1F61A",
          "char": "😚",
          "name": "kissing face with closed eyes"
        },
        {
          "codes": "1F619",
          "char": "😙",
          "name": "kissing face with smiling eyes"
        },
        {
          "codes": "1F44B",
          "char": "👋",
          "name": "waving hand"
        },
        {
          "codes": "1F91A",
          "char": "🤚",
          "name": "raised back of hand"
        },
        {
          "codes": "1F590",
          "char": "🖐",
          "name": "hand with fingers splayed"
        },
        {
          "codes": "270B",
          "char": "✋",
          "name": "raised hand"
        },
        {
          "codes": "1F596",
          "char": "🖖",
          "name": "vulcan salute"
        },
        {
          "codes": "1F44C",
          "char": "👌",
          "name": "OK hand"
        },
        {
          "codes": "1F90F",
          "char": "🤏",
          "name": "pinching hand"
        },
        {
          "codes": "270C",
          "char": "✌",
          "name": "victory hand"
        },
        {
          "codes": "1F91E",
          "char": "🤞",
          "name": "crossed fingers"
        },
        {
          "codes": "1F91F",
          "char": "🤟",
          "name": "love-you gesture"
        },
        {
          "codes": "1F918",
          "char": "🤘",
          "name": "sign of the horns"
        },
        {
          "codes": "1F919",
          "char": "🤙",
          "name": "call me hand"
        },
        {
          "codes": "1F448",
          "char": "👈",
          "name": "backhand index pointing left"
        },
        {
          "codes": "1F449",
          "char": "👉",
          "name": "backhand index pointing right"
        },
        {
          "codes": "1F446",
          "char": "👆",
          "name": "backhand index pointing up"
        },
        {
          "codes": "1F595",
          "char": "🖕",
          "name": "middle finger"
        },
        {
          "codes": "1F447",
          "char": "👇",
          "name": "backhand index pointing down"
        },
        {
          "codes": "261D FE0F",
          "char": "☝️",
          "name": "index pointing up"
        },
        {
          "codes": "1F44D",
          "char": "👍",
          "name": "thumbs up"
        },
        {
          "codes": "1F44E",
          "char": "👎",
          "name": "thumbs down"
        },
        {
          "codes": "270A",
          "char": "✊",
          "name": "raised fist"
        },
        {
          "codes": "1F44A",
          "char": "👊",
          "name": "oncoming fist"
        },
        {
          "codes": "1F91B",
          "char": "🤛",
          "name": "left-facing fist"
        },
        {
          "codes": "1F91C",
          "char": "🤜",
          "name": "right-facing fist"
        }

      ],
      newinfo:[],
      chatMemory:[],
      websocket:null,
      length:0,
      timer:null,
      toname:'',
      doChatParam:{
        uid:'',
        chatthing:''
      },
      infoshowlist:[],
      newInfolist:[],
      touid:0,
      toicon:'',
      focuslist:[],
      fanslist:[],
      activeNames: [],
      user:{
        name:'',
        icon:'',
        focus:[],
        fans:[],
      },
      sendBody:{
        byid:'',
        toid:'',
        message:'',
        sendname:'',
      }
    }
  },
  methods:{
    getEmo(index){
      var textArea=document.getElementById('textarea');
      function changeSelectedText(obj, str) {
        if (window.getSelection) {
          // 非IE浏览器
          textArea.setRangeText(str);
          // 在未选中文本的情况下，重新设置光标位置
          textArea.selectionStart += str.length;
          textArea.focus()
        } else if (document.selection) {
          // IE浏览器
          obj.focus();
          var sel = document.selection.createRange();
          sel.text = str;
        }
      }
      changeSelectedText(textArea,this.faceList[index]);
      this.doChatParam.chatthing=textArea.value;// 要同步data中的数据
      // console.log(this.faceList[index]);
      return;
    },
    dochat(){
      if(this.doChatParam.chatthing.match(/^\s*$/)){
        this.$message.info('聊天内容不能为空哟~')
      }else{
        this.doChatParam.uid = this.touid;
        this.postRequest('/chat/doChat',this.doChatParam).then(resp => {
          this.doChatParam.chatthing = '';
          this.sendBody.toid = resp.obj.usergetid;
          this.sendBody.message = resp.obj.chatthing;
          this.sendBody.byid = resp.obj.usersentid;
          this.sendBody.sendname = window.sessionStorage.getItem('nickname')
          this.chatMemory[this.sendBody.toid].push(resp.obj)
          window.sessionStorage.setItem('chatRemember',JSON.stringify(this.chatMemory))
          Things.websocket.send(JSON.stringify(resp.obj));
        })
      }
    },
    getInfonew(uid,index,icon,name){
      this.toname = name;
      this.length = 0;
      this.touid = uid;
      this.toicon = icon;
      this.infoshowlist = this.chatMemory[uid];
      this.putRequest('/chat/done/' + uid).then(resp => {
        this.newinfo[uid] = 0;
        this.newinfo.push(0);
        window.sessionStorage.setItem('newinfo',JSON.stringify(this.newinfo));
      })
    },
  },
  created() {
    this.newinfo = JSON.parse(window.sessionStorage.getItem('newinfo'))
    this.chatMemory = JSON.parse(window.sessionStorage.getItem('chatRemember'))
    let a = this;
    let b = Things;
    setTimeout(function (){
      b.websocket.onmessage = function (event){
        a.chatMemory[JSON.parse(event.data).usersentid].push(JSON.parse(event.data))
        window.sessionStorage.setItem('chatRemember',JSON.stringify(a.chatMemory))
        if(a.touid != JSON.parse(event.data).usersentid){
          a.newinfo[JSON.parse(event.data).usersentid] ++;
          window.sessionStorage.setItem('newinfo',JSON.stringify(a.newinfo))
          a.newinfo.push(0);
          this.putRequest('/chat/done/' + uid).then(resp => {
            this.newinfo[uid] = 0;
            this.newinfo.push(0);
            window.sessionStorage.setItem('newinfo',JSON.stringify(this.newinfo));
          })
        }
      }
    },500)

    this.getRequest('/chat/getnewchat').then(resp => {
      this.newInfolist = resp.obj;
    })
    this.getRequest('/user/getMyFans').then(resp => {
      this.fanslist = resp.obj;
    })
    this.getRequest('/user/getMyFocus').then(resp => {
      this.focuslist = resp.obj;
    })
    this.getRequest('/user/getUserName').then(resp =>{
      this.user.name = resp.obj;
    })
    this.getRequest('/user/getIcon').then(resp =>{
      this.user.icon = resp.obj;
    })

  },
  mounted() {
    for(let i in this.emoji){
      this.faceList.push(this.emoji[i].char);
    }
  },
  updated() {
    if(this.length < this.infoshowlist.length){
      let di = document.getElementById('chatView');
      di.scrollTop = di.scrollHeight;
      this.length = this.infoshowlist.length;
    }
  }
}
</script>


<style scoped>
.haoyou{
  overflow: scroll;
}
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
  background-image: url("../../../static/img/bg71.jpg");
  overflow: scroll;
  width: 100%;
  height: 100vh;
  padding-top: 75px;
  position: absolute;
  z-index: 0;
  background-attachment: fixed;
  background-size: 100% auto;
}
.chatIcon {
  padding: 0 10px;
  font-size: 25px;
}
.emotionList{
  display: flex;
  flex-wrap: wrap;
  padding:5px;
}
.emotionItem{
  width:10%;
  font-size:20px;
  text-align:center;
}
/*包含以下四种的链接*/
.emotionItem {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
  text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
  text-decoration: none;
}
</style>