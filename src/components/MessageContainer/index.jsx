import React from "react";

import "./styles.css";

export default function MessageContainer({ message }) {
  return <p className="container--message text--message">{message}</p>;
}
