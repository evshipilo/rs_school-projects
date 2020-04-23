import '../css/style.scss'
import { sumMy } from './module/sum'
import M from 'materialize-css/dist/js/materialize.min';


//console.log(`welcome from module: ${sumMy(3)(7)}`)

const applicationState = {
  // isTrain: true,
  // isCategoriesPage: true,
  // isStartGame: false,
  // numOfTrainPage: 0,
  // isFlip: false,
   difficulty: 0,
};

window.onload = function () {
  // showStartWords();
  // addCardsClickHandler();
  // addButtonsClickHandler();
   addDifficultyClickHandler();
};

function addDifficultyClickHandler() {
document.querySelector('.pagination').addEventListener('click',evt => {
  lightSelectedDifficulty(evt);

});
}

function lightSelectedDifficulty(evt) {
document.querySelectorAll('.pagination a').forEach((item,num)=>{
  item.parentElement.classList.remove('active');
  if(evt.target.classList.contains(`pagination-${num}`)) {
    item.parentElement.classList.add('active');
    applicationState.difficulty=num;

  }
});

}


//
// function showStartWords() {
//  getDifficulty();
//
//
// }

const getWords = async (page, group) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  const res = await fetch(url);
  const json = await res.json();
  console.log(JSON.stringify(json, null, 1));
};

getWords(2,2);

function getTranslation (word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200423T131720Z.5b6ec330d739656c.c9086fb5348e50291ba432745fd8571fc4c5ecdc&text= ${word} &lang=en-ru`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.text)
    });
}
getTranslation('lake');
