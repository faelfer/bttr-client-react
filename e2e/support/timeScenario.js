export default async function timeScenario(manipulePage, timeFake) {
  await manipulePage
    .getByTestId("outline-form-select")
    .selectOption(timeFake.skill);
  await manipulePage.getByPlaceholder("Digite os minutos").click();
  await manipulePage
    .getByPlaceholder("Digite os minutos")
    .fill(timeFake.minutes);
}
