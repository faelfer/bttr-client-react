import signUpScenario from '../support/signUpScenario';

const { test, expect, chromium } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

const userFactory = require('../factories/userFactory');

test('deve mostrar mensagem de sucesso ao pressionar o botão cadastre-se', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory(false);

  await page.getByRole('link', { name: 'Cadastre-se' }).click();

  await signUpScenario(page, user);

  await expect(page).toHaveURL('http://localhost:3000/');

  await context.close();
  // Make sure to await close, so that videos are saved.
});

// test('deve mostrar mensagem de senha incorreta ao pressionar o botão entrar', async ({ page }) => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
//   // Make sure to await close, so that videos are saved.

//   const passwordIncorrect = faker.random.alphaNumeric(8);

//   // Go to http://localhost:3000/
//   await page.goto('http://localhost:3000/');

//   const user = await userFactory(false);

//   await signInScenario(page, user.email, passwordIncorrect);

//   const locatorSignInIncorrectPassword = page.locator('text=senha incorreta.');
//   await expect(locatorSignInIncorrectPassword).toBeVisible();

//   await context.close();
//   // Make sure to await close, so that videos are saved.
// });

// test('deve mostrar mensagem de usuário não encontrado ao pressionar o botão entrar', async ({ page }) => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
//   // Make sure to await close, so that videos are saved.

//   const userNotFound = await userFactory();

//   // Go to http://localhost:3000/
//   await page.goto('http://localhost:3000/');

//   await signInScenario(page, userNotFound.email, userNotFound.password);

//   const locatorSignInNotFoundUser = page.locator('text=usuário não foi encontrado.');
//   await expect(locatorSignInNotFoundUser).toBeVisible();

//   await context.close();
//   // Make sure to await close, so that videos are saved.
// });
