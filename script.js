import { cards } from './js/Cards.js';

const applicationState = {
  isTrain: true,
  isCategoriesPage: true,
  isStartGame: false,
  numOfTrainPage: 0,
  isFlip: false,
  correctGame: true,
};

let counter = 0;
let errorCounter = 0;
const statisticArr = cards.slice(0);

const completeStatisticArr = () => {
  for (let i = 1; i <= 8; i += 1) {
    statisticArr[i].forEach((el) => {
      const element = el;
      element.category = statisticArr[0][i - 1];
      element.trainClick = 0;
      element.correct = 0;
      element.uncorrect = 0;
      element.precentCorrect = 0;
    });
  }
};

completeStatisticArr();

const pushStatisticArrToTable = () => {
  if (document.querySelectorAll('tbody tr')) {
    document.querySelectorAll('tbody tr').forEach((element) => {
      element.remove();
    });
  }
  for (let i = 1; i <= 8; i += 1) {
    statisticArr[i].forEach((element) => {
      document.querySelector('tbody').insertAdjacentHTML('beforeend', `
  <tr>
<td>${element.category}</td>
<td>${element.word}</td>
<td>${element.translation}</td>
<td>${element.trainClick}</td>
<td>${element.correct}</td>
<td>${element.uncorrect}</td>
<td>${element.precentCorrect}</td>
</tr>
  `);
    });
  }
};

pushStatisticArrToTable();

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
    applicationState.isFlip = true;
    parent.parentElement.addEventListener('mouseleave', () => {
      parent.style.transform = 'rotateY(0deg)';
      applicationState.isFlip = false;
    }, { once: true });
  }
};

const changeRepeatButtonToStart = () => {
  const startButton = document.querySelector('.start-button');
  startButton.classList.add('pulse');
  startButton.classList.add('red');
  startButton.classList.remove('green');
  startButton.innerHTML = 'START GAME';
};

const changeStartGameButtonToRepeat = () => {
  const startButton = document.querySelector('.start-button');
  startButton.classList.remove('pulse');
  startButton.classList.remove('red');
  startButton.classList.add('green');
  startButton.innerHTML = 'REPEAT';
};

const deleteAllStars = () => {
  if (document.querySelectorAll('.star-container i')) {
    document.querySelectorAll('.star-container i').forEach((element) => {
      element.remove();
    });
  }
};

const coloredAllCards = () => {
  document.querySelectorAll('.flipper').forEach((element) => {
    element.classList.remove('uncolor');
  });
};

const goToHomePage = () => {
  changeRepeatButtonToStart();
  applicationState.isStartGame = false;
  deleteAllStars();
  coloredAllCards();
  errorCounter = 0;
  counter = 0;
  applicationState.correctGame = true;
  applicationState.numOfTrainPage = 0;
  document.querySelector('.categories').classList.remove('disabled-element');
  document.querySelector('.train').classList.add('disabled-element');
};

let arrOfSoundSources;
let arrOfSoundSourcesUnsort;

const changeVariablesOfTrainCards = (numOfPage) => {
  arrOfSoundSources = [];
  arrOfSoundSourcesUnsort = [];
  document.querySelectorAll('.flipper-container').forEach((element, number) => {
    element.querySelectorAll('.image').forEach((el) => {
      const e = el;
      e.src = `${cards[numOfPage][number].image}`;
    });
    const elem = element;
    elem.querySelector('.word').innerHTML = `${cards[numOfPage][number].word}`;
    elem.querySelector('.translation').innerHTML = `${cards[numOfPage][number].translation}`;
    arrOfSoundSources.push(`${cards[numOfPage][number].audioSrc}`);
    arrOfSoundSourcesUnsort.push(`${cards[numOfPage][number].audioSrc}`);
  });
};

const goToTrainPage = (numOfPage) => {
  changeRepeatButtonToStart();
  applicationState.isStartGame = false;
  deleteAllStars();
  coloredAllCards();
  applicationState.correctGame = true;
  counter = 0;
  errorCounter = 0;
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
  return false;
};

const nameCardOnClick = (event) => {
  if (!applicationState.isStartGame && !applicationState.isFlip
      && applicationState.isTrain && getNumberOfTrainClickedCard(event) !== false) {
    const audio = new Audio(`${cards[applicationState.numOfTrainPage][getNumberOfTrainClickedCard(event)].audioSrc}`);
    audio.play();
  }
};

const randomizeArrOfSoundSources = () => {
  function makeRandomArr() {
    return Math.random() - 0.5;
  }
  arrOfSoundSources.sort(makeRandomArr);
};

function playRandomWord() {
  const audio = new Audio(`${arrOfSoundSources[counter]}`);
  audio.play();
}

const startGameOnClick = (event) => {
  if (event.target.classList.contains('start-button') && !applicationState.isStartGame) {
    applicationState.isStartGame = true;
    changeStartGameButtonToRepeat();
    randomizeArrOfSoundSources();
    playRandomWord();
  } else if (event.target.classList.contains('start-button') && applicationState.isStartGame) playRandomWord();
};

const playCorrectSound = () => {
  const audio = new Audio('audio/correct.mp3');
  audio.play();
};

const playUncorrectSound = () => {
  const audio = new Audio('audio/error.mp3');
  audio.play();
};

const playWinSound = () => {
  const audio = new Audio('audio/success.mp3');
  audio.play();
};

const playLoseSound = () => {
  const audio = new Audio('audio/failure.mp3');
  audio.play();
};

const uncolorCard = (numberOfTrainClickedCard) => {
  document.querySelector(`.flipper${numberOfTrainClickedCard + 1}`).classList.add('uncolor');
};

const isUncoloredCard = (numberOfTrainClickedCard) => document.querySelector(`.flipper${numberOfTrainClickedCard + 1}`).classList.contains('uncolor');

const addYellowStar = () => {
  document.querySelector('.star-container').insertAdjacentHTML('beforeend', `
  <i class="material-icons yellow-text star">star</i>
  `);
};

const addGreyStar = () => {
  errorCounter += 1;
  document.querySelector('.star-container').insertAdjacentHTML('beforeend', `
  <i class="material-icons grey-text star">star</i>
  `);
};

const deleteExtraStar = () => {
  if (document.querySelectorAll('.star-container i').length > 8) { document.querySelectorAll('.star-container i')[0].remove(); }
};

const showWinModal = () => {
  document.querySelector('.end-game').classList.remove('disabled-element');
  document.querySelector('.end-game i').innerHTML = 'mood';
  document.querySelector('.end-game h1').innerHTML = 'ERRORS: 0';
};

const showLoseModal = () => {
  document.querySelector('.end-game').classList.remove('disabled-element');
  document.querySelector('.end-game i').innerHTML = 'mood_bad';
  document.querySelector('.end-game h1').innerHTML = `ERRORS: ${errorCounter}`;
};

const closeWinModal = () => {
  document.querySelector('.end-game').classList.add('disabled-element');
};

const endGame = () => {
  if (applicationState.correctGame) {
    showWinModal();
    playWinSound();
  } else {
    showLoseModal();
    playLoseSound();
  }
  changeRepeatButtonToStart();
  applicationState.isStartGame = false;
  deleteAllStars();
  applicationState.correctGame = true;
  counter = 0;
  coloredAllCards();
  setTimeout(() => {
    closeWinModal();
    goToHomePage();
    lightHomeTegSideMenu();
  }, 4000);
  errorCounter = 0;
};

const game = (event) => {
  if (getNumberOfTrainClickedCard(event) !== false && applicationState.isStartGame
      && !isUncoloredCard(getNumberOfTrainClickedCard(event))) {
    if (arrOfSoundSources[counter]
        !== arrOfSoundSourcesUnsort[getNumberOfTrainClickedCard(event)]) {
      playUncorrectSound();
      addGreyStar();
      deleteExtraStar();
      applicationState.correctGame = false;
    }
    if (arrOfSoundSources[counter]
        === arrOfSoundSourcesUnsort[getNumberOfTrainClickedCard(event)]) {
      playCorrectSound();
      uncolorCard(getNumberOfTrainClickedCard(event));
      addYellowStar();
      deleteExtraStar();
      if (counter < 7) {
        counter += 1;
        window.setTimeout(playRandomWord, 1000);
      } else { window.setTimeout(endGame, 1000); }
    }
  }
};

const addCheckboxClickHandler = () => {
  document.querySelector('.checkbox').addEventListener('click', () => {
    changeStateIsTrain();
    changeColorOfCategoryCards();
    changeTrainCards();
    changeRepeatButtonToStart();
    applicationState.isStartGame = false;
    applicationState.correctGame = true;
    deleteAllStars();
    coloredAllCards();
    errorCounter = 0;
    counter = 0;
    if (arrOfSoundSources) randomizeArrOfSoundSources();
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
    startGameOnClick(event);
    game(event);
  });
};

window.onload = function () {
  addCheckboxClickHandler();
  addSidenavClickHandler();
  addCategoriesClickHandler();
  addTrainClickHandler();
};
