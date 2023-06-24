import signUpScenario from '../support/signUpScenario';

const { test, expect, chromium } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

const userFactory = require('../factories/userFactory');

test('deve inserir os dados do novo usuário com sucesso', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  const user = await userFactory();

  await page.getByRole('link', { name: 'Cadastre-se' }).click();

  await signUpScenario(page, user);

  await expect(page).toHaveURL('http://localhost:3000/');

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo nome vazio', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Cadastre-se' }).click();

  const user = await userFactory();
  user.username = '';

  await signUpScenario(page, user);

  await page.getByText('Preencha o campo nome de usuário');

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo nome inválido', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Cadastre-se' }).click();

  const user = await userFactory();
  user.username = 'ab';

  await signUpScenario(page, user);

  await page.getByText('Campo nome de usuário é inválido');

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo e-mail vazio', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Cadastre-se' }).click();

  const user = await userFactory();
  user.email = '';

  await signUpScenario(page, user);

  await page.getByText('Preencha o campo e-mail');

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo e-mail inválido', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Cadastre-se' }).click();

  const user = await userFactory();
  user.email = 'emailemail';

  await signUpScenario(page, user);

  await page.getByText('Campo e-mail é inválido');

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo senha vazio', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Cadastre-se' }).click();

  const user = await userFactory();
  user.password = '';

  await signUpScenario(page, user);

  await page.getByText('Preencha o campo senha');

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo senha inválido', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Cadastre-se' }).click();

  const user = await userFactory();
  user.password = 'senha';

  await signUpScenario(page, user);

  await page.getByText('Campo senha deve conter números e letras');

  await context.close();
  // Make sure to await close, so that videos are saved.
});

test('deve mostrar mensagem de erro ao tentar cadastrar um usuário com o campo senha que ultrapassar o limite de caracteres', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
  // Make sure to await close, so that videos are saved.

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Cadastre-se' }).click();

  const user = await userFactory();
  user.password = 'senhasenhasenha';

  await signUpScenario(page, user);

  await page.getByText('Campo senha deve conter de 4 à 8 caracteres');

  await context.close();
  // Make sure to await close, so that videos are saved.
});
