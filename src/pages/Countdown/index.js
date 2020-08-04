import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import api from "../../services/api";
import { getToken } from "../../services/auth";
import Load from "../../components/Load";
import RadioOption from './components/RadioOption';
import { msToTimeFormat } from "../../utils/timeFormat";

function Countdown({ history }) {
    const [skills, setSkills] = useState([]);
    const [skillSelectedId, setSkillSelectedId] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    const [counterInitial, setCounterInitial] = useState(5000);
    const [counter, setCounter] = useState(0);
    const [counterId, setCounterId] = useState(0);
    const [isCounter, setIsCounter] = useState(false);
    const [error, setError] = useState("");
    const token = getToken(); 

    function skillSelected(id, minutesDaily) {
        console.log("skillSelected | id, minutesDaily: ", id, minutesDaily);
        setSkillSelectedId(id)
        setCounterInitial(minutesDaily * 60000)
    }

    async function progressMonth() {
        setIsLoad(true);
          try {
            const response = await api.get("/progress_month", {
                headers: { "Authorization": token }
            });
            console.log("progressThisMonth | response: ", response);
            setIsLoad(false);
            if(!response.data.status === 200) {
                setError("Houve um problema com a listagem de habilidades, tente novamente mais tarde");
            }

            setSkills(response.data)
            if (response.data.length > 0) {
                skillSelected(response.data[0]._id, response.data[0].goalPerDay)
            }
          } catch (error) {
            console.log("progressThisMonth | error", error);
            setError("Houve um problema com a listagem de habilidades, tente novamente mais tarde");
            setIsLoad(false);
          }

    };

    async function progressSum() {
        setIsLoad(true);
          try {
            const response = await api.put(`/progress_sum/${skillSelectedId}`, {
                headers: { "Authorization": token },
                "minutesDone":  (counterInitial / 60000), 
            });
            console.log("progressSum | response: ", response);
            setIsLoad(false);
            if(!response.data.status === 200) {
                setError("Houve um problema com o acréscimo de tempo, tente novamente mais tarde");
            }
            console.log("progressSum | response.data", response.data);
            if (error) {
                setError("");
            }

          } catch (error) {
            console.log("progressSum | error", error);
            setError("Houve um problema com o acréscimo de tempo, tente novamente mais tarde");
            setIsLoad(false);
          }

    };

    useEffect(() => {
        progressMonth();
    }, []);

    // Third Attempts
    useEffect(() => {
        console.log("useEffect")

        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1000), 1000);
          if (counter === 0 && isCounter === true) {
              console.log("useEffect | counter | accountant is over!")
              document.title = "Contagem Finalizada!"
              if (skillSelectedId) {
                progressSum()
              } else {
                setError("Nenhuma habilidade foi selecionada para receber o acréscimo de tempo.");
              }
          }
          setCounterId(timer)  
        return () => {
            clearInterval(counterId);
            document.title = "Bttr"
        }
    }, [counter]);

    function startCountdown() {
        setIsCounter(true)
        setCounter(counterInitial)
    }

    function resumeCountdown() {
        setIsCounter(true)
        setCounter(counter - 1)
    }

    function stopCountdown() {
        setIsCounter(false)
        clearInterval(counterId)
    }

    function resetCountdown() {
        setIsCounter(false)
        clearInterval(counterId)
        setCounter(0)
    }
  
    return (
        <div className="container-countdown">
            <NavBar navigation={history}/>
            <div>
                <div className="countdown">
                    <Load isShow={isLoad}/>
                        {counter === 0 ? msToTimeFormat(counterInitial) : msToTimeFormat(counter)}
                    <div className="countdown-actions">
                        {(counter === 0) ?
                            <button onClick={startCountdown}>Começar</button> 
                        :
                            null 
                        }
                        {(counter === 0 || !isCounter) ?
                            null 
                        :
                            <button onClick={stopCountdown}>Parar</button>
                        }
                        {(counter === 0 || isCounter) ?
                            null 
                        :
                            <button onClick={resumeCountdown}>Continuar</button>
                        }
                        {(counter === 0 || isCounter) ?
                            null 
                        :
                            <button onClick={resetCountdown}>Recomeçar</button>
                        }
                    </div>
                </div>
                <div className="container-radio">
                    {error && <p>{error}</p>}
                    {skills.map((skill, key) => (
                        <RadioOption 
                            skillSelectedId={skillSelectedId}
                            onSkillSelected={skillSelected}
                            skill={skill}
                            key={skill._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Countdown;