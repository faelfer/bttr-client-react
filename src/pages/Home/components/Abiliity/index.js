import React from "react";
import "./styles.css";
import { minToTimeFormat } from '../../../../utils/timeFormat';

export default function Abiliity({ history, abiliity, key }) {
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
            <button className="form__button" onClick={() => history.push(`/abiliity-detail/${abiliity._id}`)}>
                Editar
            </button>  
            <button className="form__button" onClick={() => history.push(`/time-table-by-abiliity/${abiliity._id}`)}>
                Histórico
            </button>  
        </div>
    )
};