export interface Pet {
    id: number,
    petName: string,
    petType: string,
    avatar?: string,
    petAgeYears?: number,
    petAgeMonths?: number,
    petGender?: string,
    image?: string,
    generalnfo?: PetGeneralInfo,
    medicalInfo?: PetMedicalInfo
}

export interface PetGeneralInfo {
    breed?: string,
    weight?: number,
    gender?: string,
    microchip?: string,
    registration?: string
}

export interface PetMedicalInfo {
    lastVetVisit?: string,
    medications?: string[] 
}
export type PetData = Pet[];