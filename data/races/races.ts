import { Dragonborn } from "./dragonborn/race";
import { Race } from "./types";

//TODO: add varient support (is a variant part of a trait?)
//TODO: work on elf race
//TODO: move all Basic Rules classes to a seperate module

export const races: Array<Race> = [
  Dragonborn,
  {
    name: "Dwarf",
    picture:
      "https://www.dndbeyond.com/avatars/thumbnails/6/254/420/618/636271781394265550.png",
    expansion: "Player's Handbook / Basic Rules",
    traits: {
      abilityScoreIncrease: { dexterity: +2 },
    },
  },
  {
    name: "Elf",
    picture:
      "https://www.dndbeyond.com/avatars/thumbnails/7/639/420/618/636287075350739045.png",
    expansion: "Player's Handbook / Basic Rules",
    traits: {
      abilityScoreIncrease: { dexterity: +2 },
    },
    variants: [
      {
        name: "Eladrin",
        description:
          "Creatures of magic with strong ties to nature, eladrin live in the twilight realm of the Feywild. Their cities sometimes cross over to the Material Plane, appearing briefly in mountain valleys or deep forest glades before fading back into the Feywild.",
      },
    ],
  },
  {
    name: "Gnome",
    picture:
      "https://www.dndbeyond.com/avatars/thumbnails/6/334/420/618/636272671553055253.png",
    expansion: "Player's Handbook / Basic Rules",
  },
  {
    name: "Half-Elf",
    picture:
      "https://www.dndbeyond.com/avatars/thumbnails/6/481/420/618/636274618102950794.png",
    expansion: "Player's Handbook / Basic Rules",
  },
  {
    name: "Halfling",
    picture:
      "https://www.dndbeyond.com/avatars/thumbnails/6/256/420/618/636271789409776659.png",
    expansion: "Player's Handbook / Basic Rules",
  },
  {
    name: "Half-Orc",
    picture:
      "https://www.dndbeyond.com/avatars/thumbnails/6/466/420/618/636274570630462055.png",
    expansion: "Player's Handbook / Basic Rules",
  },
  {
    name: "Human",
    picture:
      "https://www.dndbeyond.com/avatars/thumbnails/6/258/420/618/636271801914013762.png",
    expansion: "Player's Handbook / Basic Rules",
  },
  {
    name: "Tiefling",
    picture:
      "https://www.dndbeyond.com/avatars/thumbnails/7/641/420/618/636287076637981942.png",
    expansion: "Player's Handbook / Basic Rules",
  },
  // {
  //   name: "Leonin",
  //   expansion: "Mythic Odysseys of Theors",
  // },
  // {
  //   name: "Satyr (Legacy)",
  //   expansion: "Mythic Odysseys of Theors",
  // },
  // {
  //   name: "Owlin",
  //   expansion: "Strixhaven: A Curriculum of Chaos",
  // },
  // {
  //   name: "Aarakocra",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Aasimar",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Air Genasi",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Bugbear",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Changeling",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Deep Gnome",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Duergar",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Earth Genasi",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Eladrin",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Fairy",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Firbolg",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Fire Genasi",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Githyanki",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Githzerai",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Goblin",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Goliath",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Herangon",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Hobgoblin",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Kenku",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Kobold",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Lizardfolk",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  {
    name: "Minotaur",
    picture:
      "https://www.dndbeyond.com/avatars/thumbnails/30833/457/1000/1000/638063864308085049.png",
    expansion: "Mordenkainen Presents: Monsters of Multiverse",
  },
  // {
  //   name: "Orc",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Satyr",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Sea Elf",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Shader-kai",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Shifter",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Tabaxi",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Tortle",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Triton",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Water Genasi",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Yuan-ti",
  //   expansion: "Mordenkainen Presents: Monsters of Multiverse",
  // },
  // {
  //   name: "Aasimar (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Bugbear (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Firbolg (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Goblin (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Hobgoblin (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Kenku (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Kobold (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Lizardfolk (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Orc (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Tabaxi (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Triton (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Yuan-ti Pureblood (Legacy)",
  //   expansion: "Volo's Guide to Monsters",
  // },
  // {
  //   name: "Feral Tiefling",
  //   expansion: "Sword Coast Adventurer's Guide",
  // },
  // {
  //   name: "Tortle (Legacy)",
  //   expansion: "The Tortle Package",
  // },
  // {
  //   name: "Changeling (Legacy)",
  //   expansion: "Ebberon: Rising from the Last War",
  // },
  // {
  //   name: "Kalashtar",
  //   expansion: "Ebberon: Rising from the Last War",
  // },
  // {
  //   name: "Shifter (Legacy)",
  //   expansion: "Ebberon: Rising from the Last War",
  // },
  // {
  //   name: "Warforged",
  //   expansion: "Ebberon: Rising from the Last War",
  // },
  {
    name: "Astral Elf",
    picture:
      "https://rpgrunkleplaysgames.files.wordpress.com/2017/10/b3c9f96ba0399953a1f4a368693358f2.jpg",
    expansion: "Spelljammer: Adventures in Space",
  },
  // {
  //   name: "Autognome",
  //   expansion: "Spelljammer: Adventures in Space",
  // },
  // {
  //   name: "Giff",
  //   expansion: "Spelljammer: Adventures in Space",
  // },
  // {
  //   name: "Hadozee",
  //   expansion: "Spelljammer: Adventures in Space",
  // },
  // {
  //   name: "Plasmoid",
  //   expansion: "Spelljammer: Adventures in Space",
  // },
  // {
  //   name: "Thri-kreen",
  //   expansion: "Spelljammer: Adventures in Space",
  // },
  // {
  //   name: "Gith (Legacy)",
  //   expansion: "Mordenkainen's Tome of Foes",
  // },
  // {
  //   name: "Centaur (Legacy)",
  //   expansion: "Guildmasters' Guide to Ravnica",
  // },
  // {
  //   name: "Loxodon",
  //   expansion: "Guildmasters' Guide to Ravnica",
  // },
  // {
  //   name: "Minotaur (Legacy)",
  //   expansion: "Guildmasters' Guide to Ravnica",
  // },
  // {
  //   name: "Simic Hybdrid",
  //   expansion: "Guildmasters' Guide to Ravnica",
  // },
  // {
  //   name: "Vedalken",
  //   expansion: "Guildmasters' Guide to Ravnica",
  // },
  // {
  //   name: "Verdan",
  //   expansion: "Aquisitions Incorporated",
  // },
  // {
  //   name: "Locathah",
  //   expansion: "Locathah Rising",
  // },
  // {
  //   name: "Kender",
  //   expansion: "Dragonlance: Shadow of the Dragon Queen",
  // },
  // {
  //   name: "Grung",
  //   expansion: "One Grung Above",
  // },
  // {
  //   name: "Aarakocra (Legacy)",
  //   expansion: "Elemental Evil Player's Companion",
  // },
  // {
  //   name: "Genasi (Legacy)",
  //   expansion: "Elemental Evil Player's Companion",
  // },
  // {
  //   name: "Goliath (Legacy)",
  //   expansion: "Elemental Evil Player's Companion",
  // },
];
