import { DateTime } from 'luxon';

export default function calendarDateHourMinutes(dateString) {
  // console.log('calendarDateHourMinutes | dateString: ', dateString);

  const dateTimeFromISO = DateTime.fromISO(dateString, { zone: 'America/Fortaleza' }).setLocale('pt-BR');
  // console.log('calendarDateHourMinutes | dateTimeFromISO: ', dateTimeFromISO);

  const dateCalendarFormat = dateTimeFromISO.toLocaleString(DateTime.DATE_SHORT);
  // console.log('calendarDateHourMinutes | dateCalendarFormat: ', dateCalendarFormat);

  if (dateCalendarFormat === 'Invalid DateTime') {
    return '00/00/0000 às 00:00';
  }

  const timeCalendarFormat = dateTimeFromISO.toLocaleString(DateTime.TIME_24_SIMPLE);
  // console.log('calendarDateHourMinutes | timeCalendarFormat: ', timeCalendarFormat);

  const datetimeCalendarFormat = `${dateCalendarFormat} às ${timeCalendarFormat}`;
  // console.log('calendarDateHourMinutes | datetimeCalendarFormat: ', datetimeCalendarFormat);

  return datetimeCalendarFormat;
}
