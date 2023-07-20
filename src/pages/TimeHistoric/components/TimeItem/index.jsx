import React from 'react';

import ButtonOutlined from '../../../../components/ButtonContained';

import './styles.css';

import { minToTimeFormat, formatDateCalendarWithHourAndMinutes } from '../../../../utils/timeFormat';

export default function TimeItem({ timeProps, onUpdate }) {
  return (
    <div className="time" key={timeProps.id}>
      <p className="time__minutes">
        {minToTimeFormat(timeProps.minutes)}
      </p>
      <p className="time__date">
        {formatDateCalendarWithHourAndMinutes(timeProps.created)}
      </p>
      <p className="time__abiliity">
        {timeProps.skill.name}
      </p>
      <ButtonOutlined
        text="Editar"
        onAction={() => onUpdate()}
      />
    </div>
  );
}
