/* eslint-disable no-undef */
import calendarDate from "../calendarDate";

test("deve retornar data fortamada como calendário apenas com dia, mês e ano", () => {
  expect(calendarDate("2003-02-01T04:05:06-03:00")).toBe("01/02/2003");
});

test("deve retornar data padrão porque o parametro tem valor inválido", () => {
  expect(calendarDate(null)).toBe("00/00/0000");
});
