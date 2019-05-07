const files = require.context('./', true, /\.js$/);

let autoGenerateMenus = []
let autoGenerateRouters = []
files.keys().forEach((key) => {
    if (key === './index.js') return
    if (key.indexOf('menu') > -1) {
        autoGenerateMenus.push(files(key).default)
    } else if (key.indexOf('router') > -1) {
        autoGenerateRouters.push(files(key).default)
    }
})
export default {
    menus: autoGenerateMenus,
    routers: autoGenerateRouters
}