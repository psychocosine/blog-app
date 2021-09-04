<template>
  <el-container style="height: 100%">
    <el-header>
      <div>
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside style="height: 100%">
        <el-menu
         default-active="user"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          
        >
          <el-menu-item index="user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="article">
            <i class="el-icon-menu"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="browser-record">
            <i class="el-icon-menu"></i>
            <span slot="title">浏览记录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="height: 100%">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Welcome from '@/components/Welcome.vue'
// import "@/assets/theme/element-ui-index.css";
export default {
  methods: {
    logout() {
      this.$router.push("/login");
    },
  },
  created() {
  },
  data() {
    return {
      
    };
  },
};
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.5/lib/theme-chalk/index.css");
.el-header {
  background-color: rgb(18, 101, 185);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-aside {
  background-color: #465166;
}
.el-main {
  background-color: rgb(255, 255, 255);
}
</style>