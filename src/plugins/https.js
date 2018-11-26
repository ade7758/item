
import axios from 'axios'

const MyHttpSever = {}

MyHttpSever.install = (Vue) => {
 axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
 // 添加实例方法
  Vue.prototype.$https = axios
    
  }

export default MyHttpSever