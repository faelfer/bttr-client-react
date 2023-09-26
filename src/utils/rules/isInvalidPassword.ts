export default function isInvalidPassword(password: string): boolean {
  const regexLetters = /[a-z]/;
  const regexLettersCapital = /[A-Z]/;
  const regexNumbers = /[0-9]/;
  const regexSymbols = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/;

  const isIncludeLetter = regexLetters.test(password);
  const isIncludeLetterCapital = regexLettersCapital.test(password);
  const isIncludeNumber = regexNumbers.test(password);
  const isIncludeSymbol = regexSymbols.test(password);

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
