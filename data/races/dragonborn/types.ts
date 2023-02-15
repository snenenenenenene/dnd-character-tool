export interface DraconicAncestry {
  colour?:
    | "black"
    | "blue"
    | "brass"
    | "bronze"
    | "copper"
    | "gold"
    | "green"
    | "red"
    | "silver"
    | "white";
  damageType?: "acid" | "lightning" | "fire" | "poison" | "cold";
  breathWeapon?: BreathWeaponLine | BreathWeaponCone;
}

export interface BreathWeapon {
  saveType: "dexterity" | "constitution";
  description: string;
}

export interface BreathWeaponLine extends BreathWeapon {
  type: "line";
  length: number;
  width: number;
}

export interface BreathWeaponCone extends BreathWeapon {
  type: "cone";
  length: number;
}
