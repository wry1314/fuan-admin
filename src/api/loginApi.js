import {services,post,get} from '../services/index'

// 登录接口
export function loginAPi(params) {
  return post(services + '/sys/login',params)

}
//退出接口
export function loginOutAPi(params) {
  return post(services + '/sys/logout', params)
}

//获取用户登录信息（判断token是否失效）

export function getTokenStatus(params) {
  return get(services + '/sys/user/login/info',params)
}
