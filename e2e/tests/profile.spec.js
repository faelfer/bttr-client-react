import signUpScenario from '../support/signUpScenario';
import signInScenario from '../support/signInScenario';
import profileScenario from '../support/profileScenario';

const { test, expect, chromium } = require('@playwright/test');

const userFactory = require('../factories/userFactory');

test('deve alterar os dados do usuário login com sucesso', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  const userUpdate = await userFactory();

  await signInScenario(page, user);

  await page.getByRole('link', { name: 'Perfil' }).click();

  await profileScenario(page, userUpdate);

  const hasProfileSuccess = await page.getByText('perfil alterado com sucesso.');
  await expect(hasProfileSuccess).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar alterar um usuário com o campo nome já existente', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const userAlreadyExisting = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, userAlreadyExisting);

  const hasSignUpSuccess1 = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess1).toBeVisible();

  await page.getByText('Conecte-se').click();
  await page.getByText('Cadastre-se').click();

  const user = await userFactory();

  await signUpScenario(page, user);

  const hasSignUpSuccess2 = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess2).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByRole('link', { name: 'Perfil' }).click();
  user.username = userAlreadyExisting.username;

  await profileScenario(page, user);

  const hasProfileSuccess = await page.getByText('nome de usuário já existente.');
  await expect(hasProfileSuccess).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar alterar um usuário com o campo e-mail já existente', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const userAlreadyExisting = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, userAlreadyExisting);

  const hasSignUpSuccess1 = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess1).toBeVisible();

  await page.getByText('Conecte-se').click();
  await page.getByText('Cadastre-se').click();

  const user = await userFactory();

  await signUpScenario(page, user);

  const hasSignUpSuccess2 = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess2).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByRole('link', { name: 'Perfil' }).click();
  user.email = userAlreadyExisting.email;

  await profileScenario(page, user);

  const hasProfileSuccess = await page.getByText('usuário com e-mail já existente');
  await expect(hasProfileSuccess).toBeVisible();

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve realizar logout do usuário com sucesso', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByRole('link', { name: 'Perfil' }).click();

  await expect(page).toHaveURL('http://localhost:3000/profile');

  await page.getByText('Sair').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve apagar o usuário com sucesso', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByText('Cadastre-se').click();

  await signUpScenario(page, user);

  const hasSignUpSuccess = await page.getByText('usuário foi criado com sucesso.');
  await expect(hasSignUpSuccess).toBeVisible();

  await page.getByText('Conecte-se').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await signInScenario(page, user);

  await page.getByRole('link', { name: 'Perfil' }).click();

  await expect(page).toHaveURL('http://localhost:3000/profile');

  await page.getByText('Apagar').click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await context.close();
  // Make sure to await close, so that videos are saved.
});
