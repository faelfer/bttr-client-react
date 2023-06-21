import { DateTime } from 'luxon';

export default function calendarDateHourMinutes(dateString) {
  try {
    console.log('calendarDateHourMinutes | dateString: ', dateString);

    const dateTimeFromISO = DateTime.fromISO(dateString);
    console.log('calendarDateHourMinutes | dateTimeFromISO: ', dateTimeFromISO);

    const dateCalendarFormat = dateTimeFromISO.toLocaleString(DateTime.DATE_SHORT);
    console.log('calendarDateHourMinutes | dateCalendarFormat: ', dateCalendarFormat);

    const timeCalendarFormat = dateTimeFromISO.toLocaleString(DateTime.TIME_24_SIMPLE);
    console.log('calendarDateHourMinutes | timeCalendarFormat: ', timeCalendarFormat);

    const datetimeCalendarFormat = `${dateCalendarFormat} às ${timeCalendarFormat}`;
    console.log('calendarDateHourMinutes | datetimeCalendarFormat: ', datetimeCalendarFormat);

    return datetimeCalendarFormat;
  } catch (error) {
    console.log('calendarDateHourMinutes | error: ', error);
    return '00/00/0000 às 00:00';
  }
}
