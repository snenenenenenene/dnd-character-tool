import {
  Ability,
  ArmorTypes,
  Class,
  Expansion,
  HitDie,
  SkillTypes,
  WeaponTypes,
} from "./types";

export const classes: Class[] = [
  {
    name: "Barbarian",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/342/420/618/636272680339895080.png",
    hitDie: HitDie.d12,
    primaryAbility: [Ability.strength],
    saves: [Ability.strength, Ability.constitution],
    level: 0,
    proficiencies: {
      armor: [ArmorTypes.light, ArmorTypes.medium, ArmorTypes.shields],
      weapons: [WeaponTypes.simple, WeaponTypes.martial],
      savingThrows: [Ability.strength, Ability.constitution],
      tools: [],
      skills: {
        amount: 2,
        options: [
          // "animal handling",
          // "athletics",
          // "intimidation",
          // "nature",
          // "perception",
          // "survival",
          SkillTypes["animal handling"],
          SkillTypes.athletics,
          SkillTypes.intimidation,
          SkillTypes.nature,
          SkillTypes.perception,
          SkillTypes.survival,
        ],
      },
    },
    features: [
      {
        name: "Rage",
        description:
          "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.",
        level: 1,
      },
      {
        name: "Unarmored Defense",
        description:
          "While you are not wearing armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.",
        level: 1,
      },
      {
        name: "Danger Sense",
        description:
          "At 2nd level, you gain an uncanny sense of when things nearby aren't as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can't be blinded, deafened, or incapacitated.",
        level: 2,
      },
      {
        name: "Reckless Attack",
        description:
          "Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.",
        level: 2,
      },
      {
        name: "Primal Path",
        description: "The path you choose shapes the nature of your rage.",
        level: 3,
      },
      {
        name: "Extra Attack",
        description:
          "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.",
        level: 5,
      },
      {
        name: "Fast Movement",
        description:
          "Starting at 5th level, your speed increases by 10 feet while you aren't wearing heavy armor.",
        level: 5,
      },
      {
        name: "Feral Instinct",
        description:
          "At 7th level, your instincts are so honed that you have advantage on initiative rolls.",
        level: 7,
      },
      {
        name: "Brutal Critical",
        description:
          "Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee weapon.",
        level: 9,
      },
      {
        name: "Relentless Rage",
        description:
          "Starting at 11th level, if your rage is reduced to 0 while you still have excess hit points, you can use a bonus action to regain 1 hit point per barbarian level you have. Once you use this feature, you must finish a short or long rest before you can use it again.",
        level: 11,
      },
      {
        name: "Persistent Rage",
        description:
          "Beginning at 15th level, your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it.",
        level: 15,
      },
      {
        name: "Indomitable Might",
        description:
          "Beginning at 18th level, if your total for a Strength check is less than your Strength score, you can use that score in place of the total.",
        level: 18,
      },
      {
        name: "Primal Champion",
        description:
          "At 20th level, you embody the power of the wilds. Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.",
        level: 20,
      },
    ],
  },
  {
    name: "Bard",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/369/420/618/636272705936709430.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.charisma],
    saves: [Ability.dexterity, Ability.charisma],
    level: 0,
  },
  {
    name: "Cleric",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/371/420/618/636272706155064423.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.wisdom],
    saves: [Ability.wisdom, Ability.charisma],
    level: 0,
  },
  {
    name: "Druid",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/346/420/618/636272691461725405.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.wisdom],
    saves: [Ability.intelligence, Ability.wisdom],
    level: 0,
  },
  {
    name: "Fighter",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/359/420/618/636272697874197438.png",
    hitDie: HitDie.d10,
    primaryAbility: [Ability.strength, Ability.dexterity],
    saves: [Ability.strength, Ability.constitution],
    level: 0,
  },
  {
    name: "Monk",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/489/420/618/636274646181411106.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.dexterity, Ability.wisdom],
    saves: [Ability.strength, Ability.dexterity],
    level: 0,
    proficiencies: {
      armor: [],
      weapons: [WeaponTypes.simple, WeaponTypes.shortswords],
      // TODO: Tools: Choose one type of artisan's tools or one musical instrument
      tools: [],
      skills: {
        amount: 2,
        options: [
          // "acrobatics",
          // "athletics",
          // "history",
          // "insight",
          // "religion",
          // "stealth",
          SkillTypes["acrobatics"],
          SkillTypes["athletics"],
          SkillTypes["history"],
          SkillTypes["insight"],
          SkillTypes["religion"],
          SkillTypes["stealth"],
        ],
      },
    },
    features: [
      {
        name: "Unarmored Defense",
        description:
          "Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.",
        level: 1,
      },
      {
        name: "Martial Arts",
        description:
          "At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don't have the two-handed or heavy property.",
        level: 1,
      },
      {
        name: "Ki",
        description:
          "Starting at 2nd level, your training allows you to harness the mystic energy of ki. Your access to this energy is represented by a number of ki points. Your monk level determines the number of points you have, as shown in the Ki Points column of the Monk table.",
        level: 2,
      },
      {
        name: "Unarmored Movement",
        description:
          "Starting at 2nd level, your speed increases by 10 feet while you are not wearing armor or wielding a shield.",
        level: 2,
      },
      {
        name: "Monastic Tradition",
        description:
          "When you reach 3rd level, you commit yourself to a monastic tradition. Your tradition grants you features at 3rd level and again at 6th, 11th, and 17th level.",
        level: 3,
      },
      {
        name: "Deflect Missiles",
        description:
          "Starting at 3rd level, you can use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack. When you do so, the damage you take from the attack is reduced by 1d10 + your Dexterity modifier + your monk level.",
        level: 3,
      },
      {
        name: "Slow Fall",
        description:
          "Beginning at 4th level, you can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.",
        level: 4,
      },
      {
        name: "Extra Attack",
        description:
          "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.",
        level: 5,
      },
      {
        name: "Stunning Strike",
        description:
          "Starting at 5th level, you can interfere with the flow of ki in an opponent's body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn.",
        level: 5,
      },
      {
        name: "Ki-Empowered Strikes",
        description:
          "Starting at 6th level, your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.",
        level: 6,
      },
      {
        name: "Evasion",
        description:
          "Beginning at 7th level, you can nimbly dodge out of the way of certain area effects, such as a red dragon's fiery breath or an ice storm spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.",
        level: 7,
      },
      {
        name: "Stillness of Mind",
        description:
          "Starting at 7th level, you can use your action to end one effect on yourself that is causing you to be charmed or frightened.",
        level: 7,
      },
      {
        name: "Purity of Body",
        description:
          "Beginning at 10th level, your mastery of the ki flowing through you makes you immune to disease and poison.",
        level: 10,
      },
      {
        name: "Tongue of the Sun and Moon",
        description:
          "Starting at 13th level, you learn to touch the ki of other minds so that you understand all spoken languages. Moreover, any creature that can understand a language can understand what you say.",
        level: 13,
      },
      {
        name: "Diamond Soul",
        description:
          "Starting at 14th level, your mastery of ki grants you proficiency in all saving throws.",
        level: 14,
      },
      {
        name: "Timeless Body",
        description:
          "Beginning at 18th level, you no longer need food, drink, or sleep.",
        level: 18,
      },
      {
        name: "Empty Body",
        description:
          "Starting at 20th level, you can use your action to spend 4 ki points to become invisible for 1 minute. During that time, you also have resistance to all damage but force damage.",
        level: 20,
      },
      {
        name: "Perfect Self",
        description:
          "At 20th level, when you roll for initiative and have no ki points remaining, you regain 4 ki points.",
        level: 20,
      },
    ],
  },
  {
    name: "Paladin",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/365/420/618/636272701937419552.png",
    hitDie: HitDie.d10,
    primaryAbility: [Ability.strength, Ability.charisma],
    saves: [Ability.wisdom, Ability.charisma],
    level: 0,
    proficiencies: {
      armor: [
        ArmorTypes.heavy,
        ArmorTypes.medium,
        ArmorTypes.light,
        ArmorTypes.shields,
      ],
      weapons: [WeaponTypes.simple, WeaponTypes.martial],
      tools: [],
      skills: {
        amount: 2,
        options: [
          // "athletics",
          // "insight",
          // "intimidation",
          // "medicine",
          // "persuasion",
          // "religion",
          SkillTypes.athletics,
          SkillTypes.insight,
          SkillTypes.intimidation,
          SkillTypes.medicine,
          SkillTypes.persuasion,
          SkillTypes.religion,
        ],
      },
    },
    features: [
      {
        name: "Divine Sense",
        description:
          "The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity (the vampire Count Strahd von Zarovich, for instance). Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the hallow spell.",
        level: 1,
      },
      {
        name: "Lay on Hands",
        description:
          "Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5. As an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.",
        level: 1,
      },
      {
        name: "Fighting Style",
        description:
          "Starting at 2nd level, you adopt a particular style of fighting as your specialty. Choose one of the following options. You can't take a Fighting Style option more than once, even if you later get to choose again.",
        level: 2,
      },
      {
        name: "Spellcasting",
        description:
          "By 2nd level, you have learned to draw on divine magic through meditation and prayer to cast spells as a cleric does.",
        level: 2,
      },
      {
        name: "Divine Smite",
        description:
          "Starting at 2nd level, when you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8 for a 5th-level spell slot. The damage increases by 1d8 if the target is an undead or a fiend.",
        level: 2,
      },
      {
        name: "Divine Health",
        description:
          "By 3rd level, the divine magic flowing through you makes you immune to disease.",
        level: 3,
      },
      {
        name: "Sacred Oath",
        description:
          "At 3rd level, you swear the oath that binds you as a paladin. Choose an oath from among those presented here. Your choice grants you features at 3rd level and again at 7th, 15th, and 20th level.",
        level: 3,
      },
      {
        name: "Aura of Protection",
        description:
          "Starting at 6th level, whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Charisma modifier (with a minimum bonus of +1). You must be conscious to grant this bonus.",
        level: 6,
      },
      {
        name: "Aura of Courage",
        description:
          "Starting at 10th level, you and friendly creatures within 10 feet of you can't be frightened while you're conscious.",
        level: 10,
      },
      {
        name: "Improved Divine Smite",
        description:
          "Beginning at 11th level, when you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8 for a 5th-level spell slot. The damage increases by 1d8 if the target is an undead or a fiend.",
        level: 11,
      },
      {
        name: "Cleansing Touch",
        description:
          "Beginning at 14th level, you can use your action to end one spell on yourself or on one willing creature that you touch.",
        level: 14,
      },
    ],
  },
  {
    name: "Ranger",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/367/420/618/636272702826438096.png",
    hitDie: HitDie.d10,
    primaryAbility: [Ability.dexterity, Ability.wisdom],
    saves: [Ability.strength, Ability.dexterity],
    level: 0,
    proficiencies: {
      armor: [ArmorTypes.light, ArmorTypes.medium, ArmorTypes.shields],
      weapons: [WeaponTypes.simple, WeaponTypes.martial],
      tools: [],
      skills: {
        amount: 3,
        options: [
          // "animal handling","athletics","insight","investigation","nature","perception","stealth","survival"
          SkillTypes["animal handling"],
          SkillTypes["athletics"],
          SkillTypes["insight"],
          SkillTypes["investigation"],
          SkillTypes["nature"],
          SkillTypes["perception"],
          SkillTypes["stealth"],
          SkillTypes["survival"],
        ],
      },
    },
    features: [
      {
        name: "Favored Enemy",
        description:
          "Beginning when you select this archetype at 3rd level, you have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.",
        level: 1,
      },
      {
        name: "Natural Explorer",
        description:
          "You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions.",
        level: 1,
      },
      {
        name: "Fighting Style",
        description:
          "At 2nd level, you adopt a particular style of fighting as your specialty. Choose one of the following options. You can't take a Fighting Style option more than once, even if you later get to choose again.",
        level: 2,
      },
      {
        name: "Spellcasting",
        description:
          "By the time you reach 2nd level, you have learned to use the magical essence of nature to cast spells, much as a druid does. Spell Slots The Ranger table shows how many spell slots you have to cast your ranger spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest. For example, if you know the 1st-level spell Animal Friendship and have a 1st-level and a 2nd-level spell slot available, you can cast Animal Friendship using either slot. Spells Known of 1st Level and Higher You know two 1st-level spells of your choice from the ranger spell list. The Spells Known column of the Ranger table shows when you learn more ranger spells of your choice. Each of these spells must be of a level for which you have spell slots. For instance, when you reach 5th level in this class, you can learn one new spell of 1st or 2nd level. Additionally, when you gain a level in this class, you can choose one of the ranger spells you know and replace it with another spell from the ranger spell list, which also must be of a level for which you have spell slots. Spellcasting Ability Wisdom is your spellcasting ability for your ranger spells, since your magic draws on your attunement to nature. You use your Wisdom whenever a spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a ranger spell you cast and when making an attack roll with one. Spell save DC = 8 + your proficiency bonus + your Wisdom modifier Spell attack modifier = your proficiency bonus + your Wisdom modifier",
        level: 2,
      },
      {
        name: "Primeval Awareness",
        description:
          "Starting at 3rd level, you can use your action and expend one ranger spell slot to focus your awareness on the region around you. For 1 minute per level of the spell slot you expend, you can sense whether the following types of creatures are present within 1 mile of you (or within up to 6 miles if you are in your favored terrain): aberrations, celestials, dragons, elementals, fey, fiends, and undead. This feature doesn't reveal the creatures' location or number.",
        level: 3,
      },
      {
        name: "Ranger Conclave",
        description:
          "At 3rd level, you choose a conclave, shaping your practice of the ranger class. Your choice grants you features at 3rd level and again at 7th, 11th, and 15th level.",
        level: 3,
      },
      {
        name: "Land's Stride",
        description:
          "Starting at 3rd level, moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard.",
        level: 3,
      },
      {
        name: "Hide in Plain Sight",
        description:
          "Starting at 5th level, you can spend 1 minute creating camouflage for yourself. You must have access to fresh mud, dirt, plants, soot, and other naturally occurring materials with which to create your camouflage. You can spend 1 minute drawing the camouflage on yourself, during which time you can't move. At the end of the minute, you gain the benefit of the Hide action and can't be tracked except by magical means. Once you use this feature, you can't use it again until you finish a short or long rest.",
        level: 5,
      },
      {
        name: "Vanish",
        description:
          "Starting at 14th level, you can use the Hide action as a bonus action on your turn. Also, you can't be tracked by nonmagical means, unless you choose to leave a trail.",
        level: 14,
      },
      {
        name: "Feral Senses",
        description:
          "At 18th level, you gain preternatural senses that help you fight creatures you can't see. When you attack a creature you can't see, your inability to see it doesn't impose disadvantage on your attack rolls against it.\nYou are also aware of the location of any invisible creature within 30 feet of you, provided that the creature isn't hidden from you and you aren't blinded or deafened.",
        level: 18,
      },
      {
        name: "Foe Slayer",
        description:
          "At 20th level, you become an unparalleled hunter of your enemies. Once on each of your turns, you can add your Wisdom modifier to the attack roll or the damage roll of an attack you make against one of your favored enemies or an enemy the GM chooses. You must choose to use this feature before the attack roll is made.",
        level: 20,
      },
    ],
  },
  {
    name: "Rogue",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/384/420/618/636272820319276620.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.dexterity],
    saves: [Ability.dexterity, Ability.intelligence],
    level: 0,
    proficiencies: {
      armor: [ArmorTypes.light],
      weapons: [
        WeaponTypes.simple,
        WeaponTypes["hand crossbows"],
        WeaponTypes.longswords,
        WeaponTypes.rapiers,
        WeaponTypes.shortswords,
      ],
      tools: [],
      savingThrows: [Ability.dexterity, Ability.intelligence],
      skills: {
        amount: 4,
        options: [
          // "acrobatics","athletics","deception","insight","intimidation","investigation","perception","performance","persuasion","sleight of hand","stealth"
          SkillTypes.acrobatics,
          SkillTypes.athletics,
          SkillTypes.deception,
          SkillTypes.insight,
          SkillTypes.intimidation,
          SkillTypes.investigation,
          SkillTypes.perception,
          SkillTypes.performance,
          SkillTypes.persuasion,
          SkillTypes["sleight of hand"],
          SkillTypes.stealth,
        ],
      },
    },
    features: [
      {
        name: "Expertise",
        description:
          "At 1st level, choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves' tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.",
        level: 1,
      },
      {
        name: "Sneak Attack",
        description:
          "Beginning at 1st level, you know how to strike subtly and exploit a foe's distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon.",
        level: 1,
      },
      {
        name: "Thieves' Cant",
        description:
          "During your rogue training you learned thieves' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation. Only another creature that knows thieves' cant understands such messages. It takes four times longer to convey such a message than it does to speak the same idea plainly.",
        level: 1,
      },
      {
        name: "Cunning Action",
        description:
          "Starting at 2nd level, your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action.",
        level: 2,
      },
      {
        name: "Roguish Archetype",
        description:
          "At 3rd level, you choose an archetype that you emulate in the exercise of your rogue abilities: Thief, Assassin, or Arcane Trickster. Your archetype choice grants you features at 3rd level and again at 9th, 13th, and 17th level.",
        level: 3,
      },
      {
        name: "Uncanny Dodge",
        description:
          "Beginning at 5th level, when an attacker that you can see hits you with an attack, you can use your reaction to halve the attack's damage against you.",
        level: 5,
      },
      {
        name: "Evasion",
        description:
          "Beginning at 7th level, you can nimbly dodge out of the way of certain area effects, such as a red dragon's fiery breath or an ice storm spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.",
        level: 7,
      },
      {
        name: "Reliable Talent",
        description:
          "By 11th level, you have refined your chosen skills until they approach perfection. Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.",
        level: 11,
      },
      {
        name: "Blindsense",
        description:
          "Starting at 14th level, if you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.",
        level: 14,
      },
      {
        name: "Slippery Mind",
        description:
          "By 15th level, you have acquired greater mental strength. You gain proficiency in Wisdom saving throws.",
        level: 15,
      },
      {
        name: "Elusive",
        description:
          "Beginning at 18th level, you are so evasive that attackers rarely gain the upper hand against you. No attack roll has advantage against you while you aren't incapacitated.",
        level: 18,
      },
      {
        name: "Stroke of Luck",
        description:
          "At 20th level, you have an uncanny knack for succeeding when you need to. If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20. Once you use this feature, you can't use it again until you finish a short or long rest.",
        level: 20,
      },
    ],
  },
  {
    name: "Sorcerer",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/485/420/618/636274643818663058.png",
    hitDie: HitDie.d6,
    primaryAbility: [Ability.charisma],
    saves: [Ability.constitution, Ability.charisma],
    level: 0,
    proficiencies: {
      armor: [],
      weapons: [
        WeaponTypes.daggers,
        WeaponTypes.darts,
        WeaponTypes.slings,
        WeaponTypes.quarterstaffs,
        WeaponTypes["light crossbows"],
      ],
      tools: [],
      savingThrows: [Ability.constitution, Ability.charisma],
      skills: {
        amount: 2,
        options: [
          SkillTypes.arcana,
          SkillTypes.deception,
          SkillTypes.insight,
          SkillTypes.intimidation,
          SkillTypes.persuasion,
          SkillTypes.religion,
        ],
      },
    },
    features: [
      {
        name: "Spellcasting",
        description:
          "An event in your past, or in the life of your family, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells.",
        level: 0,
      },
      {
        name: "Sorcerous Origin",
        description:
          "Choose a sorcerous origin, which describes the source of your innate magical power: Draconic Bloodline, Wild Magic, or Divine Soul.",
        level: 1,
      },
      {
        name: "Font of Magic",
        description:
          "At 2nd level, you tap into a deep wellspring of magic within yourself. This wellspring is represented by sorcery points, which allow you to create a variety of magical effects.",
        level: 2,
      },
      {
        name: "Metamagic",
        description:
          "At 3rd level, you gain the ability to twist your spells to suit your needs. You gain two of the following Metamagic options of your choice. You gain another one at 10th and 17th level.",
        level: 3,
      },
      {
        name: "Sorcerous Restoration",
        description:
          "At 20th level, you regain 4 expended sorcery points whenever you finish a short or long rest.",
        level: 20,
      },
    ],
  },
  {
    name: "Warlock",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/375/420/618/636272708661726603.png",
    hitDie: HitDie.d8,
    primaryAbility: [Ability.charisma],
    saves: [Ability.wisdom, Ability.charisma],
    level: 0,
    proficiencies: {
      armor: [ArmorTypes.light],
      weapons: [WeaponTypes.simple],
      tools: [],
      savingThrows: [Ability.wisdom, Ability.charisma],
      skills: {
        amount: 2,
        options: [
          SkillTypes.arcana,
          SkillTypes.deception,
          SkillTypes.history,
          SkillTypes.intimidation,
          SkillTypes.investigation,
          SkillTypes.nature,
          SkillTypes.religion,
        ],
      },
    },
    features: [
      {
        name: "Otherworldly Patron",
        description:
          "At 1st level, you have struck a bargain with an otherworldly being of your choice. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.",
        level: 1,
      },
      {
        name: "Pact Magic",
        description:
          "Your arcane research and the magic bestowed on you by your patron have given you facility with spells. See chapter 10 for the general rules of spellcasting and chapter 11 for the warlock spell list.",
        level: 1,
      },
      {
        name: "Eldritch Invocations",
        description:
          "At 2nd level, you gain the ability to twist your patron's gifts to suit your own needs. You learn two eldritch invocations of your choice. See chapter 11 for the warlock invocation list.",
        level: 2,
      },
      {
        name: "Pact Boon",
        description:
          "At 3rd level, you gain a magical boon of your choice from your patron. Your choice grants you features at 3rd level and again at 5th, 7th, 9th, 11th, and 13th level.",
        level: 3,
      },
      {
        name: "Mystic Arcanum",
        description:
          "At 11th level, your patron bestows upon you a magical secret called an arcanum. Choose one 6th-level spell from the warlock spell list as this arcanum.",
        level: 11,
      },
      {
        name: "Eldritch Master",
        description:
          "At 20th level, you can draw on your inner reserve of mystical power while entreating your patron to regain expended spell slots. You can spend 1 minute entreating your patron for aid to regain all your expended spell slots from your Pact Magic feature. Once you regain spell slots with this feature, you must finish a long rest before you can do so again.",
        level: 20,
      },
    ],
  },
  {
    name: "Wizard",
    expansion: Expansion["Player's Handbook / Basic Rules"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/6/357/420/618/636272696881281556.png",
    hitDie: HitDie.d6,
    primaryAbility: [Ability.intelligence],
    saves: [Ability.intelligence, Ability.wisdom],
    level: 0,
  },
  {
    name: "Artificer",
    expansion: Expansion["Tasha's Cauldron of Everything"],
    hitDie: HitDie.d8,
    primaryAbility: [Ability.intelligence],
    saves: [Ability.constitution, Ability.intelligence],
    level: 0,
    image: "",
  },
  {
    name: "Blood Hunter",
    expansion: Expansion["Critical Role"],
    image:
      "https://www.dndbeyond.com/avatars/thumbnails/8551/968/420/618/637158853099606981.png",
    // TODO: blood hunters should be able to pick between strength or dexterity & intelligence or wisdom
    primaryAbility: [Ability.strength, Ability.intelligence],
    saves: [Ability.dexterity, Ability.intelligence],
    level: 0,
    hitDie: HitDie.d6,
  },
];
