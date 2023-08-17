export default async function forgotPasswordScenario(manipulePage, userFake) {
  await manipulePage.getByPlaceholder('Insira seu e-mail').click();
  await manipulePage.getByPlaceholder('Insira seu e-mail').fill(userFake.email);
  await manipulePage.getByRole('button', { name: 'Enviar' }).click();
}
