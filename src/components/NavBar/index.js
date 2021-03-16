import React from "react";
import { NavLink } from 'react-router-dom';
import "./styles.css";
import { logout } from "../../services/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App({ navigation }) {
    function exit(event) {
		event.preventDefault();
		console.log("exit");
        logout();
        navigation.push("/");
    }
    return (
        <div className="navbar">
            <div className="navbar__container">
                <div className="navbar__name">
                    <p>Bttr</p>
                </div>
                <div className="navbar__actions">
                    <FontAwesomeIcon 
                        icon="square"
                        size="3x"
                        color="black" 
                    />                
                    <p className="navbar__action--margin">Início</p>
                    <p className="navbar__action--margin">Histórico</p>
                    <p className="navbar__action--margin active">Configurações</p>
                </div>
            </div>
        </div>
    )
};

export default App;