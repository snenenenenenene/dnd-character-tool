import { Ability, Class, Expansion, HitDie } from "./types";

export const classes: Class[] = [
  {
    name: "Barbarian",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/342/420/618/636272680339895080.png",
    hitDie: HitDie.d12,
    primaryAbility: [Ability.strength],
    saves: [Ability.strength, Ability.constitution],
  },
  {
    name: "Bard",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/369/420/618/636272705936709430.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.charisma],
    saves: [Ability.dexterity, Ability.charisma],
  },
  {
    name: "Cleric",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/371/420/618/636272706155064423.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.wisdom],
    saves: [Ability.wisdom, Ability.charisma],
  },
  {
    name: "Druid",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/346/420/618/636272691461725405.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.wisdom],
    saves: [Ability.intelligence, Ability.wisdom],
  },
  {
    name: "Fighter",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/359/420/618/636272697874197438.png",
    hitDie: HitDie.d10,
    primaryAbility: [Ability.strength, Ability.dexterity],
    saves: [Ability.strength, Ability.constitution],
  },
  {
    name: "Monk",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/489/420/618/636274646181411106.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.dexterity, Ability.wisdom],
    saves: [Ability.strength, Ability.dexterity],
  },
  {
    name: "Paladin",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/365/420/618/636272701937419552.png",
    hitDie: HitDie.d10,
    primaryAbility: [Ability.strength, Ability.charisma],
    saves: [Ability.wisdom, Ability.charisma],
  },
  {
    name: "Ranger",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/367/420/618/636272702826438096.png",
    hitDie: HitDie.d10,
    primaryAbility: [Ability.dexterity, Ability.wisdom],
    saves: [Ability.strength, Ability.dexterity],
  },
  {
    name: "Rogue",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/384/420/618/636272820319276620.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.dexterity],
    saves: [Ability.dexterity, Ability.intelligence],
  },
  {
    name: "Sorcerer",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/485/420/618/636274643818663058.png",
    hitDie: HitDie.d6,
    primaryAbility: [Ability.charisma],
    saves: [Ability.constitution, Ability.charisma],
  },
  {
    name: "Warlock",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/375/420/618/636272708661726603.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.charisma],
    saves: [Ability.wisdom, Ability.charisma],
  },
  {
    name: "Wizard",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/357/420/618/636272696881281556.png",
    hitDie: HitDie.d6,
    primaryAbility: [Ability.intelligence],
    saves: [Ability.intelligence, Ability.wisdom],
  },
  {
    name: "Artificer",
    expansion: Expansion["Tasha's Cauldron of Everything"],
    hitDie: HitDie.d8,
    primaryAbility: [Ability.intelligence],
    saves: [Ability.constitution, Ability.intelligence],
  },
  {
    name: "Blood Hunter",
    expansion: Expansion["Critical Role"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/8551/968/420/618/637158853099606981.png",
    // TODO: blood hunters should be able to pick between strength or dexterity & intelligence or wisdom
    primaryAbility: [Ability.strength, Ability.intelligence],
    saves: [Ability.dexterity, Ability.intelligence],
  },
];
