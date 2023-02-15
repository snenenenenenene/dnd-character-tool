export interface Class {
  name?: string;
  expansion?: Expansion;
  hitDie?: HitDie;
  primaryAbility?: Ability[];
  saves?: Ability[];
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
