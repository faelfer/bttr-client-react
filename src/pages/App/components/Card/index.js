import React, { useState, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as IconSolid from '@fortawesome/free-solid-svg-icons';
import workingDays from "../../../../utils/workingDays";
import convertToHours from "../../../../utils/convertTime";

function Card({ item, navigation, onModal }) {
    const [percentage, setPercentage] = useState("");
    const [lackText, setLackText] = useState("");
    const [suggestionText, setSuggestionText] = useState("");
    const [situation, setSituation] = useState("");

    useEffect(() => {
        console.log("component Card | item:", item);
    
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

    async function calculateProgress(goalPerDay, goalDone) {
        const { currentYear, currentMouth, currentDay, lastDayMonth } = await datesMonth();

        const businessDays = workingDays(lastDayMonth, currentYear, currentMouth);
            console.log("businessDays: ", businessDays);
        let goalMonth = (businessDays * goalPerDay);
            console.log(`Meta de Minutos: ${goalMonth} | ${convertToHours(goalMonth)}`);
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
            setSuggestionText(( (convertToHours(goalRemaining)).toString() + ' para atingir o objetivo'));
            setSituation('Progresso ideal alcançado');
            console.log("================================================================");
        }else if ( item.goalDone > idealSituation ){
            console.log("renderItem | else if: Você ultrapassou a meta estabelecida.");

            setPercentage(parseInt(currentPercentage) + "%"); 
            setLackText(( (convertToHours(item.goalDone-idealSituation)).toString() + ' acima do ideal' ));
            setSuggestionText(( (convertToHours(goalRemaining)).toString() + ' para atingir o objetivo'));
            setSituation(' acima do ideal');
            console.log("================================================================");
        }else {
            console.warn("renderItem | else: Você está abaixo da meta estabelecida.");

            setPercentage(parseInt(currentPercentage) + "%"); 
            setLackText(( (convertToHours(idealSituation-item.goalDone)).toString() + ' para o progresso ideal' ));
            setSuggestionText(( (convertToHours(goalRemaining / (daysRemaining === 0 ? 1 : daysRemaining))).toString() + ' é sugerido para hoje'));
            setSituation(' para o progresso ideal');
            console.log("================================================================");
        }
    }

    function renderIconSituation(situation) {
        switch (situation) {
        case " para o progresso ideal":
            return    <FontAwesomeIcon 
                            icon={IconSolid["faAngleDown"]}
                            size="lg" 
                            color="#f4f5f7" 
                            className="icon" 
                        />
        case " acima do ideal":
            return  <FontAwesomeIcon 
                            icon={IconSolid["faAngleUp"]}
                            size="lg" 
                            color="#f4f5f7" 
                            className="icon" 
                    />
        case "Parabéns, objetivo concluido!":
            return  <FontAwesomeIcon 
                            icon={IconSolid["faTrophy"]}
                            size="lg" 
                            color="#f4f5f7" 
                            className="icon" 
                    />
        case "Progresso ideal alcançado":
            return  <FontAwesomeIcon 
                            icon={IconSolid["faCheck"]}
                            size="lg" 
                            color="#f4f5f7" 
                            className="icon" 
                    />
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
                    <div style={{width: (parseInt(percentage) > 100 ?  '100%' : percentage), height: 15, backgroundColor: '#f4f5f7', borderRadius: 50}} />
                </div>
            </div>
            <div>
                <div className="card-suggestion">
                    {renderIconSituation(situation)}
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
                    onClick={() => onModal()} 
                >
                    Detalhes
                </button>
            </div>
        </div>
    )
};

export default Card;