import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { Sheet } from "@/app/utils/store";
import { SkillTypes } from "@/data/classes/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AbilitySidebar({ sheetId }: { sheetId: string }) {
  const [selectedSkills, setSelectedSkills] = useState<any>([]);
  const [sheet, setSheet]: any = useState<Sheet>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    getSheetWithId(sheetId).then((res: any) => {
      setSheet(res);
    });
  }, []);

  function handleSelectedSkills(skill: any) {
    if (
      selectedSkills.length >=
      sheet?.data?.class[0].proficiencies?.skills?.amount
    )
      return toast.error(
        `You've already selected the maximum number of ${sheet?.data?.class[0].proficiencies?.skills?.amount} skills`
      );

    if (
      !sheet?.data?.class[0].proficiencies?.skills?.options
        .map((s: any) => SkillTypes[s])
        .includes(skill)
    )
      return toast.error("You can't be proficient in this skill");

    setSelectedSkills([...selectedSkills, skill]);
    if (sheet?.data?.skills) {
      if (sheet.data.level < 5) sheet.data.skills[skill] += 2;
      else if (sheet.data.level < 9) sheet.data.skills[skill] += 3;
      else if (sheet.data.level < 13) sheet.data.skills[skill] += 4;
    }

    updateSheetWithId(
      sheetId,
      {
        ...sheet?.data,
        skills: {
          ...sheet?.data?.skills,
          [skill]: sheet.data.skills[skill],
        },
      },
      sheet?.campaign,
      sheet?.user!
    )
      .then((res: any) => {
        setSheet(res);
        // setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <button
        className="bg-light-secondary w-10 h-10 rounded-l-full translate-y-1/2"
        onClick={() => setIsVisible(!isVisible)}
      ></button>
      <div
        className={`  flex flex-col transition-all duration-200 ${
          isVisible ? "w-80 px-4 border-l-2 border-light-secondary" : "w-0"
        }`}
      >
        {sheet?.data?.class && sheet?.data?.class?.length > 0 && (
          <>
            <p>Max HP</p>
            <p>{sheet?.data?.hitPoints?.max}</p>
          </>
        )}
        <p>Skills</p>
        {sheet?.data?.skills &&
          Object.entries(sheet?.data?.skills!).map((skill: any) => (
            <label
              className={`${
                sheet?.data?.class[0]?.proficiencies?.skills?.options
                  .map((s: any) => SkillTypes[s])
                  .includes(skill[0])
                  ? "font-semibold text-light-accent"
                  : "text-light-secondary font-medium"
              } uppercase font-medium`}
              key={skill[0]}
            >
              <input
                type={"radio"}
                className="mr-2"
                checked={selectedSkills.includes(skill[0])}
                onChange={() => {
                  handleSelectedSkills(skill[0]);
                }}
              />

              {`${skill[0]}: ${skill[1]}`}
            </label>
          ))}
        <p className="text-2xl">AC</p>
        <p>{sheet?.data.armourClass}</p>
        <p className="text-2xl">Speed</p>
        <p>{sheet?.data.speed}</p>
        <p>{sheet?.data.initiative}</p>
        <p>{sheet?.data.currency?.gold}</p>
      </div>
    </>
  );
}
