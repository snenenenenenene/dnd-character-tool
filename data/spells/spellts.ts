// get all dnd spells
// https://www.dndbeyond.com/spells

/* Spell Name	School	Casting Time	Range	Duration	Components
Acid Splash	Conjuration	1 Action	60 Feet	Instantaneous	V, S
Blade Ward	Abjuration	1 Action	Self	1 round	V, S
Booming Blade	Evocation	1 Action	Self (5-foot radius)	1 round	S, M
Chill Touch	Necromancy	1 Action	120 feet	1 round	V, S
Control Flames	Transmutation	1 Action	60 Feet	Instantaneous or 1 hour	S
Create Bonfire	Conjuration	1 Action	60 Feet	Concentration, up to 1 minute	V, S
Dancing Lights	Evocation	1 Action	120 feet	Concentration up to 1 minute	V, S, M
Decompose (HB)	Necromancy	1 Action	Touch	1 minute	V, S
Druidcraft	Transmutation	1 Action	30 Feet	Instantaneous	V, S
Eldritch Blast	Evocation	1 Action	120 Feet	Instantaneous	V, S
Encode Thoughts	Enchantment	1 Action	Self	8 hours	S
Fire Bolt	Evocation	1 Action	120 feet	Instantaneous	V, S
Friends	Enchantment	1 Action	Self	Concentration, up to 1 minute	S, M
Frostbite	Evocation	1 Action	60 feet	Instantaneous	V, S
Green-Flame Blade	Evocation	1 Action	Self (5-foot radius)	Instantaneous	S, M
Guidance	Divination	1 Action	Touch	Concentration up to 1 minute	V, S
Gust	Transmutation	1 Action	30 feet	Instantaneous	V, S
Hand of Radiance (UA)	Evocation	1 Action	5 feet	Instantaneous	V, S
Infestation	Conjuration	1 Action	30 feet	Instantaneous	V, S, M
Light	Evocation	1 Action	Touch	1 hour	V, M
Lightning Lure	Evocation	1 Action	Self (15-foot radius)	Instantaneous	V
Mage Hand	Conjuration	1 Action	30 feet	1 minute	V, S
Magic Stone	Transmutation	1 Bonus Action	Touch	1 minute	V, S
Mending	Transmutation	1 Minute	Touch	Instantaneous	V, S, M
Message	Transmutation	1 Action	120 feet	1 round	V, S, M
Mind Sliver	Enchantment	1 Action	60 feet	1 round	V
Minor Illusion	Illusion	1 Action	30 feet	1 minute	S, M
Mold Earth	Transmutation	1 Action	30 feet	Instantaneous or 1 hour	S
On/Off (UA)	Transmutation T	1 Action	60 feet	Instantaneous	V, S
Poison Spray	Conjuration	1 Action	10 feet	Instantaneous	V, S
Prestidigitation	Transmutation	1 Action	10 feet	Up to 1 hour	V, S
Primal Savagery	Transmutation	1 Action	Self	Self	S
Produce Flame	Conjuration	1 Action	Self	10 minutes	V, S
Ray of Frost	Evocation	1 Action	60 feet	Instantaneous	V, S
Resistance	Abjuration	1 Action	Touch	Concentration up to 1 minute	V, S, M
Sacred Flame	Evocation	1 Action	60 feet	Instantaneous	V, S
Sapping Sting	Necromancy D	1 Action	30 feet	Instantaneous	V, S
Shape Water	Transmutation	1 Action	30 feet	Instantaneous or 1 hour	S
Shillelagh	Transmutation	1 Bonus Action	Touch	1 minute	V, S, M
Shocking Grasp	Evocation	1 Action	Touch	Instantaneous	V, S
Spare the Dying	Necromancy	1 Action	Touch	Instantaneous	V, S
Sword Burst	Conjuration	1 Action	Self (5-foot radius)	Instantaneous	V
Thaumaturgy	Transmutation	1 Action	30 feet	Up to 1 minute	V
Thorn Whip	Transmutation	1 Action	30 feet	Instantaneous	V, S, M
Thunderclap	Evocation	1 Action	Self (5-foot radius)	Instantaneous	S
Toll the Dead	Necromancy	1 Action	60 feet	Instantaneous	V, S
True Strike	Divination	1 Action	30 feet	Concentration up to 1 round	S
Vicious Mockery	Enchantment	1 Action	60 feet	Instantaneous	V
Virtue (UA)	Abjuration	1 Action	Touch	1 round	V, S
Word of Radiance	Evocation	1 Action	5 feet	Instantaneous	V, M */

export type Spell = {
  name: string;
  description?: string;
  school: string;
  castingTime: string;
  range:
    | "30 feet"
    | "60 feet"
    | "120 feet"
    | "15 feet"
    | "10 feet"
    | "5 feet"
    | "Touch"
    | "Self"
    | "Self (5-foot radius)"
    | "Self (15-foot radius)";
  duration: string;
  components: Components[];
  level: number;
};

type Components = "V" | "S" | "M";
// add all spells from above and add that they are cantrips
export const spells: Spell[] = [
  {
    name: "Acid Splash",
    description:
      "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
    school: "Conjuration",
    castingTime: "1 Action",
    range: "60 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Blade Ward",
    description:
      "You extend your hand and trace a sigil of warding in the air.",
    school: "Abjuration",
    castingTime: "1 Action",
    range: "Self",
    duration: "1 round",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Booming Blade",
    description:
      "You brandish the weapon used in the spell's casting and make a melee attack with it against one creature within 5 feet of you.",
    school: "Evocation",
    castingTime: "1 Action",
    range: "Self (5-foot radius)",
    duration: "1 round",
    components: ["S", "M"],
    level: 0,
  },
  {
    name: "Chill Touch",
    description:
      "You create a ghostly, skeletal hand in the space of a creature within range.",
    school: "Necromancy",
    castingTime: "1 Action",
    range: "120 feet",
    duration: "1 round",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Control Flames",
    description:
      "You choose nonmagical flame that you can see within range and that fits within a 5-foot cube.",
    school: "Transmutation",
    castingTime: "1 Action",
    range: "60 feet",
    duration: "Instantaneous or 1 hour",
    components: ["S"],
    level: 0,
  },
  {
    name: "Create Bonfire",
    description:
      "You create a bonfire on ground that you can see within range.",
    school: "Conjuration",
    castingTime: "1 Action",
    range: "60 feet",
    duration: "Concentration, up to 1 minute",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Dancing Lights",
    description:
      "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration.",
    school: "Evocation",
    castingTime: "1 Action",
    range: "120 feet",
    duration: "Concentration up to 1 minute",
    components: ["V", "S", "M"],
    level: 0,
  },
  {
    name: "Druidcraft",
    description:
      "Whispering to the spirits of nature, you create one of the following effects within range.",
    school: "Transmutation",
    castingTime: "1 Action",
    range: "30 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Eldritch Blast",
    description:
      "A beam of crackling energy streaks toward a creature within range.",
    school: "Evocation",
    castingTime: "1 Action",
    range: "120 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Fire Bolt",
    description:
      "You hurl a mote of fire at a creature or object within range.",
    school: "Evocation",
    castingTime: "1 Action",
    range: "120 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Friends",
    description:
      "For the duration, you have advantage on all Charisma checks directed at one creature of your choice that isn't hostile toward you.",
    school: "Enchantment",
    castingTime: "1 Action",
    range: "Self",
    duration: "Concentration, up to 1 minute",
    components: ["S", "M"],
    level: 0,
  },
  {
    name: "Frostbite",
    description:
      "You cause numbing frost to form on one creature that you can see within range.",
    school: "Evocation",
    castingTime: "1 Action",
    range: "60 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Green-Flame Blade",
    description:
      "You brandish the weapon used in the spell's casting and make a melee attack with it against one creature within 5 feet of you.",
    school: "Evocation",
    castingTime: "1 Action",
    range: "Self (5-foot radius)",
    duration: "1 round",
    components: ["V", "M"],
    level: 0,
  },
  {
    name: "Gust",
    description:
      "You seize the air and compel it to create one of the following effects at a point you can see within range.",
    school: "Transmutation",
    castingTime: "1 Action",
    range: "30 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Infestation",
    description:
      "You cause a cloud of mites, fleas, and other parasites to appear momentarily on one creature you can see within range.",
    school: "Conjuration",
    castingTime: "1 Action",
    range: "30 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Light",
    description:
      "You touch one object that is no larger than 10 feet in any dimension.",
    school: "Evocation",
    castingTime: "1 Action",
    range: "Touch",
    duration: "1 hour",
    components: ["V", "M"],
    level: 0,
  },
  {
    name: "Lightning Lure",
    school: "Evocation",
    castingTime: "1 Action",
    range: "15 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Mage Hand",
    school: "Conjuration",

    castingTime: "1 Action",
    range: "30 feet",
    duration: "1 minute",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Magic Stone",
    school: "Transmutation",

    castingTime: "1 Bonus Action",
    range: "Touch",
    duration: "1 minute",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Mending",
    school: "Transmutation",

    castingTime: "1 Minute",
    range: "Touch",
    duration: "Instantaneous",
    components: ["V", "S", "M"],
    level: 0,
  },
  {
    name: "Message",
    school: "Transmutation",

    castingTime: "1 Action",
    range: "120 feet",
    duration: "1 round",
    components: ["V", "S", "M"],
    level: 0,
  },
  {
    name: "Minor Illusion",
    school: "Illusion",

    castingTime: "1 Action",
    range: "30 feet",

    duration: "1 minute",
    components: ["S", "M"],
    level: 0,
  },
  {
    name: "Mold Earth",
    school: "Transmutation",

    castingTime: "1 Action",
    range: "30 feet",
    duration: "Instantaneous or 1 hour",
    components: ["S"],
    level: 0,
  },
  {
    name: "Poison Spray",
    school: "Conjuration",

    castingTime: "1 Action",
    range: "10 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Prestidigitation",
    school: "Transmutation",

    castingTime: "1 Action",
    range: "10 feet",
    duration: "1 hour",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Primal Savagery",
    school: "Transmutation",

    castingTime: "1 Action",
    range: "Self",
    duration: "Instantaneous",
    components: ["S"],
    level: 0,
  },
  {
    name: "Produce Flame",
    school: "Conjuration",

    castingTime: "1 Action",
    range: "Self",
    duration: "10 minutes",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Ray of Frost",
    school: "Evocation",

    castingTime: "1 Action",
    range: "60 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Resistance",
    school: "Abjuration",

    castingTime: "1 Action",
    range: "Touch",
    duration: "Concentration, up to 1 minute",
    components: ["V", "S", "M"],
    level: 0,
  },
  {
    name: "Sacred Flame",
    school: "Evocation",
    castingTime: "1 Action",
    range: "60 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Shape Water",
    school: "Transmutation",

    castingTime: "1 Action",
    range: "30 feet",
    duration: "Instantaneous or 1 hour",
    components: ["S"],
    level: 0,
  },
  {
    name: "Shillelagh",
    school: "Transmutation",

    castingTime: "1 Bonus Action",
    range: "Touch",
    duration: "1 minute",
    components: ["V", "S", "M"],
    level: 0,
  },
  {
    name: "Shocking Grasp",
    school: "Evocation",

    castingTime: "1 Action",
    range: "Touch",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Spare the Dying",
    school: "Necromancy",

    castingTime: "1 Action",
    range: "Touch",
    duration: "Instantaneous",

    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Sword Burst",
    school: "Conjuration",

    castingTime: "1 Action",
    range: "5 feet",
    duration: "Instantaneous",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Thaumaturgy",
    school: "Transmutation",

    castingTime: "1 Action",
    range: "30 feet",
    duration: "1 minute",
    components: ["V"],
    level: 0,
  },
  {
    name: "Thorn Whip",
    school: "Transmutation",

    castingTime: "1 Action",
    range: "30 feet",
    duration: "Instantaneous",
    components: ["V", "S", "M"],
    level: 0,
  },
  {
    name: "Thunderclap",
    school: "Evocation",

    castingTime: "1 Action",
    range: "5 feet",
    duration: "Instantaneous",
    components: ["S"],
    level: 0,
  },
  {
    name: "True Strike",
    school: "Divination",

    castingTime: "1 Action",
    range: "30 feet",
    duration: "Concentration, up to 1 round",
    components: ["S"],
    level: 0,
  },
  {
    name: "Vicious Mockery",
    school: "Enchantment",

    castingTime: "1 Action",
    range: "60 feet",
    duration: "Instantaneous",
    components: ["V"],
    level: 0,
  },
  {
    name: "Virtue",
    school: "Conjuration",

    castingTime: "1 Action",
    range: "Touch",
    duration: "1 hour",
    components: ["V", "S"],
    level: 0,
  },
  {
    name: "Word of Radiance",
    school: "Evocation",

    castingTime: "1 Action",
    range: "5 feet",
    duration: "Instantaneous",
    components: ["V"],
    level: 0,
  },
];
