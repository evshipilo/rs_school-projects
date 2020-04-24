import '../css/style.scss'
import M from 'materialize-css/dist/js/materialize.min'
import { sumMy } from './module/sum'

// console.log(`welcome from module: ${sumMy(3)(7)}`)

const applicationState = {
  difficulty: 0
}

let arrayOfWordsRandom = []

window.onload = function () {
  renderCards(applicationState.difficulty, getRandomPageNumber())
  addCardsClickHandler()
  // addButtonsClickHandler()
  addDifficultyClickHandler()
}

function addDifficultyClickHandler() {
  document.querySelector('.pagination').addEventListener('click', (evt) => {
    lightSelectedDifficulty(evt)
    renderCards(applicationState.difficulty, getRandomPageNumber())
  })
}

function addCardsClickHandler() {
  document.querySelector('.cards-container').addEventListener('click', (evt) => {
    lightSelectedCard(evt)
    // showTranslation()
    // showImage()
    // playSound()
  })
}

function lightSelectedCard(evt) {
  document.querySelectorAll('.word-card').forEach((item, num) => {
    item.classList.remove('blue')
    item.classList.remove('lighten-4')
    item.querySelectorAll('*').forEach((it) => {
      if (evt.target === it) {
        item.classList.add('blue')
        item.classList.add('lighten-4')
      }
    })
  })
}

function lightSelectedDifficulty(evt) {
  document.querySelectorAll('.pagination a').forEach((item, num) => {
    item.parentElement.classList.remove('active')
    if (evt.target.classList.contains(`pagination-${num}`)) {
      item.parentElement.classList.add('active')
      applicationState.difficulty = num
    }
  })
}

function getRandomPageNumber() {
  return Math.round(30 * Math.random() - 0.5)
}

function getArrayOfWordsRandom(arr) {
  function makeRandomArr() {
    return Math.random() - 0.5
  }
  return arr.sort(makeRandomArr)
}

async function renderCards(difficulty, pageNumber) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${pageNumber}&group=${difficulty}`
  const res = await fetch(url)
  const json = await res.json()
  arrayOfWordsRandom = getArrayOfWordsRandom(Array.from(json))
  //console.log(arrayOfWordsRandom)
  insertTextInCards()
}

function insertTextInCards() {
  for (let i = 0; i < 10; i += 1) {
    document.querySelector(`.card${i} .word`).innerHTML = arrayOfWordsRandom[i].word
    document.querySelector(`.card${i} .transcription`).innerHTML = arrayOfWordsRandom[i].transcription
  }
}

async function getTranslation (item, num) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200423T131720Z.5b6ec330d739656c.c9086fb5348e50291ba432745fd8571fc4c5ecdc&text= ${item.word} &lang=en-ru`
  const res = await fetch(url)
  const json = await res.json()
  item.translation = json.text[0]
}
