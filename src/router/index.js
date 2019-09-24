import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/service',
    meta: { title: '服务', icon: 'service' },
    children: [
      {
        path: 'service',
        name: 'Service',
        hidden: true,
        component: () => import('@/views/service')
      },
      {
        path: 'list/:service',
        name: 'ApplicationView',
        component: () => import('@/views/application-view'),
        hidden: true,
        meta: { title: '配置文件' },
        redirect: { name: 'ApplicationList' },
        children: [
          {
            path: 'list',
            name: 'ApplicationList',
            component: () => import('@/views/application-list')
          },
          {
            path: 'create',
            name: 'CreateApplication',
            component: () => import('@/views/application'),
            meta: { title: '新增' }
          },
          {
            path: 'update',
            name: 'UpdateApplication',
            component: () => import('@/views/application'),
            meta: { title: '修改' }
          }
        ]
      }
    ]
  },

  {
    path: '/env',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Env',
        component: () => import('@/views/env'),
        meta: { title: '环境', icon: 'env' }
      }
    ]
  },

  {
    path: '/label',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Label',
        component: () => import('@/views/label'),
        meta: { title: '分支', icon: 'label' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
