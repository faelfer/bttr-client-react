import signUpScenario from "../support/signUpScenario";
import signInScenario from "../support/signInScenario";
import {
  signInSucessMock,
  signInPasswordWrongMock,
  signInNotFoundMock,
  signUpSucessMock,
} from "../mock/user";

const { test, expect } = require("@playwright/test");

const userFactory = require("../factories/userFactory");

test("deve inserir os dados do novo usuário e realizar login com sucesso", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Cadastre-se").click();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await signInSucessMock(page, user);

  await signInScenario(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  await page.getByTestId("button-transparent").click();
});

test("deve mostrar mensagem de erro ao tentar realizar login com o campo e-mail não existente", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await signInNotFoundMock(page);

  await signInScenario(page, user);

  const hasSignInNotFound = await page.getByText("usuário não foi encontrado.");
  await expect(hasSignInNotFound).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar realizar login com o campo senha incorreta", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Cadastre-se").click();

  await signUpSucessMock(page);

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  user.password = "654789";

  await signInPasswordWrongMock(page);

  await signInScenario(page, user);

  const hasSignInPasswordWrong = await page.getByText("senha incorreta.");
  await expect(hasSignInPasswordWrong).toBeVisible();
});
