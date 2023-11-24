interface InputValuesFunction {
  skillSelected: string;
  minutes: string;
}

interface ValidateTimeResult {
  isInvalid: boolean;
  message: string;
}

export default function validateTime(
  inputValues: InputValuesFunction,
): ValidateTimeResult {
  let message = "";
  if (inputValues.skillSelected === "") {
    message = "Campo habilidade é inválido";
  } else if (inputValues.minutes.length === 0) {
    message = "Preencha o campo minutos";
  }

  return { isInvalid: message.length !== 0, message };
}
