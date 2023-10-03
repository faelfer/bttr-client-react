interface InputValuesFunction {
  name: string;
  daily: string;
}

interface ValidateSkillResult {
  isInvalid: boolean;
  message: string;
}

export default function validateSkill(
  inputValues: InputValuesFunction,
): ValidateSkillResult {
  let message = "";
  if (inputValues.name === "") {
    message = "Campo habilidade é inválido";
  } else if (inputValues.daily.length === 0) {
    message = "Preencha o campo minutos";
  }

  return { isInvalid: message.length !== 0, message };
}
