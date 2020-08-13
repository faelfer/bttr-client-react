import React, { useState, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';
import workingDays from "../../../../utils/workingDays";
import { minToTimeFormat } from "../../../../utils/timeFormat";

function Card({ item, onDetails, onAddMinutes }) {
    const [percentage, setPercentage] = useState("");
    const [lackText, setLackText] = useState("");
    const [suggestionText, setSuggestionText] = useState("");
    const [suggestionMin, setSuggestionMin] = useState(0);
    const [situation, setSituation] = useState("");

    useEffect(() => {
        console.log("Component Card | useEffect | item:", item);
        async function calculateProgress(goalPerDay, goalDone) {
            const { currentYear, currentMouth, currentDay, lastDayMonth } = await datesMonth();
    
            const businessDays = workingDays(lastDayMonth, currentYear, currentMouth);
                console.log("businessDays: ", businessDays);
            let goalMonth = (businessDays * goalPerDay);
                console.log(`Meta de Minutos: ${goalMonth} | ${minToTimeFormat(goalMonth)}`);
            let goalRemaining = (goalMonth - goalDone);
            const businessDaysSoFar = workingDays(currentDay, currentYear, currentMouth);
                console.log("BusinessDaysSoFar: ", businessDaysSoFar);
            let daysRemaining = (businessDays - businessDaysSoFar) + 1;
                console.log(`Dias Restantes: ${daysRemaining}`);
            let idealSituation = (businessDaysSoFar * goalPerDay);
                // console.log(`Situação Ideal: ${idealSituation}`);
            let currentPercentage = (( goalDone * 100 ) / goalMonth);
                console.log(`Ideal percentage so far: ${parseInt((businessDaysSoFar * 100)/businessDays)}%`);
    
            return { goalMonth, idealSituation, currentPercentage, goalRemaining, daysRemaining };
        }

        async function renderItem() {
            const {goalMonth, idealSituation, currentPercentage, goalRemaining, daysRemaining} = await calculateProgress(item.goalPerDay, item.goalDone);
            // console.log("renderItem: ", goalMonth, idealSituation, currentPercentage, goalRemaining, daysRemaining);
    
            if ( item.goalDone >= goalMonth ){
                console.log("renderItem | if: Parabéns, você concluiu a meta estabelecida!");
    
                setPercentage(parseInt(currentPercentage) + "%"); 
                setLackText('Parabéns, objetivo concluido!');
                setSituation('Parabéns, objetivo concluido!');
                console.log("================================================================");
            }else if ( item.goalDone === idealSituation ){
                console.log("renderItem | else if: Você está de acordo com a meta estabelecida.");
    
                setPercentage(parseInt(currentPercentage) + "%"); 
                setLackText('Progresso ideal alcançado');
                setSuggestionText(( (minToTimeFormat(goalRemaining)).toString() + ' para atingir o objetivo'));
                setSuggestionMin(parseInt(goalRemaining));
                setSituation('Progresso ideal alcançado');
                console.log("================================================================");
            }else if ( item.goalDone > idealSituation ){
                console.log("renderItem | else if: Você ultrapassou a meta estabelecida.");
    
                setPercentage(parseInt(currentPercentage) + "%"); 
                setLackText(( (minToTimeFormat(item.goalDone-idealSituation)).toString() + ' acima do ideal' ));
                setSuggestionText(( (minToTimeFormat(goalRemaining)).toString() + ' para atingir o objetivo'));
                // setSuggestionMin(0);
                setSituation(' acima do ideal');
                console.log("================================================================");
            }else {
                console.warn("renderItem | else: Você está abaixo da meta estabelecida.");
    
                setPercentage(parseInt(currentPercentage) + "%"); 
                setLackText(( (minToTimeFormat(idealSituation-item.goalDone)).toString() + ' para o progresso ideal' ));
                setSuggestionText(( (minToTimeFormat(goalRemaining / (daysRemaining === 0 ? 1 : daysRemaining))).toString() + ' é sugerido para hoje'));
                setSuggestionMin(parseInt(goalRemaining / (daysRemaining === 0 ? 1 : daysRemaining)));
                setSituation(' para o progresso ideal');
                console.log("================================================================");
            }
        }
    
        renderItem();
    }, [item]);

    function datesMonth() {
        const currentDate = new Date();
        // console.log(`Hoje: ${currentDate.getDate()}/${((currentDate.getMonth())+1)}/${currentDate.getFullYear()}`);
        const currentYear = currentDate.getFullYear();
        // console.log(`Ano Atual: ${currentYear}`);
        const currentMouth = currentDate.getMonth();
        console.log(`Mês Atual: ${currentMouth}`);
        const currentDay = currentDate.getDate();
        // console.log(`Hoje: ${currentDay}`);
        const manipulatedDate = new Date(currentYear, (currentMouth + 1), 0);
        console.log(`Data Manipulada: ${manipulatedDate}`);
        const lastDayMonth = manipulatedDate.getDate();
        // console.log(`Último Dia do Mês ${lastDayMonth}`);

        return { currentYear, currentMouth, currentDay, lastDayMonth }
    }

    function renderIconSituation(situation) {
        switch (situation) {
        case " para o progresso ideal":
            return "faAngleDown"
        case " acima do ideal":
            return  "faAngleUp"
        case "Parabéns, objetivo concluido!":
            return  "faTrophy"
        case "Progresso ideal alcançado":
            return  "faCheck"
        default:
            return null;
        }

    }

    return (
        <div className="card">
            <div className="card-overview">
                <div>
                    <p>{item.name}</p>
                    <p>{percentage}</p>
                </div>
                <div>
                    <FontAwesomeIcon 
                        icon={IconSolid[item.icon]}
                        size="3x"
                        color="#f4f5f7" 
                    />                </div>
            </div>
            <div className="task-progress">
                <div className="progress">
                    <div style={{width: (parseInt(percentage) > 100 ? '100%' : percentage), height: 15, backgroundColor: '#f4f5f7', borderRadius: 50}} />
                </div>
            </div>
            <div>
                <div className="card-suggestion">
                    <FontAwesomeIcon 
                        icon={IconSolid[renderIconSituation(situation)]}
                        size="lg" 
                        color="#f4f5f7" 
                        className="icon" 
                    />
                    <p>{lackText}</p>
                </div>
                {suggestionText ? 
                    <div className="card-suggestion">
                        <FontAwesomeIcon 
                            icon={IconSolid["faAngleDoubleUp"]} 
                            size="lg" 
                            color="#f4f5f7" 
                            className="icon" 
                        />
                        <p>{suggestionText}</p>
                    </div>
                :
                    null
                }

            </div>
            <div className="card-action">
                <button 
                    type="submit" 
                    onClick={() => onAddMinutes(item._id, item.goalPerDay)} 
                >
                    Adicionar Tempo Diário
                </button>
                <button 
                    type="submit" 
                    onClick={() => onAddMinutes(item._id, suggestionMin)}
                    disabled={suggestionMin === 0 ? true : false} 
                >
                    Adicionar Tempo Sugerido
                </button>
                <button 
                    type="submit" 
                    onClick={() => onDetails()} 
                >
                    Detalhes
                </button>
            </div>
        </div>
    )
};

export default Card;