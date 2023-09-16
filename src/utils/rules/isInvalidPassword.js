export default function isInvalidPassword(inputText) {
  // console.log('isInvalidPassword | inputText: ', inputText);
  const regexLetters = /[a-z]/;
  const regexLettersCapital = /[A-Z]/;
  const regexNumbers = /[0-9]/;
  const regexSymbols = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/;

  const isIncludeLetter = regexLetters.test(inputText);
  const isIncludeLetterCapital = regexLettersCapital.test(inputText);
  const isIncludeNumber = regexNumbers.test(inputText);
  const isIncludeSymbol = regexSymbols.test(inputText);

  if (
    isIncludeLetter &&
    isIncludeLetterCapital &&
    isIncludeNumber &&
    isIncludeSymbol
  ) {
    return false;
  }
  return true;
}
