import React from "react";
import { useNavigate } from "react-router-dom";

import MessageContainer from "../../../../components/MessageContainer";
import TimeItem from "../TimeItem";

export default function TimeItems({ messageNoItem, countItems, itemsTime }) {
  const navigate = useNavigate();
  return countItems === 0 || countItems === undefined ? (
    <MessageContainer type="error" message={messageNoItem} />
  ) : (
    itemsTime.map((timeLoop) => (
      <TimeItem
        timeProps={timeLoop}
        onUpdate={() => {
          navigate(`/times/${timeLoop.id}/update`, { replace: true });
        }}
      />
    ))
  );
}
