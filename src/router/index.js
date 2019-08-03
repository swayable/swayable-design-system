import Vue from 'vue'
import Router from 'vue-router'
import LightTheme from '@/templates/LightTheme'
import DarkTheme from '@/templates/DarkTheme'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LightTheme',
      component: LightTheme,
    },
    {
      path: '*',
      name: 'DarkTheme',
      component: DarkTheme,
    },
  ],
})
