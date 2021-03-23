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
    const [abiliity, setAbiliity] = useState({});
    const [timeTotal, setTimeTotal] = useState(100);
    const [isLoad, setIsLoad] = useState(false);
    const [dateFilter, setDateFilter] = useState("any date");
    const [error, setError] = useState('');

    const getTimesFilterByAbiliity = useCallback(async () => {
      setIsLoad(true);
        try {
          const response = await api.get(`/time/filter_by_abiliity/${abiliityId}`, {
              headers: { "Authorization": token }
          });
          console.log("getTimes | response: ", response);
          setIsLoad(false);
          if(!response.data.status === 200) {
              setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          }

          setTimes(response.data)
        } catch (error) {
          console.log("getTimes | error: ", error);
            if(error.message === "Request failed with status code 401") {
              logout();
              history.push("/");
            }
          setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          setIsLoad(false);
        }

    }, [token, history, abiliityId]);

    const getTimes = useCallback(async () => {
      setIsLoad(true);
        try {
          const response = await api.get('/time', {
              headers: { "Authorization": token }
          });
          console.log("getTimes | response: ", response);
          setIsLoad(false);
          if(!response.data.status === 200) {
              setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          }

          setTimes(response.data)
        } catch (error) {
          console.log("getTimes | error: ", error);
            if(error.message === "Request failed with status code 401") {
              logout();
              history.push("/");
            }
          setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          setIsLoad(false);
        }

    }, [token, history]);

    useEffect(() => {

      if(!abiliityId) {
        getTimes();
      } else {
        getTimesFilterByAbiliity();
      }

    }, [token, history, abiliityId, getTimes, getTimesFilterByAbiliity]);

    const getTimesFilterByMonth = useCallback(async () => {
      setIsLoad(true);
        try {
          const response = await api.get(`/time/historic_month/${abiliityId}`, {
              headers: { "Authorization": token }
          });
          console.log("getTimesFilterByMonth | response: ", response);
          setIsLoad(false);
          if(!response.data.status === 200) {
              setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          }

          setTimes(response.data)
          if (response.data) {
            console.log("getTimesFilterByMonth | if (response.data) ");
            setAbiliity(response.data[0].abiliity)
            console.log("getTimesFilterByMonth | (response.data).length: ", (response.data).length);
            if ((response.data).length >= 1) {
              console.log("getTimesFilterByMonth | if (response.data[0] > 1) ");
              let minutesTotal = (response.data).reduce(function(acumulador, valorAtual, index, array) {
                console.log("(response.data).reduce: ", acumulador, valorAtual)
                return acumulador.minutes + valorAtual.minutes;
              });
              setTimeTotal(minutesTotal)
            } else {
              console.log("getTimesFilterByMonth | else (response.data[0] > 1) ");
              setTimeTotal(response.data[0].minutes)
            }
          }
        } catch (error) {
          console.log("getTimesFilterByMonth | error: ", error);
            if(error.message === "Request failed with status code 401") {
              logout();
              history.push("/");
            }
          setError("Houve um problema ao listar as habilidades, tente novamente mais tarde");
          setIsLoad(false);
        }

    }, [token, history, abiliityId]);

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

                    {abiliityId ?
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
            </div>
        </>
    )
};