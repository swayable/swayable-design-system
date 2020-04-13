import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/templates/Index'
import Demo from '@/templates/Demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo,
    },
  ],
})
