/* eslint-disable no-undef */
import calendarDate from '../calendarDate';

test('deve retornar data formatada com data', () => {
  expect(calendarDate('2003-02-01T04:05:06-03:00')).toBe('01/02/2003');
});
