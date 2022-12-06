import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '@/view/home'
import oder from '@/view/order'
import center from '@/view/center'
import login from '@/view/login'

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
    name: 'home',
    component: home
  },
  {
    path: '/order',
    name: 'order',
    component: oder,
    meta: { isSkip: true },
    children: [
      {
        path: '/order/unloginorder',
        component: () => import('@/components/unLoginOrder')
      },
      {
        path: '/order/oderlist',
        component: () => import('@/components/orderList')
      }
    ]
  },
  {
    path: '/center',
    name: 'center',
    component: center
  },
  {
    path: '/login',
    component: login
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
