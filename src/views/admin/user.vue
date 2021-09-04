<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户名">
            <span>{{ props.row.username }}</span>
          </el-form-item>
          <el-form-item label="用户 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="注册日期">
            <span>{{ props.row.date_joined }}</span>
          </el-form-item>
          <el-form-item label="用户类型">
            <span>{{ props.row.is_superuser?'管理员':'普通用户' }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="用户 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="username">
    </el-table-column>
    <el-table-column
      label="邮箱"
      prop="email">
    </el-table-column>
    <el-table-column
      label="注册日期"
      prop="date_joined"
      sortable>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
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
          @current-change="handlePageChange">
        </el-pagination>
      </div>
    </template>
  </el-table>
</template>


<script>
import {deleteObj, getAllUsers} from './api'
  export default {
    created(){
      this.getAllUsers(this.query)
    },
    methods: {
      getAllUsers(query){
        getAllUsers(query).then(r=>{
          this.tableData = r.data.results
          this.max_size = r.data.count
        })
      },
      handleDelete(id){
        deleteObj(id,'/users').then(r=>{
          this.getAllUsers(this.query);
          this.$message({
            type:'success',
            message:'删除成功'
          })
        })
      },
      handlePageChange(currentPage){
        this.query.page=currentPage
        this.getAllUsers(this.query)
      },
      handleSearch(input){
        this.query.search =input
        this.getAllUsers(this.query)
      },
      handleSearch(input){
        this.query.search =input
        this.getAllUsers(this.query)
      }
    },
    data() {
      return {
        tableData: [],
        search:'',
        max_size:100,
        query:{
          search:undefined,
          page:1,
          ordering:undefined
        }
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
