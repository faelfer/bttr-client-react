export function minToTimeFormat(amount) {
  let hour = Math.floor(amount / 60);
  let minute = amount % 60;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + parseInt(minute) : parseInt(minute);
  return `${hour}h${minute}min`;
};

export function msToTimeFormat(value) {

  function fillDigits(number, numberDigits) {
    // console.log("fillDigits | number: ", number);
    // console.log("fillDigits | numberDigits: ", numberDigits);

    numberDigits = numberDigits || 2;
    return ('00' + number).slice(-numberDigits);
  }

  let milliseconds = value % 1000;
  value = (value - milliseconds) / 1000;
  let seconds = value % 60;
  value = (value - seconds) / 60;
  let minutes = value % 60;
  let hours = (value - minutes) / 60;

  return fillDigits(hours) + ':' + fillDigits(minutes) + ':' + fillDigits(seconds);
}

export function formatDateCalendar(date){
  let day  = date.getDate().toString();
  let month  = (date.getMonth()+1).toString();
  let year = date.getFullYear();

  day = (day.length === 1) ? '0'+day : day;
  month = (month.length === 1) ? '0'+month : month;

  return `${year}-${month}-${day}`;
}

export function formatDateCalendarWithHourAndMinutes(dateString) {
  let date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day  = date.getDate().toString();
  let month  = (date.getMonth()+1).toString();
  let year = date.getFullYear();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + parseInt(minutes) : parseInt(minutes);

  day = (day.length === 1) ? '0'+day : day;
  month = (month.length === 1) ? '0'+month : month;

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}