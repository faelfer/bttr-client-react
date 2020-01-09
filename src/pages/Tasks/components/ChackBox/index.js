import React from 'react';
import "./styles.css";

function CheckBox({ handleCheckChieldElement, task, key }) {
  return (
    <li>
      <label class="container">{task.name}
      <input 
        key={key} 
        onClick={handleCheckChieldElement} 
        type="checkbox" 
        checked={task.done} 
        value={task.name} 
      />
        <span class="checkmark"></span>
      </label>
   </li>
  )
};

export default CheckBox;