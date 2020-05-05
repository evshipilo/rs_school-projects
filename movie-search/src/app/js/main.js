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

// const appState = {
//   searchValue: '',
//   translation: '',
// };
const formSearch = document.forms[0];

window.onload = function () {
  document.querySelector('.search').focus();
  addFindClickHandler();
  addClearClickHandler();
};

function addClearClickHandler() {
  document.querySelector('.delete').addEventListener('click', () => {
    document.querySelector('form').reset();
  });
}

function addFindClickHandler() {
  document.querySelector('form').onsubmit = function (event) {
    event.preventDefault();
    // appState.searchValue = formSearch.elements.search.value;
    // if (appState.searchValue) {
    //   showProgress();
    //   if (isRussianLetters(appState.searchValue)) {
    //     typeMessage('Trying to translate...');
    //     getTranslation(appState.searchValue);
    //   } else {
    //     appState.translation = appState.searchValue;
    //     typeMessage(`Looking for "${appState.translation}"`);
    //     console.log('1');
    //     const rr = getMovieTitle(1, appState.translation);
    //     console.log(rr);
    //   }
    // } else {
    //   typeMessage('Empty query, type movie title and press FIND!');
    // }
    const searchValue = formSearch.elements.search.value;
    showFilms(searchValue);
  };
}


async function showFilms(searchQuery) {
  if (searchQuery) {
    showProgress();
    if (isRussianLetters(searchQuery)) {
      typeMessage('Trying to translate...');
      console.log(searchQuery, '0');
      const translation = deleteSpaces(await getTranslation(searchQuery));
      console.log(translation, '0');
      if (isRussianLetters(translation)) {
        hideProgress();
        typeMessage(`Wrong translation result "${translation}", type movie title and press FIND!`);
      } else {
        typeMessage(`Looking for "${translation}"`);
        console.log(translation, '1');
        const title = await getMovieTitle(1, translation);
        console.log(title, '1');
      }
    } else {
      typeMessage(`Looking for "${searchQuery}"`);
      console.log(searchQuery, '2');
      const title = await getMovieTitle(1, searchQuery);
      console.log(title, '2');
    }
  } else {
    typeMessage('Empty query, type movie title and press FIND!');
  }
}

function deleteSpaces(word) {
  return word.replace(/^\s/, '').replace(/\s$/, '');
}

async function getTranslation(item) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200423T131720Z.5b6ec330d739656c.c9086fb5348e50291ba432745fd8571fc4c5ecdc&text= ${item} &lang=ru-en`;
  const res = await fetch(url);
  const json = await res.json();
  return json.text[0];
  // [appState.translation] = json.text;
  // if (isRussianLetters(appState.translation)) {
  //   hideProgress();
  //   typeMessage(`Wrong translation result "${appState.translation}", type movie title and press FIND!`);
  // } else {
  //   typeMessage(`Looking for "${appState.translation}"`);
  //   console.log(appState.translation);
  //   const rr = getMovieTitle(1, appState.translation);
  //   console.log(rr);
  // }
}

async function getMovieTitle(page, title) {
  console.log(page, title);
  const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=50a9f9f4`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.Search[0].Title, data);

  return data.Search;
}

// function getMovieTitle(page, title) {
//   console.log('++++++++');
//   const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=50a9f9f4`;
//   return fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       //console.log(data.Search[0].Title);
//     });
// }

function showProgress() {
  document.querySelector('.progress').classList.remove('hidden');
}

function hideProgress() {
  document.querySelector('.progress').classList.add('hidden');
}

function typeMessage(message) {
  document.querySelector('.massage').innerHTML = message;
}

function isRussianLetters(word) {
  return !(word.search(/[А-яЁё]/) === -1);
}
