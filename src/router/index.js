import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'

import util from '@/libs/util.js'

// 路由数据
import routes from './routes'

// 固定菜单与路由
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
//路由与组件映射关系
import routerMapComponents from '@/routerMapComponents'
//模拟动态菜单与路由
//import { permissionMenu, permissionRouter } from '@/mock/permissionMenuAndRouter'

import * as userService from "@/api/sys/user";

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

let permissionMenu, permissionRouter = []

//标记是否已经拉取权限信息
let isFetchPermissionInfo = false

let fetchPermissionInfo = async () => {
  //处理动态添加的路由
  const formatRoutes = function (routes) {
    routes.forEach(route => {
      route.component = routerMapComponents[route.component]
      if (route.children) {
        formatRoutes(route.children)
      }
    })
  }

  // const formatRoutesByComponentPath = function (routes) {
  //   routes.forEach(route => {
  //     route.component = function (resolve) {
  //       require([`../${route.componentPath}.vue`], resolve)
  //     }
  //     if (route.children) {
  //       formatRoutesByComponentPath(route.children)
  //     }
  //   })
  // }

  // const formatRoutesByComponentPath = function (routes) {
  //   routes.forEach(route => {
  //     route.component = () => import(`../${route.componentPath}.vue`)
  //     if (route.children) {
  //       formatRoutesByComponentPath(route.children)
  //     }
  //   })
  // }
  try {
    let userPermissionInfo = await userService.getUserPermissionInfo()
    permissionMenu = userPermissionInfo.accessMenus
    permissionRouter = userPermissionInfo.accessRoutes
  } catch (ex) {

  }
  formatRoutes(permissionRouter)
  let allMenuAside = [...menuAside, ...permissionMenu]
  let allMenuHeader = [...menuHeader, ...permissionMenu]
  //动态添加路由
  router.addRoutes(permissionRouter);
  // 处理路由 得到每一级的路由设置
  store.commit('d2admin/page/init', [...frameInRoutes, ...permissionRouter])
  // 设置顶栏菜单
  store.commit('d2admin/menu/headerSet', allMenuHeader)
  // 设置侧边栏菜单
  store.commit('d2admin/menu/fullAsideSet', allMenuAside)
  // 初始化菜单搜索功能
  store.commit('d2admin/search/init', allMenuHeader)
  await Promise.resolve()
}
//免校验token白名单
let whiteList = ['/login']

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)
  if (whiteList.indexOf(to.path) === -1) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      //拉取权限信息
      if (!isFetchPermissionInfo) {
        await fetchPermissionInfo();
        isFetchPermissionInfo = true;
        next(to.path, true)
      } else {
        next()
      }
    } else {
      // 将当前预计打开的页面完整地址临时存储 登录后继续跳转
      // 这个 cookie(redirect) 会在登录后自动删除
      util.cookies.set('redirect', to.fullPath)
      // 没有登录的时候跳转到登录界面
      next({
        name: 'login'
      })
    }
  } else {
    next()
  }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 需要的信息
  const app = router.app
  const { name, params, query } = to
  // 多页控制 打开新的页面
  app.$store.dispatch('d2admin/page/open', { name, params, query })
  // 更改标题
  util.title(to.meta.title)
})

export default router
