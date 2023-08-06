import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pet, PetWalkInfo } from "../typings";

type UpdatedDetails = {
  petWalkInfo?: PetWalkInfo,
  pet?: Pet,
}


export async function updateStorage(currId: string, updatedDetails: UpdatedDetails) {
  try {
    const storage: string | null = await AsyncStorage.getItem("petData");

    let parsedStorage;
    // find applicable item in storage and replace with new
    parsedStorage = JSON.parse(storage!);
    const currInd = parsedStorage.findIndex((el: Pet) => el.id === currId)
    const activePet: Pet = parsedStorage[currInd];

    console.log('updatedDetails', updatedDetails)

    if (!activePet) console.log('active pet issue')

    if (updatedDetails.hasOwnProperty("allWalkData") && activePet) {
      activePet.petWalkInfo = {
        ...activePet.petWalkInfo,
        ...updatedDetails,
      };
    }

    const filteredStorage = parsedStorage.filter((el: Pet | null) => el !== null);
    
    await AsyncStorage.setItem("petData", JSON.stringify(filteredStorage));

    const newStorage = await AsyncStorage.getItem("petData");
    const parsed = JSON.parse(newStorage!);
    console.log(JSON.stringify(parsed, null, 2))

  } catch (err) {
    console.log(err);
  }
}