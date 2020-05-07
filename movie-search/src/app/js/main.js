import '../css/style.scss';
import Swiper from 'swiper';
import M from 'materialize-css/dist/js/materialize.min';
import { showData } from './module/showData';

const appState = {
  query: '',
  currentPage: 1,
  numOfPages: 1,
  filmData: false,
  arrOfRatings: [],
  arrOfPosters: [],
};
const formSearch = document.forms[0];

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
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
  on: {
    slideChange() {
      console.log(swiper.activeIndex);
    },
  },
});

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
        insertDataInHtml(appState.query, appState.currentPage);
      }
    } else {
      appState.query = searchQuery;
      insertDataInHtml(appState.query, appState.currentPage);
    }
  } else {
    typeMessage('Empty query, type movie title and press FIND!');
  }
}

async function insertDataInHtml(query, page) {
  if (page === 1)typeMessage(`Looking for "${query}"`);
  appState.filmData = await getMovieTitle(page, query);
  if (appState.filmData) {
    appState.arrOfRatings = await Promise.allSettled(getArrayOfRatingPromises(appState.filmData.Search));
    appState.arrOfPosters = await Promise.allSettled(getArrayOfPosterPromises(appState.filmData.Search));
    console.log(appState.arrOfRatings, appState.filmData, appState.arrOfPosters);
    if (page === 1)clearSlider();
    showData(appState.filmData.Search, appState.arrOfPosters, appState.arrOfRatings);
    hideProgress();
    typeMessage(`Results for "${query}"`);
    initModal();
  }
}

function clearSlider() {
  const element = document.querySelector('.modal-info');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  const element1 = document.querySelector('.swiper-wrapper');
  while (element1.firstChild) {
    element1.removeChild(element1.firstChild);
  }
}

function initModal() {
  const el = document.querySelectorAll('.modal');
  M.Modal.init(el);
}

const getPoster = async function (item) {
  let response;
  try {
    response = await fetch(item.Poster);
  } catch (e) {
    return false;
  }
  const blob = await response.blob();
  const image = new Image();
  image.src = URL.createObjectURL(blob);
  return image.src;
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
