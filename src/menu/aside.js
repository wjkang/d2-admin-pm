// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '演示页面',
    icon: 'folder-o',
    children: [
      { path: '/demo/page1', title: '页面 1' },
      { path: '/demo/page2', title: '页面 2' },
      { path: '/demo/page3', title: '页面 3' }
    ]
  },
  {
    title: '演示页面1',
    icon: 'folder-o',
    children: [
      { path: '/demo/page4', title: '页面 4' }
    ]
  }
]
