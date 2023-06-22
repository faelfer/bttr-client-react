/* eslint-disable no-undef */
import isInvalidEmail from '../isInvalidEmail';

test('deve retornar valor falso porque string inclue @ e ponto final', () => {
  expect(isInvalidEmail('example@example.com')).toBe(false);
});

test('deve retornar valor verdadeiro porque string não inclue @', () => {
  expect(isInvalidEmail('exampleexample.com')).toBe(true);
});

test('deve retornar valor verdadeiro porque string não inclue ponto final', () => {
  expect(isInvalidEmail('example@examplecom')).toBe(true);
});
