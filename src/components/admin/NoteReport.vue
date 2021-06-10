<template>
  <div>
    <div style="font-size: 24px">动态举报</div>
    <el-table
        :data="reportList"
        stripe
        style="width: 100%">
      <el-table-column
          prop="id"
          label="举报id"
          width="70">
      </el-table-column>
      <el-table-column
          prop="uid"
          label="举报人id"
          width="100">
      </el-table-column>
      <el-table-column
          prop="nuid"
          label="被举报人id"
          width="100">
      </el-table-column>
      <el-table-column
          prop="note"
          label="动态内容"
          width="200">
      </el-table-column>
      <el-table-column
          prop="img"
          label="动态图片"
          width="300">
        <template slot-scope="scope">
          <div  style="display: flex;word-break: break-all; flex-wrap: wrap">
            <img  v-for="item in scope.row.img" :src="item" style="width: 80px;height: 80px;padding: 3px" v-if="item != ''">
          </div>
        </template>
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
              @click="deletenote(scope.$index, scope.row)">删除动态</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="deleteandfenghao(scope.$index, scope.row)">封禁动态发送者</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "NoteReport",
  data(){
    return{
      reportList:[],
      fenghao:{
        noteid:'',
        nuid:''
      }
    }
  },
  created() {
    this.getRequest('/admin/getReport').then(resp =>{
      this.reportList = resp.obj;
    })
  },
  methods:{
    nocaozuo(idx,entity){
      this.putRequest('/report/setBeDone?reportid=' + entity.id).then(resp =>{
        this.reportList.splice(idx,1)
      })
    },
    deletenote(idx,entity){
      this.deleteRequest('/note/delNote?id=' + entity.noteid).then(resp =>{
        this.reportList.splice(idx,1);
      })
    }
    ,deleteandfenghao(idx,entity){
      this.fenghao.noteid = entity.noteid;
      this.fenghao.nuid = entity.nuid;
      this.putRequest('/admin/deleteAndFenghao',this.fenghao).then(resp =>{
        this.reportList.splice(idx,1);
      })
    }
  }
}
</script>

<style scoped>

</style>