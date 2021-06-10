import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {Message} from "element-ui";
import { Notification } from 'element-ui';

Vue.config.productionTip = false
Vue.use(ElementUI);

import {postRequest} from "./util/api";
import {putRequest} from "./util/api";
import {getRequest} from "./util/api";
import {deleteRequest} from "./util/api";
import {Things} from "./common/const/globalConst";
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

//插件形式使用请求
Vue.prototype.nt = Notification;
Vue.prototype.gv = Things;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to, from, next)=>{
  if (window.sessionStorage.getItem('tokenStr')){
      clearInterval(Things.timeCount[0]);
      Things.timeCount[0] = null;
      clearInterval(Things.timeCount[1]);
      Things.timeCount[1] = null;
      next();
    }else{
    if (to.path == '/'){
      clearInterval(Things.timeCount[0]);
      clearInterval(Things.timeCount[1]);
      Things.timeCount[1] = null;
      Things.timeCount[0] = null;
      next();
    }else{
      Message.warning({message:'请先登录哟~'})
      clearInterval(Things.timeCount[1]);
      Things.timeCount[1] = null;
      clearInterval(Things.timeCount[0]);
      Things.timeCount[0] = null;
      next('/');
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
