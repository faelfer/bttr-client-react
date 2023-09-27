/* eslint-disable no-undef */
import validateRedefinePassword from "../validateRedefinePassword";

test("deve retornar valor verdadeiro para o valor vazio do campo senha", () => {
  const emptyPasswordInputValues = {
    password: "",
    passwordNew: "",
    passwordNewConfirm: "",
  };
  const desiredInvalidatePassword = {
    isInvalid: true,
    message: "Preencha o campo senha atual",
  };
  expect(validateRedefinePassword(emptyPasswordInputValues)).toMatchObject(
    desiredInvalidatePassword,
  );
});

test("deve retornar valor verdadeiro para o valor vazio do campo senha nova", () => {
  const emptyPasswordNewInputValues = {
    password: "12345",
    passwordNew: "",
    passwordNewConfirm: "",
  };
  const desiredInvalidatePassword = {
    isInvalid: true,
    message: "Preencha o campo nova senha",
  };
  expect(validateRedefinePassword(emptyPasswordNewInputValues)).toMatchObject(
    desiredInvalidatePassword,
  );
});

test("deve retornar valor verdadeiro para a quantia mínima de caracteres do campo senha nova", () => {
  const minimumPasswordInputValues = {
    password: "12345",
    passwordNew: "123",
    passwordNewConfirm: "",
  };
  const desiredMinimumPasswordNew = {
    isInvalid: true,
    message: "Campo nova senha deve conter no mínimo 4 caracteres",
  };
  expect(validateRedefinePassword(minimumPasswordInputValues)).toMatchObject(
    desiredMinimumPasswordNew,
  );
});

test("deve retornar valor verdadeiro para a validação do campo senha nova", () => {
  const invalidatePasswordInputValues = {
    password: "12345",
    passwordNew: "12345",
    passwordNewConfirm: "",
  };
  const desiredInvalidatePasswordNew = {
    isInvalid: true,
    message:
      "Campo nova senha deve conter número, símbolo, letra maiúscula e minúscula",
  };
  expect(validateRedefinePassword(invalidatePasswordInputValues)).toMatchObject(
    desiredInvalidatePasswordNew,
  );
});

test("deve retornar valor verdadeiro para a quantia mínima de caracteres do campo senha", () => {
  const samePasswordInputValues = {
    password: "!Ab1!Ab1",
    passwordNew: "!Ab1!Ab1",
    passwordNewConfirm: "",
  };
  const desiredSamePasswordNew = {
    isInvalid: true,
    message: "Campos senha atual e nova senha devem ser diferentes",
  };
  expect(validateRedefinePassword(samePasswordInputValues)).toMatchObject(
    desiredSamePasswordNew,
  );
});

test("deve retornar valor verdadeiro para o valor vazio do campo confirmar nova senha", () => {
  const emptyPasswordNewConfirmInputValues = {
    password: "!Ab1!Ab1",
    passwordNew: "!Bc2!Bc2",
    passwordNewConfirm: "",
  };
  const desiredEmptyPasswordNewConfirm = {
    isInvalid: true,
    message: "Preencha o campo confirmar nova senha",
  };
  expect(
    validateRedefinePassword(emptyPasswordNewConfirmInputValues),
  ).toMatchObject(desiredEmptyPasswordNewConfirm);
});

test("deve retornar valor verdadeiro para a quantia mínima de caracteres do campo confirmar nova senha", () => {
  const minimumPasswordNewConfirmInputValues = {
    password: "!Ab1!Ab1",
    passwordNew: "!Bc2!Bc2",
    passwordNewConfirm: "123",
  };
  const desiredMinimumPasswordNewConfirm = {
    isInvalid: true,
    message: "Campo confirmar nova senha é inválido",
  };
  expect(
    validateRedefinePassword(minimumPasswordNewConfirmInputValues),
  ).toMatchObject(desiredMinimumPasswordNewConfirm);
});

test("deve retornar valor verdadeiro para valor diferente do campo confirmar nova senha", () => {
  const samePasswordNewConfirmInputValues = {
    password: "!Ab1!Ab1",
    passwordNew: "!Bc2!Bc2",
    passwordNewConfirm: "@Cd3@Cd3",
  };
  const desiredSamePasswordNewConfirm = {
    isInvalid: true,
    message: "Os campos nova senha e confirmar nova senha devem ser iguais",
  };
  expect(
    validateRedefinePassword(samePasswordNewConfirmInputValues),
  ).toMatchObject(desiredSamePasswordNewConfirm);
});

test("deve retornar valor falso para a validação", () => {
  const validateInputValues = {
    password: "!Ab1!Ab1",
    passwordNew: "!Bc2!Bc2",
    passwordNewConfirm: "!Bc2!Bc2",
  };
  const desiredValidate = {
    isInvalid: false,
    message: "",
  };
  expect(validateRedefinePassword(validateInputValues)).toMatchObject(
    desiredValidate,
  );
});
