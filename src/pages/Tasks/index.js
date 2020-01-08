import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import CheckBox from "./components/ChackBox";

function App({ history }) {
    const dayOfTheWeek = (new Date()).getDay();
    const [listTasks, setListTasks] = useState([
        {
            "id": 1, 
            "name":"Domingo",
            "tasks": [
                {
                    "name": "limpar o rosto",
                    "description": "usar água micelar",
                    "done": false
                }
            ]
        },
        {
            "id": 2,
            "name":"Segunda",
            "tasks": [
                {
                    "name": "Lavar cabelo",
                    "description": "",
                    "done": false
                }
            ]
        },
        {
            "id": 3,
            "name":"Terça",
            "tasks": [
                {
                    "name": "limpar o rosto",
                    "description": "usar água micelar",
                    "done": false
                }
            ]
        },
        {
            "id": 4,
            "name":"Quarta",
            "tasks": [
                {
                    "name": "lavar cabelo",
                    "description": "",
                    "done": false
                },
                {
                    "name": "vestibular",
                    "description": "usar água micelar",
                    "done": true
                }
            ]
        },
        {
            "id": 5,
            "name":"Quinta",
            "tasks": [
                {
                    "name": "limpar o rosto",
                    "description": "usar água micelar",
                    "done": false
                }
            ]
        },
        {

            "name":"Sexta",
            "tasks": [
                {
                    "name": "lavar cabelo",
                    "description": "",
                    "done": false
                }
            ]
        },
        {
            "name":"Sábado",
            "tasks": [
                {
                    "name": "limpar o rosto",
                    "description": "usar água micelar",
                    "done": false
                }
            ]
        },
      ]);

      function replaceTask(tasksOfTheDay) {
        let tasks = listTasks;
        console.log("========================================");
        console.log("replaceTask | tasks: ", tasks);
        tasks.forEach(task => {
          console.log("replaceTask | task: ", task);
          console.log("replaceTask | task.name: ", task.name);
          console.log("replaceTask | tasksOfTheDay.name: ", tasksOfTheDay);
           if (task.name === tasksOfTheDay.name)
              task = tasksOfTheDay
        })
        setListTasks(tasks);

      }
      
      function handleCheckChieldElement(event) {
        let tasks = listTasks[dayOfTheWeek];
        console.log("handleCheckChieldElement | tasks: ", tasks);
        (tasks.tasks).forEach(task => {
          console.log("handleCheckChieldElement | task: ", task);
          console.log("handleCheckChieldElement | task.name: ", task.name);
          console.log("handleCheckChieldElement | event.target.name: ", event.target.name);
          console.log("handleCheckChieldElement | event.target.checked: ", event.target.checked);
           if (task.name === event.target.name){
            task.done = event.target.checked
           }

        })
        replaceTask(tasks);
      }
      
    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="task">
                <div className="task-list">
                    <ul>
                        {
                            (listTasks[dayOfTheWeek].tasks).map(task => {
                                return (
                                    <CheckBox 
                                        handleCheckChieldElement={handleCheckChieldElement}  
                                        task={task} 
                                    />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default App;