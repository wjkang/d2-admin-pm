// polyfill
import 'babel-polyfill'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'
// 模拟数据
import '@/mock'
// 多国语
import i18n from './i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
//动态菜单与路由
import routerMapComponents from '@/routerMapComponents'
import { permissionMenu, permissionRouter } from '@/mock/permissionMenuAndRouter'

let allMenuAside = menuAside
let allMenuHeader = menuHeader
// 核心插件
Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    //处理动态添加的路由
    const replaceComponent = function (routes) {
      routes.forEach(route => {
        route.component = routerMapComponents[route.component]
        if (route.children) {
          replaceComponent(route.children)
        }
      })
    }
    replaceComponent(permissionRouter)
    allMenuAside = [...allMenuAside, ...permissionMenu]
    allMenuHeader = [...allMenuHeader, ...permissionMenu]
    //动态添加路由
    this.$router.addRoutes(permissionRouter);
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', [...frameInRoutes, ...permissionRouter])
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', allMenuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', allMenuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', allMenuHeader)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    '$route.matched'(val) {
      const _side = allMenuAside.filter(menu => menu.path === val[0].path)
      this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
    }
  }
}).$mount('#app')
