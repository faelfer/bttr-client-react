import React from "react";

import HeaderForm from "../../components/HeaderForm";
import DescriptionForm from "../../components/DescriptionForm";

import "./styles.css";

interface ContainerFormProps {
  heading: string;
  subtitle: string;
  children: React.ReactNode;
}

const ContainerForm = ({
  heading,
  subtitle,
  children,
}: ContainerFormProps): JSX.Element => {
  return (
    <div className="container-form">
      <HeaderForm title={heading} />
      <DescriptionForm description={subtitle} />
      {children}
    </div>
  );
};

export default ContainerForm;
