import React from 'react';
import "./styles.css";

function CheckBox({ handleCheckChieldElement, task }) {
  return (
    <li>
      <input 
        key={task.id} 
        onClick={handleCheckChieldElement} 
        type="checkbox" 
        checked={task.done} 
        value={task.name} 
      /> 
        {task.name}
   </li>
  )
};

export default CheckBox;