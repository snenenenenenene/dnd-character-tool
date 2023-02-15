import { DraconicAncestry } from "./dragonborn/types";

export interface Race {
  name: string;
  picture?: string;
  expansion?: string;
  traits?: Traits & { draconicAncestry?: Array<DraconicAncestry> };
  variants?: Array<Variant>;
}

export interface Variant {
  name: string;
  description?: string;
  traits?: Traits;
}

export interface Traits {
  abilityScoreIncrease?: AbilityScoreIncrease;
  age?: Age;
  size?: Size;
  speed?: Speed;
}

export interface Age {
  description?: string;
}

export interface Size {
  description?: string;
  size?: "small" | "medium" | "large" | "giant";
}

export interface Speed {
  description?: string;
  baseWalkingSpeed?: number;
}

export interface AbilityScoreIncrease {
  strength?: number;
  constitution?: number;
  dexterity?: number;
  charisma?: number;
  wisdom?: number;
  intelligence?: number;
}
