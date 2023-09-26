interface InputValuesFunction {
  email: string;
  password: string;
};

interface ValidateSignInResult {
  isInvalid: boolean;
  message: string;
};

export default function validateSignIn(inputValues: InputValuesFunction): ValidateSignInResult {
  let message = "";
  if ((inputValues.email).length === 0) {
    message = "Preencha o campo e-mail";
  } else if ((inputValues.password).length === 0) {
    message = "Preencha o campo senha";
  }

  return { isInvalid: message.length !== 0, message };
}
