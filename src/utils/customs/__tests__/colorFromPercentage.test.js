/* eslint-disable no-undef */
import colorFromPercentage from "../colorFromPercentage";

test("deve retornar cor vermelha quando progresso seja abaixo de 25%", () => {
  expect(colorFromPercentage(24)).toBe("#e01b24");
});

test("deve retornar cor laranja quando progresso seja abaixo de 50%", () => {
  expect(colorFromPercentage(49)).toBe("#ff7800");
});

test("deve retornar cor amarela quando progresso seja abaixo de 75%", () => {
  expect(colorFromPercentage(74)).toBe("#f6d32d");
});

test("deve retornar cor verde quando progresso seja abaixo de 100%", () => {
  expect(colorFromPercentage(99)).toBe("#33d17a");
});

test("deve retornar cor azul quando progresso seja igual ou acima de 100%", () => {
  expect(colorFromPercentage(101)).toBe("#3584e4");
});
