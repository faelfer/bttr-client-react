export default function passwordIsInvalid(inputText) {
    // console.log('passwordIsInvalid | inputText: ', inputText);
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const lettersCapital = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const symbols = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '_', '+', '-', '?'];
  
    const foundLetter = letters.find((letter) => inputText.includes(letter));
    const isIncludeLetter = foundLetter !== undefined;
    // console.log('passwordIsInvalid | isIncludeLetter: ', isIncludeLetter);
  
    const foundLetterCapital = lettersCapital.find((letterCapital) => inputText.includes(letterCapital));
    const isIncludeLetterCapital = foundLetterCapital !== undefined;
    // console.log('passwordIsInvalid | isIncludeLetterCapital: ', isIncludeLetterCapital);
  
    const foundNumber = numbers.find((number) => inputText.includes(number));
    const isIncludeNumber = foundNumber !== undefined;
    // console.log('passwordIsInvalid | isIncludeNumber: ', isIncludeNumber);
  
    const foundSymbol = symbols.find((symbol) => inputText.includes(symbol));
    const isIncludeSymbol = foundSymbol !== undefined;
    // console.log('passwordIsInvalid | isIncludeSymbol: ', isIncludeSymbol);
  
    // console.log('passwordIsInvalid | isIncludeLetter, isIncludeLetterCapital, isIncludeNumber, isIncludeSymbol: ', isIncludeLetter, isIncludeLetterCapital, isIncludeNumber, isIncludeSymbol);
  
    if ((isIncludeLetter || isIncludeLetterCapital) && isIncludeNumber) {
      // console.log('passwordIsInvalid | Valid password!');
      return false;
    }
    // console.log('passwordIsInvalid | You have entered an invalid password!');
    return true;
  }
  