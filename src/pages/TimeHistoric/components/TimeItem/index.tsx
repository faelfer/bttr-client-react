import React from "react";

import ButtonOutlined from "../../../../components/ButtonContained";

import "./styles.css";

import clockHourMinute from "../../../../utils/customs/clockHourMinute";
import calendarDateHourMinutes from "../../../../utils/customs/calendarDateHourMinutes";

import { type ITime } from "../../../../types/Time";

interface TimeItemProp {
  itemTime: ITime;
  onUpdate: () => void;
}

const TimeItem = ({ itemTime, onUpdate }: TimeItemProp): JSX.Element => {
  return (
    <div className="container--time" key={itemTime.id}>
      <p className="text--time-headline">{clockHourMinute(itemTime.minutes)}</p>
      <p className="text--time-subhead">{itemTime.skill.name}</p>
      <p className="text--time-supporting">
        {calendarDateHourMinutes(itemTime.created)}
      </p>
      <ButtonOutlined
        text="Editar"
        onAction={() => {
          onUpdate();
        }}
      />
    </div>
  );
};

export default TimeItem;
