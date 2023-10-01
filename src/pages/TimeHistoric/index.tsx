import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import MessageContainer from "../../components/MessageContainer";
import TimeItems from "./components/TimeItems";
import ButtonContained from "../../components/ButtonContained";
import ButtonPagination from "../../components/ButtonPagination";

import "./styles.css";

import { useTimesByPageQuery } from "../../services/time/api";

const TimeHistoric = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const { data: times, isLoading } = useTimesByPageQuery(page);

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <ButtonContained
            text="Criar tempo"
            onAction={() => {
              navigate("/times/create", { replace: true });
            }}
          />

          {!times?.results ? (
            <MessageContainer message="Não há registros de habilidades relacionadas ao seu cadastro." />
          ) : null}

          <TimeItems itemsTime={!times?.results ? [] : times.results} />
          <ButtonPagination
            currentPage={page}
            totalPages={!times?.results ? 0 : times.pages}
            onUpdatePage={(updatedPage) => {
              setPage(updatedPage);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TimeHistoric;
