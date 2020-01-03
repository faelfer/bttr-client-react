import React, { useState, useEffect } from "react";
import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCode, 
    faUniversity,
    faPencilRuler,
    faBookOpen,
    faAngleUp,
    faAngleDown, 
    faAngleDoubleUp,
    faTrophy,
    faCheck 
} from '@fortawesome/free-solid-svg-icons';
// import { faUser, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import workingDays from "../../../../utils/workingDays";
import convertToHours from "../../../../utils/convertTime";

function App({ item }) {
    const [percentage, setPercentage] = useState("");
    const [lackText, setLackText] = useState("");
    const [suggestionText, setSuggestionText] = useState("");
    const [situation, setSituation] = useState("");

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
                console.log("renderItem | lackText: ", lackText);

            setPercentage(percentage); 
            setLackText(lackText);
            setSituation(lackText);
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
            setSituation(lackText);
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
            setSituation(' Ideal goal exceeded');
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
            setSituation(' Missing for the ideal');
            console.log("================================================================");
        }
    }

    function renderIcon(icon) {
            switch (icon) {
            case "fas fa-code":
                return    <FontAwesomeIcon 
                                icon={faCode}
                                size="lg" 
                                color="grey" 
                                className="icon" 
                            />
            case "fas fa-university":
                return  <FontAwesomeIcon 
                                icon={faUniversity}
                                size="lg" 
                                color="grey" 
                                className="icon" 
                        />
            case "fas fa-pencil-ruler":
                return  <FontAwesomeIcon 
                                icon={faPencilRuler}
                                size="lg" 
                                color="grey" 
                                className="icon" 
                        />
            case "fas fa-book-open":
                return  <FontAwesomeIcon 
                                icon={faBookOpen}
                                size="lg" 
                                color="grey" 
                                className="icon" 
                        />
            default:
                return null;
            }

    }

// Missing for the ideal = faAngleDown
// Ideal goal achieved = faCheck
// Ideal goal exceeded = faAngleUp
// Success, goal completed! = faCheck
    function renderIconSituation(situation) {
        switch (situation) {
        case " Missing for the ideal":
            return    <FontAwesomeIcon 
                            icon={faAngleDown}
                            size="lg" 
                            color="grey" 
                            className="icon" 
                        />
        case " Ideal goal exceeded":
            return  <FontAwesomeIcon 
                            icon={faAngleUp}
                            size="lg" 
                            color="grey" 
                            className="icon" 
                    />
        case "Success, goal completed!":
            return  <FontAwesomeIcon 
                            icon={faTrophy}
                            size="lg" 
                            color="grey" 
                            className="icon" 
                    />
        case "Ideal goal achieved":
            return  <FontAwesomeIcon 
                            icon={faCheck}
                            size="lg" 
                            color="grey" 
                            className="icon" 
                    />
        default:
            return null;
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
                    {renderIcon(item.icon)}
                </div>
            </div>
            <div className="task-progress">
                <div className="progress">
                    <div style={{width: (parseInt(percentage) > 100 ?  '100%' : percentage), height: 15, backgroundColor: '#00A9A5', borderRadius: 50}} />
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