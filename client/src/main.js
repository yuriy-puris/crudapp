import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './routes'
import store from './store/store'
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
