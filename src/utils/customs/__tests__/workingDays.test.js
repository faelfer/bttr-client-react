/* eslint-disable no-undef */
import workingDays from "../workingDays";

test("deve retornar a quantia de dias úteis de acordo com o dia, mês e ano ", () => {
  expect(workingDays(2, 2023, 0)).toBe(1);
});
