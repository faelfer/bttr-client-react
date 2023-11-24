import React from "react";

import "./styles.css";

interface HeaderFormProp {
  title: string;
}

const HeaderForm = ({ title }: HeaderFormProp): JSX.Element => {
  return <p className="text--header">{title}</p>;
};

export default HeaderForm;
