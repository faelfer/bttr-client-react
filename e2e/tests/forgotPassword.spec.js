import signUpScenario from '../support/signUpScenario';
import forgotPasswordScenario from '../support/forgotPasswordScenario';

const { test, expect, chromium } = require('@playwright/test');

const userFactory = require('../factories/userFactory');

test('deve inserir os dados do novo usuário e realizar o esqueci minha senha com sucesso', async ({ page }) => {
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

  await page.getByTestId('button-transparent').click();

  await forgotPasswordScenario(page, user);

  const hasForgotPasswordSuccess = await page.getByText('senha temporária enviada');
  await expect(hasForgotPasswordSuccess).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar realizar esqueci minha senha com o campo e-mail não existente', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByTestId('button-transparent').click();

  await forgotPasswordScenario(page, user);

  const hasSignInNotFound = await page.getByText('usuário não foi encontrado.');
  await expect(hasSignInNotFound).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});
