import Vue from 'vue';
import Options from './Options';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueSimpleAccordion from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';
import Vuex from 'vuex';
import './styles/options.scss';
import './styles/tailwind.css';
import store from './scripts/store';

Vue.use(VueSimpleAccordion, {
  // ... Options go here
});

library.add(faTasks);

Vue.component('fa-icon', FontAwesomeIcon);
// Vue.use(Vuex);

new Vue({
  render: h => h(Options),
  // template: Options,
  store,
}).$mount('#app');
