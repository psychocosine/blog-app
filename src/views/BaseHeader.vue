<template>
  <el-header class="me-area">
    <el-row class="me-header">

      <el-col :span="4" class="me-header-left">
        <router-link to="/" class="me-title">
          <img src="../assets/img/logo.png"/>
        </router-link>
      </el-col>

      <el-col v-if="!simple" :span="8">
        <el-menu :router=true menu-trigger="click" active-text-color="#5FB878" :default-active="activeIndex"
                 mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/type/category/all">文章分类</el-menu-item>
          <el-menu-item index="/type/tag/all">标签</el-menu-item>
          <el-menu-item index="/archives">文章归档</el-menu-item>
        </el-menu>
      </el-col>
      <template v-else>
        <slot></slot>
      </template>
      <el-col :span="8" class="me-search" v-if="!simple">
        <el-input placeholder="请输入搜索内容" v-model="query.search" class="input-with-select" v-on:change="update">
          
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
          <template v-if="!user.login" >
            <div class="btn">
              <el-button type round plain  @click="login" >登录</el-button>
              <el-button type round plain  @click="register">注册</el-button>
            </div>
          
          </template>

          <template v-else>
            <el-menu :router="true" menu-trigger="hover" active-text-color="#5FB878">
            <el-submenu index>
              <template slot="title">
                <img class="me-header-picture" :src="user.avatar"/>
              </template>
              <el-menu-item index="/write" >写文章</el-menu-item>
              <el-menu-item index="/settings" >个人中心</el-menu-item>
              <el-menu-item index="/admin" v-if="user.admin" >后台管理</el-menu-item>
              <el-menu-item  @click="logout">退出</el-menu-item>
            </el-submenu>
            </el-menu>
          </template>
        
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
  export default {
    name: 'BaseHeader',
    props: {
      activeIndex: String,
      simple: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        query:{
          search:'',
        },
      }
    },
    computed: {
      user() {
        let login = this.$store.state.account.length != 0
        let avatar = this.$store.state.avatar
        let admin = this.$store.state.admin
        return {
          login, avatar,admin
        }
      }
    },
    methods: {
      login(){
        this.$router.push({path: '/login'});
      },
      register(){
        this.$router.push({path:'/register'});
      },
      logout() {
        let that = this
        this.$store.dispatch('logout').then(() => {
          this.$router.push({path: '/'})
        }).catch((error) => {
          if (error !== 'error') {
            that.$message({message: error, type: 'error', showClose: true});
          }
        })
      },
      update(){
        this.$emit('update-query',this.query);
      }
    }
  }
</script>

<style scoped>

  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  }

  .me-title {
    margin-top: 10px;
    font-size: 24px;
  }

  .me-header-left {
    margin-top: 10px;
  }

  .me-title img {
    max-height: 2.4rem;
    max-width: 100%;
  }

  .me-header-picture {
    width: 36px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #5fb878;
  }
  .me-search {
    margin-top: 10px;
    display: flex;
  }
  .btn {
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 10%;
  }

</style>
