import React from "react";

import "./styles.css";

interface MessageContainerProp {
  message: string;
}

const MessageContainer = ({ message }: MessageContainerProp): JSX.Element => {
  return <p className="container--message text--message">{message}</p>;
};

export default MessageContainer;
