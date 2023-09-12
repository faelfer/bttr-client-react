import signUpScenario from "../support/signUpScenario";
import forgotPasswordScenario from "../support/forgotPasswordScenario";

const { test, expect } = require("@playwright/test");

const userFactory = require("../factories/userFactory");

test("deve inserir os dados do novo usuário e realizar o esqueci minha senha com sucesso", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Cadastre-se").click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await page.getByText("Esqueceu a senha?").click();

  await forgotPasswordScenario(page, user);

  const hasForgotPasswordSuccess = await page.getByText(
    "senha temporária enviada",
  );
  await expect(hasForgotPasswordSuccess).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar realizar esqueci minha senha com o campo e-mail não existente", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Esqueceu a senha?").click();

  await forgotPasswordScenario(page, user);

  const hasForgotPasswordNotFound = await page.getByText(
    "usuário não foi encontrado.",
  );
  await expect(hasForgotPasswordNotFound).toBeVisible();
});

test("deve mostrar mensagem de erro ao tentar realizar esqueci minha senha com o campo e-mail vazio", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Esqueceu a senha?").click();
  user.email = "";

  await forgotPasswordScenario(page, user);

  const hasForgotPasswordWrong = await page.getByText(
    "Preencha o campo e-mail",
  );
  await expect(hasForgotPasswordWrong).toBeVisible();
});
