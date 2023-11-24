import React from "react";

import "./styles.css";

interface DescriptionFormProp {
  description: string;
}

const DescriptionForm = ({ description }: DescriptionFormProp): JSX.Element => {
  return <p className="text--description">{description}</p>;
};

export default DescriptionForm;
