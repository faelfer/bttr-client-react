/* eslint-disable no-undef */
import calendarDateHourMinutes from '../calendarDateHourMinutes';

test('deve retornar data formatada com data, hora e minutos', () => {
  expect(calendarDateHourMinutes('2003-02-01T04:05:06-03:00')).toBe('01/02/2003 às 04:05');
});
