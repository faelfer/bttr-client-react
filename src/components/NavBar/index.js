import React from "react";
import { NavLink } from 'react-router-dom';
import "./styles.css";
import { logout } from "../../services/auth";

function App({ navigation }) {
    function exit(event) {
		event.preventDefault();
		console.log("exit");
        logout();
        navigation.push("/");
    }
    return (
        <div>
            <ul className="topnav">
                <li>
                    <NavLink to={'/progress'}>
                        Início
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/countdown'}>
                        Contagem Regressiva
                    </NavLink>
                </li>
                <li className="right" onClick={(event) => exit(event)}>
                    <a href="#" >Sair</a>
                </li>
            </ul>
        </div>
    )
};

export default App;