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
  let data = new Date(date),
      dia  = data.getDate().toString(),
      diaF = (dia.length === 1) ? '0'+dia : dia,
      mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length === 1) ? '0'+mes : mes,
      anoF = data.getFullYear();
  return diaF+"/"+mesF+"/"+anoF;
}