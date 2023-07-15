import React from 'react';
import './styles.css';
import { minToTimeFormat, formatDateCalendarWithHourAndMinutes } from '../../../../utils/timeFormat';

export default function Time({ time, onUpdate }) {
  return (
    <div className="time" key={time.id} onClick={() => onUpdate()}>
      <p className="time__minutes">
        {minToTimeFormat(time.minutes)}
      </p>
      <p className="time__date">
        {formatDateCalendarWithHourAndMinutes(time.created)}
      </p>
      <p className="time__abiliity">
        {time.skill.name}
      </p>
    </div>
  );
}
