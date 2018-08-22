import Vue from 'vue';
import Flickity from 'vue-flickity';
import './styles/celebrates.scss';


Vue.config.productionTip = false
Vue.component('flickity', Flickity.default || Flickity);