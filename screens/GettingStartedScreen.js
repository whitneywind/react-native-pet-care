import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Formik, Field, ErrorMessage } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import catImg from "../assets/images/graycat.png";
import dogImg from "../assets/images/longdog.png";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPet, setPets } from "../slices/petsSlice";
import { useNavigation } from "@react-navigation/native";

// FIX: other pets' photos reset after adding new pet

const GettingStartedScreen = () => {
  // TO-DO: choose icon to use in place of photo
  // TO-DO: make button unclickable until required info filled out

  // const currPetData = useSelector((state) => state.pets);
  // const currPet = useSelector((state) => state.pets.currentPet);

  // console.log(
  //   "gettingstartedscreen pet data status: ",
  //   JSON.stringify(currPetData, null, 2)
  // );
  // console.log(
  //   "gettingstartedscreen currPet status: ",
  //   JSON.stringify(currPet, null, 2)
  // );

  const dispatch = useDispatch();

  const [selectedPet, setSelectedPet] = useState("");
  const [petGender, setPetGender] = useState("");

  const navigation = useNavigation();

  let defaultPetSettings = {
    // id, name, petType, petName, petAgeYears, avatar, petGender set in form
    breed: "unknown",
    weight: "unknown",
    gender: "unknown",
    microchip: "unknown",
    petMedicalInfo: {
      lastVetVisit: "unknown",
      allergies: "unknown",
      medications: "unknown",
    },
    petWalkInfo: {
      dailyWalkGoal: "25",
      walkStreak: "0",
      allWalkData: [0, 0, 0, 0, 0, 0, 0],
    },
  };

  const setPetData = async (values) => {
    try {
      const value = await AsyncStorage.getItem("petData");
      // get value from storage or create new array with default

      let petData = value ? JSON.parse(value) : [];

      console.log(
        "this is the pet data when we submit in gettting-started :",
        petData
      );

      const uniqueId =
        new Date().getTime().toString() +
        Math.random().toString(36).substr(2, 9);

      //merge values from form with default values
      let petDataEntry = {
        ...values,
        ...defaultPetSettings,
        id: uniqueId,
      };
      petData.push(petDataEntry);

      console.log("after pushing onto it", petData);

      // TO-DO: fix bug. below is temporary fix to nulls and duplicates
      petData = petData.filter(
        (el) => el !== null && petData.indexOf(el) === petData.lastIndexOf(el)
      );

      // await AsyncStorage.removeItem("petData");
      await AsyncStorage.setItem("petData", JSON.stringify(petData));

      // // update redux store with new pet data
      dispatch(setPets(petData));
      dispatch(setCurrentPet(petData[petData.length - 1]));

      // console.log("now this is under petData", petData);
    } catch (error) {
      console.error("error setting pet data: ", error);
    }
  };

  return (
    <SafeAreaView style={tw`h-full`}>
      <ScrollView contentContainerStyle={tw`w-7/8 mx-auto mt-10`}>
        <Text style={tw`text-3xl mb-4 text-center`}>
          Let's start with the basics
        </Text>
        <Formik
          initialValues={{
            petType: "",
            petName: "",
            petAgeYears: "",
            gender: "",
            avatar: "",
          }}
          onSubmit={(values) => {
            setPetData(values);
            setSelectedPet("");
            setPetGender("");
            setTimeout(() => navigation.navigate("HomeScreen"), 500);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View>
              <Text style={tw`text-lg mt-4`}>What is your pet's name? *</Text>
              <TextInput
                style={tw`border border-gray-300 p-2 mt-2 mb-6`}
                onChangeText={handleChange("petName")}
                onBlur={handleBlur("petName")}
                value={values.petName}
                required
              />
              <Text style={tw`text-lg mb-2`}>
                What type of pet do you have? *
              </Text>
              <View style={tw`flex w-full flex-row justify-around mb-2`}>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue("petType", "dog");
                    setFieldValue("avatar", "dog");
                    setSelectedPet("dog");
                  }}
                  style={tw``}
                >
                  <Image
                    source={dogImg}
                    style={[
                      {
                        width: 130,
                        height: 130,
                      },
                      tw`border ${
                        selectedPet === "dog"
                          ? "border-green-400 border-4"
                          : "border-gray-300"
                      } mb-2`,
                    ]}
                  />
                  <Text style={tw`text-center`}>Dog</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue("petType", "cat");
                    setFieldValue("avatar", "cat");
                    setSelectedPet("cat");
                  }}
                >
                  <Image
                    source={catImg}
                    style={[
                      {
                        width: 130,
                        height: 130,
                      },
                      tw`border ${
                        selectedPet === "cat"
                          ? "border-green-400 border-4"
                          : "border-gray-300"
                      } mb-2`,
                    ]}
                  />
                  <Text style={tw`text-center`}>Cat</Text>
                </TouchableOpacity>
              </View>
              <Text style={tw`text-lg mt-4`}>
                How old is your pet? (optional)
              </Text>
              <View style={tw`flex-row items-center mb-3`}>
                <TextInput
                  style={tw`border border-gray-300 p-2 mt-2 flex-1 text-center`}
                  onChangeText={handleChange("petAgeYears")}
                  onBlur={handleBlur("petAgeYears")}
                  value={values.petAgeYears}
                  placeholder="Years"
                  keyboardType="numeric"
                />
              </View>

              <Text style={tw`text-lg mt-4`}>
                What is your pet's gender? (optional)
              </Text>
              <View style={tw`flex-row mb-10 mt-2`}>
                <TouchableOpacity
                  onPress={() => {
                    setPetGender("female");
                    setFieldValue("petGender", "female");
                  }}
                  style={[
                    tw`border border-gray-300 p-2 w-1/2`,
                    petGender === "female" && tw`border-green-500`,
                  ]}
                >
                  <Text style={tw`text-center`}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPetGender("male");
                    setFieldValue("petGender", "male");
                  }}
                  style={[
                    tw`border border-gray-300 p-2 w-1/2`,
                    petGender === "male" && tw`border-green-500`,
                  ]}
                >
                  <Text style={tw`text-center`}>Male</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={tw`rounded-full bg-emerald-400 py-3 mb-4`}
              >
                <Text style={tw`text-center text-white text-lg font-semibold`}>
                  Create Pet Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
                style={tw`rounded-full bg-slate-400 py-3`}
              >
                <Text style={tw`text-center text-white text-lg font-semibold`}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
export default GettingStartedScreen;
