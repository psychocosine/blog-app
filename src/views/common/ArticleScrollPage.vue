<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <article-item v-for="a in articles" :key="a.id" v-bind="a"></article-item>
  </scroll-page>
</template>

<script>
  import ArticleItem from '@/components/article/ArticleItem'
  import ScrollPage from '@/components/scrollpage'
  import {getArticles} from '@/api/article'

  export default {
    name: "ArticleScrollPage",
    data() {
      return {
        loading: false,
        noData: false,
        innerPage: {
          size: 5,
          page: 1,
        },
        articles: []
      }
    },
    props: {
      offset: {
        type: Number,
        default: 100
      },
      page: {
        type: Object,
        default() {
          return {}
        }
      },
      query: {
        type: Object
        
      },

    },
    watch: {
      'query': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage.page = 1
          this.getArticles(true)
        },
        deep: true
      },
      'page': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage = this.page
          this.getArticles()
        },
        deep: true
      }
    },
    mounted() {
      // setTimeout(()=>{
        
      // },1000)
      this.getArticles(false)
    },
    
    methods: {
      load() {
        this.getArticles()
      },
      view(id) {
        this.$router.push({path: `/view/${id}`})
      },
      getArticles(clr) {
        let that = this
        that.loading = true
        if(clr){
          this.innerPage.page = 1
          this.noData = false
        }

        getArticles(this.query, this.innerPage).then(data => {
          let newArticles = data
          
          if(clr){
            this.noData = false
            this.articles = []
            this.innerPage.page = 1
          }
          if (newArticles && newArticles.length > 0) {
            this.innerPage.page += 1
            this.articles = this.articles.concat(newArticles)
          } else {
            this.noData = true
          }

        }).catch(error => {
          if (error !== 'error') {
            this.$message({type: 'error', message: '文章加载失败!', showClose: true})
          }
        }).finally(() => {
          this.loading = false
        })
      }
    },
    components: {
      'article-item': ArticleItem,
      'scroll-page': ScrollPage
    }

  }
</script>

<style scoped>
  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 10px;

  }
</style>
