/* eslint-disable no-undef */
import clockHourMinute from "../clockHourMinute";

test("deve retornar os minutos fortamados com apenas um dígito em minutos", () => {
  expect(clockHourMinute(1)).toBe("00h01min");
});

test("deve retornar os minutos fortamados com dois dígitos em minutos", () => {
  expect(clockHourMinute(10)).toBe("00h10min");
});

test("deve retornar os minutos fortamados com apenas um dígito em horas", () => {
  expect(clockHourMinute(60)).toBe("01h00min");
});

test("deve retornar os minutos fortamados com dois dígitos em horas", () => {
  expect(clockHourMinute(600)).toBe("10h00min");
});
