export default async function signUpScenario(manipulePage, userFake) {
  await manipulePage.getByPlaceholder('Digite seu nome de usuário').click();
  await manipulePage.getByPlaceholder('Digite seu nome de usuário').fill(userFake.username);
  await manipulePage.getByPlaceholder('Digite seu e-mail').click();
  await manipulePage.getByPlaceholder('Digite seu e-mail').fill(userFake.email);
  await manipulePage.getByPlaceholder('Digite sua senha').click();
  await manipulePage.getByPlaceholder('Digite sua senha').fill(userFake.password);
  await manipulePage.getByRole('button', { name: 'Cadastre-se' }).click();
}
