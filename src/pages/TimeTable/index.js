import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import api from "../../services/api";
import { getToken, logout } from "../../services/auth";
import NavBar from "../../components/NavBar";
import Time from "./components/Time";
import Load from "../../components/Load";
import { useParams } from "react-router-dom";

export default function TimeTable({ history }) {
    const token = getToken(); 
    const { abiliityId } = useParams();
    const [times, setTimes] = useState([]);
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
            <div className="content--align">
                <div className="time__content">
                {error && <p className="form__message--error">{error}</p>}
                <Load isShow={isLoad}/>
                <>
                  <div className="time__create">
                    <button className="time__button" onClick={() => history.push("/time")}>
                      Criar registro de tempo
                    </button>  
                  </div>

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