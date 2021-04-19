import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueChatScroll from 'vue-chat-scroll'
import './plugins/bootstrap-vue'

Vue.config.productionTip = false

import * as firebase_key from './firebase'

console.log(firebase_key)
Vue.use(VueChatScroll)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



