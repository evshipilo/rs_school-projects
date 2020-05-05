import '../css/style.scss';
import Swiper from 'swiper';

import M from 'materialize-css/dist/js/materialize.min';
// import { sumMy } from './module/sum';
// console.log(`welcome from module: ${sumMy(3)(7)}`);

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
  },
});

const appState = {
  searchValue: '',

};
const formSearch = document.forms[0];

function addFindClickHandler() {
  document.querySelector('form').onsubmit = function (event) {
    event.preventDefault();
    appState.searchValue = formSearch.elements.search.value;
    console.log(appState.searchValue);
  };
}


window.onload = function () {
  document.querySelector('.search').focus();
  addFindClickHandler();
};
