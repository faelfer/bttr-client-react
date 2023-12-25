import React from "react";
import { useNavigate } from "react-router-dom";

import TimeItem from "../TimeItem";

import { type ITime } from "../../../../types/Time";

interface TimeItemsProp {
  itemsTime: ITime[];
}

const TimeItems = ({ itemsTime }: TimeItemsProp): JSX.Element[] => {
  const navigate = useNavigate();
  return itemsTime.map((timeLoop) => (
    <TimeItem
      key={timeLoop.id}
      itemTime={timeLoop}
      onUpdate={() => {
        navigate(`/times/${timeLoop.id}/update`, { replace: true });
      }}
    />
  ));
};

export default TimeItems;
