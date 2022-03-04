import Vue from 'vue'
import Router from 'vue-router'
//登录
import {loginRouter} from './module/login/index'

console.log(loginRouter)

Vue.use(Router)
const routerData = [].concat(loginRouter);
const router = new Router({
  routes: routerData,
});

// router.beforeEach((to, from, next) => {
//   //根据字段判断是否路由过滤
//   if(to.meta.index){
//     // sessionStorage.setItem('path',to.meta.index)
//   }
//   console.log(to)
//   if(!sessionStorage.getItem('token')){
//     if (to.path !== '/login') {//跳转到登录页
//       return next({path: '/login'});
//     }else {
//       next();
//     }
//   }else{
//     //判断token是否失效
//       console.log(123)
//
//       next();
//   }
//
// });

export default router
