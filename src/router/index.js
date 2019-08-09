import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/templates/Index'
import DarkTheme from '@/templates/DarkTheme'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/dark',
      name: 'Dark',
      component: DarkTheme,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})
