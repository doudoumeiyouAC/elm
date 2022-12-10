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

export const getCityList = type => { // 获取城市列表
  // return axios.get(`https://elm.cangdu.org/v1/cities?type=${type}`)
  return axios({
    method: 'GET',
    url: 'https://elm.cangdu.org/v1/cities',
    params: {
      type
    }
  })
}

export const searchAddress = (cityId, keyword) => { // 搜索地址
  // return axios.get(`https://elm.cangdu.org/v1/pois?city_id=${cityId}&keyword=${keyword}&type=search`)
  return axios({
    method: 'GET',
    url: '/v1/pois',
    params: {
      city_id: cityId,
      keyword,
      type: 'search'
    },
    headers: {
      showLoading: false
    }
  })
}

export const getOrderList = (userId,limit) => { // 获取订单列表
  return axios({
    method: 'GET',
    url: `/bos/v2/users/${userId}/orders`,
    params: {
      limit
    }
  })
}
