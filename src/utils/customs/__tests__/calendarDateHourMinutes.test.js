/* eslint-disable no-undef */
import calendarDateHourMinutes from "../calendarDateHourMinutes";

test("deve retornar data fortamada como calendário com dia, mês, ano, hora e minuto", () => {
  expect(calendarDateHourMinutes("2003-02-01T04:05:06-03:00")).toBe(
    "01/02/2003 às 04:05",
  );
});

test("deve retornar data padrão porque o parametro tem valor inválido", () => {
  expect(calendarDateHourMinutes(null)).toBe("00/00/0000 às 00:00");
});
