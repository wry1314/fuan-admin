/*
* 接口地址的处理（测试环境、正式环境）
* axios的公共参数header的配置
* post 请求
* get 请求
* */
import Vue from 'vue'
import Router from 'vue-router'
import router from '../router/index'
import axios from 'axios';


export var services;
export var mockService;
// 接口域名
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV == 'development'){
  // 本地
  // services = 'http://172.16.40.159:8080';
  // services = 'http://172.16.40.137/yfapi';
  // services = 'http://172.16.10.198/yfv2api';
  //测试
  services = 'http://59.110.228.145/yfapi';
  // services = 'http://www.miska.cn/yfapi';
  // services = 'http://172.16.41.199/yfapi';
  window.services = 'http://59.110.228.145/yfapi';
  // window.services = 'http://www.miska.cn/yfapi';
//  mock
  mockService = 'http://59.110.228.145:3000/mock/21';
}else if(process.env.NODE_ENV == 'test'){
  // 测试
  // services = 'http://172.16.10.198/yfapi'
  services = 'http://59.110.228.145/yfapi';
  // services = 'http://172.16.10.198/yfv2api';
  // services = 'http://59.110.228.145/yfapi'
  window.services = 'http://59.110.228.145/yfapi'
}else if(process.env.NODE_ENV == 'production'){
  services = 'http://www.miska.cn/yfapi';
  window.services = 'http://www.miska.cn/yfapi'
};
init();
function init() {
  axios.interceptors.response.use(
    response => {/*在这里可以设置请求成功的一些设置*/
      // let newToken=response.config.headers.token
      // localStorage.setItem('x-auth-token', newToken);
      // if(response.data.code==-1&&response.status==200){
      //   this.$message({showClose: true, message:response.data.msg, type: 'warning'});
      // };
      // console.log(typeof response.data.code);
      if(response.data.code == 401){
        router.push({
          path: '/login',
          // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        })
      }else{
        return response;
      }
    },
    error => {/*在这里设置token过期的跳转*/
      if (error.response) {
        if (error.response.data.code == 401) {
          this.$router.push('/login');
        }
      }
    }
  )
}


//post 请求
export function post(url, params = {}) {
  let token = sessionStorage.getItem("token") || '';
  axios.defaults.headers.token = token;
  axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
  return axios.post(url, params);
}

//put 请求
export function put(url, params = {}) {
  let token = sessionStorage.getItem("token") || '';
  axios.defaults.headers.token = token;
  axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
  return axios.put(url, params);
}

// get 请求
export function get(url, params = {}) {
  let token = sessionStorage.getItem("token") || '';
  axios.defaults.headers.token = token;
  axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
  return axios.get(url,{params});
}

// delete 请求
export function deleteReq(url, params = {}) {
  let token = sessionStorage.getItem("token") || '';
  axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
  axios.defaults.headers.token = token;
  return axios.delete(url,{data:params}); //和post传参不一样，需要再封装一个data
}

// formData 请求
export function formData(url, params = {},callBack = function () {},index) {
  let formData = new FormData();
  for(let key in params){
    formData.append(key,params[key])
  }
  // formData.append('fileType', params.fileType);
  // formData.append('files', params.files);
  // formData.append('files', params.files);
  // formData.append('files', params.files);
  // formData.append('files', params.files);
  let token = sessionStorage.getItem("token") || '';
  axios.defaults.headers.token = token;
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return axios({
    method:'post',
    url:url,
    data:formData,
    onUploadProgress(progressEvent){//获取上传进度
      if(progressEvent.lengthComputable){
        let val = (progressEvent.loaded / progressEvent.total * 100).toFixed();
        var progress = parseInt(val);

        callBack(progress,index);
      }
    },


  })
  // return axios.post(url,formData);
}
