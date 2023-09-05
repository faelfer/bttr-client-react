export default function isInvalidEmail(inputText) {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    // console.log('isInvalidEmail | Valid email address!');
    return false;
  }
  // console.log('isInvalidEmail | You have entered an invalid email address!');
  return true;
}
