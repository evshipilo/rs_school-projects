import { cards } from './js/Cards.js';

const applicationState = {
  isTrain: 'true',
  isCategoriesPage: 'true',
  isStartGame: 'false',
  numOfTrainPage: 0,
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
  applicationState.numOfTrainPage = 0;
  document.querySelector('.categories').classList.remove('disabled-element');
  document.querySelector('.train').classList.add('disabled-element');
};

const changeVariablesOfTrainCards = (numOfPage) => {
  document.querySelectorAll('.flipper-container').forEach((element, number) => {
    element.querySelectorAll('.image').forEach((el) => {
      const e = el;
      e.src = `${cards[numOfPage][number].image}`;
    });
    const elem = element;
    elem.querySelector('.word').innerHTML = `${cards[numOfPage][number].word}`;
    elem.querySelector('.translation').innerHTML = `${cards[numOfPage][number].translation}`;
  });
};

const goToTrainPage = (numOfPage) => {
  applicationState.numOfTrainPage = numOfPage;
  document.querySelector('.categories').classList.add('disabled-element');
  document.querySelector('.train').classList.remove('disabled-element');
  changeVariablesOfTrainCards(numOfPage);
};

const lightHomeTegSideMenu = () => {
  document.querySelectorAll('.sidenav a').forEach((element) => {
    element.classList.remove('train-gradient');
  });
  document.querySelector('li .set0').classList.add('train-gradient');
};

const lightActiveTegSideMenu = (numOfActiveTag) => {
  document.querySelectorAll('.sidenav a').forEach((element) => {
    element.classList.remove('train-gradient');
  });
  document.querySelector(`li .set${numOfActiveTag}`).classList.add('train-gradient');
};

const getNumberOfTrainClickedCard = (event) => {
  for (let i = 0; i <= 7; i += 1) {
    if (event.target.classList.contains(`card${i}`)) return i;
  }
};

const nameCardOnClick = (event) => {
  const audio = new Audio(`${cards[applicationState.numOfTrainPage][getNumberOfTrainClickedCard(event)].audioSrc}`);
  audio.play();
};

const addCheckboxClickHandler = () => {
  document.querySelector('.checkbox').addEventListener('click', () => {
    changeStateIsTrain();
    changeColorOfCategoryCards();
    changeTrainCards();
  });
};

const addCategoriesClickHandler = () => {
  document.querySelector('.categories').addEventListener('click', (event) => {
    for (let i = 1; i <= 8; i += 1) {
      if (event.target.classList.contains(`set${i}`)) {
        goToTrainPage(i); lightActiveTegSideMenu(i);
      }
    }
  });
};

const addSidenavClickHandler = () => {
  document.querySelector('.sidenav').addEventListener('click', (event) => {
    if (event.target.classList.contains('set0')) {
      goToHomePage(); lightHomeTegSideMenu();
    }
    for (let i = 1; i <= 8; i += 1) {
      if (event.target.classList.contains(`set${i}`)) {
        goToTrainPage(i); lightActiveTegSideMenu(i);
      }
    }
  });
};

const addTrainClickHandler = () => {
  document.querySelector('.train').addEventListener('click', (event) => {
    flipOnHelpClick(event);
    nameCardOnClick(event);
  });
};

window.onload = function () {
  addCheckboxClickHandler();
  addSidenavClickHandler();
  addCategoriesClickHandler();
  addTrainClickHandler();
};
