import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getToken } from "../../services/auth";

import NavBar from "../../components/NavBar";
import Load from "../../components/Load";
import MessageContainer from "../../components/MessageContainer";
import TimeItem from "./components/TimeItem";
import ButtonContained from "../../components/ButtonContained";
import ButtonPagination from "../../components/ButtonPagination";

import "./styles.css";

import { TimesByPageFetch } from "../../api/services/TimeAPI";

export default function TimeHistoric() {
  const [times, setTime] = useState([]);
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState(1);
  const [exceptMessage, setExceptionMessage] = useState("");
  const [exceptType, setExceptionType] = useState("error");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();
  const amountItensByPage = 5;

  async function getTimesByPage(goToPage) {
    try {
      setIsLoading(true);
      const resultTimes = await TimesByPageFetch(token, goToPage);
      console.log("getTimesByPage | resultTimes: ", resultTimes);
      setTime(resultTimes.times);
      const countTotalPages = Math.ceil(resultTimes.count / amountItensByPage);
      console.log("getTimesByPage | countTotalPages: ", countTotalPages);
      setCountPages(countTotalPages);
      setExceptionMessage(resultTimes.message);
      setExceptionType(resultTimes.isSuccess ? "success" : "error");
      setIsLoading(false);
    } catch (error) {
      console.log("getTimesByPage | error: ", error);
      setExceptionMessage(
        "No momento esse recurso está indisponível, tente novamente mais tarde.",
      );
      setExceptionType("error");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTimesByPage(1);
  }, [location]);

  return (
    <>
      <NavBar navigation={navigate} />
      <Load isShow={isLoading} />
      <div className="content--align">
        <div className="form">
          <ButtonContained
            text="Criar tempo"
            onAction={() => navigate("/times/create", { replace: true })}
          />
          {exceptMessage && (
            <MessageContainer type={exceptType} message={exceptMessage} />
          )}
          {times.map((timeLoop) => (
            <TimeItem
              timeProps={timeLoop}
              onUpdate={() =>
                navigate(`/times/${timeLoop.id}/update`, { replace: true })
              }
            />
          ))}
          <ButtonPagination
            currentPage={page}
            totalPages={countPages}
            onChangeCurrentPage={(updatedCurrentPage) => {
              setPage(updatedCurrentPage);
              getTimesByPage(updatedCurrentPage);
            }}
          />
        </div>
      </div>
    </>
  );
}
