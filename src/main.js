// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import router from '@/router/index.js'
import MyBread from '@/components/cuscom/myBread.vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css'
import MyHttpSever from '@/plugins/https.js'
import moment from 'moment'

Vue.use(ElementUI)
Vue.use(MyHttpSever)

Vue.config.productionTip = false

Vue.filter('fmtdate',(v)=>{
	return moment(v).format('YYYY-MM-DD')
})
// 自定义全局组件--面包屑
Vue.component(MyBread.name,MyBread)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
