const files = require.context('./', true, /\.js$/);
import layoutHeaderAside from '@/layout/header-aside'

let componentMaps = {
    "layoutHeaderAside": layoutHeaderAside,
    "menu": () => import(/* webpackChunkName: "menu" */'@/pages/sys/menu'),
    "route": () => import(/* webpackChunkName: "route" */'@/pages/sys/route'),
    "role": () => import(/* webpackChunkName: "role" */'@/pages/sys/role'),
    "user": () => import(/* webpackChunkName: "user" */'@/pages/sys/user'),
    "interface": () => import(/* webpackChunkName: "interface" */'@/pages/sys/interface'),
}
files.keys().forEach((key) => {
    if (key === './index.js') return
    Object.assign(componentMaps, files(key).default)
})
export default componentMaps