import log from './util.log.js'
import cookies from './util.cookies.js'
import { parse } from 'matchit'

let util = {
  cookies,
  log
}
/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}
/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-menu-link')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-menu-link'))
}
/**
 * @description 处理接口
 * @param {Array} interfaces 接口
 */
util.formatInterfaces = function (interfaces) {
  let i = {}
  i["GET"] = interfaces.filter(s => s.method.toUpperCase() === "GET").map(s => parse(s.path))
  i["POST"] = interfaces.filter(s => s.method.toUpperCase() === "POST").map(s => parse(s.path))
  i["PUT"] = interfaces.filter(s => s.method.toUpperCase() === "PUT").map(s => parse(s.path))
  i["DELETE"] = interfaces.filter(s => s.method.toUpperCase() === "DELETE").map(s => parse(s.path))
  return i
}

export default util
