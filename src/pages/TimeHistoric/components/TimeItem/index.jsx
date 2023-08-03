import React from 'react';

import ButtonOutlined from '../../../../components/ButtonContained';

import './styles.css';

import clockHourMinute from '../../../../utils/customs/clockHourMinute';
import calendarDateHourMinutes from '../../../../utils/customs/calendarDateHourMinutes';

export default function TimeItem({ timeProps, onUpdate }) {
  return (
    <div className="container--time" key={timeProps.id}>
      <p className="text--time-headline">
        {clockHourMinute(timeProps.minutes)}
      </p>
      <p className="text--time-subhead">
        {timeProps.skill.name}
      </p>
      <p className="text--time-supporting">
        {calendarDateHourMinutes(timeProps.created)}
      </p>
      <ButtonOutlined
        text="Editar"
        onAction={() => onUpdate()}
      />
    </div>
  );
}
