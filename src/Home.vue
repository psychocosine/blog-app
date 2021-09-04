<template>
  <div id="home">
    <el-container>
    	
    	<base-header :activeIndex="activeIndex" @update-query="handle"></base-header>
		  
		  <router-view class="me-container" :query="this.query"></router-view>
		  
			<!-- <base-footer v-show="footerShow" style="bottom:0px"></base-footer> -->


		  
		</el-container>
		
  </div>
  
</template>

<script>
import BaseFooter from '@/components/BaseFooter'
import BaseHeader from '@/views/BaseHeader'

export default {
  name: 'Home',
  data (){
  	return {
		activeIndex: '/',
		footerShow:true,
		query:{},
  	}
  },
  methods: {
	  handle(newVal){
		this.query = newVal;
	  }
  },
  components:{
  	'base-header':BaseHeader,
  	'base-footer':BaseFooter
  },
  beforeRouteEnter (to, from, next){
  	 next(vm => {
    	vm.activeIndex = to.path
  	})
  },
  beforeRouteUpdate (to, from, next) {
	  if(to.path == '/'){
	  	this.footerShow = true
	  }else{
	  	this.footerShow = false
	  }
	  this.activeIndex = to.path
	  next()
	}
}
</script>

<style >

.me-container{
  margin: 100px auto 140px;
}
</style>
