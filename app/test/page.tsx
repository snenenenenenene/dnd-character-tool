// /* eslint-disable no-unused-vars */
// "use client";
// import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
// import { classes } from "@/data/classes/classes";
// import { Class } from "@/data/classes/types";
// import { races } from "@/data/races/races";
// import { useEffect, useState } from "react";
// export const SavingThrow = ({
//   name,
//   value,
//   onChange,
// }: {
//   name: string;
//   value?: number;
//   onChange?: (value: number) => void;
// }) => {
//   return (
//     <li className="flex gap-x-2">
//       <Label className="order-3 font-normal text-sm" htmlFor="Strength-save">
//         {name}
//       </Label>
//       <input
//         name="Strength-save"
//         className="order-2 border-b text-center w-12 border-light-secondary items-center"
//         placeholder="+0"
//         type="text"
//       />
//       <input
//         className="rounded-full checked:bg-light-secondary cursor-pointer order-1 appearance-none border border-light-secondary w-4 h-4"
//         name="Strength-save-prof"
//         type="checkbox"
//       />
//     </li>
//   );
// };

// export const BoxWithLabelBelow = ({
//   name,
//   value,
//   onChange,
// }: {
//   name: string;
//   value: number;
//   onChange: (value: number) => void;
// }) => {
//   return (
//     <div className="armorclass flex">
//       <div>
//         <input
//           name="ac"
//           placeholder="10"
//           className="border text-center text-4xl border-light-secondary rounded-xl w-32 h-32"
//           type="text"
//           value={value}
//         />
//         <Label
//           htmlFor="ac"
//           className="border bg-white h-12 justify-center flex flex-col w-2/3 border-light-secondary border-t-0 text-sm font-normal uppercase text-center mx-auto rounded-b-xl"
//         >
//           {name}
//         </Label>
//       </div>
//     </div>
//   );
// };

// export const Skill = ({
//   name,
//   ability,
//   value,
//   proficient,
//   onChange,
// }: {
//   name: string;
//   ability?: string;
//   value?: number;
//   proficient?: boolean;
//   onChange?: (value: number) => void;
// }) => {
//   return (
//     <li className="flex gap-x-2">
//       <Label
//         className="order-3 font-normal text-sm flex gap-x-2"
//         htmlFor="Strength-save"
//       >
//         {name}
//         {ability && (
//           <p className="text-light-tertiary">({ability.slice(0, 3)}).</p>
//         )}
//       </Label>
//       <input
//         name="Strength-save"
//         className="order-2 border-b text-center w-12 border-light-secondary items-center"
//         placeholder="+0"
//         value={value}
//         type="text"
//       />
//       <input
//         className="rounded-full checked:bg-light-secondary cursor-pointer order-1 appearance-none border border-light-secondary w-4 h-4"
//         onChange={() => onChange}
//         name="Strength-save-prof"
//         checked={proficient}
//         type="checkbox"
//       />
//     </li>
//   );
// };

// export const CalculateScore = (
//   score: number,
//   modifier: number,
//   proficient?: boolean
// ) => {
//   return Math.floor((Number(score) - 10) / 2) + (proficient ? 2 : 0) + modifier;
// };

// export const Score = ({
//   name,
//   value,
//   onChange,
// }: {
//   name: string;
//   value?: number;
//   onChange?: any;
// }) => {
//   return (
//     <li className="h-36 w-2/3 bg-white border border-light-secondary text-center flex flex-col rounded-xl">
//       <div className="score pt-2 w-full h-full">
//         <Label className="uppercase text-sm" htmlFor="Strengthscore">
//           {name}
//         </Label>
//         <input
//           max={18}
//           min={3}
//           name={"abilities." + name}
//           onChange={onChange}
//           placeholder="10"
//           value={value}
//           className="stat w-full h-full text-5xl text-center"
//         />
//       </div>
//       <div className="modifier mt-3">
//         <input
//           value={Math.floor((Number(value) - 10) / 2)}
//           name="Strengthmod"
//           placeholder="+0"
//           className="statmod h-12 text-xl text-center w-1/2 border border-light-secondary rounded-full"
//         />
//       </div>
//     </li>
//   );
// };

// export const Label = ({
//   htmlFor,
//   className,
//   children,
// }: {
//   htmlFor: string;
//   className?: string;
//   children: string;
// }) => {
//   return (
//     <label htmlFor={htmlFor} className={`${className} font-bold`}>
//       {children}
//     </label>
//   );
// };

// export default function CharacterSheet(context: any) {
//   const [character, setCharacter]: any = useState({});

//   useEffect(() => {
//     console.log(context.params.id);
//     getSheetWithId(context.params.id)
//       .then((res: any) => {
//         console.log(res);
//         setCharacter(res);
//       })
//       .catch((err: any) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     console.log(character.data);
//     updateSheetWithId(
//       context.params.id,
//       character.data,
//       character?.campaign,
//       character?.user!
//     )
//       .then((res: any) => {
//         console.log(res);
//       })
//       .catch((err: any) => {
//         console.log(err);
//       });
//   }, [character]);

//   function handleInputChange(event: any) {
//     const { name, value } = event.target;
//     if (name.includes("abilities")) {
//       const ability = name.split("abilities.")[1];
//       setCharacter((prevCharacter: any) => ({
//         ...prevCharacter,
//         data: {
//           ...prevCharacter.data,

//           abilities: {
//             ...prevCharacter.data?.abilities,
//             [ability]: value,
//           },
//         },
//       }));
//     } else {
//       setCharacter((prevCharacter: any) => ({
//         ...prevCharacter,
//         data: {
//           ...prevCharacter.data,
//           [name]: value,
//         },
//       }));
//     }

//     updateSheetWithId(
//       context.params.id,
//       character.data,
//       character?.campaign,
//       character?.user
//     );
//   }

//   return (
//     <form className="pt-4 min-h-screen flex flex-col items-center 3xl:px-[36rem] px-2 pb-96 bg-light-text overflow-y-visible overflow-x-hidden">
//       {character ? (
//         <>
//           <header className="flex h-fit items-center">
//             <section className="border p-4 gap-y-4 w-[30rem] h-[7rem] bg-light-secondary flex flex-col border-r-0 border-light-secondary rounded-l-xl px-5">
//               <input
//                 value={character?.data?.name}
//                 onChange={handleInputChange}
//                 name={"name"}
//                 placeholder="Thoradin Fireforge"
//                 className="h-full px-2"
//               />
//               <Label
//                 htmlFor="charname"
//                 className="text-light-primary uppercase text-sm font-normal"
//               >
//                 Character Name
//               </Label>
//             </section>
//             <section className="misc border flex p-4 border-light-secondary rounded-xl w-full overflow-hidden">
//               <ul className="flex flex-wrap">
//                 <li className="flex flex-col w-1/3">
//                   <span className="flex">
//                     {character?.data?.class.map(
//                       (charClasses: Class[], index: number) => (
//                         <>
//                           <select
//                             value={character?.data?.class[index]!.name}
//                             onChange={(e: any) =>
//                               setCharacter((prevCharacter: any) => ({
//                                 ...prevCharacter,
//                                 data: {
//                                   ...prevCharacter.data,

//                                   class: [
//                                     classes.find(
//                                       (c) => c.name === e.target.value
//                                     ),
//                                   ],
//                                 },
//                               }))
//                             }
//                             name="class"
//                             className="border-b flex w-full border-light-tertiary"
//                             placeholder="Paladin"
//                           >
//                             {classes.map((c, index) => (
//                               <option key={c.name} value={c.name}>
//                                 {c.name}
//                               </option>
//                             ))}
//                           </select>
//                           <input
//                             value={character.data.class[index].level}
//                             onChange={(e: any) =>
//                               setCharacter((prevCharacter: any) => ({
//                                 ...prevCharacter,
//                                 data: {
//                                   ...prevCharacter.data,
//                                   // keep the other classes and change the level of class with index index
//                                   class: [
//                                     ...prevCharacter.data.class.filter(
//                                       (c: any, i: number) => i !== index
//                                     ),
//                                     {
//                                       ...prevCharacter.data.class[index],
//                                       level: e.target.value,
//                                     },
//                                   ],
//                                 },
//                               }))
//                             }
//                             name="level"
//                             className="border-b w-8 border-light-tertiary"
//                             placeholder="2"
//                           />
//                         </>
//                       )
//                     )}
//                     <select
//                       value={character?.data?.class?.name}
//                       onChange={(e: any) =>
//                         setCharacter((prevCharacter: any) => ({
//                           ...prevCharacter,
//                           data: {
//                             ...prevCharacter.data,

//                             class: [
//                               prevCharacter.class.length > 0
//                                 ? prevCharacter.class[0].level >=
//                                   prevCharacter.level
//                                   ? prevCharacter.class[0]
//                                   : prevCharacter.class[1]
//                                 : prevCharacter.class[0],
//                             ],
//                           },
//                         }))
//                       }
//                       name="class"
//                       className="border-b flex w-full border-light-tertiary"
//                       placeholder="Paladin"
//                     >
//                       {classes.map((c, index) => (
//                         <option key={c.name} value={c.name}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                     <input
//                       value={character?.data?.level}
//                       onChange={handleInputChange}
//                       name="level"
//                       className="border-b w-8 border-light-tertiary"
//                       placeholder="2"
//                     />
//                   </span>
//                   <Label className="uppercase font-normal" htmlFor="classlevel">
//                     Class & Level
//                   </Label>
//                 </li>
//                 <li className="flex flex-col w-1/3">
//                   <input
//                     name="background"
//                     value={character.data?.background}
//                     onChange={handleInputChange}
//                     className="border-b border-light-tertiary"
//                     placeholder="Acolyte"
//                   />
//                   <Label className="uppercase font-normal" htmlFor="background">
//                     Background
//                   </Label>
//                 </li>
//                 <li className="flex flex-col w-1/3">
//                   <input
//                     value={character?.expand?.user?.username}
//                     onChange={handleInputChange}
//                     name="playername"
//                     className="border-b border-light-tertiary"
//                     placeholder="Player McPlayerface"
//                   />
//                   <Label className="uppercase font-normal" htmlFor="playername">
//                     Player Name
//                   </Label>
//                 </li>
//                 <li className="flex flex-col w-1/3">
//                   <select
//                     value={character?.data?.race?.name}
//                     onChange={(e: any) => {
//                       setCharacter((prevCharacter: any) => ({
//                         ...prevCharacter,
//                         data: {
//                           ...prevCharacter.data,

//                           race: races.find((r) => r.name === e.target.value),
//                         },
//                       }));
//                     }}
//                     name="race"
//                     className="border-b border-light-tertiary"
//                     placeholder="Half-elf"
//                   >
//                     {races.map((r, index) => (
//                       <option key={r.name} value={r.name}>
//                         {r.name}
//                       </option>
//                     ))}
//                   </select>
//                   <Label className="uppercase font-normal" htmlFor="race">
//                     Race
//                   </Label>
//                 </li>
//                 <li className="flex flex-col w-1/3">
//                   <input
//                     value={character.data?.alignment}
//                     onChange={handleInputChange}
//                     name="alignment"
//                     className="border-b border-light-tertiary"
//                     placeholder="Lawful Good"
//                   />
//                   <Label className="uppercase font-normal" htmlFor="alignment">
//                     Alignment
//                   </Label>
//                 </li>
//                 <li className="flex flex-col w-1/3">
//                   <input
//                     value={character.data?.experiencePoints}
//                     onChange={handleInputChange}
//                     name="experiencepoints"
//                     className="border-b border-light-tertiary"
//                     placeholder="3240"
//                   />
//                   <Label
//                     className="uppercase font-normal"
//                     htmlFor="experiencepoints"
//                   >
//                     Experience Points
//                   </Label>
//                 </li>
//               </ul>
//             </section>
//           </header>
//           <main className="flex justify-between mt-10 gap-x-4">
//             <section>
//               <section className="attributes flex flex-row mr-4 justify-between w-full">
//                 <div className="scores bg-light-secondary py-8 w-[12rem] rounded-lg">
//                   <ul className="flex flex-col justify-around gap-y-8 items-center h-full">
//                     <Score
//                       value={character?.data?.abilities?.strength}
//                       onChange={handleInputChange}
//                       name="strength"
//                     />
//                     <Score
//                       value={character?.data?.abilities?.dexterity}
//                       onChange={handleInputChange}
//                       name="dexterity"
//                     />
//                     <Score
//                       value={character?.data?.abilities?.constitution}
//                       onChange={handleInputChange}
//                       name="constitution"
//                     />
//                     <Score
//                       value={character?.data?.abilities?.wisdom}
//                       onChange={handleInputChange}
//                       name="wisdom"
//                     />
//                     <Score
//                       value={character?.data?.abilities?.intelligence}
//                       onChange={handleInputChange}
//                       name="intelligence"
//                     />
//                     <Score
//                       value={character?.data?.abilities?.charisma}
//                       onChange={handleInputChange}
//                       name="charisma"
//                     />
//                   </ul>
//                 </div>
//                 <div className="attr-applications flex flex-col justify-between">
//                   <div className="inspiration box flex flex-row-reverse justify-end">
//                     <div className="Label-container w-full flex py-2 text-center">
//                       <Label
//                         htmlFor="inspiration"
//                         className="border border-l-0 uppercase w-full font-normal text-sm border-light-secondary"
//                       >
//                         Inspiration
//                       </Label>
//                     </div>
//                     <input
//                       checked={character.data?.inspiration}
//                       onChange={handleInputChange}
//                       name="inspiration"
//                       className="appearance-none checked:bg-light-secondary cursor-pointer text-center text-xl border border-light-secondary rounded-lg w-12 h-10"
//                       type="checkbox"
//                     />
//                   </div>
//                   <div className="proficiency box flex w-72 flex-row-reverse justify-end">
//                     <div className="Label-container w-full flex py-2 text-center">
//                       <Label
//                         htmlFor="proficiency"
//                         className="border border-l-0 uppercase w-full font-normal text-sm border-light-secondary"
//                       >
//                         proficiency bonus
//                       </Label>
//                     </div>
//                     <input
//                       // value={}
//                       onChange={handleInputChange}
//                       name="proficiency"
//                       className="border text-center text-xl border-light-secondary rounded-lg  w-10 h-10"
//                       placeholder="+2"
//                     />
//                   </div>
//                   <div className="saves list-section p-4 box border border-light-secondary rounded-xl">
//                     <ul className="flex gap-y-2 flex-col">
//                       <SavingThrow
//                         // value={}
//                         onChange={handleInputChange}
//                         name="Strength"
//                       />
//                       <SavingThrow name="Dexterity" />
//                       <SavingThrow name="Constitution" />
//                       <SavingThrow name="Intelligence" />
//                       <SavingThrow name="Wisdom" />
//                       <SavingThrow name="Charisma" />
//                     </ul>
//                     <div className="Label pt-4 text-center font-bold uppercase">
//                       Saving Throws
//                     </div>
//                   </div>
//                   <div className="skills list-section box p-4 box border border-light-secondary rounded-xl">
//                     {character.data?.proficiencies && (
//                       <ul className="flex gap-y-2 flex-col">
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.dexterity,
//                             1,
//                             "acrobatics" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Acrobatics"
//                           ability="Dexterity"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.wisdom,
//                             1,
//                             "animal handling" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Animal Handling"
//                           ability="Wisdom"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.intelligence,
//                             1,
//                             "arcana" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Arcana"
//                           ability="Intelligence"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.strength,
//                             1,
//                             "athletics" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Athletics"
//                           ability="Strength"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.charisma,
//                             1,
//                             "deception" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Deception"
//                           ability="Charisma"
//                         />

//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.intelligence,
//                             1,
//                             "history" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="History"
//                           ability="Intelligence"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.wisdom,
//                             1,
//                             "insight" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Insight"
//                           ability="Wisdom"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.charisma,
//                             1,
//                             "intimidation" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Intimidation"
//                           ability="Charisma"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.intelligence,
//                             1,
//                             "investigation" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Investigation"
//                           ability="Intelligence"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.wisdom,
//                             1,
//                             "medicine" in character.data?.proficiencies
//                           )}
//                           name="Medicine"
//                           ability="Wisdom"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.intelligence,
//                             1,
//                             "nature" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Nature"
//                           ability="Intelligence"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.wisdom,
//                             1,
//                             "perception" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Perception"
//                           ability="Wisdom"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.charisma,
//                             1,
//                             "performance" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Performance"
//                           ability="Charisma"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.charisma,
//                             1,
//                             "persuasion" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Persuasion"
//                           ability="Charisma"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.intelligence,
//                             1,
//                             "religion" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Religion"
//                           ability="Intelligence"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.dexterity,
//                             1,
//                             "sleight of hand" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Sleight of Hand"
//                           ability="Dexterity"
//                         />
//                         <Skill
//                           name="Stealth"
//                           value={CalculateScore(
//                             character?.data.abilities?.dexterity,
//                             1,

//                             "stealth" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           ability="Dexterity"
//                         />
//                         <Skill
//                           value={CalculateScore(
//                             character?.data.abilities?.wisdom,
//                             1,
//                             "survival" in character.data?.proficiencies
//                           )}
//                           onChange={handleInputChange}
//                           name="Survival"
//                           ability="Wisdom"
//                         />
//                       </ul>
//                     )}
//                     <div className="Label pt-4 text-center font-bold uppercase">
//                       Skills
//                     </div>
//                   </div>
//                 </div>
//               </section>
//               <div className="passivePerception my-4 box flex w-full flex-row-reverse justify-end">
//                 <div className="Label-container w-full flex py-2 text-center">
//                   <Label
//                     htmlFor="passivePerception"
//                     className="border border-l-0 uppercase w-full font-normal text-sm border-light-secondary"
//                   >
//                     passive wisdom (perception)
//                   </Label>
//                 </div>
//                 {character.data?.proficiencies && (
//                   <input
//                     value={CalculateScore(
//                       character.data?.abilities?.wisdom,
//                       10,
//                       "perception" in character.data?.proficiencies
//                     )}
//                     name="passivePerception"
//                     className="border text-center text-xl border-light-secondary rounded-lg  w-10 h-10"
//                     placeholder="10"
//                   />
//                 )}
//               </div>
//               <div className="otherprofs box textblock flex flex-col">
//                 <label
//                   htmlFor="otherprofs"
//                   className="order-2 border border-light-secondary w-5/6 text-center uppercase font-semibold border-t-0 rounded-b-xl mx-auto"
//                 >
//                   Other Proficiencies and Languages
//                 </label>
//                 <textarea
//                   name="otherprofs"
//                   //   value={}
//                   className="h-[26rem] p-4 border border-light-secondary rounded-xl order-1"
//                 ></textarea>
//               </div>
//             </section>
//             <section className="flex flex-col gap-y-4 w-[28rem]">
//               <section className="combat flex flex-col p-4 rounded-xl bg-light-secondary">
//                 <section className="flex justify-between">
//                   <BoxWithLabelBelow
//                     value={character.data?.armorClass}
//                     name="Armor Class"
//                   />
//                   <BoxWithLabelBelow
//                     value={character.data?.initiative}
//                     name="Initiative"
//                   />
//                   <BoxWithLabelBelow
//                     value={
//                       character.data?.race?.traits?.speed?.baseWalkingSpeed
//                     }
//                     name="Speed"
//                   />
//                 </section>

//                 <div className="hp flex flex-col gap-y-4 my-4">
//                   <div className="regular flex bg-white flex-col border border-light-secondary rounded-t-xl">
//                     <div className="max flex px-8 justify-between">
//                       <Label htmlFor="maxhp">Hit Point Maximum</Label>
//                       <input
//                         name="maxhp"
//                         value={character.data?.hitPoints?.max}
//                         placeholder="10"
//                         className="border-b border-b-light-tertiary text-center"
//                         type="text"
//                       />
//                     </div>
//                     <div className="current text-center flex flex-col">
//                       <input
//                         name="currenthp"
//                         type="text"
//                         value={character.data?.hitPoints?.current}
//                         className="h-[8rem] text-center text-3xl"
//                       />
//                       <Label htmlFor="currenthp">Current Hit Points</Label>
//                     </div>
//                   </div>
//                   <div className="temporary flex flex-col text-center border bg-white border-light-secondary rounded-b-xl">
//                     <input
//                       value={character.data?.hitPoints?.temporary}
//                       name="temphp"
//                       type="text"
//                       className="h-[8rem] text-center text-3xl"
//                     />
//                     <Label htmlFor="temphp">Temporary Hit Points</Label>
//                   </div>
//                 </div>
//                 <section className="flex w-full gap-x-4">
//                   <div className="hitdice border h-[10rem] w-full overflow-hidden border-light-secondary rounded-xl bg-white flex">
//                     <div className="h-full flex flex-col w-full p-4">
//                       <div className="total flex justify-between w-full">
//                         <Label
//                           className="text-light-tertiary font-normal"
//                           htmlFor="totalhd"
//                         >
//                           Total
//                         </Label>
//                         <input
//                           name="totalhd"
//                           className="border-b border-b-light-tertiary w-28 text-center"
//                           placeholder="2d10"
//                           value={
//                             character.data?.level +
//                             " " +
//                             character.data?.class?.hitDice
//                           }
//                           type="text"
//                         />
//                       </div>
//                       <div className="remaining flex flex-col h-full">
//                         <input
//                           name="remaininghd"
//                           type="text"
//                           className="h-full text-center text-3xl"
//                         />
//                         <Label
//                           htmlFor="remaininghd"
//                           className="text-center uppercase font-normal"
//                         >
//                           Hit Dice
//                         </Label>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="deathsaves border h-[10rem] w-full border-light-secondary bg-white rounded-xl">
//                     <div>
//                       <div className="marks h-full flex flex-col justify-between p-4">
//                         <div className="deathsuccesses flex w-full">
//                           <Label className="w-[5rem] font-normal uppercase text-sm">
//                             Successes
//                           </Label>
//                           <div className="bubbles w-[5rem] flex justify-between px-2">
//                             <input
//                               name="deathsuccess1"
//                               value={character.data?.deathSaves?.successes}
//                               className=" rounded-full appearance-none border border-light-secondary w-4 h-4 checked:bg-light-secondary"
//                               type="checkbox"
//                             />
//                             <input
//                               name="deathsuccess2"
//                               className=" rounded-full appearance-none border border-light-secondary w-4 h-4 checked:bg-light-secondary"
//                               type="checkbox"
//                             />
//                             <input
//                               name="deathsuccess3"
//                               className=" rounded-full appearance-none border border-light-secondary w-4 h-4 checked:bg-light-secondary"
//                               type="checkbox"
//                             />
//                           </div>
//                         </div>
//                         <div className="deathfails flex w-full">
//                           <Label className="w-[5rem] text-sm uppercase font-normal">
//                             Failures
//                           </Label>
//                           <div className="bubbles w-[5rem] flex justify-between px-2">
//                             <input
//                               value={character.data?.deathSaves?.failures}
//                               name="deathfail1"
//                               type="checkbox"
//                               className=" rounded-full appearance-none border border-light-secondary w-4 h-4 checked:bg-light-secondary"
//                             />
//                             <input
//                               name="deathfail2"
//                               type="checkbox"
//                               className=" rounded-full appearance-none border border-light-secondary w-4 h-4 checked:bg-light-secondary"
//                             />
//                             <input
//                               name="deathfail3"
//                               type="checkbox"
//                               className=" rounded-full appearance-none border border-light-secondary w-4 h-4 checked:bg-light-secondary"
//                             />
//                           </div>
//                         </div>
//                         <div className="Label text-center  uppercase">
//                           <Label className="font-normal">Death Saves</Label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </section>
//               </section>
//               <section className="attacksandspellcasting h-full bg-white p-4 border flex border-light-secondary rounded-xl">
//                 <div className="flex flex-col w-full h-full">
//                   <table className="flex flex-col w-full">
//                     <thead>
//                       <tr className="flex justify-between">
//                         <th className="w-full text-center font-normal text-light-tertiary text-xs">
//                           Name
//                         </th>
//                         <th className="w-full text-center font-normal text-light-tertiary text-xs">
//                           Atk Bonus
//                         </th>
//                         <th className="w-full text-center font-normal text-light-tertiary text-xs">
//                           Damage/Type
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {character.data?.attacks?.map(
//                         (attack: any, key: number) => (
//                           <tr key={key} className="w-full flex">
//                             <td className="flex">
//                               <input
//                                 className="bg-light-tertiary w-full"
//                                 name="atkname1"
//                                 type="text"
//                                 value={attack.name}
//                               />
//                             </td>
//                             <td>
//                               <input
//                                 className="bg-light-tertiary w-full"
//                                 name="atbonus1"
//                                 type="text"
//                                 value={attack.bonus}
//                               />
//                             </td>
//                             <td>
//                               <input
//                                 className="bg-light-tertiary w-full"
//                                 name="atkdamage1"
//                                 type="text"
//                                 value={attack.damage}
//                               />
//                             </td>
//                           </tr>
//                         )
//                       )}
//                       <tr>
//                         <td>
//                           <input
//                             className="bg-light-tertiary w-full"
//                             name="atkname2"
//                             type="text"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             className="bg-light-tertiary w-full"
//                             name="atkbonus2"
//                             type="text"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             className="bg-light-tertiary w-full"
//                             name="atkdamage2"
//                             type="text"
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td>
//                           <input
//                             className="bg-light-tertiary w-full"
//                             name="atkname3"
//                             type="text"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             className="bg-light-tertiary w-full"
//                             name="atkbonus3"
//                             type="text"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             className="bg-light-tertiary w-full"
//                             name="atkdamage3"
//                             type="text"
//                           />
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>

//                   <textarea className="h-full flex"></textarea>
//                   <Label className="text-center font-normal uppercase">
//                     Attacks & Spellcasting
//                   </Label>
//                 </div>
//               </section>
//               <section className="equipment p-4 flex flex-col border border-light-secondary bg-white rounded-xl">
//                 <div className="flex gap-x-4">
//                   <div className="money">
//                     <ul className="flex flex-col gap-y-2">
//                       <li>
//                         <Label
//                           className="border border-light-secondary border-r-0 rounded-l-full px-2 uppercase font-normal text-xs"
//                           htmlFor="cp"
//                         >
//                           cp
//                         </Label>
//                         <input
//                           name="cp"
//                           className="border border-light-secondary rounded-lg h-10 w-16"
//                         />
//                       </li>
//                       <li>
//                         <Label
//                           htmlFor="sp"
//                           className="border border-light-secondary border-r-0 rounded-l-full px-2 uppercase font-normal text-xs"
//                         >
//                           sp
//                         </Label>
//                         <input
//                           name="sp"
//                           className="border border-light-secondary rounded-lg h-10 w-16"
//                         />
//                       </li>
//                       <li>
//                         <Label
//                           htmlFor="ep"
//                           className="border border-light-secondary border-r-0 rounded-l-full px-2 uppercase font-normal text-xs"
//                         >
//                           ep
//                         </Label>
//                         <input
//                           name="ep"
//                           className="border border-light-secondary rounded-lg h-10 w-16"
//                         />
//                       </li>
//                       <li>
//                         <Label
//                           htmlFor="gp"
//                           className="border border-light-secondary border-r-0 rounded-l-full px-2 uppercase font-normal text-xs"
//                         >
//                           gp
//                         </Label>
//                         <input
//                           name="gp"
//                           className="border border-light-secondary rounded-lg h-10 w-16"
//                         />
//                       </li>
//                       <li>
//                         <Label
//                           htmlFor="pp"
//                           className="border border-light-secondary border-r-0 rounded-l-full px-2 uppercase font-normal text-xs"
//                         >
//                           pp
//                         </Label>
//                         <input
//                           name="pp"
//                           className="border border-light-secondary rounded-lg h-10 w-16"
//                         />
//                       </li>
//                     </ul>
//                   </div>
//                   <textarea
//                     className="text-sm w-2/3 p-4"
//                     placeholder="Equipment list here"
//                     value={character.data?.equipment
//                       ?.map((item: any) => item.name + " " + item.quantity)
//                       .join("\n")}
//                   ></textarea>
//                 </div>
//                 <Label className="uppercase pt-4 font-normal text-center">
//                   Equipment
//                 </Label>
//               </section>
//             </section>
//             <section className="  flex flex-col gap-y-4">
//               <section className="flavor bg-light-secondary rounded-xl p-4 h-fit flex flex-col gap-y-4">
//                 <div className="personality h-[10rem] flex p-4 flex-col bg-white rounded-t-xl border border-light-secondary overflow-hidden">
//                   <textarea
//                     name="personality"
//                     className="h-full resize-none"
//                   ></textarea>
//                   <Label
//                     className="text-center text-sm font-normal uppercase"
//                     htmlFor="personality"
//                   >
//                     Personality
//                   </Label>
//                 </div>
//                 <div className="ideals h-[10rem] flex p-4 flex-col bg-white border border-light-secondary overflow-hidden">
//                   <textarea
//                     name="ideals"
//                     className="h-full resize-none"
//                   ></textarea>
//                   <Label
//                     className="text-center text-sm font-normal uppercase"
//                     htmlFor="ideals"
//                   >
//                     Ideals
//                   </Label>
//                 </div>
//                 <div className="bonds  h-[10rem] flex p-4 flex-col bg-white border border-light-secondary overflow-hidden">
//                   <textarea
//                     name="bonds"
//                     className="h-full resize-none"
//                   ></textarea>
//                   <Label
//                     className="text-center text-sm font-normal uppercase"
//                     htmlFor="bonds"
//                   >
//                     Bonds
//                   </Label>
//                 </div>
//                 <div className="flaws rounded-b-xl h-[10rem] flex p-4 flex-col bg-white border border-light-secondary overflow-hidden">
//                   <textarea
//                     name="flaws"
//                     className="h-full resize-none"
//                   ></textarea>
//                   <Label
//                     className="text-center text-sm font-normal uppercase"
//                     htmlFor="flaws"
//                   >
//                     Flaws
//                   </Label>
//                 </div>
//               </section>
//               <section className="features border bg-white p-4 border-light-secondary rounded-xl h-full overflow-hidden flex flex-col">
//                 <textarea
//                   // value={character.data?.race.traits.map((trait) => trait).join("\n")}
//                   name="features"
//                   className="h-full resize-none p-4"
//                 ></textarea>
//                 <Label
//                   className="text-center text-sm font-normal uppercase"
//                   htmlFor="features"
//                 >
//                   Features & Traits
//                 </Label>
//               </section>
//             </section>
//           </main>
//         </>
//       ) : (
//         <p>loader</p>
//       )}
//     </form>
//   );
// }
