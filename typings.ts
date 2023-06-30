export interface Pet {
    id: number,
    petName: string,
    petType: string,
    avatar?: string,
    petAgeYears?: number,
    petAgeMonths?: number,
    petGender?: string,
    image?: string,
}
export type PetData = Pet[];