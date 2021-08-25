import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase  from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import store from './store'



Vue.config.productionTip = false

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin);
Vue.use(Vuelidate);

let app = null
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app= new Vue({
      router,
      store,
      render:h => h(App)
    }).$mount('#app')
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
