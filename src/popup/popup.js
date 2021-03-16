/* eslint-disable import/no-extraneous-dependencies */
import './popup.css';
import 'tailwindcss/tailwind.css';
import Vue from 'vue';
import Popup from './Popup.vue';
import Router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSlidersH, faArrowLeft, faInfoCircle, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSlidersH);
library.add(faArrowLeft);
library.add(faInfoCircle);
library.add(faTachometerAlt);



Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(Popup),
}).$mount('#app');
