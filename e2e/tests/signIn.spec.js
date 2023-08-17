import signUpScenario from '../support/signUpScenario';
import signInScenario from '../support/signInScenario';

const { test, expect, chromium } = require('@playwright/test');

const userFactory = require('../factories/userFactory');

test('deve inserir os dados do novo usuário e realizar login com sucesso', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByTestId('link-redirect-button').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByTestId('link-redirect-button').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByRole('link', { name: 'Perfil' }).click();
  await page.getByTestId('button-transparent').click();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar realizar login com o campo e-mail não existente', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await signInScenario(page, user);

  const hasSignInNotFound = await page.getByText('usuário não foi encontrado.');
  await expect(hasSignInNotFound).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar realizar login com o campo senha incorreta', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByTestId('link-redirect-button').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByTestId('link-redirect-button').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  user.password = '654789';
  await signInScenario(page, user);

  const hasSignInPasswordWrong = await page.getByText('senha incorreta.');
  await expect(hasSignInPasswordWrong).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});
