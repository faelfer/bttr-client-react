import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import api from "../../services/api";
import { getToken, logout } from "../../services/auth";
import NavBar from "../../components/NavBar";
import Time from "./components/Time";
import Abstract from "./components/Abstract";
import Load from "../../components/Load";
import { useParams } from "react-router-dom";

export default function TimeTable({ history }) {
    const token = getToken(); 
    const { abiliityId } = useParams();
    const [times, setTimes] = useState([]);
    const [timeInfo, setTimeInfo] = useState({});
    const [page, setPage] = useState(1);
    const [abiliity, setAbiliity] = useState({});
    const [timeTotal, setTimeTotal] = useState(100);
    const [isLoad, setIsLoad] = useState(false);
    const [dateFilter, setDateFilter] = useState("any date");
    const [error, setError] = useState('');

    const getTimesFilterByAbiliity = useCallback(async (pageNumber = 1) => {
      setIsLoad(true);
        try {
          const response = await api.get(`/time/filter_by_abiliity/${abiliityId}?page=${pageNumber}`, {
              headers: { "Authorization": token }
          });
          console.log("getTimesFilterByAbiliity | response: ", response);
          const { docs, ...timeInfo } = response.data;
          setIsLoad(false);
          if(!response.data.status === 200) {
              setError("Houve um problema ao listar seus registros de tempo, tente novamente mais tarde");
          }

          setTimes(docs)
          setTimeInfo(timeInfo);
          setPage(pageNumber);
        } catch (error) {
          console.log("getTimesFilterByAbiliity | error: ", error);
            if(error.message === "Request failed with status code 401") {
              logout();
              history.push("/");
            }
          setError("Houve um problema ao listar seus registros de tempo, tente novamente mais tarde");
          setIsLoad(false);
        }

    }, [token, history, abiliityId]);

    const getTimes = useCallback(async (pageNumber = 1) => {
      setIsLoad(true);
        try {
          const response = await api.get(`/time?page=${pageNumber}`, {
              headers: { "Authorization": token }
          });
          console.log("getTimes | response: ", response);
          const { docs, ...timeInfo } = response.data;
          setIsLoad(false);
          if(!response.data.status === 200) {
              setError("Houve um problema ao listar seus registros de tempo, tente novamente mais tarde");
          }

          setTimes(docs)
          setTimeInfo(timeInfo);
          setPage(pageNumber);
        } catch (error) {
          console.log("getTimes | error: ", error);
            if(error.message === "Request failed with status code 401") {
              logout();
              history.push("/");
            }
          setError("Houve um problema ao listar seus registros de tempo, tente novamente mais tarde");
          setIsLoad(false);
        }

    }, [token, history]);

    const getTimesFilterByMonth = useCallback(async (pageNumber = 1) => {
      setIsLoad(true);
        try {
          const response = await api.get(`/time/filter_by_abiliity_and_created_in_current_month/${abiliityId}`, {
              headers: { "Authorization": token }
          });
          console.log("getTimesFilterByMonth | response: ", response);
          const { docs, ...timeInfo } = response.data;
          setIsLoad(false);

          if(!response.data.status === 200) {
              setError("Houve um problema ao listar seus registros de tempo, tente novamente mais tarde");
          }

          setTimes(docs)
          setTimeInfo(timeInfo);
          setPage(pageNumber);
          if (response.data) {
            console.log("getTimesFilterByMonth | if (response.data) ");
            setAbiliity(docs[0].abiliity)
            console.log("getTimesFilterByMonth | (docs).length: ", (docs).length);
            if (docs.length >= 1) {
              console.log("getTimesFilterByMonth | if (docs[0] > 1) ");
              let minutesTotal = docs.reduce(function(acumulador, valorAtual, index, array) {
                console.log("(docs).reduce | valorAtual: ", valorAtual)
                console.log("(docs).reduce | acumulador: ", acumulador)
                console.log("(docs).reduce | acumulador.minutes: ", acumulador.minutes)
                console.log("(docs).reduce: | valorAtual.minutes: ", valorAtual.minutes)
                console.log("============================================================")

                if (typeof acumulador ===	"object") {
                  return acumulador.minutes + valorAtual.minutes;
                } else {
                  return acumulador + valorAtual.minutes;
                }

              });
              console.log("getTimesFilterByMonth | minutesTotal: ", minutesTotal);
              setTimeTotal(minutesTotal)
            } else {
              console.log("getTimesFilterByMonth | else (docs[0] > 1) | docs[0].minutes: ", docs[0].minutes);
              setTimeTotal(docs[0].minutes)
            }
          }
        } catch (error) {
          console.log("getTimesFilterByMonth | error: ", error);
            if(error.message === "Request failed with status code 401") {
              logout();
              history.push("/");
            }
          setError("Houve um problema ao listar seus registros de tempo, tente novamente mais tarde");
          setIsLoad(false);
        }

    }, [token, history, abiliityId]);

    useEffect(() => {

      if(!abiliityId) {
        getTimes();
      } else {
        getTimesFilterByAbiliity();
      }

    }, [token, history, abiliityId, getTimes, getTimesFilterByAbiliity]);

    useEffect(() => {
      switch (dateFilter) {
        case 'month':
          getTimesFilterByMonth()
          break;
        default:
          if(!abiliityId) {
            getTimes();
          } else {
            getTimesFilterByAbiliity();
          }
      }

    }, [abiliityId, dateFilter, getTimes, getTimesFilterByAbiliity, getTimesFilterByMonth]);

    function prevPage() {
      if (page === 1) return;

      const pageNumber = page - 1;

      switch (dateFilter) {
        case 'month':
          getTimesFilterByMonth(pageNumber)
          break;
        default:
          if(!abiliityId) {
            getTimes(pageNumber);
          } else {
            getTimesFilterByAbiliity(pageNumber);
          }
      }
      
  }

  function nextPage() {
      console.log("nextPage");
      if (page === timeInfo.pages) return;

      const pageNumber = page + 1;
      console.log("nextPage | pageNumber: ", pageNumber);
      switch (dateFilter) {
        case 'month':
          getTimesFilterByMonth(pageNumber)
          break;
        default:
          if(!abiliityId) {
            getTimes(pageNumber);
          } else {
            getTimesFilterByAbiliity(pageNumber);
          }
      }
      
  }

    return (
        <>
            <NavBar navigation={history}/>
            <div className="content--align content--column">
              {dateFilter === "month" ?
                <div className="time__content">
                  <>
                    <Abstract abiliity={abiliity} currentDate={new Date()} timeTotal={timeTotal}/>
                  </>
                </div>
              :
                null
              }

              <div className="time__content">
                <>
                    <div className="time__create">
                      <button className="time__button" onClick={() => history.push("/time")}>
                        Criar registro de tempo
                      </button>  
                    </div>
                </>
              </div>

              <div className="time__content">
                {error && <p className="form__message--error">{error}</p>}
                <Load isShow={isLoad}/>
                <>

                  {abiliityId && times.length !== 0 ?
                      (
                        <select 
                          className="time__filter" 
                          value={dateFilter} 
                          onChange={event => {
                            console.log("select | event.target.value: ",event.target.value)
                            setDateFilter(event.target.value) 
                          }}
                        >
                          <option value="month">Este mês</option>
                          <option value="any date">Qualquer data</option>
                        </select>
                      )
                    :
                      null
                  }

                  {times.map((time, key) => (
                    <Time time={time} history={history} key={key}/>
                  ))}
                </>
              </div>

              <div className="time__content">
                <>
                    <div className="home__pagination">
                      <button className="pagination__button" disabled={page === 1} onClick={prevPage}>
                        Anterior
                      </button>
                      <button className="pagination__button" disabled={page === timeInfo.pages} onClick={nextPage}>
                        Próximo
                      </button>
                    </div>
                </>
              </div>
            </div>
        </>
    )
};