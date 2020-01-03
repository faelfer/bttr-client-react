import React, { useState, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faAngleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
// import { faUser, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import workingDays from "../../../../utils/workingDays";
import convertToHours from "../../../../utils/convertTime";
import { render } from "@testing-library/react";

function App({ item }) {
    const [percentage, setPercentage] = useState("");
    const [lackText, setLackText] = useState("");
    const [lackTitleText, setLackTitleText] = useState("");
    const [suggestionText, setSuggestionText] = useState("");
    const [suggestionTitleText, setSuggestionTitleText] = useState("");

    useEffect(() => {
        console.log("component Card | item:", item);
    
        renderItem();
    }, []);

    function calculateProgress(goalPerDay, goalDone) {
        let currentDate = new Date();
        // console.log(`Hoje: ${currentDate.getDate()}/${((currentDate.getMonth())+1)}/${currentDate.getFullYear()}`);
        let currentYear = currentDate.getFullYear();
        // console.log(`Ano Atual: ${currentYear}`);
        let currentMouth = currentDate.getMonth();
        // console.log(`Mês Atual: ${currentMouth}`);
        let currentDay = currentDate.getDate();
        // console.log(`Hoje: ${currentDay}`);
        let manipulatedDate = new Date(currentYear, (currentMouth + 1), 0);
        // console.log(`Data Manipulada: ${manipulatedDate}`);
        let lastDayMonth = manipulatedDate.getDate();
        // console.log(`Último Dia do Mês ${lastDayMonth}`);

        const businessDays = workingDays(lastDayMonth, currentYear, currentMouth);
        console.log("businessDays: ", businessDays);

        let goalMonth = (businessDays * goalPerDay);
        // console.log(`Meta de Minutos: ${goalMonth} | ${convertToHours(goalMonth)}`);
        let goalRemaining = (goalMonth - goalDone);

        const businessDaysSoFar = workingDays(currentDay, currentYear, currentMouth);
        console.log("BusinessDaysSoFar: ", businessDaysSoFar);

        let daysRemaining = (businessDays - businessDaysSoFar) + 1;
        console.log(`Dias Restantes: ${daysRemaining}`);
        let idealSituation = (businessDaysSoFar * goalPerDay);
        // console.log(`Situação Ideal: ${idealSituation}`);
        let currentPercentage = (( goalDone * 100 ) / goalMonth);
        
        console.log(`Ideal percentage so far: ${parseInt((businessDaysSoFar * 100)/businessDays)}%`);

        return {goalMonth, idealSituation, currentPercentage, goalRemaining, daysRemaining};
    }

    async function renderItem() {
        const {goalMonth, idealSituation, currentPercentage, goalRemaining, daysRemaining} = await calculateProgress(item.goalPerDay, item.goalDone);
        // console.log(goalMonth, idealSituation, currentPercentage, goalRemaining, daysRemaining);

        if ( item.goalDone >= goalMonth ){
            console.log("renderItem | if: Parabéns, você concluiu a meta estabelecida!");
            let percentage = parseInt(currentPercentage) + "%";
                console.log("renderItem | percentage: ", percentage)
            let lackText = 'Success, goal completed!';
                console.log(suggestionTitleText);

            setPercentage(percentage); 
            setLackText(lackText);
            // setLackTitleText(lackTitleText);
            // setSuggestionText(suggestionText);
            // setSuggestionText(suggestionTitleText);
            console.log("================================================================");
        }else if ( item.goalDone === idealSituation ){
            console.log("renderItem | else if: Você está de acordo com a meta estabelecida.");
            let percentage = parseInt(currentPercentage) + "%";
                console.log("renderItem | percentage: ", percentage);
            let lackText = 'Ideal goal achieved';
                console.log("renderItem | lackText: ", lackText);
            let suggestionText = ( (convertToHours(goalRemaining)).toString() + ' Remaining to goal');
                console.log("renderItem | suggestionText: ", suggestionText);

            setPercentage(percentage); 
            setLackText(lackText);
            setSuggestionText(suggestionText);
            console.log("================================================================");
        }else if ( item.goalDone > idealSituation ){
            console.log("renderItem | else if: Você ultrapassou a meta estabelecida.");
            let percentage = parseInt(currentPercentage) + "%";
                console.log("renderItem | percentage: ", percentage);
            let lackText = ( (convertToHours(item.goalDone-idealSituation)).toString() + ' Ideal goal exceeded' );
                console.log("renderItem | lackText: ", lackText);
            let suggestionText = ( (convertToHours(goalRemaining)).toString() + ' Remaining to goal');
                console.log("renderItem | suggestionText: ", suggestionText);

            setPercentage(percentage); 
            setLackText(lackText);
            setSuggestionText(suggestionText);
            console.log("================================================================");
        }else {
            console.warn("renderItem | else: Você está abaixo da meta estabelecida.");
            let percentage = parseInt(currentPercentage) + "%";
                console.log("renderItem | percentage: ", percentage);
            let lackText = ( (convertToHours(idealSituation-item.goalDone)).toString() + ' Missing for the ideal' );
                console.log("renderItem | lackText: ", lackText);
            let suggestionText = ( (convertToHours(goalRemaining / (daysRemaining == 0 ? 1 : daysRemaining))).toString() + ' Daily suggestion');
                console.log("renderItem | suggestionText: ", suggestionText);

            setPercentage(percentage); 
            setLackText(lackText);
            setSuggestionText(suggestionText);
            console.log("================================================================");
        }
    }

    return (
        <div className="card">
            <div className="card-overview">
                <div className="card-info">
                    <p>{item.name}</p>
                    <p>{percentage}</p>
                    
                </div>
                <div>
                    <FontAwesomeIcon 
                        icon={faCode}
                        size="lg" 
                        color="grey" 
                        className="icon" 
                    />
                </div>
            </div>
            <div className="task-progress">
                <div className="progress">
                    <div className="bar"></div>
                </div>
            </div>
            <div>
                <div className="card-suggestion">
                    <FontAwesomeIcon 
                        icon={faAngleDown} 
                        size="lg" 
                        color="grey" 
                        className="icon" 
                    />
                    <p>{lackText}</p>
                </div>
                {suggestionText ? 
                    <div className="card-suggestion">
                        <FontAwesomeIcon 
                            icon={faAngleDoubleUp} 
                            size="lg" 
                            color="grey" 
                            className="icon" 
                        />
                        <p>{suggestionText}</p>
                    </div>
                :
                    null
                }

            </div>
        </div>
    )
};

export default App;