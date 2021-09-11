<template>
  <div>
    <el-dialog
      title="用户信息修改"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <el-form ref="userForm" :model="userForm" >
        <el-form-item prop="username" label="用户名">
          <el-input :placeholder="userinfo.username+'（不可修改）'"  :disabled="true"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input placeholder="修改密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="userForm.birthday"
            type="date"
            placeholder="生日"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width:100%"
            >
          </el-date-picker>
        </el-form-item>
        
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUserInfo">确 定</el-button>
      </span>
    </el-dialog>


    <el-row>
      <el-col :offset="10" :span="10"><el-avatar :size="250" :src="userinfo.avatar" :key="key"></el-avatar></el-col>
    </el-row>
    <el-row>
      <el-col :offset="11" :span="6" style="margin-left:46.833%">
        <el-upload
          action="account/avatar/"
          :show-file-list="false"
          name="image"
          :on-success="handleAvatarSuccess"
          :with-credentials="true"
          :headers="headers"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="16" :offset="4">
        <el-descriptions title="用户个人信息" direction="vertical" :column="7" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="dialogVisible=true">更改信息</el-button>
      </template>
      <el-descriptions-item label="用户ID">{{userinfo.id}}</el-descriptions-item>
      <el-descriptions-item label="用户名">{{userinfo.username}}</el-descriptions-item>
      <el-descriptions-item label="用户生日">{{userinfo.birthday}}</el-descriptions-item>
      <el-descriptions-item label="注册时间" :span="2">{{new Date(userinfo.date_joined).format('yyyy-MM-dd hh:mm:ss')}}</el-descriptions-item>
      <el-descriptions-item label="是否为管理员">
        <el-tag size="small">{{userinfo.is_superuser}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="上次登录时间">{{new Date(userinfo.last_login).format('yyyy-MM-dd hh:mm:ss')}}</el-descriptions-item>
    </el-descriptions>
      <el-tabs type="border-card">
        <el-tab-pane>
          <template #label>
            <span><i class="el-icon-document"></i> 我的文章</span>
          </template>
          <el-button icon="el-icon-sort" type="text" style="display: inline-block;" @click="handleSort('create_time')">按时间排序</el-button>
          <el-button icon="el-icon-sort" type="text" style="display: inline-block;" @click="handleSort('page_view')">按访问量排序</el-button>
          <div style="margin-left: 60%;margin-bottom: 2%; display: inline-block;">
              <el-input v-model="tmp.search" placeholder="输入关键字搜索" />
            </div>
          <div>
            <article-scroll-page :query="tmp" v-if="tmp.author_id"></article-scroll-page>
          </div>
        </el-tab-pane>
      </el-tabs>
      </el-col>
    </el-row>
    

      
  </div>
</template>

<script>
import store from '@/store'
import {docCookies} from '@/request/cookies'
import '@/assets/theme/element-ui-index.css'
import {getUserInfo,changeUserInfo} from '@/api/login'
import ArticleScrollPage from '@/views/common/ArticleScrollPage'
  export default {
    data () {
      return {
        dialogVisible: false,
        userinfo:{
          username:'',
          birthday:'',
          avatar:''
        },
        userForm: {
          password: '',
          birthday:'',
        },
        tmp:{
          search:'',
          ordering:''
        },
        headers:{

        },
        key:0
      }
    },
    created(){
      this.getUserInfo()
      this.userForm.birthday = this.userinfo.birthday
      this.headers['X-CSRFToken'] = docCookies.getItem('csrftoken')
      
    },
    computed:{
      author_id(){
        return this.$store.state.id;
      }
    },
    methods: {
      handleAvatarSuccess(res){
        console.log(res.path)
        this.userinfo.avatar = String(res.path)
        this.$message({type:'success',message:'头像更新成功'})
      },
      change(){
        this.userinfo.avatar = ''

      },
      getUserInfo(){
        getUserInfo().then(data=>{
          this.userinfo = data.data[0].fields;
          this.userinfo['birthday'] = data.data[0].fields.birthday
          this.userinfo['id'] = data.data[0].pk
          this.tmp['author_id'] = data.data[0].pk
        })
      },
      changeUserInfo(){
        this.userForm['id'] = this.userinfo.id;
        this.userForm['password']=this.userForm['password']==''?undefined:this.userForm['password'];

        changeUserInfo(this.userForm).then(r=>{
          this.dialogVisible = false
          this.$message({
            type:'success',
            message:'信息修改成功'
          })
        })
      },
      handleSort(method){
        if(this.tmp['ordering']==method){
          this.tmp['ordering']='-'+method
        } else {
          this.tmp['ordering'] = method;
        }
        console.log(this.tmp)
      }
    },
    components:{
      ArticleScrollPage
    }
  }
</script>
<style scoped >
@import url("//unpkg.com/element-ui@2.15.5/lib/theme-chalk/index.css");
img {
  height: 200px;
  border-radius: 100px;
}
</style>