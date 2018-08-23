// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import './components/globals/_globals';

import('./styles/site.scss');

Vue.config.productionTip = false;

UIkit.use(Icons);

/* eslint-disable no-new */
new Vue({
  el: '#app',
});