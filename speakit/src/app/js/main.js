import '../css/style.scss'
import M from 'materialize-css/dist/js/materialize.min'
import { sumMy } from './module/sum'

// console.log(`welcome from module: ${sumMy(3)(7)}`)

const applicationState = {
  difficulty: 0,
  gameMode: false
}

let arrayOfWordsRandom = []

window.onload = function () {
  renderCards(applicationState.difficulty, getRandomPageNumber())
  addCardsClickHandler()
  addSpeakClickHandler()
  addDifficultyClickHandler()
}

function addSpeakClickHandler() {
  document.querySelector('.speak').addEventListener('click', (evt) => {
    lightSelectedCard(evt)
    applicationState.gameMode = true
    document.querySelector('.mic').classList.remove('disable')
    document.querySelector('.transcription').innerHTML = 'Speak please'
    speechToText()
  })
}

function addDifficultyClickHandler() {
  document.querySelector('.pagination').addEventListener('click', (evt) => {
    document.querySelector('.transcription').innerHTML = 'SpeakIt!'
    lightSelectedCard(evt)
    lightSelectedDifficulty(evt)
    renderCards(applicationState.difficulty, getRandomPageNumber())
  })
}

function addCardsClickHandler() {
  document.querySelector('.cards-container').addEventListener('click', (evt) => {
    if (!applicationState.gameMode) {
      lightSelectedCard(evt)
      showClickedWord(evt)
    }
  })
}

function speechToText() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.continuous = true
  recognition.lang = 'en-EN'
  // recognition.interimResults = false
  recognition.maxAlternatives = 5
  recognition.start()
  recognition.onaudiostart = function() {
    console.log('starting')
  }
  recognition.onresult = function (event) {
    console.log(event.results[event.results.length-1][0].transcript)
    //console.log(event.results.length)
  }
}

async function showImage(item) {
  const prom = new Promise((resolve) => {
    const newImg = new Image()
    const [, fileName] = item.split('/')
    newImg.src = `https://raw.githubusercontent.com/evshipilo/rslang-data/master/data/${fileName}`
    newImg.classList.add('responsive-img')
    newImg.addEventListener('load', () => { resolve(newImg) })
  })
  const newImg = await prom
  document.querySelector('.card-image img').replaceWith(newImg)
}

function playSound(item) {
  if (document.querySelector('audio'))document.querySelector('audio').remove()
  const [, fileName] = item.split('/')
  document.querySelector('body').insertAdjacentHTML('beforeend', `
  <audio src="https://raw.githubusercontent.com/evshipilo/rslang-data/master/data/${fileName}" autoplay></audio>
  `)
}

function showClickedWord(evt) {
  document.querySelectorAll('.word-card').forEach((item, num) => {
    item.querySelectorAll('*').forEach((it) => {
      if (evt.target === it) {
        getTranslation(arrayOfWordsRandom[num])
        showImage(arrayOfWordsRandom[num].image)
        playSound(arrayOfWordsRandom[num].audio)
      }
    })
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
  console.log(arrayOfWordsRandom)
  insertTextInCards()
}

function insertTextInCards() {
  for (let i = 0; i < 10; i += 1) {
    document.querySelector(`.card${i} .word`).innerHTML = arrayOfWordsRandom[i].word
    document.querySelector(`.card${i} .transcription`).innerHTML = arrayOfWordsRandom[i].transcription
  }
}

async function getTranslation (item) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200423T131720Z.5b6ec330d739656c.c9086fb5348e50291ba432745fd8571fc4c5ecdc&text= ${item.word} &lang=en-ru`
  const res = await fetch(url)
  const json = await res.json()
  document.querySelector('.transcription').innerHTML = json.text[0]
}
