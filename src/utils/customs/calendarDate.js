import { DateTime } from 'luxon';

export default function calendarDate(dateString) {
  try {
    console.log('calendarDate | dateString: ', dateString);

    const dateTimeFromISO = DateTime.fromISO(dateString);
    console.log('calendarDate | dateTimeFromISO: ', dateTimeFromISO);

    const dateCalendarFormat = dateTimeFromISO.toLocaleString(DateTime.DATE_SHORT);
    console.log('calendarDate | dateCalendarFormat: ', dateCalendarFormat);

    return dateCalendarFormat;
  } catch (error) {
    console.log('calendarDate | error: ', error);
    return '00/00/0000';
  }
}
