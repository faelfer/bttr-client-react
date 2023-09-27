import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import TimeItems from "./components/TimeItems";
import ButtonContained from "../../components/ButtonContained";
import ButtonPagination from "../../components/ButtonPagination";

import "./styles.css";

import { useTimesByPageQuery } from "../../services/time/api";

export default function TimeHistoric() {
  const [page, setPage] = useState(1);

  const { data: times, isLoading } = useTimesByPageQuery(page);

  const navigate = useNavigate();
  const amountItensByPage = 5;

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <ButtonContained
            text="Criar tempo"
            onAction={() => {
              navigate("/times/create", { replace: true });
            }}
          />
          <TimeItems
            messageNoItem="Não há registros de habilidades relacionadas ao seu cadastro."
            countItems={!times?.results ? 0 : times.results.length}
            itemsTime={!times?.results ? [] : times.results}
          />
          <ButtonPagination
            currentPage={page}
            totalPages={
              !times?.results ? 0 : Math.ceil(times.count / amountItensByPage)
            }
            onChangeCurrentPage={(updatedPage) => {
              setPage(updatedPage);
            }}
          />
        </div>
      </div>
    </>
  );
}
