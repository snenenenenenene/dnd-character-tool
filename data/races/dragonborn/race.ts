import { Race } from "../types";

export const Dragonborn: Race = {
  name: "Dragonborn",
  picture:
    "https://www.dndbeyond.com/avatars/thumbnails/6/340/420/618/636272677995471928.png",
  expansion: "Player's Handbook / Basic Rules",
  traits: {
    abilityScoreIncrease: {
      strength: +2,
      charisma: +1,
    },
    age: {
      description:
        "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.",
    },
    size: {
      description:
        "Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.",
      size: "medium",
    },
    speed: {
      description: "Your base walking speed is 30 feet.",
      baseWalkingSpeed: 30,
    },
    draconicAncestry: [
      {
        colour: "black",
        damageType: "acid",
        breathWeapon: {
          description:
            "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can’t use it again until you complete a short or long rest.",
          type: "line",
          length: 5,
          width: 30,
          saveType: "dexterity",
        },
      },
    ],
  },
};
