import React from 'react';
import './styles.css';
import { minToTimeFormat, formatDateCalendarWithHourAndMinutes } from '../../../../utils/timeFormat';

export default function Time({ history, time, key }) {
  return (
    <div className="time" key={key} onClick={() => history.push(`/time-detail/${time._id}`)}>
      <p className="time__minutes">
        {minToTimeFormat(time.minutes)}
      </p>
      <p className="time__date">
        {formatDateCalendarWithHourAndMinutes(time.createAt)}
      </p>
      <p className="time__abiliity">
        {time.abiliity.name}
      </p>
    </div>
  );
}
