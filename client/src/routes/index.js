import Vue from 'vue'
import Router from 'vue-router'
import FirstView from '@/components/FirstView'
import UserInfo from '@/components/UserInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FirstView',
      component: FirstView
    },
    {
      path: '/login/:id',
      name: 'UserInfo',
      component: UserInfo
    }
  ]
})
