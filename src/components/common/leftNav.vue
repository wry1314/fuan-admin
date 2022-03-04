<template>
  <div class="nav-main">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="menuSelect"
      background-color="#3d4955"
      text-color="#fff"
      :router="false"
      :unique-opened="true"
      style="text-align: left"
      active-text-color="#fff">
      <div v-for="(item,index) in menuData" :key="index">
        <!--一级导航-->
        <el-submenu :index="item.index" v-if="item.childMenu.length > 0">
          <template slot="title">
            <!--<i class="el-icon-location"></i>-->
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <!--二级导航-->
            <div v-for="(childItem,childIndex) in item.childMenu" :key="childIndex">
              <el-submenu v-if="childItem.childMenu.length > 0" :index="childItem.index" :router="childItem.path">
                <template slot="title">
                  <span>{{childItem.name}}</span>
                </template>
              </el-submenu>
              <el-menu-item :class="childItem.index == defaultActive ? 'is-active' : ''" v-else :index="childItem.index" :route="childItem.path" @click="jumpPage(childItem.path)">{{childItem.name}}</el-menu-item>
            </div>
            <!--二级导航结束-->
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.index" :route="item.path"  @click="jumpPage(item.path)" v-else>
          <!--<i class="el-icon-menu"></i>-->
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <!--一级导航结束-->
      </div>
    </el-menu>
  </div>
</template>

<script>
  // import menu from '../../assets/data/menu'
  // import {getMenu} from '../../api/commonApi.js'
    export default {
        name: "left",
        data(){
          return {
            menuData:[],
            defaultActive:'1-1',//sessionStorage.getItem('path') ||
            pathObj:{},
          }
        },
        methods: {
          handleOpen(key, keyPath) {
            // this.defaultActive = key
            // console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            // this.defaultActive = key
            // console.log(key, keyPath);
          },
          menuSelect(index,indexPath){
            sessionStorage.setItem('path',index);
            this.defaultActive = index;
          },
          jumpPage(url){
            this.$router.push({
              path:url,
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
          getPathObj(data){
            let vm = this;
            for(let i=0,len=data.length;i<len;i++){
              if(data[i].path){
                vm.pathObj[data[i].path] = data[i].index;
              }
              let child = data[i].childMenu;
              for(let c=0,len2 = child.length;c<len2;c++){
                if(child[c].path){

                  vm.pathObj[child[c].path] = child[c].index;
                }
              }
            }
          },
        },
      watch:{
        '$store.state.path'(){
          let vm = this;
          // let _defaultActive = this.$store.state.path || sessionStorage.getItem('path');
          this.defaultActive =  sessionStorage.getItem('path');
          sessionStorage.setItem('path',vm.$store.state.path)
          this.$forceUpdate();
        },
        '$store.state.leftMenu'(){
          let vm = this;
          // this.menuData = this.$store.state.leftMenu;
          vm.getPathObj(vm.menuData);
          let menuJsonStr = JSON.stringify(vm.menuData);
          sessionStorage.setItem('leftMenu',menuJsonStr);
        }
      },
      created(){
        // this.getMenuApi();
        // this.defaultActive = this.$store.state.path;
        let menuJsonStr = sessionStorage.getItem('leftMenu');
        let sessionMenu = JSON.parse(menuJsonStr);
        // this.menuData = this.$store.state.leftMenu.length > 0 ? this.$store.state.leftMenu : sessionMenu;
      },
      mounted(){
          //sessionStorage.getItem('path')
          // this.defaultActive = '/extension-play'
      }
    }
</script>

<style >
.nav-main{
  width: 200px;
  position: fixed;
  top: 62px;
  bottom: 0;
  background: #3d4955;
  /*border-right: 1px solid #dcdeeb;*/
}
.el-menu{
  border: none;
}
.el-menu-item-group{
  text-align: center;
}
.el-submenu__title,.el-menu-item{
  padding:0 40px!important;
}
.el-menu-item.is-active{
  background: #ff5656!important;
}
.third-menu{
  padding-left: 80px!important;
}
</style>
