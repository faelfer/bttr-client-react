/* eslint-disable no-undef */
import isInvalidPassword from "../isInvalidPassword";

test("deve retornar valor falso porque string inclue letra minúsculo, maiúscula, número e símbolo", () => {
  expect(isInvalidPassword("!Ab1")).toBe(false);
});

test("deve retornar valor verdadeiro porque string não inclue letra símbolo", () => {
  expect(isInvalidPassword("Ab1")).toBe(true);
});

test("deve retornar valor verdadeiro porque string não inclue letra maiúscula", () => {
  expect(isInvalidPassword("!b1")).toBe(true);
});

test("deve retornar valor verdadeiro porque string não inclue letra minúsculo", () => {
  expect(isInvalidPassword("!A1")).toBe(true);
});

test("deve retornar valor verdadeiro porque string não inclue letra número", () => {
  expect(isInvalidPassword("!Ab")).toBe(true);
});
