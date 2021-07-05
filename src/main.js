import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import { actions, store } from './store/store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/fontcss.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$store = store;
Vue.prototype.$actions = actions;

Vue.filter('reverse', (value) => (value.reverse()));

new Vue({
  render: (h) => h(App),
}).$mount('#app');
