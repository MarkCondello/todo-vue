import Vue from 'vue'
import App from './App.vue'
import {store} from './Store';
 
Vue.config.productionTip = false

new Vue({
  render: h => h(App), 
  store,
}).$mount('#app')
