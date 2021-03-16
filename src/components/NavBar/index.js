import React from "react";
import { NavLink } from 'react-router-dom';
import "./styles.css";

function App({ navigation }) {
    return (
        <div className="navbar">
            <div className="navbar__container">
                <div className="navbar__name">
                    <p>Bttr</p>
                </div>
                <div className="navbar__actions">
                    <NavLink className="navbar__link" to={'/home'}>         
                        <p className="navbar__action--margin">Início</p>
                    </NavLink>
                    <NavLink className="navbar__link" to={'/time-table'}>  
                        <p className="navbar__action--margin">Tempo</p>
                    </NavLink>
                    <p className="navbar__action--margin">Configurações</p>
                </div>
            </div>
        </div>
    )
};

export default App;