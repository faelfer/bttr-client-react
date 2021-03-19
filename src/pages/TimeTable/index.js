import React, { useState, useEffect } from "react";
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
    const [error, setError] = useState('');

    useEffect(() => {
      console.log(abiliityId)
      async function getTimesFilterByAbiliity() {
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

      };

      async function getTimes() {
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

      };

      if(!abiliityId) {
        getTimes();
      }

      getTimesFilterByAbiliity()

    }, [token, history, abiliityId]);

    return (
        <>
            <NavBar navigation={history}/>
            <div className="content--align">
                <div className="time__content">
                {error && <p className="form__message--error">{error}</p>}
                <Load isShow={isLoad}/>
                <>
                  <div className="time__create">
                    <button className="form__button" onClick={() => history.push("/abiliity")}>
                      Criar habilidade
                    </button>  
                  </div>
                  {times.map((time, key) => (
                    <Time time={time}/>
                  ))}
                </>
                </div>
            </div>
        </>
    )
};