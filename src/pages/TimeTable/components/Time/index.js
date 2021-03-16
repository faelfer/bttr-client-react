import React from "react";
import "./styles.css";
import { minToTimeFormat } from '../../../../utils/timeFormat';
import moment from 'moment';

function Time({ history, time, key }) {
    return (
        <div className="time" key={key} onClick={() => alert('Time!')}>
        <p className="time__minutes">
          {minToTimeFormat(time.minutes)}
        </p> 
        <p className="time__date">
          {moment(time.createAt).format('L')}
        </p>
        <p className="time__abiliity">
          {time.abiliityName}
        </p>
      </div>
    )
};

export default Time;