import { getSheetWithId, updateSheetWithId } from "@/app/utils/apiCalls";
import { useSheetStore } from "@/app/utils/store";
import { SkillTypes } from "@/data/classes/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AbilitySidebar() {
  const [selectedSkills, setSelectedSkills] = useState<any>([]);
  const selectedSheet = useSheetStore((state) => state.selectedSheet);
  const setSelectedSheet = useSheetStore((state) => state.setSelectedSheet);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    getSheetWithId(selectedSheet?.id).then((res: any) => {
      setSelectedSheet(res);
    });
  }, []);

  function handleSelectedSkills(skill: any) {
    if (
      selectedSkills.length >=
      selectedSheet?.data?.class[0].proficiencies?.skills?.amount
    )
      return toast.error(
        `You've already selected the maximum number of ${selectedSheet?.data?.class[0].proficiencies?.skills?.amount} skills`
      );

    if (
      !selectedSheet?.data?.class[0].proficiencies?.skills?.options
        .map((s: any) => SkillTypes[s])
        .includes(skill)
    )
      return toast.error("You can't be proficient in this skill");

    setSelectedSkills([...selectedSkills, skill]);
    if (selectedSheet?.data?.skills) {
      if (selectedSheet.data?.level < 5) selectedSheet.data.skills[skill] += 2;
      else if (selectedSheet.data.level < 9)
        selectedSheet.data.skills[skill] += 3;
      else if (selectedSheet.data?.level < 13)
        selectedSheet.data.skills[skill] += 4;
    }

    updateSheetWithId(
      sheetId,
      {
        ...selectedSheet?.data,
        skills: {
          ...selectedSheet?.data?.skills,
          [skill]: selectedSheet.data?.skills[skill],
        },
      },
      selectedSheet?.campaign,
      selectedSheet?.user!
    )
      .then((res: any) => {
        setSelectedSheet(res);
        // setShowModal(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div className="relative">
      <button
        className="bg-light-secondary border-2 z-50 border-light-accent border-r-0 absolute right-0 top-16 w-10 h-10 rounded-l-full "
        onClick={() => setIsVisible(!isVisible)}
      ></button>
      <div
        className={`transition-all duration-200 absolute bg-light-primary right-0 bottom-0 h-full overflow-hidden ${
          isVisible
            ? "w-80 px-4 border-l-2 border-light-secondary flex flex-col"
            : "w-0 hidden"
        }`}
      >
        {selectedSheet?.data?.class &&
          selectedSheet?.data?.class?.length > 0 && (
            <section className="flex justify-between uppercase">
              <span>
                <p className="font-bold">Max</p>
                <p>{selectedSheet?.data?.hitPoints?.max}</p>
              </span>
              <span>
                <p className="font-bold">Current</p>
                <input
                  placeholder={selectedSheet?.data?.hitPoints?.max}
                  value={selectedSheet?.data?.hitPoints?.current}
                  max={selectedSheet?.data?.hitPoints?.max}
                  type="number"
                  className="bg-light-primary"
                />
              </span>
              <span>
                <p className="font-bold">Temp</p>
                <input
                  placeholder={selectedSheet?.data?.hitPoints?.max}
                  value={selectedSheet?.data?.hitPoints?.temp}
                  type="number"
                  className="bg-light-primary"
                />
              </span>
            </section>
          )}
        <p className="font-bold uppercase text-xl">Skills</p>
        {selectedSheet?.data?.skills &&
          Object.entries(selectedSheet?.data?.skills!).map((skill: any) => (
            <span
              key={skill[0]}
              className={`${
                selectedSheet?.data?.class[0]?.proficiencies?.skills?.options
                  .map((s: any) => SkillTypes[s])
                  .includes(skill[0])
                  ? "font-semibold text-light-accent"
                  : "text-light-secondary font-medium"
              } uppercase font-medium flex w-full`}
            >
              <input
                type={"radio"}
                className="mr-2"
                checked={selectedSkills.includes(skill[0])}
                onChange={() => {
                  handleSelectedSkills(skill[0]);
                }}
              />

              <p className="mr-auto">{`${skill[0]}`}</p>
              <p> {`${skill[1]}`}</p>
            </span>
          ))}
        <p className="text-2xl">AC</p>
        <p>{selectedSheet?.data?.armourClass}</p>
        <p className="text-2xl">Speed</p>
        <p>{selectedSheet?.data?.speed}</p>
        <p>{selectedSheet?.data?.initiative}</p>
        <p>{selectedSheet?.data?.currency?.gold}</p>
      </div>
    </div>
  );
}
