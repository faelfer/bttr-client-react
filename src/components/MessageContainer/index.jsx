import React from "react";

import "./styles.css";

export default function MessageContainer({ type, message }) {
  return (
    <p className={`container--message container--message-${type}`}>{message}</p>
  );
}
