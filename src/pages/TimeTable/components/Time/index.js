import React from "react";
import "./styles.css";
import { minToTimeFormat } from '../../../../utils/timeFormat';
import moment from 'moment';

function Time({ history, time, key }) {
    return (
        <div className="time" key={key} onClick={() => history.push(`/time-detail/${time._id}`)}>
        <p className="time__minutes">
          {minToTimeFormat(time.minutes)}
        </p> 
        <p className="time__date">
          {moment(time.createAt).format('L')}
        </p>
        <p className="time__abiliity">
          {time.abiliity.name}
        </p>
      </div>
    )
};

export default Time;