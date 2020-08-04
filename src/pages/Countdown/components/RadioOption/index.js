import React from "react";
import "./styles.css";

function RadioOption({ skill, skillSelectedId, onSkillSelected }) {
  
    return (
        <div className="radio-option" onClick={() => onSkillSelected(skill._id, skill.goalPerDay)}>
            <div className="radio-input">
                <input 
                    type="radio" 
                    id={skill._id} 
                    name="skill" 
                    value={skill._id} 
                    checked={skill._id === skillSelectedId ? true : false}
                />
            </div>
            <div className="radio-name">
                <label for={skill._id}>{skill.name}</label>
            </div>
        </div>
    )
};

export default RadioOption;