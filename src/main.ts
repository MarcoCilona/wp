import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'

Vue.config.productionTip = false

if (module.hot)
  module.hot.accept()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
