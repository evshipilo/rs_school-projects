export function isRussianLetters(word) {
  return !(word.search(/[А-яЁё]/) === -1);
}

export function deleteThe(word) {
  return word.replace(/^the\s+/, '');
}
