import signUpScenario from "../support/signUpScenario";
import signInScenario from "../support/signInScenario";

const { test, expect } = require("@playwright/test");

const userFactory = require("../factories/userFactory");

test("deve inserir os dados do novo usuário e realizar login com sucesso", async ({
  page,
}) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

  const user = await userFactory();

  await page.getByText("Cadastre-se").click();

  await page.route('*/**/api/users/sign_up', async route => {
    const json = {
      "message": "usuário foi criado com sucesso."
    };
    await route.fulfill({ json });
  });

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText(
    "usuário foi criado com sucesso.",
  );
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText("Conecte-se").click();

  await expect(page).toHaveURL("http://localhost:3000/");

  await page.route('*/**/api/users/sign_in', async route => {
    const json = {
      "token": "60729b93-a13e-427b-a474-b1d59ea944ac",
      "user": {
        "id": 871182111,
        "token": "Token 60729b93-a13e-427b-a474-b1d59ea944ac",
        "created": "2023-05-28T18:02:45.619Z",
        ...user,
      },
      "message": "autenticação realizada com sucesso."
    };
    await route.fulfill({ json });
  });

  await signInScenario(page, user);

  await page.getByRole("link", { name: "Perfil" }).click();
  await page.getByTestId("button-transparent").click();
});

// test("deve mostrar mensagem de erro ao tentar realizar login com o campo e-mail não existente", async ({
//   page,
// }) => {
//   // Go to http://localhost:3000/
//   await page.goto("http://localhost:3000/");

//   const user = await userFactory();

//   await signInScenario(page, user);

//   const hasSignInNotFound = await page.getByText("usuário não foi encontrado.");
//   await expect(hasSignInNotFound).toBeVisible();
// });

// test("deve mostrar mensagem de erro ao tentar realizar login com o campo senha incorreta", async ({
//   page,
// }) => {
//   // Go to http://localhost:3000/
//   await page.goto("http://localhost:3000/");

//   const user = await userFactory();

//   await page.getByText("Cadastre-se").click();

//   await signUpScenario(page, user);

//   const hasSignUpSuccess = await page.getByText(
//     "usuário foi criado com sucesso.",
//   );
//   await expect(hasSignUpSuccess).toBeVisible();

//   await page.getByText("Conecte-se").click();

//   await expect(page).toHaveURL("http://localhost:3000/");

//   user.password = "654789";
//   await signInScenario(page, user);

//   const hasSignInPasswordWrong = await page.getByText("senha incorreta.");
//   await expect(hasSignInPasswordWrong).toBeVisible();
// });
