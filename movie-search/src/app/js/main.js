import '../css/style.scss';
import Swiper from 'swiper';
import M from 'materialize-css/dist/js/materialize.min';
import showData from './module/showData';
import * as Keyboard from './module/keyboard';

const appState = {
  query: 'sun',
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
  centerInsufficientSlides: true,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
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
      if ((appState.currentPage * 10 - swiper.activeIndex) < 8
        && appState.currentPage < appState.numOfPages) {
        appState.currentPage += 1;
        insertDataInHtml(appState.query, appState.currentPage);
      }
    },
  },
});
setHeightOfSlider();

Keyboard.dummy = 1;

window.onload = function () {
  document.querySelector('.search').focus();
  addFindClickHandler();
  addClearClickHandler();
  addKeyboardBtnClickHandler();
  addVirtualEnterClickHandler();
  insertDataInHtml(appState.query, appState.currentPage);
};

window.onresize = () => {
  setHeightOfSlider();
  setHeightOfPoster();
};

function addVirtualEnterClickHandler() {
  document.querySelector('.keyboard__keys').addEventListener('click', (event) => {
    if (event.target.id === 'Enter') {
      const searchValue = document.forms[0].elements.search.value;
      showFilms(searchValue);
    }
  });
}

function addKeyboardBtnClickHandler() {
  document.querySelector('.keyboard-btn').addEventListener('click', () => {
    document.querySelector('.keyboard').classList.toggle('disable');
    if (document.querySelector('.keyboard').classList.contains('disable')) {
      document.querySelector('.keyboard-btn-icon').innerHTML = 'keyboard';
    } else document.querySelector('.keyboard-btn-icon').innerHTML = 'close';
  });
}

function addClearClickHandler() {
  document.querySelector('.delete').addEventListener('click', () => {
    document.querySelector('form').reset();
  });
}

function setHeightOfSlider() {
  const [slideWidth] = getComputedStyle(document.querySelector('.swiper-slide')).width.split('px');
  document.querySelector('.swiper-container').style.height = `${+slideWidth * (1.75 + 100 / (+slideWidth * 0.9))}px`;
}

function setHeightOfPoster() {
  const [slideWidth] = getComputedStyle(document.querySelector('.swiper-slide')).width.split('px');
  document.querySelectorAll('.poster-container').forEach((it) => {
    const item = it;
    item.style.height = `${+slideWidth * 1.53}px`;
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
        translation = deleteSpaces(translation).toLowerCase();
        appState.query = deleteThe(translation);
        appState.currentPage = 1;
        insertDataInHtml(appState.query, appState.currentPage);
      }
    } else {
      appState.query = deleteSpaces(searchQuery).toLowerCase();
      appState.currentPage = 1;
      insertDataInHtml(appState.query, appState.currentPage);
    }
  } else {
    typeMessage('Empty query, type movie title and press FIND!');
  }
}

async function insertDataInHtml(query, page) {
  typeMessage(`Looking for "${query}"`);
  appState.filmData = await getMovieTitle(page, query);
  if (appState.filmData) {
    appState.numOfPages = Math.ceil(appState.filmData.totalResults / 10);
    appState.arrOfRatings = await Promise
      .allSettled(getArrayOfRatingPromises(appState.filmData.Search));
    appState.arrOfPosters = await Promise
      .allSettled(getArrayOfPosterPromises(appState.filmData.Search));
    if (page === 1)clearSlider();
    showData(appState.filmData.Search, appState.arrOfPosters, appState.arrOfRatings, page);
    hideProgress();
    typeMessage(`Results for "${query}"`);
    initModal();
    if (page === 1)animateSlidesOpacity();
    swiper.update();
    setHeightOfPoster();
  }
}

function animateSlidesOpacity() {
  document.querySelectorAll('.swiper-slide').forEach((it) => {
    it.animate([
      { opacity: '0' },
      { opacity: '1' },
    ], {
      duration: 2000,
      easing: 'ease-in',
      fill: 'forwards',
    });
  });
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
  return word.replace(/^\s+/, '').replace(/\s+$/, '');
}

function deleteThe(word) {
  return word.replace(/^the\s+/, '');
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
