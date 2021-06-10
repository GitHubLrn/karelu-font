<template>
  <div>
    <div style="font-size: 24px">弹幕投诉</div>
    <el-table
        :data="infoList"
        stripe
        style="width: 100%">
      <el-table-column
          prop="tousuid"
          label="投诉id"
          width="70">
      </el-table-column>
      <el-table-column
          prop="uid"
          label="投诉人id"
          width="100">
      </el-table-column>
      <el-table-column
          prop="containthing"
          label="投诉包含内容"
          width="300">
      </el-table-column>
      <el-table-column
          prop="createdate"
          label="投诉时间"
          width="200">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="nocaozuo(scope.$index, scope.row)">无视</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="seeabout(scope.$index, scope.row)">查看相关内容</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="相关内容"
        :visible.sync="dialogVisible">
      <el-table
          :data="aboutlist"
          stripe
          style="width: 100%">
        <el-table-column
            prop="danmuid"
            label="弹幕id"
            width="70">
        </el-table-column>
        <el-table-column
            prop="uid"
            label="发送者id"
            width="100">
        </el-table-column>
        <el-table-column
            prop="danmu"
            label="弹幕内容"
            width="250">
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="danger"
                @click="fenghao(scope.$index, scope.row)">封禁发送者</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DanmuReport",
  data(){
    return{
      infoList:[],
      dialogVisible:false,
      aboutlist:[]
    }
  },
  created() {
    this.getRequest('/admin/getNotBeDoneTousu').then(resp =>{
      this.infoList = resp.obj;
    })
  },
  methods:{
    nocaozuo(idx,entity){
      this.putRequest('/admin/setTousuDone?tousuid=' + entity.tousuid).then(resp =>{
        this.infoList.splice(idx,1)
      })
    },
    seeabout(index,entity){
      this.getRequest('/admin/getTargetDanmu?target='+entity.containthing).then(resp => {
        this.aboutlist = resp.obj
        this.dialogVisible = true
      })
      this.putRequest('/admin/setTousuDone?tousuid=' + entity.tousuid).then(resp =>{
        this.infoList.splice(index,1)
      })
    },
    fenghao(idx,entity){
      this.aboutlist.splice(idx,1);
      this.putRequest('/admin/fengdanmuhao?targetUid='+entity.uid).then(resp => {
      })
    }
  }
}
</script>

<style scoped>

</style>