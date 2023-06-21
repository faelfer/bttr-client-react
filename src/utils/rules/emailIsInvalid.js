export default function emailIsInvalid(inputText) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      // console.log('emailIsInvalid | Valid email address!');
      return false;
    }
    // console.log('emailIsInvalid | You have entered an invalid email address!');
    return true;
  }
  