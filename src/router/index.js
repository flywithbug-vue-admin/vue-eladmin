import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'


Vue.use(Router)

export  const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    name: 'dashboard',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: () => import('@/views/system/user/center'),
        name: 'personal',
        meta: { title: 'personal', icon: 'user' }
      }
    ]
  },
  {
    path: '/tool',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'model/detail',
        component: () => import('@/views/devtools/model/detail'),
        name: 'detail',
        meta: { title: '模型详情页面', icon: 'detail' }
      }
    ]
  },
  // { path: '*', redirect: '/404', hidden: true }
]


export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  mode: 'history'
})




