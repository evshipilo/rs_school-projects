class Key {
  constructor(eventCode, rusChar, rusCharShift, engChar, engCharShift) {
    this.eventCode = eventCode;
    this.rusChar = rusChar;
    this.rusCharShift = rusCharShift;
    this.engChar = engChar;
    this.engCharShift = engCharShift;
    // switch language
    switch (localStorage.getItem('savedLetter')) {
      case 'q': this.currentChar = this.engChar;
        break;
      case 'Q': this.currentChar = this.engCharShift;
        break;
      case 'й': this.currentChar = this.rusChar;
        break;
      case 'Й': this.currentChar = this.rusCharShift;
        break;
      default: this.currentChar = this.engChar;
    }
  }

  static insertTextareaAndKeyboardDivToDOM() {
    const body = document.querySelector('.keyboard-container');
    body.insertAdjacentHTML('afterbegin', `<div class="keyboard disable"><div class="keyboard__keys"></div></div>`);
  }

  addWideClass() {
    if (this.eventCode === 'Backspace'
      || this.eventCode === 'Tab'
      || this.eventCode === 'CapsLock'
      || this.eventCode === 'ShiftLeft'
      || this.eventCode === 'ShiftRight'
      || this.eventCode === 'Enter') return 'keyboard__key--wide';
    return '';
  }

  addExtraWideClass() {
    if (this.eventCode === 'Space') return 'keyboard__key--extra-wide';
    return '';
  }

  addEndOfRow() {
    if (this.eventCode === 'Backspace'
      || this.eventCode === 'Backslash'
      || this.eventCode === 'Enter'
      || this.eventCode === 'ShiftRight') return '<br>';
    return '';
  }

  insertKeyToDOM() {
    const keyboardDiv = document.querySelector('.keyboard__keys');
    keyboardDiv.insertAdjacentHTML('beforeend', `
    <button id="${this.eventCode}" class="keyboard__key ${this.addWideClass()}
    ${this.addExtraWideClass()}">${this.currentChar}</button>${this.addEndOfRow()}
`);
  }

  isEventTarget(eventTargetId) {
    if (eventTargetId === this.eventCode) return true;
    return false;
  }
}

//----------------------------------------------------------------------
Key.insertTextareaAndKeyboardDivToDOM();

const keyboardDiv = document.querySelector('.keyboard__keys');
const keysValuesArr = [
  {
    eventCode: 'Backquote',
    rusChar: 'ё',
    rusCharShift: 'Ё',
    engChar: '`',
    engCharShift: '~',
  },
  {
    eventCode: 'Digit1',
    rusChar: '1',
    rusCharShift: '!',
    engChar: '1',
    engCharShift: '!',
  },
  {
    eventCode: 'Digit2',
    rusChar: '2',
    rusCharShift: '"',
    engChar: '2',
    engCharShift: '@',
  },
  {
    eventCode: 'Digit3',
    rusChar: '3',
    rusCharShift: '№',
    engChar: '3',
    engCharShift: '#',
  },
  {
    eventCode: 'Digit4',
    rusChar: '4',
    rusCharShift: ';',
    engChar: '4',
    engCharShift: '$',
  },
  {
    eventCode: 'Digit5',
    rusChar: '5',
    rusCharShift: '%',
    engChar: '5',
    engCharShift: '%',
  },
  {
    eventCode: 'Digit6',
    rusChar: '6',
    rusCharShift: ':',
    engChar: '6',
    engCharShift: '^',
  },
  {
    eventCode: 'Digit7',
    rusChar: '7',
    rusCharShift: '?',
    engChar: '7',
    engCharShift: '&',
  },
  {
    eventCode: 'Digit8',
    rusChar: '8',
    rusCharShift: '*',
    engChar: '8',
    engCharShift: '*',
  },
  {
    eventCode: 'Digit9',
    rusChar: '9',
    rusCharShift: '(',
    engChar: '9',
    engCharShift: '(',
  },
  {
    eventCode: 'Digit0',
    rusChar: '0',
    rusCharShift: ')',
    engChar: '0',
    engCharShift: ')',
  },
  {
    eventCode: 'Minus',
    rusChar: '-',
    rusCharShift: '_',
    engChar: '-',
    engCharShift: '_',
  },
  {
    eventCode: 'Equal',
    rusChar: '=',
    rusCharShift: '+',
    engChar: '=',
    engCharShift: '+',
  },
  {
    eventCode: 'Backspace',
    rusChar: 'Backspace',
    rusCharShift: 'Backspace',
    engChar: 'Backspace',
    engCharShift: 'Backspace',
  },
  {
    eventCode: 'Tab',
    rusChar: 'Tab',
    rusCharShift: 'Tab',
    engChar: 'Tab',
    engCharShift: 'Tab',
  },
  {
    eventCode: 'KeyQ',
    rusChar: 'й',
    rusCharShift: 'Й',
    engChar: 'q',
    engCharShift: 'Q',
  },
  {
    eventCode: 'KeyW',
    rusChar: 'ц',
    rusCharShift: 'Ц',
    engChar: 'w',
    engCharShift: 'W',
  },
  {
    eventCode: 'KeyE',
    rusChar: 'у',
    rusCharShift: 'У',
    engChar: 'e',
    engCharShift: 'E',
  },
  {
    eventCode: 'KeyR',
    rusChar: 'к',
    rusCharShift: 'К',
    engChar: 'r',
    engCharShift: 'R',
  },
  {
    eventCode: 'KeyT',
    rusChar: 'е',
    rusCharShift: 'Е',
    engChar: 't',
    engCharShift: 'T',
  },
  {
    eventCode: 'KeyY',
    rusChar: 'н',
    rusCharShift: 'Н',
    engChar: 'y',
    engCharShift: 'Y',
  },
  {
    eventCode: 'KeyU',
    rusChar: 'г',
    rusCharShift: 'Г',
    engChar: 'u',
    engCharShift: 'U',
  },
  {
    eventCode: 'KeyI',
    rusChar: 'ш',
    rusCharShift: 'Ш',
    engChar: 'i',
    engCharShift: 'I',
  },
  {
    eventCode: 'KeyO',
    rusChar: 'щ',
    rusCharShift: 'Щ',
    engChar: 'o',
    engCharShift: 'O',
  },
  {
    eventCode: 'KeyP',
    rusChar: 'з',
    rusCharShift: 'З',
    engChar: 'p',
    engCharShift: 'P',
  },
  {
    eventCode: 'BracketLeft',
    rusChar: 'х',
    rusCharShift: 'Х',
    engChar: '[',
    engCharShift: '{',
  },
  {
    eventCode: 'BracketRight',
    rusChar: 'ъ',
    rusCharShift: 'Ъ',
    engChar: ']',
    engCharShift: '}',
  },
  {
    eventCode: 'Backslash',
    rusChar: '\\',
    rusCharShift: '/',
    engChar: '\\',
    engCharShift: '|',
  },
  {
    eventCode: 'CapsLock',
    rusChar: 'CapsLock',
    rusCharShift: 'CapsLock',
    engChar: 'CapsLock',
    engCharShift: 'CapsLock',
  },
  {
    eventCode: 'KeyA',
    rusChar: 'ф',
    rusCharShift: 'Ф',
    engChar: 'a',
    engCharShift: 'A',
  },
  {
    eventCode: 'KeyS',
    rusChar: 'ы',
    rusCharShift: 'Ы',
    engChar: 's',
    engCharShift: 'S',
  },
  {
    eventCode: 'KeyD',
    rusChar: 'в',
    rusCharShift: 'В',
    engChar: 'd',
    engCharShift: 'D',
  },
  {
    eventCode: 'KeyF',
    rusChar: 'а',
    rusCharShift: 'А',
    engChar: 'f',
    engCharShift: 'F',
  },
  {
    eventCode: 'KeyG',
    rusChar: 'п',
    rusCharShift: 'П',
    engChar: 'g',
    engCharShift: 'G',
  },
  {
    eventCode: 'KeyH',
    rusChar: 'р',
    rusCharShift: 'Р',
    engChar: 'h',
    engCharShift: 'H',
  },
  {
    eventCode: 'KeyJ',
    rusChar: 'о',
    rusCharShift: 'О',
    engChar: 'j',
    engCharShift: 'J',
  },
  {
    eventCode: 'KeyK',
    rusChar: 'л',
    rusCharShift: 'Л',
    engChar: 'k',
    engCharShift: 'K',
  },
  {
    eventCode: 'KeyL',
    rusChar: 'д',
    rusCharShift: 'Д',
    engChar: 'l',
    engCharShift: 'L',
  },
  {
    eventCode: 'Semicolon',
    rusChar: 'ж',
    rusCharShift: 'Ж',
    engChar: ';',
    engCharShift: ':',
  },
  {
    eventCode: 'Quote',
    rusChar: 'э',
    rusCharShift: 'Э',
    engChar: '"',
    engCharShift: '"',
  },
  {
    eventCode: 'Enter',
    rusChar: 'Enter',
    rusCharShift: 'Enter',
    engChar: 'Enter',
    engCharShift: 'Enter',
  },
  {
    eventCode: 'ShiftLeft',
    rusChar: 'Shift',
    rusCharShift: 'Shift',
    engChar: 'Shift',
    engCharShift: 'Shift',
  },
  {
    eventCode: 'KeyZ',
    rusChar: 'я',
    rusCharShift: 'Я',
    engChar: 'z',
    engCharShift: 'Z',
  },
  {
    eventCode: 'KeyX',
    rusChar: 'ч',
    rusCharShift: 'Ч',
    engChar: 'x',
    engCharShift: 'X',
  },
  {
    eventCode: 'KeyC',
    rusChar: 'с',
    rusCharShift: 'С',
    engChar: 'c',
    engCharShift: 'C',
  },
  {
    eventCode: 'KeyV',
    rusChar: 'м',
    rusCharShift: 'М',
    engChar: 'v',
    engCharShift: 'V',
  },
  {
    eventCode: 'KeyB',
    rusChar: 'и',
    rusCharShift: 'И',
    engChar: 'b',
    engCharShift: 'B',
  },
  {
    eventCode: 'KeyN',
    rusChar: 'т',
    rusCharShift: 'Т',
    engChar: 'n',
    engCharShift: 'N',
  },
  {
    eventCode: 'KeyM',
    rusChar: 'ь',
    rusCharShift: 'Ь',
    engChar: 'm',
    engCharShift: 'M',
  },
  {
    eventCode: 'Comma',
    rusChar: 'б',
    rusCharShift: 'Б',
    engChar: ',',
    engCharShift: '<',
  },
  {
    eventCode: 'Period',
    rusChar: 'ю',
    rusCharShift: 'Ю',
    engChar: '.',
    engCharShift: '>',
  },
  {
    eventCode: 'Slash',
    rusChar: '.',
    rusCharShift: ',',
    engChar: '/',
    engCharShift: '?',
  },
  {
    eventCode: 'ArrowUp',
    rusChar: 'ᐃ',
    rusCharShift: 'ᐃ',
    engChar: 'ᐃ',
    engCharShift: 'ᐃ',
  },
  {
    eventCode: 'ShiftRight',
    rusChar: 'Shift',
    rusCharShift: 'Shift',
    engChar: 'Shift',
    engCharShift: 'Shift',
  },
  {
    eventCode: 'ControlLeft',
    rusChar: 'Ctrl',
    rusCharShift: 'Ctrl',
    engChar: 'Ctrl',
    engCharShift: 'Ctrl',
  },
  {
    eventCode: 'Delete',
    rusChar: 'Del',
    rusCharShift: 'Del',
    engChar: 'Del',
    engCharShift: 'Del',
  },
  {
    eventCode: 'Alt',
    rusChar: 'Alt',
    rusCharShift: 'Alt',
    engChar: 'Alt',
    engCharShift: 'Alt',
  },
  {
    eventCode: 'Space',
    rusChar: ' ',
    rusCharShift: ' ',
    engChar: ' ',
    engCharShift: ' ',
  },
  {
    eventCode: 'ContextMenu',
    rusChar: 'ру',
    rusCharShift: 'РУ',
    engChar: 'eng',
    engCharShift: 'ENG',
  },
  {
    eventCode: 'ControlRight',
    rusChar: 'Ctrl',
    rusCharShift: 'Ctrl',
    engChar: 'Ctrl',
    engCharShift: 'Ctrl',
  },
  {
    eventCode: 'ArrowLeft',
    rusChar: 'ᐊ',
    rusCharShift: 'ᐊ',
    engChar: 'ᐊ',
    engCharShift: 'ᐊ',
  },
  {
    eventCode: 'ArrowDown',
    rusChar: 'ᐁ',
    rusCharShift: 'ᐁ',
    engChar: 'ᐁ',
    engCharShift: 'ᐁ',
  },
  {
    eventCode: 'ArrowRight',
    rusChar: 'ᐅ',
    rusCharShift: 'ᐅ',
    engChar: 'ᐅ',
    engCharShift: 'ᐅ',
  },
];
const textarea = document.querySelector('.search');
const keysArr = [];
let isPressingOnShift = false;
let isPressingOnShiftPhysics = false;
let isPressingOnCapsLockPhysics = false;
let isPressingOnCtrlShiftPhysics = false;

// create Array of objects Key Class type
keysValuesArr.forEach((item) => {
  keysArr.push(new Key(item.eventCode, item.rusChar,
    item.rusCharShift, item.engChar, item.engCharShift));
});

function insertKeysToDOM() {
  keysArr.forEach((object) => {
    object.insertKeyToDOM();
  });
}

insertKeysToDOM();

function insertButtonsValues() {
  for (let i = 0; i < keysArr.length; i += 1) {
    document.querySelectorAll('button')[i].innerHTML = keysArr[i].currentChar;
  }
}

function isServiceKey(event) {
  switch (event.target.id) {
    case 'ControlLeft': return true;
    case 'Delete': return true;
    case 'ControlRight': return true;
    case 'ShiftLeft': return true;
    case 'ShiftRight': return true;
    case 'Alt': return true;
    case 'CapsLock': return true;
    case 'ContextMenu': return true;
    case 'Tab': return true;
    case 'Backspace': return true;
    case 'Enter': return true;
    case 'ArrowUp': return true;
    case 'ArrowDown': return true;
    case 'ArrowLeft': return true;
    case 'ArrowRight': return true;
    default: return false;
  }
}

function capsLockToggle() {
  keysArr.forEach((obj) => {
    const object = obj;
    switch (object.currentChar) {
      case object.engChar: object.currentChar = object.engCharShift;
        break;
      case object.engCharShift: object.currentChar = object.engChar;
        break;
      case object.rusChar: object.currentChar = object.rusCharShift;
        break;
      case object.rusCharShift: object.currentChar = object.rusChar;
        break;
      default: return false;
    } return false;
  });
}

function languageToggle() {
  keysArr.forEach((obj) => {
    const object = obj;
    switch (object.currentChar) {
      case object.engChar: object.currentChar = object.rusChar;
        break;
      case object.engCharShift: object.currentChar = object.rusCharShift;
        break;
      case object.rusChar: object.currentChar = object.engChar;
        break;
      case object.rusCharShift: object.currentChar = object.engCharShift;
        break;
      default: return false;
    } return false;
  });
}
// -----------click listener
keyboardDiv.addEventListener('click', (event) => {
  textarea.focus();
  if (event.target.id === 'CapsLock') {
    capsLockToggle();
    insertButtonsValues();
  }
  if (event.target.id === 'ContextMenu') {
    languageToggle();
    insertButtonsValues();
  }
  if (event.target.id === 'Tab') {
    const textareaValueArr = (textarea.value).split('');
    const caretPosition = textarea.selectionStart;
    textareaValueArr.splice(caretPosition, 0, '    ');
    textarea.value = textareaValueArr.join('');
    textarea.setSelectionRange(caretPosition + 4, caretPosition + 4);
  }
  if (event.target.id === 'Backspace') {
    const textareaValueArr = (textarea.value).split('');
    const caretPosition = textarea.selectionStart;
    textareaValueArr.splice(caretPosition - 1, 1);
    textarea.value = textareaValueArr.join('');
    textarea.setSelectionRange(caretPosition - 1, caretPosition - 1);
  }
  if (event.target.id === 'Delete') {
    const textareaValueArr = (textarea.value).split('');
    const caretPosition = textarea.selectionStart;
    textareaValueArr.splice(caretPosition, 1);
    textarea.value = textareaValueArr.join('');
    textarea.setSelectionRange(caretPosition, caretPosition);
  }
  if (event.target.id === 'Enter') {
    const textareaValueArr = (textarea.value).split('');
    const caretPosition = textarea.selectionStart;
    textareaValueArr.splice(caretPosition, 0, '\n');
    textarea.value = textareaValueArr.join('');
    textarea.setSelectionRange(caretPosition + 1, caretPosition + 1);
  }
  if (event.target.id === 'ArrowUp') {
    textarea.setSelectionRange(0, 0);
  }
  if (event.target.id === 'ArrowDown') {
    const textareaValueLength = (textarea.value).length;
    textarea.setSelectionRange(textareaValueLength, textareaValueLength);
  }
  if (event.target.id === 'ArrowLeft') {
    const caretPosition = textarea.selectionStart;
    textarea.setSelectionRange(caretPosition - 1, caretPosition - 1);
  }
  if (event.target.id === 'ArrowRight') {
    const caretPosition = textarea.selectionStart;
    textarea.setSelectionRange(caretPosition + 1, caretPosition + 1);
  }
  // type chars in textarea
  keysArr.forEach((object) => {
    if (object.isEventTarget(event.target.id) && !isServiceKey(event)) {
      const textareaValueArr = (textarea.value).split('');
      const caretPosition = textarea.selectionStart;
      textareaValueArr.splice(caretPosition, 0, object.currentChar);
      textarea.value = textareaValueArr.join('');
      textarea.setSelectionRange(caretPosition + 1, caretPosition + 1);
    }
  });
});
// click on shift
keyboardDiv.addEventListener('mousedown', (event) => {
  if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
    isPressingOnShift = true;
    capsLockToggle();
    insertButtonsValues();
  }
});
keyboardDiv.addEventListener('mouseup', () => {
  if (isPressingOnShift === true) {
    isPressingOnShift = false;
    capsLockToggle();
    insertButtonsValues();
  }
});
// ----------------------key events-----------------------

document.addEventListener('keydown', (event) => {
  textarea.focus();
  if (event.code === 'Tab') {
    event.preventDefault();
    const textareaValueArr = (textarea.value).split('');
    const caretPosition = textarea.selectionStart;
    textareaValueArr.splice(caretPosition, 0, '    ');
    textarea.value = textareaValueArr.join('');
    textarea.setSelectionRange(caretPosition + 4, caretPosition + 4);
  }
  if (event.code === 'CapsLock' && isPressingOnCapsLockPhysics === false) {
    // prevent sticking
    isPressingOnCapsLockPhysics = true;
    capsLockToggle();
    insertButtonsValues();
  }
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight')
    && isPressingOnShiftPhysics === false && !event.ctrlKey) {
    isPressingOnShiftPhysics = true;
    capsLockToggle();
    insertButtonsValues();
  }
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && isPressingOnShiftPhysics === false
    && event.ctrlKey) {
    isPressingOnCtrlShiftPhysics = true;
    isPressingOnShiftPhysics = true;
    languageToggle();
    insertButtonsValues();
  }
  if (event.altKey) {
    event.preventDefault();
    document.getElementById('Alt').classList.add('keyboard__key--active');
  }
  for (let i = 0; i < keysArr.length; i += 1) {
    const object = keysArr[i];
    if (event.code === object.eventCode) {
      document.getElementById(event.code).classList.add('keyboard__key--active');
      break;
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'CapsLock') {
    isPressingOnCapsLockPhysics = false;
  }
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight')
    && !isPressingOnCtrlShiftPhysics) {
    isPressingOnShiftPhysics = false;
    capsLockToggle();
    insertButtonsValues();
  }
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && isPressingOnCtrlShiftPhysics) {
    isPressingOnShiftPhysics = false;
    isPressingOnCtrlShiftPhysics = false;
  }
  if (!event.altKey) {
    document.getElementById('Alt').classList.remove('keyboard__key--active');
  }
  for (let i = 0; i < keysArr.length; i += 1) {
    const object = keysArr[i];
    if (event.code === object.eventCode) {
      document.getElementById(event.code).classList.remove('keyboard__key--active');
      break;
    }
  }
});
// type from physic buttons virtual chars
document.addEventListener('keydown', (event) => {
  if (event.code !== 'CapsLock'
    && event.code !== 'ContextMenu'
    && event.code !== 'Backspace'
    && event.code !== 'Enter'
    && event.code !== 'Tab'
    && event.code !== 'ControlLeft'
    && event.code !== 'ControlRight'
    && event.code !== 'ShiftLeft'
    && event.code !== 'ShiftRight'
    && event.code !== 'Delete'
    && event.code !== 'Alt'
    && event.code !== 'ArrowDown'
    && event.code !== 'ArrowUp'
    && event.code !== 'ArrowLeft'
    && event.code !== 'ArrowRight'
  ) {
    for (let i = 0; i < keysArr.length; i += 1) {
      const object = keysArr[i];
      if (event.code === object.eventCode) {
        event.preventDefault();
        const textareaValueArr = (textarea.value).split('');
        const caretPosition = textarea.selectionStart;
        textareaValueArr.splice(caretPosition, 0, object.currentChar);
        textarea.value = textareaValueArr.join('');
        textarea.focus();
        textarea.setSelectionRange(caretPosition + 1, caretPosition + 1);
        break;
      }
    }
  }
});
// save currentChar
window.addEventListener('unload', () => {
  localStorage.setItem('savedLetter', keysArr[15].currentChar);
});
