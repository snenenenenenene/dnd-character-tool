export class SkillCalulations{
    static acrobatics(dexterity: number, proficiencyBonus?:number): number{
        return genericCalculation(dexterity, proficiencyBonus);
    }
    static animalHandling(wisdom: number, proficiencyBonus?:number): number{
        return genericCalculation(wisdom, proficiencyBonus);
    }
    static arcana(intelligence: number, proficiencyBonus?:number): number{
        return genericCalculation(intelligence, proficiencyBonus);
    }
    static athletics(strength: number, proficiencyBonus?:number): number{
        return genericCalculation(strength, proficiencyBonus);
    }
    static deception(charisma: number, proficiencyBonus?:number): number{
        return genericCalculation(charisma, proficiencyBonus);
    }
    static history(intelligence: number, proficiencyBonus?:number): number{
        return genericCalculation(intelligence, proficiencyBonus);
    }
    static insight(wisdom: number, proficiencyBonus?:number): number{
        return genericCalculation(wisdom, proficiencyBonus);
    }
    static intimidation(charisma: number, proficiencyBonus?:number): number{
        return genericCalculation(charisma, proficiencyBonus);
    }
    static investigation(intelligence: number, proficiencyBonus?:number): number{
        return genericCalculation(intelligence, proficiencyBonus);
    }
    static medicine(wisdom: number, proficiencyBonus?:number): number{
        return genericCalculation(wisdom, proficiencyBonus);
    }
    static nature(intelligence: number, proficiencyBonus?:number): number{
        return genericCalculation(intelligence, proficiencyBonus);
    }
    static perception(wisdom: number, proficiencyBonus?:number): number{
        return genericCalculation(wisdom, proficiencyBonus);
    }
    static performance(charisma: number, proficiencyBonus?:number): number{
        return genericCalculation(charisma, proficiencyBonus);
    }
    static persuasion(charisma: number, proficiencyBonus?:number): number{
        return genericCalculation(charisma, proficiencyBonus);
    }
    static religion(intelligence: number, proficiencyBonus?:number): number{
        return genericCalculation(intelligence, proficiencyBonus);
    }
    static sleightOfHand(dexterity: number, proficiencyBonus?:number): number{
        return genericCalculation(dexterity, proficiencyBonus);
    }
    static stealth(dexterity: number, proficiencyBonus?:number): number{
        return genericCalculation(dexterity, proficiencyBonus);
    }
    static survival(wisdom: number, proficiencyBonus?:number): number{
        return genericCalculation(wisdom, proficiencyBonus);
    }
}

export class SavingThrowCalculations{
    static strength(strength: number, proficiencyBonus?:number): number{
        return genericCalculation(strength, proficiencyBonus);
    }
    static dexterity(dexterity: number, proficiencyBonus?:number): number{
        return genericCalculation(dexterity, proficiencyBonus);
    }
    static constitution(constitution: number, proficiencyBonus?:number): number{
        return genericCalculation(constitution, proficiencyBonus);
    }
    static intelligence(intelligence: number, proficiencyBonus?:number): number{
        return genericCalculation(intelligence, proficiencyBonus);
    }
    static wisdom(wisdom: number, proficiencyBonus?:number): number{
        return genericCalculation(wisdom, proficiencyBonus);
    }
    static charisma(charisma: number, proficiencyBonus?:number): number{
        return genericCalculation(charisma, proficiencyBonus);
    }
}

export class ExtraScoresCalculations{
    static proficiencyBonus(characterLevel: number): number{
        return Math.floor(2 + (characterLevel - 1) / 4);
    }
    
    static passivePerception(characterLevel: number): number{
        return Math.floor(2 + (characterLevel - 1) / 4);
    }

    static initiative(dexterity: number): number {
        return dexterity;
    }
    static armour(dexterity: number, armourBonus?: number, magicBonus?: number): number{
        let result = 10 + dexterity;
        result = genericCalculation(result, armourBonus);
        return genericCalculation(result, magicBonus);
    }
    static attackBonus(skillBonus: number, proficiencyBonus?: number){
        return genericCalculation(skillBonus, proficiencyBonus);
    }
    static spellSavingDC(skillBonus: number, proficiencyBonus?: number): number{
        let result = 8 + skillBonus;
        return genericCalculation(result, proficiencyBonus);
    }
    static spellAttack(skillBonus: number, proficiencyBonus?: number): number{
        return genericCalculation(skillBonus, proficiencyBonus);
    }
}

function genericCalculation(skill: number, notRequiredBonus?: number){
    if(notRequiredBonus != undefined) return skill + notRequiredBonus;
    return skill;
}