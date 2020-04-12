import { cards } from './js/Cards.js';

const applicationState = {
  isTrain: 'true',
  isCategoriesPage: 'true',
  flip: 'false',
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
    applicationState.flip = true;
    const parent = e.target.parentElement;
    parent.style.transform = 'rotateY(180deg)';
    parent.parentElement.addEventListener('mouseleave', () => {
      parent.style.transform = 'rotateY(0deg)';
    }, { once: true });
  }
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
};
