import Vue from 'vue';
import Options from './Options';
import './tailwind.css';

new Vue({
  render: h => h(Options),
  template: Options,
}).$mount('#app');
