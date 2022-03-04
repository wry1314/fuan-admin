<template>
  <div class="main header-nav">
    <div class="logo">
      <!--<img src="../../assets/commonImg/logo.png"/>-->
      <h1>太华系统</h1>
    </div>
    <div class="top-menu">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#edebec" text-color="#464646"  @select="menuHandleSelect">
        <div v-for="(item,index) in menuData" :key="index" class="el-menu-item">
          <!--一级导航-->
          <el-menu-item :index="item.index" :route="item.path"  @click="jumpPage(item.path)">
            <!--<i class="el-icon-menu"></i>-->
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <!--一级导航结束-->
        </div>
      </el-menu>
    </div>
    <div class="user-info">
      <!--<div class="info">用户ID：10010</div>-->
      <div class="info">
        <el-menu background-color="#edebec" text-color="#464646" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="">
            <template slot="title">用户名称：{{username}}</template>
            <el-menu-item index="2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
  import {loginOutAPi} from "../../api/loginApi";
  // import {getMenu} from '../../api/commonApi.js'
    export default {
        name: "headerNav",
      data(){
          return {
            menuData:[{name:'',path:'',index:'1-1'}],
            pathObj:{},
            username:sessionStorage.getItem('userName') || 'admin'
          }
      },
      created(){
        // this.getMenuApi();
      },
      methods:{
        handleSelect(val){
          if(val == 1){
            this.$router.push({
              path:'/my',
            })
          }else if(val == 2){
            this.loginOut()

          }
        },
        loginOut(){
          let vm = this;
          loginOutAPi({}).then((res) => {
            let data = res.data;
            if(data.code == 0){
              sessionStorage.removeItem('token');
              vm.$router.push({
                path:'/web/login',
              })
            }else{
              vm.$router.push({
                path:'/web/login',
              })
            }
          }).catch((err) => {
            // vm.$message({
            //   type:'error',
            //   message:'退出失败'
            // })
          })
        },
        getMenuApi(){
          let vm = this;
          getMenu({}).then((res) => {
            let data = res.data;
            if(data.code == 0){
              vm.menuData = data.menuList;
            }else{
              vm.$message({
                type:'error',
                message:data.msg
              })
            }
          })
        },
        menuHandleSelect(){

        },

        getChildMenu(item){
          if(!item.path){
            this.$store.commit('getLeftMenu',item);
          }

        },
        jumpPage(url){
          this.$router.push({
            path:url,
          })
        },
      }
    }
</script>

<style scoped>
.main{
  width: 100%;
  height: 62px;
  background: #edebec;
  position: fixed;
  z-index: 20;
  top: 0;
}
.logo{
  height: 100%;
  width: 200px;
  line-height: 62px;
  font-size: 24px;
  color: #fff;
  float: left;
  background: #ff5656;
}
.logo h1{
  font-weight: bold;
}
.logo img{
  margin-top: 7px;
  width: 140px;
}
.logo,.user-info{
  display: inline-block;
}
.top-menu{
  float: left;
}
.user-info{
  float: right;
  /*margin-right: 40px;*/
}
.info{
  float: left;
  height: 62px;
  line-height: 62px;
  color: #464646;
  margin-right: 20px;
}
.el-button.is-circle {
  background: none;
  border-color: #464646;
  color: #464646;
}
.el-menu-item.is-active{
  background: #edebec!important;
}
.el-menu--horizontal{
  background: none;
}
.header-nav .el-menu-item{
  padding: 0 0!important;
  min-width: 100px;
}
.header-nav .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{
  background: #babbbd;
}
</style>
