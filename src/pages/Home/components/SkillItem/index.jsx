import React from 'react';

import ButtonContained from '../../../../components/ButtonContained';
import ButtonOutlined from '../../../../components/ButtonOutlined';

import './styles.css';

import { minToTimeFormat } from '../../../../utils/timeFormat';

export default function SkillItem({
  skillProps,
  onUpdate,
  onStatistic,
}) {
  return (
    <div className="container--skill" key={skillProps.id}>
      <p className="text--skill-headline">
        {skillProps.name}
      </p>
      <p className="text--skill-subhead">
        {`Tempo Diário: ${minToTimeFormat(skillProps.time_daily)}`}
      </p>
      <ButtonContained
        text="Editar"
        onAction={() => onUpdate()}
      />
      <ButtonOutlined
        text="Estatística"
        onAction={() => onStatistic()}
      />
    </div>
  );
}
