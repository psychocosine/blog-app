<template>
<div>
  <el-card>
    <div slot="header"><h3>用户列表</h3></div>
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
          @click="handleDelete(scope.row.id)">Disable</el-button>
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
  </el-card>
  <el-card>
    <h3 slot="header">批量创建用户</h3>
     <el-form :inline="true" :model="batch_create" class="demo-form-inline">
      <el-form-item label="用户名前缀">
        <el-input v-model="batch_create.prefix" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="默认密码">
        <el-input v-model="batch_create.default_password" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="创建数量">
        <el-input v-model="batch_create.size" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>


<script>
import {deleteObj, getAllUsers,batch_create} from './api'
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
      },
      onSubmit(){
        batch_create(this.batch_create).then(r=>{
          this.$message({
            type:'success',
            message:'创建成功'
          })
        })
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
        },
        batch_create:{
          prefix:'',
          default_password:'',
          size:'',
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
