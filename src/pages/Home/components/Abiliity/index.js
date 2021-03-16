import React from "react";
import "./styles.css";
import { minToTimeFormat } from '../../../../utils/timeFormat';

function Abiliity({ history, abiliity, key }) {
    return (
        <div className="abiliity" key={key}>
            <p className="abiliity__name">
                {abiliity.name}
            </p> 
            <p className="abiliity__description">
                Tempo Diário: {minToTimeFormat(abiliity.timeDaily)}
            </p>
            <p className="abiliity__description">
                Tempo Total: {minToTimeFormat(abiliity.timeTotal)}
            </p>
            <button className="form__button" onClick={() => history.push(`/abiliity/${abiliity._id}`)}>
                Editar
            </button>  
            <button className="form__button" onClick={() => alert('Histórico!')}>
                Histórico
            </button>  
        </div>
    )
};

export default Abiliity;