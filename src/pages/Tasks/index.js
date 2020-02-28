import React, { useState } from "react";
import "./styles.css";
import NavBar from "../../components/NavBar";
import CheckBox from "./components/ChackBox";

function App({ history }) {
    const dayOfTheWeek = (new Date()).getDay();
    const [listTasks, setListTasks] = useState(
        [
            {
                "name": "tarefa 01",
                "description": "descrição 01",
                "done": false
            },
            {
                "name": "tarefa 02",
                "description": "descrição 02",
                "done": true
            }
        ]
      );
      
      function handleCheckChieldElement(event) {
        const changedTasks = listTasks.map(task => {
          console.log("handleCheckChieldElement | task: ", task);
          console.log("handleCheckChieldElement | task.done: ", task.done);
          console.log("handleCheckChieldElement | event.target.value: ", event.target.value);
          console.log("handleCheckChieldElement | event.target.checked: ", event.target.checked);
           if (task.name === event.target.value) {
            task.done = event.target.checked
           }
           return task;
        })
        setListTasks(changedTasks);
      }
      
    return (
        <div className="Container">
            <NavBar navigation={history}/>
            <div className="task">
                <div className="task-list">
                    <ul>
                        {
                            listTasks.map((task, key)=> {
                                return (
                                    <CheckBox 
                                        handleCheckChieldElement={handleCheckChieldElement}  
                                        task={task}
                                        key={key} 
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