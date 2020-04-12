import { cards } from './js/Cards.js';

const applicationState = {
  isTrain: 'true',
  isCategoriesPage: 'true',
  isStartGame: 'false',
};

const changeStateIsTrain = () => {
  if (document.querySelector('.checkbox').checked) applicationState.isTrain = false;
  else applicationState.isTrain = true;
};


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

const changeTrainCards = () => {
  if (applicationState.isTrain) {
    document.querySelector('.stars-row').classList.add('disabled-element');
    document.querySelectorAll('.train-card').forEach((el) => {
      el.classList.remove('play-gradient');
      el.classList.add('train-gradient');
    });
    document.querySelectorAll('.removable').forEach((el) => {
      el.classList.remove('disabled-element');
    });
    document.querySelectorAll('.help').forEach((el) => {
      el.classList.remove('disabled-element');
    });
  } else {
    document.querySelector('.stars-row').classList.remove('disabled-element');
    document.querySelectorAll('.train-card').forEach((el) => {
      el.classList.remove('train-gradient');
      el.classList.add('play-gradient');
    });
    document.querySelectorAll('.removable').forEach((el) => {
      el.classList.add('disabled-element');
    });
    document.querySelectorAll('.help').forEach((el) => {
      el.classList.add('disabled-element');
    });
  }
};


const flipOnHelpClick = (event) => {
  if (event.target.classList.contains('help')) {
    const e = event;
    const parent = e.target.parentElement;
    parent.style.transform = 'rotateY(180deg)';
    parent.parentElement.addEventListener('mouseleave', () => {
      parent.style.transform = 'rotateY(0deg)';
    }, { once: true });
  }
};

const goToHomePage = () => {
  applicationState.isStartGame = false;
  document.querySelector('.categories').classList.remove('disabled-element');
  document.querySelector('.train').classList.add('disabled-element');
};

const changeVariablesOfTrainCards = (numOfPage) => {

};

const goToTrainPage = (numOfPage) => {
  document.querySelector('.categories').classList.add('disabled-element');
  document.querySelector('.train').classList.remove('disabled-element');
  changeVariablesOfTrainCards(numOfPage);
};

const addSidenavClickHandler = () => {
  document.querySelector('.sidenav').addEventListener('click', (event) => {
    if (event.target.classList.contains('set0')) goToHomePage();
    for (let i = 1; i <= 8; i += 1) {
      if (event.target.classList.contains(`set${i}`)) goToTrainPage(i);
    }
  });
};

const addQuestionClickHandler = () => {
  document.querySelector('.train').addEventListener('click', flipOnHelpClick);
};


const addCheckboxClickHandler = () => {
  document.querySelector('.checkbox').addEventListener('click', () => {
    changeStateIsTrain();
    changeColorOfCategoryCards();
    changeTrainCards();
  });
};

window.onload = function () {
  addCheckboxClickHandler();
  addQuestionClickHandler();
  addSidenavClickHandler();
};
