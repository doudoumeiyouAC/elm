import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '@/view/Home'
import oder from '@/view/Order'
import center from '@/view/Center'

// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location){
return originalPush.call(this , location).catch(err=>err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location){
return originalReplace.call(this , location).catch(err=>err)
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 路由重定向
  },
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  // {
  //   path: '/home/:name/:latitude/:longitude', // 三级动态路由
  //   component: home
  // },
  {
    path: '/order',
    component: oder,
    meta: { isSkip: true },
    children: [
      {
        path: '/order/unlogin_order',
        component: () => import('@/components/order/UnLoginOrder')
      },
      {
        path: '/order/order_list',
        component: () => import('@/components/order/OrderList')
      }
    ]
  },
  {
    path: '/center',
    component: center
  },
  {
    path: '/login',
    component: () => import('@/view/Login')
  },
  {
    path: '/address',
    component: () => import('@/view/Address')
  },
  {
    path: '/address/city_list',
    component: () => import('@/view/CityList')
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫（路由拦截）
// router.beforeEach((to,from,next) => {
//   if(to.meta.isSkip) {
//     if(localStorage.getItem('token')) {
//       console.log('登录成功')
//       next()
//     } else {
//       console.log('没有登陆');
//       next({
//         path: '/unloginorder',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
