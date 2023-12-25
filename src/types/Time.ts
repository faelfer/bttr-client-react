import { type ISkill } from "./Skill";

export interface ITime {
  id: number;
  minutes: number;
  created: string;
  skill: ISkill;
}
