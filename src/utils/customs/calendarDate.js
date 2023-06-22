import { DateTime } from 'luxon';

export default function calendarDate(dateString) {
  // console.log('calendarDate | dateString: ', dateString);

  const dateTimeFromISO = DateTime.fromISO(dateString);
  // console.log('calendarDate | dateTimeFromISO: ', dateTimeFromISO);

  const dateCalendarFormat = dateTimeFromISO.toLocaleString(DateTime.DATE_SHORT);
  // console.log('calendarDate | dateCalendarFormat: ', dateCalendarFormat);

  if (dateCalendarFormat === 'Invalid DateTime') {
    return '00/00/0000';
  }

  return dateCalendarFormat;
}
