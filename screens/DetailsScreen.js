import { Icon } from "@rneui/base";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import MaggieImg from "../assets/images/maggie.jpg";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { updateCurrentPetDetails, updatePetData } from "../slices/petsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = () => {
  const navigation = useNavigation();

  // const petData = useSelector((state) => state.pets.pets);
  const currentPet = useSelector((state) => state.pets.currentPet);
  // console.log(currentPet);

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [petName, setPetName] = useState(currentPet.petName);
  const [breed, setBreed] = useState(currentPet.breed);
  const [weight, setWeight] = useState(currentPet.weight);
  const [petAgeYears, setPetAgeYears] = useState(currentPet.petAgeYears);
  const [petGender, setPetGender] = useState(currentPet.petGender);
  const [microchip, setMicrochip] = useState(currentPet.microchip);

  // TO-DO: add function to delay state change until after user stops typing

  const handleSaveChanges = async () => {
    const updatedPetDetails = {
      petName,
      breed,
      weight,
      petAgeYears,
      petGender,
      microchip,
    };

    dispatch(updateCurrentPetDetails(updatedPetDetails)); // Update currentPetDetails
    dispatch(
      updatePetData({ petId: currentPet.id, updatedDetails: updatedPetDetails })
    ); // Update petData

    setEditMode(false);

    // update local storage
    const storage = await AsyncStorage.getItem("petData");
    console.log(storage);
    const parsedStorage = JSON.parse(storage);
    // 1. get currentPet (newly updated)
    // 2. find applicable one in storage and replace
    // 3. await AsyncStorage.setItem("petData", JSON.stringify(petData));
  };

  return (
    <SafeAreaView style={tw`h-full`}>
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-semibold pr-2 tracking-wide`}>
            Details
          </Text>
          {!editMode ? (
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <Icon name="wrench" type="font-awesome" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSaveChanges}>
              <Icon name="check" type="feather" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`w-full mx-auto pb-3 mt-3 mb-2 rounded-lg`}>
          <View style={tw`w-1/2 rounded-lg mx-auto`}>
            <Image
              style={[
                {
                  width: 180,
                  height: 170,
                  resizeMode: "cover",
                  borderRadius: 6,
                },
                tw`self-center m-2`,
              ]}
              source={MaggieImg}
            />
          </View>

          <View
            style={tw`flex items-center bg-white rounded-lg mt-3 px-4 border-b border-t border-emerald-200`}
          >
            <Text style={tw`text-3xl p-2 tracking-wide font-bold`}>
              {!editMode ? (
                currentPet.petName
              ) : (
                <TextInput
                  style={tw`text-3xl border border-gray-300 p-2`}
                  value={petName}
                  onChangeText={setPetName}
                />
              )}
            </Text>
          </View>
        </View>

        <View
          style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5 border-b border-t border-emerald-200`}
        >
          <Text style={tw`text-2xl text-center p-1 pt-2 font-bold underline`}>
            General
          </Text>
          <View style={tw`flex items-center gap-y-2`}>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Age:</Text>
              <Text style={tw`text-lg text-right text-gray-700 p-1 w-1/2`}>
                {!editMode ? (
                  currentPet.petAgeYears
                ) : (
                  <TextInput
                    style={tw`text-3xl border border-gray-300 p-2`}
                    value={petAgeYears}
                    onChangeText={setPetAgeYears}
                  />
                )}
              </Text>
            </View>

            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Breed:</Text>
              {!editMode ? (
                <Text>{currentPet.breed}</Text>
              ) : (
                <TextInput
                  style={tw`text-lg border border-gray-300 p-2`}
                  value={breed}
                  onChangeText={setBreed}
                />
              )}
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Weight:
              </Text>
              {!editMode ? (
                <Text>{currentPet.weight}</Text>
              ) : (
                <TextInput
                  style={tw`text-3xl border border-gray-300 p-2`}
                  value={weight}
                  onChangeText={setWeight}
                />
              )}
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Gender:</Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>{currentPet.petGender}</Text>
              ) : (
                <TextInput
                  style={tw`text-lg border border-gray-300 p-2`}
                  value={petGender}
                  onChangeText={setPetGender}
                />
              )}
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Microchip:
              </Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>{currentPet.microchip}</Text>
              ) : (
                <TextInput
                  style={tw`text-lg border border-gray-300 p-2`}
                  value={microchip}
                  onChangeText={setMicrochip}
                />
              )}
            </View>
          </View>
        </View>

        <View
          style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5 border-b border-t border-emerald-200`}
        >
          <Text style={tw`text-2xl text-center font-bold p-1 pt-2 underline`}>
            Medical
          </Text>
          <View style={tw`flex items-center gap-y-2`}>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Last Vet Visit:</Text>
              <Text style={tw`text-lg p-1`}>3/12/2023</Text>
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Allergies
              </Text>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>none</Text>
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Medications:</Text>
              <Text style={tw`text-lg p-1`}>none</Text>
            </View>
          </View>
        </View>

        <View
          style={tw`w-full mx-auto pb-3 bg-white rounded-lg border-b border-t border-emerald-200`}
        >
          <Text style={tw`text-2xl text-center font-bold p-1`}>
            Activity Log
          </Text>
          <TouchableOpacity>
            <View style={tw`bg-emerald-300 rounded-lg py-2 w-1/3 my-2 mx-auto`}>
              <Icon
                name="arrow-right-circle"
                type="feather"
                size={25}
                style={tw``}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailsScreen;
