import Vue from 'vue';
// import Vue from 'vue/dist/vue';

Vue.config.productionTip = false

Vue.component('library-available-laptops', require('./components/library/AvailableLaptops.vue').default);
Vue.component('library-available-rooms', require('./components/library/AvailableRooms.vue').default);
Vue.component('library-hours', require('./components/library/Hours.vue').default);
Vue.component('library-instagram', require('./components/library/Instagram.vue').default);
Vue.component('library-collections', require('./components/library/Collections.vue').default);
Vue.component('library-search', require('./components/library/Search.vue').default);
