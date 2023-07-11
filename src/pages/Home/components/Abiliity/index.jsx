import React from 'react';

import ButtonContained from '../../../../components/ButtonContained';

import './styles.css';

import { minToTimeFormat } from '../../../../utils/timeFormat';

export default function Abiliity({ abiliityParam, onEdit, onHistoric }) {
  return (
    <div className="abiliity" key={abiliityParam.id}>
      <p className="abiliity__name">
        {abiliityParam.name}
      </p>
      <p className="abiliity__description">
        {`Tempo Diário: ${minToTimeFormat(abiliityParam.time_daily)}`}
      </p>
      <ButtonContained
        text="Editar"
        onAction={() => onEdit()}
      />
      <ButtonContained
        text="Histórico"
        onAction={() => onHistoric()}
      />
    </div>
  );
}
