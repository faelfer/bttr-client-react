import React from "react";
import "./styles.css";

function Abiliity({ abiliity, key }) {
    return (
        <div className="abiliity" key={key}>
            <p className="abiliity__name">
                {abiliity.name}
            </p> 
            <p className="abiliity__description">
                Tempo Diário: {abiliity.timeDaily}
            </p>
            <p className="abiliity__description">
                Tempo Total: {abiliity.timeTotal}
            </p>
            <button className="form__button" onClick={() => alert('Editar!')}>
                Editar
            </button>  
            <button className="form__button" onClick={() => alert('Histórico!')}>
                Histórico
            </button>  
        </div>
    )
};

export default Abiliity;