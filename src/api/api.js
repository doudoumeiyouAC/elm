import axios from '@/utils/http'

export const getShop = data => { // 获取首页商铺列表
  return axios.get('https://elm.cangdu.org/shopping/restaurants', {
    params: data
  })
}

export const getCaptcha = () => { // 获取登录验证码
  return axios.post('/v1/captchas')
}

export const userLogin = data => { // 用户登录
  return axios.post('/v2/login', data)
}

export const userOut = () => { // 用户退出
  return axios.get('/v2/signout')
}

export const getAddress = geohash => { // 根据经纬度获取详细信息
  return axios.get(`/v2/pois/${geohash}`)
}