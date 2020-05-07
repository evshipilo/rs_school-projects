import '../css/style.scss';
import Swiper from 'swiper';

import M from 'materialize-css/dist/js/materialize.min';
// import { sumMy } from './module/sum';
// console.log(`welcome from module: ${sumMy(3)(7)}`);

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
    showData(filmData.Search, arrOfPosters, arrOfRatings);
    initModal();
  }
}

function initModal() {
  const elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
}

function showData(filmDataArr, arrOfPosters, filmFullDataArr) {
  document.querySelector('.swiper-wrapper').insertAdjacentHTML('afterbegin',
    `<div class="swiper-slide grey lighten-5">
<div class="title-container center truncate">
<a class="slide-title " href="https://www.imdb.com/title/${filmDataArr[0].imdbID}/videogallery/" target="_blank">
${filmDataArr[0].Title}</a>
</div>
<div class="poster-container">
<div class="no-poster center">
<h5>NO POSTER</h5>
<i class="material-icons  large red-text">event_busy</i>
</div>
<img src="${arrOfPosters[0].value}" alt="" class="poster">
</div>
<div class="slide-footer">
<span>${filmDataArr[0].Year} year.</span>
<i class="material-icons yellow-text star">star</i>
<span>${filmFullDataArr[0].value.imdbRating}</span>
</div>
<div class="center more-info">
<a class="waves-effect waves-light btn-small modal-trigger" href="#modal1">More info</a>
<div id="modal1" class="modal">
    <div class="modal-content left-align">
      <p><u>Title:</u> ${filmFullDataArr[0].value.Title}</p>
      <p><u>Actors:</u> ${filmFullDataArr[0].value.Actors}</p>
      <p><u>Awards:</u> ${filmFullDataArr[0].value.Awards}</p>
      <p><u>BoxOffice:</u> ${filmFullDataArr[0].value.BoxOffice}</p>
      <p><u>Country:</u> ${filmFullDataArr[0].value.Country}</p>
      <p><u>Director:</u> ${filmFullDataArr[0].value.Director}</p>
      <p><u>Genre:</u> ${filmFullDataArr[0].value.Genre}</p>
      <p><u>Plot:</u> ${filmFullDataArr[0].value.Plot}</p>
      <p><u>Production:</u> ${filmFullDataArr[0].value.Production}</p>
      <p><u>Rated:</u> ${filmFullDataArr[0].value.Rated}</p>
      <p><u>Runtime:</u> ${filmFullDataArr[0].value.Runtime}</p>
      <p><u>Website:</u> ${filmFullDataArr[0].value.Website}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn ">OK</a>
    </div>
  </div>
</div>
</div>`);
}

// <div class="poster" style="background-image:
// url(${arrOfPosters[0].value})";></div>

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
