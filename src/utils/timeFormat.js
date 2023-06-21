export function minToTimeFormat(amount) {
  let hour = Math.floor(amount / 60);
  let minute = amount % 60;
  hour = hour < 10 ? `0${hour}` : hour;
  minute = minute < 10 ? `0${parseInt(minute, 10)}` : parseInt(minute, 10);
  return `${hour}h${minute}min`;
}

export function formatDateCalendar(date) {
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();

  day = (day.length === 1) ? `0${day}` : day;
  month = (month.length === 1) ? `0${month}` : month;

  return `${year}-${month}-${day}`;
}

export function formatDateCalendarWithHourAndMinutes(dateString) {
  const date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${parseInt(minutes, 10)}` : parseInt(minutes, 10);

  day = (day.length === 1) ? `0${day}` : day;
  month = (month.length === 1) ? `0${month}` : month;

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}
