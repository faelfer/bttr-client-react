export default function isInvalidEmail(email: string): boolean {
  const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const isValidEmailFormat = regexMail.test(email);
  if (isValidEmailFormat) {
    // console.log('isInvalidEmail | Valid email address!');
    return false;
  }
  // console.log('isInvalidEmail | You have entered an invalid email address!');
  return true;
}
