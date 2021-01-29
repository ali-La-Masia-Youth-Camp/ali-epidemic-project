import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueFullPage from 'vue-fullpage.js';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(VueFullPage);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
