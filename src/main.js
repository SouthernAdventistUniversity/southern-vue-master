// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueCarousel from 'vue-carousel';
import './components/globals/_globals';

Vue.config.productionTip = false;

Vue.use(VueCarousel);

console.log('new vue');
/* eslint-disable no-new */
new Vue({
  el: '#app',
});