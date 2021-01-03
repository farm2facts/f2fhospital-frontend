import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
import store from './store'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import router from './router'
import VueAxios from 'vue-axios'
import {securedAxiosInstance, plainAxiosInstance} from './backend/axios/index'

Vue.use(VueFormWizard)
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  render: h => h(App)
}).$mount('#app')
