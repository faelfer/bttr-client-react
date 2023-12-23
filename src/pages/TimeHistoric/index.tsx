import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ContainerUpper from "../../components/ContainerUpper";
import ContainerForm from "../../components/ContainerForm";
import MessageContainer from "../../components/MessageContainer";
import TimeItems from "./components/TimeItems";
import ButtonContained from "../../components/ButtonContained";
import ButtonPagination from "../../components/ButtonPagination";

import { useTimesByPageQuery } from "../../services/time/api";

const TimeHistoric = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const { data: times, isLoading, refetch } = useTimesByPageQuery(page);

  const navigate = useNavigate();

  useEffect(() => {
    void refetch();
  }, [navigate]);

  return (
    <ContainerUpper isRefreshing={isLoading}>
      <ContainerForm>
        <ButtonContained
          text="Criar tempo"
          onAction={() => {
            navigate("/times/create", { replace: true });
          }}
        />
        {times === undefined || times.lengh === 0 ? (
          <MessageContainer message="Não há registros de tempos" />
        ) : null}
        <TimeItems itemsTime={times === undefined ? [] : times.results} />
        <ButtonPagination
          currentPage={page}
          totalPages={times === undefined ? 0 : times.pages}
          onUpdatePage={(updatedPage) => {
            setPage(updatedPage);
          }}
        />
      </ContainerForm>
    </ContainerUpper>
  );
};

export default TimeHistoric;
