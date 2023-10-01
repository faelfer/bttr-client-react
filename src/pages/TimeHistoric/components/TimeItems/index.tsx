import React from "react";
import { useNavigate } from "react-router-dom";

import TimeItem from "../TimeItem";

interface ITime {
  id: number;
  minutes: number;
}

interface TimeItemsProp {
  itemsTime: ITime[];
}

const TimeItems = ({ itemsTime }: TimeItemsProp): JSX.Element[] => {
  const navigate = useNavigate();
  return itemsTime.map((timeLoop) => (
    <TimeItem
      key={timeLoop.id}
      timeProps={timeLoop}
      onUpdate={() => {
        navigate(`/times/${timeLoop.id}/update`, { replace: true });
      }}
    />
  ));
};

export default TimeItems;
