import React from "react";

import ButtonContained from "../../../../components/ButtonContained";
import ButtonOutlined from "../../../../components/ButtonOutlined";

import "./styles.css";

import clockHourMinute from "../../../../utils/customs/clockHourMinute";

import { type ISkill } from "../../../../types/Skill";

interface SkillItemProp {
  skillProps: ISkill;
  onUpdate: () => void;
  onStatistic: () => void;
}

const SkillItem = ({
  skillProps,
  onUpdate,
  onStatistic,
}: SkillItemProp): JSX.Element => {
  return (
    <div className="container--skill" key={skillProps.id}>
      <p className="text--skill-headline">{skillProps.name}</p>
      <p className="text--skill-subhead">
        {`Tempo Diário: ${clockHourMinute(skillProps.daily)}`}
      </p>
      <ButtonContained
        text="Editar"
        onAction={() => {
          onUpdate();
        }}
      />
      <ButtonOutlined
        text="Estatística"
        onAction={() => {
          onStatistic();
        }}
      />
    </div>
  );
};

export default SkillItem;
