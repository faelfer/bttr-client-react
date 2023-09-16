import React from "react";
import { useNavigate } from "react-router-dom";

import MessageContainer from "../../../../components/MessageContainer";
import SkillItem from "../SkillItem";

export default function SkillItems({ messageNoItem, countItems, itemsSkill }) {
  const navigate = useNavigate();
  return countItems === 0 || countItems === undefined ? (
    <MessageContainer type="error" message={messageNoItem} />
  ) : (
    itemsSkill.map((skillLoop) => (
      <SkillItem
        skillProps={skillLoop}
        onUpdate={() =>
          navigate(`/skills/${skillLoop.id}/update`, { replace: true })
        }
        onStatistic={() =>
          navigate(`/skills/${skillLoop.id}/statistic`, { replace: true })
        }
      />
    ))
  );
}
