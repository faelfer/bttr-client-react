import React from "react";

import NavBar from "../NavBar";
import Load from "../Load";

import "./styles.css";

interface ContainerUpperProps {
  isRefreshing: boolean;
  children: React.ReactNode;
}

const ContainerUpper = ({
  isRefreshing,
  children,
}: ContainerUpperProps): JSX.Element => {
  return (
    <>
      <NavBar />
      <div className="container-upper">
        <Load isShow={isRefreshing} />
        {children}
      </div>
    </>
  );
};

export default ContainerUpper;
