export interface Class {
  name: string;
  level: number;
  image?: string;
  expansion?: Expansion;
  hitDie?: HitDie;
  primaryAbility?: Ability[];
  saves?: Ability[];
  proficiencies?: {
    armor?: ArmorTypes[];
    weapons?: WeaponTypes[];
    tools?: ToolTypes[];
    savingThrows?: Ability[];
    skills?: {
      amount: number;
      options: SkillTypes;
    };
  };
  features?: {
    name: string;
    description: string;
    level: number;
  }[];
}

export enum ArmorTypes {
  "light",
  "medium",
  "heavy",
  "shields",
}

export enum WeaponTypes {
  "simple",
  "martial",
  "ranged",
  "melee",
  "daggers",
  "darts",
  "slings",
  "quarterstaffs",
  "light crossbows",
  "shortswords",
  "hand crossbows",
  "longswords",
  "rapiers",
  "scimitars",
  "shortbows",
  "longbows",
  "sickles",
  "spears",
  "maces",
  "flails",
}

export enum ToolTypes {
  "artisan's tools",
  "gaming sets",
  "musical instruments",
  "other",
}

export enum SkillTypes {
  "acrobatics",
  "animal handling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleight of hand",
  "stealth",
  "survival",
}

export enum HitDie {
  "d6",
  "d8",
  "d10",
  "d12",
}

export enum Ability {
  "strength",
  "constitution",
  "dexterity",
  "charisma",
  "wisdom",
  "intelligence",
}

export type AbilityType =
  | "strength"
  | "constitution"
  | "dexterity"
  | "charisma"
  | "wisdom"
  | "intelligence";

export enum Expansion {
  "Player's Handbook / Basic Rules",
  "Mythic Odysseys of Theors",
  "Strixhaven: A Curriculum of Chaos",
  "Mordenkainen Presents: Monsters of Multiverse",
  "Volo's Guide to Monsters",
  "Sword Coast Adventurer's Guide",
  "The Tortle Package",
  "Ebberon: Rising from the Last War",
  "Spelljammer: Adventures in Space",
  "Mordenkainen's Tome of Foes",
  "Guildmasters' Guide to Ravnica",
  "Aquisitions Incorporated",
  "Locathah Rising",
  "Dragonlance: Shadow of the Dragon Queen",
  "One Grung Above",
  "Elemental Evil Player's Companion",
  "Tasha's Cauldron of Everything",
  "Critical Role",
}
