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
  query: '',
};
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
    const searchValue = formSearch.elements.search.value;
    showFilms(searchValue);
  };
}


async function showFilms(searchQuery) {
  if (searchQuery) {
    showProgress();
    if (isRussianLetters(searchQuery)) {
      typeMessage('Trying to translate...');
      let translation = await getTranslation(searchQuery);
      if (translation) {
        translation = deleteSpaces(translation);
        appState.query = translation;
        insertDataInHtml(appState.query, 1);
      }
    } else {
      appState.query = searchQuery;
      insertDataInHtml(appState.query, 1);
    }
  } else {
    typeMessage('Empty query, type movie title and press FIND!');
  }
}

async function insertDataInHtml(query, page) {
  typeMessage(`Looking for "${query}"`);
  const filmData = await getMovieTitle(page, query);
  if (filmData) {
    const arrOfRatings = await Promise.allSettled(getArrayOfRatingPromises(filmData.Search));
    const arrOfPosters = await Promise.allSettled(getArrayOfPosterPromises(filmData.Search));
    console.log(arrOfRatings, filmData, arrOfPosters);
  }
}

const getPoster = async function (item) {
  let response;
  try {
    response = await fetch(item.Poster);
  } catch (e) {
    return false;
  }
  const blob = await response.blob();
  const image = new Image(300, 450);
  image.src = URL.createObjectURL(blob);
  return image;
};


const getRating = async function (item) {
  const url = `https://www.omdbapi.com/?i=${item.imdbID}&apikey=50a9f9f4`;
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    return false;
  }
  const data = await res.json();
  return data;
};

function getArrayOfRatingPromises(filmData) {
  const arr = filmData.map((item) => getRating(item));
  return arr;
}

function getArrayOfPosterPromises(filmData) {
  const arr = filmData.map((item) => getPoster(item));
  return arr;
}

function deleteSpaces(word) {
  return word.replace(/^\s/, '').replace(/\s$/, '');
}

async function getTranslation(item) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200423T131720Z.5b6ec330d739656c.c9086fb5348e50291ba432745fd8571fc4c5ecdc&text= ${item} &lang=ru-en`;
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    typeMessage(`${err}. Yandex translate not responding.`);
    hideProgress();
    return false;
  }
  const json = await res.json();
  return json.text[0];
}

async function getMovieTitle(page, title) {
  const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=50a9f9f4`;
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    typeMessage(`${err}. OmdbAPI not responding.`);
    hideProgress();
    return false;
  }
  const data = await res.json();
  if (data.Response === 'False') {
    hideProgress();
    typeMessage(`No results for '${title}'.`);
    return false;
  }
  return data;
}

function showProgress() {
  document.querySelector('.progress').classList.remove('hidden');
}

function hideProgress() {
  document.querySelector('.progress').classList.add('hidden');
}

function typeMessage(message) {
  document.querySelector('.message').innerHTML = message;
}

function isRussianLetters(word) {
  return !(word.search(/[А-яЁё]/) === -1);
}
