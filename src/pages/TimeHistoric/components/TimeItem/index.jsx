import React from 'react';

import ButtonOutlined from '../../../../components/ButtonContained';

import './styles.css';

import { minToTimeFormat, formatDateCalendarWithHourAndMinutes } from '../../../../utils/timeFormat';

export default function TimeItem({ timeProps, onUpdate }) {
  return (
    <div className="container--time" key={timeProps.id}>
      <p className="text--time-headline">
        {minToTimeFormat(timeProps.minutes)}
      </p>
      <p className="text--time-subhead">
        {timeProps.skill.name}
      </p>
      <p className="text--time-supporting">
        {formatDateCalendarWithHourAndMinutes(timeProps.created)}
      </p>
      <ButtonOutlined
        text="Editar"
        onAction={() => onUpdate()}
      />
    </div>
  );
}
