/* eslint-disable no-undef */
import validateProfile from "../validateProfile";

test("deve retornar valor verdadeiro para o valor vazio do campo nome do usuário", () => {
  const emptyUsernameInputValues = {
    username: "",
    email: "",
  };
  const desiredInvalidateUsername = {
    isInvalid: true,
    message: "Preencha o campo nome de usuário",
  };
  expect(validateProfile(emptyUsernameInputValues)).toMatchObject(
    desiredInvalidateUsername,
  );
});

test("deve retornar valor verdadeiro para a validação do campo nome do usuário", () => {
  const invalidateUsernameInputValues = {
    username: "t",
    email: "",
  };
  const desiredInvalidateUsername = {
    isInvalid: true,
    message: "Campo nome de usuário é inválido",
  };
  expect(validateProfile(invalidateUsernameInputValues)).toMatchObject(
    desiredInvalidateUsername,
  );
});

test("deve retornar valor verdadeiro para o valor vazio do campo email", () => {
  const emptyEmailInputValues = {
    username: "testusername1",
    email: "",
  };
  const desiredInvalidateEmail = {
    isInvalid: true,
    message: "Preencha o campo e-mail",
  };
  expect(validateProfile(emptyEmailInputValues)).toMatchObject(
    desiredInvalidateEmail,
  );
});

test("deve retornar valor verdadeiro para a validação do campo e-mail", () => {
  const invalidateEmailInputValues = {
    username: "testusername1",
    email: "testmail",
  };
  const desiredInvalidateEmail = {
    isInvalid: true,
    message: "Campo e-mail é inválido",
  };
  expect(validateProfile(invalidateEmailInputValues)).toMatchObject(
    desiredInvalidateEmail,
  );
});

test("deve retornar valor falso para a validação", () => {
  const validateInputValues = {
    username: "testusername1",
    email: "test@gmail.com",
  };
  const desiredValidate = {
    isInvalid: false,
    message: "",
  };
  expect(validateProfile(validateInputValues)).toMatchObject(desiredValidate);
});
