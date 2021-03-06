import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index'
import Life from '@/views/life/life'
import My from '@/views/my/my'

// 官方的懒加载方案，需要在webpack.config.js中配置@babel/plugin-syntax-dynamic-import这个插件，否则babel不支持以下语法会报错。
// 下面的注释语法是打包生成的js的文件名，如果你想某几个组件打包到同一个文件，那么它们的注释语法的webpackChunkName的名字相同即可
// const Home = () =>
//   import(/* webpackChunkName: "group-foo-1" */ '../views/Home.vue');
// const RouterTest = () =>
//   import(/* webpackChunkName: "group-foo-1" */ '../views/RouterTest.vue');
// const VantTest = () =>
//   import(/* webpackChunkName: "group-foo-1" */ '../views/VantTest.vue');




//const Foo = () => import('./Foo.vue')  //路由懒加载
// https://blog.csdn.net/Sparkler123/article/details/88993598
Vue.use(Router);
export default new Router({
    mode: 'history',
    routes:[
      {
        path: '/',
        // name: 'Index',// 一级路由不要写name属性
        component: Index
      },
      {
        path: '/life',
        name: 'Life',
        component: Life
      },
      {
        path: '/my',
        name: 'My',
        component: My
      }
    ],
    // scrollBehavior(to, from, savedPosition) {
    //   return { x: 0, y: 0 }
    // }
})