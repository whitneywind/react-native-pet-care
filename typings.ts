export interface Pet {
    id: string,
    petName: string,
    petType: string,
    breed?: string,
    weight?: string,
    microchip?: string,
    avatar?: string,
    petAgeYears?: string,
    petGender?: string,
    image?: string,
    medicalInfo?: PetMedicalInfo,
    petWalkInfo: PetWalkInfo
}

export interface PetMedicalInfo {
    lastVetVisit?: string,
    allergies?: string,
    medications?: string, 
}

// export type WalkData = [walkDate: string, walkTime: string]

export interface PetWalkInfo {
    dailyWalkGoal: string,
    walkStreak: string,
    allWalkData: number[]
}

// also what the asyncstorage looks like
export type PetData = Pet[];

export type GlobalStateType = {
    currentPet: Pet,
    petData: PetData,
}






// documentation comment example:
/**
   * Returns the sum of two numbers.
   *
   * @param x - The first input number
   * @param y - The second input number
   * @returns The sum of `x` and `y`
   *
   */
function getSum(x: number, y: number): number {
    return x + y;
}
