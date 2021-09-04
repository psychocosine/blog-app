<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="文章 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="作者">
            <span>{{ props.row.author }}</span>
          </el-form-item>
          <el-form-item label="摘要">
            <span>{{ props.row.summary }}</span>
          </el-form-item>
          <el-form-item label="分类">
            <span>{{ props.row.category_name }}</span>
          </el-form-item>
          <el-form-item label="标签">
            <span>{{ props.row.tag_name }}</span>
          </el-form-item>
          <el-form-item label="摘要">
            <span>{{ props.row.summary }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="文章 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="文章标题"
      prop="title">
    </el-table-column>
    <el-table-column
      label="文章作者"
      prop="author">
    </el-table-column>
    <el-table-column
      label="文章创作时间"
      prop="create_time">
    </el-table-column>
    <el-table-column
      label="最后更新时间"
      prop="update_time">
    </el-table-column>
    <el-table-column
      label="浏览数"
      prop="page_view"
      sortable>
    </el-table-column>
    <el-table-column
      label="评论数"
      prop="comment_num"
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
          @current-change="handlePageChange">
        </el-pagination>
      </div>
    </template>
  </el-table>
  
  </div>
</template>


<script>
import {getAllArticles,deleteObj} from './api'
  export default {
    created(){
      this.getAllArticles(this.query)
    },
    methods: {
      getAllArticles(query){
        getAllArticles(query).then(r=>{
          this.tableData = r.data.results
          console.log(r.data)
          this.max_size = r.data.count
        })
      },
      handleDelete(id){
        deleteObj(id,`/articles`).then(r=>{
          this.getAllArticles(this.query)
          this.$message({type:'success',message:'删除成功'})
        })
      },
      handlePageChange(currentPage){
        this.query.page=currentPage
        this.getAllArticles(this.query)
      },
      handleSearch(input){
        this.query.search =input
        this.getAllArticles(this.query)
      }
    },
    data() {
      return {
        tableData: [],
        max_size:1999,
        query:{
          search:undefined,
          page:1,
          ordering:undefined
        }
      }
    }
  }
</script>

<style scoped>
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
