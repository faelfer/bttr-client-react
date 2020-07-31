import React, { useState, useEffect } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import api from "../../services/api";
import { getToken } from "../../services/auth";
import Load from "../../components/Load";

function Countdown({ history }) {
    const [skills, setSkills] = useState([]);
    const [skillSelectedId, setSkillSelectedId] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    const [counterInitial, setCounterInitial] = useState(5000);
    const [counter, setCounter] = useState(0);
    const [counterId, setCounterId] = useState(0);
    const [isCounter, setIsCounter] = useState(false);
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
            //   setError("Ocorreu um erro ao registrar sua conta. ;-;");
            }

            setSkills(response.data)
            if (response.data.length > 0) {
                skillSelected(response.data[0]._id, response.data[0].goalPerDay)
            }
          } catch (error) {
            console.log("progressThisMonth | error", error);
            // setError("Houve um problema com o login, verifique suas credenciais. ;-;");
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
            //   setError("Ocorreu um erro ao registrar sua conta. ;-;");
            }
            console.log(response.data)

          } catch (error) {
            console.log("progressSum | error", error);
            // setError("Houve um problema com o login, verifique suas credenciais. ;-;");
            setIsLoad(false);
          }

    };

    function msToTime(s) {
        // Pad to 2 or 3 digits, default is 2
        function pad(n, z) {
          z = z || 2;
          return ('00' + n).slice(-z);
        }
      
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
      
        return pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
    }

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
              progressSum()
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
                        {counter === 0 ? msToTime(counterInitial) : msToTime(counter)}
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
                    {skills.map((skill, key) => (
                        <div className="radio-option" onClick={() => skillSelected(skill._id, skill.goalPerDay)}>
                            <div className="radio-input">
                            <input 
                                type="radio" 
                                id={skill._id} 
                                name="skill" 
                                value={skill._id} 
                                checked={skill._id === skillSelectedId ? true : false}
                            />
                            </div>
                            <div className="radio-name">
                                <label for={skill._id}>{skill.name}</label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Countdown;