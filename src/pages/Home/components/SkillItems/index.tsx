import React from "react";
import { useNavigate } from "react-router-dom";

import SkillItem from "../SkillItem";

interface ISkill {
  id: number;
  name: string;
  daily: number;
}

interface SkillItemsProp {
  itemsSkill: ISkill[];
}

const SkillItems = ({ itemsSkill }: SkillItemsProp): JSX.Element[] => {
  const navigate = useNavigate();
  return itemsSkill.map((skillLoop) => (
    <SkillItem
      key={skillLoop.id}
      skillProps={skillLoop}
      onUpdate={() => {
        navigate(`/skills/${skillLoop.id}/update`, { replace: true });
      }}
      onStatistic={() => {
        navigate(`/skills/${skillLoop.id}/statistic`, { replace: true });
      }}
    />
  ));
};

export default SkillItems;
