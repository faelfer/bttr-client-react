export default function isInvalidPassword(inputText) {
  // console.log('isInvalidPassword | inputText: ', inputText);
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const lettersCapital = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const symbols = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "-",
    "?",
  ];

  const foundLetter = letters.find((letter) => inputText.includes(letter));
  const isIncludeLetter = foundLetter !== undefined;
  // console.log('isInvalidPassword | isIncludeLetter: ', isIncludeLetter);

  const foundLetterCapital = lettersCapital.find((letterCapital) =>
    inputText.includes(letterCapital),
  );
  const isIncludeLetterCapital = foundLetterCapital !== undefined;
  // console.log('isInvalidPassword | isIncludeLetterCapital: ', isIncludeLetterCapital);

  const foundNumber = numbers.find((number) => inputText.includes(number));
  const isIncludeNumber = foundNumber !== undefined;
  // console.log('isInvalidPassword | isIncludeNumber: ', isIncludeNumber);

  const foundSymbol = symbols.find((symbol) => inputText.includes(symbol));
  const isIncludeSymbol = foundSymbol !== undefined;
  // console.log('isInvalidPassword | isIncludeSymbol: ', isIncludeSymbol);

  // console.log(
  //   'isInvalidPassword | isIncludeLetter,isIncludeLetterCapital,isIncludeNumber,isIncludeSymbol',
  //   isIncludeLetter,
  //   isIncludeLetterCapital,
  //   isIncludeNumber,
  //   isIncludeSymbol,
  // );

  if (
    isIncludeLetter &&
    isIncludeLetterCapital &&
    isIncludeNumber &&
    isIncludeSymbol
  ) {
    // console.log('isInvalidPassword | Valid password!');
    return false;
  }
  // console.log('isInvalidPassword | You have entered an invalid password!');
  return true;
}
