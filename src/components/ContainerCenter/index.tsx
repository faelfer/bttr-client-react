import React from "react";

import Load from "../Load";

import "./styles.css";

interface ContainerCenterProps {
  isRefreshing: boolean;
  children: React.ReactNode;
}

const ContainerCenter = ({
  isRefreshing,
  children,
}: ContainerCenterProps): JSX.Element => {
  return (
    <div className="container-center">
      <Load isShow={isRefreshing} />
      {children}
    </div>
  );
};

export default ContainerCenter;
