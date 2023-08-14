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
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  updateCurrentPetDetails,
  updatePetData,
  deleteOnePet,
  setCurrentPet,
} from "../slices/petsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import dogImg from "../assets/images/germanshepherd.png";
import catImg from "../assets/images/fluffycat.png";

const DetailsScreen = () => {
  const navigation = useNavigation();

  const petData = useSelector((state) => state.pets.pets);
  const currentPet = useSelector((state) => state.pets.currentPet);

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [petName, setPetName] = useState(currentPet.petName);
  const [breed, setBreed] = useState(currentPet.breed);
  const [weight, setWeight] = useState(currentPet.weight);
  const [petAgeYears, setPetAgeYears] = useState(currentPet.petAgeYears);
  const [gender, setGender] = useState(currentPet.gender);
  const [microchip, setMicrochip] = useState(currentPet.microchip);

  // TO-DO: add function to delay state change until after user stops typing

  const handleSaveChanges = async () => {
    const updatedPetDetails = {
      petName,
      breed,
      weight,
      petAgeYears,
      gender,
      microchip,
      // uri???
    };

    dispatch(updateCurrentPetDetails(updatedPetDetails));
    dispatch(
      updatePetData({ petId: currentPet.id, updatedDetails: updatedPetDetails })
    );

    setEditMode(false);

    // TO-DO: make editing storage a reusable function !!!

    // update local storage
    const storage = await AsyncStorage.getItem("petData");
    const parsedStorage = JSON.parse(storage);
    const currId = currentPet.id;
    // find applicable item in storage and replace with new
    parsedStorage[currId] = {
      ...currentPet,
      ...updatedPetDetails,
    };
    console.log(
      "pet data we are saving to storage in details: ",
      parsedStorage
    );
    await AsyncStorage.setItem("petData", JSON.stringify(parsedStorage));
  };

  // test that state updated correctly
  useEffect(() => {
    console.log("currentPet:", currentPet.petName);
    console.log("pet data length: ", petData.length);
    console.log("petData:", petData);
  }, [currentPet, petData]);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(JSON.stringify(result, null, 2));

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      // FIX: id doesn't correspond to index

      const storage = await AsyncStorage.getItem("petData");
      const parsedStorage = JSON.parse(storage);
      const currId = currentPet.id;
      const currInd = parsedStorage.findIndex((el) => el.id === currId);
      // find applicable item in storage and replace with new
      parsedStorage[currInd] = {
        ...currentPet,
        uri: result.assets[0].uri,
      };
      // console.log("in storage: ", parsedStorage[currId]);
      await AsyncStorage.setItem("petData", JSON.stringify(parsedStorage));
      let storageNow = await AsyncStorage.getItem("petData");
      // console.log(storageNow);

      // update in state
      dispatch(updateCurrentPetDetails({ uri: result.assets[0].uri }));
      dispatch(
        updatePetData({
          petId: currentPet.id,
          updatedDetails: { ...currentPet, uri: result.assets[0].uri },
        })
      );
    }
  };

  const handleDelete = async () => {
    // doesn't seem to effectively delete...
    dispatch(deleteOnePet({ petId: currentPet.id }));

    // delete from storage - TODO: should be able to update storage using updated state
    const storage = await AsyncStorage.getItem("petData");
    const parsedStorage = JSON.parse(storage);
    const updatedStorage = parsedStorage.filter(
      (pet) => pet.id !== currentPet.id
    );
    await AsyncStorage.setItem("petData", JSON.stringify(updatedStorage));

    dispatch(setCurrentPet(petData[petData.length - 1]));

    navigation.navigate("LandingScreen");
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
            <TouchableOpacity onPress={() => setEditMode(true)} style={tw``}>
              <Icon name="wrench" type="font-awesome" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSaveChanges} style={tw``}>
              <Icon name="check" type="feather" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`w-full mx-auto pb-3 mt-3 mb-2 rounded-lg`}>
          <TouchableOpacity
            style={tw`w-1/2 rounded-lg mx-auto`}
            onPress={pickImage}
          >
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
              source={
                currentPet.uri
                  ? { uri: currentPet.uri }
                  : currentPet.petType === "dog"
                  ? dogImg
                  : catImg
              }
            />
          </TouchableOpacity>

          <View style={tw`flex items-center bg-white rounded-lg mt-3 px-4`}>
            {!editMode ? (
              <Text style={tw`text-2xl p-3 tracking-wide font-bold`}>
                {currentPet.petName}
              </Text>
            ) : (
              <TextInput
                style={tw`text-2xl font-bold border border-gray-300 p-3`}
                value={petName}
                onChangeText={setPetName}
              />
            )}
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-xl text-center p-1 pt-2 font-bold underline`}>
            General
          </Text>
          <View style={tw`flex items-center gap-y-2`}>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Age:</Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>
                  {currentPet.petAgeYears === "unknown"
                    ? "---"
                    : currentPet.petAgeYears}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
                  value={petAgeYears}
                  onChangeText={setPetAgeYears}
                />
              )}
            </View>

            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Breed:</Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>
                  {currentPet.breed === "unknown" ? "---" : currentPet.breed}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
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
                <Text style={tw`text-lg p-1`}>
                  {currentPet.weight === "unknown" ? "---" : currentPet.weight}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
                  value={weight}
                  onChangeText={setWeight}
                />
              )}
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Gender:</Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>
                  {currentPet.gender === "unknown" ? "---" : currentPet.gender}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
                  value={gender}
                  onChangeText={setGender}
                />
              )}
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Microchip:
              </Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>
                  {currentPet.microchip === "unknown"
                    ? "---"
                    : currentPet.microchip}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
                  value={microchip}
                  onChangeText={setMicrochip}
                />
              )}
            </View>
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-xl text-center font-bold p-1 pt-2 underline`}>
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

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-2xl text-center font-bold p-1`}>
            Activity Log
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ActivityScreen")}
          >
            <View style={tw`bg-emerald-400 rounded-lg py-2 w-1/3 my-2 mx-auto`}>
              <Icon
                name="arrow-right-circle"
                type="feather"
                size={25}
                style={tw``}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg`}>
          <Text style={tw`text-2xl text-center font-bold p-1`}>
            Remove Pet Data
          </Text>
          <TouchableOpacity onPress={handleDelete}>
            <View style={tw`bg-red-400 rounded-lg py-2 w-1/3 my-2 mx-auto`}>
              <Icon name="warning" type="antdesign" size={25} style={tw``} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailsScreen;
