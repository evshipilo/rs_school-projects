import { cards } from './js/Cards.js';

const applicationState = {
  isTrain: 'true',
  isCategoriesPage: 'true',
};

function changeStateIsTrain() {
  if (document.querySelector('.checkbox').checked) applicationState.isTrain = false;
  else applicationState.isTrain = true;
}

const changeColorOfCategoryCards = () => {
  if (applicationState.isTrain) {
    document.querySelectorAll('.categories-card').forEach((el) => {
      el.classList.remove('play-gradient');
      el.classList.add('train-gradient');
    });
  } else {
    document.querySelectorAll('.categories-card').forEach((el) => {
      el.classList.remove('train-gradient');
      el.classList.add('play-gradient');
    });
  }
};

const addSwitchClickHandler = () => {
  document.querySelector('.checkbox').addEventListener('click', () => {
    changeStateIsTrain();
    changeColorOfCategoryCards();
  });
};

window.onload = function () {
  addSwitchClickHandler();
};
