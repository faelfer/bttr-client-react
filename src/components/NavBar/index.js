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
                    <NavLink to={'/app'}>
                        Início
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to={'/tasks'}>
                        Tarefas
                    </NavLink>
                </li> */}
                <li className="right" onClick={(event) => exit(event)}>
                    <a>Sair</a>
                </li>
            </ul>
        </div>
    )
};

export default App;