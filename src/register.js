import Vue from 'vue';
// import Vue from 'vue/dist/vue.js';

// import Registration from "./components/register/Registration.vue";
// import '@components/globals/_globals';


Vue.config.productionTip = false

Vue.component('registration', require('./components/register/Registration.vue').default);

