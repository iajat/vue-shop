import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'

//elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
//三级联动组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)

//图片懒加载
import VueLazyload from 'vue-lazyload'
import laop from '@/assets/mar.jpg'
Vue.use(VueLazyload, {
  loading: laop,
})
//执行mock
import '@/mock/mockServe'

import 'swiper/css/swiper.css'


//统一收入API
import * as API from '@/api'
//vue.store
import store from './store'

/* import {reqLogOut} from '@/api'
reqLogOut();  */  

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
