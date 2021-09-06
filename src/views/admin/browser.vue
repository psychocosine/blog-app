<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="用户"
      prop="user">
    </el-table-column>
    <el-table-column
      label="文章"
      prop="article">
    </el-table-column>

    <el-table-column
      label="源IP"
      prop="ip">
    </el-table-column>

    <el-table-column
      label="浏览日期"
      prop="time"
      sortable>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="query.search"
          size="mini"
          placeholder="输入关键字"
          @input="handleSearch"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">Delete</el-button>
      </template>
    </el-table-column>
    <template #append>
      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="max_size"
          :page-size="10"
          :current-page="query.page"
          @current-change="handlePageChange">
        </el-pagination>
      </div>
    </template>
  </el-table>
</template>


<script>
import {getBrowserRecords,deleteObj} from './api'
  export default {
    created(){
      this.getBrowserRecords(this.query)
    },
    methods: {
      getBrowserRecords(query){
        getBrowserRecords(query).then(r=>{
          this.tableData = r.data.results
          this.max_size = r.data.count
          console.log(this.tableData)
        })
      },
      handleDelete(id){
        deleteObj(id,'/browser-record').then(r=>{
          this.getBrowserRecords(this.query)
          this.$message({type:'success',message:'删除成功'})
        })
      },
      handlePageChange(currentPage){
        this.query.page=currentPage
        this.getBrowserRecords(this.query)
      },
      handleSearch(input){
        this.query.search =input
        this.query.page = 1
        this.getBrowserRecords(this.query)
      }
    },
    data() {
      return {
        tableData: [],
        query:{
          search:undefined,
          page:1,
          ordering:undefined
        },
        max_size:100,
      }
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
