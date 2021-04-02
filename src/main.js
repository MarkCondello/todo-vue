import Vue from 'vue'
import App from './App.vue'
import {store} from './Store';
import "./sass/app.scss";

import Theme from 'material-components-vue/dist/theme'
Vue.use(Theme)

import Button from 'material-components-vue/dist/button'
Vue.use(Button)

import IconButton from 'material-components-vue/dist/icon-button'
Vue.use(IconButton)

import Card from 'material-components-vue/dist/card'
Vue.use(Card)

import TopAppBar from 'material-components-vue/dist/top-app-bar';
Vue.use(TopAppBar)

import Menu from 'material-components-vue/dist/menu';
Vue.use(Menu)

import Icon from 'material-components-vue/dist/icon';
Vue.use(Icon)

import LayoutGrid from 'material-components-vue/dist/layout-grid';
Vue.use(LayoutGrid)
 
Vue.config.productionTip = false

new Vue({
  render: h => h(App), 
  store,
  data(){
    return {
      material: {
        '--mdc-theme-primary':  "#202124",
        '--mdc-theme-secondary': '#f5f5f5',
        '--mdc-theme-background': '#202124'
      }
    }
  },
}).$mount('#app')
