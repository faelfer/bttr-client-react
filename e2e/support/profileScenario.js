export default async function signInScenario(manipulePage, userFake) {
  await manipulePage.getByPlaceholder('Digite seu nome de usuário').click();
  await manipulePage.getByPlaceholder('Digite seu nome de usuário').fill(userFake.username);
  await manipulePage.getByPlaceholder('Digite seu e-mail').click();
  await manipulePage.getByPlaceholder('Digite seu e-mail').fill(userFake.email);
  await manipulePage.getByRole('button', { name: 'Salvar' }).click();
}
