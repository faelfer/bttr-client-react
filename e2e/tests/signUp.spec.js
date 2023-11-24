import signUpScenario from "../support/signUpScenario";
import {
  signUpSucessMock,
  signUpAlreadyExistUsernameMock,
  signUpAlreadyExistEmailMock,
} from "../mock/user";

const { test, expect } = require("@playwright/test");

const userFactory = require("../factories/userFactory");

test("deve inserir os dados do novo usuário com sucesso", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByTestId("link-redirect-button").click();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByTestId("link-redirect-button").click();

  await expect(page).toHaveURL("http://localhost:3000/");
});

test("deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo nome já existente", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByTestId("link-redirect-button").click();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByTestId("link-redirect-button").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByTestId("link-redirect-button").click();

  const userReplace = await userFactory();
  userReplace.username = user.username;

  await signUpAlreadyExistUsernameMock(page);

  await signUpScenario(page, userReplace);

  const hasSignUpAlreadyExistUsername = await page.getByText(
    "nome de usuário já existente.",
  );
  await expect(hasSignUpAlreadyExistUsername).toBeVisible();

  await page.getByTestId("link-redirect-button").click();

  await expect(page).toHaveURL("http://localhost:3000/");
});

test("deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo e-mail já existente", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByTestId("link-redirect-button").click();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByTestId("link-redirect-button").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByTestId("link-redirect-button").click();

  const userReplace = await userFactory();
  userReplace.email = user.email;

  await signUpAlreadyExistEmailMock(page);

  await signUpScenario(page, userReplace);

  const hasSignUpAlreadyExistEmail = await page.getByText(
    "usuário com e-mail já existente.",
  );
  await expect(hasSignUpAlreadyExistEmail).toBeVisible();

  await page.getByTestId("link-redirect-button").click();

  await expect(page).toHaveURL("http://localhost:3000/");
});

test("deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo nome vazio", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByTestId("link-redirect-button").click();

  const user = await userFactory();
  user.username = "";

  await signUpScenario(page, user);

  const hasSignUpValidateUsernameEmpty = await page.getByText(
    "Preencha o campo nome de usuário",
  );
  await expect(hasSignUpValidateUsernameEmpty).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo nome inválido", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByTestId("link-redirect-button").click();

  const user = await userFactory();
  user.username = "a";

  await signUpScenario(page, user);

  const hasSignUpValidateUsername = await page.getByText(
    "Campo nome de usuário é inválido",
  );
  await expect(hasSignUpValidateUsername).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo e-mail vazio", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByTestId("link-redirect-button").click();

  const user = await userFactory();
  user.email = "";

  await signUpScenario(page, user);

  const hasSignUpValidateEmailEmpty = await page.getByText(
    "Preencha o campo e-mail",
  );
  await expect(hasSignUpValidateEmailEmpty).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo e-mail inválido", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByTestId("link-redirect-button").click();

  const user = await userFactory();
  user.email = "emailemail";

  await signUpScenario(page, user);

  const hasSignUpValidateEmail = await page.getByText(
    "Campo e-mail é inválido",
  );
  await expect(hasSignUpValidateEmail).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo senha vazio", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByTestId("link-redirect-button").click();

  const user = await userFactory();
  user.password = "";

  await signUpScenario(page, user);

  const hasSignUpValidatePasswordEmpty = await page.getByText(
    "Preencha o campo senha",
  );
  await expect(hasSignUpValidatePasswordEmpty).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo senha inválido", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByTestId("link-redirect-button").click();

  const user = await userFactory();
  user.password = "senha";

  await signUpScenario(page, user);

  const hasSignUpValidatePassword = await page.getByText(
    "Campo senha deve conter número, símbolo, letra maiúscula e minúscula",
  );
  await expect(hasSignUpValidatePassword).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo senha que ultrapassar o limite de caracteres", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  await page.getByTestId("link-redirect-button").click();

  const user = await userFactory();
  user.password = "$3Nhasenhasenha";

  await signUpScenario(page, user);

  const hasSignUpValidatePasswordMinimum = await page.getByText(
    "Campo senha deve conter no máximo 8 caracteres",
  );
  await expect(hasSignUpValidatePasswordMinimum).toBeVisible();
});
