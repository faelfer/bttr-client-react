export default async function skillScenario(manipulePage, skillFakeName) {
  await manipulePage.getByTestId('outline-form-select').selectOption({ label: skillFakeName });
  await manipulePage.getByPlaceholder('Digite os minutos').click();
  await manipulePage.getByPlaceholder('Digite os minutos').press('ArrowUp');
}
