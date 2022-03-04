<template>
  <div id="app">
    <header-nav></header-nav>
    <left-nav></left-nav>
    <router-view/>
  </div>
</template>

<script>
  import headerNav from '@/components/common/headerNav.vue'
  import leftNav from '@/components/common/leftNav.vue'
  // import {getMenu} from './api/commonApi.js'
export default {
  components:{
    headerNav,
    leftNav
  },
  name: 'App',
  data(){
    return {
      loginStatus:sessionStorage.getItem('loginStatus') ? false : true,
      permissionsList:[]
    }
  },
  methods:{
    getMenuApi(){
      let vm = this;
      getMenu({}).then((res) => {
        let data = res.data;
        if(data.code == 0){
          vm.permissionsList = window.permissions = data.permissions;
        }else{
          vm.$message({
            type:'error',
            message:data.msg
          })
        }
      }).catch((err) => {
        vm.permissionsList = ['1'];
      })
    },

  },
  created(){

      // this.getMenuApi();
  },
  mounted(){
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
